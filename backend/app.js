import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import serveStatic from 'serve-static';
import compression from 'compression';
import helmet from 'helmet';
import dbConnection from './Database/dbConnection.js';
import { errorMiddleware } from './middlewares/error.js';
import messageRouter from './router/messageRoutes.js';
import userRouter from './router/userRoutes.js';
import timelineRouter from './router/timelineRoutes.js';
import softwareApplicationRouter from './router/softwareApplicationRoutes.js';
import skillRouter from './router/skillRoutes.js';
import projectRouter from './router/projectRoutes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: './config/config.env' });

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
        connectSrc: ["'self'", 'https:'],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// Enable compression
app.use(compression());

// CORS configuration
app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

// Serve static files
app.use('/uploads', serveStatic(path.join(__dirname, 'uploads')));
app.use('/public', serveStatic(path.join(__dirname, 'public')));

// API Routes
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/timeline', timelineRouter);
app.use('/api/v1/softwareApplication', softwareApplicationRouter);
app.use('/api/v1/skill', skillRouter);
app.use('/api/v1/project', projectRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve frontend build files
app.use(express.static(path.join(__dirname, 'dashboard', 'dist')));

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard', 'dist', 'index.html'));
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Database connection
dbConnection();

// Error middleware
app.use(errorMiddleware);

export default app;

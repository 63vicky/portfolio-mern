# Portfolio MERN Backend

This is the backend service for the Portfolio MERN application.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES=your_jwt_expiry
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRETE=your_cloudinary_api_secret
PORTFOLIO_URL=your_frontend_portfolio_url
DASHBOARD_URL=your_frontend_dashboard_url
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SMTP_FROM_EMAIL=your_smtp_from_email
SMTP_FROM_NAME=your_smtp_from_name
```

3. Create required directories:

```bash
mkdir -p uploads public
```

## Development

Run the development server:

```bash
npm run dev
```

## Production Build

Build both frontend and backend:

```bash
npm run build:prod
```

This will:

1. Install backend dependencies
2. Install frontend dependencies
3. Build the frontend application
4. Place the build files in the correct location

## Production

Start the production server:

```bash
npm start
```

## Deployment on Render

1. Create a new Web Service
2. Connect your GitHub repository
3. Set the following environment variables in Render
4. Set build command: `npm run build:prod`
5. Set start command: `npm start`

## API Endpoints

- Health Check: `GET /health`
- User Routes: `/api/v1/user/*`
- Project Routes: `/api/v1/project/*`
- Skill Routes: `/api/v1/skill/*`
- Timeline Routes: `/api/v1/timeline/*`
- Message Routes: `/api/v1/message/*`

## Static Files

- Uploads directory: `/uploads/*`
- Public assets: `/public/*`
- Frontend build: `/dashboard/dist/*`

## Security

The application uses:

- Helmet for security headers
- CORS for cross-origin requests
- Compression for response compression
- Rate limiting for API protection
- JWT for authentication

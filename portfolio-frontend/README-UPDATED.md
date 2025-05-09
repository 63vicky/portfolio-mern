# Portfolio Website

A modern, responsive portfolio website built with React, Tailwind CSS, and Framer Motion. This frontend application fetches data from a backend API to display projects, skills, timeline, and user information.

## Features

- **No Login Required**: Public-facing portfolio that fetches data directly from the backend
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop
- **Dark Mode Support**: Enhanced dark theme with improved color correction
- **Dynamic Content**: All content is fetched from the backend API
- **Project Showcase**: Display and filter your projects
- **Skills Display**: Show your skills with visual proficiency indicators
- **Contact Form**: Allow visitors to send you messages
- **Smooth Animations**: Engaging user experience with Framer Motion animations

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (default: http://localhost:4000/api/v1)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=http://localhost:4000/api/v1
```

## Development

Run the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173

## Build for Production

```bash
npm run build
```

The build files will be generated in the `dist` directory.

## Deployment

You can deploy the `dist` directory to any static hosting service like Vercel, Netlify, or GitHub Pages.

## Project Structure

- `src/components`: Reusable UI components
- `src/pages`: Page components
- `src/services`: API service functions
- `src/hooks`: Custom React hooks
- `src/assets`: Static assets like images
- `src/context`: React context providers

## Color Scheme

The portfolio uses a carefully designed color scheme that works well in both light and dark modes:

### Light Mode
- Primary background: White
- Text: Dark gray to black
- Accent colors: Blue and purple shades

### Dark Mode
- Primary background: Dark blue (#0f172a)
- Card background: Slate blue (#1e293b)
- Text: Light gray to white
- Accent colors: Brighter blue and purple shades

## Backend API

This frontend application requires a backend API to fetch data. Make sure the backend server is running and accessible at the URL specified in the `.env` file.

The backend provides the following endpoints:

- `/user/me/portfolio`: Get user information
- `/project/getall`: Get all projects
- `/project/get/:id`: Get a specific project
- `/skill/getall`: Get all skills
- `/timeline/getall`: Get timeline entries
- `/message/send`: Send a contact message

## License

MIT

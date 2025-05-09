# Portfolio Frontend

A modern, responsive portfolio website built with React, Tailwind CSS, and Framer Motion. This frontend application fetches data from a backend API to display projects, skills, timeline, and user information.

## Features

- Responsive design for all screen sizes
- Dynamic content fetched from backend API
- Project showcase with filtering options
- Skills display with proficiency levels
- Timeline/journey visualization
- Contact form
- Smooth animations and transitions

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
- `src/context`: React context providers (if needed)

## Backend API

This frontend application requires a backend API to fetch data. Make sure the backend server is running and accessible at the URL specified in the `.env` file.

## License

MIT

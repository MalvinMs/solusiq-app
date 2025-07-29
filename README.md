# OMDB Movie Search

A simple web application for searching movies using the OMDB API. Built with React and Vite.

## Features

- 🎬 Search for movies by title
- 🍿 View movie details
- 📱 Responsive design

## Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [daisyUI](https://daisyui.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20 or higher)
- [Bun](https.bun.sh) (optional, for faster package management)
- An API key from [OMDB API](http://www.omdbapi.com/apikey.aspx)

### Configuration

1.  Open `app/routes/home.tsx`.
2.  Find the `apiKey` variable and replace `"your_api_key_here"` with your actual OMDB API key.

### Development

Start the development server:

```bash
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:5173`.

## Building for Production

Create a production-ready build:

```bash
npm run build
# or
bun build
```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run typecheck`: Runs TypeScript type checking.

## Deployment

### Docker

A `Dockerfile` is included for easy containerization.

1. Build the Docker image:
   ```bash
   docker build -t omdb-movie .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 -e VITE_OMDB_API_KEY=$VITE_OMDB_API_KEY omdb-movie
   ```

The application will be accessible at `http://localhost:3000`.

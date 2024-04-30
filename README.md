# React TypeScript Search App

This is a React app built with TypeScript that demonstrates searching through a list of users.

### Deployed Link

You can view the deployed app at https://exquisite-pithivier-a3fc11.netlify.app.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS - Styling
- React Context + Reducer - State management

## State Management

This app uses React Context and Reducer for state management:

- **SearchInputContext** - Context to share state and dispatch between components
- **searchInputReducer** - Reducer to update state based on actions
- **useSearchInput** - Custom hook to access context

## Installation

```bash
npm install
```

## For Running Locally

```bash
npm run dev
```

## Building for Production

```bash
npm run build
```

## Code Overview

- **src/components** - React component files
- **src/hooks** - Custom React hooks
- **src/types** - TypeScript types and interfaces
- **src/utils** - Helper functions
- **src/App.tsx** - Main App component
- **src/index.tsx** - Entry point

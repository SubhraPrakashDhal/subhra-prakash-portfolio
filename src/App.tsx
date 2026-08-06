import { lazy, Suspense, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CursorProvider } from './context/CursorContext';
import { CinematicLoader } from './components/CinematicLoader';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';

// Route Code-Splitting for fast initial page load & bundle chunking
const Projects = lazy(() => import('./pages/Projects').then((m) => ({ default: m.Projects })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Skills = lazy(() => import('./pages/Skills').then((m) => ({ default: m.Skills })));
const Experience = lazy(() => import('./pages/Experience').then((m) => ({ default: m.Experience })));
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const Achievements = lazy(() => import('./pages/Achievements').then((m) => ({ default: m.Achievements })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

const SuspenseFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'projects', element: <Suspense fallback={<SuspenseFallback />}><Projects /></Suspense> },
      { path: 'about', element: <Suspense fallback={<SuspenseFallback />}><About /></Suspense> },
      { path: 'skills', element: <Suspense fallback={<SuspenseFallback />}><Skills /></Suspense> },
      { path: 'experience', element: <Suspense fallback={<SuspenseFallback />}><Experience /></Suspense> },
      { path: 'services', element: <Suspense fallback={<SuspenseFallback />}><Services /></Suspense> },
      { path: 'achievements', element: <Suspense fallback={<SuspenseFallback />}><Achievements /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<SuspenseFallback />}><Contact /></Suspense> },
      { path: '*', element: <Suspense fallback={<SuspenseFallback />}><NotFound /></Suspense> },
    ],
  },
]);

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <CursorProvider>
      {isLoading && <CinematicLoader onComplete={() => setIsLoading(false)} />}
      <RouterProvider router={router} />
    </CursorProvider>
  );
}

export default App;

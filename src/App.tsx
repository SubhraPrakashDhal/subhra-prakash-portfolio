import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CursorProvider } from './context/CursorContext';
import { CinematicLoader } from './components/CinematicLoader';
import { RootLayout } from './layouts/RootLayout';

import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { About } from './pages/About';
import { Skills } from './pages/Skills';
import { Experience } from './pages/Experience';
import { Services } from './pages/Services';
import { Achievements } from './pages/Achievements';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'projects', element: <Projects /> },
      { path: 'about', element: <About /> },
      { path: 'skills', element: <Skills /> },
      { path: 'experience', element: <Experience /> },
      { path: 'services', element: <Services /> },
      { path: 'achievements', element: <Achievements /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
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

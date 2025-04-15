import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Trades from './pages/Trades';
import Playbooks from './pages/Playbooks';
import { AnalysisPage as Analysis } from './pages/Analysis';
import { AchievementsPage as Achievements } from './pages/Achievements';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import MainLayout from './components/layout/MainLayout';

const withLayout = (Component: React.ComponentType) => (
  <MainLayout>
    <Component />
  </MainLayout>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: withLayout(Dashboard),
  },
  {
    path: '/trades',
    element: withLayout(Trades),
  },
  {
    path: '/playbooks',
    element: withLayout(Playbooks),
  },
  {
    path: '/analysis',
    element: withLayout(Analysis),
  },
  {
    path: '/achievements',
    element: withLayout(Achievements),
  },
  {
    path: '/calendar',
    element: withLayout(Calendar),
  },
  {
    path: '/settings',
    element: withLayout(Settings),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]); 
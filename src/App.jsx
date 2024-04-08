import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import UserPage from './pages/UserPage';
import ReportPage from './pages/ReportPage';
import FeedPage from './pages/FeedPage';
import FeedDetailPage from './pages/FeedDetailPage';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />

        <Route element={<Layout />}>
          <Route path='/report' element={<ReportPage />} />

          <Route path='/user' element={<UserPage />} />

          <Route path='/feed'>
            <Route index element={<FeedPage />} />
            <Route path=':feedId' element={<FeedDetailPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


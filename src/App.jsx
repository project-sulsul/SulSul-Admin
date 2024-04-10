import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import UserPage from './pages/UserPage';
import ReportPage from './pages/ReportPage';
import FeedPage from './pages/FeedPage';
import FeedDetailPage from './pages/FeedDetailPage';
import { useState } from 'react';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />

        <Route element={<Layout isLoading={isLoading} />}>
          <Route path='/report' element={<ReportPage setIsLoading={setIsLoading} />} />

          <Route path='/user' element={<UserPage setIsLoading={setIsLoading} />} />

          <Route path='/feed'>
            <Route index element={<FeedPage setIsLoading={setIsLoading} />} />
            <Route path=':feedId' element={<FeedDetailPage setIsLoading={setIsLoading} />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import UserPage from './pages/UserPage';
import ReportPage from './pages/ReportPage';
import FeedPage from './pages/FeedPage';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path='/report' element={<ReportPage />} />
          <Route path='/user' element={<UserPage />} />
          <Route path='/feed' element={<FeedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


import { RouterProvider } from 'react-router-dom';
import router from './router';
import { commonStore } from './stores';
import { useContext } from 'react';
import AlertModal from './components/AlertModal';

function App() {
  const [{ isModalOpen }, _] = useContext(commonStore);

  return (
    <>
      <RouterProvider router={router} />
      {isModalOpen && <AlertModal />}
    </>
  );
}

export default App;

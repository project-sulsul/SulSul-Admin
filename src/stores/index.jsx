import { createContext, useState } from 'react';

const initialState = {
  isModalOpen: false,
};

const commonStore = createContext(initialState);

const CommonProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <commonStore.Provider value={[state, setState]}>
      {children}
    </commonStore.Provider>
  );
};

export { commonStore, CommonProvider };
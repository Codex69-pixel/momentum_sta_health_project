import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ContentStudio from './components/ContentStudio';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <ContentStudio />
      </div>
    </Provider>
  );
};

export default App;

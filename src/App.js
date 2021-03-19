import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Homepage from './components/Homepage'
function App() {
  return (
    <Provider store={store}>
      <React.Fragment >
          <Homepage />
      </React.Fragment >
    </Provider>
  );
}

export default App;

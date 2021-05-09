import React from "react";
import { Provider } from "react-redux";

import configureStore from "./src/store/configureStore";

import Navigator from "./src/navigation/Navigator";

const App = () => {
  const store = configureStore();

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;

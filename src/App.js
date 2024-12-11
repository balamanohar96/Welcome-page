import { Provider } from "react-redux";
import "./App.css";
import store from "./redux/appStore";
import Routes from "./components/Routes";

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;

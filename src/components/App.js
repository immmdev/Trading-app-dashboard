import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import ZeroContextProvider from "../context/ZeoContextProvider";



const App = () => {
  return (
    <>
        <TopBar />
        <ZeroContextProvider>
          <Dashboard />
        </ZeroContextProvider>
    </>
  );
};

export default App;

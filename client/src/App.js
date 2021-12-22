import Home from "./Components/home";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import Socketscapsule from "./socket/capsule";
AOS.init();

function App() {
  return (
    <div className="App">
      <Socketscapsule>
        <Home />
      </Socketscapsule>
    </div>
  );
}

export default App;

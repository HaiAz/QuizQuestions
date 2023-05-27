import Home from "./pages/Home/Home";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { setUser } from "./redux/authSlice";
import Countdown from "./components/Countdown/Countdown";

function App() {
    return (
        <div className="App">
            <Home />
        </div>
    );
}

export default App;

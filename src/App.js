import "./App.css";
import Home from "./pages/all/Home";
import SlideShow from "./components/all/Slider/SlideShow";
import SubjectSlideShow from "./components/all/Slider/SubjectSlideShow";
import SideBar from "./components/all/SideBar/SideBar";
import AppProvider from "./context/AppProvider";
import Login from "./components/all/login/Login";
import { getDatabase, ref, child, get } from "firebase/database";
import { database } from "./firebase/config.jsx";
function App() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `user`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
    return (
        <div className="App">
            <AppProvider>
                <Home />
            </AppProvider>
        </div>
    );
}

export default App;

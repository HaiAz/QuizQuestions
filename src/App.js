import "./App.css";
import Home from "./pages/Home/Home";
import AppProvider from "./context/AppProvider";
import { getDatabase, ref, child, get } from "firebase/database";
import { database } from "./firebase/config.jsx";
function App() {
    // const dbRef = ref(getDatabase());
    // get(child(dbRef, `user`))
    //     .then((snapshot) => {
    //         if (snapshot.exists()) {
    //             console.log(snapshot.val());
    //         } else {
    //             console.log("No data available");
    //         }
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
    return (
        <div className="App">
            <Home />
        </div>
    );
}

export default App;

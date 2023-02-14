import "./App.css";
import Home from "./pages/all/Home";
import AppProvider from "./context/AppProvider";
import { getDatabase, ref, child, get } from "firebase/database";
import { database } from "./firebase/config.jsx";
import Login from "./pages/all/Login";
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
            <AppProvider>
                <Login />
            </AppProvider>
        </div>
    );
}

export default App;

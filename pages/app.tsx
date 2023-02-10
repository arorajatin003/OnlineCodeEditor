import { useState, useEffect } from "react";
import styles from '@/styles/Home.module.css'
import Editor from "./components/Editor/editor";
import EditorPage from "./components/editorPage";
import Login from "./components/Login/login";
import {useAuthState} from "react-firebase-hooks/auth";
import Firebase from "../firebase/clientApp";

const App = ()=>{
    // const [user, setUser] = useState({});
    const [login,setLogin] = useState(false);

    // useEffect(()=>{
    //     setLogin(!login);
    // },[user])
    const [user, loading, error] = useAuthState(Firebase.auth());
     useEffect(()=>{
        setLogin(user?true:false);
        alert(user?.displayName);
    },[user])
    console.log("loding:",loading, "| Current User: ", user);
    return(
        <div>
            {login?<EditorPage />:<Login/>}
        </div>
    )
}

export default App;
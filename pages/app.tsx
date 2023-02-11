import { useState, useEffect } from "react";
import styles from '@/styles/Home.module.css'
import Editor from "./components/Editor/editor";
import EditorPage from "./[editorPage]";
import UserInterface from "./components/userInterface/userInterface";
import Login from "./components/Login/login";
import {useAuthState} from "react-firebase-hooks/auth";
import Firebase from "../firebase/clientApp";
// import {user, setUser} from './userInfo'
const App = ()=>{
    const [user, setUser] = useState<any>(null);
    const [login,setLogin] = useState(false);

     useEffect(()=>{
        console.log(user)
        if(user===null){
            setLogin(false)
        }else{
            setLogin(true);
        }
    },[user])
    console.log("loding:", "| Current User: ", user?.email);
    return(
        <div>
            {login?<UserInterface email={user?.email}/>:<Login setUser={setUser}/>}
        </div>
    )
}

export default App;
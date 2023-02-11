import styles from '@/styles/Home.module.css'
import Header from '../Header/header';
import firebase from '../../../firebase/clientApp';


const LoginPage = (props:any)=>{
    const {setUser} = props;
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    
    const signIn=()=>{
        auth
          .signInWithPopup(provider)
          .then((result)=>{
            setUser(result.additionalUserInfo?.profile)
          })
          .catch((error)=>alert(error.message));
        };


    return(
        <div className={styles.login}>
            <Header/>
            <div className={styles.login_body}>
                <div className={styles.login_container}>
                    <div className={styles.login_title}>
                        Welcome to Online Code editor
                    </div>
                    <button onClick={signIn}>
                        Sign In with Google
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default LoginPage;
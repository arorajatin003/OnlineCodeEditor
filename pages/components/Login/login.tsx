import styles from '@/styles/Home.module.css'
import Header from '../Header/header';
import firebase from '../../../firebase/clientApp';

const LoginPage = ()=>{
    // const uiConfig = {
    //     signInSuccessUrl: "/",
    //     signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    // }
    const signIn=()=>{
        firebase.auth()
          .signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then((result)=>{
            // dispatch({
            //   type: actionType.SET_USER,
            //   user: result.user,
            // })
            // setUser(result.additionalUserInfo?.profile)
            console.log(result);
          })
          .catch((error)=>alert(error.message));
      };
    return(
        <div className={styles.login}>
            <Header login={false}/>
            <div className={styles.login_body}>
                <div className={styles.login_container}>
                    <div className={styles.login_title}>
                        Welcome to Online Code editor
                    </div>
                    <button onClick={signIn}>
                        Sign In with Google
                    </button>
                    {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
                </div>
            </div>
            
        </div>
    )
}

export default LoginPage;
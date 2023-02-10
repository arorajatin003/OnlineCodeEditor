import styles from '@/styles/Home.module.css'

const LoginPage = ()=>{


    return(
        <div className={styles.login}>
       <div className={styles.login_container}>
          <img
           src='https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/12/4/1417693419838/2352f5f7-484a-43e8-9ca5-00010c7d4a24-1020x1020.jpeg?width=140&quality=45&auto=format&fit=max&dpr=2&s=0aed5ecd654d82c2e5088d963e40fb3c'
           alt='Logo' />
           <div className={styles.login_text}>
              <h1>Sign in to WhatsApp clone</h1>
           </div>
           <button>
            Sign In with Google
           </button>
       </div>
    </div>
    )
}

export default LoginPage;
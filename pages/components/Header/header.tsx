import styles from '@/styles/Home.module.css'
import firebase from '../../../firebase/clientApp';
import {Avatar} from '@mui/material'
const header = ()=>{
    const user = firebase.auth().currentUser;
    return(
        <div className={styles.header}>
            <div className={styles.header_title}>
                Online Code Editor
            </div>
            <div className={styles.header_icons}>
                <li><a>About</a></li>
                {user && <li><Avatar src={user.photoURL as string}/></li>}
            </div>
            
        </div>
    )
}

export default header;
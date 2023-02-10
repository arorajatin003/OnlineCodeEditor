import styles from '@/styles/Home.module.css'


const header = (props:any)=>{
    const {login} = props
    return(
        <div className={styles.header}>
            <div className={styles.header_title}>
                Online Code Editor
            </div>
            <div className={styles.header_icons}>
                <li><a>About</a></li>
                {login?<li>USER</li>:<li>login</li>}
            </div>
            
        </div>
    )
}

export default header;
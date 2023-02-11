import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';
import Header from '../Header/header';
import firebase from '../../../firebase/clientApp';
import { useRouter } from 'next/router';
// import { ListFormat } from 'typescript';
const userInterface = (props:any)=>{
    const{
        email,
        name
    } = props;
    const db = firebase.firestore();
    const router = useRouter();
    const [files,setFiles] = useState<any>([]);

    const newFile = ()=>{
        const filename = prompt("Enter File Name");
        router.push(`/${filename}`);

    }
    useEffect(()=>{
        db.collection("users")
            .doc(email)
            .collection("files")
            .orderBy('timestamp','asc')
            .onSnapshot(((snapshot)=>{
                snapshot.docs.map((doc)=>{
                    setFiles([...files,doc.data()])
                    console.log(doc.data());
                });
            }));
    },[])
    


    return(
        <div >
            <Header />
            <div className={styles.userInterface_body}>
                <div className={styles.upperBody}>
                    <div className={styles.addNew} onClick={newFile}>
                        Add New File
                    </div>
                    <div className={styles.welcome_message}>
                        Hello {name}
                    </div>
                </div>
                <div className={styles.container}>
                    {files.map((file:any)=>(
                        <div className={styles.filesInfo} onClick={()=>{router.push(`/${file.name}`)}}>
                            <div className={styles.file_content}>
                                {file.name}
                            </div>
                            <div className={styles.file_content}>
                                {new Date(file.timestamp?.toDate()).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default userInterface;
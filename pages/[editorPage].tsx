import { useState, useEffect } from "react";
import styles from '@/styles/Home.module.css'
import Editor from "./components/Editor/editor";
import Header from "./components/Header/header";
import firebase from "../firebase/clientApp"
import { useRouter } from "next/router";


const editorPage = ()=>{

    const router = useRouter();
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const filename = router.query.editorPage as string;

    // State Hooks 
    const [HTML, setHTML] = useState('');
    const [CSS, setCSS] = useState('');
    const [JS, setJS] = useState('');
    const [srcDoc, setSrcDoc] = useState('');
    const [email, setEmail] = useState<string>('');
    const [files, setFiles] = useState<any>([]);

    // Effects Hooks
    useEffect(()=>{
        const e = user?.email as string 
        setEmail(e);
        
    },[user])
    
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setSrcDoc(`
                <html>
                    <body>${HTML}</body>
                    <style>${CSS}</style>
                    <script${JS}</script>
                </html>
            `);
        },500);

        return ()=>clearTimeout(timeout);
    },[HTML,CSS,JS]);
    
    useEffect(()=>{
        try{
            db.collection("users")
            .doc(email)
            .collection("files")
            .orderBy('timestamp','asc')
            .onSnapshot(((snapshot)=>{
                snapshot.docs.map((doc)=>{
                    if(doc.data().name === filename){
                        setHTML(doc.data().html);
                        setCSS(doc.data().css);
                        setJS(doc.data().js);
                    }
                });
            }));

        }catch(error){
            console.log(error)
        }
        
        
    },[email])


    // Additional Finctions
    const save = async ()=>{
        console.log("email: ",email,"| filename: ",filename);
        try{
            if(email){
                await db.collection("users").doc(email).collection("files").doc(filename).set({
                    html: HTML,
                    css: CSS,
                    js: JS,
                    name: filename,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
                console.log("Save Successfull");
            }else{
                throw "no email aviable";
            }
            
        }catch(error){
            console.log("Error is saving the file---->",error)
        }
        router.push('/');
    }


    // Editos Page for user to edit the files
    return(
        <div className={styles.page}>
            <Header />
            <div className={styles.body}>
                <div className={styles.input_editor}>
                    <Editor 
                        displayName="HTML"
                        onChange={setHTML}
                        value={HTML}
                    />
                    <Editor 
                        displayName="CSS"
                        onChange={setCSS}
                        value={CSS}
                    />
                    <Editor 
                        displayName="JavaScript"
                        onChange={setJS}
                        value={JS}
                    />
                </div>
                <div className={styles.output_window}>
                    <div className={styles.output_header}>
                        OUTPUT
                        <button onClick={save}>
                            SAVE
                        </button>
                    </div>
                    <iframe 
                        srcDoc={srcDoc}
                        title='OUTPUT'
                        sandbox='allow-scripts'
                        width='100%'
                        height='100%'
                    />
                </div>
            </div>
            
            
        </div>
    )
}

export default editorPage;
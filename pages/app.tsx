import { useState, useEffect } from "react";
import styles from '@/styles/Home.module.css'
import Editor from "./components/Editor/editor";


const App = ()=>{
    const [HTML, setHTML] = useState('');
    const [CSS, setCSS] = useState('');
    const [JS, setJS] = useState('');
    const [srcDoc, setSrcDoc] = useState('');

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

    return(
        <div className={styles.page}>
            {/* <Headers /> */}
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

export default App;
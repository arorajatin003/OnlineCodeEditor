import styles from '@/styles/Home.module.css'



const Editor = (props:any)=>{
    const{
        displayName,
        onChange,
        value
    } = props;

    const handleChange = (e:any)=>{
        onChange(e.target.value);
    }
    return(
        <div className={styles.editor}>
            <div className={styles.editor_header}>
                {displayName}
                <button>0/1</button>
            </div>
            <textarea 
                className={styles.editor_body}
                placeholder={displayName}
                value={value}
                onChange={handleChange}
            />
        </div>
    )

}

export default Editor;
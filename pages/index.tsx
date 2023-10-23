import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { Header } from './components/Header'
import { useState } from 'react'

const Home: NextPage = () => {
  const [binary, setBinary] = useState<string>()

  const Translate = (file:File)=>{
    const reader = new FileReader();
    reader.addEventListener("load", ()=>{
      setBinary(typeof reader.result === "string"?
        reader.result:
        undefined
      )
    })
    reader.readAsText(file, "UTF-8");
  }

  const Coloring = (line: string)=>{
    const elems = line.split(" ").map(e=>{
      switch(e){
        case "int":case "char":case "float":case "double":case "auto":case "void":
          return <span style={{color:"blue"}}>{e} </span>
        case "if":case "for":case "while":case "return":
          return <span style={{color:"purple"}}>{e} </span>
        default:
          if(e.match(/[0-9]*/g)){
            return <span style={{color:"green"}}>{e} </span>
          }
          return <span>{e} </span>;
      }
    });

    return elems;
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const files = e.currentTarget.files;
    if(files == null || files.length == 0) return;

    const file = files[0];

    console.log(file);
    Translate(file);
  }
  const handleDrop = (e:React.DragEvent<HTMLDivElement>)=>{
    console.log("file droped");
    e.preventDefault();

    if(e.dataTransfer.items){
      [...e.dataTransfer.items].forEach((item) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if(file) Translate(file);
        }
      });
    }
  }
  return (
    <div className='page'>
      <Header/>
      <div className={styles.body}>
        <div className={styles.inputZone}>
          <div className={styles.dropSpace} onDrop={handleDrop} onDragOver={(e)=>{e.preventDefault()}}>drag & drop binary file</div>
          <input type='file' accept='.rtf' onChange={handleFileUpload}></input>
        </div>
        <div className={styles.result}>
          <div className={styles.cCode}>
            <div className={styles.cHeader}>.c</div>
            <div className={styles.cContent}>
            {typeof binary=="string"?binary.split("\\").map((e, i)=><div key={i}>{Coloring(e)}</div>):<></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

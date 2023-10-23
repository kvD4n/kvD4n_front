import style from "./header.module.css"

export const Header = ()=>{
  return(
    <header className={style.header}>
      <h3>reverse engineering tool<em className={style.name}>Kudan</em></h3>
  	</header>
  )
}
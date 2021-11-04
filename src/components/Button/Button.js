import classes from './Button.module.scss'

export default function Button({ text, onClick }) {
   return (
      <div className={classes.button__wrapper}>
         <button onClick={onClick} >{text}</button>
      </div>
   )
}
import classes from './Input.module.scss'

export default function Input({ type }) {
   return (
      <div className={classes.input__wrapper}>
         <input className={classes.input} type={type} />
      </div>
   )
}
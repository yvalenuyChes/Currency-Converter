import { Button } from '@mui/material'
import classes from './Button.module.scss'

export default function AppButton({ text, onClick }) {
   return (
      <div className={classes.button__wrapper}>
         <Button onClick={onClick} className={classes.button} variant="contained" color="success">{text}</Button>
      </div>
   )
}
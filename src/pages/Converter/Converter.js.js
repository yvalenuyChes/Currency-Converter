import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import axios from 'axios'
import Button from '../../components/Button/Button'
import classes from './Converter.module.scss'
import { TextField } from '@mui/material';


export default function MainPage() {

   const RUB_URL = 'https://www.cbr-xml-daily.ru/daily_json.js'
   const EUR_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=f2f2c855dce5a8fc254f3bf2628abdcf'

   const [value, setValue] = useState(1)

   function valueHandler(event) {
      setValue(event.target.value)
   }

   const [result, setResult] = useState('')
   const firstSelect = useRef(null)
   const secondSelect = useRef(null)


   const [firstSelectValue, setFirstSelectValue] = useState('')
   const [secondSelectValue, setSecondSelectValue] = useState('')

   const handleChangeFirstSelector = event => {
      setFirstSelectValue(event.target.value);
   }

   const handleChangeSecondSelector = event => {
      setSecondSelectValue(event.target.value);
   }



   async function resultHandler() {
      // const firstValue = firstSelect.current.value
      // const secondValue = secondSelect.current.value
      if (firstSelectValue === 'rub' && secondSelectValue === 'usd') {
         const dataRub = await axios.get(RUB_URL)
         if (value <= 0) {
            setResult('Число не может быть меньше или равна нулю')
         } else {
            setResult((value / dataRub.data.Valute.USD.Value).toFixed(3))
         }

      } else if (firstSelectValue === 'rub' && secondSelectValue === 'eur') {
         const dataRub = await axios.get(RUB_URL)
         if (value <= 0) {
            setResult('Число не может быть меньше или равна нулю')
         } else {
            setResult((value / dataRub.data.Valute.EUR.Value).toFixed(3))
         }
      }
      else if (firstSelectValue === 'usd' && secondSelectValue === 'rub') {
         const dataRub = await axios.get(RUB_URL)
         if (value <= 0) {
            setResult('Число не может быть меньше или равна нулю')
         } else {
            setResult((value * dataRub.data.Valute.USD.Value).toFixed(3))
         }
      }
      else if (firstSelectValue === 'eur' && secondSelectValue === 'rub') {
         const dataRub = await axios.get(RUB_URL)
         if (value <= 0) {
            setResult('Число не может быть меньше или равна нулю')
         } else {
            setResult((value * dataRub.data.Valute.EUR.Value).toFixed(3))
         }
      }
      else if (firstSelectValue === 'eur' && secondSelectValue === 'usd') {
         const dataEur = await axios.get(EUR_URL)
         if (value <= 0) {
            setResult('Число не может быть меньше или равна нулю')
         } else {
            setResult((value * dataEur.data.rates.USD).toFixed(3))
         }
      }
      else if (firstSelectValue === 'usd' && secondSelectValue === 'eur') {
         const dataEur = await axios.get(EUR_URL)
         if (value <= 0) {
            setResult('Число не может быть меньше или равна нулю')
         } else {
            setResult((value / dataEur.data.rates.USD).toFixed(3))
         }
      }
      else {
         if (value <= 0) {
            setResult('Число не может быть меньше или равно нулю')
         } else {
            setResult(value)
         }
      }
   }

   useEffect(() => {
      if (navigator.language !== ('ru' || 'ru-RU')) {
         setFirstSelectValue('eur')
         setSecondSelectValue('eur')
      } else {
         setFirstSelectValue('rub')
         setSecondSelectValue('rub')
      }
   }, [])


   return (
      <div>
         <div className={classes.container}>
            <h2 className={classes.title}>Конвертер валют</h2>
            <TextField value={value} onChange={valueHandler} type='number' />
            <FormControl >
               <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
               <Select
                  value={firstSelectValue}
                  label="Валюта"
                  onChange={handleChangeFirstSelector}
                  ref={firstSelect}
               >
                  <MenuItem value='rub'>Rub</MenuItem>
                  <MenuItem value='usd'>Usd</MenuItem>
                  <MenuItem value='eur'>Eur</MenuItem>
               </Select>
            </FormControl>
            <FormControl >
               <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
               <Select
                  value={secondSelectValue}
                  label="Валюта"
                  onChange={handleChangeSecondSelector}
                  ref={secondSelect}
               >
                  <MenuItem value='rub'>Rub</MenuItem>
                  <MenuItem value='usd'>Usd</MenuItem>
                  <MenuItem value='eur'>Eur</MenuItem>
               </Select>
            </FormControl>
            {/* <select ref={firstSelect}>
               <option value='rub'>rub</option>
               <option value='usd'>usd</option>
               <option value='eur'>eur</option>
            </select>
            <span>в</span>
            <select ref={secondSelect}>
               <option value='rub'>rub</option>
               <option value='usd'>usd</option>
               <option value='eur'>eur</option>
            </select> */}
            <Button text='Получить результат' onClick={resultHandler} />
            <div className='result'>
               <p>Результат: {result}</p>
            </div>
            <NavLink to='exchange_rates'>Курс рубля</NavLink>
         </div>
      </div>
   )
}
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { TextField } from '@mui/material'
import axios from 'axios'
import Button from '../../components/Button/Button'
import classes from './Converter.module.scss'


export default function MainPage() {

   const RUB_URL = 'https://www.cbr-xml-daily.ru/daily_json.js'
   const EUR_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=f2f2c855dce5a8fc254f3bf2628abdcf'

   const [value, setValue] = useState(1)

   function valueHandler(event) {
      setValue(event.target.value)
   }

   const [result, setResult] = useState('')


   const [firstSelectValue, setFirstSelectValue] = useState('')
   const [secondSelectValue, setSecondSelectValue] = useState('')

   const handleChangeFirstSelector = event => {
      setFirstSelectValue(event.target.value);
   }

   const handleChangeSecondSelector = event => {
      setSecondSelectValue(event.target.value);
   }



   async function resultHandler() {
      if (firstSelectValue === 'rub' && secondSelectValue === 'usd') {
         const dataRub = await axios.get(RUB_URL)
         if (value <= 0) {
            //setResult('Число не может быть меньше или равна нулю')
            setResult(navigator.language === ('ru' || 'ru-RU') ? 'Число не может быть меньше или равна нулю' : 'Value should be more then 0')
         } else {
            setResult((value / dataRub.data.Valute.USD.Value).toFixed(3) + ` ${secondSelectValue}`)
         }

      } else if (firstSelectValue === 'rub' && secondSelectValue === 'eur') {
         const dataRub = await axios.get(RUB_URL)
         if (value <= 0) {
            // setResult('Число не может быть меньше или равна нулю')
            setResult(navigator.language === ('ru' || 'ru-RU') ? 'Число не может быть меньше или равна нулю' : 'Value should be more then 0')
         } else {
            setResult((value / dataRub.data.Valute.EUR.Value).toFixed(3) + ` ${secondSelectValue}`)
         }
      }
      else if (firstSelectValue === 'usd' && secondSelectValue === 'rub') {
         const dataRub = await axios.get(RUB_URL)
         if (value <= 0) {
            // setResult('Число не может быть меньше или равна нулю')
            setResult(navigator.language === ('ru' || 'ru-RU') ? 'Число не может быть меньше или равна нулю' : 'Value should be more then 0')
         } else {
            setResult((value * dataRub.data.Valute.USD.Value).toFixed(3) + ` ${secondSelectValue}`)
         }
      }
      else if (firstSelectValue === 'eur' && secondSelectValue === 'rub') {
         const dataRub = await axios.get(RUB_URL)
         if (value <= 0) {
            // setResult('Число не может быть меньше или равна нулю')
            setResult(navigator.language === ('ru' || 'ru-RU') ? 'Число не может быть меньше или равна нулю' : 'Value should be more then 0')
         } else {
            setResult((value * dataRub.data.Valute.EUR.Value).toFixed(3) + ` ${secondSelectValue}`)
         }
      }
      else if (firstSelectValue === 'eur' && secondSelectValue === 'usd') {
         const dataEur = await axios.get(EUR_URL)
         if (value <= 0) {
            // setResult('Число не может быть меньше или равна нулю')
            setResult(navigator.language === ('ru' || 'ru-RU') ? 'Число не может быть меньше или равна нулю' : 'Value should be more then 0')
         } else {
            setResult((value * dataEur.data.rates.USD).toFixed(3) + ` ${secondSelectValue}`)
         }
      }
      else if (firstSelectValue === 'usd' && secondSelectValue === 'eur') {
         const dataEur = await axios.get(EUR_URL)
         if (value <= 0) {
            // setResult('Число не может быть меньше или равна нулю')
            setResult(navigator.language === ('ru' || 'ru-RU') ? 'Число не может быть меньше или равна нулю' : 'Value should be more then 0')
         } else {
            setResult((value / dataEur.data.rates.USD).toFixed(3) + ` ${secondSelectValue}`)
         }
      }
      else {
         if (value <= 0) {
            // setResult('Число не может быть меньше или равно нулю')
            setResult(navigator.language === ('ru' || 'ru-RU') ? 'Число не может быть меньше или равна нулю' : 'Value should be more then 0')
         } else {
            setResult(value + ` ${secondSelectValue}`)
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
            <h2 className={classes.title}>{navigator.language === ('ru' || 'ru-RU') ? 'Конвертер валют' : 'Converter '}</h2>
            <div className={classes.coverter__input}>
               <TextField value={value} onChange={valueHandler} type='number' />
            </div>
            <div className={classes.converter__selects}>
               <FormControl >
                  <InputLabel id="demo-simple-select-label">{navigator.language === ('ru' || 'ru-RU') ? 'Валюта' : 'Valute '}</InputLabel>
                  <Select
                     value={firstSelectValue}
                     label="Валюта"
                     onChange={handleChangeFirstSelector}
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
                  >
                     <MenuItem value='rub'>Rub</MenuItem>
                     <MenuItem value='usd'>Usd</MenuItem>
                     <MenuItem value='eur'>Eur</MenuItem>
                  </Select>
               </FormControl>
            </div>
            <div className={classes.converter__button}>
               <Button text={navigator.language === ('ru' || 'ru-RU') ? 'Получить результат' : 'Get result'} onClick={resultHandler} />
            </div>
            <div className={classes.result}>
               <p>{navigator.language === ('ru' || 'ru-RU') ? 'Результат: ' : 'Result: '} {result}</p>
            </div>
            <div className={classes.converter__link}>
               <NavLink to='exchange_rates'>{navigator.language === ('ru' || 'ru-RU') ? 'Курс рубля' : 'Exchange rates'}</NavLink>
            </div>
         </div>
      </div>
   )
}
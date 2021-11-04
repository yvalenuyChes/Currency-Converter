import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Button from '../../components/Button/Button'
// import Input from "../../components/Input/Input"


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



   async function resultHandler() {
      const firstValue = firstSelect.current.value
      const secondValue = secondSelect.current.value
      if (firstValue === 'rub' && secondValue === 'usd') {
         const dataRub = await axios.get(RUB_URL)
         setResult((value / dataRub.data.Valute.USD.Value).toFixed(3))
      } else if (firstValue === 'rub' && secondValue === 'eur') {
         const dataRub = await axios.get(RUB_URL)
         setResult((value / dataRub.data.Valute.EUR.Value).toFixed(3))
      }
      else if (firstValue === 'usd' && secondValue === 'rub') {
         const dataRub = await axios.get(RUB_URL)
         setResult((value * dataRub.data.Valute.USD.Value).toFixed(3))
      }
      else if (firstValue === 'eur' && secondValue === 'rub') {
         const dataRub = await axios.get(RUB_URL)
         setResult((value * dataRub.data.Valute.EUR.Value).toFixed(3))
      }
      else if (firstValue === 'eur' && secondValue === 'usd') {
         const dataEur = await axios.get(EUR_URL)
         setResult((value * dataEur.data.rates.USD).toFixed(3))
      }
      else if (firstValue === 'usd' && secondValue === 'eur') {
         const dataEur = await axios.get(EUR_URL)
         setResult((value / dataEur.data.rates.USD).toFixed(3))
      }
      else {
         setResult(value)
      }

   }



   return (
      <div>
         <div className='container'>
            <h2>Конвертер валют</h2>
            <input value={value} onChange={valueHandler} type='number' />
            <select ref={firstSelect}>
               <option value='rub'>rub</option>
               <option value='usd'>usd</option>
               <option>eur</option>
            </select>
            <span>in</span>
            <select ref={secondSelect}>
               <option>rub</option>
               <option>usd</option>
               <option>eur</option>
            </select>
            <Button text='Получить результат' onClick={resultHandler} />
            <div className='result'>
               <p>Result: {result}</p>
            </div>
            <NavLink to='exchange_rates'>To</NavLink>
         </div>
      </div>
   )
}
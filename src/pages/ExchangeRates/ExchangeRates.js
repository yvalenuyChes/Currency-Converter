import { useState } from "react"
import axios from "axios"
import Button from "../../components/Button/Button"
import { NavLink } from "react-router-dom"
import classes from './ExchangeRates.module.scss'



export default function ExchangeRates() {

   const RUB_URL = 'https://www.cbr-xml-daily.ru/daily_json.js'
   const EUR_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=f2f2c855dce5a8fc254f3bf2628abdcf'
   const DATA_URL = (navigator.language === 'ru-RU' || 'ru' ? RUB_URL : EUR_URL)

   const [rubData, setRubData] = useState([])
   const [eurData, setEurData] = useState([])

   const rubValues = []
   const eurValues = []


   async function getValutesRub() {
      const data = await axios.get(DATA_URL)
      for (let i = 0; i < Object.entries(data.data.Valute).length; i++) {
         rubValues.push([(Object.entries(data.data.Valute)[i][1].Name), Object.entries(data.data.Valute)[i][1].Value])
      }
   }

   async function getValutesUsd() {
      const data = await axios.get(DATA_URL)
      for (let i = 0; i < Object.keys(data.data.rates).length; i++) {
         eurValues.push([Object.keys(data.data.rates)[i], Object.values(data.data.rates)[i]])
      }
   }

   if (navigator.language === 'ru-RU' || 'ru') {
      getValutesRub()
   } else {
      getValutesUsd()
   }

   return (
      <div className={classes.container}>
         <h1>{navigator.language === 'ru-RU' || 'ru' ? 'Курс рубля' : 'Euro rate'}</h1>
         <ul>
            <ul>
               {rubData.map(item =>
                  <li key={item[0]}>
                     Валюта: {item[0]}, рублей за валюту:{item[1]}
                  </li>
               )}
            </ul>
            <ul>
               {eurData.map(item =>
                  <li key={item[0]}>
                     Valute: {item[0]}, Rate:{item[1]}
                  </li>
               )}
            </ul>
         </ul>
         {navigator.language === 'ru-RU' || 'ru'
            ? <Button onClick={() => setRubData(rubValues)} text='Получить данные' />
            : <Button onClick={() => setEurData(eurValues)} text='Get data' />
         }
         <NavLink to='/'>{navigator.language === 'ru-RU' || 'ru' ? 'Конвертер' : 'Converter'}</NavLink>
      </div>
   )
}
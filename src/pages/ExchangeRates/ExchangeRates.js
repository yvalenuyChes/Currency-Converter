import { useState } from "react"
import axios from "axios"
import Button from "../../components/Button/Button"
import { NavLink } from "react-router-dom"
import classes from './ExchangeRates.module.scss'



export default function ExchangeRates() {

   console.log(navigator.language)

   const RUB_URL = 'https://www.cbr-xml-daily.ru/daily_json.js'
   const EUR_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=f2f2c855dce5a8fc254f3bf2628abdcf'
   const DATA_URL = (navigator.language === ('ru' || 'ru-RU') ? RUB_URL : EUR_URL)

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

   if (navigator.language === ('ru' || 'ru-RU')) {
      getValutesRub()
   } else {
      getValutesUsd()
   }

   return (
      <div className={classes.container}>
         <h1 className={classes.title}>{navigator.language === ('ru' || 'ru-RU') ? 'Курс рубля' : 'Euro rate'}</h1>
         {
            navigator.language === ('ru' || 'ru-RU')
               ?
               <ul className={classes.rates__list}>
                  {rubData.map(item =>
                     <li key={item[0]} className={classes.rates__list__item}>
                        Валюта: <span>{item[0]}</span>, рублей за валюту:<span>{item[1]}</span> руб
                     </li>
                  )}
               </ul>
               :
               <ul className={classes.rates__list}>
                  {eurData.map(item =>
                     <li key={item[0]} className={classes.rates__list__item}>
                        Valute: <span>{item[0]}</span>, Rate:<span>{item[1].toFixed(3)}</span> for 1 euro
                     </li>
                  )}
               </ul>
         }
         <div className={classes.rates__button}>
            {navigator.language === ('ru' || 'ru-RU')
               ? <Button onClick={() => setRubData(rubValues)} text='Получить данные' />
               : <Button onClick={() => setEurData(eurValues)} text='Get data' />
            }
         </div>
         <div className={classes.rates__link}>
            <NavLink to='/'>{navigator.language === ('ru' || 'ru-RU') ? 'Конвертер' : 'Converter'}</NavLink>
         </div>
      </div>
   )
}
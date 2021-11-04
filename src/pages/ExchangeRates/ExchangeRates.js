import { useState } from "react"
import axios from "axios"
import Button from "../../components/Button/Button"



export default function ExchangeRates() {

   const RUB_URL = 'https://www.cbr-xml-daily.ru/daily_json.js'
   const DATA_URL = (navigator.language == 'ru-RU' ? RUB_URL : '')

   const [appData, setAppData] = useState([])

   const arrValues = []


   async function getValutes() {
      const data = await axios.get(DATA_URL)
      for (let i = 0; i < Object.entries(data.data.Valute).length; i++) {
         arrValues.push([(Object.entries(data.data.Valute)[i][1].Name), Object.entries(data.data.Valute)[i][1].Value])
      }
   }
   getValutes()

   return (
      <div>
         <h1></h1>
         <ul>
            <ul>
               {appData.map(item =>
                  <li key={item[0]}>
                     Валюта: {item[0]}:Курс{item[1]}
                  </li>
               )}
            </ul>
         </ul>
         <Button onClick={() => setAppData(arrValues)} text='Получить данные' />
      </div>
   )
}
import { useEffect, useState } from "react"
import axios from "axios"
import Button from "../../components/Button/Button"



export default function ExchangeRates() {

   const RUB_URL = 'https://www.cbr-xml-daily.ru/daily_json.js'
   const DATA_URL = (navigator.language == 'ru-RU' ? RUB_URL : '')

   // const [valueUsd, setValueUsd] = useState('')
   // const [valueEur, setValueEur] = useState('')

   const arrValues = []


   async function getValutes() {
      const data = await axios.get(DATA_URL)
      for (let i = 0; i < Object.entries(data.data.Valute).length; i++) {
         arrValues.push([(Object.entries(data.data.Valute)[i][1].Name), Object.entries(data.data.Valute)[i][1].Value])
      }
      // <ul>
      //    {arrValues.map(item => {
      //       <li>
      //          Валюта:{item[0]}:Курс{item[1]}
      //          {console.log(item[0])}
      //       </li>
      //    })}
      // </ul>
      // console.log(arrValues[0]);
      // console.log(Object.entries(data.data.Valute)[2][0]);

      // console.log((Object.entries(data.data.Valute)[0][1].Value));
      // arrValues.push
      // setValueUsd(Object.entries(data.data.Valute)[10][1].Value)
      // setValueEur(Object.entries(data.data.Valute)[11][1].Value)
   }

   // useEffect(() => {
   //    getValutes()
   //    console.log(arrValues[0]);
   // }, [arrValues])



   return (
      <div>
         <h1></h1>
         <ul>
            {arrValues.map(item => {
               <li>
                  Валюта:{item[0]}:Курс{item[1]}

               </li>
            })}
         </ul>
         <Button onClick={getValutes} />
      </div>
   )
}
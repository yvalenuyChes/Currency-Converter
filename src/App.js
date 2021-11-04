import { Route, Switch } from 'react-router-dom'
import './style/style.scss'



import Converter from "./pages/Converter/Converter.js"
import ExchangeRate from './pages/ExchangeRates/ExchangeRates.js';


function App() {
  return (
    <Switch>
      <Route path='/' component={Converter} exact />
      <Route path='/exchange_rates' component={ExchangeRate} exact />
    </Switch>
  )
}

export default App;

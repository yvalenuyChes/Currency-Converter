import { Route, Switch } from 'react-router-dom'
import Converter from "./pages/Converter/Converter.js"
import ExchangeRate from './pages/ExchangeRates/ExchangeRates.js'
import './style/style.scss'

function App() {
  return (
    <Switch>
      <Route path='/' component={Converter} exact />
      <Route path='/exchange_rates' component={ExchangeRate} exact />
    </Switch>
  )
}

export default App

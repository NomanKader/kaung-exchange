import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import HomePage from './pages/Home/HomePage';
import CustomerPage from './pages/Customer/CustomerPage';
import BuyPage from './pages/Buy/BuyPage';
import NotFoundPage from './pages/Error/NotFoundPage';
import GoldPricePage from './pages/GoldPrice/GoldPricePage';
import ReportPage from './pages/Report/ReportPage';
export default function App({history}){
  return(
  <Router>    
    <Switch>
      <Route exact path='/' component={LoginPage}/>
      <Route exact path='/home' component={HomePage}/>
      <Route exact path='/buy' component={BuyPage}/>
      <Route exact path='/customer' component={CustomerPage}/>
      <Route exact path='/goldprice' component={GoldPricePage}/>
      <Route exact path='/report' component={ReportPage}/>
      <Route exact path='*' component={NotFoundPage}/>
    </Switch>
  </Router>
  )
}
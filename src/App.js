import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/admin/dashboard/DashboardPage';
import StockPage from './pages/admin/stock/StockPage';
import UserPage from './pages/admin/user/UserPage';
import SalePage from './pages/cashier/SalePage';
import ReportPage from './pages/admin/report/ReportPage';
import MobileMoneyPage from './pages/admin/mobilemoney/MobileMoneyPage';
export default function App({history}) {
  return(
    <Router>
      <Switch>
      <Route exact path='/' component={LoginPage}/>        
        <Route exact path='/admin/dashboard' component={DashboardPage}/>
        <Route exact path='/admin/mobilemoney' component={MobileMoneyPage}/>
        <Route exact path='/admin/stock' component={StockPage}/>
        <Route exact path='/admin/report' component={ReportPage}/>
        <Route exact path='/admin/user' component={UserPage}/>
        <Route exact path='/staff/sale' component={SalePage}/>        
      </Switch>
    </Router>
  )
}
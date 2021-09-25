import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Home from './screens/Home'
import ProductDetails from './screens/ProductDetails'
import Cart from './screens/Cart'
import Login from './screens/Login'
import Register from './screens/Register'
import Profile from './screens/Profile'
import ShippinScreen from './screens/ShippinScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderDetailsScreen from './screens/OrderDetailsScreen'
import AllUsersScreen from './screens/AllUsersScreen'
import EditUserScreen from './screens/EditUserScreen'
import ProductListScreen from './screens/ProductListScreen'
import EditProductScreen from './screens/EditProductScreen'
const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-5'>
        <Container>
          <Route path='/' component={Home} exact />
          <Route path='/search/:keyword' component={Home} />
          <Route path='/product/:id' component={ProductDetails} />
          <Route path='/cart/:id?' component={Cart} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={Profile} />
          <Route path='/shipping' component={ShippinScreen} />
          <Route path='/payment' component={PaymentMethodScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderDetailsScreen} />
          <Route path='/admin/user/:id/edit' component={EditUserScreen} />
          <Route path='/admin/users' component={AllUsersScreen} />
          <Route path='/admin/products' component={ProductListScreen} />
          <Route path='/admin/product/:id/edit' component={EditProductScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App

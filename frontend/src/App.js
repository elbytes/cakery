import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Home from './screens/Home'
import ProductDetails from './screens/ProductDetails'
import Cart from './screens/Cart'
import Login from './screens/Login'
import Register from './screens/Register'

const App = () =>{
  return (
    <Router>
      <Header />
      <main className='py-5'>
        <Container>
          <Route path='/' component={Home} exact/>
          <Route path='/product/:id' component={ProductDetails} />
          <Route path='/cart/:id?' component={Cart} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register}/>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

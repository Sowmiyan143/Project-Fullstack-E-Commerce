import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './pages/Home.css'
import Home from './pages/Home'
import Product from './pages/Product';
import Footer from './components/Footer';
import Header from './components/Header';
import Cart from './pages/Cart';
import ProductDeatil from './pages/ProductDeatil';
import Account from './pages/Account';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/productdetail/:id' element={<ProductDeatil/>}/>     
          <Route path='/account' element={<Account/>}/>
        </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;

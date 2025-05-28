import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UpdateProduct from './components/UpdateProduct';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import UpdateFew from './components/UpdateFew';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/add' element={<AddProduct />} />
        <Route path='/update/:productid' element={<UpdateProduct />} />
        <Route path='/updatefew/:productid' element={<UpdateFew />} />
        <Route path='/get/:productid' element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

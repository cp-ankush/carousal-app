import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ProductList from './productList'

const useGetData = ({setProducts}) => {
  useEffect(() => {
    fetch('http://localhost:3004/products').then((res) => {
      return res.json()
    }).then((res) => {
      setProducts(res)
    })
  }, [])
}

function App() {
  const [products, setProducts] = useState([])
  useGetData({setProducts})
  return (
    <div className="App">
      <ProductList
        products={products}
        />
    </div>
  );
}

export default App;

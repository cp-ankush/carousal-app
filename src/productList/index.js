import React, {useState} from 'react'
import PropTypes from 'prop-types'
import SearchBar from './searchBar'
import Carousal from './carousal'
import './styles.css'

const ProductList = ({products}) => {
  const [displayProducts, setDisplayProducts] = useState([])

  return (
    <div className="wrapper">
      <SearchBar
        setDisplayProducts={setDisplayProducts}
        products={products}
        />
      <Carousal products={displayProducts} />
    </div>
  )
}

export default ProductList

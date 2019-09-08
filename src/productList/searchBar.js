import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import './styles.css'

const renderCategory = ({item, index, selectedCategories, setCategories}) => {
  return (
    <div key={index}>
      <input
        type="checkbox"
        name={item}
        value={item}
        checked={selectedCategories[item]}
        onChange={(e) => {
          setCategories({
            ...selectedCategories,
            [e.target.value]: !selectedCategories[e.target.value]
          })}}
        />
        {item}
        <br />
    </div>
  )
}

const SearchBar = ({
  setDisplayProducts,
  products
}) => {
  const [selectedCategories, setCategories] = useState({})
  const [allCategories, setAllCategories] = useState([])

  useEffect(() => {
    let categories = {}
    products.forEach((item) => {
      categories[item.category] = false
    })
    setAllCategories(Object.keys(categories))
    setCategories(categories)
    setDisplayProducts(products)
  }, [products])

  useEffect(() => {
    let anyCategory = false
    const resultProducts = products.filter((item) => {
      if (selectedCategories[item.category]) {anyCategory = true}
      return selectedCategories[item.category]
    })

    if (!anyCategory) {
      setDisplayProducts(products)
    } else {
      setDisplayProducts(resultProducts)
    }

  }, [selectedCategories])

  return (
    <div className="searchContainer">
    {
      allCategories.map((item, index) => {
        return renderCategory({item, index, selectedCategories, setCategories})
      })
    }
    <div className={"button"} onClick={() => setCategories({})}>Clear</div>
    </div>
  )
}

export default SearchBar

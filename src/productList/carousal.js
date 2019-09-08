import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import './styles.css'

const renderItem = ({item, index, middleElement}) => {
  return (
    <div
      className={(middleElement == index)?  "item-container active" : "item-container"}
      key={index}
      >
        <img src={item.img} width={"100%"} height="100%" />
        <div className="info">
          <span className="title">
            {item.name}
          </span>
          <span>{`Rs: ${item.price} /-`}</span>
        </div>
      </div>
  )
}


const slider = (element, interval, maxLimit, setMiddleElement) => {
  let scrollAmount = 0;
  //
  function step(timestamp) {
    scrollAmount += interval;
    element.scrollLeft += interval;
    if (Math.abs(scrollAmount) < maxLimit) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step)

  // let slideTimer = setInterval(function(){
  //     element.scrollLeft += interval;
  //     scrollAmount += interval;
  //     if(Math.abs(scrollAmount) >= maxLimit){
  //         window.clearInterval(slideTimer);
  //     }
  // }, 5);
}

const handleScrollRight = ({ref, setMiddleElement}) => {
  const container = ref.current
  slider(container, 10, 310, setMiddleElement)
}

const handleScrollLeft = ({ref, setMiddleElement}) => {
  const container = ref.current
  slider(container, -10, 310, setMiddleElement)
}

const getMiddleElement = function(container){
  const parentPosition = container.scrollLeft
  const children = container.childNodes
  let result = 0
  return Math.round(parentPosition / 310) + 1
};

const handleScrollListener = ({containerRef, setMiddleElement}) => {
  const container = containerRef.current
  const middleElement = getMiddleElement(container)
  setMiddleElement(middleElement)
}

const Carousal = ({products}) => {
  const containerRef = useRef(null)
  const [middleElement, setMiddleElement] = useState(1)
  if (isEmpty(products)) {
    return null
  }
  return (
    <div className={"carousal-container"} ref={containerRef} onScroll={() => handleScrollListener({containerRef, setMiddleElement})}>
      <div className="indicator left-indicator" onClick={() => handleScrollLeft({ref: containerRef, setMiddleElement})}>
        <i className="left-arrow"></i>
      </div>
      {
        !isEmpty(products) && products.map((item, index) => {
          return (renderItem({item, index, middleElement}))
        })
      }
      <div className="indicator right-indicator" onClick={() => handleScrollRight({ref: containerRef, setMiddleElement})}>
        <i className="right-arrow"></i>
      </div>
    </div>
  )
}

export default Carousal

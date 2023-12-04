import React from 'react'

function BookRating({rating, review}) {
  function Star({rate, num, half}){
    return rate >= num ? (
        <span className="bi bi-star-fill text-yellow-500"></span>
      ) : rate >= half ? (
        <span className="bi bi-star-half text-yellow-500"></span>
      ) : (
        <span className="bi bi-star text-gray-300"></span>
      )
  }
  return (
        <div className="stars">
            <Star rate={rating} num={1} half={0.5}/>
            <Star rate={rating} num={2} half={1.5}/>
            <Star rate={rating} num={3} half={2.5}/>
            <Star rate={rating} num={4} half={3.5}/>
            <Star rate={rating} num={5} half={4.5}/>
            <span className="text-gray-500 text-xs ml-2">({review})</span>
        </div>
  )
}

export default BookRating
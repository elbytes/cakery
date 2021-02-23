import React from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'
import products from '../products'
import PropTypes from 'prop-types'
const Rating = ({value, text}) => {
    return (
        <div className='rating'>
            <span>
                <i className={value >= 1 ? 'star fas fa-star' : value >=0.5 ? 'star fas fa-star-half-alt' : 'star far fa-star'}></i>
            </span>
            <span>
                <i className={value >= 2 ? 'star fas fa-star' : value >=1.5 ? 'star fas fa-star-half-alt' : 'star far fa-star'}></i>
            </span>
            <span>
                <i className={value >= 3 ? 'star fas fa-star' : value >=2.5 ? 'star fas fa-star-half-alt' : 'star far fa-star'}></i>
            </span>
            <span>
                <i className={value >= 4 ? 'star fas fa-star' : value >=3.5 ? 'star fas fa-star-half-alt' : 'star far fa-star'}></i>
            </span>
            <span>
                <i className={value >= 5 ? 'star fas fa-star' : value >=4.5 ? 'star fas fa-star-half-alt' : 'star far fa-star'}></i>
            </span><br />
            <span>{text ? text : ''}</span>
        </div>
    )
}

Rating.propTypes = {
    value: PropTypes.number,
    text: PropTypes.string
}
export default Rating

import React from 'react';
import { FaStar } from 'react-icons/fa';
const RatingFromBd = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <FaStar
                key={i}
                color={i < rating ? '#ffc107' : '#e4e5e9'}
                size={24}
            />
        );
    }
    return <div>{stars}</div>;
};

export default RatingFromBd;
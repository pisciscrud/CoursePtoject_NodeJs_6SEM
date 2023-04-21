import { FaStar } from 'react-icons/fa';

function Rating({ value, onChange }) {
    const stars = Array.from({ length: 5 }, (_, index) => index + 1);

    return (
        <div>
            {stars.map((starValue) => (
                <FaStar
                    key={starValue}
                    size={24}
                    color={starValue <= value ? '#ffc107' : '#e4e5e9'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => onChange(starValue)}
                />
            ))}
        </div>
    );
}

export default Rating;
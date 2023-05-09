import React ,{useState}from 'react';
import styles from '../componets/main.module.css'
const FilterPanel = () => {


    const  [filterType, setFilterType]  = useState('')
    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };
    return (
        <div className={styles.filterPanel}>
            <div>
            <label htmlFor="animal-filter">Filter by animal type:</label>
            <select id="animal-filter" value={filterType} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
                <option value="bird">Birds</option>
            </select>
        </div>
        </div>
    );
};

export default FilterPanel;
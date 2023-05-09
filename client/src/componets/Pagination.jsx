import React from 'react';
import styles from './main.module.css'
const Pagination = ({ objectsPerPage, totalObjects, currentPage, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalObjects / objectsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav  >
            <ul className={styles.pagination} >
                <li >
                    {currentPage > 1 &&
                    <a href="#"  onClick={() => onPageChange(currentPage - 1)}>
                        {"<<"}
                    </a>
                    }
                </li>
                {pageNumbers.map((number) => (
                    <li key={number} >
                        <a href="#"  onClick={() => onPageChange(number)}>
                            {number}
                        </a>
                    </li>
                ))}
                <li >
                      {currentPage < Math.ceil(totalObjects / objectsPerPage) &&
                    <a href="#" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === Math.ceil(totalObjects / objectsPerPage)}>
                        {">>"}
                    </a>
                      }
                </li>
            </ul>

        </nav>
    );
};

export default Pagination;
import React, { useState } from 'react';
import './Header.css';
function Header({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <header className="header">
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
        </header>
    )
}

export default Header
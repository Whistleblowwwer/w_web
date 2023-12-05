import React, { useState, useEffect, onSelect } from 'react';
import classNames from 'classnames';


function CompanyAutocomplete(props) {
    const [query, setQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const suggestions = props.suggestions

    useEffect(() => {
        setFilteredSuggestions(
            props?.suggestions.filter((suggestion) =>
                suggestion?.name.toLowerCase().includes(props.companySearchQuery.toLowerCase())
            )
        );
        if (props.companySearchQuery.length > 0) {
        }
    }, [props.companySearchQuery, props.suggestions]);

    const handleInputChange = (event) => {
        props.setCompanySearchQuery(event.target.value);
        setDropdownOpen(true);
    };

    const handleSelectSuggestion = (suggestion) => {
        props.setCompanySearchQuery(suggestion?.name);
        props.setSelectedCompany(suggestion?._id_business)
        setDropdownOpen(false);
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={props.companySearchQuery}
                onChange={handleInputChange}
                placeholder="Selecciona una entidad"
                className="w-full p-2 border rounded-md"
            />
            {(isDropdownOpen && (props.companySearchQuery.length > 0)) && (
                <ul className="absolute z-10 w-full h-full mt-1 bg-white border rounded-md shadow-md">
                    {filteredSuggestions.map((suggestion) => (
                        <li
                            key={suggestion?._id_business}
                            className={classNames(
                                'p-2 cursor-pointer hover:bg-gray-100',
                                { 'bg-gray-100': props.companySearchQuery === suggestion }
                            )}
                            onClick={() => handleSelectSuggestion(suggestion)}
                        >
                            {suggestion?.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CompanyAutocomplete

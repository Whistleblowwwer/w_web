import { useState, useEffect } from "react";
import classNames from "classnames";

function CompanyAutocomplete(props) {

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);



  useEffect(() => {
    setFilteredSuggestions(
    props?.suggestions.filter((suggestion) =>
    suggestion?.name.toLowerCase().includes(props.companySearchQuery.toLowerCase())));


    if (props.companySearchQuery.length > 0) {
    }
  }, [props.companySearchQuery, props.suggestions]);

  const handleInputChange = (event) => {
    props.setCompanySearchQuery(event.target.value);
    setDropdownOpen(true);
  };

  const handleSelectSuggestion = (suggestion) => {
    props.setCompanySearchQuery(suggestion?.name);
    props.setSelectedCompany(suggestion?._id_business);
    setDropdownOpen(false);
  };

  return (
    <div className="relative w-full">
      <input
      type="text"
      value={props.companySearchQuery}
      onChange={handleInputChange}
      placeholder="Selecciona una empresa"
      className="w-full p-2 border rounded-md" />

      {isDropdownOpen && props.companySearchQuery.length > 0 &&
      <ul className="absolute z-50 w-full h-full mt-1 bg-white border rounded-md shadow-md">
          {filteredSuggestions.map((suggestion) =>
        <li
        key={suggestion?._id_business}
        className={classNames(
        "p-2 cursor-pointer bg-white hover:bg-gray-100",
        {
          "bg-gray-100": props.companySearchQuery === suggestion })}


        onClick={() => handleSelectSuggestion(suggestion)}>

              {suggestion?.name}
            </li>)}

        </ul>}

    </div>);

}

export default CompanyAutocomplete;
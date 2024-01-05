import { useState, useEffect } from "react";
import classNames from "classnames";

function CompanyAutocomplete(props) {

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);



  useEffect(() => {
    setFilteredSuggestions(
    props?.suggestions.filter((suggestion) =>
    suggestion?.name.toLowerCase().includes(props.usersSearchQuery.toLowerCase())));


    if (props.usersSearchQuery.length > 0) {
    }
  }, [props.usersSearchQuery, props.suggestions]);

  const handleInputChange = (event) => {
    props.setUsersSearchQuery(event.target.value);
    setDropdownOpen(true);
  };

  const handleSelectSuggestion = (suggestion) => {
    props.setUsersSearchQuery(`${suggestion?.name} ${suggestion?.last_name}`);
    props.setNewMessageUser({
      ...props.newMessageUser, // Preserve existing key-value pairs
      name: suggestion?.name,
      last_name: suggestion?.last_name,
      userId: suggestion._id_user });

    setDropdownOpen(false);
  };

  return (
    <div className="relative w-full pr-2">
      <input
      type="text"
      value={props.usersSearchQuery}
      onChange={handleInputChange}
      placeholder="Buscar personas"
      className="w-full p-2 border rounded-md" />

      {isDropdownOpen && props.usersSearchQuery.length > 0 &&
      <ul className="absolute z-50 w-full h-full mt-1 bg-white border rounded-md shadow-md">
          {filteredSuggestions.map((suggestion) =>
        <li
        key={suggestion?._id_user}
        className={classNames(
        "p-2 cursor-pointer bg-[#FFF] hover:bg-gray-100",
        {
          "bg-gray-100": props.companySearchQuery === suggestion })}


        onClick={() => handleSelectSuggestion(suggestion)}>

              {`${suggestion?.name} ${suggestion?.last_name}`}
            </li>)}

        </ul>}

    </div>);

}

export default CompanyAutocomplete;
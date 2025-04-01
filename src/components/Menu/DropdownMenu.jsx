import React, { useState } from 'react';

const DropdownMenu = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center text-[16rem] text-[#000000] w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-[transparent]  font-medium  hover:bg-[transparent] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={toggleDropdown}
        > 
          {selectedOption ? selectedOption : 'LANGUAGE'}
          <svg className="-mr-[1rem] ml-[2rem] h-[26rem] w-[26rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#000000" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-[70rem] rounded-md shadow-lg bg-[transparent] ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option, index) => (
              <button
                key={index}
                className="block w-full text-left px-4 py-2 text-[16rem] text-[#000000] hover:bg-[transparent] hover:text-gray-900"
                role="menuitem"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
import React from 'react';

const FilterBar = ({ countries, selectedCountry, setCountry }) => {
  return (
    <div className="mb-4">
      <div className="row">
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedCountry}
            onChange={(e) => setCountry(e.target.value)}
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

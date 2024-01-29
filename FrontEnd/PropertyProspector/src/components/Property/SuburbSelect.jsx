import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { getSuburbs } from './getApiData';

export default function SuburbSelected({ selectedRegion, selectedDistrict, selectedSuburbs, onSuburbsSelected }) {
  const [suburbs, setSuburbs] = useState([]);

  useEffect(() => {
    // Load all the suburbs for the selected district.
    if (selectedRegion && selectedDistrict) {
      const regionId = selectedRegion.LocalityId;
      const districtId = selectedDistrict.DistrictId;
      console.log(`Fetching suburbs for Region ${regionId}, District ${districtId}`);
      getSuburbs(regionId, districtId).then(setSuburbs);
    }
  }, [selectedRegion, selectedDistrict]);

  const handleSuburbSelect = (suburbItem) => {
    const isSuburbSelected = selectedSuburbs.some(
      (suburb) => suburb.SuburbId === suburbItem.SuburbId
    );

    let updatedSuburbs;

    if (isSuburbSelected) {
      // If suburb is already selected, remove it
      updatedSuburbs = selectedSuburbs.filter(
        (suburb) => suburb.SuburbId !== suburbItem.SuburbId
      );
    } else {
      // If suburb is not selected, add it
      updatedSuburbs = [...selectedSuburbs, suburbItem];
    }

    console.log('Selected Suburbs in SuburbsSelected:', updatedSuburbs);

    // Update the parent component with the new selected suburbs
    onSuburbsSelected(updatedSuburbs);
  };

  return (
    <div className='suburbSelect'>
      <Dropdown autoClose={false}>
        <Dropdown.Toggle variant="success" id="dropdown-autoclose-false">
          {selectedSuburbs.length > 0
            ? selectedSuburbs.map((suburb) => suburb.Name).join(', ')
            : 'Select Suburb'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {suburbs.map((suburbItem, index) => (
            <Dropdown.Item key={suburbItem.SuburbId} className="checkbox-inline">
              <input
                onClick={(e) => e.stopPropagation()}
                type="checkbox"
                id={`default-checkbox-${index}`}
                checked={selectedSuburbs.some((suburb) => suburb.SuburbId === suburbItem.SuburbId)}
                onChange={() => handleSuburbSelect(suburbItem)}
              />
              <label htmlFor={`default-checkbox-${index}`}>{suburbItem.Name || 'Unknown Suburb'}</label>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

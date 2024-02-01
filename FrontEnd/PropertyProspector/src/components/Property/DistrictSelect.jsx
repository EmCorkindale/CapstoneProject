import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { getDistricts } from './getApiData';

export default function DistrictSelect({ selectedRegion, selectedDistrict, onDistrictSelected, clearSearch }) {
  const [districts, setDistricts] = useState(null);

  useEffect(() => {
    if (selectedRegion) {
      // Fetch all districts using getDistricts function and update the state
      getDistricts(selectedRegion.LocalityId).then(setDistricts);
    }
  }, [selectedRegion]);

  const handleDistrictSelect = (district) => {
    onDistrictSelected(district);
    console.log('Selected District in DistrictSelected:', selectedDistrict);
  }

  return (
    <Dropdown>
       <Dropdown.Toggle id="dropdown-basic" className='districtDropdown'>
        {selectedDistrict ? selectedDistrict.Name : 'Select District'}
      </Dropdown.Toggle>
      <Dropdown.Menu className='districtMenu'>
        {districts && districts.map((districtItem) => (
          <Dropdown.Item
            key={districtItem.DistrictId}
            onClick={() => handleDistrictSelect(districtItem)}
          >
            {districtItem.Name || 'Unknown District'}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};


import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { getRegions } from './getApiData';

export default function RegionSelect({ selectedRegion, onRegionSelected, clearSearch }) {
  const [regions, setRegions] = useState(null);

  useEffect(() => {
    // Fetch all regions using getRegion function and update the state
    getRegions().then(setRegions);
  }, []);

  const handleRegionSelect = (region) => {
    onRegionSelected(region);
    console.log('Selected Region in RegionSelect:', selectedRegion);
  }

  return (
    <Dropdown>
       <Dropdown.Toggle id="dropdown-basic" className='regionDropdown'>
        {selectedRegion ? selectedRegion.Name : 'Select Region'}
      </Dropdown.Toggle>
      <Dropdown.Menu className='regionMenu'>
        {regions && regions.map((regionItem) => (
          <Dropdown.Item
            key={regionItem.LocalityId}
            onClick={() => handleRegionSelect(regionItem)}
          >
            {regionItem.Name || 'Unknown Region'}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

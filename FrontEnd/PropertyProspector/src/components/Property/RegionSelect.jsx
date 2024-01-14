import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
import { getRegion } from './getApiData';

export default function RegionSelect(props) {
  const [region, setRegion] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    // Fetch all regions using getRegion function and update the state
    getRegion().then((data) => {
      console.log(data);
      setRegion(data);
    });
  }, []);

  const handleRegionSelect = (regionItem) => {
    setSelectedRegion(regionItem);
    // Call the onSelect prop with the selected region's LocalityId
    props.onSelect(regionItem.LocalityId);
    console.log("Selected Region in RegionSelect:", regionItem);
  };


  return (
    <div>
      {region.length > 0 ? (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedRegion ? selectedRegion.Name : 'Select Region'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {region.map((regionItem) => (
              <Dropdown.Item
                key={regionItem.LocalityId}
                onClick={() => handleRegionSelect(regionItem)}
              >
                {regionItem.Name || 'Unknown Region'}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <p>No regions available.</p>
      )}
    </div>
  );
}

// Add propTypes validation
RegionSelect.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

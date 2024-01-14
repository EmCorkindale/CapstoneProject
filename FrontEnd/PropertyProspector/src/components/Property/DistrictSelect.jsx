import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types'; 
import { getDistrict } from './getApiData';


export default function DistrictSelect(props) {
  const [district, setDistrict] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    if (!props.regionId) {
      setDistrict(null);
      return;
    }

    // Fetch all regions using getRegion function and update the state
    getDistrict(props.regionId).then((data) => {
      console.log(data);
      setDistrict(data);
    });
  }, [props.regionId]);

  const handleDistrictSelect = (districtItem) => {
    setSelectedDistrict(districtItem);
    props.onSelect(districtItem.DistrictId); // Pass DistrictId to the parent component
  };

  return (
    <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedDistrict ? selectedDistrict.Name : 'Select District'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {(district || []).map((districtItem) => (
              <Dropdown.Item
                key={districtItem.DistrictId}
                onClick={() => handleDistrictSelect(districtItem)}
              >
                {districtItem.Name || 'Unknown District'}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
    </div>
  );
};

// Add propTypes validation
DistrictSelect.propTypes = {
  onSelect: PropTypes.func.isRequired,
};




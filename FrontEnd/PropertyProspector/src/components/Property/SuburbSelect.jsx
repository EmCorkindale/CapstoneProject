import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
import { getSuburbs } from './getApiData';
import FormCheck from 'react-bootstrap/FormCheck'

export default function SuburbSelect(props) {
    const [suburbs, setSuburbs] = useState(null);
    const [selectedSuburbs, setSelectedSuburbs] = useState([]);

    useEffect(() => {
        if (!props.districtId || !props.regionId) {
            setSuburbs(null);
            return;
        }

        // Fetch all suburbs using getSuburbs function and update the state
        getSuburbs(props.regionId, props.districtId).then((data) => {
            console.log(data);
            setSuburbs(data);
        });
    }, [props.regionId, props.districtId]);

    const handleSuburbSelect = (suburbItem) => {
        setSelectedSuburbs((prevSelectedSuburbs) => {
          const updatedSuburbs = [...prevSelectedSuburbs, suburbItem];
          props.onSelect(updatedSuburbs.map(suburb => suburb.SuburbId));
          return updatedSuburbs;
        });
      };
    
      const handleRemoveSuburb = (suburbItem) => {
        setSelectedSuburbs((prevSelectedSuburbs) => {
          const updatedSuburbs = prevSelectedSuburbs.filter(suburb => suburb.SuburbId !== suburbItem.SuburbId);
          props.onSelect(updatedSuburbs.map(suburb => suburb.SuburbId));
          return updatedSuburbs;
        });
      };

    return (
        <div>
            <Dropdown autoClose={false}>
                <Dropdown.Toggle variant="success" id="dropdown-autoclose-false">
                    {selectedSuburbs.length > 0
                        ? selectedSuburbs.map(suburb => suburb.Name).join(', ')
                        : 'Select Suburb'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {(suburbs || []).map((suburbItem, index) => (
                        <Dropdown.Item key={suburbItem.SuburbId}>
                            <FormCheck
                                type="checkbox"
                                id={`default-checkbox-${index}`}
                                label={suburbItem.Name || 'Unknown Suburb'}
                                checked={selectedSuburbs.some(suburb => suburb.SuburbId === suburbItem.SuburbId)}
                                onChange={() => handleSuburbSelect(suburbItem)}
                                aria-label={suburbItem.Name}
                            />
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

// PropTypes validation
SuburbSelect.propTypes = {
    onSelect: PropTypes.func.isRequired,
};
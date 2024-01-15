import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
import { getSuburbs } from './getApiData';
import { Button } from 'react-bootstrap';
import { MatchingProperty } from './MatchingProperty';

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

    const handleSuburbSelect = () => {
        const selectedSuburbIds = selectedSuburbs.map((suburb) => suburb.SuburbId);
        props.onSelect(selectedSuburbIds);
    };

    const handleToggle = (suburbItem) => {
        const isSelected = selectedSuburbs.some((suburb) => suburb.SuburbId === suburbItem.SuburbId);
    
        if (isSelected) {
            const updatedSuburbs = selectedSuburbs.filter((suburb) => suburb.SuburbId !== suburbItem.SuburbId);
            setSelectedSuburbs(updatedSuburbs);
        } else {
            setSelectedSuburbs((prevSuburbs) => [...prevSuburbs, suburbItem]);
        }
    };

    return (
        <div>
            <Dropdown autoClose={false}>
                <Dropdown.Toggle variant="success" id="dropdown-autoclose-false">
                    {selectedSuburbs.length > 0
                        ? selectedSuburbs.map((suburb) => suburb.Name).join(', ')
                        : 'Select Suburb'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {suburbs &&
                        suburbs.map((suburbItem, index) => (
                            <Dropdown.Item key={suburbItem.SuburbId} className="checkbox-inline">
                                <input
                                    onClick={(e) => e.stopPropagation()}
                                    type="checkbox"
                                    id={`default-checkbox-${index}`}
                                    checked={selectedSuburbs.some((suburb) => suburb.SuburbId === suburbItem.SuburbId)}
                                    onChange={() => handleToggle(suburbItem)}
                                />
                                <label htmlFor={`default-checkbox-${index}`}>{suburbItem.Name || 'Unknown Suburb'}</label>
                            </Dropdown.Item>
                        ))}
                </Dropdown.Menu>
            </Dropdown>
            <Button onClick={handleSuburbSelect}>Search</Button>
        </div>
    );
}

// PropTypes validation
SuburbSelect.propTypes = {
    onSelect: PropTypes.func.isRequired
};

import { useState, useEffect } from "react";
import DistrictSelect from "../components/Property/DistrictSelect";
import RegionSelect from "../components/Property/RegionSelect";
import SuburbSelect from "../components/Property/SuburbSelect";
import { Button } from "react-bootstrap";
import { MatchingProperty } from "../components/Property/MatchingProperty";
import { ExpandedSearch } from "../components/Property/ExpandedSearch";

export function Property() {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedSuburbs, setSelectedSuburbs] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState({
        low: null,
        high: null,
      });
    

    const handleDistrictSelect = (district) => {
        // Handle district selection here if needed
        console.log('Selected District in Property:', district);
    };
    const handleSuburbSelect = (suburbs) => {
        console.log('Selected Suburb in Property:', suburbs);
        setSelectedSuburbs(suburbs);
    }
    const handlePriceRangeSelect = (low, high) => {
        setSelectedPriceRange({ low, high });
      };


    return (
        <>
            <h1>Current Listings</h1>
            <h2>Location</h2>
            <div className="propertySearch">
            <RegionSelect onSelect={setSelectedRegion} />
            <DistrictSelect onSelect={handleDistrictSelect, setSelectedDistrict} regionId={selectedRegion} />
            <SuburbSelect onSelect={handleSuburbSelect} regionId={selectedRegion} districtId={selectedDistrict}  />
            </div>
            <div className="expandedSearch">
            <ExpandedSearch onSelect={handlePriceRangeSelect}/>
            </div>
            <MatchingProperty  suburbIds={selectedSuburbs}/>
            
        </>
    );
}

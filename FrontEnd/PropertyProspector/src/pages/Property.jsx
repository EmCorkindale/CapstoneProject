import { useState, useEffect } from "react";
import DistrictSelect from "../components/Property/DistrictSelect";
import RegionSelect from "../components/Property/RegionSelect";
import SuburbSelect from "../components/Property/SuburbSelect";
import { MatchingProperty } from "../components/Property/MatchingProperty";

export function Property() {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedSuburbs, setSelectedSuburbs] = useState([]);

    const handleDistrictSelect = (district) => {
        // Handle district selection here if needed
        console.log('Selected District in Property:', district);
    };
    const handleSuburbSelect = (suburbs) => {
        console.log('Selected Suburb in Property:', suburbs);
        setSelectedSuburbs(suburbs);
    }

    return (
        <>
            <h1>Current Listings</h1>
            <h2>Location</h2>
            <RegionSelect onSelect={setSelectedRegion} />
            <DistrictSelect onSelect={handleDistrictSelect, setSelectedDistrict} regionId={selectedRegion} />
            <SuburbSelect onSelect={handleSuburbSelect} regionId={selectedRegion} districtId={selectedDistrict}  />
            <MatchingProperty  suburbIds={selectedSuburbs}/>
        </>
    );
}

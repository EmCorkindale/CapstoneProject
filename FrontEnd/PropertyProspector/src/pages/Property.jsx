import { useState, useEffect } from "react";
import DistrictSelect from "../components/Property/DistrictSelect";
import RegionSelect from "../components/Property/RegionSelect";
import SuburbSelect from "../components/Property/SuburbSelect";
import { PropertyResults } from "../components/Property/PropertyResults";
import { ExpandedSearch } from "../components/Property/ExpandedSearch";
import { Button } from "react-bootstrap";
import { getMatchingProperty } from "../components/Property/getApiData";

export function Property (){
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedSuburbs, setSelectedSuburbs] = useState([]);
    const [expandedOptions, onExpandedOptionsChanged] = useState({bedrooms: 1, bathrooms:1, priceLow: 500000, priceHigh: 1000000});
    const [matchingProperties, setMatchingProperties] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);


    const performSearch = async()=>{
        try {
            const suburbIds = selectedSuburbs.map(x => x.SuburbId);
            const result = await getMatchingProperty(suburbIds, expandedOptions.priceLow, expandedOptions.priceHigh, expandedOptions.bedrooms, expandedOptions.bathrooms );
            setMatchingProperties(result);
            setSearchPerformed(true);
        } catch (error) {
            // Handle errors appropriately
            console.error("Error performing search:", error);
        }
    };

    return(
        <>
        <RegionSelect  selectedRegion={selectedRegion} onRegionSelected={setSelectedRegion} />
        <DistrictSelect selectedRegion={selectedRegion} selectedDistrict={selectedDistrict} onDistrictSelected={setSelectedDistrict} />
        <SuburbSelect selectedRegion={selectedRegion} selectedDistrict={selectedDistrict} selectedSuburbs= {selectedSuburbs} onSuburbsSelected={setSelectedSuburbs}/>
        <ExpandedSearch expandedOptions={expandedOptions} onExpandedOptionsChanged={onExpandedOptionsChanged}/>
        <Button onClick={performSearch}>Search</Button>
        <PropertyResults matchingProperties={matchingProperties} searchPerformed={searchPerformed}/>  
        </> 
    );
}


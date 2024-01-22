import { useState, useEffect } from "react";
import DistrictSelect from "../components/Property/DistrictSelect";
import RegionSelect from "../components/Property/RegionSelect";
import SuburbSelect from "../components/Property/SuburbSelect";
import { PropertyResults } from "../components/Property/PropertyResults";
import { ExpandedSearch } from "../components/Property/ExpandedSearch";
import { Button, Container } from "react-bootstrap";
import { getMatchingProperty } from "../components/Property/getApiData";

export function Property (){
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedSuburbs, setSelectedSuburbs] = useState([]);
    const [expandedOptions, onExpandedOptionsChanged] = useState({bedroomsMin: 1, bedroomsMax:4, bathrooms:1, priceLow: '$500k', priceHigh: '$1M'});
    const [matchingProperties, setMatchingProperties] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);


    const performSearch = async()=>{
        try {
            const suburbIds = selectedSuburbs.map(x => x.SuburbId);
            const result = await getMatchingProperty(suburbIds, expandedOptions.priceLow, expandedOptions.priceHigh, expandedOptions.bedroomsMin, expandedOptions.bedroomsMax, expandedOptions.bathrooms );
            setMatchingProperties(result);
            setSearchPerformed(true);
        } catch (error) {
            // Handle errors appropriately
            console.error("Error performing search:", error);
        }
    };
    const clearSearch = ()=>{
        setSearchPerformed(false);
        setSelectedRegion(null);
        setSelectedDistrict(null);
        setSelectedSuburbs([]);
    }

    return(
        <>
        <Container fluid='md'>
        <h1 className="currentListings">Current Listings</h1>
        <h2 className="searchForProperty">Search for Property</h2>
        <div className="basicSearch">
        <RegionSelect  selectedRegion={selectedRegion} onRegionSelected={setSelectedRegion} />
        <DistrictSelect selectedRegion={selectedRegion} selectedDistrict={selectedDistrict} onDistrictSelected={setSelectedDistrict} />
        <SuburbSelect selectedRegion={selectedRegion} selectedDistrict={selectedDistrict} selectedSuburbs= {selectedSuburbs} onSuburbsSelected={setSelectedSuburbs}/>
        <Button onClick={performSearch}>Search</Button>
        {/* <Button onClick={() => setSearchPerformed(false)}>Clear</Button> */}
        </div>
        <div className="expandedSearch"> 
        <ExpandedSearch expandedOptions={expandedOptions} onExpandedOptionsChanged={onExpandedOptionsChanged}/>
        </div>
        <PropertyResults matchingProperties={matchingProperties} searchPerformed={searchPerformed} />  
        </Container>
        </> 
    );
}


import { useState, useEffect } from "react";
import DistrictSelect from "../components/Property/DistrictSelect";
import RegionSelect from "../components/Property/RegionSelect";
import SuburbSelect from "../components/Property/SuburbSelect";
import { PropertyResults } from "../components/Property/PropertyResults";
import { ExpandedSearch } from "../components/Property/ExpandedSearch";
import { Button, Container } from "react-bootstrap";
import { getMatchingProperty } from "../components/Property/getApiData";
import { BottomSection } from "../components/Reusable/BottomSection";

export function Property() {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedSuburbs, setSelectedSuburbs] = useState([]);
    const [expandedOptions, onExpandedOptionsChanged] = useState({ bedroomsMin: "Any", bedroomsMax: "Any", bathrooms: "Any", priceLow: 'Any', priceHigh: 'Any' });
    const [matchingProperties, setMatchingProperties] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);


    const performSearch = async () => {
        try {
            const suburbIds = selectedSuburbs.map(x => x.SuburbId);
            const result = await getMatchingProperty(suburbIds, expandedOptions.priceLow, expandedOptions.priceHigh, expandedOptions.bedroomsMin, expandedOptions.bedroomsMax, expandedOptions.bathrooms);
            setMatchingProperties(result);
            setSearchPerformed(true);
        } catch (error) {
            // Handle errors appropriately
            console.error("Error performing search:", error);
        }
    };
    const clearSearch = () => {
        setSearchPerformed(false);
        setSelectedRegion(null);
        setSelectedDistrict(null);
        setSelectedSuburbs([]);
        onExpandedOptionsChanged({ bedroomsMin: "Any", bedroomsMax: "Any", bathrooms: "Any", priceLow: 'Any', priceHigh: 'Any' });
    }

    return (
        <>
            <Container fluid='md'>
                <h1 className="currentListings">Current Listings</h1>
                <h2 className="searchForProperty">Search for Property</h2>
                    <div className="searchBar">
                        <RegionSelect selectedRegion={selectedRegion} onRegionSelected={setSelectedRegion} clearSearch={clearSearch} />
                        <DistrictSelect selectedRegion={selectedRegion} selectedDistrict={selectedDistrict} onDistrictSelected={setSelectedDistrict} clearSearch={clearSearch} />
                        <SuburbSelect selectedRegion={selectedRegion} selectedDistrict={selectedDistrict} selectedSuburbs={selectedSuburbs} onSuburbsSelected={setSelectedSuburbs} clearSearch={clearSearch}/>
                        <button className="search" onClick={performSearch}>Search</button>
                         <button className="clear" onClick={clearSearch}>Clear</button>
                    </div>
                <div className="expandedSearch">
                    <ExpandedSearch expandedOptions={expandedOptions} onExpandedOptionsChanged={onExpandedOptionsChanged} clearSearch={clearSearch} />
                </div>
                <PropertyResults matchingProperties={matchingProperties} searchPerformed={searchPerformed} />
                <BottomSection />
            </Container>
        </>
    );
}


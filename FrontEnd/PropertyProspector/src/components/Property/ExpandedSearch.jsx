import { useEffect } from "react";
import { Dropdown } from "react-bootstrap";

export function ExpandedSearch({ expandedOptions = {}, onExpandedOptionsChanged }) {
    const priceRangeLow = [{display: '$100k', value:100000}, {display: '$150k', value:150000}, {display:'$200k', value:200000}, {display:'$250k', value: 250000}, {display:'$300k', value:300000}, {display:'$350k', value:350000} {display:'$400k', value:400000}, {display:'$450k', value: 450000}, {display:'$500k', value:550000}, {display:'$550k', value: 550000}, {display:'$600k', value:600000}, {display:'$650k', value:650000} {display:'$700k', value:700000}, {display:'$750k', value:750000}, {display:'$800k', value:800000}, {display:'$850k', value:850000} {display:'$900k', value:900000}, {display:'$950k', value:950000}, {display:'$1.1M', value:1100000}, {display:'$1.2M', value:1200000}, {display:'$1.3M', value:1300000}, {display:'$1.4M', value:1400000}, {display:'$1.5M', value:1500000}, {display:'$1.6M', value:1600000}, {display:'$1.7M', value: 1700000}, {display:'$1.8M', value:1800000}, {display:'$1.9M', value:1900000}, {display:'$2M', value:2000000}, {display:'$2.25M', value:2250000}, {display:'$2.5M', value:2500000}, {display:'$2.75M', value:2750000}, {display:'$3M', value:3000000}, {display:'$3.5M', value:3500000}, {display:'$4M', value:4000000}, {display:'4.5M', value:4500000}, {display:'$5M', value:5000000}, {display:'$6M', value:6000000}, {display:'$7M', value:7000000}, {display:'$8M', value:8000000}, {display:'$9M', value:9000000}, {display:'$10M', value:10000000}];
    const priceRangeHigh = [...priceRangeLow];
    const Bedrooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const Bathrooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    useEffect(() => {
    
    }, [expandedOptions]);

    const handlePriceRangeLowSelect = (priceLow) => {
        onExpandedOptionsChanged({
            ...expandedOptions,
            priceLow: priceLow
        });
    };

    const handlePriceRangeHighSelect = (priceHigh) => {
        onExpandedOptionsChanged({
            ...expandedOptions,
            priceHigh: priceHigh
        });
    };

    const handleBedroomSelect = (bedrooms) => {
        onExpandedOptionsChanged({
            ...expandedOptions,
            bedrooms: bedrooms
        });
    };

    const handleBathroomSelect = (bathrooms) => {
        onExpandedOptionsChanged({
            ...expandedOptions,
            bathrooms: bathrooms
        });
    };

    return (
        <>
            <h3 className="price">Price</h3>
            <Dropdown>
                <Dropdown.Toggle variant="success" data-bs-toggle="dropdown" data-bs-auto-close="*">
                    {expandedOptions.priceLow ?? 'Any'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {priceRangeLow.map((price) => (
                        <Dropdown.Item value={price.value} key={price.value} as="button" onClick={() => handlePriceRangeLowSelect(price.value)}>
                            {price.display}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <p>-</p>
            <Dropdown>
                <Dropdown.Toggle variant="success" data-bs-toggle="dropdown" data-bs-auto-close="*">
                    {expandedOptions.priceHigh ?? 'Any'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {priceRangeHigh.map((price) => (
                        <Dropdown.Item value={price.value} key={price.value} as="button" onClick={() => handlePriceRangeHighSelect(price.value)}>
                            {price.display}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            <h3 className="bedrooms">Bedrooms</h3>
            <Dropdown>
                <Dropdown.Toggle variant="success" data-bs-toggle="dropdown" data-bs-auto-close="*">
                    {expandedOptions.bedrooms ?? 'Any'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {Bedrooms.map((bedroom) => (
                        <Dropdown.Item key={bedroom} as="button" onClick={() => handleBedroomSelect(bedroom)}>
                            {bedroom}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            <h3 className="bedrooms">Bathrooms</h3>
            <Dropdown>
                <Dropdown.Toggle variant="success" data-bs-toggle="dropdown" data-bs-auto-close="*">
                    {expandedOptions.bathrooms ?? 'Any'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {Bathrooms.map((bathroom) => (
                        <Dropdown.Item key={bathroom} as="button" onClick={() => handleBathroomSelect(bathroom)}>
                            {bathroom}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}

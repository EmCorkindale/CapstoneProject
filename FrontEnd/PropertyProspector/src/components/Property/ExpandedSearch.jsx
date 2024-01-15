import { useState } from "react";
import { Dropdown } from "react-bootstrap";

export function ExpandedSearch(props) {
    const priceRangeLow = ['$100k', '$150k', '$200k', '$250k', '$300k', '$350k', '$400k', '$450k', '$500k', '$550k', '$600k', '$650k', '$700k', '$750k', '$800k', '$850k', '$900k', '$950k', '$1.1M', '$1.2M', '$1.3M', '$1.4M', '$1.5M', '$1.6M', '$1.7M', '$1.8M', '$1.8M', '$1.9M', '$2M', '$2.25M', '$2.5M', '$2.75M', '$3M', '$3.5M', '$4M', '4.5M', '$5M', '$6M', '$7M', '$8M', '$9M', '$10M'];
    const priceRangeHigh = [...priceRangeLow];
    const [selectedLowPrice, setSelectedLowPrice] = useState(null);
    const [selectedHighPrice, setSelectedHighPrice] = useState(null);

    const handlePriceRangeLowSelect = (price_min) => {
        setSelectedLowPrice(price_min);
        props.onSelect(price_min);
    };

    const handlePriceRangeHighSelect = (price_max) => {
        setSelectedHighPrice(price_max);
        props.onSelect(price_max);
    };

    return (
        <>
            <h3 className="price">Price</h3>
            <Dropdown>
                <Dropdown.Toggle variant="success" data-bs-toggle="dropdown" data-bs-auto-close="*" >
                    {selectedLowPrice ? selectedLowPrice : 'Any'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {priceRangeLow.map((price_min) => (
                        <Dropdown.Item key={price_min} as="button" onClick={() => handlePriceRangeLowSelect(price_min)}>
                            {price_min}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <p>-</p>
            <Dropdown>
                <Dropdown.Toggle variant="success" data-bs-toggle="dropdown" data-bs-auto-close="*" >
                    {selectedHighPrice ? selectedHighPrice : 'Any'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {priceRangeHigh.map((price_high) => (
                        <Dropdown.Item key={price_high} as="button" onClick={() => handlePriceRangeHighSelect(price_high)}>
                            {price_high}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}

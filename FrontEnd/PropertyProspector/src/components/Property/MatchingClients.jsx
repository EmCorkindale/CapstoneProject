import { useState, useEffect } from 'react';
import { getMatchingClients } from './getApiData';

export default function MatchingClients({ suburb, bedrooms, bathrooms }) {
    const [matchingClients, setMatchingClients] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMatchingClients = async () => {
            try {
                setLoading(true);

                // Call the API function to get matching clients based on the selected property
                const clients = await getMatchingClients( suburb, bedrooms, bathrooms);

                setMatchingClients(clients);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching matching clients:', error);
                setLoading(false);
            }
        };

        // Check if a property is selected before fetching clients
        if (suburb, bedrooms || bathrooms) {
            fetchMatchingClients();
        } else {
            // Reset matchingClients if no property is selected
            setMatchingClients([]);
        }
    }, [suburb, bedrooms, bathrooms]);

    return (
        <div>
            <h2>Matching Clients</h2>
            {loading && <p>Loading...</p>}
            {!loading && matchingClients.length > 0 ? (
                <ul>
                    {matchingClients.map((client) => (
                        <li key={client.clientID}>
                            {`${client.firstName} ${client.lastName}, Email: ${client.emailAddress}, Phone: ${client.phoneNumber}`}
                            {/* Add more client details as needed */}
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && <p>No matching clients found.</p>
            )}
        </div>
    );
}


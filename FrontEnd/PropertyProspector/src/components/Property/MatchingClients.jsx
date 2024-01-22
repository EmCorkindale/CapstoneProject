import { useState, useEffect } from 'react';
import { getMatchingClients } from './getApiData';

export default function MatchingClients({ selectedProperty }) {
    const [matchingClients, setMatchingClients] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMatchingClients = async () => {
            try {
                setLoading(true);

                // Call the API function to get matching clients based on the selected property
                const clients = await getMatchingClients(selectedProperty);

                setMatchingClients(clients);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching matching clients:', error);
                setLoading(false);
            }
        };

        // Check if a property is selected before fetching clients
        if (selectedProperty) {
            fetchMatchingClients();
        } else {
            // Reset matchingClients if no property is selected
            setMatchingClients([]);
        }
    }, [selectedProperty]);

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


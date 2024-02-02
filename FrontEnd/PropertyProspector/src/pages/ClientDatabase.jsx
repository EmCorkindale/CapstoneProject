import { useEffect, useState, Fragment } from 'react';
import { FormCheck } from 'react-bootstrap';
import { apiGetClients } from '../components/ClientDatabase/apiGetClients';
import { BottomSection } from '../components/Reusable/BottomSection';
import HoverPropertyRequirements from '../components/ClientDatabase/HoverPropertyRequirements';
import { AddClients } from '../components/ClientDatabase/addClients';

export function ClientDatabase() {
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [hoveredClient, setHoveredClient] = useState(null);

  useEffect(() => {
    // Fetch all properties using apiPropertyGet and update the state
    apiGetClients().then((data) => setClients(data));
  }, []);

  const handleSelectClient = (clientID) => {
    // Toggle selected state of a client
    setSelectedClients((prevSelectedClients) => {
      if (prevSelectedClients.includes(clientID)) {
        // Client is already selected, deselect it
        return prevSelectedClients.filter((id) => id !== clientID);
      } else {
        // Client is not selected, select it
        return [...prevSelectedClients, clientID];
      }
    });
  };

  const handleHoverClient = (clientID) => {
    setHoveredClient(clientID);
  };

  const handleLeaveClient = () => {
    setHoveredClient(null);
  };

  return (
    <>
      <div className='databaseHeading'>
        <h1>My Database</h1>
      </div>
      <div>
      </div>
      <section className='databaseTableContainer'>
        <table className='database'>
          <thead className='databaseHeadings'>
            <tr>
              <th></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <Fragment key={client.clientID}>
                <tr
                  className={`clientRow ${index % 2 === 0 ? 'even-row' : 'odd-row'} ${hoveredClient === client.clientID ? 'hovered' : ''}`}
                  onClick={() => handleSelectClient(client.clientID)}
                  onMouseOver={() => handleHoverClient(client.clientID)}
                  onMouseOut={handleLeaveClient}
                >
                  <td>
                    <FormCheck
                      type="checkbox"
                      className='clientSelect'
                      checked={selectedClients.includes(client.clientID)}
                    />
                  </td>
                  <td>{client.firstName}</td>
                  <td>{client.lastName}</td>
                  <td>{client.emailAddress}</td>
                  <td>{client.phoneNumber}</td>
                  <td style={{ minWidth: '300px' }}>{client.address}</td>
                </tr>
                {hoveredClient === client.clientID && (
                  <tr>
                    <td colSpan={6}>
                      <HoverPropertyRequirements clientID={hoveredClient} className= "hoverPropertyRequirements" />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </section>
      <BottomSection />
    </>
  );
}

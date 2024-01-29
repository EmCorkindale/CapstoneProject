import { useEffect, useState } from 'react';
import { apiGetClients } from './apiGetClients';
import { MdOutlineBedroomChild, MdOutlineBathroom, MdOutlineLiving, MdOutlineGarage  } from "react-icons/md";
import { RiMapPinLine } from "react-icons/ri";


function HoverPropertyRequirements({ clientID }) {
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Fetch the specific client using apiGetClients and update the state
    apiGetClients().then((data) => {
      const selectedClient = data.find((client) => client.clientID === clientID);
      setClient(selectedClient);
    });
  }, [clientID]);

  if (!client) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <section className='hoverPropertyRequirements'>
        <div>
        <MdOutlineBedroomChild style={{ marginRight: '5px' }} />Bedrooms: {client.reqBedsMin} - {client.reqBedsMax},
        </div>
        <div>
        <MdOutlineBathroom style={{ marginRight: '5px' }}/> Bathrooms: {client.reqBaths},
        </div>
        <div>
        <MdOutlineLiving style={{ marginRight: '5px' }}/>Living: {client.reqLiving},
        </div>
        <div>
        <MdOutlineGarage style={{ marginRight: '5px' }}/>Garage: {client.reqGarage},
        </div>
        <div>
        <RiMapPinLine style={{ marginRight: '5px' }}/>Suburbs: {client.selectedSuburbs.map((suburb) => suburb.name).join(", ")}
        </div>
          
      </section>
    </div>
  );
}

export default HoverPropertyRequirements;

import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/services')
        .then(res => res.json())
        .then(data => setServices(data))
    },[])


    return (
        <div className="mt-10 ">
            <div className="text-center space-y-5 ">
                <h2 className="text-3xl font-bold ">Our Service Area</h2>
                <h3 className="w-1/2 mx-auto">the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. </h3>
            </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        
            {
                services.map(service => 
                <ServiceCard 
                    key={service._id}
                     service={service}
                 ></ServiceCard>)
            }
           </div>
         </div>
    );
};

export default Services;
import { Link } from "react-router-dom";


const ServiceCard = ({ service }) => {
    const {_id, title, img, price } = service;
   
   

    return (
        <div className="card card-compact w-75 bg-red-100 shadow-xl ">
            <figure className="p-3 h-full"><img className="rounded-xl h-full" src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="text-xl text-[#FF3811]">${price}</p>
               
                <div>
                    <Link to={`/checkout/${_id}`}>
                      <button className="btn btn-primary">Book Now</button>
                    </Link>
                </div>
            </div>
        
        </div>
    );
};

export default ServiceCard;
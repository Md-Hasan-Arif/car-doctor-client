// import { data } from "autoprefixer";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";



const CheckOut = () => {
    const { id, } = useParams();
    const [singleItem, setSingleItem] = useState({})

    useEffect(() => {
         fetch(`http://localhost:5000/services/${id}`)
            .then(res => res.json())
            .then(data => setSingleItem(data))
    }, [id])

    const { title, price, _id, img} = singleItem;
    console.log(title,price, img)
    const {user} = useContext(AuthContext)


    const handleBookedService = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const price = form.price.value;
        const booking = {
            Service : title,
            customerName: name,
            img,
            Email : email,
            Date : date,
            Price: price,
            serviceId: _id
        }

        console.log(booking)

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if(data.insertedId){
                // ('')
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "service book successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })

    }


    return (
        <div>
            <h2 className="text-center text-3xl">Booked Services : {title}</h2>

            <form onSubmit={handleBookedService} className="card-body">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" defaultValue={user?.displayName} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" name="email" defaultValue={user?.email} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Amount</span>
                        </label>
                        <input type="text" name="price" defaultValue={price} className="input input-bordered" required />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary btn-block" type="submit" value="Order Confirm" />
                </div>
            </form>
        </div>

    );
};

export default CheckOut;
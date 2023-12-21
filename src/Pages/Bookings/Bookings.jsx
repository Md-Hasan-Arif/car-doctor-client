import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BookingRow from "./BookingRow";
import axios from "axios";

const Bookings = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
    const [bookings, setBookings,] = useState([])


    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    useEffect(() => {


        axios.get(url, {withCredentials: true})
        .then(res => {
            console.log(res.data)
            setBookings(res.data)
        })
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => setBookings(data))
    }, [url])

    
    const handleDelete = id =>{
        const proceed = confirm('Are you sure! wnat to delete?')
        if(proceed){
            fetch(`http://localhost:5000/bookings/${id}`,{
                method: 'Delete'
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                if(data.deletedCount > 0){
                    alert('deleted successful')
                    const remaining = bookings.filter(booking => booking._id !== id);
                    setBookings(remaining);
                }
            })        }
    }

    const handleBookingConfirm = id =>{
        fetch(`http://localhost:5000/bookings/${id}`,{
            method:'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({status:'confirm'})
        })
        .then(res=> res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                // update state
                const remaining = bookings.filter(booking =>booking._id !== id)
                const updated = bookings.find(booking => booking._id === id);
                updated.status = 'confirm'
                const newBookings = [updated, ...remaining];
                setBookings(newBookings)
            }
        })
    }

    return (
        <div>
            <h2>Bookings Length : {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service Name</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking =><BookingRow
                            key={booking._id}
                            booking = {booking}
                            handleBookingConfirm={handleBookingConfirm}
                            handleDelete = {handleDelete}

                            ></BookingRow>)
                        }      
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;
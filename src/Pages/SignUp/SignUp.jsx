import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const SignUp = () => {

        const {createUser} = useContext(AuthContext)

    const HandleSingUp = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password)

        createUser(email, password)
        .then(result =>{
            const user = result.user;
            console.log(user)
        })
        .catch(error => console.log(error))
     
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row gap-12">
                <div className=" w-1/2">
                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm  bg-base-100 ">
                    <form className="card-body" onSubmit={HandleSingUp}>
                        <h1 className="text-5xl font-medium text-center">SignUp</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Name"  className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" name='password' placeholder="Password"  className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn  bg-[#FF3811]" type="Submit" value='SignUp' />
                            </div>
                    </form>
                    <p className='my-4 text-center'>Already have an account? <Link
                    className='text-[#FF3811]' to="/login">Login</Link></p>

                </div>
            </div>
        </div>
    );
};

export default SignUp;
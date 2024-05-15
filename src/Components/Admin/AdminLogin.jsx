import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import robotImg from '../../assets/robot.png';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ userName: '', password: '' });
    const navigate = useNavigate();
    const apiUri = import.meta.env.VITE_REACT_APP_API_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUri}api/adminLogin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: credentials.userName, password: credentials.password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if(response.ok) {
                toast.success('Successfully Logged In!');
                document.cookie = `token=${data.token};max-age=${60 * 60};path=/`;
                setTimeout(() => {
                    navigate('/Customer-Orders');
                }, 1000);
            } else {
                toast.error("Invalid Credentials");
                // Login failed, handle accordingly
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error(error);
            // Handle error, show error message, etc.
        }
    };


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);
    return (
        <div className="p-3">
            <div className="container bg-white rounded-2 shadow-sm pb-5 px-5 mt-2 mb-5">
                <h1 className="fs-2 text-center fw-bold mb-5 pt-3">Admin Portal Login</h1>
                <div className="row">
                    <div className="col">
                        <div className=" bg-light rounded-5 mt-3 p-4 ">
                            <h1 className="fs-md-4 fs-lg-4 fs-5 mx-5">Indain Resturant Admin Portal</h1>
                            <img className="w-75 rounded-5 " src={robotImg} alt="" />
                        </div>
                    </div>
                    <div className="col p-3 w-25 mt-5">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group my-2">
                                <label htmlFor="text">userName address</label>
                                <input type="text" className="form-control" id="userName" name="userName" aria-describedby="userNameHelp" value={credentials.userName} onChange={onChange} placeholder="Enter userName" />
                                <small id="userNameHelp" className="form-text text-muted">{`We'll never share your userName with anyone else.`}</small>
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AdminLogin;

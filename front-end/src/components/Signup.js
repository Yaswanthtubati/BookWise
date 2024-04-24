import { useState } from "react";
import axios from "axios";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name : '',
        email : '',
        password : ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost/bookwise_backend/authController/signup.php',formData);
            const data = response.data;
            console.log(data);
            localStorage.setItem('name',data?.name);
            localStorage.setItem('email',data?.email);           
            localStorage.setItem('id',data?.user_id);
            document.cookie = `PHPSESSID=${data?.session_id}; path=/`;
            console.log(document.cookie);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="flex justify-center items-center h-screen">
            <div className="bg-blue-gray-50 w-[500px] rounded-md p-3">
                <Card color="transparent" shadow={false} className="mt-12 items-center">
                    <Square3Stack3DIcon className="h-[18px] w-[18px] mt-[10px] mr-2 text-pink-300" />
                    <Typography variant="h4" color="pink" className="italic">BookWise</Typography>
                    <Typography color="gray" className="mt-1 font-normal">Enter your details to register.</Typography>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">Your Name</Typography>
                            <Input size="lg" placeholder="name" name="name" onChange={handleChange}
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{ className: "before:content-none after:content-none" }} required />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">Your Email</Typography>
                            <Input size="lg" placeholder="name@mail.com" name="email" onChange={handleChange}
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{ className: "before:content-none after:content-none" }} required/>
                            <Typography variant="h6" color="blue-gray" className="-mb-3">Password</Typography>
                            <Input type="password" size="lg" placeholder="********" name="password" onChange={handleChange}
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{ className: "before:content-none after:content-none" }} required/>
                        </div>
                        <Button className="mt-12" color="indigo" onClick={handleSubmit} fullWidth>sign up</Button>
                        <Typography color="gray" className="my-4 text-center font-normal">
                            Already have an account?{" "}
                            <Link to="/" className="font-medium text-gray-900 hover:text-pink-500">Sign In</Link>
                        </Typography>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default Signup;

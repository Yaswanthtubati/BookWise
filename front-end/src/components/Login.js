import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from 'axios';
 
function Login() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [formData, setFormData] = useState({
    email : '',
    password : ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/bookwise_backend/authController/login.php', formData);
      const data = response.data;
      console.log("Response data:", data);
      localStorage.setItem('name', data?.name);
      localStorage.setItem('email', data?.email);
      localStorage.setItem('id',data?.user_id);
  
      // Set session ID as a cookie
      document.cookie = `PHPSESSID=${data?.session_id}; path=/`; // Assuming session_id is the key name for the session ID received from the server
  
      // Log the cookie
  
      window.location.reload('/');
    } catch (error) {
      console.log("Error:", error);
    }
  }
  
 
  return (
    <>
      <Button onClick={handleOpen} color="pink" className="normal-case">Login</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Sign In
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter your email and password to Sign In.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Your Email
            </Typography>
            <Input label="Email" name="email" onChange={handleChange} size="lg" />
            <Typography className="-mb-2" variant="h6">
              Your Password
            </Typography>
            <Input label="Password" name="password" type="password" onChange={handleChange} size="lg" />
            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" className="capitalize" color="indigo" onClick={handleSubmit} fullWidth>
              Sign In
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              <Link to='/signup'><Typography
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold hover:text-pink-500"
              >
                Sign up
              </Typography></Link>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default Login;

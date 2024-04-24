import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
 
export function Menu() {

  const username = localStorage.getItem('name');
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost/bookwise_backend/authController/logout.php',{
        withCredentials : true,
      });
      console.log(response);
      // After successful logout, you can clear local storage or any other cleanup if needed
      localStorage.removeItem('name');
      localStorage.removeItem('email');     
      localStorage.removeItem('id');
      document.cookie = `PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      navigate('/signup')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Menu animate={{
      mount: { y: 0 },
      unmount: { y: 25 },
    }}>
      <MenuHandler>
        <Button color="pink" className="italic capitalize">{username}</Button>
      </MenuHandler>
      <MenuList>
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
}
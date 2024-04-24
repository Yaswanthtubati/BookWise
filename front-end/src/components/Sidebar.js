import { useState, useEffect } from "react";
import { Card, Typography, List, ListItem, ListItemPrefix, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon, UserCircleIcon, InboxIcon, PowerIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
   
function Sidebar() {
  const [validate, setValidate] = useState();
  const navigate = useNavigate();
  const username = localStorage.getItem('name');

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
      navigate('/');
      window.location.reload('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="h-[calc(130vh-2rem)] w-full max-w-[20rem] rounded-none p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Dashboard
        </Typography>
      </div>
      <List>
        <Link to='/'>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Home
          </ListItem>
        </Link>
        <Link to='/collection'>
          <ListItem>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Collection
          </ListItem>
        </Link>
        {username ? 
          <Link to='/profile'>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
          </Link> : 
            <Popover placement="bottom">
            <PopoverHandler>
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Profile
              </ListItem>
            </PopoverHandler>
            <PopoverContent className="bg-blue-gray-700 text-white">
              Login to access
            </PopoverContent>
          </Popover> }
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Contact
        </ListItem>
        {username && <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>}
      </List>
    </Card>
  );
}

export default Sidebar;

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button
  } from "@material-tailwind/react";
import AddBook from "./AddBook";
import MyCollection from "./MyCollection";
   
function ProfileCard({ user_id, username, email }) {
    return (
        <>
      <div className="flex items-center gap-10 ml-7 mb-2">
        <Card color="gray" variant="gradient" className="w-[24rem] h-[300px] p-8">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
        >
          <Typography
            variant="small"
            color="white"
            className="font-normal uppercase"
          >
            {username}
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
              </span>
              <Typography className="font-normal">{email}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
              </span>
              <Typography className="font-normal">{user_id}</Typography>
            </li>
          </ul>
        </CardBody>
      </Card>
        <div>
            <AddBook />
        </div>
      </div>
      <MyCollection />
      </>
    );
  }

  export default ProfileCard;
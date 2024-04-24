import { Typography, Tooltip, Chip } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const TableBody = ({ id, title, author, genre, pyear, classes }) => {
    return (
        <>
            <td className={classes}>
                <div className="flex items-center gap-3">
                    <Typography variant="small" color="blue-gray" className="font-bold">
                        {title}
                    </Typography>
                </div>
            </td>
            <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {author}
                </Typography>
            </td>
            <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {genre}
                </Typography>
            </td>
            <td className={classes}>
                <div className="w-max">
                    <Chip size="sm" variant="ghost" value={(pyear.length != 0 && pyear != '0000') ? "Published" : "Pending"} color={pyear != '0000' ? "green" : "red"} />
                </div>
            </td>
            <td className={classes}>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                            {(pyear.length != 0 && pyear != '0000') ? pyear : "N/A"}
                        </Typography>
                    </div>
                </div>
            </td>
            <td className={classes}>
                <Tooltip content="View more details">
                    <Link to={"/book/" + id}><svg className="h-4 w-4 text-pink-400 hover:text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg></Link>
                </Tooltip>
            </td>
        </>
    );
}

export default TableBody;

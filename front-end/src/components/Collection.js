import { useState, useEffect } from "react";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, Typography, Button, CardBody, CardFooter, Input } 
 from "@material-tailwind/react";
import Pagination from "./Pagination";
import { TABLE_HEAD } from "../utils/config"; 
import TableBody from "./TableBody";
import { filterData } from "../utils/config";

 

 
export function Collection() {

  const [collection, setCollection ] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([]);
  const [searchText, setSearchText] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;


    const handlePageChange = (page) => {
      setCurrentPage(page)
    }

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = currentPage * itemsPerPage;
    const paginatedData = filteredCollection.slice(startIdx, endIdx);

    const handleChange = (e) => {
      setSearchText(e.target.value.toLowerCase());

      if(searchText === '') {
        setFilteredCollection(collection);
      } else{
        const newData = filterData(searchText, collection);
        setFilteredCollection(newData);
      }

    }
    const getAllData = () => {
      setFilteredCollection(collection);
      setSearchText('');
    }

    useEffect(() => {
      getCollection();
    },[]);

    async function getCollection() {
        const response = await axios.get('http://localhost/bookwise_backend/bookController/getAllBooks.php');
        const data = response.data;
        console.log(data);
        setCollection(data);
        setFilteredCollection(data);
    }


  return (
    <Card className="h-full w-full mb-8">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recent Books
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last Books
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                value={searchText}
                onChange={handleChange}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button color="indigo" className="flex items-center gap-3" onClick={getAllData} size="sm">
              View all Books
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4" >
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70" >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(
              ( book, index ) => {
                const isLast = index === collection.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={index}>
                    <TableBody {...book} classes={classes}  />
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="border-t border-blue-gray-50 p-4">
      <Pagination
          totalItems={filteredCollection.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </CardFooter>
    </Card>
  );
}
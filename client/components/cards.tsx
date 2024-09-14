import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Ensure the correct path to your Card component
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { daily_mock_data } from "@/public/daily_mock_data"; // Adjust according to other mock data files as needed
import { pfp } from "@/public/first.png";

const cardsPerPage = 9;

export const CardsGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Determine the index of the first and last card on the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = daily_mock_data.slice(indexOfFirstCard, indexOfLastCard); // Slice mock data for pagination

  // Calculate total pages
  const totalPage = Math.ceil(daily_mock_data.length / cardsPerPage);

  // Change page function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4">
        {" "}
        {/* 3x3 grid for the cards */}
        {currentCards.map((item, index) => (
          <Card key={index} className="bg-white border shadow-md rounded-lg">
            <CardHeader>
              <img
                className="w-12 h-12 rounded-full object-cover mb-2"
                src={pfp} // Replace with actual image or default
                alt={`${item.username}'s Profile Picture`}
              />
              <CardTitle>
                <span>{item.username}</span> <br />
                <span className="text-sm text-gray-500">Rank: {item.rank}</span>
              </CardTitle>
              <CardDescription>
                <p className="text-xs">Date: {item.date}</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Trading Volume: {item.totalTradingVolume}</p>``
              <p>Average Win Rate: {item.averageWinRate}</p>
              <p>Average ROI: {item.averageROI}</p>
              <p>Total PNL: {item.TotalPNL}</p>
              <p>PNL: {item.PNL}</p>
            </CardContent>
            <CardFooter>
              <span className="text-sm text-green-600">
                Details updated recently
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination Component */}
      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
              />
            </PaginationItem>

            {[...Array(totalPage).keys()].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                disabled={currentPage === totalPage}
                onClick={() => paginate(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

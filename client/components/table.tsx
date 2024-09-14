"use client";
import React, { useState } from "react";
import { FaThLarge, FaListUl } from "react-icons/fa";

import { daily_mock_data } from "@/public/daily_mock_data";
import { weekly_mock_data } from "@/public/weekly_mock_data";
import { monthly_mock_data } from "@/public/montly_mock_data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const icons = {
  gold: "/first.png",
  silver: "/second.png",
  bronze: "/third.png",
};

const rankColors = {
  1: "border-yellow-500", // Gold
  2: "border-gray-400", // Silver
  3: "border-amber-600", // Bronze
};

function RankIcon({ rank, size, src1, src2, src3, src4 }) {
  let iconSrc;

  // Determine the appropriate src based on the rank
  switch (rank) {
    case 1:
      iconSrc = src1 || icons.gold;
      break;
    case 2:
      iconSrc = src2 || icons.silver;
      break;
    case 3:
      iconSrc = src3 || icons.bronze;
      break;
    default:
      iconSrc = src4;
  }

  // If there is no specific icon for the rank and it's not in the default case, return just the rank
  if (!iconSrc) {
    return <span style={{ marginRight: 8 }}>{rank}</span>;
  }

  // If iconSrc is present, return an image with rank overlay
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        marginRight: 8,
        width: size || 20,
        height: size || 20,
      }}
    >
      <img
        alt={`Rank ${rank}`}
        src={iconSrc}
        style={{ width: "100%", height: "100%" }}
      />
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#0a0f10",
          fontWeight: "bold",
          fontSize: "0.9em",
        }}
      >
        {rank}
      </span>
    </div>
  );
}

export function TableComp() {
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("monthly");
  const [displayMode, setDisplayMode] = useState("list");
  const rowsPerPage = 9; // Adjusted for 3x3 grid

  const getDataForView = () => {
    switch (view) {
      case "daily":
        return daily_mock_data;
      case "weekly":
        return weekly_mock_data;
      case "monthly":
        return monthly_mock_data;
      default:
        return monthly_mock_data;
    }
  };

  const mock_data = getDataForView();
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = mock_data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPage = Math.ceil(mock_data.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getVisiblePageNumbers = () => {
    const totalVisiblePages = 5;
    let startPage = Math.max(
      currentPage - Math.floor(totalVisiblePages / 2),
      1,
    );
    let endPage = startPage + totalVisiblePages - 1;

    if (endPage > totalPage) {
      endPage = totalPage;
      startPage = Math.max(endPage - totalVisiblePages + 1, 1);
    }
    const pages = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <>
      <div className="w-full p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <button
              className={`px-3 py-1 rounded-lg ${view === "daily" ? "text-gray-800 bg-white" : "bg-gray-800 text-white"}`}
              onClick={() => setView("daily")}
            >
              Daily
            </button>
            <button
              className={`px-3 py-1 rounded-lg ${view === "weekly" ? "text-gray-800 bg-white" : "bg-gray-800 text-white"}`}
              onClick={() => setView("weekly")}
            >
              Weekly
            </button>
            <button
              className={`px-3 py-1 rounded-lg ${view === "monthly" ? "text-gray-800 bg-white" : "bg-gray-800 text-white"}`}
              onClick={() => setView("monthly")}
            >
              Monthly
            </button>
          </div>
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 rounded-lg ${displayMode === "list" ? "text-gray-800 bg-white" : "bg-gray-800 text-white"}`}
              onClick={() => setDisplayMode("list")}
            >
              <FaListUl size={15} />
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${displayMode === "card" ? "text-gray-800 bg-white" : "bg-gray-800 text-white"}`}
              onClick={() => setDisplayMode("card")}
            >
              <FaThLarge size={15} />
            </button>
          </div>
        </div>

        {/* Conditionally render table or card */}
        <div
          className={`transition-all ease-in-out duration-500 ${displayMode === "list" ? "block" : "hidden"}`}
        >
          <Table className="table-fixed w-[80vw]">
            <TableHeader className="bg-[#25272c]">
              <TableRow>
                <TableHead className="w-[120px] text-left">User</TableHead>
                <TableHead className="w-[120px] text-left">
                  Trading Volume
                </TableHead>
                <TableHead className="w-[120px] text-left">
                  Average Win Rate
                </TableHead>
                <TableHead className="w-[120px] text-left">
                  Average ROI
                </TableHead>
                <TableHead className="w-[120px] text-left">Total PNL</TableHead>
                <TableHead className="w-[120px] text-left">PNL</TableHead>
                <TableHead className="w-[120px] text-left">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRows.map((invoice, index) => (
                <TableRow key={index} className="hover:bg-gray-100/25 h-12">
                  <TableCell className="p-3 align-middle">
                    <div className="flex items-left gap-x-2">
                      {/* Profile picture and rank icon */}
                      {/* <img
                        alt="Profile"
                        src={invoice.profilePicture}
                        className="w-5 h-5 rounded-full mr-2"
                      /> */}
                      <RankIcon rank={invoice.rank} />
                      <span>{invoice.username}</span>
                    </div>
                  </TableCell>
                  <TableCell className="p-3 align-middle">
                    {invoice.totalTradingVolume}
                  </TableCell>
                  <TableCell className="p-3 align-middle">
                    {invoice.averageWinRate}
                  </TableCell>
                  <TableCell className="p-3 align-middle text-green-600">
                    {invoice.averageROI}
                  </TableCell>
                  <TableCell className="p-3 align-middle text-green-600">
                    {invoice.TotalPNL}
                  </TableCell>
                  <TableCell className="p-3 align-middle text-green-600">
                    {invoice.PNL}
                  </TableCell>
                  <TableCell className="p-3 align-middle">
                    {invoice.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Card view */}
        {/* Card view */}
        <div
          className={`grid grid-cols-3 gap-4 transition-all ease-in-out duration-500 min-w-[80vw] ${displayMode === "card" ? "block" : "hidden"}`}
        >
          {currentRows.map((invoice, index) => (
            <Card
              key={index}
              className="bg-[#141313] p-4 rounded-2xl shadow-md relative"
            >
              {/* Rank Badge */}
              <div className="absolute top-0 left-1 ml-1">
                <RankIcon
                  className="bg-yellow-500 rounded-full p-1"
                  rank={invoice.rank}
                  size={30}
                  src1={"/rank1.svg"}
                  src2={"/rank2.svg"}
                  src3={"/rank3.svg"}
                  src4={"/rank-dark.svg"}
                />
              </div>

              <CardHeader className="flex items-center flex-col p-4 ">
                {/* Profile Image and Info */}
                <div className="flex gap-1 w-full">
                  <div className="flex mr-2 ">
                    <div className="">
                      <img
                        alt="Profile"
                        className="w-12 h-12 rounded-full border-2 border-gray-600"
                        // src=
                        src={invoice.profilePicture || "/profile-temp.png"}
                      />
                    </div>
                    <div className="flex flex-col ml-3 text-left">
                      <span className="text-lg font-semibold text-white">
                        {invoice.username}
                      </span>
                      <span className="text-sm text-gray-400 text-left">
                        Total Trading Volume {invoice.totalTradingVolume}
                      </span>
                    </div>
                  </div>
                  {/* Follow Button */}
                  <button className="bg-[#FCD434] text-gray-900 ml-auto text-sm font-bold px-4 py-1 rounded-lg">
                    WinRate: <span> {invoice.averageWinRate}</span>
                  </button>
                </div>
              </CardHeader>

              <CardContent className="mt-1 ml-4 flex justify-between p-1">
                {/* ROI Section */}
                <div className="text-left flex-1">
                  <span className="text-sm text-gray-400">Average ROI</span>
                  <p className="text-[#00F601] font-bold text-3xl mt-1">
                    +{invoice.averageROI}%
                  </p>
                </div>

                {/* PNL Section */}
                <div className="text-left flex-1">
                  <span className="text-sm text-gray-400">PNL (USD)</span>
                  <p className="text-[#00F601] font-bold text-3xl mt-1">
                    +{invoice.PNL}USD
                  </p>
                </div>
              </CardContent>
              <div className="flex items-center">
                <span className="bg-transparent ml-1 text-white text-[12px] px-4 py-1 mt-1 rounded-sm">
                  Total PNL: {invoice.TotalPNL}{" "}
                  <span className="text-[#00F601]"> USD</span>
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination className="flex items-center">
          {/* Previous button */}
          <PaginationPrevious
            className="mr-2 px-3 py-2"
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            &lt;
          </PaginationPrevious>

          {/* Page numbers */}
          <PaginationContent className="flex items-center space-x-2">
            {getVisiblePageNumbers().map((page) => (
              <PaginationItem key={page} active={page === currentPage}>
                <PaginationLink onClick={() => paginate(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>

          {/* Next button */}
          <PaginationNext
            className="ml-2 px-3 py-2"
            disabled={currentPage === totalPage}
            onClick={() => paginate(currentPage + 1)}
          >
            &gt;
          </PaginationNext>
        </Pagination>
      </div>
    </>
  );
}

export default TableComp;

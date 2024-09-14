"use client";
import React, { useState } from "react";
import { FaThLarge, FaListUl } from "react-icons/fa";
import { Percent, Plus } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";

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

function RankIcon({ rank, size }) {
  switch (rank) {
    case 1:
      return (
        <img
          alt="Gold"
          src={icons.gold}
          style={{ marginRight: 8, width: size || 20 }}
        />
      );
    case 2:
      return (
        <img
          alt="Silver"
          src={icons.silver}
          style={{ marginRight: 8, width: size || 20 }}
        />
      );
    case 3:
      return (
        <img
          alt="Bronze"
          src={icons.bronze}
          style={{ marginRight: 8, width: size || 20 }}
        />
      );
    default:
      return <span style={{ marginRight: 8 }}>{rank}</span>;
  }
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
              className={`bg-[#141313] p-2 border-2 rounded-lg max-h-[35vh] shadow-sm ${
                rankColors[invoice.rank] || "border-transparent"
              }`}
            >
              <CardHeader className="flex mb-1 w-full border border-b-2 rounded-lg flex flex-col relative">
                <div className="ml-auto absolute top-0 left-0 rounded-lg pl-1 pt-1 text-gray-400">
                  <RankIcon rank={invoice.rank} size={40} />
                </div>
                <div className="flex gap-x-2 items-center ">
                  <img
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-2"
                    src={invoice.profilePicture}
                  />
                  <div className="flex flex-col ">
                    <span className="text-base font-semibold text-white text-start">
                      {invoice.username}
                    </span>
                    <p className="text-sm text-center font-medium text-gray-400 mt-1">
                      Total Trading Volume:{" "}
                      <span className="font-bold">
                        {invoice.totalTradingVolume}
                      </span>
                    </p>
                  </div>

                  <div className="ml-auto bg-[#FCD434] px-3 rounded-lg shadow-md">
                    <p className="font-bold mb-1 text-gray-800 text-sm text-center mt-1">
                      Win Rate: <br />{" "}
                      <span className="text-sm text-center ml-2">
                        {" "}
                        {invoice.averageWinRate}{" "}
                      </span>
                      %
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm flex items-center mt-3">
                <div className="flex flex-col p-3 items-center flex-1 ">
                  {" "}
                  <span className="text-sm text-[#B4B4B8]">
                    Average ROI
                  </span>{" "}
                  <p className="font-bold text-lg mt-2">
                    {" "}
                    <Plus className="inline h-3 w-3 mb-1 text-[#12C881]" />{" "}
                    <span className="text-2xl font-bold text-[#1bad75] ">
                      {invoice.averageROI}
                    </span>{" "}
                    <Percent className="inline h-3 w-3 mb-1 text-[#12C881]" />
                  </p>
                </div>
                <div className="flex flex-col p-3 items-center flex-1 ">
                  {" "}
                  <span className="text-sm text-[#B4B4B8]">PNL (USD)</span>{" "}
                  <p className="font-bold text-lg mt-2">
                    {" "}
                    <Plus className="inline h-3 w-3 mb-1 text-[#12C881]" />{" "}
                    <span className="text-2xl font-bold text-[#1bad75]">
                      {invoice.PNL} 56
                    </span>{" "}
                  </p>
                </div>
              </CardContent>
              <Separator />

              <div className="flex items-center justify-evenly ">
                <div className="mt-1 ">
                  <p className="font-bold text-gray-400 text-sm">
                    Total PNL :{" "}
                    <span className="text-[#00F601] pl-1">
                      {invoice.TotalPNL}5992
                    </span>{" "}
                  </p>
                </div>
                <div className="mt-1 text-center text-gray-400 text-sm">
                  {invoice.date}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationPrevious
            className="mr-2 px-3 py-2"
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            &lt;
          </PaginationPrevious>

          <PaginationContent className="flex items-center space-x-2">
            {getVisiblePageNumbers().map((page) => (
              <PaginationItem key={page} active={page === currentPage}>
                <PaginationLink onClick={() => paginate(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>

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

import React from "react";
import Navbar from "../components/Dashboard/Navbar";
import UserProfileCard from "../components/Dashboard/UserProfileCard";
// import ProductForm from "../components/Dashboard/ProductForm";
// import ProductDisplay from "../components/Dashboard/ProductDisplay";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="w-full p-4 flex-1 flex items-center justify-center">
          <UserProfileCard />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

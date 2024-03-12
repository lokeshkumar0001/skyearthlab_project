import React from "react";
import Navbar from "../components/Dashboard/Navbar";
import CustomerForm from "../components/Dashboard/CustomerForm";
import { CustomerContextProvider } from "../context/CustomerContext";
import CustomerWrapper from "../components/Dashboard/CustomerWrapper";

const Dashboard = () => {
  return (
    <>
      <CustomerContextProvider>
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="w-full p-4 flex-1 flex flex-col md:flex-row items-center justify-center">
            <div className="w-full md:w-3/5 pr-0 md:pr-4 mb-4 md:mb-0">
              <CustomerWrapper />
            </div>
            <div className="w-full md:w-2/5 pl-0 md:pl-4">
              <CustomerForm />
            </div>
          </div>
        </div>
      </CustomerContextProvider>
    </>
  );
};

export default Dashboard;

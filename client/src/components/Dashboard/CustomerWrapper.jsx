import React, { useContext } from "react";
import CustomerCard from "./CustomerCard";
import { useCustomerContext } from "../../hooks/useCustomerContext";

const CustomerWrapper = () => {
  const { customerInfo } = useCustomerContext();
  console.log('customerInfo', customerInfo);

  return (
    <div className="flex flex-col w-full">
      {customerInfo && customerInfo.length > 0 ? (
        customerInfo.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))
      ) : (
        <p className="text-center text-gray-600">
          {customerInfo
            ? "No customers available."
            : "Try adding a customer to see the list."}
        </p>
      )}
    </div>
  );
};

export default CustomerWrapper;

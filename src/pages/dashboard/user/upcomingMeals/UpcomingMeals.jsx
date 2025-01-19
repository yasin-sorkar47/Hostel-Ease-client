import { useState } from "react";
import AddUpcomingMeals from "./AddModal";

export default function UpcomingMeals() {
  const [isOpen, setIsOpen] = useState(false);
  const paymentHistory = [];

  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-14 mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Upcoming Meals</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="border px-4 py-1 border-purple-400 rounded-md"
        >
          Add Meal
        </button>
        {isOpen && <AddUpcomingMeals setIsOpen={setIsOpen} />}
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>TransactionId</th>
              <th>Payment Method</th>
              <th>Badge</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory?.length > 0 ? (
              paymentHistory?.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td>{payment.name}</td>
                  <td>{payment.email}</td>
                  <td>{payment.transactionId}</td>
                  <td>{payment.payment_method}</td>
                  <td>
                    <span className="border px-4 py-1 rounded-md border-purple-400">
                      {payment.badge}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border  text-center text-xl" colSpan="6">
                  Not Found🥲
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

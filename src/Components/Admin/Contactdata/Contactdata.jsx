import React, { useState } from "react";
import "./Contactdata.scss";
const Contactdata = ({ contactdata }) => {
  const [selectedTab, setSelectedTab] = useState("order");

  const handleRadioChange = (e) => {
    setSelectedTab(e.target.value); // Set the selected radio button
  };
  return (
    <div>
      <div className="radios">
        <label>
          <input
            type="radio"
            value="order"
            checked={selectedTab === "order"}
            onChange={handleRadioChange}
          />
          Order Related
        </label>
        <label>
          <input
            type="radio"
            value="return"
            checked={selectedTab === "return"}
            onChange={handleRadioChange}
          />
          Return Related
        </label>
        <label>
          <input
            type="radio"
            value="other"
            checked={selectedTab === "other"}
            onChange={handleRadioChange}
          />
          Other Related
        </label>
      </div>

      {selectedTab === "order" && (
        <table className="order-table tables">
          <tr>
            <th>Email</th>
            <th>OrderId</th>
            <th>Message</th>
            <th>Created At</th>
          </tr>
          {contactdata.map((c) => {
            return (
              <>
                {c.orderRelated.map((order, idx) => (
                  <tr>
                    <td className="maxraw">{c.email}</td>

                    <td> {order.orderID}</td>
                    <td className="maxraw"> {order.message}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </>
            );
          })}
        </table>
      )}

      {selectedTab === "return" && (
        <table className="return-table tables">
          <tr>
            <th>Email</th>
            <th>Reason</th>
            <th>message</th>
            <th>File</th>
            <th>Created At</th>
          </tr>
          {contactdata.map((c) => {
            return (
              <>
                {c.returnRelated.map((returns, idx) => (
                  <tr>
                    <td>{c.email}</td>

                    <td> {returns.reason}</td>
                    <td className="maxraw"> {returns.message}</td>
                    <td>{new Date(returns.createdAt).toLocaleDateString()}</td>
                    <td>
                      <a
                        // href={`http://localhost:3034${returns.file}`}
                        // href={`https://genzback.onrender.com${returns.file}`}
                        href={`https://gen-z-back.vercel.app${returns.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View File
                      </a>
                    </td>
                  </tr>
                ))}
              </>
            );
          })}
        </table>
      )}
      {selectedTab === "other" && (
        <table className="other-table tables">
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>message</th>
            <th>Created At</th>
          </tr>
          {contactdata.map((c) => {
            return (
              <>
                {c.otherRelated.map((others, idx) => (
                  <tr>
                    <td>{c.email}</td>
                    <td>{others.name}</td>
                    <td className="maxraw">{others.message}</td>
                    <td>{new Date(others.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </>
            );
          })}
        </table>
      )}
    </div>
  );
};

export default Contactdata;

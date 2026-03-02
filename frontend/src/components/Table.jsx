import React from "react";

const Table = ({
  data,
  dataKey = "_id",
  label = "Title",
  supportTitle = "",
  supportText = ""
}) => {
  return (
    <div className="overflow-x-auto w-full p-6">
      <table className="table table-zebra w-full border border-base-300 shadow-md">
        <thead className="bg-base-200">
          <tr>
            <th className="font-bold">Sr. No</th>
            <th className="font-bold">{label}</th>
            <th className="font-bold">Count</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item._id || index} className="hover">
                <th>{index + 1}</th>
                <td className="font-bold">
                  {supportTitle} {item[dataKey] ?? item._id}
                </td>
                <td>
                  <span className="font-bold">
                    {item.count} {supportText}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center italic py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

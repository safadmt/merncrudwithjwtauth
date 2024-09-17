import React, { memo } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const EntityTable = memo(function BrandTable({
  data,
  edit,
  deleteItem,
  columnHeading,
  itemid,
}) {
  const columnKeys = Object.keys(data[0]).slice(1);

  return (
    <div className="inline-block min-w-full py-2 ">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b bg-[#403d39] text-white font-medium dark:border-neutral-500">
            <tr>
              {columnHeading?.map((name, index) => (
                <th key={index} scope="col" className="px-6 py-4">
                  {name}
                </th>
              ))}
              <th scope="col" colSpan={2} className="px-6 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index} className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  {index + 1}
                </td>
                {columnKeys.map((key) => (
                  <td
                    key={key}
                    className="whitespace-nowrap px-6 py-4 font-medium"
                  >
                    {key === "created_at" || key === "updated_at"
                      ? new Date(item[key]).toLocaleDateString()
                      : item[key]}
                  </td>
                ))}
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  <FaEdit
                    size={20}
                    className="text-[#003049] hover:cursor-pointer"
                    onClick={() => edit(item[itemid])}
                  />
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  <MdDelete
                    size={20}
                    className="text-[#f94144] hover:cursor-pointer"
                    onClick={() => deleteItem(item[itemid])}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default memo(EntityTable) ;

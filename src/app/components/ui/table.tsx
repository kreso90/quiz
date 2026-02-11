"use client";

import { useRouter } from "next/navigation";
import { ActionsCell } from "../home/ActionsCell";
import { Quiz } from "@/types/quiz";

interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: React.ReactNode;
  colClassName?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowClassName?: string;
}

export const Table = <T,>({ columns, data, rowClassName }: TableProps<T>) => {
  const router = useRouter();

  return (
    <center>
      <div className="overflow-x-auto w-full p-2.5">
        <table className="w-full max-w-3xl border border-gray-200 rounded overflow-hidden shadow">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.header}
                  className={`px-2 md:px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide whitespace-nowrap ${
                    column.colClassName || ""
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => router.push(`/quiz/${row["id" as keyof T]}`)}
                className={`cursor-pointer transition-colors
              odd:bg-white even:bg-gray-50
              hover:bg-blue-50
              ${rowClassName || ""}`}
              >
                {columns.map((column) => (
                  <td
                    key={column.header}
                    className={`px-2 md:px-4 py-3 text-sm text-gray-700 ${
                      column.colClassName || ""
                    }`}
                  >
                    {column.header === "Actions" ? (
                      <ActionsCell quiz={row as Quiz} />
                    ) : column.accessor ? (
                      <span className="font-medium">
                        {String(row[column.accessor])}
                      </span>
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </center>
  );
};

import React from 'react';

interface TableProps {
    tableData: {
        tablecells: any[];
        tablebodydata: any[];
    };
}

function Table({ tableData }: TableProps) {
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full  bg-white">
                            <thead className="border-b">
                                <tr>
                                    {tableData.tablecells.map((cell, index) => (
                                        <th
                                            key={index}
                                            scope="col"
                                            className="text-sm  font-semibold text-gray-900 px-6 py-4 text-left"
                                        > <span className={`px-2 py-1 rounded-md bg-white`}>
                                                {cell} </span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.tablebodydata.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="border-b">
                                        {row.map((cell: any, cellIndex: any) => (
                                            <td
                                                key={cellIndex}
                                                className={`text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap 
                                                  
                                                    `
                                                }
                                            >
                                                <span className={`px-2 py-1 rounded-md  ${cell === 'Individual' ? 'bg-[#EFEAFD]' : cell === 'Couple' ? 'bg-[#E2F3FC]' : cell === 'Family' ? 'bg-[#FFEAD5]' : cell === 'Child' ? 'bg-[#D5F6DE]' : cell === 'Group' ? 'bg-[#FDF4C8]' : 'bg-white'

                                                    }`}>{cell}</span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;

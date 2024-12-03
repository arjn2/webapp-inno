"use client";
import { useState, useEffect } from 'react';
import Header from "../../components/ui/Header";

export default function Credits() {
    const [credits, setCredits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCredits() {
            try {
                const sheetId = process.env.NEXT_PUBLIC_SHEET_ID;
                const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
                
                const response = await fetch(url);
                const text = await response.text();
                
                const jsonString = text.substring(47, text.length - 2);
                const json = JSON.parse(jsonString);
                
                const headers = json.table.cols.map(col => col.label);
                const rows = json.table.rows.map(row => {
                    return row.c.map(cell => cell?.v ?? '');
                });
                
                const data = rows.map(row => {
                    return headers.reduce((obj, header, index) => {
                        obj[header] = row[index];
                        return obj;
                    }, {});
                });

                setCredits(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }

        fetchCredits();
    }, []);

    if (loading) return (
        <div className="min-h-screen">
            <Header />
            <div className="flex items-center justify-center h-[80vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0070f3]"></div>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen">
            <Header />
            <div className="flex items-center justify-center h-[80vh] text-red-500">
                Error: {error}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="w-full px-4 py-8 sm:px-6 lg:px-8 mt-16">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Credits</h1>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                {credits[0] && Object.keys(credits[0]).map((header, i) => (
                                    <th key={i} className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {credits.map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    {Object.values(row).map((cell, j) => (
                                        <td key={j} className="px-6 py-4 text-sm text-gray-600">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
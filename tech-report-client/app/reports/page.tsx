"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface ReportHistory {
  _id: string;
  date: string;
  createdAt: string;
}

export default function ReportsPage() {

  const [reports, setReports] = useState<ReportHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchHistory() {

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/report/history`
      );

      setReports(res.data.data);
      setLoading(false);
    }

    fetchHistory();

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading history...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="max-w-3xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold mb-6">
          📚 Report History
        </h1>

        <div className="space-y-4">

          {reports.map((report) => (

            <Link
              key={report._id}
              href={`/reports/${report.date}`}
              className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <p className="font-semibold">
                📊 {report.date}
              </p>

              <p className="text-sm text-gray-500">
                Generated on {new Date(report.createdAt).toLocaleString()}
              </p>

            </Link>

          ))}

        </div>

      </div>

    </main>
  );
}

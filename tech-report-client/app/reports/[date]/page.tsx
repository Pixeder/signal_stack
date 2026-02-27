"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function SingleReportPage() {

  const params = useParams();
  const { date } = params;

  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarking, setBookmarking] = useState(false);

  useEffect(() => {

    async function fetchReport() {

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/report/${date}`
      );

      setReport(res.data.data);
      setLoading(false);
    }

    fetchReport();

  }, [date]);

  if (loading) return <div className="p-6">Loading report...</div>;
  if (!report) return <div className="p-6 text-red-500">Report not found</div>;

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">

          <h1 className="text-3xl font-bold">
            📊 Report for {report.date}
          </h1>

          {/* ✅ Bookmark Button HERE */}
          <button
            onClick={async () => {
              try {
                setBookmarking(true);

                await axios.post(
                  `${process.env.NEXT_PUBLIC_API_URL}/api/bookmark/${report._id}`
                );

                alert("Bookmarked successfully!");
              } catch (err) {
                alert("Error bookmarking");
              } finally {
                setBookmarking(false);
              }
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {bookmarking ? "Saving..." : "⭐ Bookmark"}
          </button>

        </div>

        {/* Report Content */}
        <article className="prose prose-lg max-w-none bg-white p-6 rounded-xl shadow mt-6">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {report.content}
          </ReactMarkdown>
        </article>

      </div>

    </main>
  );
}

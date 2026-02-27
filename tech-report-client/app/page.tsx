"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Report } from "@/types/report";

export default function Home() {

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {

    async function fetchReport() {
      try {

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/report/today`
        );

        if (res.data.success) {
          setReport(res.data.data);
        } else {
          setError("No report available yet");
        }

      } catch (err) {
        setError("Server not responding");
      }

      setLoading(false);
    }

    fetchReport();

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading report...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto px-6 py-10">

        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            📊 Daily Tech Report
          </h1>
          <p className="text-gray-500 mt-2">
            {report?.date}
          </p>
        </header>

        <article className="prose prose-lg max-w-none bg-white p-6 rounded-xl shadow">

          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {report?.content ?? ""}
          </ReactMarkdown>

        </article>

        <footer className="mt-10 text-center text-gray-400 text-sm">
          Powered by AI • Built by Vinay 🚀
        </footer>

      </div>

    </main>
  );
}

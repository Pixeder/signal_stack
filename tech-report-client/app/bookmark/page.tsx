"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function BookmarksPage() {

  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchBookmarks() {

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookmark`
      );

      setBookmarks(res.data.data);
      setLoading(false);
    }

    fetchBookmarks();

  }, []);

  if (loading) {
    return <div className="p-6">Loading bookmarks...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="max-w-3xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold mb-6">
          ⭐ Saved Reports
        </h1>

        <div className="space-y-4">

          {bookmarks.map((b) => (

            <Link
              key={b._id}
              href={`/reports/${b.report.date}`}
              className="block bg-white p-4 rounded-lg shadow hover:shadow-md"
            >
              📊 {b.report.date}
            </Link>

          ))}

        </div>

      </div>

    </main>
  );
}

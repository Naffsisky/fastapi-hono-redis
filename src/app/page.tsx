"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [searchResult, setSearchResults] = useState<{
    results: string[];
    duration: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined);

      const res = await fetch(`/api/search?q=${input}`);
    };

    fetchData();
  }, [input]);

  return (
    <main className="h-screen w-screen grainy">
      <div className="flex flex-col gap-6 items-center pt-32 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-3 ">
        <p className="text-zinc-900">Testing</p>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="text-zinc-900"
          type="text"
        />
      </div>
    </main>
  );
}

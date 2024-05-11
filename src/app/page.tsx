"use client";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useEffect, useState } from "react";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{
    results: string[];
    duration: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined);

      const res = await fetch(`/api/search?q=${input}`);

      // const res = await fetch(`https://redisfastapi.prinafsika007.workers.dev/api/search?q=${input}`);
      const data = (await res.json()) as { results: string[]; duration: number };
      setSearchResults(data);
    };

    fetchData();
  }, [input]);

  return (
    <main className="h-screen w-screen grainy relative">
      <div className="flex flex-col gap-6 items-center pt-32 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-3">
        <h1 className="text-5xl tracking-tight font-bold">Speed Search ⚡️</h1>
        <p className="text-zinc-600 text-lg max-w-prose text-center">
          A high-performance API build with Hono, Next.js and Cloudflare
          <br />
          Type a query below and get your results in milisenconds.
        </p>
        <div className="max-w-md w-full px-5">
          <Command>
            <CommandInput value={input} onValueChange={setInput} placeholder="Search Countries ...." className="placeholder: text-zinc-500" />
            <CommandList>
              {searchResults?.results.length === 0 ? <CommandEmpty>No Results Found!</CommandEmpty> : null}
              {searchResults?.results ? (
                <CommandGroup heading="Results">
                  {searchResults?.results.map((_result_) => (
                    <CommandItem key={_result_} value={_result_} onSelect={setInput}>
                      {_result_}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {searchResults?.results ? (
                <>
                  <div className="h-px w-full bg-zinc-200" />
                  <p className="p-2 text-xs text-zinc-500">
                    Found {searchResults.results.length} results in {searchResults?.duration.toFixed(0)}ms
                  </p>
                </>
              ) : null}
            </CommandList>
          </Command>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 max-w-md mx-auto w-full px-5">
        <>
          <CardHeader>
            <CardTitle className="text-center text-lg">Tech Tools 🛠️</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center">
              <Image src="/icons/redis.ico" alt="Redis logo" width={60} height={60} className="m-2" />
              <Image src="/next.svg" alt="Redis logo" width={60} height={60} className="m-2" />
              <Image src="/icons/cloudflare.svg" alt="Redis logo" width={60} height={60} className="m-2" />
              <Image src="/icons/tailwind.svg" alt="Redis logo" width={60} height={60} className="m-2" />
            </div>
          </CardContent>
        </>
      </div>
    </main>
  );
}

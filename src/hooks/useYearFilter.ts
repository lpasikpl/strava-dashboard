"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

const CURRENT_YEAR = new Date().getFullYear();

export function useYearFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const year = Number(searchParams.get("year")) || CURRENT_YEAR;

  const setYear = useCallback(
    (y: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (y === CURRENT_YEAR) {
        params.delete("year");
      } else {
        params.set("year", String(y));
      }
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  return { year, setYear };
}

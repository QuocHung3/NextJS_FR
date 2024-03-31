"use client";
import React from "react";
import { useRouter } from "next/navigation";

const News = () => {
  const router = useRouter();

  return (
    <div>
      <button className="btn btn-primary" onClick={() => router.back()}>
        Back
      </button>
      <h1>News page</h1>
    </div>
  );
};

export default News;

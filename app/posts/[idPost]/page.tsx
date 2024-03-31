"use client";
import React from "react";
import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/navigation";

const DetailPost = (props: any) => {
  const router = useRouter();

  const fetcher: Fetcher<IPost, string> = (url: string) =>
    fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${props.params.idPost}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="container">
      <div className=" m-3">
        <button className=" btn btn-primary" onClick={() => router.back()}>
          Back
        </button>
      </div>
      <div>
        <h1>
          <b>Blog Infomation</b>
        </h1>
        <h1>{data?.title}</h1>
        <h3>{data?.content}</h3>
        <h4>
          <b>{data?.author}</b>
        </h4>
      </div>
    </div>
  );
};

export default DetailPost;

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import PostModal from "@/components/postModal";

import PostTable from "@/components/postTable";

const Posts = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const router = useRouter();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const newData: IPost[] = data?.map((value: any) => {
    const idPage = Math.ceil(Number(value.id) / 6);
    return { ...value, idPage };
  });

  return (
    <div className="container">
      <button className="btn btn-primary " onClick={() => router.back()}>
        Back
      </button>

      <div className="d-flex justify-content-between">
        <h3>Posts list</h3>
        <button className="btn btn-primary" onClick={handleShow}>
          Add new
        </button>
      </div>
      {newData && <PostTable data={newData} />}

      <PostModal showModal={showModal} handleClose={handleClose} isCreate />
    </div>
  );
};

export default Posts;

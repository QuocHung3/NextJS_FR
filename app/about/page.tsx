"use client";
import { useRouter } from "next/navigation";

const About = () => {
  const router = useRouter();

  return (
    <div>
      <button className="btn btn-primary" onClick={() => router.back()}>
        Back
      </button>
      <h1>Hello about page</h1>
    </div>
  );
};

export default About;

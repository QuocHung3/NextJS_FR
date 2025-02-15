"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <a className="navbar-brand" href="#">
          NEXT BASIC
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="mx-2 text-decoration-none" href="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="mx-2 text-decoration-none" href="/news">
                News
              </Link>
            </li>
            <li className="nav-item">
              <Link className="mx-2 text-decoration-none" href="/posts">
                Posts
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </main>
  );
}

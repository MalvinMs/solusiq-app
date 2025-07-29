import React, { useState } from "react";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/">
          🍿 Movie App
        </Link>
      </div>
    </div>
  );
}

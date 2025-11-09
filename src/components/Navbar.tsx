import React from "react";

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar bg-primary text-white px-6 py-3 shadow-md rounded-b-xl">
      <div className="flex items-center justify-between w-full">
        {/* App title */}
        <h1 className="text-lg font-semibold tracking-wide">
          📝 My To-Do List
        </h1>

        {/* Navigation links */}
        <ul className="flex gap-4 text-sm font-medium">
          <li>
            <a href="#" className="hover:underline">
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

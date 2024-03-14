import Link from "next/link";
import React from "react";

export default function InfoNav() {
  return (
    <nav>
      <ul className="flex flex-row justify-between h-[30px] bg-base-200">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/services">Services</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

import ShippingPage from "@/app/(front)/shipping/page";
import Link from "next/link";
import React from "react";
import { BiEnvelope, BiPhoneCall } from "react-icons/bi";
import { FaHome, FaShippingFast } from "react-icons/fa";
import { IoAlbumsOutline } from "react-icons/io5";


export default function InfoNav() {
  return (
    <nav className="flex flex-row justify-between h-[40px] topnav">
      <ul className="flex flex-row justify-between">
        <li>
          <Link href="/"><FaHome /> ראשי</Link>
        </li>
        <li>
        <Link href="/about"><IoAlbumsOutline /> אודות</Link>
        </li>
        <li>
          <Link href="/contactAs"><BiEnvelope /> צרו קשר</Link>
        </li>
      </ul>
      <ul className="flex-row justify-between">
      </ul>
      <ul className="flex flex-row justify-between">
        <li>
          <Link href="/contactAs"><BiPhoneCall />08-553-4545</Link>
        </li>
        <li>
          <Link href="/sentShipping"><FaShippingFast /> משלוחים ואזורי חלוקה</Link>
        </li>
      </ul>
    </nav>
  );
}

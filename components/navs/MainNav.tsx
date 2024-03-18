"use client";
import Link from "next/link";
import { useState } from "react";

export default function MainNav() {
  const [openDropdown, setOpenDropdown] = useState('')
  const handleMouseEnter = (dropdown:string) => {
    setOpenDropdown(dropdown)
  }
  const handleMouseLeave = () => {
    setOpenDropdown('')
  }
  return (
    <nav  className="h-[90px]" >
      <ul className="categorymenu flex flex-row justify-between">
      <div className="right  flex flex-row justify-between">
        <li
          className="relative"
          onMouseEnter={() => handleMouseEnter('home')}
          onMouseLeave={handleMouseLeave}
        >
          <span>פירות</span>
          {openDropdown === 'home' && (
            <div
            onMouseEnter={() => handleMouseEnter('home')}
          onMouseLeave={handleMouseLeave} 
            className="absolute top-full right-0 z-10 w-48 bg-white border border-gray-200 rounded shadow-md">
              <ul>
                <li>
                  <Link href="/">Home 1</Link>
                </li>
                <li>
                  <Link href="/home2">Home 2</Link>
                </li>
              </ul>
            </div>
          )}
        </li>
        <li
          className="relative"
          onMouseEnter={() => handleMouseEnter('about')}
          onMouseLeave={handleMouseLeave}
        >
          <span>ירקות</span>
          {openDropdown === 'about' && (
            <div
            onMouseEnter={() => handleMouseEnter('about')}
          onMouseLeave={handleMouseLeave} 
            className="absolute top-full left-0 z-10 w-48 bg-white border border-gray-200 rounded shadow-md">
              <ul>
                <li>
                  <Link href="/about/company">ירקות</Link>
                </li>
                <li>
                  <Link href="/about/team">קטניות</Link>
                </li>
              </ul>
            </div>
          )}
        </li>
        <li
          className="relative"
          onMouseEnter={() => handleMouseEnter('products')}
          onMouseLeave={handleMouseLeave}
        >
          <span>קטניות</span>
          {openDropdown === 'products' && (
            <div
            onMouseEnter={() => handleMouseEnter('products')}
          onMouseLeave={handleMouseLeave} 
            className="absolute top-full left-0 z-10 w-48 bg-white border border-gray-200 rounded shadow-md">
              <ul>
                <li>
                  <Link href="/products/category1">Category 1</Link>
                </li>
                <li>
                  <Link href="/products/category2">Category 2</Link>
                </li>
                <li>
                  <Link href="/products/category3">Category 3</Link>
                </li>
              </ul>
            </div>
          )}
        </li>
        <li
          className="relative"
          onMouseEnter={() => handleMouseEnter('services')}
          onMouseLeave={handleMouseLeave}
        >
          <span>עשבי תיבול</span>
          {openDropdown === 'services' && (
            <div
            onMouseEnter={() => handleMouseEnter('services')}
          onMouseLeave={handleMouseLeave} 
            className="absolute top-full left-0 z-10 w-48 bg-white border border-gray-200 rounded shadow-md">
              <ul>
                <li>
                  <Link href="/services/service1">Service 1</Link>
                </li>
                <li>
                  <Link href="/services/service2">Service 2</Link>
                </li>
              </ul>
            </div>
          )}
        </li>
        <li
          className="relative"
          onMouseEnter={() => handleMouseEnter('contact')}
          onMouseLeave={handleMouseLeave}
        >
          <span>מבצעים</span>
          {openDropdown === 'contact' && (
            <div 
            onMouseEnter={() => handleMouseEnter('contact')}
            onMouseLeave={handleMouseLeave}
            className="absolute top-full left-0 z-10 w-48 bg-white border border-gray-200 rounded shadow-md">
              <ul>
                <li>
                  <Link href="/contact/form">Contact Form</Link>
                </li>
                <li>
                  <Link href="/contact/info">Contact Info</Link>
                </li>
              </ul>
            </div>
          )}
        </li>
        </div>
        <div className="left">
        <li>
          <p>זמן הספקה תוך 24 שעות</p>
        </li>
        </div>
      </ul>
    </nav>
  )
}
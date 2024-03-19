"use client";
import { Category } from "@/lib/models/CategoryModel";
import { Product } from "@/lib/models/ProductModel";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

export default function MainNav() {
  const [openDropdown, setOpenDropdown] = useState("");
  const { data: catagories } = useSWR(`/api/admin/categories`);
  const { data: products } = useSWR(`/api/admin/products`);
  const handleMouseEnter = (dropdown: string) => {
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setOpenDropdown("");
  };

  return (
    <nav  className="h-[90px]" >
      <ul className="categorymenu flex flex-row justify-between">
      <div className="right  flex flex-row justify-between">
        {catagories?.map((category: Category) => (
          <li
          key={category._id}
            className="relative"
            onMouseEnter={() => handleMouseEnter(category.name)}

            onMouseLeave={handleMouseLeave}
          >
            <span>{category.name}</span>
            {openDropdown === category.name && (
              <div
                onMouseEnter={() => handleMouseEnter(category.name)}
                onMouseLeave={handleMouseLeave}
                className="absolute top-full right-0 z-10 w-48 bg-white border border-gray-200 rounded shadow-md"
              >
                <ul>
                  {products
                    ?.filter((product: Product) =>
                      product?.category?.find(
                        (cat) => {
                          return cat == category._id}
                      )
                    )
                    ?.map((product: Product) => (
                      <li key={product._id}>
                        <Link href={`/product/${product.slug}`}>{product.name}</Link>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </li>
        ))}
        </div>
        <div className="left">
        <li>
          <p>זמן הספקה תוך 24 שעות</p>
        </li>
        </div>
      </ul>
    </nav>
  );
}

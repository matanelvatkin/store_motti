"use client";
import useCartService from "@/lib/hooks/useCartStore";
import AddToCart from "./products/AddToCart";
import { Product } from "@/lib/models/ProductModel";
import Link from "next/link";

const Sidebar = () => {
  const cart = useCartService();

  return (
    <>
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <h2 className="text-xl">עגלת קניות</h2>
        {cart?.items?.map((item)=><li className="w-[100%] flex flex-row gap-[2px]" key={item.name}>
          <img src={item.image} alt={item.name} className="w-[30%]"/>
          <span>{item.name}</span>
          <span>{item.price*item.qty}₪</span>
          <AddToCart item={item} />
        </li>)}
        <Link href={'/cart'}>
          cartPage
        </Link>
      </ul>
    </>
  );
};

export default Sidebar;

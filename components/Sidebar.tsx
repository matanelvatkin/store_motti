"use client";
import useCartService from "@/lib/hooks/useCartStore";
import AddToCart from "./products/AddToCart";
import { Product } from "@/lib/models/ProductModel";

const Sidebar = () => {
  const cart = useCartService();

  return (
    <>
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <h2 className="text-xl">עגלת קניות</h2>
        {cart?.items?.map((item)=><li key={item.name}>
          {item.name}
          {item.price*item.qty}
          <AddToCart item={item}/>
        </li>)}
      </ul>
    </>
  );
};

export default Sidebar;

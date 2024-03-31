"use client";
import { Category } from "@/lib/models/CategoryModel";
import { Product } from "@/lib/models/ProductModel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";


export default function MainNav() {
  const [openDropdown, setOpenDropdown] = useState("");
  const [message,SetMessage] = useState({msg:'זמן הספקה תוך 24 שעות',index:-1})
  const {data: messages}  = useSWR('/api/messages');
  const { data: catagories } = useSWR(`/api/products/categories`);
  const { data: products } = useSWR(`/api/products`);
  const router = useRouter()
  const handleMouseEnter = (dropdown: string) => {
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setOpenDropdown("");
  };
  useEffect(()=>{
    if(messages){
      setInterval(()=>{
        if(message.index===-1) 
        SetMessage({msg:messages[0].message,index:0})
      else if(message.index<messages.length){
        SetMessage({msg:messages[message.index+1].message,index:message.index+1})
      }
      },3500)
    }
  },[messages])
  return (
    <nav  className="h-[90px]" >
      <ul className="categorymenu flex flex-row justify-between">
      <div className="right  flex flex-row justify-between">
        {catagories?.filter((category: Category)=>category.inMainNav)?.map((category: Category) => (
          <li
          key={category._id}
            className="relative"
            onMouseEnter={() => handleMouseEnter(category.name)}
            onMouseLeave={handleMouseLeave}
          >
            <span  onClick={()=>router.push(`/category/${category.name }`)}>{category.name}</span>
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
          <p>{message.msg}</p>
        </li>
        </div>
      </ul>
    </nav>
  );
}

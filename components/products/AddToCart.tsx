"use client";
import useCartService from "@/lib/hooks/useCartStore";
import useLayoutService from "@/lib/hooks/useLayout";
import { OrderItem } from "@/lib/models/OrderModel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddToCart({ item }: { item: OrderItem }) {
  const router = useRouter();
  const { items, increase, decrease } = useCartService();
  const { toggleDrawer,offDrawer } = useLayoutService();
  const [existItem, setExistItem] = useState<OrderItem | undefined>();
  const [wasCartEmpty, setWasCartEmpty] = useState(true);

  useEffect(() => {
    setExistItem(items.find((x) => x.slug === item.slug));
    if (Object.keys(items).length === 0 && !wasCartEmpty) {
      offDrawer();
      setWasCartEmpty(true);
    } else if (Object.keys(items).length > 0 && wasCartEmpty) {
      setWasCartEmpty(false);
    }
  }, [item, items, setWasCartEmpty]);

  const addToCartHandler = () => {
    increase(item);
    toggleDrawer();
  };
  const buyNowHandler = () => {
    increase(item);
  };
  return existItem ? (
    <div>
      <button
        className="btn"
        type="button"
        onClick={() => {
          decrease(existItem);
        }}
      >
        -
      </button>
      <span className="px-2">{existItem.qty}</span>
      <button className="btn" type="button" onClick={() => increase(existItem)}>
        +
      </button>
    </div>
  ) : (
    <button
      className="btn btn-primary w-full"
      type="button"
      onClick={addToCartHandler}
    >
      הוספה לעגלה
    </button>

    // <button
    //   className="btn w-full"
    //   type="button"
    //   onClick={buyNowHandler}
    // >
    //   רכישה מהירה
    // </button>
  );
}

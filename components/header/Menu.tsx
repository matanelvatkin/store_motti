"use client";
import useCartService from "@/lib/hooks/useCartStore";
import useLayoutService from "@/lib/hooks/useLayout";
import { signIn, signOut, useSession } from "next-auth/react";
import Form from "../../app/(front)/signin/Form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiUser, BiFileFind } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Page } from "@/lib/models/PageModel";

const Menu = () => {
  const { items, init } = useCartService();
  const [mounted, setMounted] = useState(false);
  const params = useSearchParams();
  useEffect(() => {
    setMounted(true);
  }, []);

  const signoutHandler = () => {
    signOut({ callbackUrl: "/signin" });
    init();
  };

  const { data: session } = useSession();
  const { data: pages } = useSWR("/api/pages");
  const { theme, toggleTheme, openPopup, closePopup } = useLayoutService();

  const handleClick = () => {
    (document.activeElement as HTMLElement).blur();
  };
  useEffect(() => {
    if (params.get("error") === "CredentialsSignin") {
      openPopup(<Form />);
    } else closePopup();
  }, [params]);

  return (
    <>
      <div>
        <ul className="flex items-stretch lighting">
        {pages?.length>0&&<li>
            <div className="dropdown dropdown-bottom dropdown-end">
              <label tabIndex={0} className="btn btn-ghost rounded-btn">
              <BiFileFind />
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52 "
              >
                {pages?.map((page:Page)=>{
                  return <li onClick={handleClick}>
                  <Link href={`/pages/${page.slug}`}>{page.title}</Link>
                </li>
                })
                }
              </ul>
            </div>
          </li>}
          {session && session.user ? (
            <>
              <li>
                <div className="dropdown dropdown-bottom dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost rounded-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-5 h-5 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52 "
                  >
                    {session.user.isAdmin && (
                      <li onClick={handleClick}>
                        <Link href="/admin/dashboard">לוח בקרה</Link>
                      </li>
                    )}

                    <li onClick={handleClick}>
                      <Link href="/order-history">מעקב הזמנות</Link>
                    </li>
                    <li onClick={handleClick}>
                      <Link href="/profile">החשבון שלי</Link>
                    </li>
                    <li onClick={handleClick}>
                      <a onClick={signoutHandler}>יציאה</a>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          ) : (
            <li>
              <button
                className="btn btn-ghost rounded-btn"
                type="button"
                onClick={() => {
                  openPopup(<Form />);
                }}
              >
                <BiUser />
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Menu;

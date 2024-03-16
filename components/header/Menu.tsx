'use client'
import useCartService from '@/lib/hooks/useCartStore'
import useLayoutService from '@/lib/hooks/useLayout'
import { signIn, signOut, useSession } from 'next-auth/react'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SearchBox } from './SearchBox'
import { BsCart } from 'react-icons/bs'
import { BiLogOut, BiUser } from 'react-icons/bi'
import { LuLogOut } from 'react-icons/lu'

const Menu = () => {
  const { items, init } = useCartService()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const signoutHandler = () => {
    signOut({ callbackUrl: '/signin' })
    init()
  }

  const { data: session } = useSession()

  const { theme, toggleTheme } = useLayoutService()

  const handleClick = () => {
    ;(document.activeElement as HTMLElement).blur()
  }

  return (
    <>
      <div>
        <ul className="flex items-stretch lighting">
          <li>
            <Link className="btn btn-ghost rounded-btn" href="/cart">
              <BsCart />
              {mounted && items.length != 0 && (
                <div className="badge badge-secondary">
                  {items.reduce((a, c) => a + c.qty, 0)}{' '}
                </div>
              )}
            </Link>
          </li>
          {session && session.user ? (
            <>
              <li>
                <div className="dropdown dropdown-bottom dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost rounded-btn">
                    <BiLogOut />
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
                      <button type="button" onClick={signoutHandler}>
                        יציאה
                      </button>
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
                onClick={() => signIn()}
              >
                <BiUser />
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  )
}

export default Menu

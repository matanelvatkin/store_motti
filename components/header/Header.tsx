import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import { SearchBox } from './SearchBox'

const Header = () => {
  return (
    <header>
      <nav>
        <div className="navbar justify-between  h-[90px] headermain">
          <div>
            <label htmlFor="my-drawer" className="btn mainmenu btn-square btn-ghost">
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
          </div>
          <div>
          <SearchBox />
          </div>
          <div>
          <Link href="/" className="text-lg">
          <img
          className='logo'
        src="../../images/logo.webp"
        width="170"
        height="170"
      />
      </Link>
          </div>
          <div>
          </div>
          <div>
          <Menu />
        </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

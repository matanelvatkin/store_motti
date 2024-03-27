import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import { SearchBox } from './SearchBox'
import { BsCart } from 'react-icons/bs'

const Header = () => {
  return (
    <header>
      <nav>
        <div className="navbar justify-between  h-[90px] headermain">
          <div>
            <label htmlFor="my-drawer" className="btn mainmenu btn-square btn-ghost">
              <BsCart className="inline-block w-5 h-5 stroke-current"/>
            </label>
          </div>
          <div>
          <Link href="/" className="text-lg">
          <img
          className='logo'
        src="../../images/logo.png"
        width="170"
        height="170"
      />
      </Link>
          </div>
          <div>
          <SearchBox />
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

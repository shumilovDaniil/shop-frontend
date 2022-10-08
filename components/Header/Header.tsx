import React from "react"
import Link from "next/link"

const Header = () => {
  return (
    <header>
      <ul>
        <li>
          <Link href="/"><a>Shop</a></Link>
        </li>
        <li>
          <select name="" id="">
            <option value="Москва">Москва</option>
            <option value="Санкт-Петербург">Санкт-Петербург</option>
          </select>
        </li>
        <li>
          <button>Become a Partner</button>
        </li>
        <li><a href="tel:78000000000">+7 (800) 322-55-21</a></li>
        <li><Link href="/call-request"><a href="">Заказать звонок</a></Link></li>
        <li><Link href="/sign-in">Войти</Link></li>
      </ul>
    </header>
  )
}

export default Header
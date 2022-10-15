import React from "react"
import Link from "next/link"
import global from "./../../styles/main.module.scss"
import style from "./Header.module.scss"
import { CgMenuGridR } from "react-icons/cg"
import { AiOutlineBarChart } from "react-icons/ai"
import { FcLike } from "react-icons/fc"
import { RiShoppingCartLine } from "react-icons/ri"


const Header = () => {
  return (
    <header className={style.header}>
      <div className={global.container}>
        <ul className="flex items-center justify-between">
          <li>
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/"><a className={style.logo}>Shop</a></Link>
              </li>
              <li>
                <select className={style.select} name="" id="">
                  <option value="Москва">Москва</option>
                  <option value="Санкт-Петербург">Санкт-Петербург</option>
                </select>
              </li>
            </ul>
          </li>
          <li>
            <ul className="flex items-center gap-10">
              <li><a href="tel:78000000000">+7 (800) 322-55-21</a></li>
              <li><Link href="/call-request"><a href="">Заказать звонок</a></Link></li>
              <li><Link href="/sign-in">Войти</Link></li>
            </ul>
          </li>
        </ul>

        <div className={style.header_center}>
          <button className={style.header_menu}><CgMenuGridR /> Каталог</button>
          <div className="header__search search-header">
            <button className={style.search_btn}></button>
          </div>
          <ul className="center-header__list flex gap-4 flex-1 items-center justify-between">
            <li className="center-header__item">
              <Link href={"/"}><a className="center-header__link">Бренды</a></Link>
            </li>
            <li className="center-header__item">
              <Link href={"/"}><a className="center-header__link">Сервис</a></Link>
            </li>
            <li className="center-header__item">
              <Link href={"/"}><a className="center-header__link">Услуги</a></Link>
            </li>
            <li className="center-header__item bg-red-600 p-2 rounded-sm">
              <Link href={"/admin-panel"}><a className="center-header__link">Админ-панель</a></Link>
            </li>
            <li className="center-header__item">
              <Link href={"/"}><a className="center-header__link">О компании</a></Link>
            </li>
            <li className="center-header__item">
              <Link href={"/"}><a className="center-header__link">Блог</a></Link>
            </li>
            <li className="center-header__item">
              <Link href={"/"}><a className="center-header__link">Где купить</a></Link>
            </li>
            <li className="center-header__item">
              <Link href={"/"}><a className="center-header__link">Контакты</a></Link>
            </li>
          </ul>
          <ul className="header__actions actions-header flex gap-6 items-center text-2xl">
            <li className="actions-header__item">
              <Link href="/">
                <a className="actions-header__link"><AiOutlineBarChart /></a>
              </Link>
            </li>
            <li className="actions-header__item">
              <Link href="/">
                <a className="actions-header__link"><FcLike /></a>
              </Link>
            </li>
            <li className="actions-header__item">
              <Link href="/">
                <a className="actions-header__link"><RiShoppingCartLine /></a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
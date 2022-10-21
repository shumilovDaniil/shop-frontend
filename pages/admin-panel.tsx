import React from "react"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import global from "../styles/main.module.scss"
import AdminPanel from "../components/AdminPanel/AdminPanel"

const AdminPanelPage = () => {
  return (
    <>
      <Header />
      <AdminPanel />
      <Footer />
    </>
  )
}

export default AdminPanelPage
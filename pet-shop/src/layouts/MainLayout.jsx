import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from '../layouts/Header/Header'
import Footer from '../layouts/Footer/Footer'

export default function MainLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

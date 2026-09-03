import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import CatalogCategoryPage from './pages/CatalogCategoryPage'
import About from './pages/About'
import Contacts from './pages/Contacts'
import Service from './pages/Service'
import Delivery from './pages/Delivery'
import Finance from './pages/Finance'
import Partners from './pages/Partners'
import Reviews from './pages/Reviews'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="catalog/:slug" element={<CatalogCategoryPage />} />
        <Route path="about" element={<About />} />
        <Route path="service" element={<Service />} />
        <Route path="delivery" element={<Delivery />} />
        <Route path="finance" element={<Finance />} />
        <Route path="partners" element={<Partners />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

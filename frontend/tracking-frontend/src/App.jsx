import { Route, createBrowserRouter, createRoutesFromElements,RouterProvider,} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import NotFound from './pages/NotFound';
import Track from './pages/Track';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import ServicesPage from './pages/ServicesPage';
import AboutUsPage from './pages/AboutUsPage';

import Dashboard from './pages/admin/Dashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* parent route (MainLayout) */}
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<Home />} />
        <Route path='contact' element={ <ContactUs /> }/>
        <Route path='services' element={ <ServicesPage /> }/>
        <Route path='about' element={ <AboutUsPage /> }/>
        <Route path='track' element={ <Track /> }/>
        <Route path='*' element={ <NotFound /> }/>
      </Route>

      {/* AdminLayout Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        < Route index element={<Dashboard />} />
        <Route path='home' element={ <Dashboard /> }/>
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
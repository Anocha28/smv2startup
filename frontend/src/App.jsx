import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { updateRoute } from "./services/routeSlice"
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"

import LoginScreen from "./screens/LoginScreen"
import { ErrorPage, NotFoundPage, Layout, PrivateRoute } from "./components"
import ShipmentListScreen from "./screens/ShipmentListScreen"
import InvoiceListScreen from './screens/InvoiceListScreen'
import PaymentListScreen from './screens/PaymentListScreen'
import SalesListScreen from './screens/SalesListScreen'
import UserListScreen from "./screens/UserListScreen"
import UserAddScreen from "./screens/UserAddScreen"
//import { logout } from "./services/authSlice"

const routeList = [
  {path: '/shipment', element: <ShipmentListScreen />},
  {path: '/invoice', element: <InvoiceListScreen />},
  {path: '/payment', element: <PaymentListScreen />},
  {path: '/sales', element: <SalesListScreen />},
  {path: '/user', element: <UserListScreen />},
  {path: '/user/new', element: <UserAddScreen />},
]

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<LoginScreen />} errorElement={<ErrorPage />} />
      
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>

          {routeList.map((r,i)=>(
            <Route key={i} path={r.path} errorElement={<ErrorPage />} >
              <Route index element={r.element} />
            </Route>
          ))}

          <Route path='*' element={<NotFoundPage />} />

        </Route>
      </Route>
      
    </>
  )
)
const App = () => { 
  const dispatch = useDispatch()

  useEffect(()=>{
    const currentRoute = window.location.pathname.split('/')[1]
    dispatch(updateRoute(currentRoute))
  },[dispatch])

  // useEffect(() => {
  //   const handleTabClose = event => {
  //     event.preventDefault();
  //     return (event.returnValue = 'The system will clear your logout.');
  //   };
  //   window.addEventListener('beforeunload', handleTabClose);
  //   return () => {
  //     dispatch(logout())
  //     window.removeEventListener('beforeunload', handleTabClose);
  //   };
  // }, [dispatch]);

  return <RouterProvider router={router} />
}

export default App

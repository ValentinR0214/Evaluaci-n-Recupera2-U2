import React, { useContext } from 'react'
import SignInPage from '../modules/auth/SingInPage'
import AuthContext from '../config/context/auth-context'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AdminLayout from '../modules/admin/AdminLayout';
import UserLayout from '../modules/admin/users/UserLayout';
import UserPage from '../modules/admin/users/UserPage';
import ClientLayout from '../modules/admin/users/ClientLayout';

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

        {
          /*user.signed? (
            <Route path='/' element={<UserLayout user={user}/>}>
            <Route path='user' element={<>User Home</>}/>
              <Route path='users' element={<>Usuarios</>}/>
              <Route path='productos' element={<>Productos</>}/>
            </Route>
            ) : <Route path='/' element={<SignInPage />} />*/
        }
        {
          user.signed /* && rol == ""admin*/? (
            <Route path='/' element={<AdminLayout />}>
              <Route path='/' element={<UserPage />} />
              <Route path='users' element={<UserPage />} />
              <Route path='client' element={<ClientLayout />} />
              <Route path='admin' element={<>Admin Home</>} />

              <Route path='productos' element={<>Productos</>} />
            </Route>
          ) : <Route path='/' element={<SignInPage />} />
        }
        <Route path='/*' element={<>404 NOT FOUND</>} />
      </>
    )
  );
  return <RouterProvider router={router} />
}

export default AppRouter
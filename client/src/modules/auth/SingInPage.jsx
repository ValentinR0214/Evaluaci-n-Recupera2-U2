import { React, useContext } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { FaAccessibleIcon } from "react-icons/fa";
import { customAlert } from '../../config/alert/alert';
import AxiosClient from '../../config/http-gateway/http-client';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../config/context/auth-context';

const SignInPage = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Campo obligatorio"),
      password: yup.string().required("Campo obligatorio"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      try {
        const response = await AxiosClient({
          url: "/auth/signin",
          method: 'POST',
          data: values,
        });
        if (!response?.error) {

          console.log(response.data.roles);

          if (response.data.roles && response.data.roles.length > 0) {
            const userRoles = response.data.roles[0].name;
            console.log(userRoles);

            dispatch({
              type: 'SIGNIN',
              payload: response.data
            });

            if (userRoles === 'ADMIN_ROLE') {
              navigate('/admin', { replace: true });
              if('ADMIN_ROLE' === '/users') {
                navigate('/admin', { replace: true });
              }else if('ADMIN_ROLE' === '/client') {
                navigate('/admin', { replace: true });
              }
            } else if (userRoles === 'USER_ROLE') {
              navigate('/users', { replace: true });
            } else if (userRoles === 'CLIENT_ROLE') {
              navigate('/client', { replace: true });
            }
          }

        } else {
          throw new Error('error');
        }
      } catch (error) {
        console.log(error);
        customAlert('Iniciar Sesion', 'Usuario y/o contraseña incorrectos', 'error');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className=" flex justify-center items-center ">
    <div className=" shadow-md rounded-lg p-8 w-96">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Iniciar Sesión</h1>
      <form noValidate onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
            Usuario 
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            id="username"
            type="text"
            name='username'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            placeholder="Nombre de usuario"
          />
          {formik.errors.username && formik.touched.username && (
            <span className='text-red-600 text-sm mt-1 block'>
              {formik.errors.username}
            </span>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input 
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            id="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="********"
          />
          

          {formik.errors.password && formik.touched.password && (
            <span className='text-red-600 text-sm mt-1 block'>
              {formik.errors.password}
            </span>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            className=" text-black font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default SignInPage;

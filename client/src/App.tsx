import React, { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { MutationCache, QueryClient, QueryClientProvider } from 'react-query'
import AuthProvider from './context/AuthContext'
import toast, { Toaster } from 'react-hot-toast'
import './App.css'

function App() {
  // const mutationCache = new MutationCache({
  //   onError: (error) => {
  //     ;(error as ErrorResponse)?.data?.map(
  //       item =>
  //         item &&
  //         item.loc &&
  //         toast.error(
  //           `${S(item.loc[1].toString()).capitalize() + ' ' + item.msg}`
  //         )
  //     )
  //   },
  // });
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // mutationCache,
        defaultOptions: {
          queries: {
            refetchOnMount: false,
          },
        },
      })
  )
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Provider store={store}>
            <RouterProvider router={routes} />
            <Toaster position="bottom-right" reverseOrder={true} />
          </Provider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App

import React, { useState } from 'react'
import './style/App.scss'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import routes from './routes'
import { MutationCache, QueryClient, QueryClientProvider } from 'react-query'
import AuthProvider from './context/AuthContext'
import toast, { Toaster } from 'react-hot-toast'
import S from 'string'

function App() {
  // region React Query Config

  const mutationCache = new MutationCache({
    onError: error => {
      ;(error as ErrorResponse)?.data?.map(
        item =>
          item &&
          item.loc &&
          toast.error(
            `${S(item.loc[1].toString()).capitalize() + ' ' + item.msg}`
          )
      )
    },
  })
  const [queryClient] = useState(
    () =>
      new QueryClient({
        mutationCache,
        defaultOptions: {
          queries: {
            refetchOnMount: false,
          },
        },
      })
  )

  // endregion

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Provider store={store}>
            <RouterProvider router={routes} />
            {/*<ToastContainer*/}
            {/*  position="top-right"*/}
            {/*  autoClose={5000}*/}
            {/*  hideProgressBar={false}*/}
            {/*  newestOnTop={false}*/}
            {/*  closeOnClick*/}
            {/*  rtl={false}*/}
            {/*  pauseOnFocusLoss*/}
            {/*  draggable*/}
            {/*  pauseOnHover*/}
            {/*  theme="light"*/}
            {/*/>*/}
            <Toaster position="bottom-right" reverseOrder={true} />
          </Provider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App

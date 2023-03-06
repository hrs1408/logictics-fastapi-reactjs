import React from 'react';
import './style/App.scss';
import {store} from "./redux/store";
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import routes from "./routes";
import {QueryClient, QueryClientProvider} from "react-query";
import {ToastContainer} from "react-toastify";
import AuthProvider from "./context/AuthContext";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // default: true
        },
    },
});

function App() {
  return (
      <>
        <QueryClientProvider client={queryClient}>
          {/*<GoogleOAuthProvider clientId="763320474772-gejlvbjko8gmg48ed97s47e3i0peg1jv.apps.googleusercontent.com">*/}
          <AuthProvider>
            {/*<WebsocketProvider>*/}
            <Provider store={store}>
              <RouterProvider router={routes} />
              <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
              />
            </Provider>
            {/*</WebsocketProvider>*/}
          </AuthProvider>
          {/*</GoogleOAuthProvider>*/}
        </QueryClientProvider>
      </>
  );
}

export default App;

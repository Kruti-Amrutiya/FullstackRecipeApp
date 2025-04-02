import store, { persistor } from "../setup/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import "../styles/globals.scss";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import NextRouter from "next/router";
import "../styles/nprogress.css";
import "../styles/globals.scss";


NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

NextRouter.events.on("routeChangeStart", () => NProgress.start());
NextRouter.events.on("routeChangeComplete", () => NProgress.done());
NextRouter.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster position="bottom-right" reverseOrder={false} />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;

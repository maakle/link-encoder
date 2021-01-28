import { ToastProvider } from "react-toast-notifications";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider autoDismiss={true}>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default MyApp;

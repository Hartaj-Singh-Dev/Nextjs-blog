import Router from 'next/router'
import "./main.css";
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';


function App({Component, pageProps}){
    Router.events.on("routeChangeStart",()=> Nprogress.start());
    Router.events.on("routeChangeComplete",()=>{
        Nprogress.done()
    });
    Router.events.on("routeChangeError",()=> Nprogress.done());

    return <Component  {...pageProps} /> 
}

export default App;
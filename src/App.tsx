import Home from './Component/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import About from './Component/About/About';
import Contact from './Component/Contact/Contact';
import Shop from './Component/Shop/Shop';
import Register from './Component/Register/Register';
import NotFound from './Component/NotFound/NotFound';
import AdminProduct from './Component/AdminProducts/AdminProduct';
import AdminCategory from './Component/AdminCategory/AdminCategory';
import LogInUser from './Component/LogInUser/LogInUser';
import LogInAdmin from './Component/LogInAdmin/LogInAdmin';
import LayOut from './Component/LayOut/LayOut';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserProfile from './Component/UserProfile/UserProfile';
import Cart from './Component/Cart/Cart';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';
import VerifyCode from './Component/VerifyCode/VerifyCode';
import { Provider} from 'react-redux';
import store from './Component/Redux/Store';
import ProtectedRouts from './Component/ProtactedRouts/ProductRoutes';
import { useEffect, useState } from 'react';
import { setToken } from './Component/Redux/TokenSlice';
import { BeatLoader} from 'react-spinners';
import ResetPassword from './Component/ResetPassword/ResetPassword';
// import { Offline, Online } from "react-detect-offline"



export default function App() {

  // spinner
  const [loading , setLoading] = useState(false);

useEffect(()=>{

  setLoading(true)

  setTimeout(()=>{
    setLoading(false)
  },3000)

  

},[])

  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      store.dispatch(setToken(storedToken));
    }
  }, []);




  const routes = createBrowserRouter([
    { path: '', element: <LayOut/>, children: [
      { index: true, element:<Home/>},
      { path: "about", element:<ProtectedRouts> <About/></ProtectedRouts>},
      { path: "contact", element:<ProtectedRouts><Contact/></ProtectedRouts> },
      { path: "adminProduct", element:<ProtectedRouts><AdminProduct/></ProtectedRouts> },
      { path: "adminCategory", element:<ProtectedRouts><AdminCategory/></ProtectedRouts>  },
      { path: "userProfile", element:<ProtectedRouts><UserProfile/></ProtectedRouts>  },
      { path: "verifyCode", element:<ProtectedRouts><VerifyCode/></ProtectedRouts> },
      { path: "resetPassword", element:<ProtectedRouts><ResetPassword/></ProtectedRouts> }, 
      { path: "shop", element:<ProtectedRouts><Shop/></ProtectedRouts> },
      { path: "forgetPassword", element:<ForgetPassword/>},
      { path: "cart", element:<ProtectedRouts><Cart/></ProtectedRouts>  },
      { path: "loginUser", element:<LogInUser/>},
      { path: "loginAdmin", element:<LogInAdmin /> },
      { path: "register", element:<Register/> },
      { path: "*", element:<NotFound/> }
    ]}
  ]);

  return (
  <>


    {/* <Online>Only shown when you're online</Online>
    <Offline>Only shown offline (surprise!)</Offline> */}

{loading?
  <div className="position-absolute top-50 start-50 translate-middle">
  
    <BeatLoader
  color="hsla(162, 67%, 53%, 1)" 
  size={30}
/>

</div>
:

<Provider store={store}>
<RouterProvider router={routes}></RouterProvider>
</Provider> 

}
      </>
  );
}



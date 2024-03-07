import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import NavigationBar from '../Navbar/NavigationBar';

export default function LayOut() {
    return (
        <>
        <NavigationBar/>
        <Outlet/>
        <Footer/>
        </>
    );
    }
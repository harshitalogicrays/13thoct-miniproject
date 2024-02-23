import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import Products from "./components/Products"
import Login from "./components/Login"
import Register from "./components/Register"
import PageNotFound from "./components/PageNotFound"
import { Container } from "react-bootstrap"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./components/Admin/Dashboard"
import { Protected, ProtectedAdmin } from "./components/HiddenLinks"
function App() {
  
  return (
    <>
    <ToastContainer position="bottom-left" autoClose={2000}
        hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false}
        draggable pauseOnHover={false} theme="colored"
        />
    <Header/>
    <Container className="mt-5">
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/products' element={<Protected><Products/></Protected>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/admin' element={<ProtectedAdmin><Dashboard/></ProtectedAdmin>}></Route>
            <Route path='*' element={<PageNotFound/>}/>
        </Routes>
    </Container>
    </>
    )
}

export default App

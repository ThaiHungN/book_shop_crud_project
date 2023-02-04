import { Routes, Route } from 'react-router-dom'
import "./App.scss";

// import pages
import Home from './pages/home/Home';
import Product from './pages/product/Product';
import Cart from './pages/cart/Cart';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ProductManagement from './pages/admin/productManagement/ProductManagement';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Create from './pages/admin/productManagement/Create';
import EditProduct from './pages/admin/productManagement/Edit';
import UserManagement from './pages/admin/userManagement/UserManagement';
import Profile from './pages/admin/userManagement/Profile';
import EditUser from './pages/admin/userManagement/Edit';


// import contexts
import AuthContextProvider from './contexts/AuthContext';
import ProductContextProvider from './contexts/ProductContext';
import UserContextProvider from './contexts/UserContext';
import CartContextProvider from './contexts/CartContext';
import UploadContextProvider from './contexts/UploadContext';

import UnAuth from './pages/protected/UnAuth';
import Admin from './pages/protected/Admin';
import Auth from './pages/protected/Auth';


function App() {
	return (
		<AuthContextProvider>
			<UserContextProvider>
				<ProductContextProvider>
					<UploadContextProvider>
						<CartContextProvider>
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/products' element={<Product />} />
								<Route path='/cart' element={<Cart />} />

								<Route path='/login' element={
									<UnAuth>
										<Login />
									</UnAuth>
								} />
							
								<Route path='/register' element={
									<UnAuth>
										<Register />
									</UnAuth>
								} />

								<Route path='/admin' element={
									<Admin>
										<Dashboard />
									</Admin>
								} />

								<Route path='/admin/products' element={
									<Admin>
										<ProductManagement />
									</Admin>
								} />

								<Route path='/admin/products/create' element={
									<Admin>
										<Create />
									</Admin>
								} />

								<Route path='/admin/products/edit/:id' element={
									<Admin>
										<EditProduct />
									</Admin>
								} />

								<Route path='/admin/users' element={
									<Admin>
										<UserManagement />
									</Admin>
								} />

								<Route path='/profile/:id' element={
									<Auth>
										<Profile />
									</Auth>
								} />

								<Route path='/profile/edit/:id' element={
									<Auth>
										<EditUser />
									</Auth>
								} />

							</Routes>
						</CartContextProvider>
					</UploadContextProvider>
				</ProductContextProvider>
			</UserContextProvider>
		</AuthContextProvider>
	);
}

export default App;

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/about';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateSupplier from './pages/createSupplier';
import FindSupplier from './pages/FindSupplier';
import ViewSuppliers from './pages/ViewSuppliers';
import CreateCocoa from './pages/CreateCocoa';
import ViewBatches from './pages/ViewBatches';
import UpdateBatch from './pages/UpdateBatch';


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/' element={<Home />} />
          <Route path='/add-supplier' element={<CreateSupplier />} />
          <Route path='/find-supplier' element={<FindSupplier />} />
          <Route path='/view-suppliers' element={<ViewSuppliers />} />
          <Route path='/register-cocoa' element={<CreateCocoa />} />
          <Route path='/view-batches' element={<ViewBatches />} />
          <Route path='/update-batch' element={<UpdateBatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

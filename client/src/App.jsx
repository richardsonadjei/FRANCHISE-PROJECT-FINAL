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
import UpdateBatch from './pages/UpdateBatch';
import InventoryReports from './pages/InventoryReports';
import StockReport from './pages/inventoryReports/StockReport';
import Aside from './pages/Aside';
import TransactionHistory from './pages/inventoryReports/TransactionHistory';
import StockTake from './pages/inventoryReports/StockTake';
import CreateCustomer from './pages/CreateCustomer';
import UpdateCustomer from './pages/UpdateCustomer';
import ReceiveStock from './pages/ReceiveStock';


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Aside />
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
          <Route path='/update-batch' element={<UpdateBatch />} />
          <Route path='/inventory-reports' element={<InventoryReports/>} />
          <Route path='/stock-report' element={<StockReport/>} />
          <Route path='/transaction-history' element={<TransactionHistory/>} />
          <Route path='/take-stock' element={<StockTake/>} />
          <Route path='/create-customer' element={<CreateCustomer/>} />
          <Route path='/update-customer' element={<UpdateCustomer/>} />
          <Route path='/receive-stock' element={<ReceiveStock/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

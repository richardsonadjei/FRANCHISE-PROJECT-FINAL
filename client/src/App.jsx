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
import StockTake from './pages/inventoryReports/StockTake';
import CreateCustomer from './pages/CreateCustomer';
import UpdateCustomer from './pages/UpdateCustomer';
import ReceiveStock from './pages/ReceiveStock';
import ReceiveReport from './pages/inventoryReports/ReceiveReport';
import BatchTransactionHistory from './pages/BatchTransactionHistory';
import ModifyBatch from './pages/ModifyBatch';
import AllBatchTransactionReport from './pages/inventoryReports/AllBatchTransactionReport';
import Evacuation from './pages/Evacuation';
import Income from './pages/Income';
import WayBill from './pages/WayBill';
import FinancialReports from './pages/FinancialReports';
import AllIncomeReport from './pages/financial Reports/AllIncomeReport';
import PendingPayment from './pages/PendingPayment';
import UpdatePayment from './pages/UpdatePayment';
import AllEvacuationReport from './pages/inventoryReports/AllEvacuationReport';
import BatchEvacuationReport from './pages/BatchEvacuationReport';
import ExpenseCategory from './pages/ExpenseCategory';
import CreateExpense from './pages/CreateExpense';
import AllExpenseReport from './pages/financial Reports/AllExpenseReport';
import AllMiscReport from './pages/financial Reports/AllMiscReport';
import AllProcurementReport from './pages/AllProcurementReport';
import BatchTransactionReport from './pages/BatchTransactionHistory';
import BatchIncome from './pages/financial Reports/BatchIncome';
import ProfitLossReport from './pages/financial Reports/ProfitLossReport';
import Partners from './pages/Partners';
import Overview from './pages/Overview';
import BatchProfitLoss from './pages/financial Reports/BatchProfitLoss';
import CreateBatchExpense from './pages/CreateBatchExpense';
import BatchProcurementReport from './pages/inventoryReports/BatchProcurementReport';
import WaybillReport from './pages/inventoryReports/WaybillReport';



export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Aside />
      <Routes>
        <Route path='/' element={<Overview/>} /> 
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/home' element={<Home />} />
          <Route path='/add-supplier' element={<CreateSupplier />} />
          <Route path='/find-supplier' element={<FindSupplier />} />
          <Route path='/view-suppliers' element={<ViewSuppliers />} />
          <Route path='/register-cocoa' element={<CreateCocoa />} />
          <Route path='/update-batch' element={<UpdateBatch />} />
          <Route path='/inventory-reports' element={<InventoryReports/>} />
          <Route path='/stock-report' element={<StockReport/>} />
          <Route path='/transaction-history' element={<AllBatchTransactionReport/>} />
          <Route path='/take-stock' element={<StockTake/>} />
          <Route path='/create-customer' element={<CreateCustomer/>} />
          <Route path='/update-customer' element={<UpdateCustomer/>} />
          <Route path='/receive-stock' element={<ReceiveStock/>} />
          <Route path='/receive-report' element={<ReceiveReport/>} />
          <Route path='/batch-history' element={<BatchTransactionHistory/>} />
          <Route path='/modify-batch' element={<ModifyBatch/>} />
          <Route path='/evacuation' element={<Evacuation/>} />
          <Route path='/income' element={<Income/>} />
          <Route path='/waybill' element={<WayBill/>} />
          <Route path='/financial-reports' element={<FinancialReports/>} />
          <Route path='/income-report' element={<AllIncomeReport/>} />
          <Route path='/batch-income' element={<BatchIncome/>} />
          <Route path='/pending-payment' element={<PendingPayment/>} />
          <Route path='/update-payment' element={<UpdatePayment/>} />
          <Route path='/all-evacuation' element={<AllEvacuationReport/>} />
          <Route path='/batch-evacuation' element={<BatchEvacuationReport/>} />
          <Route path='/expense-category' element={<ExpenseCategory/>} /> 
          <Route path='/create-expense' element={<CreateExpense/>} /> 
          <Route path='/all-expense' element={<AllExpenseReport/>} /> 
          <Route path='/misc-expense' element={<AllMiscReport/>} /> 
          <Route path='/procurement-report' element={<AllProcurementReport/>} /> 
          <Route path='/profit-loss' element={<ProfitLossReport/>} /> 
          <Route path='/partners' element={<Partners/>} /> 
          <Route path='/partners' element={<Partners/>} /> 
          <Route path='/batch-profit' element={<BatchProfitLoss/>} /> 
          <Route path='/batch-expense' element={<CreateBatchExpense/>} /> 
          <Route path='/batch-procurement' element={<BatchProcurementReport/>} /> 
          <Route path='/waybill-report' element={<WaybillReport/>} /> 
          
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

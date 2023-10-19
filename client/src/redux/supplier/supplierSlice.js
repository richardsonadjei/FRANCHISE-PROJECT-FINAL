import { createSlice } from '@reduxjs/toolkit';

const supplierSlice = createSlice({
  name: 'supplier',
  initialState: {
    id: '',
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
  },
  reducers: {
    setSupplier: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetSupplier: (state) => {
      return {
        id: '',
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
      };
    },
  },
});

export const { setSupplier, resetSupplier } = supplierSlice.actions;
export const selectSupplier = (state) => state.supplier;
export default supplierSlice.reducer;

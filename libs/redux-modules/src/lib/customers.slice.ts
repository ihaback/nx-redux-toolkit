import {
  createAsyncThunk,
  createSlice,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit';
import { CustomerProps, RootState } from '@nx-redux-toolkit/types';
import axios from 'axios';

export const CUSTOMERS_FEATURE_KEY = 'customers';

export interface CustomersState {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
  data: CustomerProps[];
  searchString: string | undefined;
  page: number;
  limit: number;
  count: number;
}

export const fetchCustomers = createAsyncThunk(
  'customers/fetch',
  async (_, thunkAPI) => {
    const {
      customers: { page, limit, searchString },
    } = thunkAPI.getState() as RootState;

    if (searchString) {
      const customersRes = await axios.get(
        `${process.env.NX_SITE_URL}/customer?page=${page}&limit=${limit}&searchString=${searchString}`
      );

      return customersRes.data;
    }

    const customersRes = await axios.get(
      `${process.env.NX_SITE_URL}/customer?page=${page}&limit=${limit}`
    );

    return customersRes.data;
  }
);

export const addCustomer = createAsyncThunk(
  'customers/add',
  async (customerData: { name: string }, { dispatch }) => {
    await axios.post(`${process.env.NX_SITE_URL}/customer`, customerData);
    dispatch(fetchCustomers());
  }
);

export const initialCustomersState: CustomersState = {
  loadingStatus: 'loading',
  error: null,
  data: [],
  searchString: undefined,
  page: 1,
  limit: 10,
  count: 0,
};

export const customersSlice = createSlice({
  name: CUSTOMERS_FEATURE_KEY,
  initialState: initialCustomersState,
  reducers: {
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loadingStatus = 'loaded';
        state.data = action.payload.list;
        state.count = action.payload.length;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      })
      .addCase(addCustomer.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(addCustomer.fulfilled, (state) => {
        state.loadingStatus = 'loaded';
        state.page = 1;
      })
      .addCase(addCustomer.rejected, (state) => {
        state.loadingStatus = 'error';
        state.error = 'Could not add customer';
      });
  },
});

export const { setSearchString, setPage } = customersSlice.actions;

export const customerSearchString = createSelector(
  (state: RootState) => state.customers.searchString,
  (searchString) => searchString
);

export const selectCustomers = createSelector(
  (state: RootState) => state.customers.data,
  (state: RootState) => state.customers.searchString,
  (customers) => {
    const customersWithDate = customers.map((x) => {
      return {
        ...x,
        createdAt: new Date(x.createdAt).toDateString(),
      };
    });

    return customersWithDate;
  }
);

export const selectCustomersPage = createSelector(
  (state: RootState) => state.customers.page,
  (pages) => pages
);

export const selectCustomersCount = createSelector(
  (state: RootState) => state.customers.count,
  (state: RootState) => state.customers.limit,
  (count, limit) => {
    return Math.ceil(count / limit);
  }
);

export const selectCustomersLoading = createSelector(
  (state: RootState) => state.customers.loadingStatus,
  (loading) => {
    return loading === 'loading';
  }
);

export const customersReducer = customersSlice.reducer;

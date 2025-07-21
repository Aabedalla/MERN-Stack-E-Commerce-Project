import {fechBaseQuery} from '@reduxjs/toolkit/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../features/Constants';

const baseQuery = fechBaseQuery({baseUrl: BASE_URL });
export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User', 'Cayegory'],
    endpoints: () => ({}),
})
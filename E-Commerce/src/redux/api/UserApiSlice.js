import {apiSlice} from '../api/apiSlice';
import {USER_URL} from '../../features/Constants';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data)=> ({
                url: `${USER_URL}/auth`,
                method: 'POST',
                body: data
            })
        })
    })
})

// `use${Login} Mutation` 

export const {useLoginMutation} = userApiSlice;
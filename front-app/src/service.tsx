import axios from 'axios';
import { ApiErrorResponse, ApiSuccessResponse } from './AppConstants';
import Store from './store';

const base_url = 'http://localhost:3001/api'

const apiCall = async (url: string, options: any) => {
    let headers: any = {};
    if (options?.isAuth) {
        headers["Authorization"] = options.token || Store.getStore().token
    }
    let response;
    if (options.method === 'GET') {
        response = await axios.get(`${base_url}/${url}`, { headers: headers })
    } else {
        response = await axios.post(`${base_url}/${url}`, options.payload, { headers: headers });
    }
    if (response.headers['authorization']) {
        Store.setStore({ token: response.headers['authorization'] });
    }
    return response;
}

export const fetchUser = async (forceFetch = false) => {
    const store = Store.getStore();
    if (store?.user && store?.email && !forceFetch) {
        return store.user
    }
    let user = Store.loadFromSession();
    if (user) {
        try {
            let apiResponse = await apiCall("me", { isAuth: true, method: 'GET' });
            if (apiResponse.status === 200) {
                Store.setStore({ user: apiResponse.data?.user });
            } else {
                Store.clearStorage();
            }
            return apiResponse.data?.user;
        } catch (err) {
            Store.clearStorage();
            return null;
        }

    }
    return null;
}

export const signInUser = async (payload: any) => {
    try {
        let apiResponse = await apiCall("auth/sign_in", { isAuth: false, payload });
        if (apiResponse.status === 200) {
            return fetchUser();
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }

}

export const signUpUser = async (payload: any) => {
    try {
        let apiResponse = await apiCall("auth", { isAuth: false, payload });
        if (apiResponse.status === 200) {
            return fetchUser();
            return { success: true }
        } else {
            return { success: false };
        }
    } catch (err) {
        return { success: false };
    }
}

export const addReferral = async (payload: any) => {
    try {
        let apiResponse = await apiCall("referrals", { isAuth: true, payload });
        if (apiResponse.status === 200 && apiResponse.data.success) {
            let store = Store.getStore();
            Store.setStore({ user: { ...store.user, referrals: [...(store.user.referrals), apiResponse.data.data] } })
            return ApiSuccessResponse(apiResponse.data.data)
        } else {
            return ApiErrorResponse(apiResponse.data.message);
        }
    } catch (err) {
        return ApiErrorResponse();
    }
}

export const acceptInvite = async (payload: any) => {
    try {
        let apiResponse = await apiCall("referrals/accept_invite", { isAuth: true, payload });
        if (apiResponse.status === 200 && apiResponse.data.success) {
            return ApiSuccessResponse()
        } else {
            return ApiErrorResponse();
        }
    } catch (err) {
        return ApiErrorResponse();
    }
}
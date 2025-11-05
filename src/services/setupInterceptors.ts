import axios from 'axios';
import type { EnhancedStore } from '@reduxjs/toolkit';
import api from './api';
import { refreshTokenThunk } from '../features/auth/services/authThunks';
import { logout } from '../features/auth/redux/authSlice';
import type { RootState } from '../app/store';

export const setupInterceptors = (store: EnhancedStore) => {

    api.interceptors.request.use((config) => {
        const token = (store.getState() as RootState).auth.accessToken;

        const endPointsAuth = /^\/?auth\//.test(config.url ?? "");


        if (token && !endPointsAuth) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    let isRefreshing = false;
    let failedQueue: any[] = [];

    const processQueue = (error: any, token: string | null = null) => {
        failedQueue.forEach((prom) => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        });
        failedQueue = [];
    };

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            const status = error.response?.status;

            if (status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise(function (resolve, reject) {
                        failedQueue.push({ resolve, reject });
                    })
                        .then((token) => {
                            originalRequest.headers["Authorization"] = "Bearer " + token;
                            return axios(originalRequest);
                        })
                        .catch((err) => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const result = await store.dispatch(refreshTokenThunk() as any).unwrap();
                    api.defaults.headers.common["Authorization"] =
                        "Bearer " + result.accessToken;
                    processQueue(null, result.accessToken);
                    return api(originalRequest);
                } catch (err) {
                    processQueue(err, null);
                    store.dispatch(logout());
                    return Promise.reject(err);
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );
};
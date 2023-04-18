import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '../_helpers';
import axios from "axios";

// create slice

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const slice = createSlice({ name, initialState, reducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        value: JSON.parse(localStorage.getItem('auth'))
    }
}

function createReducers() {
    return {
        setAuth
    };

    function setAuth(state, action) {
        state.value = action.payload;
    }
}

function createExtraActions() {
    const baseUrl = `https://job-roadmap.ru/api/v1`;

    return {
        login: login(),
        logout: logout(),

    };

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async function ({ email, password }, { dispatch }) {
                try {
                    const user = await axios.post(`${baseUrl}/login`, {email, password});
                    dispatch(authActions.profile);
                } catch (error) {
                    if (error.response.data.status === 401) {
                        return 401
                    }
                    if (Math.trunc(error.response.data.status / 100) === 5) {
                        return 500;
                    }
                }
            }
        );
    }

    function logout() {
        return createAsyncThunk(
            `${name}/logout`,
            async function () {
                try {
                    const user = await axios.delete(`${baseUrl}/logout`);
                } catch (error) {
                    if (error.response.data.status === 401) {
                        return 401
                    }
                    if (Math.trunc(error.response.data.status / 100) === 5) {
                        alert('ошибка сервера')
                        return 500;
                    }
                }
            }
        );
    }

    function profile() {
        return createAsyncThunk(
            `${name}/profile`,
            async function ({ dispatch }) {
                try {

                    const resProfile = await axios.get(`${baseUrl}/profile`,{
                        headers: {"Content-Type": "application/json"},
                        withCredentials: true
                    });
                    // set auth user in redux state
                    if (resProfile.data.status === 200) {
                        dispatch(authActions.setAuth(resProfile.data.user));
                    }
                    return true
                } catch (error) {

                    if (error.response.data.status === 401) {
                        return 401
                    }

                    if (Math.trunc(error.response.data.status / 100) === 5) {
                        return 500;
                    }
                }
            }
        );
    }
}
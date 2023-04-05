import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authActions } from '../_store';
import { fetchWrapper } from '../_helpers';
import axios from "axios";

// create slice

const name = 'users';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const userActions = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        list: null,
        item: null,
        message: ''
    }
}

function createExtraActions() {
    const baseUrl = `http://109.120.182.94:1323/api/v1`;

    return {
        signup: signup(),
        update: update(),
        delete: _delete()
    };

    function signup() {
        return createAsyncThunk(
            `${name}/signup`,
            async function ({ username, email, password }, { dispatch }) {
                try {
                    // dispatch(authActions.profile);

                    const res = await axios.post(`${baseUrl}/signup`, {username, email, password});
                    
                    if (res.data.message) {
                        alert('Подтвердите вашу почту  ' + email)
                        // history('/favorites');
                    }

                    if (res.data.message === 500) {

                    }
                    if (res.data.message === 400 ){

                    }
                    return res.data.message;
                } catch (error) {
                    
                    if (error.response.data.status === 401) {
                        return 401
                    }
                    if (error.response.data.status === 400) {
                        alert('эта почта уже зарегистрирована  ' + email)
                    }

                    if (Math.trunc(error.response.data.status / 100) === 5) {
                        alert('ошибка на сервере')
                        return 500;
                    }
                }
            }
        );
    }


    function update() {
        return createAsyncThunk(
            `${name}/update`,
            async function ({ id, data }, { getState, dispatch }) {
                await fetchWrapper.put(`${baseUrl}/${id}`, data);

                // update stored user if the logged in user updated their own record
                const auth = getState().auth.value;
                if (id === auth?.id.toString()) {
                    // update local storage
                    const user = { ...auth, ...data };
                    localStorage.setItem('profile', JSON.stringify(user));

                    // update auth user in redux state
                    dispatch(authActions.setAuth(user));
                }
            }
        );
    }

    // prefixed with underscore because delete is a reserved word in javascript
    function _delete() {
        return createAsyncThunk(
            `${name}/delete`,
            async function (id, { getState, dispatch }) {
                await fetchWrapper.delete(`${baseUrl}/${id}`);

                // auto logout if the logged in user deleted their own record
                if (id === getState().auth.value?.id) {
                    dispatch(authActions.logout());
                }
            }
        );
    }
}

function createExtraReducers() {
    return (builder) => {
        signup()
        function signup() {
            var { pending, fulfilled, rejected } = extraActions.signup;
            builder
                .addCase(pending, (state) => {
                    state.list = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.message = action.payload;
                })
                .addCase(rejected, (state, action) => {
                    state.list = { error: action.error };
                });
        }
    }
}

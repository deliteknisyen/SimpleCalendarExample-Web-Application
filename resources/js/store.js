import {getLoggedinUser} from './partials/auth';
const user = getLoggedinUser();

export default {
    state: {
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        auth_error: null,
        reg_error:null,
        registeredUser: null,

        calendarEventFocused: null,
        calendarFocus: false,
        isSidebarOpened: false
    },
    getters: {
        isLoading(state) {
            return state.loading;
        },
        isLoggedin(state) {
            return state.isLoggedin;
        },
        currentUser(state) {
            return state.currentUser;
        },
        authError(state) {
            return state.auth_error;
        },
        regError(state) {
            return state.reg_error;
        },
        registeredUser(state) {
            return state.registeredUser;
        },
        calendarEventFocused(state) {
            return state.calendarEventFocused;
        },
        calendarFocus(state) {
            return state.calendarFocus;
        },
        isSidebarOpened(state) {
            return state.isSidebarOpened;
        }
    },
    mutations: {
        login(state) {
            state.loading = true;
            state.auth_error = null;
        },
        loginSuccess(state, payload) {
            state.auth_error = null;
            state.isLoggedin = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.payload.user, {token: payload.payload.access_token, expires_in: payload.payload.expires_in, date: Date.now() + (payload.payload.expires_in * 1000)});

            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },
        loginFailed(state, payload) {
            state.loading = false;
            state.auth_error = payload.errors;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedin = false;
            state.currentUser = null;
        },
        registerSuccess(state, payload) {
            state.reg_error = null;
            state.registeredUser = payload.payload.user;
        },
        registerFailed(state, payload) {
            state.reg_error = payload.errors;
        },
        calendarFocusedAnEvent(state, payload) {
            if(state.calendarFocus)
            {
                state.calendarEventFocused = null;
                state.calendarFocus = false;
            }
            else
            {
                state.calendarEventFocused = payload;
                state.calendarFocus = true;
            }
        },
        CHANGE_SIDEBAR_STATE_TO( state, to ) {
            state.isSidebarOpened = to;
        }
    },
    actions: {
        changeSidebarState( {commit}, to ) {
            commit('CHANGE_SIDEBAR_STATE_TO', to);
        },
        login(context){
            context.commit("login");
        }
    }
};

import { combineReducers } from 'redux'
// import { authReducer } from '../modules/authentication/redux/authenticationReducer'
// import examReducer from '../modules/student/exam/redux/examReducer'
// import profileReducer from '../modules/orgadmin/orgprofile/redux/profileReducer'
// import headerReducer from '../core/layout/redux/headerReducer'

const initialState = {
	authReducer: '',
	sidebar: '',
	orgSidebar: '',
	profile: '',
}

const rootReducer = combineReducers({
	// authReducer: authReducer,
	// headerReducer: headerReducer,
	// examReducer: examReducer,
	// profile: profileReducer,
})
export default rootReducer
export { initialState }

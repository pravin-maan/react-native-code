import * as types from '../actionKeys/keys'

export const isloading = data =>({type:types.IS_LOADING_KEY.IS_LOADING,data});
export const login = data =>({type:types.USER_KEY.USER_LOGIN,data});
export const setCurrentUser = data =>({type:types.USER_KEY.USER_LOGIN_RESPONSE,data});
export const setCurrentTab = data=>({type:types.USER_KEY.SET_CURRENT_TAB,data});
export const getSafetycheck = data =>({type:types.HOME_PAGE_KEY.getSafetycheck,data});
export const setSafetyCurrentPage = data =>({type:types.PAPER.setSafetyCurrentPage,data});
export const setSafety = data =>({type:types.PAPER.setSafety,data});
export const getOrders = data =>({type:types.PAPER.getOrders,data});
export const collectRute = data =>({type:types.PAPER.collectRute,data});
export const startJob = data =>({type:types.PAPER.startJob,data});
export const changePassword = data =>({type:types.PAPER.changePassword,data});
export const updateProfile = data =>({type:types.PAPER.updateProfile,data});
export const setOnlineStatus = data =>({type:types.PAPER.setOnlineStatus,data});
export const selectedOrder = data =>({type:types.PAPER.selectedOrder_response,data});
export const bottomTabShow = data =>({type:types.PAPER.bottomTabShow,data});
export const setdeliveryfailed = data =>({type:types.PAPER.setdeliveryfailed,data});
export const selectedTabdeliverOrder = data =>({type:types.IS_LOADING_KEY.selectedTabdeliverOrder,data});
export const OrderDelivered = data =>({type:types.PAPER.OrderDelivered,data});
export const getUser = data =>({type:types.PAPER.getUser,data});
export const forgoutPass = data =>({type:types.PAPER.GET_SYLLABUS5,data});

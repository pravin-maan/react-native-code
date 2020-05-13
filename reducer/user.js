import * as types from '../constant/actionKeys/keys';
import createReducer from '../store/createReducer';

export const User = createReducer({}, {
    [types.USER_KEY.USER_LOGIN_RESPONSE](state, action) {
        return ({ ...state, userData: action.data,});
    },
    [types.USER_KEY.SET_CURRENT_TAB](state, action) {
        return ({ ...state, selectedTab: action.data,});
    },

    [types.HOME_PAGE_KEY.getSafetycheck_RESPONSE](state, action){
        return ({ ...state, getSafetycheck: action.data.Data,});
    },

    [types.IS_LOADING_KEY.IS_LOADING](state, action){
        return ({ ...state, isloading: action.data,});
    },
    [types.PAPER.setSafetyCurrentPage](state, action){
        return ({ ...state, setSafetyCurrentPage: action.data});
    },
    [types.PAPER.getOrders_response](state, action){
        let getOrders =[];
        let deliveredorder =[];
        action.data.Data.map((e,i)=>{
           if(e.StatusName=="Delevery Failed"||e.StatusName=="Order Delevered"){
            deliveredorder.push(e);
           }
           else{
            getOrders.push(e);
           }
        })

        return ({ ...state,getOrders,deliveredorder});
    },
    [types.PAPER.selectedOrder_response](state, action){
        return ({ ...state, selectedOrder: action.data});
    },

    [types.PAPER.bottomTabShow](state, action){
        return ({ ...state, bottomTabShow: action.data});
    },
    
    [types.IS_LOADING_KEY.selectedTabdeliverOrder](state, action){
        return ({ ...state, selectedTabdeliverOrder: action.data});
    },

    







    


    [types.PAPER.GET_SYLLABUS_RESPONSE](state, action){
        return ({ ...state, getSyllabus: action.data.data.description?action.data.data.description:action.data.data,});
    },
  
    [types.PAPER.startJob_response](state, action){
        return ({ ...state, startJob: action.data.data});
    },

    [types.PAPER.changePassword_response](state, action){
        return ({ ...state, changePassword: action.data.data});
    },
    [types.PAPER.setOnlineStatus_response](state, action){
        return ({ ...state, setOnlineStatus: action.data.data});
    },
    [types.PAPER.OrderDelivered_response](state, action){
        return ({ ...state,OrderDelivered: action.data.data});
    },
    [types.PAPER.setSafety_response](state, action){
        return ({ ...state,setSafety: action.data.data});
    },

    
})

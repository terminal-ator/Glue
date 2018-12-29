import { CREATE_ENTRY, DAY_END } from '../actionTypes';


const initialState = {
    all: []
}


export const entryReducer = (state =initialState, action)=>{
    switch(action.type){
        case CREATE_ENTRY:
            if(state[action.payload.account.id]){
                return{
                    ...state,
                 [action.payload.account.id] :
                     action.payload.packet,
                }
            }
            else
            return {...state,
                 [action.payload.account.id] :
                     action.payload.packet, 
                     all: [...state.all, action.payload.account.id ]}
        case DAY_END:
                return initialState
        default:
            return state
    }
}
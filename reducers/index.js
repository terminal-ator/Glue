import { combineReducers } from 'redux';
import { entryReducer } from './entry';
import { accountsReducer } from './accounts';
import { UIReducer } from './ui';
import CredReducer from './credentials';

export default combineReducers({
    entry: entryReducer,
    accounts : accountsReducer,
    ui : UIReducer,
    cred : CredReducer,
})
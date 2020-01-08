import React from 'react';
import { StyleSheet, Text, View, Picker, StatusBar } from 'react-native';
import ASelect from './screens/accountSelect';
import Entry from './screens/entry';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Reducer from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import AccoutNavigator from './navigation/accountStack';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
	key: 'fakeRoot',
	storage
};

const persistRed = persistReducer(persistConfig, Reducer);

const store = createStore(persistRed, applyMiddleware(thunk));
let persistor = persistStore(store);

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<StatusBar barStyle="dark-content" hidden={false} backgroundColor={'#fff'} translucent={true} />
					<AccoutNavigator />
				</PersistGate>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import accountSelect from '../screens/accountSelect';
import entryScreen from '../screens/entry';
import mainScreen from '../screens/mainMenu';
import StartScreen from '../screens/startDay';
import LoginScreen from '../screens/login';
import React, { Component } from 'react';
import { View, ActivityIndicator  } from 'react-native';
import { connect} from 'react-redux';

const AccountNavigator = createStackNavigator({
    main : { screen: mainScreen },
    account : { screen : accountSelect },
    entry : { screen : entryScreen }
})

const TabNavigator = createSwitchNavigator({
    login: {screen : LoginScreen},
    start : { screen : StartScreen},
    accounts: {screen: AccountNavigator}
})

const  Navigator =  createAppContainer(TabNavigator);

class Navigation extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <Navigator/>
                {this.props.uiProps.loading && 
                <View style={styles.loading}>
                    <ActivityIndicator size="large"/>
                </View>
                }
            </View>
        );
    }
}

const styles = {
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
}

mapStateToProps = state=>{
    return{
        uiProps: state.ui
    }
}

export default connect(mapStateToProps,null)(Navigation);
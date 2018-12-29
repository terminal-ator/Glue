import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, Text, TextInput, StyleSheet } from 'react-native'
import {styles} from '../components/search';
import Button from '../components/button';
import {loginTo} from '../actions';

class LoginScreen extends Component {

    state={
        username: "",
        password: ""
    }
    componentWillMount(){
        if(this.props.valid){
            this.props.navigation.navigate("start");
        }
    }

    login = async ()=>{
        let username = this.state.username
        let password = this.state.password;

        await this.props.loginWithPassword(username,password);
        if(this.props.valid){
            console.log("Login complete");
            this.props.navigation.navigate("start");
        }
    }

    render() {
        return(
            <View style={{ flex :1, alignItems: 'center', padding: 10, marginTop: 20 }}>
                <Text style={{fontSize: 24, fontWeight:'100', marginBottom: 10}}>Login</Text>
                <TextInput ref='username'
                 style={[styles.input, { marginBottom: 10}]} 
                 placeholder="UserName" textContentType='username'
                 value={this.state.username}
                 onChangeText={(text)=>this.setState({username: text})}/>
                <TextInput
                 ref = 'password'
                 style={[styles.input, { marginBottom: 10}]}
                 placeholder="Password" textContentType='password'
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(text)=>this.setState({password: text})}/>
                <Button
                    text={'Sign In'}
                    borderR = {8}
                    width={100}
                    disabled={false}
                    loading={this.props.loading}
                    background = {'#33FFBB'}
                    textColor = {'white'}
                    handleOnPress = {()=>{this.login()}}

                />
            </View>
        );
    }
}

const mapStateToProps = ({ ui, cred }) => ({ loading : ui.loading, valid: ui.valid_password });

const mapDispatchToProps = dispatch =>{
    return{
        loginWithPassword: async (username,password) => {await dispatch(loginTo(username,password))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
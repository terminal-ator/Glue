import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Button from '../components/button';
import {connect} from 'react-redux';
import { startDay } from '../actions';

class DayStart extends Component {

    static navigationOptions = {
        header : null
    }
    componentWillMount(){
        if(this.props.uiProps.sync_completed){
            console.log("Navigating")
            this.props.navigation.navigate("accounts");
            this.props.navigation.navigate("main");
        }
    }

    syncAndNavigate = async ()=>{
        await this.props.startDay();
        if(this.props.uiProps.sync_completed){
            console.log("Navigating")
            this.props.navigation.navigate("accounts");
            this.props.navigation.navigate("main");
        }
    }



    render() {
        const loading = this.props.uiProps.sync_started;
        return (
            <View style={style.container}>
                <Text style={style.heading}>Start Day for {this.props.uiProps.date.toString() } </Text>
                <Button loading={loading} disabled={false} handleOnPress={()=>this.syncAndNavigate()} text="Sync" background="#D41D7B" textColor={"white"} width={100} borderR={8} />
            </View>
        );
    }
}

const style = StyleSheet.create({
    container : {
        flex:1,
        alignContent: 'center',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        alignSelf : 'center',
        fontSize : 24,

    }

})

mapStateToProps = (state)=>{
    return{
        uiProps : state.ui
    }
}

mapDispatchToProps = dispatch => {
    return{
        startDay : async()=>{await dispatch(startDay())}
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(DayStart);
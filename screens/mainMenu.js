import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert  } from 'react-native';
import { connect } from 'react-redux';
import Button from '../components/button';
import { endDay } from '../actions';
class mainMenu extends Component {

    static navigationOptions = {
        header : null
    }

    showAlert = ()=>{
        Alert.alert(
            "Do you want to continue day end?",
            "This action is irreversible",
            [
                {text: "Day End", onPress:async ()=>{
                    console.log("You chose day end")
                    // perform day end
                    const Sdate = this.props.date;
                    const entries = this.props.entry;
                    await this.props.dayEnd(entries,Sdate);
                    if(this.props.day_end){
                        console.log(this.props.day_end)
                        console.log("Day End complete");
                        this.props.navigation.navigate("start");
                    }
                }},
                {text: "Cancel", onPress:()=>{console.log("Canceled it")}}
            ]
            
        )
    }
    
    render() {
        
        let cashSum = 0, chqSum = 0;
        this.props.entry.all.map((id)=>{
            const single = this.props.entry[id]
            if(single.type == 'cash'){
                cashSum += parseInt(single.amount)
            }else{
                chqSum+= parseInt(single.amount)
            }
        })
        return (
            <View style={mStyle.container}>
                <View style={mStyle.sumRow}>
                    <View style={[mStyle.banner, {backgroundColor: '#31D18C',}]} >
                        <Text style={{color: 'white', fontSize:12, fontWeight:"bold"}}>Cash: Rs.{cashSum}</Text>
                    </View>
                    <View style={[mStyle.banner, {backgroundColor: '#F2AC3E',}]}>
                        <Text style={{color: 'white',fontSize:12,fontWeight:"bold"}}>Cheque: Rs.{chqSum}</Text>
                    </View> 
                </View>
                <View style={{alignSelf: 'center'}}>
                    <Button 
                    disabled={false}
                    handleOnPress = {()=>this.props.navigation.navigate('account',{ details:"all" })}
                    text='Create New Entry'  width={400} loading={false} textWeight={'200'}
                    addStyle={{margin: 0}} height={80}
                    background='#D8D8D8' borderR={8} />
                    </View>
                    <View style={{alignSelf: 'center'}}>
                    <Button 
                    disabled={false}
                    handleOnPress = {()=>this.props.navigation.navigate('account',{ details: "filtered" })}
                    text='View/Edit' height={80}  width={400} loading={false} textWeight={'200'}
                    addStyle={{margin: 0}}
                    background='#D8D8D8' borderR={8} />
                    </View>
                    <View style={{alignSelf: 'center'}}>
                    <Button 
                    disabled={false}
                    handleOnPress = {()=>this.showAlert()}
                    text='Day End' height={80} textColor={"white"} width={400} loading={false} textWeight={'200'}
                    addStyle={{margin: 0}}
                    background='#E14A4A' borderR={8} />
                    </View>
            </View>
        );
    }
}

mapStateToProps = (state)=>{
    return{
        entry : state.entry,
        accounts: state.accounts,
        date : state.ui.date,
        day_end: state.ui.day_end,
    }
}

mapDispatchToProps = dispatch => {
    return {
        dayEnd: async (entries,date)=>{ await dispatch(endDay(entries,date))} 
    }
}

const mStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        alignContent:'space-between'
    },
    sumRow:{
        flexDirection: 'row',
        alignContent: 'space-around',
        justifyContent: 'center',
    },
    banner : {
        flex: 2,
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 20,
        paddingRight: 20,
        color: "white",

    }

})

export default connect(mapStateToProps, mapDispatchToProps)(mainMenu);



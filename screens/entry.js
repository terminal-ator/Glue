import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../components/search';
import Button from '../components/button';
import { connect } from 'react-redux';
import { createEntry } from '../actions'
class Entry extends Component{

    state = {
        selected : 'cash',
        amount : '',
        account : { name: 'Mittal Traders', id : '1'},
        comments: '',
    }

    changeType = (val)=>{
        this.setState({selected : val})
    }

    submit = ()=>{
        const entry = { account : this.state.account, packet: {amount: this.state.amount, comments: this.state.comments, type: this.state.selected}};
        this.props.addEntry(entry);
        this.props.navigation.pop();
    }

    componentWillMount(){
        let accountId = this.props.navigation.getParam('accountId');
        this.setState({ account : this.props.accounts[accountId]});
        if(this.props.entry[accountId]){
            this.setState({ amount : this.props.entry[accountId].amount,
            selected: this.props.entry[accountId].type,
            comments: this.props.entry[accountId].comments})
        }
    }


    render(){
        let { account } = this.state;
        let selectedType = this.state.selected;
        let selectedStyle = {
            background: '#7BD53E',
            textColor: 'white'
        }

        let notSelectedStyle ={
            background: '#D8D8D8'
        }
        var cashStyle, chqStyle;
        if(selectedType=='cash'){
            cashStyle=selectedStyle;
            chqStyle=notSelectedStyle;
        }else{
            cashStyle=notSelectedStyle;
            chqStyle=selectedStyle;
        }
        return(
            <View style={estyles.container}>
                <View style={ estyles.headCont}>
                <Text style={estyles.heading}>{account.name}</Text>
                </View>
                <TextInput 
                autoFocus={true}
                style={[styles.input,{marginTop:10}]} keyboardType='number-pad' placeholder="Enter amount"
                value={this.state.amount}
                onChangeText={(text)=>{this.setState({amount: text})}}
                ></TextInput>
                <TextInput
                    style={[styles.input,{ marginTop: 10 ,height: 150 }]}
                    placeholder="Comments"
                    value={this.state.comments}
                    onChangeText={(text)=>{this.setState({ comments: text })}}
                    multiline = {true}
                    numberOfLines = {10}
                />
                <View style={estyles.selectRow}> 
                    <Button 
                    disabled={false}
                    handleOnPress = {()=>this.changeType('cash')}
                    text='Cash' {...cashStyle} loading={false} textWeight={'200'} addStyle={{margin: 0}}/>
                    <Button  
                    disabled={false}
                    handleOnPress = {()=>this.changeType('chq')}
                    text='Cheque' {...chqStyle}  loading={false} textWeight={'200'} addStyle={{margin: 0}}/>
                </View>
                <Button
                 handleOnPress = {this.submit}
                 disabled={false}
                 text={'Submit'} 
                 background={'#4BB6C1'} 
                 textColor='white' 
                 borderR={8} 
                 textWeight={'200'}
                 loading={false}
                 addStyle={{alignSelf: 'center',}}/>
            </View>
        )
    }
}

const estyles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 10,
        alignContent: 'flex-start',
        marginTop: 10,
        width: '100%'
    },
    headCont:{
        flexDirection:'row',
        justifyContent:'flex-start',
        width: '100%'
    },
    heading: {
        fontSize: 24,
        fontWeight: '100',
        margin:10,
    },
    selectRow:{
        flexDirection: 'row',
        alignContent: 'space-around',
        justifyContent: 'center'
    }
    
})

const mapStateToProps = (state) => {
    return { 
        accounts : state.accounts,
        entry: state.entry
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        addEntry: (entry)=> {
            dispatch(createEntry(entry))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Entry);
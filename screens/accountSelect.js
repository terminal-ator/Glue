import React, { Component } from 'react';
import { View,Text, Picker, FlatList, TouchableOpacity} from 'react-native';
import Search from '../components/search';
import Item from '../components/item';
import { connect } from 'react-redux';

class ASelect extends Component{

    state = {
        filter : 'all'
    }

    static navigationOptions = ({navigation})=> {
        return{
            title: navigation.getParam('details')=='all'? 'Enter Transactions' : 'View/Edit Transactions'
        }
    }

    componentWillMount(){
        const typeOfView = this.props.navigation.getParam('details');
        let listOfVal ;
        if(typeOfView=='all'){
            listOfVal = this.props.accounts.all.map((id)=>{ return this.props.accounts[id]});
        }else{
            listOfVal = this.props.entry.all.map((id)=>{return this.props.accounts[id]});
        }
        this.setState( {trueNames : listOfVal })
        this.setState({ names : listOfVal })
        this.setState({ filteredNames: listOfVal })
    }

    resetFilterToName =  async () =>{
        this.setState({filteredNames : this.state.names});
    }
    
    filterBasedOnRoute = async (routeName)=>{
        console.log("Route Selected", routeName)
        this.setState({ filter : routeName})
        if(routeName=="all"){
            await this.setState({ names : this.state.trueNames});
            console.log(this.state.trueNames);
            await this.resetFilterToName();
        }else{
            const filteredName = this.state.trueNames.filter((item)=>{
                return item.route.toLowerCase() === routeName.toLowerCase()
            })
            await this.setState( { names : filteredName});
            await this.resetFilterToName();
        }
    }

    filterList = (sample)=>{
        const newList = this.state.names.filter((party)=>{
            if(party.name){
                let partyName = party.name.toLowerCase()
                return partyName.indexOf(sample.toLowerCase())!== -1
            }
        })

        this.setState({ filteredNames : newList });
    }

    navigateToDetails = (id) => {
        this.props.navigation.navigate('entry',{ accountId : id})
    }
    
    render(){
        return(
            <View style={{flex:1}} style={{marginTop: 20}}>
            <Picker selectedValue={this.state.filter} onValueChange={(val,index)=>this.filterBasedOnRoute(val)}>
            <Picker.Item label="All" value="all"/>
            <Picker.Item label="Monday" value="mon" />
            <Picker.Item label="Tuesday" value="tue"/>
            <Picker.Item label="Wednesday" value="wed"/>
            <Picker.Item label="Thursday" value="thu"/>
            <Picker.Item label="Friday" value="fri" />
            <Picker.Item label="Saturday" value="sat"/>
            <Picker.Item label="Sunday" value="sun" />
            </Picker>
            <Search filter = {this.filterList} />
            <View style={{maxHeight: 500 }}>
            <FlatList data={this.state.filteredNames} 
            renderItem={({item})=>
            <TouchableOpacity onPress={()=>this.navigateToDetails(item.id)}  >
            <Item item={item}/>
            </TouchableOpacity>
            } 
            keyExtractor={(item,index)=>''+item.id}
            style={{marginTop: 20}}/>
            </View>
            </View>
            )
        }
    }

    const mapStateToProps = (state) =>{
        return {
            accounts : state.accounts,
            entry : state.entry
        }
    }

export default connect(mapStateToProps,null)(ASelect);
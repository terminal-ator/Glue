import React,{Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { connect } from 'react-redux';

 class Item extends Component{

    render(){

        const { item } = this.props;
        let inputedStyles = {};
        let displayAmount = null;
        let bgcolor;
        if(this.props.entry && this.props.entry[item.id] && this.props.entry[item.id].amount!=0){
            // console.log("Entry found")
            if(this.props.entry[item.id].type=="cash") bgcolor = "#7BD53E";
            else bgcolor = "#3EF2E1";
            displayAmount = this.props.entry[item.id].amount;
            inputedStyles = {
                backgroundColor: bgcolor,
                color: 'white'
            }
        }
        return(
        <View style={[styles.container,inputedStyles]}>
            <Text style={styles.mainText}>{item.name}</Text>
            <Text style={styles.routeText}>{item.route}</Text>
            {displayAmount?<Text style={styles.amountText}>Rs.{displayAmount}</Text>:null}
        </View>)
    }
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        justifyContent: 'flex-start',
        padding: 10,
        flexDirection: 'row',
        fontSize: 24,
        borderBottomWidth: 1,
        borderColor: "#CAC7C7",
        alignContent: 'space-between',

    },
    mainText : {
        fontWeight : '200',
        fontSize: 12
    },
    routeText : {
        fontSize: 10,
        fontWeight: '100',
        alignSelf: 'center',
        color: '#838383',
        marginLeft: 10
    },
    amountText: {
        fontSize: 10,
        marginLeft: 'auto',
        alignSelf: 'center'

    }

})

const mapStateToProps = (state)=>{
    return{
        entry : state.entry
    }
}
export default connect(mapStateToProps,null)(Item);
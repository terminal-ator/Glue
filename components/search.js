import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet  } from 'react-native';

export default class Search extends Component{

    outFilter= (text)=>{
        this.props.filter(text);
    }
    
    render(){
        return (
            <View style={styles.container}>
                <TextInput onChangeText={(text)=>this.outFilter(text)} style={styles.input} placeholder="Enter a name"/>
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    input: {
        backgroundColor : '#F9F8F8',
        height: 53,
        width: '90%',
        padding: 10,
        alignSelf: 'center',
    }
})
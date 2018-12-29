import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropType from 'prop-types';

export default class Button extends Component {
    render() {
        const {
            loading,
            disabled,
            text,
            textColor,
            background,
            handleOnPress,
            textSize,
            textWeight,
            textAlign,
            borderColor,
            height,
            width,
            borderR,
            style
        } = this.props;
        const backgroundColor = background || 'transparent';
        const color = textColor || 'black';
        const fontSize = textSize || 16;
        const fontWeight = textWeight || '600';
        const alignPosition = textAlign || 'center';
        const border = borderColor || 'white';
        const opacityStyle = disabled || loading ? 0.5:1;
        const borderRadius = borderR || 0;
        const textOpaciy = loading ? 1 : 1;
        const addStyle = style || {}
        return (
            <TouchableOpacity
            style={[{opacity : opacityStyle, backgroundColor, borderColor: border, borderRadius,height,width,justifyContent:'center'},styles.wrapper, addStyle]}
            onPress={handleOnPress}
            activeOpacity={0.7}
            disabled={loading}
            >
            <View>
                {loading?
                <View style={{alignSelf: 'center'}}>
                    {/* <Image 
                    source={require('../../assets/images/whiteLoader.gif')}
                    style={{height: 40, width: 40,alignSelf:'center'}}
                    /> */}
                </View>:<Text
            style={[{color, fontSize, fontWeight, textAlign:alignPosition}]}
            >{text}</Text>
                }
            
            </View>
            </TouchableOpacity>
        );
    }
}

Button.propTypes = {
    text : PropType.string.isRequired,
    loading : PropType.bool.isRequired,
    disabled : PropType.bool.isRequired,
    textColor: PropType.string,
    background : PropType.string,
    handleOnPress : PropType.func.isRequired,
    textSize : PropType.number,
    textWeight: PropType.string,
    textAlign: PropType.string,
    borderColor: PropType.string,
    height: PropType.number,
    width: PropType.number,
    borderR: PropType.number
}

const styles = StyleSheet.create({
    wrapper : {
        display: 'flex',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 12,
        paddingTop: 12,
        marginTop: 10,
        marginBottom: 10,
    },
})


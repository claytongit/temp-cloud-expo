import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { Condition } from '../../utils/condition';

export default function Forcast( { data } ){

    let icon = Condition(data.codition);

    return(
        <View style={ styles.container }>

            <View style={ styles.weekday }>

                <Text style={{ fontWeight: 'bold' }}>{ data.weekday }</Text>
            
                <Text style={ styles.date } >{ data.date }</Text>

            </View>

            <Ionicons name={ icon.name } color={ icon.color } size={25} />

            <View style={ styles.temp }>

                <Text>{ data.min }°</Text>

                <Text style={{ fontSize: 18, fontWeight: 'bold' }} >{ data.max }°</Text>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        marginLeft: 12,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    weekday: {
        alignItems: 'center'
    },
    date: {
        marginTop: 10,
        marginLeft: 10,
    },
    temp: {
        alignItems: 'center',

    }
});
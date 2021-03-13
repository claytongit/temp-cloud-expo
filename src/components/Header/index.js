import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';

export default function Header({ background, weather, icon }){
    return(
        <LinearGradient 
            style={ styles.container } 
            colors={ background }
        >

            <Text style={ styles.date } >{ weather.results.date }</Text>

            <Text style={ styles.city } >{ weather.results.city }</Text>

            <Ionicons 
                name={icon.name}
                size={150}
                color={icon.color}
            />

            <Text style={ styles.temp }>{ weather.results.temp }°</Text>

        </LinearGradient>
    );
}

const styles =StyleSheet.create({
    container: {
        width: '95%',
        height: '55%',

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },

    date: {
        color: '#FFF',
        fontSize: 17,
    },

    city: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },

    temp: {
        color: '#FFF',
        fontSize: 80,
    }
})
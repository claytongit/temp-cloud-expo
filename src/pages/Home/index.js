import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, StyleSheet, FlatList } from 'react-native';
import * as Location from 'expo-location';
import api, { key } from '../../services/api';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Conditions from '../../components/Conditions';
import Forcast from '../../components/Forcast';

export default function Home(){

    const [ erroMsg, setErrorMsg ] = useState(null);

    const [ loading, setLoading ] = useState(true);

    const [ weather, setWeather ] = useState([]);

    const [ icon, setIcon ] = useState({ name: 'cloud', color: '#FFF' });
    
    const [ background, setBackground ] = useState([ '#1ed6ff', '#97c1ff' ]);

    useEffect(() => {

        (async () => {

            let { status } = await Location.requestPermissionsAsync();

            if (status != 'granted'){

                setErrorMsg('Permissao negada para acessar localização.');

                setLoading(false);

                return;

            }

            let location = await Location.getCurrentPositionAsync({});

            const long = location.coords.longitude;

            const lat = location.coords.latitude;

            const response = await api.get(`/weather?key=${key}&lat=${lat}&lon=${long}`);

            setWeather(response.data);

            if(response.data.results.currently === 'noite'){
                setBackground([ '#0c3741', '#0f2f61' ]);
            }

            switch (response.data.results.condition_slug) {
                case 'clear_day':
                    setIcon({ name: 'partly-sunny', color: '#FFB300' });
                    break;

                case 'rain':
                    setIcon({ name: 'rainy', color: '#FFF' });
                    break;

                case 'storm':
                    setIcon({ name: 'rainy', color: '#FFF' });
                    break;           
                
            }

            setLoading(false);

        })();

    }, []);

    if(loading){
        return(
            <View style={ styles.container }>
                <Text>Aguarde...</Text>
            </View>
        );
    }

    return(
        <SafeAreaView style={ styles.container }>

            <Menu />

            <Header background={background}  weather={weather} icon={icon} />

            <Conditions weather={weather} />

            <FlatList 
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={ { paddingVertical: '10%', marginRight: '5%' } }
                style={ styles.list }
                data={ weather.results.forecast }
                keyExtractor={ item => item.date }
                renderItem={ ({ item }) => <Forcast data={ item }/> }
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8F0FF',
        paddingTop: '5%',
    },

    list: {
        marginTop: 10,
        marginLeft: 10,
    }
});
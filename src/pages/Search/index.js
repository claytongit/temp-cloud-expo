import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import Conditions from '../../components/Conditions';
import api, { key } from '../../services/api';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Search(){

    const navigation = useNavigation();
    const [ texto, setTexto ] = useState('');
    const [ city, setCity ] = useState(null);
    const [ erro, setErro ] = useState(null);


    async function handleSearch(){

        const response = await api.get(`/weather?key=${key}&city_name=${texto}`);

        if(response.data.by == 'default'){
            setErro('Huumm, cidade não encontrada');
            setTexto('');
            setCity(null);
            Keyboard.dismiss();
            return;
        }
        

        setCity(response.data);
        setTexto('');
        Keyboard.dismiss();

    }

    if(city){
        return(
            <SafeAreaView style={styles.container} >

                <TouchableOpacity style={ styles.backButton } onPress={ () => navigation.navigate('Home') } >
                    <Feather name="chevron-left" size={32} color="#000" />
                    <Text style={{ fontSize: 22 }} >Voltar</Text>
                </TouchableOpacity>

                <View style={ styles.search } >

                    <TextInput 
                        value={texto}
                        onChangeText={ text => setTexto(text) }
                        placeholder="Ex: São Paulo, SP"
                        style={ styles.input }
                    />

                    <TouchableOpacity style={ styles.icon } onPress={ handleSearch } >
                        <Feather name="search" size={22} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <LinearGradient 
                    style={ styles.header } 
                    colors={ ['#1ED6FF', '#97C1FF'] }
                >

                    <Text style={ styles.date } >{ city.results.date }</Text>
                    <Text style={ styles.city } >{ city.results.city_name }</Text>
                    
                    <View>
                        <Text style={ styles.temp } >{ city.results.temp }°</Text>
                    </View>

                    <Conditions weather={city} />

                </LinearGradient>


            </SafeAreaView>
        );
    }

    return(
        <SafeAreaView style={ styles.container }>
            
            <TouchableOpacity style={ styles.backButton } onPress={ () => navigation.navigate('Home') } >
                <Feather name="chevron-left" size={32} color="#000" />
                <Text style={{ fontSize: 22 }} >Voltar</Text>
            </TouchableOpacity>

            <View style={ styles.search } >
                <TextInput 
                    value={texto}
                    onChangeText={ text => setTexto(text) }
                    placeholder="Ex: São Paulo, SP"
                    style={ styles.input }
                />
                <TouchableOpacity style={ styles.icon } onPress={ handleSearch } >
                    <Feather name="search" size={22} color="#FFF" />
                </TouchableOpacity>
            </View>

            { erro && <Text style={{ marginTop: 25, fontSize: 18 }} >{ erro }</Text> }

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '10%',
        backgroundColor: '#E8F0FF'
    },

    backButton: {
        flexDirection: 'row',
        marginLeft: 15,
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginBottom: 30,
    },

    search: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#DDD',
        width: '90%',
        height: 50,
        borderRadius: 8,
    },

    input: {
        width: '85%',
        height: 50,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        padding: 7
    },

    icon: {
        width: '15%',
        backgroundColor: '#1ED6FF',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },

    header: {
        marginTop: '5%',
        width: '90%',
        paddingTop: '5%',
        paddingBottom: '5%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8
    },

    date: {
        color: '#FFF',
        fontSize: 16
    },

    city: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    },

    temp: {
        color: '#FFF',
        fontSize: 90,
        fontWeight: 'bold'
    }

})
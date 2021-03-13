import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppIntroSlider from 'react-native-app-intro-slider';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import ImgBlue from '../../../assets/splash.png';

const slides = [
    {
      key: '1',
      title: 'Previsão em tempo real',
      text: 'Acompanhe em tempo real a previsão do tempo na sua cidade.',
      image: require('../../assets/slider/1.png'),
    },
    {
      key: '2',
      title: 'Acompanhe os próximos dias',
      text: 'Vejá detalhes do tempo e qual vai ser a previsão para os próximos dias na sua cidade.',
      image: require('../../assets/slider/2.png'),
    },
    {
      key: '3',
      title: 'Pesquise por cidade',
      text: 'Vejá como está o tempo de outras cidades.',
      image: require('../../assets/slider/3.png'),
    }
];

export default function Slider(){

    const navigation = useNavigation();

    const [ slider, setSlider ] = useState(false);

    async function handleSetAsync(){

        await AsyncStorage.setItem('@slider', 'OK');

        setSlider(true);

        navigation.navigate('Home');

    }

    useEffect(() => {

        (async () => {
            const value = await AsyncStorage.getItem('@slider');

            if(value != null){

                setSlider(true);

                navigation.navigate('Home');

            }else{

                setSlider(false);

            }

        })();

    }, []);

    function renderSlides({ item }){
        return(
            <LinearGradient 
                style={{ 
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: '5%'
                }}
                colors={ ['#1ED6FF', '#97C1FF'] }
            >

                <Image 
                    style={{ 
                    resizeMode: 'cover',
                    height: '60%', 
                    width: '100%'
                    }} 
                    source={item.image} 
                />

                <Text 
                    style={{
                    paddingBottom: 10,
                    fontSize: 27,
                    color: "#FFF",
                    fontWeight: 'bold'
                    }}>{item.title}</Text>     

                <Text style={{
                    color: '#FFF',
                    textAlign: 'center',
                }}>{item.text}</Text>

            </LinearGradient>
        );
    }

    if(!slider){

        return(
            <AppIntroSlider 
                renderItem={ renderSlides }
                data={ slides }
                activeDotStyle={{
                    backgroundColor: '#FFF',
                    width: 30
                }}
                renderNextButton={ () => <Text style={{
                    color: '#FFF',
                    fontWeight: 'bold',
                    backgroundColor: '#5642eb',
                    paddingHorizontal: 15,
                    paddingVertical: 7,
                    borderRadius: 8,
                }} >Proximo</Text> }
                renderDoneButton={ () => <TouchableOpacity onPress={ handleSetAsync }   
            >
                <Text style={{
                    color: '#FFF',
                    fontWeight: 'bold',
                    backgroundColor: '#42eb64',
                    paddingHorizontal: 15,
                    paddingVertical: 7,
                    borderRadius: 8,
                }}>Acessar</Text></TouchableOpacity> }
            />
        );

    }else{
        return(
            <View>
                <Image style={{ width: '100%', height: '100%' }} source={ImgBlue} />
            </View>
        )
    }

}
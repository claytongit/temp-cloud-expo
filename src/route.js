import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './pages/Home';
import Search from './pages/Search';
import Slider from './pages/Slider';

const Drawer = createDrawerNavigator();

export default function Routes(){
    return(
        <Drawer.Navigator>

            <Drawer.Screen 
                name="Slider"
                component={ Slider }
                navigationOption
                options={{
                    drawerLabel: () => null,
                    title: null,
                    drawerIcon: () => null,
                    swipeEnabled: false
                }}
            />

            <Drawer.Screen             
                name="Home" 
                component={ Home }   
                options={{
                    title: 'Minha Cidade'
                }}          
            />

            <Drawer.Screen 
                name="Search"
                component={ Search }
                options={{
                    title: 'Procurar'
                }}
            />

        </Drawer.Navigator>
    );
}
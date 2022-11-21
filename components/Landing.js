import { StyleSheet, Text, View,Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Profile from './Profile';
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const Testing = () =>{
    return(
        <View><Text>hdhd</Text></View>
    )
    
}
const Landing = ({navigation, route}) =>{
    
    console.log('here',route.name)
    return(
        <>
  
<Tab.Navigator>
      <Tab.Screen name="Home" component={Home} 
       options={{
        headerShown:false,
       
        tabBarIcon: ({ color, size }) => (
          <Entypo name="home" size={24} color={color} />
        ),
      }} />
      <Tab.Screen name="profile" component={Profile}
       options={{
        headerShown:false,
      
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
        ),
      }} />
  </Tab.Navigator>

        </>
    )
}

export default Landing;


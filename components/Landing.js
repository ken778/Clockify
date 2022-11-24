import { StyleSheet, Text, View,Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Profile from './Profile';

import { auth, db } from '../Config/Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const named = 'kekekekekeke'
const Testing = () =>{
   
  alert('pressed')
    
}
const Landing = ({navigation, route}) =>{

    const [userInfo, setInfo] = useState({})


    useEffect(()=>{
     
        //getting current logged user
        const user = auth.currentUser;
         console.log(auth.currentUser.uid)
        const getUserData = async() =>{
          const userRef = collection(db,'users')
          const q = query(collection(db,'users'), where('userId', '==', user.uid))
          const data = await getDocs(q);
          console.log(data)
          data.forEach((results)=>{ 
            console.log('user',results.data())
            setInfo(results.data())
          })        
    
    
        }
    
        getUserData()
       
      },[])
    
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
      <Tab.Screen  name="profile" children={()=><Profile  userInfo={userInfo} />}
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


import { View,Text,ScrollView,KeyboardAvoidingView,ActivityIndicator } from 'react-native'
import React,{useState} from 'react'
import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ClockInInformation = () =>{
    return(
        <>
         
           <View>
           
              <View style={styles.headers}>
                   <Text style={styles.headerText}>
                        date
                   </Text>
                   <Text  style={styles.headerText}>
                        Time in
                   </Text>
                   
              </View>
             
              
              {/* <View style={styles.details}>
                   <Text style={styles.info}>
                        date
                   </Text>
                   <Text  style={styles.info}>
                   <MaterialCommunityIcons name="arrow-bottom-right" size={13} color="green" />Time in
                   </Text>
                   
              </View> */}
             <ScrollView>
           

             
              <View  style={styles.details}>
                 <Text>thur 12 2022{'                       '}<MaterialCommunityIcons name="arrow-bottom-right" size={13} color="green" />09:10</Text>
              </View>
    
              <View  style={styles.details}>
                 <Text>mon 12 2022{'                       '}<MaterialCommunityIcons name="arrow-bottom-right" size={13} color="green" />09:10</Text>
              </View>
              <View  style={styles.details}>
                 <Text>mon 12 2022{'                       '}<MaterialCommunityIcons name="arrow-bottom-right" size={13} color="green" />09:10</Text>
              </View>
              <View  style={styles.details}>
                 <Text>mon 12 2022{'                       '}<MaterialCommunityIcons name="arrow-bottom-right" size={13} color="green" />09:10</Text>
              </View>
              <View  style={styles.details}>
                 <Text>mon 12 2022{'                       '}<MaterialCommunityIcons name="arrow-bottom-right" size={13} color="green" />09:10</Text>
              </View>
              <View  style={styles.details}>
                 <Text>mon 12 2022{'                       '}<MaterialCommunityIcons name="arrow-bottom-right" size={13} color="green" />09:10</Text>
              </View>
              <View  style={styles.details}>
                 <Text>mon 12 2022{'                       '}<MaterialCommunityIcons name="arrow-bottom-right" size={13} color="green" />09:10</Text>
              </View>
              <View  style={styles.details}>
                 <Text>mon 12 2022{'                       '}<MaterialCommunityIcons name="arrow-bottom-right" size={13} color="green" />09:10</Text>
              </View>
              <View  style={styles.details}>
                 <Text>mon 12 2022{'                       '}<MaterialCommunityIcons name="arrow-bottom-right" size={13} color="green" />09:10</Text>
              </View>
              <View  style={styles.details}>
                 <Text>mon 12 2022{'                       '}<MaterialCommunityIcons name="arrow-bottom-right" size={13} color="green" />09:10</Text>
              </View>
              <View  style={styles.details}>
                 <Text>mon 12 2022{'                       '}<MaterialCommunityIcons name="arrow-bottom-right" size={13} color="green" />09:10</Text>
              </View>
             
             </ScrollView>
             
            
              
             
              
           </View>
          
         
        </>
    )
}

export default ClockInInformation;

const styles = StyleSheet.create({
    headers:{
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-around',
       marginTop:10,
       borderBottomWidth:2,
       borderBottomColor:'black',
       width: windowWidth*0.9,
       alignSelf:'center',
    },
    details:{
       
        borderBottomWidth:1,
       borderBottomColor:'#d6d4d4',
       width: windowWidth*0.9,
       alignSelf:'center',
       marginTop:18
    },
    headerText:{
        fontSize:16
    }
}) 
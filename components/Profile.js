import { View, Text ,StyleSheet,Alert, Image, Pressable ,ScrollView} from 'react-native'
import React,{useState,useEffect} from 'react'
import { auth, db } from '../Config/Firebase';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { FontAwesome5 } from '@expo/vector-icons'; 
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';
import ClockInInformation from './ClockInInformation';


const profilePic = 'https://media.istockphoto.com/photos/headshot-portrait-of-smiling-male-employee-in-office-picture-id1309328823?b=1&k=20&m=1309328823&s=170667a&w=0&h=a-f8vR5TDFnkMY5poQXfQhDSnK1iImIfgVTVpFZi_KU='


function Profile({navigation}){
 
    const [activeTab, setActiveTab] = useState('clock-in')
    const [clockinselected, setclockinSelected] = useState(true)
    const [clockoutselected, setclockoutSelected] = useState(false)

 console.log({width:Dimensions.get('window').width,
 height:Dimensions.get('window').height

})

   //function to set clock in selected true
   function clockinSelected (){
    setclockinSelected(true)
    setclockoutSelected(false)
   
   }

   //function to set clock out selected true
   function clockoutSelected(){
    setclockinSelected(false)
    setclockoutSelected(true)
   
   }

   //logout function
    function logout(){
       auth.signOut().then(()=>{
          navigation.navigate('Login')
       })
    }
    console.log(activeTab)
    return(
        <>
         <View style={styles.profileBanner}>
            <Text style={styles.profileName}>Profile</Text>
         </View>
         <View style={styles.profileCard}>
           <View style={styles.profileContainer}>
            <View style={styles.buttons}>
                 <View><View  style={styles.logoutButton}><Text style={{color:'white'}}>Logout</Text></View></View>
                 <View><Text><FontAwesome5 name="user-edit" size={24} color="#4b97cb" /></Text></View>
            </View>
               <View>
               <Image
              style={{ width: 100, height: 100,  borderRadius:50, alignSelf:'center' }}
              source={{
                uri: profilePic,
              }}
            />
            <Text style={{alignSelf:'center', padding:10, fontSize:20, fontWeight:'bold'}}>Kenneth Chuenyana</Text>
           
               </View>
           </View>
           </View>
           <View style={styles.attendenceContainer}>
            <View style={styles.tabs}>
                <Pressable onPress={()=>{setActiveTab('clock-in'), clockinSelected()}}>
                    {
                        clockinselected ?   <View style={styles.selected}><Text style={{color:'white'}}>Clock in</Text></View> :   <View style={styles.unselected}><Text>Clockin</Text></View>
                    }
              
                </Pressable>
             <Pressable onPress={()=>{setActiveTab('clock-out'),clockoutSelected()}}>
             {
                        clockoutselected?   <View style={styles.selected}><Text style={{color:'white'}}>Clock out</Text></View> :   <View style={styles.unselected}><Text>Clock out</Text></View>
                    }
             </Pressable>
              
            </View>
            
            </View>
            <View>
                 {
                    activeTab ==='clock-in' ? 
                  
                       <ClockInInformation/>
                 
                    : <Text>clock out</Text> 
                 }
            </View>
        </>
    )
}



export default Profile;
const styles = StyleSheet.create({
    profileBanner:{
        backgroundColor:'#4b97cb',
        height:Dimensions.get('window').height * 0.3
    },
    profileName:{
      alignSelf:'center',
      padding:50,
      color:'white',
      fontSize:20
    },
    profileCard:{
        backgroundColor:'white',
        height:Dimensions.get('window').height *0.3,
        width:windowWidth* 0.9,
        alignSelf:'center',
        position:'absolute',
        top:100,
        borderRadius:15,
        elevation: 10,

    },
    profileContainer:{
    
    },
    buttons:{
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-between',
       padding:10
    },
    logoutButton:{
        backgroundColor:'#4b97cb',
       color:'white',
        height:35 ,
        padding:7,
        borderRadius:15
    },
    attendenceContainer:{
         marginTop:110
    },
    tabs:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:30
    },
    selected:{
          backgroundColor:'#4b97cb',
          padding:10,
          borderRadius:15
    },
    unselected:{
        backgroundColor:'white',
        padding:10,
        borderRadius:15
    }
    

})
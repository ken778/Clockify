import { View,Text,Modal,ScrollView,KeyboardAvoidingView,ActivityIndicator, Pressable, Alert, StyleSheet,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import { auth, db,storage } from '../Config/Firebase';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { FontAwesome5 } from '@expo/vector-icons'; 
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';
import ClockInInformation from './ClockInInformation';
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileModal from './ProfileModal';
import { FontAwesome } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { collection, getDocs, query, where } from 'firebase/firestore';

const profilePic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjYWb_kZ7jZ_aCJJdFjLqxS-DBaGsJGxopg&usqp=CAU'


function Profile({navigation,userInfo}){

 console.log('passed',userInfo)
    const [activeTab, setActiveTab] = useState('clock-in')
    const [clockinselected, setclockinSelected] = useState(true)
    const [clockoutselected, setclockoutSelected] = useState(false)
    const [imageUrl, setImage] = useState(
      ''
    );
   
 
    const [name, setName] = useState(userInfo.name)
    const [surname, setSurname] = useState(userInfo.surname)
    const [email, setEmail] = useState(userInfo.email)
    
    const [modalVisible, setModalVisible] = useState();

  //Picking image
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // const updateUser = async () => {
  //   setIsLoading(true);
  //   const storageRef = ref(
  //     storage,
  //     `/images/${Date.now()}imageUrl`
  //   );
  //   const response = await fetch(imageUrl);
  // const blob = await response.blob();

  // await uploadBytesResumable(storageRef, blob).then((uploadTask)=>{
  //   getDownloadURL(uploadTask.ref).then(async(url) => {
     
  //     console.log('the ul',url)
     
  // }).then(()=>{
  //   alert('done');
   
  // })
  // })
  // };

  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', imageUrl, true);
      xhr.send(null);
    })
    const ref = firebase.storage().ref().child(`Pictures/Image1`)
    const snapshot = ref.put(blob)
    snapshot.on(storage.TaskEvent.STATE_CHANGED,
      ()=>{
        setUploading(true)
      },
      (error) => {
        setUploading(false)
        console.log(error)
        blob.close()
        return 
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false)
          console.log("Download URL: ", url)
          setImage(url)
          blob.close()
          return url
        })
      }
      )
  }





  
  useEffect(()=>{
     
  //   //getting current logged user
  //   const user = auth.currentUser;
  //    console.log(auth.currentUser.uid)
  //   const getUserData = async() =>{
  //     const userRef = collection(db,'users')
  //     const q = query(collection(db,'users'), where('userId', '==', user.uid))
  //     const data = await getDocs(q);
  //     console.log(data)
  //     data.forEach((results)=>{ 
  //       console.log('user',results.data())
  //       setInfo(results.data())
  //     })        


  //   }

  //   getUserData()
      setImage(userInfo.imageUrl)
  
   },[])
      



     const openModal = () =>{
        setModalVisible(true)

     }
    console.log({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height

    })

    const clockOutIcon = <Feather name="arrow-up-right" size={13} color="red" />
    const clockOInIcon =  <MaterialCommunityIcons name="arrow-bottom-right" size={13} color="green" />
    const clock =[
        {
        date:'12 feb 2020',
        time:'09:00',
              icon: clockOInIcon
           },
           {
              date:'13 feb 2020',
              time:'09:00',
              icon: clockOInIcon
                 },
                 {
                    date:'14 feb 2020',
                    time:'09:00',
                    icon: clockOInIcon
                       },
                       {
                          date:'15 feb 2020',
                          time:'09:00',
                          icon: clockOInIcon
                             },
                             {
                                date:'16 feb 2020',
                                time:'09:00',
                                icon: clockOInIcon
                                   },
        
        
        
        ]
    const clockout =[
        
        {
        date:'12 feb 2020',
        time:'14:00',
        icon :clockOutIcon,
           },
           {
              date:'13 feb 2020',
              time:'14:00',
              icon :clockOutIcon,
                 },
                 {
                    date:'14 feb 2020',
                    time:'16:00',
                    icon :clockOutIcon,
                       },
                       {
                          date:'15 feb 2020',
                          time:'16:00',
                          icon :clockOutIcon,
                             },

                             {
                                date:'16 feb 2020',
                                time:'16:00',
                                icon :clockOutIcon,
                             }
                                   
                                
        
        
        
        ]

    const clockoutHeading = ['Date', 'Time out']
    const clockinHeading = ['Date', 'Time in']


    



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
           
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Pressable style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.closeButtonText}>close</Text>
                            </Pressable>
                     
                           
                           <View>
                               <View style={styles.profilePic}>
                                      <Image style={styles.picture}
                                       source={{
                                        uri:imageUrl
                                       }} 
                                      />
                                      <Pressable onPress={pickImage}>
                                      <FontAwesome style={styles.cameraIcon} name="camera" size={24} color="black" />
                                      </Pressable>
                        
                               </View>
                               
                           </View>
                           <Pressable onPress={uploadImage}>
                           <View><Text>update</Text></View>
                           </Pressable>
                           
                          



                        </View>
                    </View>


                </Modal>

            </View>

         <View style={styles.profileBanner}>
            <Text style={styles.profileName}>Profile</Text>
         </View>
         <View style={styles.profileCard}>
           <View style={styles.profileContainer}>
            <View style={styles.buttons}>
              <Pressable onPress={logout}>
              <View><View  style={styles.logoutButton}><Text style={{color:'white'}}>Logout</Text></View></View>                       
              </Pressable>
               
                 <Pressable  onPress={() => setModalVisible(true)}>
                 <View><Text><FontAwesome5 name="user-edit" size={24} color="#4b97cb" /></Text></View>
                 </Pressable>
                
            </View>
               <View>
               <Image
              style={{ width: 100, height: 100,  borderRadius:50, alignSelf:'center' }}
              source={{
                 uri:userInfo.imageUrl
              }}
            />
            <Text style={{alignSelf:'center', padding:10, fontSize:20, fontWeight:'bold'}}>{`${userInfo.name + ' ' + userInfo.surname  }`}</Text>
                 
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
                    activeTab ==='clock-in' && clock.length===0 ? <View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}><Text style={{fontSize:30, padding:50}}>No Data yet!</Text></View>  : activeTab ==='clock-in' && clock.length!=0 ? <ClockInInformation clock={clock}/> 
                  
                        : activeTab ==='clock-out' && clock.length===0 ? <View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}><Text style={{fontSize:30, padding:50}}>No Data yet!</Text></View> : activeTab ==='clock-out' && clock.length!=0 ?<ClockInInformation clock={clockout} clockoutHeading={clockoutHeading}/> :<View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}><Text style={{fontSize:30, padding:50}}>No Data yet!</Text></View> 
                 
                    
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
    },
    Modalheaders:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:30,
        borderBottomWidth:2,
        borderBottomColor:'black',
        width: windowWidth*0.9,
        alignSelf:'center',
     },
  modalView: {
       margin: 20,
       backgroundColor: "white",
       borderRadius: 20,
     
     
       shadowColor: "#000",
       shadowOffset: {
         width: 0,
         height: 2
       },
       shadowOpacity: 0.25,
       shadowRadius: 4,
       elevation: 5,
       height:windowHeight*0.8,
       width:windowWidth*0.9
     },
     button: {
       borderRadius: 20,
       padding: 10,
       elevation: 2
     },
 
     buttonClose: {
       backgroundColor: "#2196F3",
     },
     textStyle: {
       color: "white",
       fontWeight: "bold",
       textAlign: "center"
     },
     modalText: {
       marginBottom: 15,
       textAlign: "center"
     },
     closeButton:{
     
       backgroundColor:'white',
       width:'100%',
       padding:12,
       elevation:10
     },
 closeButtonText:{
    textAlign:'center',
    color:'#4b97cb',
    fontSize:20
 },
 profilePic:{
 width:150,
 height:150,

 alignSelf:'center',
 marginTop:19,
 borderRadius:76
 },
 picture:{
    width:150,
 height:150,
 borderRadius:76
 },
 cameraIcon:{
    color:'#4b97cb',
    marginLeft:110,
    marginTop:-20

 }

})
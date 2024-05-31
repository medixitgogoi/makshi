import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Icon1 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Icon4 from 'react-native-vector-icons/dist/MaterialCommunityIcons';


const Bar = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '##747c83'}}>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          bottom: 10,
          left: 4,
          padding:15,
          backgroundColor: '#000',
          borderRadius: 15,
          height: 57,
          width:"100%",
          
          flexDirection: 'row',
          justifyContent: "space-between",
          alignItems: 'center',
          shadowColor: '#272b2f',
          shadowOffset: {
            width: 0,
            height: 3.5,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        }}>

        <View style={{paddingBottom:5}} >
        <TouchableOpacity  onPress={() => navigation.navigate('Profile')}
         style={{}}
        >
          <Icon name="user-tie" 
        style={{height:40,width:50,fontSize:25,paddingHorizontal:12,paddingVertical:5
      }}
          />
          <Text style={{fontSize:9,paddingHorizontal:11}}>Profile</Text>     
        </TouchableOpacity> 
        </View>

        <View style={{paddingBottom:5}}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Icon1 name="format-list-text" 
          style={{height:40,width:50,fontSize:25,paddingHorizontal:12,paddingVertical:5}}
          />
          <Text style={{fontSize:9,paddingHorizontal:7}}>Dashboard</Text>    
        </TouchableOpacity>  
        </View>

        <View style={{paddingBottom:5}}>
        <TouchableOpacity
        style={{}}
         onPress={() => navigation.navigate('AddDoctorsForm')}
         >
          <Icon2 name="home"
          style={{height:40,width:50,fontSize:25,paddingHorizontal:12,paddingVertical:5}}
          />
          <Text style={{fontSize:9,paddingHorizontal:14}}>Home</Text>  
        </TouchableOpacity>
        </View>
         <View style={{paddingBottom:5}}>
         <TouchableOpacity
         style={{}}
          onPress={() => navigation.navigate('DoctorList')}
          >
           <Icon4 name="backburger"
           style={{height:40,width:50,fontSize:25,paddingHorizontal:12,paddingVertical:5}}
           />
           <Text style={{fontSize:9,paddingHorizontal:11,paddingTop:0,paddingBottom:2}}>Logout</Text>  
         </TouchableOpacity>
         </View>
      </View>
    </View>
  );
};

export default Bar;

const styles = StyleSheet.create({});

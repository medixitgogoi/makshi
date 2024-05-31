import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { AuthContext } from '../../navigation/StackNavigator';

const windowHeight = Dimensions.get('window').height - 75;

function FixedNavbar(props) {
    const navigation = useNavigation()
    // const { authContext, loginState, dispatch } = useContext(AuthContext);
    // const [auth, setAuth] = useState(loginState && loginState.user);

    const accountScreenHandler = () => {
        if (auth && auth !== null) {
            navigation.navigate('Account');
           
        }else {
            navigation.navigate('Login');
            
        }
    }
    const orderScreenHandler = () => {
        // if (auth && auth !== null) {
        //     navigation.navigate('OrderList');
            
        // }else{
        //     navigation.navigate('Login');
           
        // }
    }
    return (
        <View style={styles.listBlock}>
        
        </View>
  
    );
}
// deep cyan #0582CA
// light cyan #3FBEBF
export default FixedNavbar;
const styles = StyleSheet.create({
    listBlock : {flexDirection:'row',paddingVertical:8,backgroundColor:'#fff',position:'absolute',bottom: '.1%',zIndex:10,marginHorizontal:1,height:59 , alignItems : 'center'},
    listItem : {alignItems: 'center',width:'25%',},
    listImage : {alignSelf:'center'},
    listItemText : {color:'#0582CA',fontWeight:'500',letterSpacing:1.8,fontSize:13},
});    

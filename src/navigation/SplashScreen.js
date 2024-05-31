import { useEffect } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, SafeAreaView, } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient'

const SplashScreen = () => {

  useEffect(() => {
    setTimeout(() => { }, 150000);
  });

  return (
    <SafeAreaView>

      <StatusBar translucent backgroundColor="transparent" />

      <LinearGradient colors={['#004c4c', '#006666', '#008080', '#00b1b1', '#00c6c6']} style={{ height: '100%', alignItems: 'center', justifyContent: "center" }}>

        {/* <View>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={require('../assets/splash_11zon.jpg')}
          />
        </View> */}

        <View
          style={{
            position: 'absolute',
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}>
          <View style={{ borderColor: "#f5f5dc", borderRadius: 50, }}>
            <Image
              style={{ height: 110, width: 110 }}
              source={require('../assets/logo.png')}
            />
          </View>
          <View style={{ paddingTop: 7, alignItems: 'center', }}>
            <Text style={{ fontSize: responsiveFontSize(2.5), color: '#e1e1e1', textTransform: "uppercase", fontWeight: "500", }}>Welcome to Makshi</Text>
          </View>

          {/* <View style={{
          position: 'absolute',
          bottom: 35,
        }}>
          <Text style={{ fontSize: responsiveFontSize(3), color: '#fff', alignItems: 'center' }}>
            Welcome To Makshi
          </Text>
        </View> */}

        </View>
      </LinearGradient>

    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  backgroundImg: {
    width: 240,
    height: 80,
    alignSelf: 'center',
    top: '45%',
    borderRadius: 5,
  },
});

// import { StyleSheet, Text, View, StatusBar, Image } from 'react-native'
// import React, { useEffect } from 'react'
// import LinearGradient from 'react-native-linear-gradient'
// import { useNavigation } from '@react-navigation/native';
// import {
//   responsiveHeight,
//   responsiveWidth,
//   responsiveFontSize
// } from "react-native-responsive-dimensions";

// const Splashscreen = () => {

//   const navigation = useNavigation();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.navigate('HomePage');
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <View>

//       <StatusBar barStyle="light-content" hidden={false} backgroundColor="#777777" translucent={false} />

//       <LinearGradient colors={['#777777', '#696969', '#5c5c5c', '#515151', '#454545', '#393939', '#242424', '#000']} style={{ height: '100%', alignItems: 'center', justifyContent: "center" }}>
//         {/* <LinearGradient colors={['#777777', '#696969', '#575757', '#434343', '#393939', '#282828', '#202020', '#000']} style={{ height: '100%',alignItems:'center',justifyContent:"center" }}> */}
//         <View style={{}}>
//           <Image
//             source={require('../assets/p6.jpg')}
//             resizeMode="contain"
//             style={{
//               height: 100,
//               width: 100,
//               borderRadius: 80,
//             }}
//           />
//         </View>
//         <Text style={{ color: "#fff", fontSize: responsiveFontSize(2.4), fontWeight: "400", paddingTop: 11 }}>GYAN VIGYAN SAMITI ASSAM</Text>
//         {/* <View style={{position:"absolute",bottom:4}}>
//         <Text style={{fontSize: responsiveFontSize(1.6),fontWeight:"200",fontStyle:"italic"}}>Fueling Your Passion for Sports</Text>
//       </View> */}

//       </LinearGradient>
//     </View>
//   )
// }

// export default Splashscreen;

// const styles = StyleSheet.create({})
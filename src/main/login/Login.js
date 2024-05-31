import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../../navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = () => {
  
  const [data, setdata] = useState(true);
  const [number, setnumber] = useState('');
  const [password, setPassword] = useState('');
  const [Errnumber, setErrnumber] = useState(false);
  const [Errpassword, setErrPassword] = useState(false);
  const { authContext, loginState, dispatch } = useContext(AuthContext);
  const [load, setload] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      setload(true)
      const result = await axios
        .post(
          `/user/login/verify`,

          { mobile: number, password: password },
        )
        .then(res => {
          console.log(res, 'login data');

          if (res.data.data.status == 1) {
            AsyncStorage.setItem('user', JSON.stringify(res.data.data));
            dispatch({
              type: 'USER',
              user: res.data.data,
              token: res.data.data.api_token,
            });
          } else if (res.data.data.status == 2) {
            Alert.alert('ERROR ', "Your Account has been Disabled By Adminstrator please contact Adminstrator..")
            setload(false)
          }
          else {
            console.log('something wrong');
            setload(false)
            setErrnumber(res.data.error_message.mobile);
            setErrPassword(res.data.error_message.password);
          }
        });
      // console.log(result);
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        Alert.alert('NETWORK ERROR', "Please Turn On Your Internet")
      }

    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', position: 'relative' }}>

      <StatusBar
        animated={true}
        backgroundColor="#084039"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ height: windowHeight / 1.7 }}>
          <View style={{}}>
            <Image
              source={require('../../assets/login.png')}
              style={{
                height: 500,
                width: '100%',
              }}
              resizeMode="cover"
            />
          </View>

          {/* <View style={{ position: 'absolute', top: 12, left: 14 }}>
            <Image
              style={{ height: 67, width: 67 }}
              source={require('../../assets/logo.png')}
            />
          </View> */}
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            borderTopStartRadius: 60,
            borderTopEndRadius: 60,
            padding: 15,
            width: '100%',
            borderWidth: 0.55,
            borderColor: "green"
          }}>
          <View
            style={{
              borderColor: "green"
            }}
          >
            <View style={{ margin: 10, position: 'relative', flexDirection: 'column' }}>

              {
                load && load ?
                  <View style={{ height: '8%' }}>
                    <View style={{ alignItems: "center", flexDirection: "column", }}>
                      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                          <Text style={{ color: "#008080", fontSize: 15, alignItems: "center", justifyContent: "center" }}> Signing in please wait...</Text>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }} >
                          <ActivityIndicator
                            style={{ position: "absolute", top: 2 }}
                            size="large" color="#008080" animating={load} />
                        </View>
                      </View>

                    </View>
                  </View>
                  : ""
              }
              <View style={{ height: '85%' }}>
                <View style={{ flexDirection: 'column', margin: 10, marginTop: 10 }}>
                  <View>
                    <Text style={{ color: '#008080', fontSize: 15, fontWeight: '500' }}>
                      Phone Number
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderBottomWidth: 0.29,
                      borderBottomColor: '#000',
                    }}>
                    <View style={{}}>
                      <Icon1
                        name="mobile-phone"
                        style={{
                          color: '#008080',
                          fontSize: 23,
                        }}
                      />
                    </View>
                    <View>
                      <TextInput
                        placeholder="Enter Your Phone Number"
                        maxLength={10}
                        keyboardType="numeric"
                        value={number}
                        onChangeText={value => setnumber(value)}
                        placeholderTextColor="#008080"
                        style={{
                          padding: 5,
                          fontSize: 14,
                          color: '#008080',
                          fontWeight: '400',
                          paddingLeft: 8,
                          width: 250,
                        }}
                      />
                    </View>
                  </View>
                  {Errnumber ? (
                    <Text style={{ color: 'red', fontSize: 13, padding: 1 }}>
                      {Errnumber && Errnumber}
                    </Text>
                  ) : (
                    ''
                  )}
                </View>

                <View style={{ flexDirection: 'column', margin: 10, marginTop: 10 }}>
                  <View>
                    <Text style={{ color: '#008080', fontSize: 15, fontWeight: '500' }}>
                      Password
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderBottomWidth: 0.29,
                      borderBottomColor: '#000',
                    }}>
                    <View style={{}}>
                      <Icon2
                        name="locked"
                        style={{
                          color: '#008080',
                          fontSize: 16,
                        }}
                      />
                    </View>
                    <View>
                      <TextInput
                        placeholder="Enter Your Password"
                        value={password}
                        onChangeText={value => setPassword(value)}
                        placeholderTextColor="#008080"
                        secureTextEntry={data}
                        style={{
                          padding: 5,
                          fontSize: 14,
                          color: '#008080',
                          fontWeight: '400',
                          paddingLeft: 8,
                          width: 240,
                        }}
                      />
                    </View>

                    <View style={{ position: 'absolute', right: 5 }}>
                      <Icon
                        name={data ? 'eye' : 'eye-off'}
                        onPress={() => setdata(!data)}
                        style={{
                          color: '#008080',
                          fontSize: 13,
                          //  backgroundColor:"red",
                          width: 30,
                          height: 30,
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 8,
                        }}
                      />
                    </View>
                  </View>

                  {Errpassword ? (
                    <Text style={{ color: 'red', fontSize: 12 }}>
                      {Errpassword && Errpassword}
                    </Text>
                  ) : (
                    ''
                  )}
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    // onPress={()=>navigation.navigate("Dashboard")}
                    style={{
                      borderRadius: 20,
                      margin: 20,
                      padding: 10,
                      alignItems: 'center',
                      backgroundColor: '#008080',
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{
                        color: '#f5f5dc',
                        fontWeight: "600"
                      }}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
        </View>


      </ScrollView>
    </View>

  );
};

export default Login;

const styles = StyleSheet.create({
  flex: 1,
  paddingLeft: 15,
  paddingRight: 15,
  borderRadius: 5,
});

const style = StyleSheet.create({
  signUpButton: {
    margin: 1,
    width: 202,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#555658',
  },
});

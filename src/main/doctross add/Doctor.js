import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Button,
  Linking,
} from 'react-native';
import React, { useState } from 'react';
import Icon1 from 'react-native-vector-icons/dist/Ionicons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Doctor = () => {
  const [statusBarStyle, setStatusBarStyle] = useState();
  const navigation = useNavigation();

  const dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1234567890}';
    } else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e3e3e3' }}>
      <StatusBar
        animated={true}
        backgroundColor="#398337"
        barStyle={statusBarStyle} />

      <View style={{ width: '100%', height: 60, backgroundColor: '#398337' }}>
        <View style={{ margin: 10, flexDirection: 'row', paddingTop: 4 }}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ width: 23, height: 23 }}>
              <Icon3 name="chevron-back" style={{ fontSize: responsiveFontSize(3), color: "#f5f5dc" }} />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                color: '#fff',
                fontWeight: '400',
                // padding: 5,
                paddingTop: 8,
                fontWeight: '400',
              }}>
              Profile
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            width: '100%',
            height: 100,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              margin: 10,
              marginTop: 12,

            }}>
            <Image
              style={{ height: 80, width: 80, borderRadius: 50 }}
              source={require('../../assets/doctor.jpg')}
            />
            <View style={{ paddingTop: 10, paddingLeft: 8 }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: '800',
                  paddingLeft: 10,
                }}>
                Dr Anjan Bora
              </Text>
              <View style={{ paddingTop: 5, paddingLeft: 4 }}>
                <TouchableOpacity
                  disabled={true}
                  style={{
                    borderRadius: 20,
                    borderColor: '#fff',
                    borderWidth: 1,
                    alignItems: 'center',
                    backgroundColor: '#E3E3E4',

                  }}>
                  <Text
                    style={{
                      color: '#56575a',
                      fontSize: 14,
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                    }}>
                    pollabkumar1111@gmail.com
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity

            onPress={() => dialCall()}
            style={{ paddingTop: 22, paddingRight: 12 }}>
            <View
              style={{
                borderRadius: 30,
                borderWidth: 1,
                borderColor: '#398337',
                width: 35,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon1
                name="call"
                style={{
                  color: '#398337',
                  fontSize: 20,
                  borderRadius: 30,
                  alignItems: 'center',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 2 }}>
        <View style={{ margin: 15 }}>
          <View style={{ marginTop: 5 }}>
            <Text style={{ color: '#56575a', fontSize: 17 }}>Designation</Text>
            <Text style={{ color: '#000', fontSize: 13, marginTop: 5 }}>
              MBBS,MDRSS
            </Text>
          </View>
          <View style={{ marginTop: 23 }}>
            <Text style={{ color: '#56575a', fontSize: 17 }}>Gender</Text>
            <Text style={{ color: '#000', fontSize: 14, marginTop: 5 }}>
              Male
            </Text>
          </View>

          <View style={{ marginTop: 23 }}>
            <Text style={{ color: '#56575a', fontSize: 17 }}>Mobile Number</Text>
            <Text style={{ color: '#000', fontSize: 14, marginTop: 5 }}>
              8985896248
            </Text>
          </View>

          <View style={{ marginTop: 23 }}>
            <Text style={{ color: '#56575a', fontSize: 17 }}>Address</Text>
            <Text style={{ color: '#000', fontSize: 14, marginTop: 5 }}>
              Guwahati , Assam
            </Text>
          </View>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 9,
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
          }}>
          <View style={{ margin: 'auto' }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                borderRadius: 20,
                padding: 10,
                paddingHorizontal: 80,
                alignItems: 'center',
                backgroundColor: '#7AAA4B',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 17
                }}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Doctor;

const styles = StyleSheet.create({});

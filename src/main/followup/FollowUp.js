import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
  Linking,
  ActivityIndicator,
  TextInput,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon22 from 'react-native-vector-icons/dist/Ionicons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon3 from 'react-native-vector-icons/dist/Ionicons';
import axios from 'axios';

const FollowUp = () => {

  const [statusBarStyle, setStatusBarStyle] = useState();
  const [modal, setmodal] = useState(false);
  const navigation = useNavigation();
  const [load, setload] = useState(false);
  const [doctors, setdoctors] = useState();
  const [remark, setremark] = useState('');
  const [doctorid, setdoctorid] = useState('');
  const [datee, setdatee] = useState('');
  const [user, setuser] = useState('');

  const date = new Date();

  let currentDay = String(date.getDate()).padStart(2, '0');

  let currentMonth = String(date.getMonth() + 1).padStart(2, '0');

  let currentYear = date.getFullYear();

  // we will display the date as DD-MM-YYYY

  let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
  const mainn = async id => {
    console.log('sdhiusahdi');

    setdoctorid(id);
    setdatee(currentDate);
    setmodal(true);
  };

  const dialCall = mobile => {
    console.log(mobile);
    Linking.openURL(`tel:${mobile}`);
  };

  const getdoctor = async () => {
    try {
      setload(true);
      let mr = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser.api_token}`;
      const result = await axios
        .post(`/user/doctor/follow_up/list`, { user_id: modifiedUser.id })
        .then(res => {
          console.log('login data', res);

          setdoctors(res.data.data);
          setload(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sendData = async () => {
    try {
      setload(true);
      let mr = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      setuser(modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser.api_token}`;
      const result = await axios
        .post(`/user/doctor/follow_up`, {
          user_id: modifiedUser.id,
          doctor_id: doctorid && doctorid,
          date: datee,
          remarks: remark,
        })
        .then(res => {
          console.log('loginnnn data', res);
          setmodal(false);
          // setdoctors(res.data.data);
          setload(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdoctor();
  }, []);

  const EmptyListMessage = ({ item }) => {
    return (
      // Flat List Item
      <View style={{ paddingTop: "30%", }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: "center",
          }}>
          <Image
            style={{
              width: '60%', height: 150, alignItems: 'center',
              justifyContent: "center"
            }}
            source={require('../../assets/no-results.png')}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            margin: 10
          }}>
          <Text
            style={{ color: 'green', fontSize: 15, fontWeight: '200' }}
          >
            No Data Found
          </Text>
        </View>
      </View>
    );
  };

  // const handleesubmit=(id)=>{
  //   user()
  //   setdoctorid(id)
  //   setdatee(currentDate)
  //   // console.log(remark)
  //   setremark()
  //   setmodal(false)
  // }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar
        animated={true}
        backgroundColor="#398337"
        barStyle={statusBarStyle}
      />

      <View style={{ width: '100%', height: 60, backgroundColor: '#398337' }}>
        <View style={{ margin: 10, flexDirection: 'row', paddingTop: 3 }}>
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
                fontSize: 20,
                color: '#fff',
                fontWeight: '400',
                // padding: 5,
              }}>
              My Follow Up's
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: 12,
          marginTop: 4,
        }}>
        <View
          style={{
            backgroundColor: '#e6e6e9',

            flexDirection: 'row',
            width: '100%',
            borderColor: 'grey',
            padding: 7,
            paddingHorizontal: 10,
            borderRadius: 7,

            alignItems: 'center',
          }}>
          <View style={{}}>
            <Icon2
              style={{ color: '#515352', fontSize: 18 }}
              name="format-list-checkbox"
            />
          </View>
          <View style={{ marginHorizontal: 5 }}>
            <Text style={{ color: '#515352', fontSize: 17 }}>Todays visit</Text>
          </View>
        </View>
      </View>

      {load && load == true ? (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#7AAA4B" animating={load} />
        </View>
      ) : (
        <FlatList
          data={doctors?.length > 0 ? doctors : ''}
          ListEmptyComponent={EmptyListMessage}
          renderItem={({ item }) => (
            <View style={{ marginHorizontal: 13, marginTop: 3 }}>
              <View
                style={{
                  flexDirection: 'column',
                  borderRadius: 20,
                  backgroundColor: '#f1f1f1',
                  padding: 10,
                  backgroundColor: '#e6e6e9',
                  marginTop: 3,
                  paddingVertical: 15,
                }}>
                <View
                  style={{
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      color: 'grey',
                      color: '#56575a',
                      fontSize: 17,
                      paddingLeft: 4,
                      fontWeight: '500',
                    }}>
                    {item?.name}
                  </Text>
                  <Text
                    style={{
                      color: 'grey',
                      paddingTop: 5,
                      color: '#56575a',
                      fontSize: 15,
                      fontWeight: '400',
                    }}>
                    {' '}
                    {item?.email}
                  </Text>
                </View>

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    marginTop: 15,
                  }}>
                  <View
                    style={{
                      width: '50%',
                      backgroundColor: '#7AAA4B',
                      borderRadius: 20,
                    }}>
                    <TouchableOpacity
                      onPress={() => dialCall(item.mobile)}
                      activeOpacity={0.7}>
                      <Text
                        style={{
                          color: '#fff',
                          textAlign: 'center',
                          padding: 8,
                          borderRightColor: '#e6e6e9',
                          borderRightWidth: 1,
                          fontSize: 17,
                        }}>
                        Call Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: '50%',
                      backgroundColor: '#fff',
                      borderColor: '#7AAA4B',
                      borderWidth: 1,
                      borderRadius: 20,
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{ flexDirection: 'row' }}
                      onPress={() => mainn(item.doctor_id)}>
                      <Text
                        style={{
                          color: '#575454',
                          textAlign: 'center',
                          padding: 8,
                          fontSize: 17,
                        }}>
                        Follow
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}

      {modal ? (
        <Modal animationType="slide" transparent={true} visible={true}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 20,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 20,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                width: '100%',
                height: 'auto',
                paddingVertical: 30,
              }}>

              <View style={{ marginTop: 5 }}>
                <TextInput
                  placeholder="Remark"
                  placeholderTextColor="#808387"
                  multiline={true}
                  numberOfLines={1}
                  onChangeText={value => setremark(value)}
                  style={{
                    borderColor: '#378134',
                    borderWidth: 1,
                    borderRadius: 12,
                    paddingLeft: 15,
                    marginHorizontal: 8,
                    fontSize: 14,
                    color: 'grey',
                  }}
                />
              </View>

              <View
                style={{ width: '100%', flexDirection: 'row', paddingTop: 25 }}>
                <View
                  style={{
                    width: '50%',
                    backgroundColor: '#7AAA4B',
                    borderRadius: 20,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setmodal(false)}>
                    <Text
                      style={{
                        color: '#fff',
                        textAlign: 'center',
                        padding: 8,
                        borderRightColor: '#fff',
                        borderRightWidth: 1,
                        fontSize: 15,
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    width: '50%',
                    backgroundColor: '#fff',
                    borderColor: '#398337',
                    borderWidth: 1,
                    borderRadius: 20,
                    marginLeft: 3,
                  }}>
                  <TouchableOpacity style={{}} onPress={() => sendData()}>
                    <Text
                      style={{
                        color: '#398337',
                        textAlign: 'center',
                        padding: 8,
                        fontSize: 15,
                      }}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
        </Modal>
      ) : (
        ''
      )}
    </SafeAreaView>
  );
};

export default FollowUp;

const styles = StyleSheet.create({});
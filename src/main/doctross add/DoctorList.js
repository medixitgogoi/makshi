import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  FlatList,
  Modal,
  ActivityIndicator,
  Linking,
  RefreshControl
} from 'react-native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import React, { useEffect, useState } from 'react';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import Icon1 from 'react-native-vector-icons/dist/EvilIcons';
// import Search from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Doctor from 'react-native-vector-icons/dist/Fontisto';
import Email from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Location from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/Ionicons';

const DoctorList = () => {

  const [statusBarStyle, setStatusBarStyle] = useState();
  const navigation = useNavigation();
  const [modal, setmodal] = useState(false);
  const [load, setload] = useState(false);
  const [doctors, setdoctors] = useState();
  const [remark, setremark] = useState('');
  const [doctorid, setdoctorid] = useState('');
  const [search, setSearch] = useState('');
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [datee, setdatee] = useState('');
  const [user, setuser] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(200)); // Initial width

  const handleToggle = () => {

    const initialValue = expanded ? 300 : 200;
    const finalValue = expanded ? 200 : 300;

    setExpanded(!expanded);

    animation.setValue(initialValue);
    Animated.timing(animation, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
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
        .post("/user/doctor/list", { user_id: modifiedUser.id })
        .then(res => {
          console.log('doctor data', res);
          setdoctors(res.data.data);
          setMasterDataSource(res.data.data);
          setload(false);
        });
    } catch (error) {
      console.log(error);
    }
  };


  const searchFilterFunction = (text) => {
    // console.log("dixit", text);
    if (text) {
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setdoctors(newData);
      setSearch(text);
    } else {
      setdoctors(masterDataSource);
      setSearch(text);
    }
  };

  const sendData = async id => {
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
          console.log('send data', res);
          setmodal(false);
          setload(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdoctor();
  }, []);

  const onRefresh = () => {
    getdoctor()
  }

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
            marginTop: 5,
            flexDirection: "row",
            justifyContent: "center"
          }}>
          <Text style={{ color: '#008080', fontSize: 15, fontWeight: '400' }}>
            No results found for
          </Text>
          <Text style={{ color: '#008080', fontSize: 15, fontWeight: '700' }}>
            {""} "{search}"
          </Text>
        </View>
      </View>
    );
  };

  const followupdata = async id => {
    setdoctorid(id);
    setdatee(currentDate);
    setmodal(true);
  };

  const dialCall = mobile => {
    console.log(mobile);
    Linking.openURL(`tel:${mobile}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEAEA' }}>
      <StatusBar
        animated={true}
        backgroundColor="#008080"
        barStyle={statusBarStyle}
      />
      <View style={{ width: '100%', backgroundColor: '#008080', }}>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 6,
          }}>

          {/* header */}
          <View style={{
            flexDirection: 'row', alignItems: "center",
          }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ width: 23, height: 23 }}>
                <Icon3 name="chevron-back" style={{ fontSize: responsiveFontSize(3), color: "#f5f5dc" }} />
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: '#F5F5DC',
                  fontWeight: '600',
                  // padding: 5,
                  justifyContent: "center"
                }}>
                Doctor's Lists
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 6, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddDoctorsForm')}
              style={{
                borderTopRightRadius: 7,
                borderBottomRightRadius: 7,
                borderBottomLeftRadius: 30,
                borderTopLeftRadius: 30,
                paddingVertical: 5,
                paddingHorizontal: 4,
                backgroundColor: '#F5F5DC',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Icon name="plus" style={{ color: '#008080', fontSize: responsiveFontSize(2) }} />
              </View>
              <View >
                <Text
                  style={{
                    color: '#008080',
                    fontSize: responsiveFontSize(1.7),
                    fontWeight: '600',
                  }}>
                  Add Doctors
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Searchbar */}
      <View style={styles.searchContainer}>
        <Animated.View style={{ width: animation }}>
          {
            expanded && expanded ?
              <TextInput
                onChangeText={(text) => searchFilterFunction(text)}
                style={styles.input}
                placeholder="Search name here..."
                placeholderTextColor="#000"
                value={search}
              /> :
              <TouchableOpacity onPress={handleToggle} style={{ paddingHorizontal: 10, borderRadius: 50, backgroundColor: "#f5f5dc", elevation: 10, paddingVertical: 4, alignItems: "center" }}>
                <Text style={{ color: "#008080", fontWeight: '400', fontSize: responsiveFontSize(2), textAlign: "center", }}>
                  Search for doctor
                </Text>
              </TouchableOpacity>
          }
        </Animated.View>
        <TouchableOpacity onPress={handleToggle} style={styles.iconContainer}>
          <Icon name="search" style={{ fontSize: responsiveFontSize(2.5), }} />
        </TouchableOpacity>
      </View>

      {
        load && load == true ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#008080" animating={load} />
          </View>
        ) : (
          <FlatList
            data={doctors?.length > 0 ? doctors : ''}
            ListEmptyComponent={EmptyListMessage}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#008080']}
              />
            }
            renderItem={({ item }) => (
              <View style={{
                marginHorizontal: 10, marginBottom: 10,
              }}>
                <View
                  style={{
                    flexDirection: 'column',
                    borderRadius: 5,
                    backgroundColor: '#f5f5dc',
                    paddingBottom: 13,
                    elevation: 5,
                  }}>
                  <View>

                    {/* Name */}
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: "#008080",
                      padding: 5,
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      justifyContent: "center",
                      marginBottom: 5,
                    }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: "center",
                          flexDirection: 'row',
                        }}
                      >
                        <Doctor name="doctor"
                          style={{
                            fontSize: responsiveFontSize(1.7),
                            color: '#008080',
                            padding: 5,
                            backgroundColor: "#f5f5dc",
                            borderRadius: 100,
                          }}
                        />
                      </View>

                      <View style={{ paddingLeft: 2, }}>
                        <Text
                          style={{
                            color: '#f5f5dc',
                            fontSize: responsiveFontSize(2),
                            fontWeight: '600',
                          }}>
                          {' '}
                          {item?.name}
                        </Text>
                      </View>
                    </View>

                    {/* Email */}
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingTop: 6,
                        paddingHorizontal: 15,
                      }}
                    >
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: "center",
                          // marginBottom: 3,
                        }}
                      >

                        <Email
                          style={{
                            fontSize: responsiveFontSize(1.7),
                            color: '#f5f5dc',
                            padding: 5,
                            backgroundColor: "#008080",
                            borderRadius: 100,
                          }}
                          name="email-check-outline" />
                      </View>
                      <View style={{ paddingLeft: 2, }}>
                        <Text
                          style={{
                            color: '#008080',
                            fontSize: responsiveFontSize(2),
                            // fontWeight: '600',
                          }}>
                          {' '}
                          {item?.email}
                        </Text>
                      </View>
                    </View>

                    {/* Address */}
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingTop: 6,
                        alignItems: "center",
                        paddingHorizontal: 15,
                      }}
                    >
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: "center",

                        }}
                      >
                        <Location
                          style={{
                            fontSize: responsiveFontSize(1.7),
                            color: '#f5f5dc',
                            padding: 5,
                            backgroundColor: "#008080",
                            borderRadius: 100,
                          }}
                          name="md-location-sharp" />
                      </View>
                      <View style={{ paddingLeft: 2, }}>
                        <Text
                          style={{
                            color: '#008080',
                            fontSize: responsiveFontSize(2),
                          }}>
                          {' '}
                          Address address
                        </Text>
                      </View>
                    </View>

                  </View>

                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      marginTop: 12,
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 15,
                    }}>
                    <View
                      style={{
                        width: '48%',
                        backgroundColor: '#008080',
                        borderRadius: 50,
                        elevation: 7,
                      }}>
                      <TouchableOpacity
                        onPress={() => dialCall(item?.mobile)}
                        activeOpacity={0.7}>
                        <Text
                          style={{
                            color: '#f5f5dc',
                            textAlign: 'center',
                            padding: 7,
                            fontSize: responsiveFontSize(1.8),
                            fontWeight: "600"
                          }}>
                          Call Now
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('FollowupList', { data: item.doctor_id })}
                      style={{
                        width: '48%',
                        backgroundColor: '#008080',
                        borderRadius: 20,
                        alignItems: 'center',
                        elevation: 7,
                      }}>
                      <View
                        style={{ flexDirection: 'row' }}>
                        <Text
                          style={{
                            color: '#f5f5dc',
                            textAlign: 'center',
                            padding: 7,
                            fontSize: responsiveFontSize(1.8),
                            fontWeight: "600"
                          }}>
                          Follow
                        </Text>
                      </View>
                    </TouchableOpacity>

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

                    color: '#434240',
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
                        color: '#f5f5dc',
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

export default DoctorList;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    height: 48,
    // backgroundColor: "#000",
  },
  input: {
    paddingHorizontal: 15,
    borderRadius: 100,
    color: '#000',
    backgroundColor: "#f5f5dc",
    height: 35,
    fontSize: responsiveFontSize(1.7),
    paddingVertical: 10,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: "#008080",
    borderRadius: 100,
    width: 27,
    height: 27,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 3,
    fontWeight: "600"
  },
});

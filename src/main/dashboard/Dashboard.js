import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Linking,
  Platform,
  ScrollView,
  RefreshControl,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  TextInput,
  Alert,
  FlatList,
  ToastAndroid
} from 'react-native';
import { AuthContext } from '../../navigation/StackNavigator'
import React, { useEffect, useState, useContext } from 'react';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Remarkicon from 'react-native-vector-icons/dist/FontAwesome';
import Geocoder from 'react-native-geocoder';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import GetLocation, {
  Location,
  LocationError,
  LocationErrorCode,
} from 'react-native-get-location';
import HeaderOnly from '../../Other/Header';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Doctor from 'react-native-vector-icons/dist/Fontisto';
import Time from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Datee from 'react-native-vector-icons/dist/MaterialIcons';
const windowHeight = Dimensions.get('window').height;
import Locationo from 'react-native-vector-icons/dist/Ionicons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

const Dashboard = ({ route }) => {

  const [statusBarStyle, setStatusBarStyle] = useState();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [data, setdata] = useState('');
  const [data1, setdata1] = useState('');
  const [addres, setadd] = useState('');
  const [modal, setmodal] = useState(false);
  const [show, setshow] = useState(false);
  const navigation = useNavigation();
  const [listt, setlist] = useState('');
  const [sendlistt, setsendlistt] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [load, setload] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [remark, setremark] = useState("");
  const [received, setreceived] = useState();
  const [listdataid, setlistdataid] = useState('');
  const [Errorsenddata, setErrorsenddata] = useState(false);
  const [submitloader, setsubmitloader] = useState(false);

  const [textstate, settextstate] = useState({
    textShown: -1,
  });

  const toggleNumberOfLines = index => {
    settextstate({
      textShown: textstate.textShown === index ? -1 : index,
    });
  };

  const onRefresh = () => {
    todayListData()
  }

  const todayListData = async () => {
    try {
      setload(true);
      let mr = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser.api_token}`;
      const result = await axios
        .get('/user/doctor/follow_up/today/list')
        .then(res => {
          setlist(res.data.data);
          console.log('listdata', res);
          setload(false);
        });
    } catch (error) {
      console.log(error);
      logoutHandler()
      if (error.code === "ERR_NETWORK") {
        Alert.alert('NETWORK ERROR', "Please Turn On Your Internet")
      }

    }
  };

  const { authContext, loginState, dispatch } = useContext(AuthContext);

  const logoutHandler = () => {
    authContext.signOut();
  };

  const sendata = async () => {
    try {
      // setload(true); 
      todayListData();
      setmodal(false)
      let mr = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser.api_token}`;
      const result = await axios
        .post('/user/doctor/visit', {
          followUP_id: listdataid && listdataid,
          user_id: modifiedUser.id,
          doctor_id: received,
          location: selectedId && selectedId?.formattedAddress ? selectedId && selectedId?.formattedAddress : addres[0]?.formattedAddress,
          remarks: remark
        })
        .then(res => {
          setsubmitloader(true)
          setsendlistt(res.data.data);
          console.log('deshboard data', res);
          todayListData();
          if (res.data.error_code == true) {
            setErrorsenddata(res.data.error_message);
            setmodal(true);
            setsubmitloader(false)
          }
          else {
            setmodal(false)
            Toast()
            setremark("")
          }

        });
    } catch (error) {
      console.log(error);
    }
  };

  const clear = () => {
  }

  useEffect(() => {
    todayListData();

  }, []);

  const Toast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Data Submitted successfully !!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,

    );
  };

  //location
  const mainn = async (id, new_id) => {
    console.log('sdhiusahdi');
    todayListData();
    setErrorsenddata(false)
    setsubmitloader(false)
    setmodal(true);
    setshow(true);
    setlistdataid(new_id)
    setreceived(id)
    await getdata();
    lp()
  };

  const getdata = async () => {
    setLoading(true);
    setLocation(null);
    setError(null);
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
      rationale: {
        title: 'Location permission',
        message: 'The app needs the permission to request your location.',
        buttonPositive: 'Ok',
      },
    })
      .then(newLocation => {
        setLocation(newLocation);
        setdata1(newLocation.latitude);
        setdata(newLocation.longitude);
        get(newLocation);
        console.log(newLocation, 'location');
        setLoading(false);
        setshow(false);
      })
      .catch(ex => {
        Alert.alert('Alert Title', 'Turn on your Location', [
          {
            text: 'TURN ON',
            onPress: () =>
              Alert.alert(
                Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS'),
              ),
            style: 'cancel',
          },
        ]);
        return getCurrentPosition();

        setLoading(false);
        setLocation(null);
      });
  };

  function get(newLocation) {
    var NY = {
      lng: newLocation && newLocation.longitude,
      lat: newLocation && newLocation.latitude,
    };
    Geocoder.fallbackToGoogle('AIzaSyBvh5Kc_7DHsFpCj92HAKBq4F2C7J4IZEI');

    Geocoder.geocodePosition(NY)
      .then(res => {
        console.log('res  ppppllllll', res);

        var result1 = res.reduce((unique, o) => {
          if (
            !unique.some(
              obj =>
                obj.formattedAddress === o.formattedAddress &&
                obj.streetName === o.streetName,
            )
          ) {
            unique.push(o);
          }
          return unique;
        }, []);

        const ressult = result1.slice(0, 3);
        setadd(ressult);
      })
      .catch(err => console.log(err));
    console.log(addres && addres, 'check new address');
  }

  //contact
  const dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:1234567890';
    } else {
      phoneNumber = 'telprompt:1234567890';
    }

    Linking.openURL(phoneNumber);
  };

  const EmptyListMessage = ({ item }) => {
    return (
      // Flat List Item
      <View style={{ paddingTop: "30%", }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            style={{ width: '50%', height: 150 }}
            source={require('../../assets/no-results.png')}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            margin: 10
          }}>
          <Text style={{ color: '#008080', fontSize: 15, fontWeight: '400' }}>
            No Data Found
          </Text>
        </View>
      </View>
    );
  };

  function handleOnPress(name) {
    setSelectedId(name)
    console.log("nammmmeeeee", name.formattedAddress)
  }

  // console.log(listt && listt, 'addresaddres')

  return (
    <View style={{ flex: 1, backgroundColor: "#EAEAEA" }}>
      <StatusBar
        animated={true}
        backgroundColor="#008080"
        barStyle={statusBarStyle}
      />

      <HeaderOnly name="Dashboard" />

      <View style={{ marginHorizontal: 10, marginVertical: 10, }}>

        <View
          style={{
            backgroundColor: "#F5F5DC",
            flexDirection: 'row',
            width: '100%',
            borderColor: 'grey',
            padding: 7,
            borderRadius: 7,
            elevation: 10,
            alignItems: 'center',
            justifyContent: "space-between"
          }}>
          <View View style={{ flexDirection: 'row', alignItems: "center", }}>
            <View style={{ justifyContent: "center", alignItems: "center", }}>
              <Icon2
                style={{ color: '#515352', fontSize: 14 }}
                name="format-list-checkbox"
              />
            </View>
            <View style={{ marginHorizontal: 5, justifyContent: "center", alignItems: "center", }}>
              <Text style={{ color: '#515352', fontSize: responsiveFontSize(1.85), }}>FollowUp lists</Text>
            </View>
          </View>

          <View style={{}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TodayVisit')}
              style={{
                borderRadius: 7,
                justifyContent: "center",
                backgroundColor: "#008080",
                elevation: 3,
              }}>
              <Text style={{ color: '#fff', paddingHorizontal: 12, paddingVertical: 5, fontSize: responsiveFontSize(1.70), }}>View All Today's Visits</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {
        load && load == true ? (
          <View
            style={{
              marginVertical: "50%",
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 12, color: "#008080" }}>please wait</Text>
            <ActivityIndicator size="small" color="#008080" animating={load} />
          </View>
        ) : (
          <FlatList
            data={listt?.length > 0 ? listt : ''}
            ListEmptyComponent={EmptyListMessage}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#008080']}
              />
            }
            renderItem={({ item, index }) => (
              <View
                style={{
                  borderRadius: 5,
                  paddingBottom: 8,
                  backgroundColor: "#F5F5DC",
                  marginHorizontal: 10,
                  elevation: 5,
                  marginBottom: 8,
                }}>
                <View style={{ flexDirection: 'column', }}>

                  <View style={{ flexDirection: 'row', alignItems: "center", width: '100%', justifyContent: "center", backgroundColor: "#008080", padding: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, }}>
                    <View style={{ backgroundColor: "#f5f5dc", borderRadius: 100, width: 27, height: 27, justifyContent: "center", alignItems: "center" }}>
                      <Icon2
                        name="doctor"
                        style={{ fontSize: responsiveFontSize(2.3), color: "#008080" }}
                      />
                    </View>

                    <View style={{ marginLeft: 5 }}>
                      <Text
                        style={{
                          color: '#f5f5dc',
                          fontSize: responsiveFontSize(2.1),
                          fontWeight: 'bold',
                        }}
                      >
                        {item?.Doctor_name}
                      </Text>
                    </View>
                  </View>

                </View>

                {/* Details */}
                <View
                  style={{
                    marginTop: 10,
                    paddingHorizontal: 15,
                  }}
                >
                  {/* Date and Time */}

                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", width: "100%", marginBottom: 10, }}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                      <View style={{ backgroundColor: "#008080", borderRadius: 100, width: 22, height: 22, justifyContent: "center", alignItems: "center" }}>
                        <Icon3 name="date-range" style={{ fontSize: responsiveFontSize(2) }} color="#f5f5dc" />
                      </View>
                      <Text style={{ marginLeft: 5, color: '#000', fontSize: responsiveFontSize(1.7), fontWeight: '400' }}>
                        {item?.date}
                      </Text>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 1,
                      paddingHorizontal: 2,
                      paddingLeft: 8
                    }}>
                      <View style={{ backgroundColor: "#008080", borderRadius: 100, width: 22, height: 22, justifyContent: "center", alignItems: "center" }}>
                        <Icon3 name="access-time" style={{ fontSize: responsiveFontSize(2) }} color="#f5f5dc" />
                      </View>
                      <Text style={{ marginLeft: 2, color: '#000', fontSize: responsiveFontSize(1.6), fontWeight: '400', }}>
                        {item?.time}
                      </Text>
                    </View>
                  </View>

                  {/* Remark */}
                  <View style={{ flexDirection: 'row', marginBottom: 8, alignItems: "flex-start" }}>
                    <View style={{ backgroundColor: "#008080", borderRadius: 100, width: 22, height: 22, justifyContent: "center", alignItems: "center" }}>
                      <Remarkicon name="pencil-square-o" style={{ fontSize: responsiveFontSize(1.8) }} color="#f5f5dc" />
                    </View>
                    <Text style={{ marginLeft: 5, color: '#000', fontSize: responsiveFontSize(1.7), fontWeight: '400' }}>
                      {item?.remarks}
                      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, corporis. */}
                    </Text>
                  </View>

                  {/* Location */}
                  <View style={{ flexDirection: 'row', marginBottom: 6, alignItems: "center" }}>
                    <View style={{ backgroundColor: "#008080", borderRadius: 100, width: 22, height: 22, justifyContent: "center", alignItems: "center" }}>
                      <Icon3 name="location-on" style={{ fontSize: responsiveFontSize(2), }} color="#f5f5dc" />
                    </View>
                    <View style={{ marginRight: 5, width: "95%" }}>
                      <Text style={{ marginLeft: 5, color: '#000', fontSize: responsiveFontSize(1.7), fontWeight: '400', textAlign: "justify", }}>
                        {item?.Doctor_address}
                        {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos maxime delectus omnis nesciunt aliquid sequi ex vel obcaecati illum distinctio. */}
                      </Text>
                    </View>
                  </View>

                </View>

                {/* Visit Button */}
                <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#008080',
                      paddingHorizontal: 45,
                      paddingVertical: 9,
                      borderRadius: 10,
                      elevation: 5,
                      width: '50%',
                      justifyContent: "center",
                    }}
                    // onPress={() => setmodal(!modal)}
                    onPress={() => mainn(item?.Doctor_id, item.id)}
                  >
                    <Text
                      style={{
                        color: '#f5f5dc',
                        fontSize: responsiveFontSize(1.9),
                        fontWeight: '600',
                        textAlign: "center",
                        textTransform: "uppercase",
                      }}
                    >
                      Visit
                    </Text>
                  </TouchableOpacity>
                </View>

              </View>
            )}
          />
        )
      }

      {
        modal && (

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
                  backgroundColor: '#fff',
                  borderRadius: 7,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
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
                }}>
                <View style={{ marginBottom: 5 }}>
                  <Text
                    style={{
                      color: '#008080',
                      fontSize: responsiveFontSize(2.5),
                      textAlign: "center"
                    }}>
                    Remark
                  </Text>
                </View>
                {
                  listt && listt.map((ddaattaa) => {

                    if (ddaattaa?.status == 2) {

                      show && show == true ? (
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <ActivityIndicator
                            size="large"
                            color="#008080"
                            animating={show}
                          />
                        </View>
                      ) : (
                        <ScrollView style={{ marginTop: 7 }}>
                          {
                            addres &&
                            addres.map((item, index) => {
                              const backcolor = item === selectedId && selectedId ? "#7AAA4B" : "#8f959b";
                              return (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => handleOnPress(item)}
                                  style={{ marginTop: 7, marginHorizontal: 5, }}>
                                  <Text
                                    style={{
                                      color: '#fff',
                                      marginBottom: 13,
                                      backgroundColor: backcolor,
                                      padding: 11,
                                      borderRadius: 12,
                                      fontSize: 15,
                                    }}>
                                    {item.formattedAddress}
                                  </Text>
                                </TouchableOpacity>
                              );
                            })
                          }
                        </ScrollView>
                      )
                    }
                  })
                }

                <View style={{}}>
                  <TextInput
                    placeholder="Enter Remarks"
                    multiline={true}
                    numberOfLines={2}
                    placeholderTextColor="#008080"
                    // value={remark}
                    onChangeText={(value => setremark(value))}
                    style={{
                      borderColor: '#378134',
                      borderWidth: 0.5,
                      borderRadius: 12,
                      paddingHorizontal: 10,
                      paddingVertical: 0,
                      marginHorizontal: 8,
                      fontSize: responsiveFontSize(2),
                      color: '#008080',
                      backgroundColor: "#f5f5dc"
                    }}
                  />
                </View>
                {Errorsenddata?.remarks ? (
                  <Text style={{ color: 'red', fontSize: 13, padding: 1, paddingLeft: 12, paddingTop: 5 }}>
                    {Errorsenddata?.remarks}
                  </Text>
                ) : (
                  ''
                )}

                {/* Buttons */}
                <View style={{ width: '100%', flexDirection: 'row', paddingTop: 15, justifyContent: "center" }}>

                  <View
                    style={{
                      width: '45%',
                      backgroundColor: '#fff',
                      borderWidth: 0.8,
                      borderRadius: 20,
                      borderColor: "#008080"
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setmodal(false)}>
                      <Text
                        style={{
                          color: '#008080',
                          textAlign: 'center',
                          padding: 5,
                          fontSize: responsiveFontSize(1.8),
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      width: '45%',
                      backgroundColor: '#008080',
                      borderColor: '#008080',
                      // borderWidth: 0.8,
                      borderRadius: 20,
                      marginLeft: 3,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => sendata()}>
                      <Text
                        style={{
                          color: '#f5f5dc',
                          textAlign: 'center',
                          padding: 5,
                          fontSize: responsiveFontSize(1.8),
                        }}>
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>

                </View>

              </View>
            </View>
          </Modal>
        )
      }

    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'red',
    padding: 9,
  },
  item: {
    fontSize: 25,
    backgroundColor: '#6F7074',
    margin: 3,
    padding: 3,
    width: '30%',
    height: 70,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item1: {
    fontSize: 25,
    backgroundColor: '#6F7074',
    margin: 3,
    padding: 3,
    width: '30%',
    height: 70,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item2: {
    fontSize: 25,
    backgroundColor: '#6F7074',
    margin: 3,
    padding: 3,
    width: '30%',
    height: 70,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  RefreshControl,
  SafeAreaView
} from 'react-native';
import { useEffect, useState } from 'react';
import Icon3 from 'react-native-vector-icons/dist/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Time from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Doctor from 'react-native-vector-icons/dist/Fontisto';
import Datee from 'react-native-vector-icons/dist/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import Note from 'react-native-vector-icons/dist/SimpleLineIcons';
import Remarkicon from 'react-native-vector-icons/dist/FontAwesome';
import Icon4 from 'react-native-vector-icons/dist/EvilIcons';
import { responsiveFontSize } from "react-native-responsive-dimensions";

const FollowupList = ({ route }) => {

  console.log(route, 'eee')

  const [getdoctordetails, setgetdoctordetails] = useState('');
  const [load, setload] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState();
  const [modal, setmodal] = useState(false);
  const [remark, setremark] = useState();
  const navigation = useNavigation();
  const [user, setuser] = useState('');
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [timeopen, settimeopen] = useState(false);
  const [startdate, setstartdate] = useState();
  const [selectTime, setselectTime] = useState()
  const [open, setOpen] = useState(false);
  const [error, seterror] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [addfollowuploader, setaddfollowuploader] = useState(false);


  // const { data } = route.params;
  console.log(startdate && startdate.replaceAll('/', '-'), 'startdatestartdate');
  const [textstate, settextstate] = useState({
    textShown: -1,
  });

  const toggleNumberOfLines = index => {
    settextstate({
      textShown: textstate.textShown === index ? -1 : index,
    });
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
        .post(`/user/doctor/follow_up/list`, { doctor_id: route.params.data, user_id: route.params.user_id })
        .then(res => {
          console.log('doctordata', res);

          setgetdoctordetails(res.data.data);
          setload(false);

        });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(startdate && new Date(startdate), 'chekc date');

  const sendData = async id => {
    try {
      setmodal(false);
      let getDateSet = new Date(startdate && startdate);
      console.log(getDateSet, 'getDateSet');
      setload(true);
      let mr = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      setuser(modifiedUser);
      const data = {
        user_id: modifiedUser.id,
        doctor_id: route.params.data,
        date: startdate && startdate.replaceAll('/', '-'),
        time: selectTime && selectTime ? selectTime : '',
        remarks: remark,
      }
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser.api_token}`;
      const result = await axios
        .post(`/user/doctor/follow_up`, data)
        .then(res => {
          console.log('send data', res);
          console.log('send 55', data);
          setOpen(false)
          settimeopen(false);
          getdoctor();
          Toast()
          setload(false);
          if (res.data.error_code === true) {
            seterror(res.data.error_message);

            setmodal(true);
          } else {

            setmodal(false);
            setremark("")
            selectTime("")

          }
        });

    } catch (error) {
      console.log(error, 'send data error');
    }
  };

  // const wait = (timeout) => {
  //   return new Promise(resolve => setTimeout(resolve, timeout))
  // }

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


  useEffect(() => {
    getdoctor();
  }, []);

  const followupdata = async id => {
    setmodal(true);
    seterror(false);
    setselectTime(false);
    setstartdate(false);
  };
  const dateopen = () => {
    setOpen(true);
  };


  const TimeOpen = () => {
    settimeopen(true);
  };

  const other = () => {
    setmodal(false)
    setOpen(false)
    settimeopen(false);

  }

  const Toast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Follow up added !!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,

    );
  };

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEAEA' }}>

      <StatusBar
        animated={true}
        backgroundColor="#008080"
        barStyle={statusBarStyle}
      />

      {/* Sub header */}
      <View style={{ width: '100%', backgroundColor: '#008080', }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 6,
          }}>

          <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ width: 23, height: 23 }}>
              <Icon3 name="chevron-back" style={{ fontSize: responsiveFontSize(3), color: "#f5f5dc" }} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                color: '#F5F5DC',
                fontWeight: '600',
                // paddingLeft: 3,
                justifyContent: "center"
              }}>
              Follow ups
            </Text>
          </View>

          <View style={{ alignItems: "center", flexDirection: "row" }}>

            <View style={{ marginTop: 6, flexDirection: 'row' }}>

              <TouchableOpacity
                onPress={() => followupdata()}
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
                  <Icon4 name="plus" style={{ color: '#008080', fontSize: responsiveFontSize(2) }} />
                </View>
                <View >
                  <Text
                    style={{
                      color: '#008080',
                      fontSize: responsiveFontSize(1.7),
                      fontWeight: '600',
                    }}>
                    Add Follow up
                  </Text>
                </View>
              </TouchableOpacity>

            </View>

          </View>

        </View>
      </View>

      <View style={{}}>
        <View style={{ borderRadius: 19, backgroundColor: '#f5f5dc' }}>
          <TouchableOpacity>
            <DatePicker
              modal
              open={open}
              date={date}
              title="Select Date"
              mode="date"
              onConfirm={date => {
                setOpen(false);
                setstartdate(date.toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }), console.log(date));
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{}}>
        <View style={{ borderRadius: 19, backgroundColor: '#7AAA4B' }}>
          <TouchableOpacity>
            <DatePicker
              modal
              open={timeopen}
              date={date1}
              title="Select Time"
              mode="time"
              onConfirm={date => {
                settimeopen(false);
                setselectTime(date.toLocaleString('en-US', {
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit',
                }));
              }}
              onCancel={() => {
                settimeopen(false);
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {
        modal && (
          <Modal animationType="slide" transparent={true} visible={true}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ backgroundColor: '#ffffff', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 30, width: '90%', maxWidth: 400 }}>

                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: '#008080', fontSize: 18, fontWeight: '600', marginBottom: 10 }}>Date</Text>
                  <TouchableOpacity onPress={() => dateopen()} style={{ backgroundColor: "#f0f0f0", borderRadius: 5, padding: 10 }}>
                    <Text style={{ color: '#008080', fontSize: 16 }}>{startdate ? startdate.toString().replaceAll('/', '-') : 'Select Date'}</Text>
                  </TouchableOpacity>
                  {error?.date && <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{error.date}</Text>}
                </View>

                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: '#008080', fontSize: 18, fontWeight: '600', marginBottom: 10 }}>Time</Text>
                  <TouchableOpacity onPress={() => TimeOpen()} style={{ backgroundColor: "#f0f0f0", borderRadius: 5, padding: 10 }}>
                    <Text style={{ color: '#008080', fontSize: 16 }}>{selectTime ? selectTime : 'Select Time'}</Text>
                  </TouchableOpacity>
                  {error?.time && <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{error.time}</Text>}
                </View>

                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: '#008080', fontSize: 18, fontWeight: '600', marginBottom: 7 }}>Remark</Text>
                  <TextInput
                    placeholder="Enter Remarks"
                    placeholderTextColor="#008080"
                    multiline={true}
                    numberOfLines={1}
                    onChangeText={value => setremark(value)}
                    style={{ backgroundColor: "#f0f0f0", borderRadius: 5, paddingHorizontal: 10, fontSize: 16, color: '#008080' }}
                  />
                  {error?.remarks && <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{error.remarks}</Text>}
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                  <TouchableOpacity onPress={() => sendData()} style={{ backgroundColor: '#008080', borderRadius: 30, paddingHorizontal: 20, paddingVertical: 10, flexDirection: "row", alignItems: "center", width: "45%", justifyContent: "center" }}>
                    <Text style={{ color: '#f5f5dc', fontSize: 18, fontWeight: '600' }}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => other()} style={{ backgroundColor: '#ffffff', borderRadius: 30, paddingVertical: 10, paddingHorizontal: 20, borderColor: '#008080', borderWidth: 1, alignItems: "center", width: "45%", justifyContent: "center", marginLeft: 10 }}>
                    <Text style={{ color: '#008080', fontSize: 18, fontWeight: '600' }}>Cancel</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </Modal>
        )
      }


      {
        load && load == true ?
          (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{
                color: "#008080", fontSize: 10,
              }}> please wait...</Text>
              <ActivityIndicator size="large" color="#008080" animating={load} />
            </View>
          ) : (
            <FlatList
              data={getdoctordetails?.length > 0 ? getdoctordetails : ''}
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
                    marginHorizontal: 10, marginTop: 5, marginBottom: 3,
                  }}>

                  <View
                    style={{
                      flexDirection: 'column',
                      borderRadius: 5,
                      backgroundColor: '#f5f5dc',
                      paddingBottom: 5,
                      elevation: 5,
                    }}>

                    <View
                      style={{
                        flexDirection: 'column',

                      }}>

                      {/* Name */}
                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: "#008080",
                        padding: 5,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        justifyContent: "center",

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

                        <View style={{ paddingLeft: 4, }}>
                          <Text
                            style={{
                              color: '#f5f5dc',
                              fontSize: responsiveFontSize(2),
                              fontWeight: '600',
                            }}>
                            Dr. {item?.Doctor_name}
                          </Text>
                        </View>
                      </View>

                      {/* Remarks */}
                      <View style={{
                        margin: 5,
                        paddingLeft: 7,
                      }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 6,
                            justifyContent: "space-between"
                          }}>
                          <View
                            style={{
                              flexDirection: 'row', marginHorizontal: 5
                            }}
                          >
                            <View
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: "#008080",
                                padding: 4,
                                borderRadius: 50,
                              }}>
                              <Datee
                                style={{
                                  alignItems: 'center',
                                  fontSize: responsiveFontSize(2),
                                  color: '#f5f5dc',
                                }}
                                name="date-range"
                              />
                            </View>

                            <View style={{ paddingLeft: 3 }}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontSize: responsiveFontSize(1.85),
                                  marginTop: 2,
                                }}>
                                {item?.date}
                              </Text>
                            </View>
                          </View>

                          <View style={{ paddingRight: 15, flexDirection: 'row', alignItems: 'center', }}>

                            <View style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: "#008080",
                              padding: 4,
                              borderRadius: 50,
                              marginRight: 3,
                            }}>
                              <Time
                                style={{ fontSize: responsiveFontSize(2), color: "#f5f5dc" }}
                                name="clock-time-four" />
                            </View>

                            <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), }}>{item?.time}</Text>
                          </View>
                        </View>

                        <View style={{ flexDirection: "row", paddingHorizontal: 5, alignItems: "flex-start" }}>

                          <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: "#008080",
                            padding: 4,
                            borderRadius: 50,
                            marginRight: 3,
                            marginVertical: 7,
                          }}>
                            <Remarkicon
                              style={{ fontSize: responsiveFontSize(1.8), color: "#f5f5dc", }}
                              name="pencil-square-o"
                            />
                          </View>

                          <View style={{ justifyContent: "center", paddingLeft: 4, width: "90%", marginTop: 5 }}>

                            <Text
                              style={{ color: "#434240", justifyContent: "center", alignItems: "center", paddingTop: 3, fontSize: responsiveFontSize(1.85), }}
                              numberOfLines={textstate.textShown === index ? undefined : 1}
                            >
                              {item?.remarks}
                            </Text>
                            {item?.remarks.length > 75 ?

                              <Text
                                onPress={() => toggleNumberOfLines(index)}
                                style={{ color: '#008080', fontSize: 13 }}>

                                {textstate.textShown === index ? 'read less...' : 'read more...'}
                              </Text>
                              :
                              ""
                            }

                          </View>

                        </View>

                      </View>

                    </View>

                  </View>
                </View>
              )}
            />
          )
      }

    </SafeAreaView>
  );
};

//  Dr { item?.Doctor_name }

export default FollowupList;

const styles = StyleSheet.create({});
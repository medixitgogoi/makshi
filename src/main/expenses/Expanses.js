import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ActivityIndicator,
  FlatList,
  ToastAndroid,
  RefreshControl,
  ScrollView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Icon3 from 'react-native-vector-icons/dist/Ionicons';
import Icon4 from 'react-native-vector-icons/dist/EvilIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Filtericon from 'react-native-vector-icons/dist/FontAwesome';
import Distanceicon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import Fromtoicon from 'react-native-vector-icons/dist/AntDesign';
import Distanc from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Expensenameicon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Rupees from 'react-native-vector-icons/dist/FontAwesome';

const Expanses = () => {

  const navigation = useNavigation();

  const [statusBarStyle, setStatusBarStyle] = useState();
  const [model, setmodel] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [startdate, setsetstartdate] = useState();
  const [distance, setdistance] = useState();
  const [totalExpense, settotalExpense] = useState();
  const [filterModel, setfilterModel] = useState(false);
  const [apiopen, setapiopen] = useState(false)
  const [apiopen1, setapiopen1] = useState(false)
  const [setexpenseName, setsetexpenseName] = useState()
  const [apistartdate, setapistartdate] = useState();
  const [apienddate, setapienddate] = useState('');
  const [startLocation, setstartLocation] = useState()
  const [EndLocation, setEndLocation] = useState()
  const [load, setload] = useState(false);
  const [expenselistdata, setexpenselistdata] = useState()
  const [addfollowuperror, setaddfollowuperror] = useState(false);
  const [error, seterror] = useState(false);
  const [result, setresult] = useState(new Date())
  const [expenseload, setexpenseload] = useState(false);
  const [filterload, setfilterload] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const expensedatasend = async () => {
    try {
      setexpenseload(true)
      setmodel(false)
      let getDateSet = new Date(startdate && startdate);
      console.log(getDateSet, 'getDateSet');
      let mr = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser.api_token}`;
      const result = await axios
        .get(`/user/expenses/add`, {
          // user_id: modifiedUser.id,
          name: setexpenseName,
          from: startLocation,
          to: EndLocation,
          distance: distance,
          expense: totalExpense
        })
        .then(res => {
          console.log('expensedatasend data', res);
          if (res.data.error_code === true) {
            setaddfollowuperror(res.data.error_message);
            setmodel(true);
            setexpenseload(false)
          } else {
            setmodel(false);
            setexpenseload(false)
            Toast()
            // getexpensedata()
            clear()
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getexpensedata = async () => {
    try {
      setfilterload(true);
      setfilterModel(false)
      let mr = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser.api_token}`;
      const result = await axios
        .get(`/user/expenses/list`)
        .then(res => {
          console.log('getexpensedata data', res);
          setexpenselistdata(res.data.data)
          setfilterModel(false)
          setfilterload(false);
          if (res.data.error_code === true) {
            seterror(res.data.error_message);
            setfilterModel(true);
          } else {
            setfilterModel(false);
          }

        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getexpensedata()
  }, []);

  const clear = () => {
    setsetexpenseName("")
    setstartLocation("")
    setEndLocation("")
    setdistance("")
    settotalExpense("")
  }

  const Toast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Expenses added successfully!!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const addexpenses = () => {
    setmodel(true)
    setaddfollowuperror(false)
  }

  const filterbyfunction = () => {
    seterror(false);
    setfilterModel(true)
    setapistartdate(false)
    setapienddate(false)
  }

  const dateopen = () => {
    setOpen(true);
  };

  const dateopen1 = () => {
    setOpen1(true);
  };

  const apitest = () => {
    setapiopen(true)
  }

  const apitest1 = () => {
    setapiopen1(true)
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
            style={{ color: '#008080', fontSize: 15, fontWeight: '400' }}
          >
            No Data Found
          </Text>
        </View>
      </View>
    );
  };

  const onRefresh = () => {
    getexpensedata()
  }

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
                justifyContent: "center"
              }}>
              Expenses
            </Text>
          </View>

          <View style={{ alignItems: "center", flexDirection: "row" }}>

            <View style={{ marginTop: 6, flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ExpenseAdd')}
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
                    Add Expense
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>

        </View>

      </View>

      <View
        style={{}}>
        <View style={{ borderRadius: 19, backgroundColor: '#7AAA4B' }}>
          <TouchableOpacity

          >
            <DatePicker
              modal
              open={apiopen}
              date={date}
              title="Start Date"
              mode="date"
              onConfirm={date => {
                setresult(date)
                setapiopen(false);
                setapistartdate(date.toLocaleDateString("pt-PT", {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric'
                }));

              }}
              onCancel={() => {
                setapiopen(false);
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{}}>
        <View style={{ borderRadius: 19, backgroundColor: '#7AAA4B' }}>
          <TouchableOpacity

          >
            <DatePicker
              modal
              open={apiopen1}
              date={result && result}
              title="End Date"
              mode="date"
              minimumDate={result && result}
              onConfirm={date => {
                setapiopen1(false);
                setapienddate(date.toLocaleDateString("pt-PT", {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }));

              }}
              onCancel={() => {
                setapiopen1(false);
              }}
            />
          </TouchableOpacity>
        </View>
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
            <Text style={{ color: '#008080' }}>please wait ...</Text>
            <ActivityIndicator
              size="large"
              color="#008080"
              animating={load}
            />
          </View>
        ) : (
          <FlatList
            data={expenselistdata?.length > 0 ? expenselistdata : ''}
            style={{ marginTop: 8, }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#008080']}
              />
            }
            ListEmptyComponent={EmptyListMessage}
            renderItem={({ item }) => (
              <View style={{ marginHorizontal: 10, marginBottom: 8, }}>
                <View
                  style={{
                    flexDirection: 'column',
                    borderRadius: 5,
                    backgroundColor: '#f5f5dc',
                    elevation: 5,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                  }}>
                  <View>

                    {/* Name */}
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          borderColor: "#008080",
                          borderWidth: 0.6,
                          padding: 4,
                          borderRadius: 5,
                          marginBottom: 5,
                          backgroundColor: "#008080"
                        }}
                      >
                        <View
                          style={{
                            // borderColor: "#F5F5DC",
                            // borderWidth: 1,
                            borderRadius: 50,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#f5f5dc",
                            width: 23,
                            height: 23,
                            elevation: 2,
                          }}
                        >
                          <Expensenameicon
                            style={{
                              fontSize: responsiveFontSize(2),
                              justifyContent: "center",
                              color: "#008080",
                            }}
                            name="format-list-checks" />
                        </View>

                        <View style={{ justifyContent: "center", flexDirection: "row", paddingLeft: 3 }}>
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: 'center',
                            }}
                          >
                            <Text
                              style={{
                                color: "#f5f5dc",
                                fontSize: responsiveFontSize(2),
                                justifyContent: "center",
                                alignItems: 'center',
                              }}
                            >
                              {item?.name}
                            </Text>
                          </View>
                        </View>

                      </View>
                    </View>

                    {/* Distance */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: 'center',
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          // paddingTop: 5,
                          alignItems: "center"
                        }}>
                        <View
                          style={{
                            borderColor: "#F5F5DC",
                            borderWidth: 1,
                            borderRadius: 100,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#008080",
                            width: 23,
                            height: 23,
                            elevation: 2,
                          }}
                        >
                          <Distanc
                            style={{ fontSize: responsiveFontSize(1.9), color: "#f5f5dc", alignItems: "center" }}
                            name="map-marker-distance" />
                        </View>
                        <View
                          style={{ justifyContent: "center", flexDirection: "row", paddingLeft: 4 }}>
                          <View
                            style={{ justifyContent: "center" }}>
                            <Text
                              style={{ color: "#000", fontSize: responsiveFontSize(2) }}>
                              {item?.distance}{" "}{"KM"}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 5,
                          padding: 3,
                          paddingTop: 6
                        }}>
                        <View
                          style={{
                            borderColor: "#F5F5DC",
                            borderWidth: 1,
                            borderRadius: 50,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#008080",
                            width: 23,
                            height: 23,
                            elevation: 2,
                          }}
                        >
                          <Rupees
                            style={{ fontSize: responsiveFontSize(1.8), color: "#f5f5dc", alignItems: "center" }}
                            name="rupee" />
                        </View>
                        <View
                          style={{ justifyContent: "center", flexDirection: "row", paddingLeft: 4, alignItems: "center" }}>
                          <View>
                            <Text
                              style={{ color: "#000", fontSize: responsiveFontSize(2), }}>
                              {item?.expense}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    {/* Location */}
                    <View
                      style={{
                        flexDirection: "row",
                        paddingTop: 5,
                        // justifyContent: "center",
                        alignItems: "center",
                      }}>
                      <View
                        style={{
                          borderColor: "#F5F5DC",
                          borderWidth: 1,
                          borderRadius: 100,
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#008080",
                          width: 23,
                          height: 23,
                          elevation: 2,
                        }}
                      >
                        <Fromtoicon
                          style={{ fontSize: responsiveFontSize(2), justifyContent: "center", color: "#f5f5dc" }}
                          name="enviroment"
                        />
                      </View>

                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: 'center',
                          flexDirection: "row",
                          paddingLeft: 4
                        }}>
                        <View
                          style={{
                            justifyContent: "center",
                            flexDirection: "row",
                          }}>
                          <Text
                            style={{ fontSize: responsiveFontSize(2), color: "#000", }}
                          >
                            {item?.from}
                          </Text>
                        </View>

                        <View
                          style={{
                            borderColor: "#008080",
                            borderWidth: 1,
                            borderRadius: 100,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 16,
                            height: 16,
                            marginHorizontal: 5,
                          }}
                        >
                          <Distanceicon
                            style={{ color: "#008080", justifyContent: "center", alignItems: 'center', }}
                            name="swap-horizontal" />
                        </View>

                        <View
                          style={{ justifyContent: "center", alignItems: 'center', }}
                        >
                          <Text
                            style={{ fontSize: responsiveFontSize(2), color: "#000", alignItems: 'center' }}
                          >
                            {item?.to}{""}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Applied date and View button */}
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingTop: 10, alignItems: "center", }}>

                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ justifyContent: 'center', backgroundColor: "#eaeaea", paddingHorizontal: 3, elevation: 3, borderRadius: 5, paddingVertical: 1, }}>
                          <Text style={{ color: '#008080', fontSize: responsiveFontSize(1.5), }}>
                            Applied Date
                          </Text>
                        </View>
                        <Text style={{ color: "#000", marginLeft: 1, }}>: {item?.date}</Text>
                      </View>

                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() => navigation.navigate("ExpenseView", {
                            item
                          })}
                          style={{
                            backgroundColor: "#008080",
                            borderRadius: 50,
                            padding: 3,
                            elevation: 5,
                          }}
                        >
                          <Text style={{ fontSize: responsiveFontSize(1.6), color: "#f5f5dc", paddingHorizontal: 10, fontWeight: "500" }}>View</Text>
                        </TouchableOpacity>
                      </View>

                    </View>

                  </View>
                </View>
              </View>
            )}
          />
        )}

      {
        expenseload && expenseload == true ?
          (
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Text style={{ color: "#008080", fontSize: 10, }}>Adding expense details!! Please wait...</Text>
              <ActivityIndicator size="large" color="#008080" animating={expenseload} />
            </View>
          )
          :
          model ? (
            <Modal animationType="slide" transparent={true} visible={true}>
              <View
                style={{
                  flex: 1,
                  margin: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 18,
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 4,
                    shadowColor: '#424547',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 7,
                    width: '100%',
                    height: '70%',
                    paddingVertical: 30,
                    borderColor: '#dadada',
                    borderWidth: 1,
                  }}>

                  <ScrollView style={{}}>

                    <View style={{ paddingTop: 14 }}>
                      <View style={{ paddingLeft: 14 }}>
                        <Text
                          style={{
                            color: '#7AAA4B',
                            fontSize: 15,
                            fontWeight: '400',
                          }}>
                          Work Type
                        </Text>
                      </View>
                      <TextInput
                        placeholder="Enter Expenses Name"
                        placeholderTextColor="#808387"
                        onChangeText={value => setsetexpenseName(value)}
                        style={{
                          borderColor: '#378134',
                          borderWidth: 1,
                          borderRadius: 12,
                          paddingLeft: 15,
                          marginHorizontal: 10,
                          fontSize: 14,
                          marginTop: 5,
                          color: 'grey',
                          padding: 3,

                        }}
                      />
                      {addfollowuperror?.name ? (
                        <Text style={{ color: 'red', fontSize: 13, padding: 1, paddingLeft: 13, paddingTop: 5 }}>
                          {addfollowuperror?.name}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>

                    <View style={{ paddingTop: 14 }}>
                      <View style={{ paddingLeft: 14 }}>
                        <Text
                          style={{
                            color: '#7AAA4B',
                            fontSize: 15,
                            fontWeight: '400',
                          }}>
                          Number Of Doctors Met
                        </Text>
                      </View>
                      <TextInput
                        placeholder="Enter Number Of Doctors Met"
                        placeholderTextColor="#808387"
                        // keyboardType="numeric"
                        onChangeText={value => setstartLocation(value)}
                        style={{
                          borderColor: '#378134',
                          borderWidth: 1,
                          borderRadius: 12,
                          paddingLeft: 15,
                          marginHorizontal: 10,
                          fontSize: 14,
                          marginTop: 5,
                          color: 'grey',
                          padding: 3,

                        }}
                      />
                      {addfollowuperror?.from ? (
                        <Text style={{ color: 'red', fontSize: 13, padding: 1, paddingLeft: 13, paddingTop: 5 }}>
                          {addfollowuperror?.from}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>

                    <View style={{ paddingTop: 14 }}>
                      <View style={{ paddingLeft: 14 }}>
                        <Text
                          style={{
                            color: '#7AAA4B',
                            fontSize: 15,
                            fontWeight: '400',
                          }}>
                          Number Of KBA Met
                        </Text>
                      </View>
                      <TextInput
                        placeholder="Enter Number Of KBA Met"
                        placeholderTextColor="#808387"
                        // keyboardType="numeric"
                        onChangeText={value => setEndLocation(value)}
                        style={{
                          borderColor: '#378134',
                          borderWidth: 1,
                          borderRadius: 12,
                          paddingLeft: 15,
                          marginHorizontal: 10,
                          fontSize: 14,
                          marginTop: 5,
                          color: 'grey',
                          padding: 3,

                        }}
                      />
                      {addfollowuperror?.to ? (
                        <Text style={{ color: 'red', fontSize: 13, padding: 1, paddingLeft: 13, paddingTop: 5 }}>
                          {addfollowuperror?.to}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>

                    <View style={{ paddingTop: 14 }}>
                      <View style={{ paddingLeft: 14 }}>
                        <Text
                          style={{
                            color: '#7AAA4B',
                            fontSize: 15,
                            fontWeight: '400',
                          }}>
                          Work Place Type
                        </Text>
                      </View>
                      <TextInput
                        placeholder="Ex.(HQ/OS)"
                        placeholderTextColor="#808387"
                        // keyboardType="numeric"
                        onChangeText={value => setdistance(value)}
                        style={{
                          borderColor: '#378134',
                          borderWidth: 1,
                          borderRadius: 12,
                          paddingLeft: 14,
                          marginHorizontal: 10,
                          fontSize: 14,
                          marginTop: 5,
                          color: 'grey',
                          padding: 3,

                        }}
                      />
                      {addfollowuperror?.distance ? (
                        <Text style={{ color: 'red', fontSize: 13, padding: 1, paddingLeft: 13, paddingdistancep: 5 }}>
                          {addfollowuperror?.distance}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>

                    <View style={{ paddingTop: 14 }}>
                      <View style={{ paddingLeft: 14 }}>
                        <Text
                          style={{
                            color: '#7AAA4B',
                            fontSize: 15,
                            fontWeight: '400',
                          }}>
                          Covered From
                        </Text>
                      </View>
                      <TextInput
                        placeholder="Enter Covered Place Name"
                        placeholderTextColor="#808387"
                        keyboardType="numeric"
                        onChangeText={value => settotalExpense(value)}
                        style={{
                          borderColor: '#378134',
                          borderWidth: 1,
                          borderRadius: 12,
                          paddingLeft: 15,
                          marginHorizontal: 10,
                          fontSize: 14,
                          marginTop: 5,
                          color: 'grey',
                          padding: 3,

                        }}
                      />
                      {addfollowuperror?.expense ? (
                        <Text style={{ color: 'red', fontSize: 13, padding: 1, paddingLeft: 13, paddingdistancep: 5 }}>
                          {addfollowuperror?.expense}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>

                    <View style={{ paddingTop: 14 }}>
                      <View style={{ paddingLeft: 14 }}>
                        <Text
                          style={{
                            color: '#7AAA4B',
                            fontSize: 15,
                            fontWeight: '400',
                          }}>
                          Distnance As Per TCP
                        </Text>
                      </View>
                      <TextInput
                        placeholder="Enter Distnance As Per TCP"
                        placeholderTextColor="#808387"
                        keyboardType="numeric"
                        onChangeText={value => settotalExpense(value)}
                        style={{
                          borderColor: '#378134',
                          borderWidth: 1,
                          borderRadius: 12,
                          paddingLeft: 14,
                          marginHorizontal: 10,
                          fontSize: 14,
                          marginTop: 5,
                          color: 'grey',
                          padding: 3,

                        }}
                      />
                      {addfollowuperror?.expense ? (
                        <Text style={{ color: 'red', fontSize: 13, padding: 1, paddingLeft: 13, paddingdistancep: 5 }}>
                          {addfollowuperror?.expense}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>

                    <View style={{ paddingTop: 14 }}>
                      <View style={{ paddingLeft: 14 }}>
                        <Text
                          style={{
                            color: '#7AAA4B',
                            fontSize: 15,
                            fontWeight: '400',
                          }}>
                          Fare As Per TCP/Actuals
                        </Text>
                      </View>
                      <TextInput
                        placeholder="Enter Fare As Per TCP/Actuals"
                        placeholderTextColor="#808387"
                        keyboardType="numeric"
                        onChangeText={value => settotalExpense(value)}
                        style={{
                          borderColor: '#378134',
                          borderWidth: 1,
                          borderRadius: 12,
                          paddingLeft: 15,
                          marginHorizontal: 10,
                          fontSize: 14,
                          marginTop: 5,
                          color: 'grey',
                          padding: 3,

                        }}
                      />
                      {addfollowuperror?.expense ? (
                        <Text style={{ color: 'red', fontSize: 13, padding: 1, paddingLeft: 13, paddingdistancep: 5 }}>
                          {addfollowuperror?.expense}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>

                    <View style={{ paddingTop: 14 }}>
                      <View style={{ paddingLeft: 14 }}>
                        <Text
                          style={{
                            color: '#7AAA4B',
                            fontSize: 15,
                            fontWeight: '400',
                          }}>
                          Daily Allowance/Fixed Misc. Claim st OS
                        </Text>
                      </View>
                      <TextInput
                        // placeholder="Enter Worked Place Name"
                        placeholderTextColor="#808387"
                        // keyboardType="numeric"
                        onChangeText={value => settotalExpense(value)}
                        style={{
                          borderColor: '#378134',
                          borderWidth: 1,
                          borderRadius: 12,
                          paddingLeft: 15,
                          marginHorizontal: 10,
                          fontSize: 14,
                          marginTop: 5,
                          color: 'grey',
                          padding: 3,

                        }}
                      />
                      {addfollowuperror?.expense ? (
                        <Text style={{ color: 'red', fontSize: 13, padding: 1, paddingLeft: 13, paddingdistancep: 5 }}>
                          {addfollowuperror?.expense}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>

                    <View style={{ paddingTop: 14 }}>
                      <View style={{ paddingLeft: 14 }}>
                        <Text
                          style={{
                            color: '#7AAA4B',
                            fontSize: 15,
                            fontWeight: '400',
                          }}>
                          Miscellaneous Expanse
                        </Text>
                      </View>
                      <TextInput
                        placeholder="Enter Miscellaneous Expanse"
                        placeholderTextColor="#808387"
                        // keyboardType="numeric"
                        onChangeText={value => settotalExpense(value)}
                        style={{
                          borderColor: '#378134',
                          borderWidth: 1,
                          borderRadius: 12,
                          paddingLeft: 15,
                          marginHorizontal: 10,
                          fontSize: 14,
                          marginTop: 5,
                          color: 'grey',
                          padding: 3,

                        }}
                      />
                      {addfollowuperror?.expense ? (
                        <Text style={{ color: 'red', fontSize: 13, padding: 1, paddingLeft: 13, paddingdistancep: 5 }}>
                          {addfollowuperror?.expense}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>

                    <View style={{ paddingTop: 8, marginHorizontal: 10, }}>
                      <View style={{ padding: 5 }}>
                        <Text
                          style={{
                            color: '#7AAA4B',
                            fontSize: 15,
                            fontWeight: '400',
                          }}>
                          DATE
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => apitest()}
                        style={{
                          borderWidth: 1,
                          borderRadius: 10,
                          // padding: 2,
                          // paddingHorizontal: 12

                        }}
                      >
                        {
                          apistartdate ?
                            <Text style={{
                              color: 'grey', padding: 7,
                              fontSize: 14
                            }}>
                              {apistartdate && apistartdate.replaceAll('/', '-')}
                            </Text> :
                            <Text style={{
                              color: 'grey', padding: 7, paddingLeft: 15,
                              fontSize: 14
                            }}>
                              Select Start Date
                            </Text>

                        }
                      </TouchableOpacity>


                    </View>

                    <View style={{ paddingTop: 14 }}>
                      <View style={{ paddingLeft: 14 }}>
                        <Text
                          style={{
                            color: '#7AAA4B',
                            fontSize: 15,
                            fontWeight: '400',
                          }}>
                          Total Expenses
                        </Text>
                      </View>
                      <TextInput
                        placeholder="Enter Total Expenses"
                        placeholderTextColor="#808387"
                        keyboardType="numeric"
                        onChangeText={value => settotalExpense(value)}
                        style={{
                          borderColor: '#378134',
                          borderWidth: 1,
                          borderRadius: 12,
                          paddingLeft: 15,
                          marginHorizontal: 10,
                          fontSize: 14,
                          marginTop: 5,
                          color: 'grey',
                          padding: 3,

                        }}
                      />
                      {addfollowuperror?.expense ? (
                        <Text style={{ color: 'red', fontSize: 13, padding: 1, paddingLeft: 13, paddingdistancep: 5 }}>
                          {addfollowuperror?.expense}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>

                  </ScrollView>

                  <View
                    style={{ width: '100%', flexDirection: 'row', paddingTop: 25, paddingHorizontal: 12, }}>
                    <View
                      style={{
                        width: '50%',
                        backgroundColor: '#7AAA4B',
                        borderRadius: 20,
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setmodel(false)}>
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
                      <TouchableOpacity style={{}} onPress={() => expensedatasend()}>
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

      {
        filterload && filterload == true ?
          (
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center'
              }}>

              <ActivityIndicator size="large" color="#008080" animating={filterload} />
            </View>
          ) :
          filterModel ? (

            <Modal animationType="slide" transparent={true} visible={true}>
              <View
                style={{
                  flex: 1,
                  margin: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 20,
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 20,

                    shadowColor: '#424547',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 7,
                    width: '100%',
                    height: 'auto',
                    paddingVertical: 30,
                    borderColor: '#dadada',
                    borderWidth: 1,
                  }}>

                  <View style={{}}>

                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          color: '#7AAA4B',
                          fontSize: 18,
                          fontWeight: '400',
                        }}>
                        Filter Expense data
                      </Text>
                    </View>

                    <View style={{ paddingTop: 14 }}>
                      <View style={{ padding: 5 }}>
                        <Text
                          style={{
                            color: '#008080',
                            fontSize: 16,
                            fontWeight: '400',
                          }}>
                          From
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => apitest()}
                        style={{
                          borderColor: "#008080",
                          borderWidth: 1,
                          borderRadius: 10,
                          padding: 2,
                          paddingHorizontal: 7

                        }}
                      >
                        {
                          apistartdate ?
                            <Text style={{
                              color: '#008080', padding: 7,
                              fontSize: 15
                            }}>
                              {apistartdate && apistartdate.replaceAll('/', '-')}
                            </Text> :
                            <Text style={{
                              color: '#008080', padding: 7,
                              fontSize: 15
                            }}>
                              Select Start Date
                            </Text>

                        }
                      </TouchableOpacity>
                      {error?.date_from ? (
                        <Text style={{ color: 'red', fontSize: 13, paddingLeft: 4, paddingTop: 5 }}>
                          {error?.date_from}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>

                    <View style={{ paddingTop: 14 }}>
                      <View style={{ padding: 5 }}>
                        <Text
                          style={{
                            color: '#7AAA4B',
                            fontSize: 16,
                            fontWeight: '400',
                          }}>
                          To
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => apitest1()}
                        style={{
                          borderColor: "green",
                          borderWidth: 1,
                          borderRadius: 10,
                          padding: 2,
                          paddingHorizontal: 7

                        }}
                      >
                        {
                          apienddate ?
                            <Text style={{
                              color: 'grey', padding: 7,
                              fontSize: 15
                            }}>
                              {apienddate && apienddate.replaceAll('/', '-')}
                            </Text> :
                            <Text style={{
                              color: 'grey', padding: 7,
                              fontSize: 15
                            }}>
                              Select End Date
                            </Text>
                        }
                      </TouchableOpacity>
                      {error?.date_to ? (
                        <Text style={{ color: 'red', fontSize: 13, padding: 1, paddingLeft: 4, paddingTop: 5 }}>
                          {error?.date_to}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>

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
                        onPress={() => setfilterModel(false)}>
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
                      <TouchableOpacity style={{}} onPress={() => getexpensedata()}>
                        <Text
                          style={{
                            color: '#398337',
                            textAlign: 'center',
                            padding: 8,
                            fontSize: 15,
                          }}>
                          Filter
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

export default Expanses;

const styles = StyleSheet.create({
  item: {
    color: 'red',
    fontSize: 25,
    backgroundColor: 'blue',
    margin: 7,
    padding: 5,
    width: 150,
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

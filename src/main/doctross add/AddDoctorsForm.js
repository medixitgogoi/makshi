import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
  FlatList
} from 'react-native';

import React, { useEffect, useState } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geocoder from 'react-native-geocoder';
import axios from 'axios'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/dist/Ionicons';
import GetLocation, {
  Location,
  LocationError,
  LocationErrorCode,
} from 'react-native-get-location';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

const AddDoctorsForm = ({ route }) => {

  const navigation = useNavigation();
  const [statusBarStyle, setStatusBarStyle] = useState();
  const [photo, setPhotoURI] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [data, setdata] = useState('');
  const [data1, setdata1] = useState('');
  const [addres, setadd] = useState('');
  const [, set] = useState('');
  const [print, setprint] = useState(false);
  const [print1, setprint1] = useState(false);
  const [show, setshow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [newstatelist, setnewstatelist] = useState();
  const [newcitylist, setnewcitylist] = useState();
  const [statelist, setstatelist] = useState([])
  const [citylist, setcitylist] = useState([]);
  const [formerror, setsetformerror] = useState();
  const [load, setload] = useState(false);
  const [mainload, setmainload] = useState(false);
  const [divisionList, setdivisionList] = useState([]);
  const [HospitalAddressList, setHospitalAddressList] = useState(route.params);
  const [specialityList, setspecialityList] = useState([]);

  const [doctordata, setdoctordata] = useState({
    doctor_name: "",
    email: "",
    mobile: "",
    address: "",
    qualification: "",
    speciality: specialityList && specialityList.id,
    // hosptial: route.params && route.params ? route.params.item.id : '',
    divsion: divisionList && divisionList.id,
    clinic_address: "",
    // hosptial: HospitalAddressList && HospitalAddressList.id,
    city: newcitylist && newcitylist.id,
    state: newstatelist && newstatelist.id,
  })

  const sendata = async () => {
    console.log("Dixit");
    try {
      setmainload(true)
      let mr = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(mr);
      // console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser.api_token}`;
      const datats = {
        doctor_name: doctordata?.doctor_name,
        email: doctordata?.email,
        mobile: doctordata?.mobile,
        address: doctordata?.address,
        qualification: doctordata?.qualification,
        speciality: specialityList && specialityList.id,
        hosptial: route.params && route.params ? route.params.item.id : '',
        divsion: divisionList && divisionList.id,
        clinic_address: doctordata?.clinic_address,
        city: newcitylist && newcitylist.id,
        state: newstatelist && newstatelist.id,
      }
      console.log('datats', datats)
      const result = await axios.post('/user/doctor/add/request', datats)
        .then(res => {
          console.log(res, "adddoctrsss")
          Toast()
          navigation.navigate('DoctorList')
          setmainload(false)
        });
    } catch (error) {
      console.log(error);

      if (error.response.status === 422) {
        setsetformerror(error.response.data.errors)
        setmainload(false)
      } else {
        Toast()
      }
    }
  };

  const Toast = () => {
    ToastAndroid.showWithGravityAndOffset(
      '  Doctor added successfully !!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,

    );
  };

  const getdoctormasterlist = async () => {
    try {
      setload(true);
      let mr = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser.api_token}`;
      const result = await axios
        .get('/user/master/doctor/list')
        .then(res => {
          console.log('doctormasterlist', res);
          let Divisiondata = [];
          let DivisionHospitalAddressdata = [];
          let SpecialityListdata = []


          // let HospitalAddress = res.data.Hospital_Address_List;
          // HospitalAddress.forEach((item) => {
          //   // console.log(item , 'item')
          //   DivisionHospitalAddressdata.push({
          //     title: item.name,
          //     id: item.id
          //   })
          // })

          let divisionlistdata = res.data.Division_List;
          divisionlistdata.forEach((item) => {
            // console.log(item , 'item')
            Divisiondata.push({
              title: item.name,
              id: item.id
            })
          })

          let specialitylisttt = res.data.Speciality_List;
          specialitylisttt.forEach((item) => {
            // console.log(item , 'item')
            SpecialityListdata.push({
              title: item.name,
              id: item.id
            })
          })

          setdivisionList(Divisiondata)
          // setHospitalAddressList(DivisionHospitalAddressdata)
          setspecialityList(SpecialityListdata)
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getstatelist = async () => {
    try {
      setload(true);
      let mr = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser.api_token}`;
      const result = await axios
        .get('/user/master/state/list')
        .then(res => {
          console.log('getstatelist', res);
          let stateListData = [];
          if (res.data.length > 0) {
            res.data.map(item => {
              //   stateListData.push(item.name, item.id)
              console.log(item, 'itemitem')
              stateListData.push({
                title: item.name,
                id: item.id
              })
            })
          }
          setstatelist(stateListData);
          console.log(stateListData, 'stateList1')
          setload(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getcitylist = async (cityId) => {
    try {
      setload(true)
      let mr = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser.api_token}`;
      const result = await axios
        .post('/user/master/city/list', { state: cityId })
        .then(res => {
          console.log('getcitylist', res);
          let cityListData = [];
          if (res.data.length > 0) {
            res.data.map(item => {
              //   stateListData.push(item.name, item.id)
              console.log(item, 'itemitem')
              cityListData.push({
                title: item.name,
                id: item.id
              })
            })
          }
          setcitylist(cityListData);
          setload(false);
        });
    } catch (error) {
      setload(true);
      console.log(error);
    }
  };

  console.log(statelist && statelist, 'statelist ds')

  useEffect(() => {
    getstatelist();
    console.log(doctordata && doctordata, 'doctordata sddas')
  }, []);

  useEffect(() => {
    getdoctormasterlist()
  }, []);

  const handdlechange = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, response => {
      if (response.assets) {
        console.log(response, 'jdkas');
        setPhotoURI(response.assets[0].uri);
      }
    });
  };

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }

  const mainn = async () => {
    console.log('sdhiusahdi');
    setshow(true);
    await getdata();
    setprint(true);
    setprint1(true);
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
        if (ex) {
          const { code, message } = ex;
          console.warn(code, message);
          setError(code);
        } else {
          console.warn(ex);
        }
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
        console.log('res', res);

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
  };

  function handleOnPress(name) {
    setSelectedId(name)
    console.log("nammmmeeeee", name.formattedAddress)

  }

  return (
    <View style={{ flex: 1, backgroundColor: '#EAEAEA' }}>
      <StatusBar
        animated={true}
        backgroundColor="#008080"
        barStyle={statusBarStyle}
      />

      {/* Header */}
      <View style={{ width: '100%', backgroundColor: '#008080' }}>
        <View style={{ margin: 10, flexDirection: 'row', }}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ width: 23, height: 23 }}>
              <Icon3 name="chevron-back" style={{ fontSize: responsiveFontSize(3), color: "#f5f5dc" }} />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                color: '#f5f5dc',
                fontSize: responsiveFontSize(2),
                zIndex: 0,
                justifyContent: 'center',
                fontWeight: "600",
              }}>
              Add New Doctor Details
            </Text>
          </View>
        </View>
      </View>

      {
        mainload && mainload == true ?
          (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="#008080" animating={mainload} />
              <Text style={{ color: "#008080", fontSize: 10, }}>Doctor Details Added please wait...</Text>
            </View>
          ) :
          (
            <View style={{ flex: 1 }} >

              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{ margin: 10, }}>

                {/* Name */}
                <View style={{}}>
                  <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), paddingLeft: 3, fontWeight: "600", }}>
                    Name
                  </Text>
                  <View style={{ marginHorizontal: 4 }}>

                    <TextInput
                      placeholder="Enter Doctors Name"
                      placeholderTextColor={'#008080'}
                      value={doctordata?.doctor_name}
                      onChangeText={value => setdoctordata({ ...doctordata, doctor_name: value })}
                      style={{
                        width: '100%',
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        backgroundColor: "#f5f5dc",
                        paddingVertical: 5,
                        marginTop: 5,
                        color: "#6e6c69",
                        elevation: 5,
                        alignItems: "center",
                      }}
                    />
                  </View>
                  {formerror?.doctor_name ? (
                    <Text style={{ color: 'red', fontSize: 14, paddingLeft: 0, paddingTop: 5 }}>
                      {formerror?.doctor_name}
                    </Text>
                  ) : (
                    ''
                  )}
                </View>

                {/* Email */}
                <View
                  style={{
                    paddingTop: 13,
                  }}>
                  <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), paddingLeft: 3, fontWeight: "600" }}>
                    Email
                  </Text>
                  <View style={{ marginHorizontal: 4 }}>
                    <TextInput
                      placeholder="Enter Email Id"
                      placeholderTextColor={'#008080'}
                      value={doctordata?.email}
                      onChangeText={value => setdoctordata({ ...doctordata, email: value })}
                      style={{
                        width: '100%',

                        borderRadius: 5,
                        paddingHorizontal: 10,
                        backgroundColor: "#f5f5dc",
                        paddingVertical: 5,
                        marginTop: 5,
                        color: "#008080",
                        elevation: 5,
                        alignItems: "center",
                      }}
                    />
                  </View>
                  {formerror?.email ? (
                    <Text style={{ color: 'red', fontSize: 14, paddingLeft: 0, paddingTop: 5, backgroundColor: "#EAEAEA" }}>
                      {formerror?.email}
                    </Text>
                  ) : (
                    ''
                  )}
                </View>

                {/* Designation */}
                <View
                  style={{
                    paddingTop: 13
                  }}>
                  <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), paddingLeft: 3, fontWeight: "600" }}>
                    Designation
                  </Text>
                  <View style={{ marginHorizontal: 4 }}>
                    <TextInput
                      placeholder="Enter Address Details"
                      placeholderTextColor={'#008080'}
                      value={doctordata?.qualification}
                      onChangeText={value => setdoctordata({ ...doctordata, qualification: value })}
                      style={{
                        width: '100%',

                        borderRadius: 5,
                        paddingHorizontal: 10,
                        backgroundColor: "#f5f5dc",
                        paddingVertical: 5,
                        marginTop: 5,
                        color: "#008080",
                        elevation: 5,
                        alignItems: "center",

                      }}
                    />
                  </View>
                  {formerror?.address ? (
                    <Text style={{ color: 'red', fontSize: 14, paddingLeft: 0, paddingTop: 5 }}>
                      {formerror?.address}
                    </Text>
                  ) : (
                    ''
                  )}
                </View>

                {/* Mobile No. */}
                <View
                  style={{
                    paddingTop: 13
                  }}>
                  <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), paddingLeft: 3, fontWeight: "600" }}>
                    Mobile Number
                  </Text>
                  <View style={{ marginHorizontal: 4 }}>
                    <TextInput
                      placeholder="Enter  Mobile Number"
                      maxLength={10}
                      keyboardType="numeric"
                      placeholderTextColor={'#6F7074'}
                      value={doctordata?.mobile}
                      onChangeText={value => setdoctordata({ ...doctordata, mobile: value })}
                      style={{
                        width: '100%',

                        borderRadius: 5,
                        paddingHorizontal: 10,
                        backgroundColor: "#f5f5dc",
                        paddingVertical: 5,
                        marginTop: 5,
                        color: "#008080",
                        elevation: 5,
                      }}
                    />
                  </View>
                  {formerror?.mobile ? (
                    <Text style={{ color: 'red', fontSize: 13, paddingLeft: 0, paddingTop: 5 }}>
                      {formerror?.mobile}
                    </Text>
                  ) : (
                    ''
                  )}
                </View>

                {/* Address */}
                <View
                  style={{
                    paddingTop: 13
                  }}>
                  <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), paddingLeft: 3, fontWeight: "600" }}>
                    Address
                  </Text>
                  <View style={{ marginHorizontal: 4 }}>
                    <TextInput
                      placeholder="Enter  Address Details"
                      placeholderTextColor={'#6F7074'}
                      value={doctordata?.address}
                      onChangeText={value => setdoctordata({ ...doctordata, address: value })}
                      style={{
                        width: '100%',

                        borderRadius: 5,
                        paddingHorizontal: 10,
                        backgroundColor: "#f5f5dc",
                        paddingVertical: 5,
                        marginTop: 5,
                        elevation: 5,
                        color: "#008080",
                      }}
                    />
                  </View>
                  {formerror?.address ? (
                    <Text style={{ color: 'red', fontSize: 14, paddingLeft: 0, paddingTop: 5 }}>
                      {formerror?.address}
                    </Text>
                  ) : (
                    ''
                  )}
                </View>

                {/* Clinic address */}
                <View
                  style={{
                    paddingTop: 13
                  }}>
                  <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), paddingLeft: 3, fontWeight: "600" }}>
                    Clinic address
                  </Text>
                  <View style={{ marginHorizontal: 4 }}>
                    <TextInput
                      placeholder="Enter  Address Details"
                      placeholderTextColor={'#6F7074'}
                      value={doctordata?.clinic_address}
                      onChangeText={value => setdoctordata({ ...doctordata, clinic_address: value })}
                      style={{
                        width: '100%',

                        borderRadius: 5,
                        paddingHorizontal: 10,
                        backgroundColor: "#f5f5dc",
                        paddingVertical: 5,
                        marginTop: 5,
                        color: "#008080",
                        elevation: 5,
                      }}
                    />
                  </View>
                  {formerror?.address ? (
                    <Text style={{ color: 'red', fontSize: 14, paddingLeft: 0, paddingTop: 5 }}>
                      {formerror?.address}
                    </Text>
                  ) : (
                    ''
                  )}
                </View>

                {/* State */}
                <View style={{ fontSize: 16, paddingTop: 13 }}>

                  <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), paddingLeft: 3, fontWeight: "600" }}>
                    State
                  </Text>

                  <SelectDropdown
                    data={statelist && statelist}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, 'itemst')
                      setnewstatelist(selectedItem)
                      setdoctordata({ ...doctordata, state: selectedItem.id })
                      getcitylist(selectedItem.id)
                      setnewcitylist()
                    }}
                    defaultButtonText={'Select State'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown4BtnTxtStyle}

                    renderCustomizedButtonChild={(selectedItem, index) => {
                      return (
                        <View style={{}}>
                          <Text style={{ color: "grey", fontSize: 13 }}>{selectedItem ? selectedItem.title : 'Select State'}</Text>
                        </View>
                      );
                    }}
                    rowTextForSelection={(item, index) => {
                      return item
                    }}

                    renderCustomizedRowChild={(item) => {
                      return (
                        <View style={{ alignItems: "center", }}>
                          {load && load == true ?
                            <ActivityIndicator
                              size="small"
                              color="#7AAA4B"
                              animating={load}
                            />
                            :
                            <View style={{ alignItems: "center", }}>
                              <Text style={{ color: "#008080", fontSize: 15, }}>{item.title}</Text>
                            </View>
                          }
                        </View>
                      );
                    }}
                  />

                  {formerror?.state ? (
                    <Text style={{ color: '#008080', fontSize: 14, paddingLeft: 0, paddingTop: 5 }}>
                      {formerror?.state}
                    </Text>
                  ) : (
                    ''
                  )}
                </View>

                {/* City */}
                <View style={{ paddingTop: 13 }}>
                  <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), paddingLeft: 3, fontWeight: "600" }}>City</Text>
                  <SelectDropdown
                    data={citylist && citylist}
                    onSelect={(selectedItem, index) => {
                      setnewcitylist(selectedItem)
                      setdoctordata({ ...doctordata, city: selectedItem.id })
                      console.log(selectedItem, 'itemst')
                    }}

                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown4BtnTxtStyle}

                    renderCustomizedButtonChild={(selectedItem, index) => {
                      return (
                        <View style={{}}>

                          <Text style={{ color: "grey", fontSize: 13 }}>{selectedItem ? selectedItem.title : 'Select City'}</Text>

                        </View>
                      );
                    }}
                    rowTextForSelection={(item, index) => {
                      return item
                    }}
                    renderCustomizedRowChild={(item) => {
                      return (
                        <View style={{ alignItems: "center" }}>
                          {load && load == true ?
                            <View
                              style={{
                                flex: 1,
                                paddingTop: "30%",
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <ActivityIndicator size="large" color="#7AAA4B" animating={load} />
                            </View>
                            :
                            <View style={{ alignItems: "center" }}>
                              <Text style={{ color: "green", fontSize: 15, }}>{item.title}</Text>
                            </View>
                          }
                        </View>
                      );
                    }}
                  />

                  {formerror?.city ? (
                    <Text style={{ color: 'red', fontSize: 14, paddingLeft: 0, paddingTop: 5 }}>
                      {formerror?.city}
                    </Text>
                  ) : (
                    ''
                  )}
                </View>

                {/* Division */}
                <View style={{ fontSize: 16, paddingTop: 13 }}>
                  <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), paddingLeft: 3, fontWeight: "600" }}>
                    Division</Text>
                  <SelectDropdown
                    data={divisionList && divisionList}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, 'itemst')
                      setdivisionList(selectedItem)
                      setdoctordata({ ...doctordata, divsion: selectedItem.id })
                      // getcitylist(selectedItem.id)
                      // setnewcitylist()
                    }}
                    defaultButtonText={'Select State'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown4BtnTxtStyle}

                    renderCustomizedButtonChild={(selectedItem, index) => {
                      return (
                        <View style={{}}>
                          <Text style={{ color: "grey", fontSize: 13 }}>{selectedItem ? selectedItem.title : 'Select Division'}</Text>
                        </View>
                      );
                    }}
                    rowTextForSelection={(item, index) => {
                      return item
                    }}

                    renderCustomizedRowChild={(item) => {
                      return (
                        <View style={{ alignItems: "center" }}>
                          {load && load == true ?
                            <ActivityIndicator
                              size="small"
                              color="#008080"
                              animating={load}
                            />
                            :
                            <View style={{ alignItems: "center" }}>
                              <Text style={{ color: "#008080", fontSize: 15, }}>{item.title}</Text>
                            </View>
                          }
                        </View>
                      );
                    }}
                  />
                </View>

                {/* Hospital address */}
                <View style={{ marginTop: 10 }}>
                  <View style={{}}>
                    <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), paddingLeft: 3, fontWeight: "600" }}>
                      Hospital Address</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Hospitals")}
                    style={{
                      width: '97.8%',

                      borderRadius: 5,
                      paddingHorizontal: 7,
                      backgroundColor: "#f5f5dc",
                      paddingVertical: 10,
                      marginTop: 5,
                      color: "#008080",
                      elevation: 3,
                      marginHorizontal: 4,
                    }}
                  >

                    {

                      route.params?.item.id ?

                        <Text style={{
                          color: "#008080",
                          // paddingVertical: 8,
                          fontSize: 13,
                          // paddingLeft: 5
                        }}>

                          {route.params?.item.title ? route.params?.item.title : ''}
                        </Text>
                        :
                        <Text style={{
                          color: "#008080",
                          // paddingVertical: 8,
                          fontSize: responsiveFontSize(2),
                          // paddingLeft: 5,
                          // fontWeight: "500"
                        }}> Select Hospital
                        </Text>
                    }
                  </TouchableOpacity>
                </View>

                {/* Speciality */}
                <View style={{ fontSize: 16, paddingTop: 13, marginBottom: 50 }}>
                  <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), paddingLeft: 3, fontWeight: "600" }}>
                    Speciality
                  </Text>
                  <SelectDropdown
                    data={specialityList && specialityList}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, 'itemst')
                      setspecialityList(selectedItem)
                      setdoctordata({ ...doctordata, speciality: selectedItem.id })
                      // getcitylist(selectedItem.id)
                      // setnewcitylist()
                    }}
                    defaultButtonText={'Select State'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown4BtnTxtStyle}

                    search
                    searchInputStyle={styles.dropdown1searchInputStyleStyle}
                    searchPlaceHolder={'Search here'}
                    searchPlaceHolderColor={'darkgrey'}
                    renderSearchInputLeftIcon={() => {
                      return <FontAwesome name={'search'} color={'#008080'} size={18} />;
                    }}
                    renderCustomizedButtonChild={(selectedItem, index) => {
                      return (
                        <View style={{ backgroundColor: "#f5f5dc" }}>
                          <Text style={{ color: "grey", fontSize: 13 }}>{selectedItem ? selectedItem.title : 'Select Speciality'}</Text>
                        </View>
                      );
                    }}
                    rowTextForSelection={(item, index) => {
                      return item
                    }}

                    renderCustomizedRowChild={(item) => {
                      return (
                        <View style={{ alignItems: "center" }}>
                          {load && load == true ?
                            <ActivityIndicator
                              size="small"
                              color="#008080"
                              animating={load}
                            />
                            :
                            <View style={{ alignItems: "center", }}>
                              <Text style={{ color: "#008080", fontSize: 15, }}>{item.title}</Text>
                            </View>
                          }
                        </View>
                      );
                    }}
                  />
                </View>

              </ScrollView>

              {/* Submit */}
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  bottom: 15,
                  width: "100%",
                }}>
                <TouchableOpacity
                  onPress={() => sendata()}
                  style={{
                    backgroundColor: '#008080',
                    padding: 10,
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    elevation: 3,
                  }}>
                  <Text style={{ color: '#f5f5dc', fontSize: responsiveFontSize(2), paddingHorizontal: 35, fontWeight: "600" }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
      }
    </View>
  );
};

export default AddDoctorsForm;

const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    width: "97.8%",
    height: 40,
    backgroundColor: "#f5f5dc",
    borderRadius: 5,
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#008080",
    elevation: 4,
    marginHorizontal: 4,
  },
  dropdown4BtnTxtStyle: {
    fontSize: 13,
    textAlign: 'left',
  }
});
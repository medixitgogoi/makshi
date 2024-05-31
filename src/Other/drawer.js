import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Back from 'react-native-vector-icons/Ionicons';
import Dashboard from 'react-native-vector-icons/MaterialCommunityIcons';
import Logout from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Icon2 from 'react-native-vector-icons/dist/Octicons';
import Icon3 from 'react-native-vector-icons/dist/Ionicons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Todayvisit from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../navigation/StackNavigator'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import axios from 'axios'

function drawer(props) {
  const navigation = useNavigation();
  const [approveAuth, setApproveAuth] = useState();
  const [data, setdata] = useState('')
  const [item, setitem] = useState("")
  const { authContext, loginState, dispatch } = useContext(AuthContext);

  const closeMenu = () => {
    props.setdrawer(false);
  };

  const onMove = () => {
    props.setdrawer(false);
  };
  const logoutHandler = () => {
    authContext.signOut();
  };

  // const showdataa =async () => {
  //   let mr = await AsyncStorage.getItem('user');
  //   const modifiedUser = JSON.parse(mr);
  //   setdata(modifiedUser)
  //   console.log('drawer', modifiedUser);
  //    }

  const userAppload = async () => {
    try {
      let mr = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser.api_token}`;
      const result = await axios
        .get('/user/appload')
        .then(res => {
          console.log(res, 'ujhnh')
          setitem(res.data.Mr_Details)
          console.log("apploaddata", res)

        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userAppload();
    // console.log(apploaddata && apploaddata ,'');
  }, [])

  return (
    <>
      {props.drawer && (
        <Animatable.View
          animation="fadeInLeft"
          duration={100}
          style={styles.mainDrawerArea}>

          <View style={styles.drawerArea}>

            {/* Top */}
            <View
              style={{
                backgroundColor: '#008080',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 10,
                height: 160,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                width: "100%",
              }}>

              {/* logo */}
              <View
                style={{
                  borderRadius: 100,
                  overflow: 'hidden',
                  marginLeft: 3,
                  width: "40%",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Image
                  style={{ height: "70%", width: "100%" }}
                  source={{ uri: item?.photo }}
                />
              </View>

              {/* Employee details */}
              <View style={{ paddingVertical: 16, paddingHorizontal: 10, width: "60%", justifyContent: 'center', alignItems: 'flex-start', }}>
                <Text style={{ color: '#008080', fontSize: responsiveFontSize(2.2), fontWeight: 'bold', marginBottom: 4, paddingHorizontal: 5, paddingVertical: 1, borderRadius: 5, backgroundColor: "#F5F5DC", }}>{item?.name}</Text>
                <Text style={{ color: '#F5F5DC', fontSize: responsiveFontSize(1.9), fontWeight: '800', marginBottom: 4 }}>Emp id : {item?.emp_code}</Text>
                <Text style={{ color: '#F5F5DC', fontSize: responsiveFontSize(1.6), fontWeight: '400', width: "100%" }}>{item?.designation}</Text>
              </View>

            </View>

            {/* Bottom */}
            <View style={{ backgroundColor: "#fff", marginLeft: 2, }}>

              <View style={styles.menuBlock}>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}
                  style={styles.eachMenu}>
                  <View style={styles.iconStyle}>
                    <MaterialCommunityIcons
                      name="user-tie"
                      color="#008080"
                      style={{ fontSize: responsiveFontSize(1.8), }}
                    />
                  </View>
                  <Text style={styles.menuText}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('TodayVisit')}
                  style={styles.eachMenu}>
                  <View style={styles.iconStyle}>
                    <Todayvisit name="view-list" color="#008080" style={{ fontSize: responsiveFontSize(1.8), }} />
                  </View>
                  <Text style={styles.menuText}>Today's Visit</Text>
                </TouchableOpacity>

                {
                  item?.designation === "ZONAL BUSINESS MANAGER" ?
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Rbm', { item })}
                      style={styles.eachMenu}>
                      <View style={styles.iconStyle}>
                        <Icon name="user" color="#008080" style={{ fontSize: responsiveFontSize(1.8), }} />
                      </View>
                      <Text style={styles.menuText}>Juniors</Text>
                    </TouchableOpacity>
                    :
                    (
                      item?.designation === "REGIONAL BUSINESS MANAGER" ?

                        <TouchableOpacity
                          onPress={() => navigation.navigate('Abm', { item })}
                          style={styles.eachMenu}>
                          <Icon3 name="md-people-outline" style={{ fontSize: responsiveFontSize(1.8), color: "#008080" }} />
                          <Text style={styles.menuText}>Juniors</Text>
                        </TouchableOpacity>
                        :
                        item?.designation === "AREA BUSINESS MANAGER" ?
                          <TouchableOpacity
                            onPress={() => navigation.navigate('Sme', { item })}
                            style={styles.eachMenu}>
                            <Icon3 name="md-people-outline" style={{ fontSize: responsiveFontSize(1.8), color: "#008080" }} />
                            <Text style={styles.menuText}>Juniors</Text>
                          </TouchableOpacity>

                          :
                          <TouchableOpacity
                            onPress={() => navigation.navigate('DoctorLists', { item })}
                            style={styles.eachMenu}>
                            <View style={styles.iconStyle}>
                              <Fontisto name="doctor" style={{ fontSize: responsiveFontSize(1.8), color: "#008080" }} />
                            </View>
                            <Text style={styles.menuText}>Doctors</Text>
                          </TouchableOpacity>
                    )
                }

                <TouchableOpacity
                  onPress={() => navigation.navigate('AddDoctorsForm')}
                  style={styles.eachMenu}>
                  <View style={styles.iconStyle}>

                    <Fontisto name="doctor" style={{ fontSize: responsiveFontSize(1.8), color: "#008080" }} />
                  </View>
                  <Text style={styles.menuText}>Add Doctors</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Expanses')}
                  style={styles.eachMenu}>
                  <View style={styles.iconStyle}>

                    <Icon2 name="checklist" style={{ fontSize: responsiveFontSize(1.8), color: "#008080" }} />
                  </View>
                  <Text style={styles.menuText}>Expenses</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Leave')}
                  style={styles.eachMenu}>
                  <View style={styles.iconStyle}>
                    <Icon3 name="calendar" style={{ fontSize: responsiveFontSize(1.8), color: "#008080" }} />
                  </View>
                  <Text style={styles.menuText}>Leave</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => logoutHandler()}
                  style={styles.eachMenu}>
                  <View style={styles.iconStyle}>

                    <Logout name="logout" style={{ fontSize: responsiveFontSize(1.8), color: "#008080" }} />
                  </View>
                  <Text style={styles.menuText}>Logout</Text>
                </TouchableOpacity>

              </View>

            </View>

          </View>

          <TouchableOpacity
            style={styles.nonDrawer}
            onPress={() => props.setdrawer(false)}>
          </TouchableOpacity>

        </Animatable.View>
      )}
    </>
  );
}

export default drawer;

const styles = StyleSheet.create({

  mainDrawerArea: {
    height: windowHeight,
    backgroundColor: '#f9f9f966',
    width: windowWidth,
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    zIndex: 100,
  },

  nonDrawer: {
    width: '20%',
    height: '100%',
  },

  drawerArea: {
    backgroundColor: "#fff",
    width: '75%',
    height: '100%',
  },

  drawerAreaHead: {
    backgroundColor: 'blue',
    minHeight: 110,
  },

  UserBLock: {
    flexDirection: 'row',
    marginTop: -60,
    paddingLeft: 10,
  },

  userName: {
    fontWeight: '700',
    fontSize: 15,
    textTransform: 'uppercase',
    color: '#fff',
    letterSpacing: 2,
  },

  userEmail: {
    fontWeight: '500',
    fontSize: 12,
    color: '#fff',
  },

  menuBlock: {
    paddingTop: 10,
  },

  eachMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    paddingHorizontal: 10,
    margin: 4,
  },

  menuText: {
    fontSize: responsiveFontSize(1.8),
    paddingLeft: 10,
    fontWeight: '500',
    color: '#008080',
  },
  iconStyle: {
    borderColor: "#008080",
    borderWidth: 0.1,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5DC",
    width: 23,
    height: 23,
  }
});
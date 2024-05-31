import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, TouchableOpacity, } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/dist/SimpleLineIcons';
import Doctor from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/dist/Ionicons';
import Expenses from 'react-native-vector-icons/dist/Octicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { AuthContext } from '../../navigation/StackNavigator';

const Profile = (p) => {

  const { authContext } = useContext(AuthContext);

  const [statusBarStyle, setStatusBarStyle] = useState();
  const [data, setdata] = useState('');
  const navigation = useNavigation();

  const showdataa = async () => {
    let mr = await AsyncStorage.getItem('user');
    const modifiedUser = JSON.parse(mr);
    setdata(modifiedUser);
    console.log('drawer', data && data);
  }

  const logoutHandler = () => {
    authContext.signOut();
  };

  useEffect(() => {
    showdataa()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEAEA' }}>

      <StatusBar
        animated={true}
        backgroundColor="#008080"
        barStyle={statusBarStyle}
      />

      {/* Header */}
      <View style={{
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 8,
        alignItems: 'center',
        backgroundColor: '#008080',
        position: 'relative',
        zIndex: 20,
      }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ width: 23, height: 23 }}>
          <Icon3 name="chevron-back" style={{ fontSize: responsiveFontSize(3), color: "#f5f5dc" }} />
        </TouchableOpacity>
        <Text
          style={{
            color: '#f5f5dc',
            fontSize: responsiveFontSize(2),
            zIndex: 0,
            justifyContent: 'center',
            fontWeight: "600",
          }}>
          Profile
        </Text>
      </View>

      {/* Top */}
      <View style={{ backgroundColor: "#008080", height: "35%", position: "relative", width: "100%", flexDirection: "row", justifyContent: "center", borderBottomLeftRadius: 180, borderBottomRightRadius: 180 }}>

        <View style={{
          zIndex: 10, position: "absolute", top: -20, borderRadius: 20, width: "85%", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "center",
        }}>

          {/* Image */}
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 3, borderWidth: 0.5, borderColor: "#008080", borderRadius: 100, elevation: 5 }}>
            <Image
              style={{ height: 100, width: 100, borderRadius: 100, }}
              source={{ uri: data?.photo }}
            />
          </View>

          {/* Name */}
          <View style={{ marginBottom: 10, marginTop: 10, }}>
            <Text style={{ color: "#f5f5dc", fontSize: responsiveFontSize(2.3), fontWeight: '700' }}>
              {data && data.name}
            </Text>
          </View>

          {/* Designation */}
          <View style={{ marginBottom: 10, }}>
            <Text style={{ color: "#f5f5dc", fontSize: responsiveFontSize(1.9), fontWeight: '500' }}>
              {data && data.designation}
            </Text>
          </View>

          {/* Employee code */}
          <View style={{ flexDirection: "row", alignItems: "center", }}>
            <View style={{ justifyContent: 'center', backgroundColor: "#eaeaea", paddingHorizontal: 5, elevation: 3, borderRadius: 5, paddingVertical: 1, }}>
              <Text style={{ color: '#008080', fontSize: responsiveFontSize(1.6), fontWeight: "500" }}>
                Emp id
              </Text>
            </View>
            <Text style={{ color: "#f5f5dc", fontSize: responsiveFontSize(1.6), fontWeight: '500', marginLeft: 2, }}>
              : {data && data.emp_code}
            </Text>
          </View>

        </View>
      </View>

      {/* Profile links */}
      <View style={{ marginTop: 20, }}>

        <View style={{ paddingHorizontal: 13, }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DoctorList')}
            style={{
              flexDirection: 'row',
              width: "100%",
              padding: 7,
              borderRadius: 7,
              alignItems: 'center',
            }}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <TouchableOpacity style={{
                borderRadius: 100,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 33,
                height: 33,
                marginHorizontal: 5,
                backgroundColor: "#008080"
              }}>
                <Doctor
                  name="doctor"
                  style={{ color: "#f5f5dc", justifyContent: "center", alignItems: 'center', fontSize: responsiveFontSize(2), }}
                />
              </TouchableOpacity>
            </View>

            <View>
              <Text
                style={{
                  color: '#008080',
                  fontSize: responsiveFontSize(2.1),
                  fontWeight: '600',
                  marginLeft: 3,
                }}>
                Doctors
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 13, marginTop: 5, }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Expanses')}
            style={{
              flexDirection: 'row',
              width: "100%",
              // marginTop: 12,
              padding: 7,
              borderColor: '#008080',
              borderRadius: 7,
              alignItems: 'center',
            }}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <TouchableOpacity style={{
                borderRadius: 100,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 33,
                height: 33,
                marginHorizontal: 5,
                backgroundColor: "#008080"
              }} >
                <Expenses
                  name="checklist"
                  style={{ color: "#f5f5dc", justifyContent: "center", alignItems: 'center', fontSize: responsiveFontSize(2), }}
                />
              </TouchableOpacity>
            </View>

            <View>
              <Text
                style={{
                  color: '#008080',
                  fontSize: responsiveFontSize(2.1),
                  fontWeight: '600',
                  marginLeft: 3,
                }}>
                Expenses
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 13, marginTop: 5, }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Leave')}
            style={{
              flexDirection: 'row',
              width: "100%",
              padding: 7,
              borderColor: '#008080',
              borderRadius: 7,
              alignItems: 'center',
            }}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <TouchableOpacity style={{
                borderRadius: 100,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 33,
                height: 33,
                marginHorizontal: 5,
                backgroundColor: "#008080"
              }}>
                <Icon1
                  name="calendar"
                  style={{ color: "#f5f5dc", justifyContent: "center", alignItems: 'center', fontSize: responsiveFontSize(2), }}
                />
              </TouchableOpacity>
            </View>

            <View>
              <Text
                style={{
                  color: '#008080',
                  fontSize: responsiveFontSize(2.1),
                  fontWeight: '600',
                  marginLeft: 3,
                }}>
                Apply Leave
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 13, marginTop: 5, }}>
          <TouchableOpacity
            onPress={() => logoutHandler()}
            style={{
              flexDirection: 'row',
              width: "100%",
              padding: 7,
              borderColor: '#008080',
              borderRadius: 7,
              alignItems: 'center',
            }}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <TouchableOpacity style={{
                borderRadius: 100,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 33,
                height: 33,
                marginHorizontal: 5,
                backgroundColor: "#008080"
              }}>
                <Icon1
                  name="logout"
                  style={{ color: "#f5f5dc", justifyContent: "center", alignItems: 'center', fontSize: responsiveFontSize(2), }}
                />
              </TouchableOpacity>
            </View>

            <View>
              <Text
                style={{
                  color: '#008080',
                  fontSize: responsiveFontSize(2.1),
                  fontWeight: '600',
                  marginLeft: 3,
                }}>
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>

    </SafeAreaView>
  );
};

export default Profile;

//  <View style={{
//         paddingHorizontal: 10,
//       }}>
//         <View
//           style={{
//             borderRadius: 10,
//             backgroundColor: "#008080",
//             marginTop: 8,
//             paddingHorizontal: 10,
//             height: 120,
//             flexDirection: "row",
//             alignItems: 'center',
//             elevation: 5,
//             width: "100%",
//             paddingVertical: 4,
//           }}>

//           {/* Image */}
//           <View style={{ justifyContent: 'center', alignItems: 'center', width: "30%", height: "100%" }}>
//             <Image
//               style={{ height: 100, width: 100, borderRadius: 100 }}
//               source={{ uri: data?.photo }}
//             />
//           </View>

//           {/* Details */}
//           <View style={{ paddingHorizontal: 15, flexDirection: "column", height: "100%", width: "70%", justifyContent: "center", }}>

//             <View style={{ marginBottom: 3, }}>
//               <Text style={{ color: "#F5F5DC", fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>
//                 {data && data.name}
//               </Text>
//             </View>

//             <View style={{ marginBottom: 3, }}>
//               <Text style={{ color: "#F5F5DC", fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>
//                 {data && data.designation}
//               </Text>
//             </View>

//             <View>
//               <Text style={{ color: "#F5F5DC", fontSize: responsiveFontSize(1.5), fontWeight: '400' }}>
//                 {data && data.emp_code}
//               </Text>
//             </View>

//           </View>

//         </View>

//       </View>

//       <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
//         <View style={{ paddingHorizontal: 10, marginTop: 2, width: "45%" }}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('DoctorList')}
//             style={{
//               flexDirection: 'row',
//               width: "100%",
//               marginTop: 12,
//               padding: 7,
//               borderRadius: 7,
//               alignItems: 'center',
//               backgroundColor: '#F5F5DC',
//               elevation: 5,
//               justifyContent: "center",
//             }}>
//             <View style={{ alignItems: 'center', flexDirection: 'row' }}>
//               <TouchableOpacity >
//                 <Doctor
//                   name="doctor"
//                   style={{
//                     fontSize: responsiveFontSize(1.5),
//                     color: '#F5F5DC',
//                     backgroundColor: "#008080",
//                     padding: 6,
//                     borderRadius: 100,
//                   }}
//                 />
//               </TouchableOpacity>
//             </View>

//             <View>
//               <Text
//                 style={{
//                   color: '#008080',
//                   fontSize: responsiveFontSize(1.7),
//                   fontWeight: '600',
//                   marginLeft: 7,
//                 }}>
//                 Doctors
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         <View style={{ paddingHorizontal: 10, marginTop: 2, width: "45%" }}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Expanses')}
//             style={{
//               flexDirection: 'row',
//               width: "100%",
//               marginTop: 12,
//               padding: 7,
//               borderColor: '#008080',
//               borderRadius: 7,
//               alignItems: 'center',
//               backgroundColor: '#F5F5DC',
//               elevation: 5,
//               justifyContent: "center",
//             }}>
//             <View style={{ alignItems: 'center', flexDirection: 'row' }}>
//               <TouchableOpacity >
//                 <Expenses
//                   name="checklist"
//                   style={{
//                     fontSize: responsiveFontSize(1.5),
//                     color: '#F5F5DC',
//                     backgroundColor: "#008080",
//                     padding: 6,
//                     borderRadius: 100,
//                   }}
//                 />
//               </TouchableOpacity>
//             </View>

//             <View>
//               <Text
//                 style={{
//                   color: '#008080',
//                   fontSize: responsiveFontSize(1.7),
//                   fontWeight: '600',
//                   marginLeft: 7,
//                 }}>
//                 Expenses
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         <View style={{ paddingHorizontal: 10, marginTop: 2, width: "45%" }}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Leave')}
//             style={{
//               flexDirection: 'row',
//               width: "100%",
//               marginTop: 12,
//               padding: 7,
//               borderColor: '#008080',
//               borderRadius: 7,
//               alignItems: 'center',
//               backgroundColor: '#F5F5DC',
//               elevation: 5,
//               justifyContent: "center",
//             }}>
//             <View style={{ alignItems: 'center', flexDirection: 'row' }}>
//               <TouchableOpacity >
//                 <Icon1
//                   name="calendar"
//                   style={{
//                     fontSize: responsiveFontSize(1.5),
//                     color: '#F5F5DC',
//                     backgroundColor: "#008080",
//                     padding: 6,
//                     borderRadius: 100,
//                   }}
//                 />
//               </TouchableOpacity>
//             </View>

//             <View>
//               <Text
//                 style={{
//                   color: '#008080',
//                   fontSize: responsiveFontSize(1.7),
//                   fontWeight: '600',
//                   marginLeft: 7,
//                 }}>
//                 Apply Leave
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         <View style={{ paddingHorizontal: 10, marginTop: 2, width: "45%" }}>
//           <TouchableOpacity
//             onPress={() => logoutHandler()}
//             style={{
//               flexDirection: 'row',
//               width: "100%",
//               marginTop: 12,
//               padding: 7,
//               borderColor: '#008080',
//               borderRadius: 7,
//               alignItems: 'center',
//               backgroundColor: '#F5F5DC',
//               elevation: 5,
//               justifyContent: "center",
//             }}>
//             <View style={{ alignItems: 'center', flexDirection: 'row' }}>
//               <TouchableOpacity>
//                 <Icon1
//                   name="logout"
//                   style={{
//                     fontSize: responsiveFontSize(1.5),
//                     color: '#F5F5DC',
//                     backgroundColor: "#008080",
//                     padding: 6,
//                     borderRadius: 100,
//                   }}
//                 />
//               </TouchableOpacity>
//             </View>

//             <View>
//               <Text
//                 style={{
//                   color: '#008080',
//                   fontSize: responsiveFontSize(1.7),
//                   fontWeight: '600',
//                   marginLeft: 7,
//                 }}>
//                 Log Out
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//       </View>
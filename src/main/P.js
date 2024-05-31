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
  SafeAreaView,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  TextInput,
  Alert,
  FlatList
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geocoder from 'react-native-geocoder';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/dist/Fontisto';
import Icon11 from 'react-native-vector-icons/dist/Entypo';
import GetLocation, {
  Location,
  LocationError,
  LocationErrorCode,
} from 'react-native-get-location';
import Bar from '../../component/Bar';
import HeaderOnly from '../../Other/Header';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Doctor from 'react-native-vector-icons/dist/Fontisto';
import Mr from 'react-native-vector-icons/dist/Feather';
import Datee from 'react-native-vector-icons/dist/MaterialIcons';
const windowHeight = Dimensions.get('window').height;

const Dashboard = () => {
  const [statusBarStyle, setStatusBarStyle] = useState();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [data, setdata] = useState('');
  const [data1, setdata1] = useState('');
  const [addres, setadd] = useState('');
  const [modal, setmodal] = useState(false);
  const [contavtt, setcontavtt] = useState(false);
  const [show, setshow] = useState(false);
  const navigation = useNavigation();
  const[listt,setlist]=useState('')


  const [load, setload] = useState(false);



  const getData = async () => {
    try{
      let mr = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser.api_token}`;
      const result = await axios.get('/user/doctor/follow_up/today/list')
      .then((res)=>{ 
        setlist(res.data.data);
        console.log("listdata" , res.data.data);
      })
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(()=>{
    getData()
  },[])



  //location
  const mainn = async () => {
    console.log('sdhiusahdi');
    setmodal(true);
    setshow(true);
    await getdata();
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
        //  GetLocation.getCurrentPosition();
        // if (ex) {
        //   console.log("ggggex",ex);
        //   const {code, message} = ex;
        //   console.warn(code, message);
        //   setError(code);
        //   Linking.openSettings()
        // } else {
        //   console.log(ex);
        // }
        // alert("turn on ypur location");
        // Linking.openSettings()
        // Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS')

        Alert.alert('Alert Title', 'Turn on your Location', [
          {
            text: 'press here',
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        animated={true}
        backgroundColor="#398337"
        barStyle={statusBarStyle}
      />
      <HeaderOnly />
      

      <View style={{marginBottom: 9}}>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.item}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <Icon11 name="list" style={{fontSize: 20}} />
              </View>

              <View style={{padding: 5}}>
                <Text style={{color: '#fff', fontSize: 16}}>TODAYS</Text>
              </View>
            </View>
            <Text style={{color: '#fff'}}>VISITS</Text>
          </View>
          <View style={styles.item1}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <Icon11 name="list" style={{fontSize: 20}} />
              </View>

              <View style={{padding: 5}}>
                <Text style={{color: '#fff', fontSize: 16}}>ALL</Text>
              </View>
            </View>
            <Text style={{color: '#fff'}}>VISITS</Text>
          </View>

          <View style={styles.item2}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <Icon11 name="list" style={{fontSize: 20}} />
              </View>

              <View style={{padding: 5}}>
                <Text style={{color: '#fff', fontSize: 16}}>travell</Text>
              </View>
            </View>
            <Text style={{color: '#fff'}}>pollab</Text>
          </View>
          <View style={styles.item3}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <Icon11 name="list" style={{fontSize: 20}} />
              </View>

              <View style={{padding: 5}}>
                <Text style={{color: '#fff', fontSize: 16}}>travell</Text>
              </View>
            </View>
            <Text style={{color: '#fff'}}>pollab</Text>
          </View>
        </View>

        <View style={{marginHorizontal: 13, marginTop: 5}}>
          <View
            style={{
              backgroundColor: '#e6e6e9',
              flexDirection: 'row',
              width: '100%',
              borderColor: 'grey',
              padding: 7,
              paddingHorizontal: 10,
              borderRadius: 11,
              alignItems: 'center',
            }}>
            <View style={{}}>
              <Icon2
                style={{color: '#515352', fontSize: 14}}
                name="format-list-checkbox"
              />
            </View>
            <View style={{marginHorizontal: 5}}>
              <Text style={{color: '#515352', fontSize: 17}}>Doctors List</Text>
            </View>
          </View>
        </View>

        <View style={{marginHorizontal: 13, marginTop: 3}}>

  




        <View
        style={{
          flexDirection: 'column',
          borderRadius: 20,
          backgroundColor: '#f1f1f1',
          paddingVertical:10,
          backgroundColor: '#e6e6e9',
          marginTop: 5,
        }}>
        <View
          style={{
            flexDirection: "column",  
            padding:0
          }}>
       



          <View style={{paddingHorizontal: 20,marginTop:10,}}>
          <TouchableOpacity
          onPress={() => navigation.navigate('Expanses')}
            style={{
              flexDirection: 'row',
              width:"100%",
              marginTop: 1,
              padding: 5,
              borderBottomWidth: 0.65,
              borderBottomColor: '#b3b7bb',
              alignItems: 'center',
              
            }}>
            <View style={{alignItems: 'center', flexDirection: 'row',
             backgroundColor: '#fff',
             width:25,
             borderRadius:50, alignItems:"center"
            }}>
             
                <Doctor
                  name="doctor"
                  style={{
                    fontSize: 16,
                    paddingHorizontal: 1,
                    paddingVertical: 5,
                    color: 'green',
                    alignItems:"center",
                   paddingLeft:5
                  }}
                />
            
            </View>
  
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: '300',
                  paddingLeft: 7,
                }}>
                DR POLLAB KUMAR
              </Text>
            </View>
          </TouchableOpacity>
        </View>

          <View style={{margin:17,paddingLeft:5}}>


          <View style={{flexDirection:"row"}}>  
          <View 
          style={{alignItems:"center",justifyContent:"center",
                       
          }}
          >
          <Mr
          style={{alignItems:"center",fontSize:18,color:"#fff"}}
          name="user"/>  
          </View>     
          <View style={{paddingLeft:7}}>
          <Text
            style={{
              color: '#404141',
              fontSize: 14,
              fontWeight: '300',
              marginTop: 2,
            }}>
           MRINAL BORA
          </Text>              
          
          </View>
          </View>

          <View style={{flexDirection:"row",alignItems:"center",marginTop:6}}>  
          <View 
          style={{alignItems:"center",justifyContent:"center",
                       
          }}
          >
          <Datee
          style={{alignItems:"center",fontSize:17,color:"#fff",}}
          name="date-range"/>  
          </View>     
          <View  style={{paddingLeft:7}}>
          <Text
            style={{
              color: '#404141',
              fontSize: 14,
              fontWeight: '300',
              marginTop: 2,
            }}>
           19-09-2023
          </Text>              
          
          </View>
          </View>

          <View style={{flexDirection:"row",marginTop:6}}>  
          
          <View>
          <Text
            style={{
              color: '#404141',
              fontSize: 14,
              fontWeight: '300',
              marginTop: 2,
            }}>
            IELTS examiners follow strict procedures, however, they are human
            so there is always going to be a subjective element.
           
          </Text>              
          
          </View>
          </View>
          </View>
        </View>

        <View style={{width: '100%', flexDirection: 'row', marginTop: 10,paddingHorizontal:10}}>
          <View
            style={{
              width: '50%',
              backgroundColor: '#7AAA4B',
              borderRadius: 20,
            }}>
            <TouchableOpacity
              onPress={() => dialCall()}
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
              // paddingLeft:30
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => mainn()}>
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





          <View
            style={{
              flexDirection: 'column',
              borderRadius: 20,
              backgroundColor: '#f1f1f1',
              padding: 7,
              backgroundColor: '#e6e6e9',
              marginTop: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 22,
              }}>
              <View style={{borderRadius: 90, alignItems: 'center'}}>
                <Image
                  style={{
                    height: 87,
                    width: 87,
                    borderRadius: 80,
                    marginRight: 19,
                  }}
                  source={require('../../assets/doctor.jpg')}
                />
              </View>

              <View style={{paddingLeft: 13}}>
                <Text
                  style={{
                    color: '#56575a',
                    fontSize: 17,
                    fontWeight: '500',
                    marginTop: 2,
                  }}>
                  ANJON BORAfffgfgfddfgfdgdfgdg
                </Text>

                <Text
                  style={{
                    color: '#56575a',
                    fontSize: 15,
                    fontWeight: '400',
                    paddingTop: 5,
                  }}>
                  MBBS,MD, ADC{' '}
                </Text>

                <Text
                  style={{
                    color: '#56575a',
                    fontSize: 14,
                    fontWeight: '400',
                    paddingTop: 5,
                  }}>
                  Guwahati , Assam{' '}
                </Text>
              </View>
            </View>

            <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
              <View
                style={{
                  width: '50%',
                  backgroundColor: '#7AAA4B',
                  borderRadius: 20,
                }}>
                <TouchableOpacity
                  onPress={() => dialCall()}
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
                  // paddingLeft:30
                }}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => mainn()}>
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

          <View
            style={{
              flexDirection: 'column',
              borderRadius: 20,
              backgroundColor: '#f1f1f1',
              padding: 7,
              backgroundColor: '#e6e6e9',
              marginTop: 7,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 22,
              }}>
              <View style={{borderRadius: 90, alignItems: 'center'}}>
                <Image
                  style={{
                    height: 87,
                    width: 87,
                    borderRadius: 80,
                    marginRight: 19,
                  }}
                  source={require('../../assets/doctor.jpg')}
                />
              </View>

              <View style={{paddingLeft: 13}}>
                <Text
                  style={{
                    color: '#56575a',
                    fontSize: 17,
                    fontWeight: '500',
                    marginTop: 2,
                  }}>
                  ANJON BORA
                </Text>

                <Text
                  style={{
                    color: '#56575a',
                    fontSize: 15,
                    fontWeight: '400',
                    paddingTop: 5,
                  }}>
                  MBBS,MD, ADC{' '}
                </Text>

                <Text
                  style={{
                    color: '#56575a',
                    fontSize: 14,
                    fontWeight: '400',
                    paddingTop: 5,
                  }}>
                  Guwahati , Assam{' '}
                </Text>
              </View>
            </View>

            <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
              <View
                style={{
                  width: '50%',
                  backgroundColor: '#7AAA4B',
                  borderRadius: 20,
                }}>
                <TouchableOpacity
                  onPress={() => dialCall()}
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
                  // paddingLeft:30
                }}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => mainn()}>
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

          <View
            style={{
              flexDirection: 'column',
              borderRadius: 20,
              backgroundColor: '#f1f1f1',
              padding: 7,
              backgroundColor: '#e6e6e9',
              marginTop: 7,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 22,
              }}>
              <View style={{borderRadius: 90, alignItems: 'center'}}>
                <Image
                  style={{
                    height: 87,
                    width: 87,
                    borderRadius: 80,
                    marginRight: 19,
                  }}
                  source={require('../../assets/doctor.jpg')}
                />
              </View>

              <View style={{paddingLeft: 13}}>
                <Text
                  style={{
                    color: '#56575a',
                    fontSize: 17,
                    fontWeight: '500',
                    marginTop: 2,
                  }}>
                  ANJON BORA
                </Text>

                <Text
                  style={{
                    color: '#56575a',
                    fontSize: 15,
                    fontWeight: '400',
                    paddingTop: 5,
                  }}>
                  MBBS,MD, ADC{' '}
                </Text>

                <Text
                  style={{
                    color: '#56575a',
                    fontSize: 14,
                    fontWeight: '400',
                    paddingTop: 5,
                  }}>
                  Guwahati , Assam{' '}
                </Text>
              </View>
            </View>

            <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
              <View
                style={{
                  width: '50%',
                  backgroundColor: '#7AAA4B',
                  borderRadius: 20,
                }}>
                <TouchableOpacity
                  onPress={() => dialCall()}
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
                  // paddingLeft:30
                }}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => mainn()}>
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

          <View
            style={{
              flexDirection: 'column',
              borderRadius: 20,
              backgroundColor: '#f1f1f1',
              padding: 7,
              // borderWidth: 1,
              // borderColor: '#3a843a',
              backgroundColor: '#e6e6e9',
              marginTop: 7,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 22,
              }}>
              <View style={{borderRadius: 90, alignItems: 'center'}}>
                <Image
                  style={{
                    height: 87,
                    width: 87,
                    borderRadius: 80,
                    marginRight: 19,
                  }}
                  source={require('../../assets/doctor.jpg')}
                />
              </View>

              <View style={{paddingLeft: 13}}>
                <Text
                  style={{
                    color: '#56575a',
                    fontSize: 17,
                    fontWeight: '500',
                    marginTop: 2,
                  }}>
                  ANJON BORA
                </Text>

                <Text
                  style={{
                    color: '#56575a',
                    fontSize: 15,
                    fontWeight: '400',
                    paddingTop: 5,
                  }}>
                  MBBS,MD, ADC{' '}
                </Text>

                <Text
                  style={{
                    color: '#56575a',
                    fontSize: 14,
                    fontWeight: '400',
                    paddingTop: 5,
                  }}>
                  Guwahati , Assam{' '}
                </Text>
              </View>
            </View>

            <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
              <View
                style={{
                  width: '50%',
                  backgroundColor: '#7AAA4B',
                  borderRadius: 20,
                }}>
                <TouchableOpacity
                  onPress={() => dialCall()}
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
                  // paddingLeft:30
                }}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => mainn()}>
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

          <View
            style={{
              flexDirection: 'column',
              borderRadius: 20,
              backgroundColor: '#f1f1f1',
              padding: 7,
              // borderWidth: 1,
              // borderColor: '#3a843a',
              backgroundColor: '#e6e6e9',
              marginTop: 7,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 22,
              }}>
              <View style={{borderRadius: 90, alignItems: 'center'}}>
                <Image
                  style={{
                    height: 87,
                    width: 87,
                    borderRadius: 80,
                    marginRight: 19,
                  }}
                  source={require('../../assets/doctor.jpg')}
                />
              </View>

              <View style={{paddingLeft: 13}}>
                <Text
                  style={{
                    color: '#56575a',
                    fontSize: 17,
                    fontWeight: '500',
                    marginTop: 2,
                  }}>
                  ANJON BORA
                </Text>

                <Text
                  style={{
                    color: '#56575a',
                    fontSize: 15,
                    fontWeight: '400',
                    paddingTop: 5,
                  }}>
                  MBBS,MD, ADC{' '}
                </Text>

                <Text
                  style={{
                    color: '#56575a',
                    fontSize: 14,
                    fontWeight: '400',
                    paddingTop: 5,
                  }}>
                  Guwahati , Assam{' '}
                </Text>
              </View>
            </View>

            <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
              <View
                style={{
                  width: '50%',
                  backgroundColor: '#7AAA4B',
                  borderRadius: 20,
                }}>
                <TouchableOpacity
                  onPress={() => dialCall()}
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
                  // paddingLeft:30
                }}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => mainn()}>
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
      </View>
      
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
                // alignItems: 'center',
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
              <View style={{}}>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 16,
                  }}>
                  Choose Your Current Location
                </Text>
              </View>

              {show && show == true ? (
                <View
                  style={{
                    flexDirection: 'column',
                    // height: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator
                    size="large"
                    color="#7AAA4B"
                    animating={show}
                  />
                </View>
              ) : (
                <ScrollView style={{marginTop: 7}}>
                  {addres &&
                    addres.map(item => {
                      return (
                        <TouchableOpacity
                          style={{marginTop: 7, marginHorizontal: 5}}>
                          <Text
                            style={{
                              color: '#56575a',
                              marginBottom: 13,
                              backgroundColor: '#e6e6e9',
                              padding: 11,
                              borderRadius: 12,
                              fontSize: 15,
                            }}>
                            {item.formattedAddress}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                </ScrollView>
              )}
              <View style={{}}>
                <TextInput
                  placeholder="Remark"
                  multiline={true}
                  numberOfLines={2}
                  placeholderTextColor="#808387"
                  style={{
                    borderColor: '#378134',
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 4,
                    marginHorizontal: 8,
                    fontSize: 14,
                    paddingLeft: 5,
                    color: 'grey',
                    paddingLeft: 9,
                  }}
                />
              </View>

              <View
                style={{width: '100%', flexDirection: 'row', paddingTop: 25}}>
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
                  <TouchableOpacity style={{}} onPress={() => setmodal(false)}>
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
      ) : null}
    </SafeAreaView>
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
    color: 'red',
    fontSize: 25,
    backgroundColor: '#56575a',
    margin: 6,
    padding: 5,
    width: '45%',
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item1: {
    color: 'red',
    fontSize: 25,
    backgroundColor: '#74ad3e',
    margin: 6,
    padding: 5,
    width: '45%',
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item2: {
    color: 'red',
    fontSize: 25,
    backgroundColor: '#74ad3e',
    margin: 6,
    padding: 5,
    width: '45%',
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item3: {
    color: 'red',
    fontSize: 25,
    backgroundColor: '#56575a',
    margin: 6,
    padding: 5,
    width: '45%',
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const styless = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

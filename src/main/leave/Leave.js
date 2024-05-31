import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/Ionicons';
import One from './One';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Startdateicon from 'react-native-vector-icons/dist/Fontisto';
import Expensenameicon from 'react-native-vector-icons/dist/Ionicons';
import Remarkicon from 'react-native-vector-icons/dist/SimpleLineIcons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

const Leave = () => {

  const [statusBarStyle, setStatusBarStyle] = useState();
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const [openleavemodel, setOpenleavemodel] = useState(false);
  const [getdata, setgetdata] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const [textstate, settextstate] = useState({
    textShown: -1,
  });

  const toggleNumberOfLines = index => {
    settextstate({
      textShown: textstate.textShown === index ? -1 : index,
    });
  };

  // console.log(textstate, 'textstate');

  const getleavedata = async () => {
    try {
      setOpenleavemodel(true);
      let mr = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser.api_token}`;
      const result = await axios.get('/user/leave/list').then(res => {
        setgetdata(res.data);
        console.log(res, 'getleave');
        setOpenleavemodel(false);
      });
    } catch (error) {
      console.log(error)
    }
  };

  const newwdate = getdata && getdata.created_at;
  console.log('newwdate', newwdate);

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
    getleavedata();
  }, []);

  const onRefresh = () => {
    getleavedata()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEAEA' }}>
      <StatusBar
        animated={true}
        backgroundColor="#008080"
        barStyle={statusBarStyle}
      />

      {/* header */}
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
          Leave
        </Text>
      </View>

      {/* sub header */}
      <View style={{ marginHorizontal: 10, marginVertical: 8 }}>

        <View
          style={{
            fontWeight: 300,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: "100%",
            alignItems: "center",
          }}>
          <View style={{}}>
            <Text style={{ color: '#008080', fontSize: responsiveFontSize(2.3), fontWeight: "600" }}>Find your leaves here</Text>
          </View>

          <View style={{}}>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={{
                borderRadius: 20,
                padding: 6,
                alignItems: 'center',
                backgroundColor: '#008080',
                paddingHorizontal: 16,
                elevation: 6,
              }}>
              <Text style={{ color: '#f5f5dc', fontSize: responsiveFontSize(1.7) }}>
                Apply For Leaves
              </Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>

      {/* One */}
      <View style={{ marginTop: 0, }}>
        <One open={open} setOpen={setOpen} getleavedata={getleavedata} />
      </View>

      {openleavemodel && openleavemodel == true ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#008080' }}>Please wait..</Text>
          <ActivityIndicator
            size="large"
            color="#008080"
            animating={openleavemodel}
          />
        </View>
      ) : (
        <FlatList
          data={getdata?.length > 0 ? getdata : ''}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#008080']}
            />
          }
          ListEmptyComponent={EmptyListMessage}
          renderItem={({ item, index }) => (

            <View style={{ marginHorizontal: 10, marginBottom: 7 }}>

              <View
                style={{
                  flexDirection: 'column',
                  borderRadius: 7,
                  backgroundColor: '#f5f5dc',
                  padding: 10,
                  elevation: 3,
                }}
              >
                <View>

                  {/* Top */}
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '90%',
                        }}
                      >
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
                          <Expensenameicon
                            style={{
                              fontSize: responsiveFontSize(1.8),
                              justifyContent: 'center',
                              color: '#f5f5dc',
                            }}
                            name="md-list-outline"
                          />
                        </View>

                        <View
                          style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingLeft: 3,
                            width: "100%",
                          }}
                        >
                          <Text
                            style={{
                              color: '#008080',
                              fontSize: responsiveFontSize(2),
                              alignItems: 'center',
                            }}
                          >
                            {item?.heading}
                          </Text>

                          <View
                            style={{ justifyContent: "center" }}
                          >
                            {item?.status == 1 ? (
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: '#e4da37',
                                  borderRadius: 15,
                                  elevation: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    color: '#000',
                                    paddingHorizontal: 11,
                                    fontSize: responsiveFontSize(1.40),
                                    paddingVertical: 3,
                                  }}
                                >
                                  Pending
                                </Text>
                              </View>
                            ) : item?.status == 2 ? (
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: 'green',
                                  borderRadius: 15,
                                  elevation: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    color: '#fff',
                                    paddingHorizontal: 8,
                                    fontSize: responsiveFontSize(1.40),
                                    paddingVertical: 4,
                                  }}
                                >
                                  Accepted
                                </Text>
                              </View>
                            ) : (
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: 'red',
                                  borderRadius: 15,
                                  elevation: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    color: '#fff',
                                    paddingHorizontal: 8,
                                    fontSize: responsiveFontSize(1.40),
                                    paddingVertical: 3,
                                  }}
                                >
                                  Rejected{' '}
                                </Text>
                              </View>
                            )}
                          </View>

                        </View>

                      </View>
                    </View>
                  </View>

                  {/* Remarks */}
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 5,
                    }}
                  >
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
                      <Remarkicon
                        style={{ fontSize: responsiveFontSize(1.5), color: '#f5f5dc' }}
                        name="note"
                      />
                    </View>

                    <View style={{ justifyContent: 'center', width: "95%", }}>
                      <Text
                        style={{
                          color: '#008080',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: responsiveFontSize(1.85),
                          paddingLeft: 3,

                        }}
                        numberOfLines={
                          textstate.textShown === index ? undefined : 1
                        }
                      >
                        {item?.remarks}
                      </Text>
                      {item?.remarks?.length > 75 ? (
                        <Text
                          onPress={() => toggleNumberOfLines(index)}
                          style={{ color: '#a9a9a9', fontSize: 13 }}
                        >
                          {textstate.textShown === index
                            ? 'read less...'
                            : 'read more...'}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>

                  </View>

                  {/* Date */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: 3,
                      }}
                    >
                      <View style={{ justifyContent: 'center', backgroundColor: "#eaeaea", paddingHorizontal: 3, elevation: 3, borderRadius: 5, }}>
                        <Text style={{ color: '#008080', fontSize: responsiveFontSize(1.7), }}>From</Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                          paddingLeft: 4,
                        }}
                      >
                        <View style={{ justifyContent: 'center' }}>
                          <Text style={{ fontSize: responsiveFontSize(1.85), color: '#008080' }}>
                            : {item?.date_from}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        paddingTop: 5,
                        padding: 3,
                        paddingTop: 6,
                      }}
                    >
                      <View style={{ justifyContent: 'center', backgroundColor: "#eaeaea", paddingHorizontal: 3, elevation: 3, borderRadius: 5, }}>
                        <Text style={{ color: '#008080', fontSize: responsiveFontSize(1.7), }}>To</Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                          paddingLeft: 4,
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: responsiveFontSize(1.85), color: '#008080', alignItems: "center" }}>
                            : {item?.date_to}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Applied Date */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: "space-between",
                      marginHorizontal: 3,
                    }}
                  >
                    <View style={{ marginVertical: 10, flexDirection: "row" }}>
                      <View style={{ justifyContent: 'center', backgroundColor: "#eaeaea", paddingHorizontal: 3, elevation: 3, borderRadius: 5, }}>
                        <Text style={{ color: '#008080', fontSize: responsiveFontSize(1.5), }}>
                          Applied Date
                        </Text>
                      </View>
                      <Text style={{ color: "#008080" }}>
                        {" "}: {new Date(item.created_at).toLocaleDateString("pt-PT", {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </Text>
                    </View>

                  </View>

                </View>
              </View>

            </View>

          )}
        />
      )}
    </SafeAreaView>

  );
};

export default Leave;
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    TextInput,
    FlatList,
    Linking,
    RefreshControl,
    Image,
    ActivityIndicator

} from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import Doctor from 'react-native-vector-icons/dist/Fontisto';
import Email from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Location from 'react-native-vector-icons/dist/Ionicons';
import Icon1 from 'react-native-vector-icons/dist/EvilIcons';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import AsyncStorage from '@react-native-async-storage/async-storage';
const DoctorLists = ({ route }) => {
    const [statusBarStyle, setStatusBarStyle] = useState();
    const navigation = useNavigation();
    const [newPagedataFour, setnewPagedataFour] = useState()
    const [doctors, setdoctors] = useState();
    const [search, setSearch] = useState('');
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [load, setload] = useState(false);
    console.log(route, 'foo')


    const getdoctor = async () => {
        try {
            setload(true);
            let mr = await AsyncStorage.getItem('user');
            const modifiedUser = JSON.parse(mr);
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${modifiedUser.api_token}`;
            const result = await axios
                .post(`/user/doctor/list`, { user_id: route.params?.item.id })
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

    const searchFilterFunction = (text) => {
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

    const dialCall = mobile => {
        console.log(mobile);
        Linking.openURL(`tel:${mobile}`);
    };

    useEffect(() => {
        getdoctor()
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor="#398337"
                barStyle={statusBarStyle}
            />

            <View style={{

                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingVertical: 11,
                alignItems: 'center',
                backgroundColor: '#398337',
                elevation: 20,
                position: 'relative',
                zIndex: 20,
                alignItems: "center"
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ width: 30, height: 25 }}>
                    <Icon name="ios-arrow-back-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <Text
                    style={{
                        color: '#fff',
                        fontSize: responsiveFontSize(2.30),
                        zIndex: 0,
                        justifyContent: 'center',
                    }}>
                    Doctor Lists
                </Text>
            </View>

            <View style={{ marginHorizontal: 9, marginTop: 5 }}>
                <View
                    style={{
                        backgroundColor: '#e6e6e9',
                        width: '100%',
                        height: 40,
                        borderRadius: 19,
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'relative',
                        borderColor: 'grey',
                        borderWidth: 0.5,
                        paddingHorizontal: 10
                    }}>
                    <View
                        style={{
                            width: 25,
                            height: 25,
                            backgroundColor: '#7b7978',
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Icon1
                            style={{
                                color: '#e6e6e9',
                                fontSize: 16,
                                borderRadius: 17,
                            }}
                            name="search"
                        />
                    </View>

                    <View style={{ width: '100%' }}>
                        <TextInput
                            onChangeText={(text) => searchFilterFunction(text)}
                            value={search}
                            placeholder="Search"
                            placeholderTextColor="#615e5d"
                            style={{
                                fontSize: 15,
                                color: '#56575A',
                            }}
                        />
                    </View>
                </View>
            </View>

            {
                load && load == true ?
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ActivityIndicator size="large" color="#7AAA4B" animating={load} />
                        <Text style={{ color: "#7AAA4B", fontSize: responsiveFontSize(1.45) }}>Please Wait</Text>
                    </View> :

                    <FlatList
                        data={doctors?.length > 0 ? doctors : ''}
                        style={{ marginBottom: 12 }}
                        ListEmptyComponent={EmptyListMessage}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={['#398337']}
                            />
                        }
                        renderItem={({ item }) => (
                            <View style={{ marginHorizontal: 13, marginTop: 3 }}>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        borderRadius: 20,
                                        // backgroundColor: '#f1f1f1',
                                        padding: 10,
                                        backgroundColor: '#e6e6e9',
                                        // marginTop: 3,
                                        paddingVertical: 9,
                                        paddingHorizontal: 10

                                    }}>
                                    <View
                                        style={{
                                            padding: 2,
                                        }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            width: '100%',
                                            marginTop: 1,
                                            // padding: 7,
                                            paddingBottom: 5,
                                            borderBottomWidth: 0.65,
                                            borderBottomColor: '#b3b7bb',
                                            alignItems: 'center',


                                        }}>
                                            <View
                                                style={{
                                                    alignItems: 'center',
                                                    justifyContent: "center",
                                                    flexDirection: 'row',
                                                    backgroundColor: '#fff',
                                                    width: 25,
                                                    borderRadius: 50,


                                                }}
                                            >
                                                <Doctor name="doctor"
                                                    style={{
                                                        fontSize: 17,
                                                        paddingVertical: 5,
                                                        color: 'green',
                                                        alignItems: 'center',

                                                    }}
                                                />
                                            </View>

                                            <View style={{
                                                paddingLeft: 5,
                                                alignItems: 'center',
                                                justifyContent: "center",
                                            }}>
                                                <Text
                                                    style={{
                                                        color: '#000',
                                                        fontSize: responsiveFontSize(2),
                                                        alignItems: 'center',
                                                        justifyContent: "center",
                                                        fontWeight: "500"
                                                    }}>
                                                    {item?.name}
                                                </Text>
                                            </View>

                                        </View>

                                        {
                                            item?.email ?

                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        paddingTop: 6
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            alignItems: 'center',
                                                            justifyContent: "center",

                                                        }}
                                                    >

                                                        <Email
                                                            style={{
                                                                fontSize: responsiveFontSize(2.50),
                                                                color: 'green',
                                                            }}
                                                            name="email-check-outline" />
                                                    </View>
                                                    <View style={{ paddingLeft: 2, }}>
                                                        <Text
                                                            style={{
                                                                color: '#434240',
                                                                // paddingTop: 7,
                                                                color: '#434240',
                                                                fontSize: responsiveFontSize(2),
                                                                fontWeight: '400',
                                                            }}>
                                                            {' '}
                                                            {item?.email}
                                                        </Text>
                                                    </View>
                                                </View> :
                                                ""
                                        }


                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                paddingTop: 6,
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
                                                        fontSize: responsiveFontSize(2.50),
                                                        color: 'green',
                                                        // paddingTop:5
                                                    }}
                                                    name="md-location-sharp" />
                                            </View>
                                            <View style={{ paddingLeft: 2, }}>
                                                <Text
                                                    style={{
                                                        color: '#434240',
                                                        // paddingTop: 7,
                                                        color: '#434240',
                                                        fontSize: responsiveFontSize(2),
                                                        fontWeight: '400',
                                                    }}>
                                                    {' '}
                                                    {item?.city}{" ,"} {item?.address}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            marginTop: 8,
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
                                                        padding: 4,
                                                        borderRightColor: '#e6e6e9',
                                                        borderRightWidth: 1,
                                                        fontSize: responsiveFontSize(2),
                                                    }}>
                                                    Call Now
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate('FollowupList', {
                                                    data: item.doctor_id,
                                                    user_id: route.params?.item.id
                                                    // user_id:
                                                })
                                            }

                                            style={{
                                                width: '50%',
                                                backgroundColor: '#fff',
                                                borderColor: '#7AAA4B',
                                                borderWidth: 1,
                                                borderRadius: 20,
                                                alignItems: 'center',
                                            }}>
                                            <View
                                                style={{ flexDirection: 'row' }}>
                                                <Text
                                                    style={{
                                                        color: '#575454',
                                                        textAlign: 'center',
                                                        padding: 4,
                                                        fontSize: responsiveFontSize(2),
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
            }
        </View>
    )
}

export default DoctorLists

const styles = StyleSheet.create({})
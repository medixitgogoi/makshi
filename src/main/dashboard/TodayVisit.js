import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, RefreshControl, Image, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import User from 'react-native-vector-icons/dist/FontAwesome'
import Doctor from 'react-native-vector-icons/dist/Fontisto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Fromtoicon from 'react-native-vector-icons/dist/AntDesign';
import Icon3 from 'react-native-vector-icons/dist/Ionicons'
import Distanc from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import axios from 'axios'
import { responsiveFontSize } from "react-native-responsive-dimensions"
import Remarkicon from 'react-native-vector-icons/dist/FontAwesome';

const TodayVisit = () => {

    const [statusBarStyle, setStatusBarStyle] = useState();
    const navigation = useNavigation();
    const [appload, setappload] = useState();
    const [load, setload] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [textstate, settextstate] = useState({
        textShown: -1,
    });

    const toggleNumberOfLines = index => {
        settextstate({
            textShown: textstate.textShown === index ? -1 : index,
        });
    };

    const userAppload = async () => {
        try {
            setload(true)
            let mr = await AsyncStorage.getItem('user');
            const modifiedUser = JSON.parse(mr);
            console.log('modifiedUserrrrr', modifiedUser);
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${modifiedUser.api_token}`;
            const result = await axios
                .get('/user/appload')
                .then(res => {
                    setappload(res.data.todays_visits)
                    console.log("appload", res)
                    // AsyncStorage.setItem('user', JSON.stringify(res.data.Mr_Details));
                    // if (res.data.data.status == 1) {
                    // }
                    setload(false)
                });
        } catch (error) {
            console.log(error);
        }
    };

    const onRefresh = () => {
        userAppload()
    }

    const EmptyListMessage = ({ item }) => {
        return (
            // Flat List Item
            <View style={{ paddingTop: "30%", height: "100%" }}>
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
                        margin: 10,
                    }}>
                    <Text
                        style={{ color: '#008080', fontSize: 15, fontWeight: '400' }}>
                        No Data Found
                    </Text>
                </View>
            </View>
        );
    };

    useEffect(() => {
        userAppload()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEAEA' }}>

            <StatusBar
                animated={true}
                backgroundColor="#008080"
                barStyle={statusBarStyle}
            />

            {/* Sub header */}
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
                    Today's visit lists
                </Text>
            </View>

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
                            <Text style={{ fontSize: 12, color: "#008080" }}>Please Wait...</Text>
                            <ActivityIndicator size="large" color="#008080" animating={load} />
                        </View>
                    ) :
                    (
                        <FlatList
                            data={appload?.length > 0 ? appload : ''}
                            ListEmptyComponent={EmptyListMessage}
                            style={{ marginBottom: 5 }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={['#008080']}
                                />
                            }
                            renderItem={({ item, index }) => (

                                <View style={{ marginHorizontal: 10, marginTop: 6, marginBottom: 10, }}>

                                    <View style={{
                                        // padding: 10,
                                        backgroundColor: "#f5f5dc",
                                        borderRadius: 5,
                                        elevation: 5,
                                    }}>

                                        {/* Name */}
                                        <View style={{ flexDirection: 'row', alignItems: "center", width: '100%', justifyContent: "center", backgroundColor: "#008080", padding: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, }}>
                                            <View style={{ backgroundColor: "#f5f5dc", borderRadius: 100, width: 25, height: 25, justifyContent: "center", alignItems: "center" }}>
                                                <Doctor
                                                    name="doctor"
                                                    style={{ fontSize: responsiveFontSize(1.6), color: "#008080" }}
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

                                        <View style={{ padding: 10, }}>

                                            {/* doctor address */}
                                            <View style={{ flexDirection: "column", }}>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                                                    <View style={{ justifyContent: "center", marginLeft: 3 }}>
                                                        <Text style={{
                                                            color: "#008080",
                                                            fontSize: responsiveFontSize(2),
                                                            fontWeight: "600",
                                                        }}>
                                                            Doctor Address:
                                                        </Text>
                                                    </View>
                                                </View>

                                                <View style={{ justifyContent: "center", marginLeft: 25 }}>
                                                    <Text style={{
                                                        color: "#008080",
                                                        fontSize: responsiveFontSize(2),
                                                        fontWeight: "400",
                                                    }}>
                                                        {item?.Doctor_address} Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis est
                                                    </Text>
                                                </View>
                                            </View>

                                            {/* visited address */}
                                            <View style={{ flexDirection: "column", marginTop: 7, }}>
                                                <View style={{ flexDirection: "row", alignItems: "center", }}>
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
                                                        }}>
                                                        <Distanc
                                                            style={{ fontSize: responsiveFontSize(1.9), color: "#f5f5dc", alignItems: "center" }}
                                                            name="map-marker-distance"
                                                        />
                                                    </View>
                                                    <View style={{ marginLeft: 3 }}>
                                                        <Text style={{
                                                            color: "#008080",
                                                            fontSize: 14,
                                                            fontWeight: "600",
                                                        }}>
                                                            Visited Address:
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{ justifyContent: "center", marginLeft: 25, }}>
                                                    <Text
                                                        style={{
                                                            color: "#008080",
                                                            fontSize: 14,
                                                            fontWeight: "400",
                                                        }}
                                                    >
                                                        {item?.location}
                                                    </Text>
                                                </View>
                                            </View>

                                            {/* remark */}
                                            <View style={{ flexDirection: "column", marginTop: 7, marginBottom: 10, }}>

                                                <View style={{ flexDirection: "row", }}>
                                                    <View style={{ backgroundColor: "#008080", borderRadius: 100, width: 22, height: 22, justifyContent: "center", alignItems: "center" }}>
                                                        <Remarkicon name="pencil-square-o" style={{ fontSize: responsiveFontSize(1.8) }} color="#f5f5dc" />
                                                    </View>
                                                    <View style={{ justifyContent: "center", position: 'relative', marginLeft: 4 }}>
                                                        <Text style={{
                                                            color: "#008080",
                                                            fontSize: 14,
                                                            fontWeight: "600",
                                                        }}>
                                                            Remark:
                                                        </Text>
                                                    </View>
                                                </View>

                                                <View style={{ justifyContent: "center", marginLeft: 25, }}>
                                                    <Text
                                                        style={{ color: "#008080", justifyContent: "center", alignItems: "center", fontSize: responsiveFontSize(1.85), fontWeight: "400", }}
                                                        numberOfLines={textstate.textShown === index ? undefined : 1}
                                                    >
                                                        {item?.remarks}
                                                    </Text>
                                                    {item?.remarks.length > 75 ?

                                                        <Text
                                                            onPress={() => toggleNumberOfLines(index)}
                                                            style={{ color: '#000', fontSize: 13 }}>
                                                            {textstate.textShown === index ? 'read less...' : 'read more...'}
                                                        </Text>
                                                        :
                                                        ""
                                                    }
                                                </View>

                                            </View>

                                            {/* date */}
                                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 5, }}>
                                                <View style={{ justifyContent: 'center', backgroundColor: "#eaeaea", paddingHorizontal: 3, elevation: 3, borderRadius: 3, paddingVertical: 1, }}>
                                                    <Text style={{ color: '#008080', fontSize: responsiveFontSize(1.5), }}>
                                                        Applied Date
                                                    </Text>
                                                </View>
                                                <Text style={{ color: "#008080", marginLeft: 2, fontWeight: "600", fontSize: responsiveFontSize(1.7) }}>: {item?.date}</Text>
                                            </View>

                                        </View>
                                    </View>
                                </View>

                            )
                            }
                        />
                    )
            }


        </SafeAreaView >
    )
}

export default TodayVisit

const styles = StyleSheet.create({})
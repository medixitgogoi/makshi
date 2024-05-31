import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, FlatList, ActivityIndicator, RefreshControl, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

const Rbm = ({ route }) => {

    const [statusBarStyle, setStatusBarStyle] = useState();
    const navigation = useNavigation();
    const [newdata, setnewdata] = useState()
    const [load, setload] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const handleSubmit = async () => {
        try {
            setload(true);
            let mr = await AsyncStorage.getItem('user');
            const modifiedUser = JSON.parse(mr);
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${modifiedUser.api_token}`;
            const result = await axios
                .post(`/user/junior/list`, {
                    user_id: route.params?.item.id,
                    designation_id: route.params?.item.designation_id
                })
                .then(res => {
                    console.log(res, 'new page');
                    setnewdata(res.data.data)
                    setload(false);
                });
        } catch (error) {
            console.log(error);
        }
    };




    const onRefresh = () => {
        handleSubmit()
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


    // console.log(newdata && newdata, 'jjjj')
    useEffect(() => {
        handleSubmit()
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
                        alignItems: "center",
                    }}>
                    Regional Business Manager
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
                            <ActivityIndicator size="large" color="#008080" animating={load} />
                            <Text style={{ color: "#008080", fontSize: responsiveFontSize(1.7) }}>Please Wait</Text>
                        </View>
                    )
                    :
                    (
                        <FlatList
                            data={newdata?.length > 0 ? newdata : ''}
                            ListEmptyComponent={EmptyListMessage}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={['#008080']}
                                />
                            }
                            renderItem={({ item }) => (
                                <View
                                    onPress={() => navigation.navigate('DoctorLists', { item })}
                                    style={{ marginTop: 5, marginHorizontal: 10 }}>
                                    <View style={{
                                        backgroundColor: '#f5f5dc',
                                        width: '100%',
                                        borderRadius: 5,
                                        paddingBottom: 10,
                                        elevation: 5,
                                    }}>

                                        <View style={{ flexDirection: 'row', alignItems: "center", width: '100%', justifyContent: "center", backgroundColor: "#008080", padding: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, }}>
                                            <View style={{ backgroundColor: "#f5f5dc", borderRadius: 100, width: 25, height: 25, justifyContent: "center", alignItems: "center" }}>
                                                <Icon2
                                                    name="doctor"
                                                    style={{ fontSize: responsiveFontSize(2.3), color: "#008080" }}
                                                />
                                            </View>

                                            <View style={{ marginLeft: 5 }}>
                                                <Text
                                                    style={{
                                                        color: '#f5f5dc',
                                                        fontSize: responsiveFontSize(2),
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {item?.name}
                                                </Text>
                                            </View>
                                        </View>

                                        {/* Top */}
                                        <View style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            width: '100%',
                                            marginVertical: 10,
                                            paddingHorizontal: 8,
                                        }}>
                                            <Image
                                                style={{ height: 100, width: 100, borderRadius: 50 }}
                                                source={{ uri: item?.photo }}
                                                resizeMode="contain"
                                            />
                                            <View style={{ marginLeft: 15, flex: 1, }}>
                                                <View style={{ paddingTop: 2, flexDirection: "row", alignItems: "center", marginBottom: 3, }}>
                                                    {/* <Text style={{ color: "#398337", fontSize: responsiveFontSize(1.55), }}>{item?.emp_code}</Text> */}
                                                    <View style={{ justifyContent: 'center', backgroundColor: "#eaeaea", paddingHorizontal: 3, elevation: 3, borderRadius: 3, }}>
                                                        <Text style={{ color: '#008080', fontSize: responsiveFontSize(1.5), fontWeight: "500" }}>
                                                            Emp Id
                                                        </Text>
                                                    </View>
                                                    <Text style={{ color: "#008080", marginLeft: 1, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>: {item?.emp_code}</Text>
                                                </View>
                                                <Text style={{ color: "#008080", fontSize: responsiveFontSize(1.75), marginBottom: 3, fontWeight: "600", marginBottom: 5, }}>{item?.designation_name}</Text>
                                                <Text style={{ color: "#008080", fontSize: responsiveFontSize(1.75), marginBottom: 3, fontWeight: "500", marginBottom: 5, }}>{item?.email}</Text>
                                                <Text style={{ color: "#008080", fontSize: responsiveFontSize(1.75), fontWeight: "500" }}>{item?.mobile}</Text>
                                            </View>
                                        </View>

                                        {/* Button */}
                                        <View style={{ alignItems: "center", paddingHorizontal: 8, }}>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('Abm', { item })}
                                                style={{
                                                    backgroundColor: '#008080',
                                                    paddingVertical: 8,
                                                    paddingHorizontal: 20,
                                                    borderRadius: 8,
                                                    alignItems: "center",
                                                    width: "100%",
                                                }}>
                                                <Text style={{ color: '#f5f5dc', fontSize: responsiveFontSize(2), fontWeight: "600" }}>View Juniors</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </View>

                            )} />
                    )
            }
        </SafeAreaView>
    )
}

export default Rbm

const styles = StyleSheet.create({})
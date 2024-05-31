import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    ActivityIndicator,
    Alert,
    Modal,
    SafeAreaView
} from 'react-native';
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/Ionicons';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import axios from 'axios';

const ExpenseAdd = () => {

    const navigation = useNavigation();
    const [statusBarStyle, setStatusBarStyle] = useState();
    const [mainload, setmainload] = useState(false);
    const [formerror, setformerror] = useState();
    const [apistartdate, setapistartdate] = useState();
    const [apiopen, setapiopen] = useState(false)
    const [date, setDate] = useState(new Date());
    const [errormodel, seterrormodel] = useState('')
    const [alertmodel, setalertmodel] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    const [data, setData] = useState({
        work_type: "",
        no_of_doctors: "",
        no_of_kba: "",
        work_place_type: "",
        from: "",
        to: "",
        distance: "",
        fare: "",
        expense: "",
        remarks: "",
        total: "",
    });

    const expensedatasend = async () => {

        try {
            setalertmodel(false)
            setmainload(true)
            let mr = await AsyncStorage.getItem('user');
            const modifiedUser = JSON.parse(mr);
            console.log('modifiedUserrrrr', modifiedUser);
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${modifiedUser.api_token}`;
            const result = await axios.post(`/user/expenses/add`, data

            )
                .then(res => {
                    console.log('expensedatasend data', res);
                    setformerror(false)
                    setmainload(false)
                    if (res.data.error_message) {
                        setformerror(res.data.error_message)
                        // Alert.alert('NETWORK ERROR',res.data.message)
                    }
                    else if (res.data.error_code === false) {
                        setalertmodel(false)
                        navigation.navigate('Expanses')
                    }
                    else {
                        seterrormodel(res.data.message)
                        setalertmodel(true)

                        // navigation.navigate('Expanses')

                    }
                    Toast()

                });
        } catch (error) {

            console.log(error);
        }
    };

    const Toast = () => {
        ToastAndroid.showWithGravityAndOffset(
            ' expense apply successfully !!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
    };
    const apitest = () => {
        setapiopen(true)
    }

    const closemodel = () => {
        setalertmodel(false)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEAEA' }}>
            <StatusBar
                animated={true}
                backgroundColor="#008080"
                barStyle={statusBarStyle}
            />

            {/* Sub Header */}
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
                    Expense apply
                </Text>
            </View>

            {
                alertmodel ?
                    <Modal animationType="slide" transparent={true}>
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
                                    borderRadius: 10,
                                    shadowColor: '#424547',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5,
                                    width: '100%',
                                    height: 'auto',
                                    paddingVertical: 20,

                                }}>
                                <View>
                                    <View style={{
                                        justifyContent: "center", alignItems: "center"
                                    }}>
                                        <Text style={{ color: "#008080" }}>{errormodel}</Text>
                                    </View>
                                    <View style={{
                                        justifyContent: "center", alignItems: "center",
                                        marginTop: 10,
                                        marginHorizontal: 25
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => closemodel()}
                                            style={{

                                                backgroundColor: '#008080',
                                                padding: 5,
                                                borderRadius: 5,

                                                alignItems: "center",
                                                width: "100%",
                                                justifyContent: "center",
                                            }}>
                                            <Text style={{ color: '#f5f5dc', fontSize: responsiveFontSize(2), fontWeight: "600" }}>Close</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>

                    </Modal>
                    : ""
            }

            <View
                style={{}}>
                <View style={{ borderRadius: 19, backgroundColor: '#7AAA4B' }}>
                    <TouchableOpacity>
                        <DatePicker
                            modal
                            open={apiopen}
                            date={date}
                            title="Start Date"
                            mode="date"
                            onConfirm={date => {
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
                            <Text style={{ color: "#008080", fontSize: 10, }}>Expenses Added please wait...</Text>
                            <ActivityIndicator size="large" color="#008080" animating={mainload} />
                        </View>
                    ) :
                    (
                        <View style={{ flex: 1 }} >

                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                style={{ margin: 10 }}
                            >

                                {/* Work Type */}
                                <View>
                                    <View style={{ flexDirection: "row" }}>
                                        <View>
                                            <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), paddingLeft: 4, fontWeight: "600", }}>
                                                Work Type
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={{ color: "red", paddingLeft: 4 }}>
                                                *
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ marginHorizontal: 4 }}>
                                        <TextInput
                                            placeholder="Enter Expenses Name"
                                            placeholderTextColor={'#008080'}
                                            // onChangeText={value => set work_type(value)}
                                            value={data?.work_type}
                                            onChangeText={text => setData({ ...data, work_type: text })}
                                            style={{
                                                width: '100%',
                                                borderRadius: 5,
                                                paddingHorizontal: 10,
                                                backgroundColor: "#f5f5dc",
                                                paddingVertical: 5,
                                                marginTop: 5,
                                                color: "#000",
                                                elevation: 5,
                                                alignItems: "center",
                                            }}
                                        />
                                    </View>
                                    {formerror?.work_type ? (
                                        <Text style={{ color: 'red', fontSize: 14, paddingLeft: 0, paddingTop: 5 }}>
                                            {formerror?.work_type}
                                        </Text>
                                    ) : (
                                        ''
                                    )}
                                </View>

                                {/* No. of doctors met */}
                                <View
                                    style={{
                                        paddingTop: 13,
                                        paddingHorizontal: 4,
                                    }}
                                >
                                    <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), fontWeight: "600", }}>
                                        Number Of Doctors Met
                                    </Text>

                                    <View>
                                        <TextInput
                                            placeholder="Enter Number Of Doctors Met"
                                            placeholderTextColor={'#008080'}
                                            keyboardType="numeric"
                                            value={data?.no_of_doctors}
                                            // onChangeText={value => setno_of_doctors(value)}
                                            onChangeText={text => setData({ ...data, no_of_doctors: text })}
                                            style={{
                                                width: '100%',
                                                borderRadius: 5,
                                                paddingHorizontal: 10,
                                                backgroundColor: "#f5f5dc",
                                                paddingVertical: 5,
                                                marginTop: 5,
                                                color: "#000",
                                                elevation: 5,
                                                alignItems: "center",
                                            }}
                                        />
                                    </View>
                                    {formerror?.email ? (
                                        <Text style={{ color: 'red', fontSize: 14, paddingLeft: 0, paddingTop: 5, backgroundColor: "#fff" }}>
                                            {formerror?.email}
                                        </Text>
                                    ) : (
                                        ''
                                    )}
                                </View>

                                {/* KBA */}
                                <View
                                    style={{
                                        paddingTop: 13,
                                        paddingHorizontal: 4,
                                    }}
                                >
                                    <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), fontWeight: "600", }}>
                                        Number Of KBA Met
                                    </Text>
                                    <View>
                                        <TextInput
                                            placeholder="Enter Number Of KBA Met"
                                            maxLength={10}
                                            keyboardType="numeric"
                                            placeholderTextColor={'#008080'}
                                            // onChangeText={value => setno_of_kba(value)}
                                            value={data?.no_of_kba}
                                            onChangeText={text => setData({ ...data, no_of_kba: text })}
                                            style={{
                                                width: '100%',
                                                borderRadius: 5,
                                                paddingHorizontal: 10,
                                                backgroundColor: "#f5f5dc",
                                                paddingVertical: 5,
                                                marginTop: 5,
                                                color: "#000",
                                                elevation: 5,
                                                alignItems: "center",
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

                                {/* Work place */}
                                <View
                                    style={{
                                        paddingTop: 13,
                                        paddingHorizontal: 4,
                                    }}
                                >
                                    <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), fontWeight: "600", }}>
                                        Work Place Type
                                    </Text>

                                    <View>
                                        <TextInput
                                            placeholder="Ex.(HQ/OS)"
                                            placeholderTextColor={'#6F7074'}
                                            // onChangeText={value => setwork_place_type(value)}
                                            value={data?.work_place_type}
                                            onChangeText={text => setData({ ...data, work_place_type: text })}
                                            style={{
                                                width: '100%',
                                                borderRadius: 5,
                                                paddingHorizontal: 10,
                                                backgroundColor: "#f5f5dc",
                                                paddingVertical: 5,
                                                marginTop: 5,
                                                color: "#000",
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

                                {/* Place worked */}
                                <View
                                    style={{
                                        paddingTop: 13,
                                        paddingHorizontal: 4,
                                    }}
                                >
                                    <View style={{ flexDirection: "row" }}>
                                        <View>
                                            <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), fontWeight: "600", }}>
                                                Place Worked As Per DWS
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={{ color: "red", paddingLeft: 4 }}>
                                                *
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <TextInput
                                            placeholder="Enter Place Name Worked As Per DWS"
                                            placeholderTextColor={'#008080'}
                                            // onChangeText={value => setfrom(value)}
                                            value={data?.from}
                                            onChangeText={text => setData({ ...data, from: text })}
                                            style={{
                                                width: '100%',
                                                borderRadius: 5,
                                                paddingHorizontal: 10,
                                                backgroundColor: "#f5f5dc",
                                                paddingVertical: 5,
                                                marginTop: 5,
                                                color: "#000",
                                                elevation: 5,
                                                alignItems: "center",
                                            }}
                                        />
                                    </View>
                                    {formerror?.from ? (
                                        <Text style={{ color: 'red', fontSize: 14, paddingLeft: 0, paddingTop: 5 }}>
                                            {formerror?.from}
                                        </Text>
                                    ) : (
                                        ''
                                    )}
                                </View>

                                {/* Covered from */}
                                <View
                                    style={{
                                        paddingTop: 13,
                                        paddingHorizontal: 4,
                                    }}
                                >
                                    <View style={{ flexDirection: "row" }}>
                                        <View>
                                            <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), fontWeight: "600", }}>
                                                Covered From
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={{ color: "red", paddingLeft: 4 }}>
                                                *
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <TextInput
                                            placeholder="Enter Covered Place Name"
                                            placeholderTextColor={'#6F7074'}
                                            // onChangeText={value => setto(value)}
                                            value={data?.to}
                                            onChangeText={text => setData({ ...data, to: text })}
                                            style={{
                                                width: '100%',
                                                borderRadius: 5,
                                                paddingHorizontal: 10,
                                                backgroundColor: "#f5f5dc",
                                                paddingVertical: 5,
                                                marginTop: 5,
                                                color: "#000",
                                                elevation: 5,
                                                alignItems: "center",
                                            }}
                                        />
                                    </View>
                                    {formerror?.to ? (
                                        <Text style={{ color: 'red', fontSize: 14, paddingLeft: 0, paddingTop: 5 }}>
                                            {formerror?.to}
                                        </Text>
                                    ) : (
                                        ''
                                    )}
                                </View>

                                {/* Distance */}
                                <View
                                    style={{
                                        paddingTop: 13,
                                        paddingHorizontal: 4,
                                    }}
                                >
                                    <View style={{ flexDirection: "row" }}>
                                        <View>
                                            <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), fontWeight: "600", }}>
                                                Distance As Per TCP
                                            </Text>
                                        </View>

                                    </View>
                                    <View>
                                        <TextInput
                                            placeholder="Enter Distnance As Per TCP"
                                            placeholderTextColor={'#008080'}
                                            keyboardType="numeric"
                                            // onChangeText={value => setdistance(value)}
                                            value={data?.distance}
                                            onChangeText={text => setData({ ...data, distance: text })}
                                            style={{
                                                width: '100%',
                                                borderRadius: 5,
                                                paddingHorizontal: 10,
                                                backgroundColor: "#f5f5dc",
                                                paddingVertical: 5,
                                                marginTop: 5,
                                                color: "#000",
                                                elevation: 5,
                                                alignItems: "center",
                                            }}
                                        />
                                    </View>
                                    {formerror?.distance ? (
                                        <Text style={{ color: 'red', fontSize: 14, paddingLeft: 0, paddingTop: 5 }}>
                                            {formerror?.distance}
                                        </Text>
                                    ) : (
                                        ''
                                    )}
                                </View>

                                {/* Fare */}
                                <View
                                    style={{
                                        paddingTop: 13,
                                        paddingHorizontal: 4,
                                    }}
                                >
                                    <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), fontWeight: "600", }}>
                                        Fare As Per TCP/Actuals
                                    </Text>
                                    <View>
                                        <TextInput
                                            placeholder="Enter Fare As Per TCP/Actuals"
                                            placeholderTextColor={'#008080'}
                                            keyboardType="numeric"
                                            // onChangeText={value => setfare(value)}
                                            value={data?.fare}
                                            onChangeText={text => setData({ ...data, fare: text })}
                                            style={{
                                                width: '100%',
                                                borderRadius: 5,
                                                paddingHorizontal: 10,
                                                backgroundColor: "#f5f5dc",
                                                paddingVertical: 5,
                                                marginTop: 5,
                                                color: "#000",
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

                                {/* Daily allowance */}
                                <View
                                    style={{
                                        paddingTop: 13,
                                        paddingHorizontal: 4,
                                    }}
                                >
                                    <View style={{ flexDirection: "row" }}>
                                        <View>
                                            <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), fontWeight: "600", }}>
                                                Daily Allowance/Fixed Misc. Claim st OS
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={{ color: "red", paddingLeft: 4 }}>
                                                *
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <TextInput
                                            placeholder="Enter  Daily Allowance/Fixed Misc. Claim st OS"
                                            placeholderTextColor={'#008080'}
                                            keyboardType="numeric"
                                            // onChangeText={value => setexpense(value)}
                                            value={data?.expense}
                                            onChangeText={text => setData({ ...data, expense: text })}
                                            style={{
                                                width: '100%',
                                                borderRadius: 5,
                                                paddingHorizontal: 10,
                                                backgroundColor: "#f5f5dc",
                                                paddingVertical: 5,
                                                marginTop: 5,
                                                color: "#000",
                                                elevation: 5,
                                                alignItems: "center",
                                            }}
                                        />
                                    </View>
                                    {formerror?.expense ? (
                                        <Text style={{ color: 'red', fontSize: 14, paddingLeft: 0, paddingTop: 5 }}>
                                            {formerror?.expense}
                                        </Text>
                                    ) : (
                                        ''
                                    )}
                                </View>

                                {/* Miscellaneous */}
                                <View
                                    style={{
                                        paddingTop: 13,
                                        paddingHorizontal: 4,
                                    }}
                                >
                                    <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), fontWeight: "600", }}>
                                        Miscellaneous Expense
                                    </Text>
                                    <TextInput
                                        placeholder="Enter Miscellaneous Expense"
                                        placeholderTextColor={'#6F7074'}
                                        // onChangeText={value => setremarks(value)}
                                        value={data?.remarks}
                                        onChangeText={text => setData({ ...data, remarks: text })}
                                        style={{
                                            width: '100%',
                                            borderRadius: 5,
                                            paddingHorizontal: 10,
                                            backgroundColor: "#f5f5dc",
                                            paddingVertical: 5,
                                            marginTop: 5,
                                            color: "#000",
                                            elevation: 5,
                                            alignItems: "center",
                                        }}
                                    />
                                    {formerror?.address ? (
                                        <Text style={{ color: 'red', fontSize: 14, paddingLeft: 0, paddingTop: 5 }}>
                                            {formerror?.address}
                                        </Text>
                                    ) : (
                                        ''
                                    )}
                                </View>

                                {/* Total expenses */}
                                <View
                                    style={{
                                        paddingTop: 13,
                                        paddingHorizontal: 4,
                                    }}
                                >
                                    <View style={{ flexDirection: "row" }}>
                                        <View>
                                            <Text style={{ color: '#008080', fontSize: responsiveFontSize(2), fontWeight: "600", }}>
                                                Total Expenses
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={{ color: "red", paddingLeft: 4 }}>
                                                *
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <TextInput
                                            placeholder="Enter Total Expenses"
                                            placeholderTextColor={'#008080'}
                                            keyboardType="numeric"
                                            // onChangeText={value => settotal(value)}
                                            value={data?.total}
                                            onChangeText={text => setData({ ...data, total: text })}
                                            style={{
                                                width: '100%',
                                                borderRadius: 5,
                                                paddingHorizontal: 10,
                                                backgroundColor: "#f5f5dc",
                                                paddingVertical: 5,
                                                marginTop: 5,
                                                color: "#000",
                                                elevation: 5,
                                                alignItems: "center",
                                            }}
                                        />
                                    </View>
                                    {formerror?.total ? (
                                        <Text style={{ color: 'red', fontSize: 14, paddingLeft: 0, paddingTop: 5 }}>
                                            {formerror?.total}
                                        </Text>
                                    ) : (
                                        ''
                                    )}
                                </View>

                                <View style={{ marginBottom: "20%" }}>
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
                                    onPress={() => expensedatasend()}
                                    style={{
                                        backgroundColor: '#008080',
                                        padding: 10,
                                        borderRadius: 100,
                                        alignItems: "center",
                                        width: "40%",
                                        justifyContent: "center",
                                        elevation: 3,
                                    }}>
                                    <Text style={{ color: '#f5f5dc', fontSize: responsiveFontSize(2), paddingHorizontal: 35, fontWeight: "600" }}>Submit</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )
            }

        </SafeAreaView>
    )
}

export default ExpenseAdd;

const styles = StyleSheet.create({})
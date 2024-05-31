import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Icon3 from 'react-native-vector-icons/dist/Ionicons';
import { responsiveFontSize } from "react-native-responsive-dimensions";

const ExpenseView = ({ route }) => {

    const [statusBarStyle, setStatusBarStyle] = useState();
    const navigation = useNavigation();
    // const { data } = route;
    console.log(route, 'gg')

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
                        justifyContent: 'center',
                        fontWeight: "600",
                    }}>
                    Expense details
                </Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{ margin: 8 }}
            >
                <View>
                    <View style={{}}>
                        <Text style={{ color: "#008080", fontSize: responsiveFontSize(1.8), fontWeight: "500", marginLeft: 3, }}>Work Type</Text>
                    </View>
                    <View style={{ margin: 3, backgroundColor: "#f6f6df", paddingLeft: 5, borderRadius: 5, elevation: 5, }}>
                        <Text style={{ color: "#008080", paddingVertical: 5, fontWeight: "700", fontSize: responsiveFontSize(2) }}>
                            {route.params?.item.name}
                        </Text>
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    {/* <Text style={{ color: "red" }}>{route.params?.item.from}</Text> */}
                    <View style={{}}>
                        <Text style={{ color: "#008080", fontSize: responsiveFontSize(1.8), fontWeight: "500", marginLeft: 3, }}>Number Of Doctors Met</Text>
                    </View>
                    <View style={{ margin: 3, backgroundColor: "#f6f6df", paddingLeft: 5, borderRadius: 5, elevation: 5, }}>
                        <Text style={{ color: "#008080", paddingVertical: 5, fontWeight: "700", fontSize: responsiveFontSize(2) }}>
                            {route.params?.item.no_of_doctors}
                        </Text>
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    {/* <Text style={{ color: "red" }}>{route.params?.item.from}</Text> */}
                    <View style={{}}>
                        <Text style={{ color: "#008080", fontSize: responsiveFontSize(1.8), fontWeight: "500", marginLeft: 3, }}>Number Of KBA Met</Text>
                    </View>
                    <View style={{ margin: 3, backgroundColor: "#f6f6df", paddingLeft: 5, borderRadius: 5, elevation: 5, }}>
                        <Text style={{ color: "#008080", paddingVertical: 5, fontWeight: "700", fontSize: responsiveFontSize(2) }}>{route.params?.item.no_of_kba}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    {/* <Text style={{ color: "red" }}>{route.params?.item.from}</Text> */}
                    <View style={{}}>
                        <Text style={{ color: "#008080", fontSize: responsiveFontSize(1.8), fontWeight: "500", marginLeft: 3, }}>Work Place Type</Text>
                    </View>
                    <View style={{ margin: 3, backgroundColor: "#f6f6df", paddingLeft: 5, borderRadius: 5, elevation: 5, }}>
                        <Text style={{ color: "#008080", paddingVertical: 5, fontWeight: "700", fontSize: responsiveFontSize(2) }}>{route.params?.item.work_place_type}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={{}}>
                        <Text style={{ color: "#008080", fontSize: responsiveFontSize(1.8), fontWeight: "500", marginLeft: 3, }}>Place Worked As Per DWS</Text>
                    </View>
                    <View style={{ margin: 3, backgroundColor: "#f6f6df", paddingLeft: 5, borderRadius: 5, elevation: 5, }}>
                        <Text style={{ color: "#008080", paddingVertical: 5, fontWeight: "700", fontSize: responsiveFontSize(2) }}>{route.params?.item.from}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View >
                        <Text style={{ color: "#008080", fontSize: responsiveFontSize(1.8), fontWeight: "500", marginLeft: 3, }}>Covered From</Text>
                    </View>
                    <View style={{ margin: 3, backgroundColor: "#f6f6df", paddingLeft: 5, borderRadius: 5, elevation: 5, }}>
                        <Text style={{ color: "#008080", paddingVertical: 5, fontWeight: "700", fontSize: responsiveFontSize(2) }}>{route.params?.item.to}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={{}}>
                        <Text style={{ color: "#008080", fontSize: responsiveFontSize(1.8), fontWeight: "500", marginLeft: 3, }}>Distance As Per TCP</Text>
                    </View>
                    <View style={{ margin: 3, backgroundColor: "#f6f6df", paddingLeft: 5, borderRadius: 5, elevation: 5, }}>
                        <Text style={{ color: "#008080", paddingVertical: 5, fontWeight: "700", fontSize: responsiveFontSize(2) }}>{route.params?.item.distance}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={{}}>
                        <Text style={{ color: "#008080", fontSize: responsiveFontSize(1.8), fontWeight: "500", marginLeft: 3, }}>Fare As Per TCP/Actuals</Text>
                    </View>
                    <View style={{ margin: 3, backgroundColor: "#f6f6df", paddingLeft: 5, borderRadius: 5, elevation: 5, }}>
                        <Text style={{ color: "#008080", paddingVertical: 5, fontWeight: "700", fontSize: responsiveFontSize(2) }}>{route.params?.item.fare}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={{}}>
                        <Text style={{ color: "#008080", fontSize: responsiveFontSize(1.8), fontWeight: "500", marginLeft: 3, }}>Daily Allowance/Fixed Misc. Claim st OS</Text>
                    </View>
                    <View style={{ margin: 3, backgroundColor: "#f6f6df", paddingLeft: 5, borderRadius: 5, elevation: 5, }}>
                        <Text style={{ color: "#008080", paddingVertical: 5, fontWeight: "700", fontSize: responsiveFontSize(2) }}>{route.params?.item.expense}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={{}}>
                        <Text style={{ color: "#008080", fontSize: responsiveFontSize(1.8), fontWeight: "500", marginLeft: 3, }}>Miscellaneous Expense</Text>
                    </View>
                    <View style={{ margin: 3, backgroundColor: "#f6f6df", paddingLeft: 5, borderRadius: 5, elevation: 5, }}>
                        <Text style={{ color: "#008080", paddingVertical: 5, fontWeight: "700", fontSize: responsiveFontSize(2) }}>{route.params?.item.remarks}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={{}}>
                        <Text style={{ color: "#008080", fontSize: responsiveFontSize(1.8), fontWeight: "500", marginLeft: 3, }}>Total Expenses</Text>
                    </View>
                    <View style={{ margin: 3, backgroundColor: "#f6f6df", paddingLeft: 5, borderRadius: 5, elevation: 5, }}>
                        <Text style={{ color: "#008080", paddingVertical: 5, fontWeight: "700", fontSize: responsiveFontSize(2) }}>{route.params?.item.total}</Text>
                    </View>
                </View>

                <View style={{ marginBottom: 5 }}></View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default ExpenseView

const styles = StyleSheet.create({})
import { View, Text, TouchableOpacity } from 'react-native';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Remarkicon from 'react-native-vector-icons/dist/FontAwesome';

const DashboardCard = () => {

    return (
        <View
            style={{
                borderRadius: 5,
                // paddingHorizontal: 5,
                paddingBottom: 15,
                backgroundColor: "#F5F5DC",
                marginHorizontal: 15,
                marginVertical: 5,
                elevation: 5,
            }}
        >
            <View style={{ flexDirection: 'column', }}>
             
                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: "center", width: '100%', justifyContent: "center", backgroundColor: "#008080", padding: 7, borderTopLeftRadius: 5, borderTopRightRadius: 5, }}>
                    <View style={{ backgroundColor: "#f5f5dc", borderRadius: 100, width: 27, height: 27, justifyContent: "center", alignItems: "center" }}>
                        <Icon2
                            name="doctor"
                            style={{ fontSize: responsiveFontSize(1.8), color: "#008080" }}
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

                {/* Details */}
                <View
                    style={{
                        marginVertical: 10,
                        paddingHorizontal: 18,
                    }}
                >
                    {/* Date and Time */}

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", width: "100%", marginBottom: 5, }}>
                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <View style={{ backgroundColor: "#008080", borderRadius: 100, width: 22, height: 22, justifyContent: "center", alignItems: "center" }}>
                                <Icon3 name="date-range" style={{ fontSize: responsiveFontSize(2) }} color="#f5f5dc" />
                            </View>
                            <Text style={{ marginLeft: 5, color: '#000', fontSize: responsiveFontSize(1.7), fontWeight: '400' }}>
                                {item?.date}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 1,
                            paddingHorizontal: 2,
                            paddingLeft: 8
                        }}>
                            <View style={{ backgroundColor: "#008080", borderRadius: 100, width: 22, height: 22, justifyContent: "center", alignItems: "center" }}>
                                <Icon3 name="access-time" style={{ fontSize: responsiveFontSize(2) }} color="#f5f5dc" />
                            </View>
                            <Text style={{ marginLeft: 2, color: '#000', fontSize: responsiveFontSize(1.6), fontWeight: '400', }}>
                                {item?.time}
                            </Text>
                        </View>
                    </View>

                    {/* Remark */}
                    <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: "center" }}>
                        <View style={{ backgroundColor: "#008080", borderRadius: 100, width: 22, height: 22, justifyContent: "center", alignItems: "center" }}>
                            <Remarkicon name="pencil-square-o" style={{ fontSize: responsiveFontSize(1.8) }} color="#f5f5dc" />
                        </View>
                        <Text style={{ marginLeft: 5, color: '#000', fontSize: responsiveFontSize(1.7), fontWeight: '400' }}>
                            {item?.remarks}
                        </Text>
                    </View>

                    {/* Location */}
                    <View style={{ flexDirection: 'row', marginBottom: 6, }}>
                        <View style={{ backgroundColor: "#008080", borderRadius: 100, width: 22, height: 22, justifyContent: "center", alignItems: "center" }}>
                            <Icon3 name="location-on" style={{ fontSize: responsiveFontSize(2), }} color="#f5f5dc" />
                        </View>
                        <View style={{ marginRight: 5, width: "95%" }}>
                            <Text style={{ marginLeft: 5, color: '#000', fontSize: responsiveFontSize(1.7), fontWeight: '400', textAlign: "justify", }}>
                                {item?.Doctor_address}                            </Text>
                        </View>
                    </View>

                </View>

                {/* Visit Button */}
                <View style={{
                    width: '100%', alignItems: 'center'
                }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#008080',
                            paddingHorizontal: 45,
                            paddingVertical: 9,
                            borderRadius: 10,
                            elevation: 5,
                        }}

                    >
                        <Text
                            style={{
                                color: '#f5f5dc',
                                fontSize: responsiveFontSize(1.7),
                                fontWeight: '700',
                            }}
                        >
                            VISIT
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};

export default DashboardCard;
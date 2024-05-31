import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Animated, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveFontSize } from "react-native-responsive-dimensions";

const SearchBar = () => {

    const [expanded, setExpanded] = useState(false);
    const [animation] = useState(new Animated.Value(130)); // Initial width

    const handleToggle = () => {
        const initialValue = expanded ? 300 : 130;
        const finalValue = expanded ? 130 : 300;

        setExpanded(!expanded);

        animation.setValue(initialValue);
        Animated.timing(animation, {
            toValue: finalValue,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.searchContainer, { width: animation }]}>
                {
                    expanded && expanded ?
                        <TextInput
                            style={styles.input}
                            placeholder="Search name here..."
                            placeholderTextColor="#000"
                        /> :
                        <TouchableOpacity onPress={handleToggle} style={{ paddingHorizontal: 3, borderRadius: 50, backgroundColor: "#f5f5dc", elevation: 10, paddingVertical: 3, alignItems: "center" }}>
                            <Text style={{ color: "#008080", fontWeight: '400', fontSize: responsiveFontSize(1.9), textAlign: "center", }}>
                                Search for doctor
                            </Text>
                        </TouchableOpacity>
                }
            </Animated.View>
            <TouchableOpacity onPress={handleToggle} style={styles.iconContainer}>
                <Icon name="search" style={{ fontSize: responsiveFontSize(1.8) }} color="#f5f5dc" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        height: 50,
        marginHorizontal: 17,
    },
    input: {
        paddingHorizontal: 15,
        borderRadius: 300,
        color: '#000',
        backgroundColor: "#f5f5dc",
        height: 35,
        fontSize: responsiveFontSize(1.6),
        paddingVertical: 4,
        elevation: 5,
    },
    iconContainer: {
        paddingHorizontal: 7,
        backgroundColor: "#008080",
        padding: 6,
        borderRadius: 100,
        marginLeft: 3,
    },
});

export default SearchBar;
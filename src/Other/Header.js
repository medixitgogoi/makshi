import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Drawer from './drawer';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
const HeaderOnly = (props) => {
  const navigation = useNavigation();
  const [drawer, setdrawer] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // const memoouse=useMemo(function oneslide(){
  //  return setdrawer(!drawer)
  // },[drawer])
  
  return (
    <>
      <View style={styles.headerArea}>
        <TouchableOpacity
          onPress={() => setdrawer(true)}>
          <Icon name="menu" style={{ fontSize: responsiveFontSize(2.5), color: "#f5f5dc" }} />
        </TouchableOpacity>

        <Drawer drawer={drawer} setdrawer={setdrawer} />

        <Text
          style={{
            color: '#f5f5dc',
            fontSize: responsiveFontSize(2),
            zIndex: 0,
            justifyContent: 'center',
            fontWeight: "600",
            marginLeft: 4,
          }}>
          {' '}
          {props && props.name ? props.name : ''}
        </Text>
      </View>
    </>
  );
};

export default HeaderOnly;

const styles = StyleSheet.create({
  headerArea: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#008080',
    elevation: 20,
    position: 'relative',
    zIndex: 20,
  },
  logo: { width: 130, height: 45, resizeMode: 'stretch' },
  iconHome: { paddingLeft: 15 },
  mainBg: { backgroundColor: '#ddd', height: '85%' },
});

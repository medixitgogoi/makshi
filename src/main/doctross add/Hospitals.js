import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
  TextInput,
  FlatList,
  Modal,
  ActivityIndicator,
  Linking,
  RefreshControl
} from 'react-native';
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/dist/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { responsiveFontSize } from "react-native-responsive-dimensions";

const Hospitals = () => {

  const [HospitalAddressList, setHospitalAddressList] = useState([]);
  const [statusBarStyle, setStatusBarStyle] = useState();
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [search, setSearch] = useState('');
  const [load, setload] = useState(false);
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(200));
  const [refreshing, setRefreshing] = useState(false);

  const handleToggle = () => {
    const initialValue = expanded ? 300 : 200;
    const finalValue = expanded ? 200 : 300;

    setExpanded(!expanded);

    animation.setValue(initialValue);
    Animated.timing(animation, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.title
            ? item.title.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setHospitalAddressList(newData);
      setSearch(text);
    } else {
      setHospitalAddressList(masterDataSource);
      setSearch(text);
    }
  };

  const getHospitallist = async () => {
    try {
      setload(true);
      let mr = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser.api_token}`;
      const result = await axios
        .get('/user/master/doctor/list')
        .then(res => {
          console.log('doctormasterlist', res);
          setload(false);
          let DivisionHospitalAddressdata = [];
          let HospitalAddress = res.data.Hospital_Address_List;
          HospitalAddress.forEach((item) => {
            console.log(item, 'item555')
            DivisionHospitalAddressdata.push({
              title: item.name,
              id: item.id
            })
          })
          setHospitalAddressList(DivisionHospitalAddressdata)
          setMasterDataSource(DivisionHospitalAddressdata)
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = () => {
    getHospitallist()
  }

  // const searchFilterFunction = (text) => {
  //   // console.log("dixit", text);
  //   if (text) {
  //     const newData = masterDataSource.filter(
  //       function (item) {
  //         const itemData = item.name
  //           ? item.name.toUpperCase()
  //           : ''.toUpperCase();
  //         const textData = text.toUpperCase();
  //         return itemData.indexOf(textData) > -1;
  //       });
  //     setdoctors(newData);
  //     setSearch(text);
  //   } else {
  //     setdoctors(masterDataSource);
  //     setSearch(text);
  //   }
  // };

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
            marginTop: 5,
            flexDirection: "row",
            justifyContent: "center"
          }}>
          <Text style={{ color: '#008080', fontSize: 15, fontWeight: '400' }}>
            No results found for
          </Text>
          <Text style={{ color: '#008080', fontSize: 15, fontWeight: '700' }}>
            {""} "{search}"
          </Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    getHospitallist()
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: "#EAEAEA", }}>
      <StatusBar
        animated={true}
        backgroundColor="#008080"
        barStyle={statusBarStyle}
      />

      {/* Header */}
      <View style={{ width: '100%', backgroundColor: '#008080' }}>

        <View style={{ margin: 10, flexDirection: 'row', }}>

          <View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ width: 23, height: 23 }}>
              <Icon name="chevron-back" style={{ fontSize: responsiveFontSize(3), color: "#f5f5dc" }} />
            </TouchableOpacity>
          </View>

          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                color: '#f5f5dc',
                fontSize: responsiveFontSize(2),
                zIndex: 0,
                justifyContent: 'center',
                fontWeight: "600",
              }}>
              Hospitals
            </Text>
          </View>

        </View>

      </View>

      {/* Searchbar */}
      <View style={styles.searchContainer}>
        <Animated.View style={{ width: animation }}>
          {
            expanded && expanded ?
              <TextInput
                onChangeText={(text) => searchFilterFunction(text)}
                style={styles.input}
                placeholder="Search for hospitals here..."
                placeholderTextColor="#000"
                value={search}
              /> :
              <TouchableOpacity onPress={handleToggle} style={{ paddingHorizontal: 10, borderRadius: 50, backgroundColor: "#f5f5dc", elevation: 5, paddingVertical: 4, alignItems: "center" }}>
                <Text style={{ color: "#008080", fontWeight: '400', fontSize: responsiveFontSize(2), textAlign: "center", }}>
                  Search for hospitals
                </Text>
              </TouchableOpacity>
          }
        </Animated.View>
        <TouchableOpacity onPress={handleToggle} style={styles.iconContainer}>
          <Icon name="search" style={{ fontSize: responsiveFontSize(2.2), color: "#f5f5dc" }} />
        </TouchableOpacity>
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
              <Text style={{ color: "#008080", fontSize: 10, }}>Please wait...</Text>
              <ActivityIndicator size="large" color="#008080" animating={load} />
            </View>
          ) : (
            <FlatList
              data={HospitalAddressList?.length > 0 ? HospitalAddressList : ''}
              ListEmptyComponent={EmptyListMessage}

              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#008080']}
                />
              }
              renderItem={({ item }) => (
                <View style={{ marginBottom: 2 }}>

                  <View style={{ marginHorizontal: 13, marginTop: 3, }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("AddDoctorsForm", {
                        item
                      })}
                      style={{ backgroundColor: "#EAEAEA" }}>
                      <Text style={{ color: "#008080", paddingVertical: 10, paddingLeft: 5, fontWeight: "500" }}>{item.title}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )
      }
    </View>
  )
}

export default Hospitals;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    height: 48,
  },
  input: {
    paddingHorizontal: 15,
    borderRadius: 100,
    color: '#000',
    backgroundColor: "#f5f5dc",
    height: 35,
    fontSize: responsiveFontSize(1.7),
    paddingVertical: 10,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: "#008080",
    borderRadius: 100,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 3,
    fontWeight: "600"
  },
})
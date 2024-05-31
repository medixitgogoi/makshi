import { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  ToastAndroid, ActivityIndicator
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { responsiveFontSize } from "react-native-responsive-dimensions";

const One = (props) => {

  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [startdate, setstartdate] = useState('');
  const [Enddate, setEnddate] = useState('');
  const [addremrk, setaddremrk] = useState("")
  const [heading, setheading] = useState("")
  const [openfisrtdate, setopenfisrtdate] = useState(false)
  const [openseconddate, setopenseconddate] = useState(false)
  const [leaveeror, setleaveeror] = useState(false)
  const [result, setresult] = useState(new Date());
  const [newLoader, setLoader] = useState(false);

  const sendata = async () => {

    try {
      setLoader(true);
      let mr = await AsyncStorage.getItem('user');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser.api_token}`;
      const result = await axios
        .post('/user/leave/add', {
          heading: heading,
          date_from: startdate && startdate.replaceAll('/', '-'),
          date_to: Enddate && Enddate.replaceAll('/', '-'),
          remarks: addremrk,
        })
        .then(res => {
          props.setOpen(false);
          console.log(res, "leaveapply")
          Toast()
          clear()
          props.getleavedata()

        });
    } catch (error) {
      console.log(error);
      setLoader(false);

      if (error.response.status === 422) {
        setleaveeror(error.response.data.errors)
      }
    }
  };

  const clear = () => {
    props.setOpen(false)
    setleaveeror(false)
    setstartdate("")
    setEnddate("")
    setaddremrk("")
    setheading("")
  }

  const first = () => {
    setopenfisrtdate(true)
  }
  const second = () => {
    setopenseconddate(true)
  }
  const closemodel = () => {
    props.setOpen(false)
  }
  const Toast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Leave applied successfully !!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  return (
    <View style={{ flex: 1, }}>

      <View>

        <View
          style={{}}>
          <View style={{ borderRadius: 10, backgroundColor: '#7AAA4B' }}>
            <TouchableOpacity>
              <DatePicker
                modal
                open={openfisrtdate}
                date={date}
                title="Start Date"
                mode="date"
                minimumDate={date && date}
                onConfirm={date => {
                  setopenfisrtdate(false);
                  setresult(date)
                  setstartdate(date.toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  }), console.log(date,));
                }}
                onCancel={() => {
                  setopenfisrtdate(false);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            borderRadius: 40,
          }}>
          <View>
            <TouchableOpacity onPress={() => setOpen1(true)}>
              <DatePicker
                modal
                open={openseconddate}
                date={result && result}
                title="End Date"
                mode="date"
                minimumDate={result && result}
                onConfirm={date => {
                  setopenseconddate(false);
                  setEnddate(date.toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  }), console.log(date,));
                }}
                onCancel={() => {
                  setopenseconddate(false);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

      </View>

      {/* {props.open ? (
        <Modal animationType="slide" transparent={true}>

          <View View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                elevation: 7,
                width: '100%',
                height: 'auto',
                paddingHorizontal: 5,
                paddingVertical: 1,
              }}
            >
             

            </View>
          </View>
        </Modal>
      ) : (
        ''
      )} */}
      <View style={{ width: '100%', marginVertical: 15 }}>
        {
          newLoader && newLoader ?
            (
              <View
                style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#008080", fontSize: 10 }}>Adding leave record. Please wait...</Text>
                <ActivityIndicator size="small" color="#008080" />
              </View>
            ) : (
              <Modal animationType="slide" transparent={true} visible={props.open}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                  <View style={{ backgroundColor: '#ffffff', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 30, width: '90%' }}>

                    <View style={{ marginBottom: 20 }}>
                      <Text style={{ color: '#008080', fontSize: 18, fontWeight: '600', marginBottom: 10 }}>Heading</Text>
                      <TextInput
                        placeholder="Enter Leave Name"
                        placeholderTextColor="#008080"
                        multiline={true}
                        numberOfLines={1}
                        onChangeText={value => setheading(value)}
                        style={{ backgroundColor: "#f0f0f0", borderRadius: 5, paddingHorizontal: 10, paddingVertical: 8, fontSize: 16, color: '#000' }}
                      />
                      {leaveeror?.heading && <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{leaveeror.heading}</Text>}
                    </View>

                    <View style={{ marginBottom: 20 }}>
                      <Text style={{ color: '#008080', fontSize: 18, fontWeight: '600', marginBottom: 10 }}>First Date Of Leave</Text>
                      <TouchableOpacity onPress={() => first()} style={{ backgroundColor: "#f0f0f0", borderRadius: 5, paddingHorizontal: 10, paddingVertical: 8 }}>
                        <Text style={{ color: startdate ? '#000' : 'grey', fontSize: 16 }}>{startdate ? startdate.replaceAll('/', '-') : 'Select First Date Of Absence'}</Text>
                      </TouchableOpacity>
                      {leaveeror?.date_from && <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{leaveeror.date_from}</Text>}
                    </View>

                    <View style={{ marginBottom: 20 }}>
                      <Text style={{ color: '#008080', fontSize: 18, fontWeight: '600', marginBottom: 10 }}>Last Date Of Leave</Text>
                      <TouchableOpacity onPress={() => second()} style={{ backgroundColor: "#f0f0f0", borderRadius: 5, paddingHorizontal: 10, paddingVertical: 8 }}>
                        <Text style={{ color: Enddate ? '#000' : 'grey', fontSize: 16 }}>{Enddate ? Enddate.replaceAll('/', '-') : 'Select Last Date Of Absence'}</Text>
                      </TouchableOpacity>
                      {leaveeror?.date_to && <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{leaveeror.date_to}</Text>}
                    </View>

                    <View style={{ marginBottom: 20 }}>
                      <Text style={{ color: '#008080', fontSize: 18, fontWeight: '600', marginBottom: 10 }}>Remark</Text>
                      <TextInput
                        placeholder="Could you elaborate why you need leave?"
                        placeholderTextColor="#008080"
                        multiline={true}
                        numberOfLines={1}
                        onChangeText={value => setaddremrk(value)}
                        style={{ backgroundColor: "#f0f0f0", borderRadius: 5, paddingHorizontal: 10, paddingVertical: 8, fontSize: 16, color: '#000' }}
                      />
                      {leaveeror?.remarks && <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{leaveeror.remarks}</Text>}
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                      <TouchableOpacity onPress={() => sendata()} style={{ backgroundColor: '#008080', borderRadius: 30, paddingHorizontal: 20, paddingVertical: 10, flexDirection: "row", alignItems: "center", width: "45%", justifyContent: "center" }}>
                        <Text style={{ color: '#f5f5dc', fontSize: 18, fontWeight: '600' }}>Submit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => clear()} style={{ backgroundColor: '#ffffff', borderRadius: 30, paddingVertical: 10, paddingHorizontal: 20, borderColor: '#008080', borderWidth: 1, alignItems: "center", width: "45%", justifyContent: "center", marginLeft: 10 }}>
                        <Text style={{ color: '#008080', fontSize: 18, fontWeight: '600' }}>Cancel</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
              </Modal>
            )
        }
      </View>
    </View>
  );
};

export default One;

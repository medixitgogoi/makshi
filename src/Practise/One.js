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

    <View style={{
      flexDirection: "row",
      width: '100%',

      // paddingVertical: 15,
      paddingHorizontal: 12,

    }}>
      <View style={{ width: "30%" }}>
        <Image
          style={{ height: 100, marginRight: 12, borderRadius: 5 }}
          source={{ uri: item?.photo }}

          resizeMode="contain"
        />
      </View>

      <View style={{ width: "70%", }}>

        <View style={{ paddingTop: 2, }}>
          {/* <Text style={{ color: "#398337", fontSize: responsiveFontSize(1.55), }}>{item?.emp_code}</Text> */}
          <Text style={{ color: "#398337", fontSize: responsiveFontSize(1.55), }}>123</Text>
        </View>

        <View style={{ paddingTop: 2 }}>
          {/* <Text style={{ color: "#000", fontSize: responsiveFontSize(2), fontWeight: "500" }}>{item?.name}</Text> */}
          <Text style={{ color: "#000", fontSize: responsiveFontSize(2), fontWeight: "500" }}>polla</Text>

        </View>

        <View style={{ paddingTop: 2 }}>
          {/* <Text style={{ color: "#000", fontSize: responsiveFontSize(1.85) }}>{item?.email}</Text> */}
          <Text style={{ color: "#000", fontSize: responsiveFontSize(1.85) }}>jfdgfjgfjgs</Text>

        </View>

        <View style={{ paddingTop: 2 }}>
          {/* <Text style={{ color: "#000", fontSize: responsiveFontSize(1.85) }}>{item?.mobile}</Text> */}
          <Text style={{ color: "#000", fontSize: responsiveFontSize(1.85) }}>098765433</Text>

        </View>

        <View style={{ paddingTop: 2 }}>
          {/* <Text style={{ color: "#000", fontSize: responsiveFontSize(1.75) }}>{item?.designation_name}</Text> */}
          <Text style={{ color: "#000", fontSize: responsiveFontSize(1.75) }}>jyghyfh</Text>

        </View>

      </View>

    </View>

    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingHorizontal: responsiveWidth(2.96),
        paddingTop: 7
      }}>
      <TouchableOpacity
        // onPress={() => navigation.navigate('Sme', {
        //     item
        // })
        // }
        style={{
          borderColor: '#fff',
          backgroundColor: '#398337',
          padding: 4,
          borderRadius: 8,
          borderWidth: 1,
          alignItems: "center",
          width: "100%",
          justifyContent: "center",

        }}>
        <Text style={{ color: '#fff', fontSize: 14, paddingHorizontal: 35, fontWeight: "200" }}>View Juniors</Text>
      </TouchableOpacity>
    </View>

  </View>

</View>
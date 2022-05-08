import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SellerItemLocal from "../components/SellerItemLocal";


const AppointmentViewTab = ({ navigation }) => {

  const [sellers, setSellers] = useState([]);

  const getData = () => {

    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiGet(keys)
        .then((data) => {
          if (data) {
            setSellers(data);
          }
        })
        .catch((error) => console.log(error))
      )
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getData();
    return navigation.addListener('focus', () => {
            getData();
        });
  }, []);

  const renderItem = ({ item }) => {
    let data = JSON.parse(item[1]);
        return <SellerItemLocal name={data.name} description={data.description} timeslot={data.timeslot} title={data.title}/>;
    }

  return (
    <View>
      {
        sellers.length > 0 ?
          <FlatList
            data={sellers}
            renderItem={renderItem}
            keyExtractor={item => item[0][0]}
          />
          : <Text style={styles.textStyleBlack}>You have not confirmed any appointment yet.</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
    bottomSection: {
        flex: 1,
        width: '100%',
        marginTop: 30,
        marginHorizontal: 10,
    },
    textStyleBlack: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        textAlignVertical: 'center',
        flex: 1,
    }
});

export default AppointmentViewTab
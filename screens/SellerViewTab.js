import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import webServices from "../services/WebServices";
import Spinner from '../components/Spinner';
import SellerItem from "../components/SellerItem";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-elements";

const SellerViewTab = ({ navigation }) => {

  const [sellers, setSellers] = useState([]);
  const [filteredSeller, setFilteredSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getSellers();
    return navigation.addListener('focus', () => {
            getSellers();
        });
  }, [])

  const getSellers = async () => {
    setIsLoading(true);
    setSellers([]);
    webServices.getAllSeller().then((response) => {
      setSellers(response.data);
      setFilteredSeller(response.data);
      setIsLoading(false);
    })
  }

  const searchFilterFunction = () => {
    
    if (searchText) {
      const newData = sellers.filter(
        function (item) {
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const textData = searchText.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredSeller(newData);
      setSearchText(searchText);
    } else {
      setFilteredSeller(sellers);
      setSearchText(searchText);
    }
  }

  return (
    <View style={{ padding: 10 }}>
      {
        isLoading ? <Spinner /> :
          <View>
            <ScrollView>
              <View style={{marginHorizontal: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput clearButtonMode="always" placeholder="Search seller" value={searchText} style={styles.input} onChangeText={setSearchText} />
                <Button title='Go' onPress={searchFilterFunction}/>
              </View>
              {
                filteredSeller.map((item) => {
                  return <View key={item._id}>
                    <SellerItem name={item.name} sellerId={item._id.toString()} email={item.email} designation={item.designation} timeSlots={item.timeslots} navigation={navigation} />
                  </View>
                })
              }
            </ScrollView>
          </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        height: 42,
        borderRadius: 7,
        marginVertical: 10,
        borderWidth: 0.7,
        marginRight: 5,
        padding: 8,
        flex: 1,
        backgroundColor: 'white'
    },
});

export default SellerViewTab
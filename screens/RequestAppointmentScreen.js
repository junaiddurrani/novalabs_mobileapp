import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, TextInput, Alert, SafeAreaView } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { Button } from 'react-native-elements';
import WebServices from '../services/WebServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const RequestAppointmentScreen = ({ route, navigation }) => {

    const { sellerId, timeSlots } = route.params;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    let myTimeSlots = [];

    function setTimeSlots() {
        for (let index = 0; index < timeSlots.length; index++) {
            const element = timeSlots[index];
            myTimeSlots.push({ 'label': element.timeslot, 'value': element._id });
        }
        setItems(myTimeSlots);
    }

    useEffect(() => {
        setTimeSlots();
    }, []);

    function insertIntoDB(timeslot) {
        let data = { title, description, sellerId, name, timeslot };
        AsyncStorage.setItem(uuid.v4(), JSON.stringify(data))
            .then(() => {
                console.log('data added');
                Alert.alert(
                        "Confirmation",
                        "Your appointment has been confirmed",
                        [
                            {
                                text: "OK", onPress: () => {
                                    navigation.navigate('Home');
                                }
                            }
                        ],
                        {
                            cancelable: true
                        }
                    );
            })
            .catch((err) => console.log(err));
    }

    function validateAndSubmit() {
        let selectedVal = items.find((val) => val.value === value);
        if (name !== '' && description !== '' && title !== '' && value !== null) {
            WebServices.requestAppointment(title, description, sellerId, name, selectedVal.label)
                .then((response) => {
                    insertIntoDB(selectedVal.label);
                });
        } else {
            Alert.alert(
                "Error",
                "Please provide all the details",
                [
                    {
                        text: "OK", onPress: () => {

                        }
                    }
                ],
                {
                    cancelable: true
                }
            );
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
        <ScrollView >
            <View style={{ margin: 15, flex: 1 }}>
                <TextInput
                    style={styles.input}
                    onChangeText={setTitle}
                    placeholder='Provide title'
                    value={title}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setDescription}
                    value={description}
                    placeholder='Provide description'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder='Provide full name'
                />
                <DropDownPicker
                    placeholder='Select Appointment Time'
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={(selectedValue) => { setValue(selectedValue); }}
                    setItems={setItems}
                    style={{ marginTop: 5 }}
                />
                <Button
                    title="Book Appointment"
                    style={{ marginTop: 15, marginHorizontal: 5 }}
                    onPress={() => {
                        validateAndSubmit();
                    }} />
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 45,
        borderRadius: 10,
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white'
    },
});

export default RequestAppointmentScreen
import { View, Text, Image } from 'react-native';
import React from 'react';
import { Card, Chip, Button } from 'react-native-elements';


const SellerItem = (props) => {

    let { name, email, sellerId, designation, timeSlots, navigation} = props;

    return (
        <Card>
            <Card.Title>{name}</Card.Title>
            <Card.Divider />
            <View style={{ margin: 5 }}>
                <Text>Email: {email}</Text>
            </View>
            <View style={{ margin: 5 }}>
                <Text>Designation: {designation}</Text>
            </View>
            <Card.Divider style={{ margin: 5 }} />
            <Card.Title>Appointment Time Slots</Card.Title>
            <Card.Divider />
            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                {
                    timeSlots.map((item) => {
                        return <View key={item._id} style={{ width: 80, marginHorizontal: 5, marginVertical: 5 }}>
                            <Chip title={item.timeslot} />
                        </View>
                    })
                }
            </View>
            <View style={{ margin: 5 }}>
                <Button
                    title="Book Appointment"
                    type="outline"
                    onPress={() => {
                        navigation.navigate('RequestAppointmentScreen', { sellerId: sellerId, timeSlots: timeSlots });
                    }}
                />
            </View>
        </Card>
    );
}
export default SellerItem;
import { View, Text } from 'react-native';
import React from 'react';
import { Card } from 'react-native-elements';


const SellerItemLocal = (props) => {

    let { name, description, timeslot, title} = props;

    return (
        <Card>
            <Card.Title>{name}</Card.Title>
            <Card.Divider />
            <View style={{ margin: 5 }}>
                <Text>Title: {title}</Text>
            </View>
            <View style={{ margin: 5 }}>
                <Text>Description: {description}</Text>
            </View>
            <View style={{ margin: 5 }}>
                <Text>Appointment Time: {timeslot}</Text>
            </View>
            
        </Card>
    );
}
export default SellerItemLocal;
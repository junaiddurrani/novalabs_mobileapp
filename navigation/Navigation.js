import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
// import IonicIcon from 'react-native-vector-icons/FontAwesome'
import { Text, Dimensions } from 'react-native';

import AppointViewTab from '../screens/AppointmentViewTab';
import SellerViewTab from '../screens/SellerViewTab';
import RequestAppointmentScreen from '../screens/RequestAppointmentScreen';

const sellerViewTab = 'SellerViewTab';
const appointmentViewTab = 'AppointmentViewTab'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
    return <Tab.Navigator
            initialRouteName={sellerViewTab}
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'grey',
                    tabBarIconStyle: {display: 'none'},
                    tabBarLabelStyle: { paddingBottom: 5, fontSize: 16 },
                    // tabBarStyle: { padding: 10, height: 95 },
                //     tabBarIcon: ({ focused, color, size }) => {
                //     let iconName;
                //     let rn = route.name;

                //     if (rn === sellerViewTab) {
                //         iconName = 'bars';

                //     } else if (rn === appointmentViewTab) {
                //         iconName = 'check-square';

                //     }

                //     // You can return any component that you like here!
                //     return <IonicIcon name={iconName} size={size} color={color} />;
                // },
                })}
            >
                <Stack.Screen name={sellerViewTab} component={SellerViewTab} options={{ title: 'Sellers List' }} />
                <Stack.Screen name={appointmentViewTab} component={AppointViewTab} options={{ title: 'My Appointments' }} />
            </Tab.Navigator>
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
                <Stack.Screen name="RequestAppointmentScreen" component={RequestAppointmentScreen} options={{ title: 'Request Appointment' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
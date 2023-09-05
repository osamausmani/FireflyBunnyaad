import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Saved from '../screens/saved/Saved';
import CompareSaved from '../screens/saved/CompareSaved';
import ComapreResult from '../screens/saved/ComapreResult';


const Stack = createNativeStackNavigator();

const SavedStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Saved'
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name='Saved' component={Saved} />
            <Stack.Screen name='SavedCompare' component={CompareSaved} />
            <Stack.Screen name='CompareResult' component={ComapreResult} />

        </Stack.Navigator>
    )
}
export default SavedStack
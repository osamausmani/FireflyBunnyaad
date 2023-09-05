import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Lops from "../screens/lops/Lops"
import LopList from '../screens/lops/LopList';
import LopsDetail from '../screens/lops/LopsDetail';



const Stack = createNativeStackNavigator();

const LopsStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='lops'
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name='lops' component={Lops} />
            <Stack.Screen name='lopslist' component={LopList} />
            <Stack.Screen name='lopsDetail' component={LopsDetail} />

        </Stack.Navigator>
    )
}
export default LopsStack
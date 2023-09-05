import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FloorPlan from '../screens/floorPlan/FloorPlan';
import FloorPlanPlotSelection from '../screens/floorPlan/FloorPlanPlotSelection';
import FloorPlanDetail from '../screens/floorPlan/FloorPlanDetail';
import FloorPlanArea from '../screens/floorPlan/screens/FloorPlanArea';
import FloorPlanPlotSize from '../screens/floorPlan/screens/FloorPlanPlotSize';
import FloorPlanPlotCategory from '../screens/floorPlan/screens/FloorPlanPlotCategory';
import FloorPlanNo from '../screens/floorPlan/screens/FloorPlanNo';
import FloorPlanUnits from '../screens/floorPlan/screens/FloorPlanUnits';


const Stack = createNativeStackNavigator();

const FloorPlanStack = ({route}) => {
    return (
        <Stack.Navigator
            initialRouteName='floorPlan'
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name='floorPlan' component={FloorPlan} initialParams={{userId:route.params.userId}} />
            <Stack.Screen name='floorPlanArea' component={FloorPlanArea} />
            <Stack.Screen name='floorPlanPlotSize' component={FloorPlanPlotSize} />
            <Stack.Screen name='floorPlanPlotCategory' component={FloorPlanPlotCategory} />
            <Stack.Screen name='floorPlanNo' component={FloorPlanNo} />
            <Stack.Screen name='floorPlanUnits' component={FloorPlanUnits} />
            <Stack.Screen name='floorPlanPlotSelection' component={FloorPlanPlotSelection} />
            <Stack.Screen name='floorPlandetail' component={FloorPlanDetail} />
            
        </Stack.Navigator>
    )
}
export default FloorPlanStack
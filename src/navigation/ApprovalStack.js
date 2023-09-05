import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Approval from '../screens/approvals/Approval';
import ApprovalCategory from '../screens/approvals/ApprovalCategory';
import ApprovalPlotSize from '../screens/approvals/ApprovalPlotSize';
import ApprovalFloors from '../screens/approvals/ApprovalFloors';
import ApprovalsList from '../screens/approvals/ApprovalsList';


const Stack = createNativeStackNavigator();

const SavedStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Approval'
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name='Approval' component={Approval} />
            <Stack.Screen name='ApprovalPlotSize' component={ApprovalPlotSize} />
            <Stack.Screen name='ApprovalFloors' component={ApprovalFloors} />
            <Stack.Screen name='Approvallist' component={ApprovalsList} />
            <Stack.Screen name='ApprovalCategory' component={ApprovalCategory} />
        </Stack.Navigator>
    )
}
export default SavedStack
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ByLaws from '../screens/byLaws/ByLaws';
import ByLawsResidentialCheck from '../screens/byLaws/ByLawsResidentialCheck';
import ByLawsCategory from '../screens/byLaws/ByLawsCategory';
import ByLawsDetail from '../screens/byLaws/ByLawsDetail';


const Stack = createNativeStackNavigator();

const ByLawStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='ByLaws'
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name='ByLaws' component={ByLaws} />
            <Stack.Screen name='BylawsCheckResidential' component={ByLawsResidentialCheck} />
            <Stack.Screen name='BylawsCategory' component={ByLawsCategory} />
            <Stack.Screen name='BylawsDetail' component={ByLawsDetail} />
        </Stack.Navigator>
    )
}
export default ByLawStack


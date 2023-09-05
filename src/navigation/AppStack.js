
import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomeDrawer from '../component/customeDrawer/CustomeDrawer';
import CostEsimator from '../screens/costEstimator/CostEsimator';
import ApprovalStack from "./ApprovalStack"
import FloorPlanStack from './FloorPlanStack';
import Consultancy from '../screens/consultancy/Consultancy';
import LopsStack from './LopsStack';
import Home from '../screens/home/Home';
import ByLawStack from './ByLawStack';
import FAQs from '../screens/faqs/FAQs';
import SoilTesting from '../screens/soilTesting/SoilTesting';
import TermOfUse from '../screens/menuBar/TermOfUse';
import PrivacyPolicies from '../screens/menuBar/PrivacyPolicies';
import FloorSelectPayment from '../screens/floorPlan/screens/FloorSelectPayment';
import SelectPayment from '../screens/costEstimator/screens/SelectPayment';
import PaymentScreen from '../screens/costEstimator/screens/PaymentScreen';

const Drawer = createDrawerNavigator();

const AppStack = ({route}) => {
    const [isEnglish, SelectLanguage] = useState(null);
    // initialParams={{ userId:route.params.userId}}

    const getLocalData = async () => {
        const getLocalLAnguages = await AsyncStorage.getItem('language');
        let isEnglish = await JSON.parse(getLocalLAnguages);
        SelectLanguage(isEnglish)
    }
    useEffect(() => {
        getLocalData()
    }, [getLocalData, SelectLanguage])

    return (
        <Drawer.Navigator
            mode="modal"
            drawerContent={(props) => <CustomeDrawer   {...props} />}
            screenOptions={{
                drawerPosition: isEnglish ? "right" : "left",
                headerShown: false,
                drawerActiveBackgroundColor: 'transparent',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
                swipeEnabled: false,
                drawerStyle: {
                    width: "100%",
                    padding: 0
                },
                drawerLabelStyle: {
                    color: 'red',
                    fontFamily: 'Roboto-Medium',
                    fontSize: 19,
                },
            }}>

            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="CostEstimator" component={CostEsimator} />
            <Drawer.Screen name="ApprovalStack" component={ApprovalStack} />
            <Drawer.Screen name="floorPlanStack" component={FloorPlanStack} />
            <Drawer.Screen name="consultancyStack" component={Consultancy} />
            <Drawer.Screen name="floorselectpayment" component={FloorSelectPayment} />
            <Drawer.Screen name="lopsStack" component={LopsStack} />
            <Drawer.Screen name="byLawsStack" component={ByLawStack} />
            <Drawer.Screen name="FAQs" component={FAQs} />
            <Drawer.Screen name="soilTesting" component={SoilTesting} />
            <Drawer.Screen name="termOfUse" component={TermOfUse} />
            <Drawer.Screen name="privacyPolicy" component={PrivacyPolicies} />
            <Drawer.Screen name="SelectPayment" component={PaymentScreen} />

            

        </Drawer.Navigator>
    )
}
export default AppStack

const styles = StyleSheet.create({})
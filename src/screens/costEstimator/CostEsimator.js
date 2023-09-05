import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SelectProjectName from './screens/SelectProjectName'
import SelectCity from './screens/SelectCity';
import SelectArea from './screens/SelectArea';
import SelectPlotSize from './screens/SelectPlotSize';
import SelectPlotCategory from './screens/SelectPlotCategory';
import SelectFloor from './screens/SelectFloor';
import SelectUnit from './screens/SelectUnit';
import SelcetFloorPlans from './screens/SelcetFloorPlans';
import SelectConstructionQuality from './screens/SelectConstructionQuality';
import BOQGreyStructure from './screens/BOQGreyStructure';
import SelectFinishingMaterial from './screens/SelectFinishingMaterial';
import ContactUs from './screens/ContactUs';
import SaveFile from './screens/SaveFile';
import CompleteBoq from './screens/CompleteBoq';
import SavedCostEsimates from './screens/SavedCostEsimates';
import PaymentScreen from './screens/PaymentScreen';
import BankList from './screens/BankList';
import DownloadScreen from './screens/DownloadScreen';
import ViewSavedCostEstimate from './screens/ViewSavedCostEstimate';
import SelectPayment from './screens/SelectPayment';
import PromoScreen from './screens/PromoScreen';
import BankDetails from './screens/BankDetails';
import InvoiceScreen from './screens/InvoiceScreen';


const Stack = createNativeStackNavigator();
const CostEsimator = ({route}) => {
    // console.log(route.params.userId)
    return (
        <Stack.Navigator
            initialRouteName='selectSavedCostEstimates'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='selectSavedCostEstimates' component={SavedCostEsimates} 
            initialParams={{ userId:route.params.userId}}
            />
            <Stack.Screen name='selectProjectName' component={SelectProjectName} />
            <Stack.Screen name='selectCity' component={SelectCity} />
            <Stack.Screen name='selectArea' component={SelectArea} />
            <Stack.Screen name='selectPlotSize' component={SelectPlotSize} />
            <Stack.Screen name='selectPlotCategory' component={SelectPlotCategory} />
            <Stack.Screen name='selectFloor' component={SelectFloor} />
            <Stack.Screen name='selectUnit' component={SelectUnit} />
            <Stack.Screen name='selcetFloorPlans' component={SelcetFloorPlans} />
            <Stack.Screen name='selectConstructionQuality' component={SelectConstructionQuality} />
            <Stack.Screen name='BOQGreyStructure' component={BOQGreyStructure} />
            <Stack.Screen name='InvoiceScreen' component={InvoiceScreen} />
            <Stack.Screen name='selectFinishingMaterial' component={SelectFinishingMaterial} />
            <Stack.Screen name='completeBoq' component={CompleteBoq} />
            <Stack.Screen name='ContactUs' component={ContactUs} />
            <Stack.Screen name='SaveFile' component={SaveFile} />
            <Stack.Screen name='paymentScreen' component={PaymentScreen} />
            <Stack.Screen name='banklist' component={BankList} />
            <Stack.Screen name='downloadScreen' component={DownloadScreen} />
            <Stack.Screen name='SelectPayment' component={SelectPayment} />
            <Stack.Screen name='ViewEstimate' component={ViewSavedCostEstimate} />
            <Stack.Screen name='PromoScreen' component={PromoScreen} />
            <Stack.Screen name='BankDetails' component={BankDetails} />
        </Stack.Navigator>
    )
}

export default CostEsimator


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/splash/Splash';
import OnBoard from '../screens/onBoard/OnBoard';
import Signup from '../screens/userScreen/Signup';
import SignIn from '../screens/userScreen/SignIn';
import ForgotPassword from '../screens/userScreen/ForgotPassword';
import Otp from '../screens/userScreen/Otp';


const Stack = createNativeStackNavigator();
import AppStack from './AppStack';
import NOnBoard from '../screens/onBoard/NOnBoard';
import Selection from '../screens/onBoard/Selection';
import PasswordChange from '../screens/userScreen/PasswordChange';
import PasswordOtp from '../screens/userScreen/PasswordOtp';
import PaymentScreen from '../screens/costEstimator/screens/PaymentScreen';
import BankDetails from '../screens/costEstimator/screens/BankDetails';
import DownloadScreen from '../screens/costEstimator/screens/DownloadScreen';

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen name='AppStack' component={AppStack} />
        <Stack.Screen name='OnBoard' component={OnBoard} />
        <Stack.Screen name='SignUp' component={Signup} />
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='passwordChange' component={PasswordChange} />
        <Stack.Screen name='passwordOtp' component={PasswordOtp} />
        <Stack.Screen name='ForgetPass' component={ForgotPassword} />
        <Stack.Screen name='Otp' component={Otp} />
        <Stack.Screen name='NOnBoard' component={NOnBoard} />
        <Stack.Screen name='selection' component={Selection} />
        <Stack.Screen name='paymentScreen' component={PaymentScreen}/>
        <Stack.Screen name='BankDetails' component={BankDetails} />
        <Stack.Screen name='downloadScreen' component={DownloadScreen} />




      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})
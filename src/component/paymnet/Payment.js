import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import crypto from 'react-native-crypto';
import { stringify } from 'qs';

const apiEndpoint = 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction';
const apiKey = 'your-api-key';
const apiSecret = 'your-api-secret';

const TransactionScreen = () => {
  const [amount, setAmount] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const initiateTransaction = () => {
    // Example request parameters
    const requestData = {
      PP_Version: '1.1',
      PP_MerchantID: 'your-merchant-id',
      PP_Password: 'your-password',
      PP_TxnType: 'MWALLET',
      PP_TxnRefNo: Math.floor(Math.random() * 1000000), // Example random transaction reference number
      PP_Amount: amount,
      PP_MobileNumber: mobileNumber,
      // ...other request parameters
    };

    // Convert request parameters to a query string
    const requestParams = stringify(requestData, { encode: false });
    const message = `${apiEndpoint}|${requestParams}`;

    // Generate the HMAC-SHA256 hash
    const hmac = crypto.createHmac('sha256', apiSecret);
    hmac.update(message);
    const hash = hmac.digest('hex');

    // Add the HMAC-SHA256 hash to the request headers
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `HMAC-SHA256 ${apiKey}:${hash}`,
    };

    // Make the API request
    fetch(apiEndpoint, {
      method: 'POST',
      headers: headers,
      body: requestParams,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <View>
      <Text>Amount:</Text>
      <TextInput
        value={amount}
        onChangeText={(value) => setAmount(value)}
        keyboardType="numeric"
      />
      <Text>Mobile Number:</Text>
      <TextInput
        value={mobileNumber}
        onChangeText={(value) => setMobileNumber(value)}
        keyboardType="phone-pad"
      />
      <Button title="Initiate Transaction" onPress={initiateTransaction} />
    </View>
  );
};

export default TransactionScreen;

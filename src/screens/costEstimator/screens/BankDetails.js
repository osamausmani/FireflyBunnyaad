import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AppText from '../../../component/appComponnet/AppText';
import { Icon, Colors, Images } from '../../../constants';
import AppSubmitButton from '../../../component/appComponnet/AppSubmitButton';
import Cross from 'react-native-vector-icons/Entypo';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import axios from 'axios';

const BankDetails = ({ navigation, route }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isMobileValid, setIsMobileValid] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const [isLoading, setLoading] = useState(true);

  const validateInputs = () => {
    if (accountNumber.trim() === '') {
      Alert.alert('Account Number', 'Please enter your account number');
      setIsMobileValid(false); // Set validity to false
      return false;
    }

    // Validate phone number
    const phoneNumberPattern = /^03\d{9}$/;
    if (!phoneNumberPattern.test(accountNumber)) {
      setIsMobileValid(false); // Set validity to false
      return false;
    }

    setIsMobileValid(true); // Set validity to true if the phone number is valid
    return true;
  };



  const statusInquiry = async () => {
    const url = 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/PaymentInquiry/Inquire';
  
    const pp_TxnRefNo = 'T20220203110109';
    const pp_MerchantID = 'MC25041';
    const pp_Password = 'sz1v4agvyf';
    const pp_SecureHash = '18494EE9B220CA4ADBE3ED5B597CCBF26E8C6F8BA205A9199A2EC8B87A2C0673';
  
    const response = await axios.post(url, {
      pp_TxnRefNo: pp_TxnRefNo,
      pp_MerchantID: pp_MerchantID,
      pp_Password: pp_Password,
      pp_SecureHash: pp_SecureHash
    });
  
    // console.log('Status Inquiry Response:', response.data);
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      statusInquiry();
    }, 10000); 
  
    return () => clearInterval(interval);
  }, []);
  

 

  const payment = async () => {
    if (!validateInputs()) {
      return;
    }
  
    const dateandtime = moment().format('YYYYMMDDHHmmss');
    const dexpiredate = moment().add(1, 'days').format('YYYYMMDDHHmmss');
    const tre = `T${dateandtime}`;
    const pp_Amount = 6000;
    const pp_BillReference = 'billRef';
    const pp_Description = 'Description';
    const pp_Language = 'EN';
    const pp_MerchantID = 'MC54718';
    const pp_Password = 'wx2332es73';
    const pp_ReturnURL = 'https://yourdomain.com/jcresponse.php';
    const pp_TxnCurrency = 'PKR';
    const pp_TxnDateTime = dateandtime;
    const pp_TxnExpiryDateTime = dexpiredate;
    const pp_TxnRefNo = tre;
    const ppmpf_1 = '';
    const IntegeritySalt = 'y0217xv01u';
    const mobnumber = accountNumber;
    const cnic = '345678';
  
    const superdata = `${IntegeritySalt}&${pp_Amount}&${pp_BillReference}&${cnic}&${pp_Description}&${pp_Language}&${pp_MerchantID}&${mobnumber}&${pp_Password}&${pp_TxnCurrency}&${pp_TxnDateTime}&${pp_TxnExpiryDateTime}&${pp_TxnRefNo}`;
  
    const sha256Result = CryptoJS.HmacSHA256(
      superdata,
      IntegeritySalt,
    ).toString();
  
    const url =
      'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction';
  
    try {
      setLoading(true); // Set loading state to true
  
      const response = await axios.post(url, {
        pp_Language,
        pp_MerchantID,
        pp_Password,
        pp_TxnRefNo: tre,
        pp_BankID: '',
        pp_ProductID: '',
        pp_Amount,
        pp_TxnCurrency,
        pp_TxnDateTime,
        pp_BillReference,
        pp_Description,
        pp_TxnExpiryDateTime,
        pp_ReturnURL,
        pp_SecureHash: sha256Result,
        ppmpf_1,
        ppmpf_2: '',
        ppmpf_3: '',
        ppmpf_4: '',
        ppmpf_5: '',
        pp_MobileNumber: mobnumber,
        pp_CNIC: cnic,
      });
  
      if (response.data.pp_ResponseCode === '156') {
        const interval = setInterval(() => {
          statusInquiry();
        }, 10000);
      } else if (response.data.pp_ResponseCode === '000') {
        Alert.alert(response.data.pp_ResponseMessage);
      } else {
        Alert.alert("Transaction failed due to some Technical issues");
      }
  
      setAccountNumber('');
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false); // Set loading state to false after the response or error occurs
    }
  
    return null;
  };
  
  



  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AppText marginLeft={'5%'} size={20} bold title={'X'} color="#fff" />
        </TouchableOpacity>
        <AppText
          marginLeft={'0%'}
          bold
          size={20}
          title={'Cancel'}
          color="#fff"
        />
      </View>
    );
  };


  const renderBoqTopHeader = () => {
    return (
      <>      
        <View style={styles.totalEstimate}>
          <AppText
            title={'Total Estimate'}
            color={Colors.lightblack}
            size={16}
          />
          <AppText title={`6000 PKR.`} size={16} />
        </View>
      </>
    );
  };

  const handleSubmit = () => {
    payment()
    // console.log('hello')
  };

  const handleOk =()=>{
    navigation.navigate('downloadScreen')
    setModalVisible(false)
  }

  return (
    <View>
      {renderHeader()}
      <View>
        <Text style={{top: 12, textAlign: 'center', fontWeight: 'bold',fontSize:20}}>
          Enter Account Number
        </Text>
      </View>
      <View style={styles.centeredView}>

     { isMobileValid && modalVisible && <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          
          <View style={styles.modalView}>
          <TouchableOpacity 
          onPress={()=> setModalVisible(false)
          }
          style={{
            justifyContent:'flex-end',
            alignItems:'flex-end',
            left:150,
            bottom:12
          }}
          >
            <Text>
            <Cross name="cross" size={29} color="#000" />
            </Text>
          </TouchableOpacity>
            <Text style={styles.modalText }>`The Following Amount {route.params.totalAmount} Deducted Successfully From Your Account {accountNumber}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>handleOk()}>
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>}

      </View>
      {renderBoqTopHeader()}
      
      <View style={styles.inputView}>
        <TextInput
          style={[
            styles.input,
            !isMobileValid && { borderBottomColor: 'red' }, // Apply red border color when the mobile number is invalid
          ]}
          placeholder="03XXXXXXXXX"
          value={accountNumber}
          onChangeText={(text) => setAccountNumber(text)}
          keyboardType="numeric"
        />
        {!isMobileValid && (
          <Text style={{ color: 'red', marginTop: 5 }}>
            Please enter a valid phone number
          </Text>
        )}
      </View>
      <AppSubmitButton
        onPress={() =>  handleSubmit()}
        marginVertical={20}
        name={'Proceed'}
      />
    </View>
  );
}; 

export default BankDetails;

const styles = StyleSheet.create({
  header: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightYello,
    paddingHorizontal: 40,
  },
  inputView: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 16,
    marginHorizontal:22
  },
  input: {
    borderBottomWidth: 0.8,
    height: 40,
    margin: 12,
    paddingHorizontal: 12,
    borderRadius: 15,
    width:'100%'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    flex:1,
    width:'100%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: Colors.lightYello,
    padding:12,
    width:'75%'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize:15,
    fontWeight:'bold',
    color:'#000'
  },
  boqHeader: {
    alignSelf: 'center',
    margin: 15,
  },
  totalEstimate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginHorizontal: 25,
    marginTop: 15,
    marginBottom: 20,
  },
});

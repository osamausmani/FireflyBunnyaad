import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AppText from '../../../component/appComponnet/AppText';
import {Icon, Colors, Images} from '../../../constants';
import AppSubmitButton from '../../../component/appComponnet/AppSubmitButton';
import AppFormField from '../../../constants';

const PromoScreen = ({navigation}) => {
  const [promocode, setpromocode] = useState('');

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

  const handleSubmit = () => {
    console.log(promocode);
    console.log('hello')
  };

  return (
    <View>
      {renderHeader()}
      <View>
        <Text style={{top: 12, textAlign: 'center', fontWeight: 'bold',fontSize:20}}>
          Enter Promo Code
        </Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="0000"
          value={promocode}
          onChangeText={text => setpromocode(text)}
        />
      </View>
      <AppSubmitButton
        onPress={() =>  handleSubmit()}
        marginVertical={20}
        name={'Proceed'}
      />
    </View>
  );
};

export default PromoScreen;

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
});

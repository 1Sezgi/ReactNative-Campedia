
import React from 'react';
import {TextInput} from 'react-native';
import {darkGreen} from './Constant';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 100, color: darkGreen, paddingHorizontal: 20, width: '90%', height: 50, backgroundColor: 'rgb(220,220, 220)', marginVertical: 10, marginLeft:'5%'}}
      placeholderTextColor={darkGreen}></TextInput>
  );
};

export default Field;
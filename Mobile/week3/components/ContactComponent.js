import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import { Text } from 'react-native';

const style = {
  margin: 5
};

class Contact extends Component {
  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card title="Contact Information">
          <Text style={style}>121, Clear Water Bay Road</Text>
          <Text style={style}>Clear Water Bay, Kowloon</Text>
          <Text style={style}>HONG KONG</Text>
          <Text style={style}>Tel: +852 1234 5678</Text>
          <Text style={style}>Fax: +852 8765 4321</Text>
          <Text style={style}>Email:confusion@food.net</Text>
        </Card>
      </Animatable.View>
    );
  }
}

export default Contact;

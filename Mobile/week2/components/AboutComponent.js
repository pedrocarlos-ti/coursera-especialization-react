import React, { Component } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const style = {
  margin: 5
};

function History() {
  return (
    <Card title="Our History">
      <Text style={style}>
        Started in 2010, Ristorante con Fusion quickly established itself as a
        culinary icon par excellence in Hong Kong. With its unique brand of
        world fusion cuisine that can be found nowhere else, it enjoys patronage
        from the A-list clientele in Hong Kong. Featuring four of the best
        three-star Michelin chefs in the world, you never know what will arrive
        on your plate the next time you visit us.
      </Text>
      <Text style={style}>
        The restaurant traces its humble beginnings to The Frying Pan, a
        successful chain started by our CEO, Mr. Peter Pan, that featured for
        the first time the world's best cuisines in a pan.
      </Text>
    </Card>
  );
}

function Leadership({ item }) {
  return (
    <ListItem
      leftAvatar={{
        source: {
          uri: baseUrl + item.image
        }
      }}
      title={item.name}
      subtitle={item.description}
    />
  );
}

class About extends Component {
  render() {
    if (this.props.leaders.isLoading) {
      return (
        <ScrollView style={{ marginBottom: 15 }}>
          <History />

          <Card title="Comporate Leadership">
            <Loading />
          </Card>
        </ScrollView>
      );
    } else if (this.props.leaders.errMess) {
      return (
        <ScrollView style={{ marginBottom: 15 }}>
          <History />

          <Card title="Comporate Leadership">
            <Text>{this.props.leaders.errMess}</Text>
          </Card>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={{ marginBottom: 15 }}>
          <History />

          <Card title="Comporate Leadership">
            <FlatList
              data={this.props.leaders.leaders}
              renderItem={Leadership}
              keyExtractor={item => item.id.toString()}
            />
          </Card>
        </ScrollView>
      );
    }
  }
}

const mapStateToProps = state => ({
  leaders: state.leaders
});

export default connect(mapStateToProps)(About);

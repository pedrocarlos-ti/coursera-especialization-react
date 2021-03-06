import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';

import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS
    };
  }

  static navigationOptions = {
    title: 'Dish Details'
  };

  render() {
    const dishId = this.props.navigation.getParam('dishId', '');

    return (
      <ScrollView>
        <RenderDish dish={this.state.dishes[+dishId]} />
        <Text>oi</Text>
        <RenderComments
          comments={this.state.comments.filter(
            comment => comment.dishId === dishId
          )}
        />
      </ScrollView>
    );
  }
}

function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {'-- ' + item.author + ', ' + item.date}{' '}
        </Text>
      </View>
    );
  };

  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  );
}

function RenderDish(props) {
  const dish = props.dish;

  if (dish != null) {
    return (
      <Card
        featuredTitle={dish.name}
        image={require('./images/uthappizza.png')}
      >
        <Text style={{ margin: 10 }}>{dish.description}</Text>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

export default DishDetail;

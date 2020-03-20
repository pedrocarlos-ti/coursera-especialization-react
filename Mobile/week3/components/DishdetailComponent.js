import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  Button,
  Alert,
  PanResponder,
  Share
} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

class DishDetail extends Component {
  static navigationOptions = {
    title: 'Dish Details'
  };

  state = {
    isModalEnable: false
  };

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  changeModalState() {
    this.setState({
      isModalEnable: !this.state.isModalEnable,
      author: '',
      comment: '',
      rating: 0
    });
  }

  postComment() {
    const { author, comment, rating } = this.state;
    const dishId = this.props.navigation.getParam('dishId', '');

    this.props.postComment(dishId, rating, author, comment);
    this.changeModalState();
  }

  render() {
    const dishId = this.props.navigation.getParam('dishId', '');

    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          openModal={() => this.changeModalState()}
          postComment={() => {}}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            comment => comment.dishId === dishId
          )}
        />

        <Modal
          visible={this.state.isModalEnable}
          animated="slide"
          onDismiss={() => this.changeModalState()}
          onRequestClose={() => this.changeModalState()}
        >
          <View style={{ marginTop: 15, margin: 10 }}>
            <Rating
              imageSize={30}
              minValue={0}
              ratingCount={5}
              startingValue={0}
              showRating
              onFinishRating={rating => this.setState({ rating })}
            />

            <Input
              leftIcon={{ type: 'font-awesome', name: 'user-o' }}
              placeholder="Author"
              value={this.state.author}
              onChangeText={author => this.setState({ author })}
              inputStyle={{ paddingLeft: 10 }}
            />

            <Input
              leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
              placeholder="Comment"
              value={this.state.comment}
              onChangeText={comment => this.setState({ comment })}
              inputStyle={{ paddingLeft: 7 }}
            />

            <View style={{ margin: 5 }} />

            <Button
              title="Submit"
              onPress={() => this.postComment()}
              color="#512DA7"
            />

            <View style={{ margin: 5 }} />

            <Button
              title="Cancel"
              onPress={() => this.changeModalState()}
              color="#808080"
            />
          </View>
        </Modal>
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
        <Rating
          readonly
          ratingCount={item.rating}
          imageSize={12}
          style={{ alignSelf: 'flex-start', marginTop: 10, marginBottom: 10 }}
        />
        <Text style={{ fontSize: 12 }}>
          {'-- ' + item.author + ', ' + item.date}{' '}
        </Text>
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

function RenderDish(props) {
  const dish = props.dish;

  handleViewRef = ref => (this.view = ref);

  function shareDish(title, message, url) {
    Share.share(
      {
        title,
        url,
        message: `${title} - ${message} - ${url}`
      },
      {
        dialogTitle: `Share ${title} with... `
      }
    );
  }

  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200) return true;
    else return false;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderGrant: () => {
      this.view
        .rubberBand(1000)
        .then(endState =>
          console.log(endState.finished ? 'finished' : 'cancelled')
        );
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log('pan responder end', gestureState);
      if (recognizeDrag(gestureState))
        Alert.alert(
          'Add Favorite',
          'Are you sure you wish to add ' + dish.name + ' to favorite?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            {
              text: 'OK',
              onPress: () => {
                props.favorite
                  ? console.log('Already favorite')
                  : props.onPress();
              }
            }
          ],
          { cancelable: false }
        );

      return true;
    }
  });

  if (dish != null) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        ref={this.handleViewRef}
        {...panResponder.panHandlers}
      >
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Icon
              raised
              reverse
              name={props.favorite ? 'heart' : 'heart-o'}
              type="font-awesome"
              color="#f50"
              onPress={() =>
                props.favorite
                  ? console.log('Already favorite')
                  : props.onPress()
              }
            />
            <Icon
              raised
              reverse
              name="pencil"
              type="font-awesome"
              color="#512DA7"
              onPress={() => props.openModal()}
            />

            <Icon
              raised
              reverse
              name="share"
              type="font-awesome"
              color="#51D2A8"
              onPress={() =>
                shareDish(dish.name, dish.description, baseUrl + dish.image)
              }
            />
          </View>
        </Card>
      </Animatable.View>
    );
  } else {
    return <View></View>;
  }
}

const mapStateToProps = state => ({
  dishes: state.dishes,
  comments: state.comments,
  favorites: state.favorites
});

const mapDispatchToProps = dispatch => ({
  postFavorite: dishId => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);

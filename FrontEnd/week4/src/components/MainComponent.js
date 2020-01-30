import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders
  //fetchDishesByAction
} from '../redux/actions/ActionCreators';

const mapStateToProps = state => ({
  dishes: state.dishes,
  comments: state.comments,
  promotions: state.promotions,
  leaders: state.leaders
});

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  // fetchDishes: () => dispatch(fetchDishesByAction([]))
  resetFeedbackForm: () => dispatch(actions.reset('feedback'))
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    console.log({ leaders: this.props.leaders });
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErr={this.props.dishes.err}
          promotion={
            this.props.promotions.promotions.filter(promo => promo.featured)[0]
          }
          promosLoading={this.props.promotions.isLoading}
          promosErr={this.props.promotions.err}
          leader={
            this.props.leaders.leaders.filter(leader => leader.featured)[0]
          }
          leadersLoading={this.props.leaders.isLoading}
          leadersErr={this.props.leaders.err}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              dish => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          dishesLoading={this.props.dishes.isLoading}
          dishesErr={this.props.dishes.err}
          comments={this.props.comments.comments.filter(
            comment => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          commentsErr={this.props.comments.err}
          postComment={this.props.postComment}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route
                exact
                path="/menu"
                component={() => <Menu dishes={this.props.dishes} />}
              />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route
                exact
                path="/contactus"
                component={() => (
                  <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
                )}
              />
              <Route
                exact
                path="/aboutus"
                component={() => <About leaders={this.props.leaders} />}
              />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

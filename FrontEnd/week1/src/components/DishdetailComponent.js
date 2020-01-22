import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  renderDish(dish) {
    if (dish != null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <div />;
    }
  }

  renderComments(comments) {
    if (comments != null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          {comments.map(comment => (
            <ul key={comment.id} className="list-unstyled">
              <li>{comment.comment}</li>
              <li>
                -- {comment.author},{' '}
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit'
                }).format(new Date(Date.parse(comment.date)))}
              </li>
            </ul>
          ))}
        </div>
      );
    } else {
      return <div />;
    }
  }

  render() {
    const { dish } = this.props;

    if (dish != null) {
      return (
        <div class="container">
          <div className="row">
            {this.renderDish(dish)}
            {this.renderComments(dish.comments)}
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default DishDetail;

import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col
} from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';

import { Link } from 'react-router-dom';

const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends Component {
  state = {
    isOpen: false
  };

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleSubmit = values => {
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.name,
      values.comment
    );
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={v => this.handleSubmit(v)}>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select
                    model=".rating"
                    name="rating"
                    id="rating"
                    defaultValue="1"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>

              <Row className="form-group">
                <Col>
                  <Label htmlFor="name">Your Name</Label>
                  <Control.text
                    model=".name"
                    name="name"
                    id="name"
                    placeholder="Type your name"
                    className="form-control"
                    validators={{
                      minLength: minLength(2),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col>
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea
                    model=".comment"
                    name="comment"
                    id="comment"
                    className="form-control mb-3"
                    placeholder="Type the message"
                    rows={6}
                  />
                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>

        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil mr-1" />
          Submit Comment
        </Button>
      </div>
    );
  }
}

function RenderDish({ dish }) {
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

function RenderComments({ dishId, comments, addComment }) {
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
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    );
  } else {
    return <div />;
  }
}

const DishDetail = props => {
  const { dish } = props;

  if (dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>

        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments
            comments={props.comments}
            addComment={props.addComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

export default DishDetail;

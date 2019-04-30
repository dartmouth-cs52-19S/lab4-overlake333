import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import { fetchPosts } from '../actions';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    if (this.props.posts) {
      return (
        <div id="notesContainer">
          {this.props.posts.map((post) => {
            return (
              <NavLink key={post.id} to={`/posts/${post.id}`}>
                <div id="post">
                  <div id="postTitle">{post.title}</div>
                  <img id="postImage" alt={`${post.id}coverImage`} src={post.cover_url} />
                  <div id="postTag">{post.tags}</div>
                </div>
              </NavLink>
            );
          })}
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

const mapStateToProps = state => (
  {
    posts: state.posts.all,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));

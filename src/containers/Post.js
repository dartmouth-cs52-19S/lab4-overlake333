/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import marked from 'marked';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchPost, updatePost, deletePost } from '../actions';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.post.title,
      cover_url: props.post.cover_url,
      content: props.post.content,
      tags: props.post.tags,
      isEditing: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.isEditingCurr = this.isEditingCurr.bind(this);
    this.renderNewPost = this.renderNewPost.bind(this);
    this.makeNewInputTitle = this.makeNewInputTitle.bind(this);
    this.makeNewInputCoverURL = this.makeNewInputCoverURL.bind(this);
    this.makeNewInputContent = this.makeNewInputContent.bind(this);
    this.makeNewInputTags = this.makeNewInputTags.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  componentWillReceiveProps(props) {
    this.setState({
      title: props.post.title,
      content: props.post.content,
      tags: props.post.tags,
      cover_url: props.post.cover_url,
      isEditing: false,
    });
  }

  onInputChange(event) {
    const { id } = event.target;

    if (id === 'title') {
      this.setState({ title: event.target.value });
    } else if (id === 'content') {
      this.setState({ content: event.target.value });
    } else if (id === 'tags') {
      this.setState({ tags: event.target.value });
    } else if (id === 'cover_url') {
      this.setState({ cover_url: event.target.value });
    }
  }

  updatePost(event) {
    event.preventDefault();
    this.setState({ isEditing: false });
    // console.log(this.state);
    this.props.updatePost(this.props.match.params.postID, this.state);
  }

  isEditingCurr() {
    this.setState({ isEditing: true });
  }

  deletePost() {
    this.props.deletePost(this.props.match.params.postID, this.props.history);
  }

  makeNewInputTitle() {
    return (
      <label htmlFor="title">title
        <textarea id="title" className="inputField" value={this.state.title} onChange={this.onInputChange} />
      </label>
    );
  }

  makeNewInputCoverURL() {
    return (
      <label htmlFor="cover_url">cover_url
        <textarea id="cover_url" className="inputField" value={this.state.cover_url} onChange={this.onInputChange} />
      </label>
    );
  }

  makeNewInputContent() {
    return (
      <label htmlFor="content">content
        <textarea id="content" className="inputField" value={this.state.content} onChange={this.onInputChange} />
      </label>
    );
  }

  makeNewInputTags() {
    return (
      <label htmlFor="tags">tags
        <textarea id="tags" className="inputField" value={this.state.tags} onChange={this.onInputChange} />
      </label>
    );
  }

  // toggling between editing and updating
  renderEdit() {
    if (this.state.isEditing) {
      return (
        <button type="button" id="editButton" onClick={this.updatePost}>Update</button>
      );
    } else {
      return (
        <button type="button" id="editButton" onClick={this.isEditingCurr}>Edit</button>
      );
    }
  }

  renderNewPost() {
    if (this.state.isEditing) {
      return (
        <div>
          <form id="inputContainer">
            {this.makeNewInputTitle()}
            {this.makeNewInputCoverURL()}
            {this.makeNewInputContent()}
            {this.makeNewInputTags()}
          </form>
        </div>
      );
    } else {
      return (
        <div id="note">
          <div id="noteTitle">{this.state.title}</div>
          <div id="noteImage">
            <img alt={`${this.state.id}coverImage`} src={this.state.cover_url} />
          </div>
          <div id="noteContent" dangerouslySetInnerHTML={{ __html: marked(this.state.content || '') }} />
          <div id="noteTag">{this.state.tags}</div>
        </div>
      );
    }
  }

  render() {
    if (this.props.post) {
      return (
        <div>
          <div id="editNode">
            <div id="editButtonContainer">
              <NavLink to="/">
                <button type="button" id="editButton">
                    Back
                </button>
              </NavLink>
              {this.renderEdit()}
              <button type="button" id="editButton" onClick={this.deletePost}><i className="fa fa-trash-o fa-lg" /></button>
            </div>
          </div>

          <div id="editNoteContainer">
            {this.renderNewPost()}
          </div>

        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

const mapStateToProps = state => (
  {
    post: state.posts.post,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPost, updatePost, deletePost })(Post));

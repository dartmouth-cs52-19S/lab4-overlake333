import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost } from '../actions';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: '',
      cover_url: '',
    };
    this.create = this.create.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    const { id } = event.target;
    // console.log(id);
    // console.log(event.id);
    if (id === 'title') {
      this.setState({ title: event.target.value });
      console.log(this.state);
    } else if (id === 'content') {
      this.setState({ content: event.target.value });
    } else if (id === 'tags') {
      this.setState({ tags: event.target.value });
    } else if (id === 'cover_url') {
      this.setState({ cover_url: event.target.value });
    }
  }

  create() {
    // XTRA CREDIT: added a check to make sure the website is not added a null recipe container
    if (this.state.title !== '' && this.state.cover_url !== '' && this.state.content !== '' && this.state.tags !== '') {
      this.props.createPost({
        title: this.state.title,
        tags: this.state.tags,
        content: this.state.content,
        cover_url: this.state.cover_url,
      },
      this.props.history);
    } else {
      // eslint-disable-next-line no-alert
      alert('Warning: Please fill out all of textboxes before you continue.');
    }
  }

  render() {
    return (
      <div id="NEWNote">
        <form id="inputContainer">
          <label htmlFor="title">Title
            <textarea id="title" onChange={this.onInputChange} value={this.state.title} />
          </label>
          <label htmlFor="cover_url">Cover Url
            <textarea id="cover_url" onChange={this.onInputChange} value={this.state.cover_url} />
          </label>
          <label htmlFor="content">Content
            <textarea id="content" onChange={this.onInputChange} value={this.state.content} />
          </label>
          <label htmlFor="tags">Tags
            <textarea id="tags" onChange={this.onInputChange} value={this.state.tags} />
          </label>
        </form>
        <button type="button" id="createButton" onClick={this.create}> Create Recipe </button>
      </div>
    );
  }
}

export default withRouter(connect(null, { createPost })(NewPost));

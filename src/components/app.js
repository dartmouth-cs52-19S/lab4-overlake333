import React from 'react';
import {
  Switch, BrowserRouter as Router, Route,
} from 'react-router-dom';
import Navbar from './NavBar';
import '../style.scss';
import newPost from '../containers/newPost';
import Post from '../containers/Post';
import Posts from '../containers/posts';

// XTRA-CREDIT: made my app into something different than a blog. It is an online recipe library
// where you can add, edit, and delete recipies
const App = () => {
  return (
    <Router>
      <div className="app container">
        <Navbar />
        <div id="image">
          <img id="backgroundImg" src="https://static01.nyt.com/images/2018/04/29/magazine/29mag-eat1/29mag-eat1-threeByTwoMediumAt2X.jpg" alt="food" />
        </div>
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={newPost} />
          <Route path="/posts/:postID" component={Post} />

          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>

  );
};

export default App;

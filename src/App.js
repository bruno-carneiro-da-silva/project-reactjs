import './App.css'
import { Component } from 'react'
import {loadPosts} from './utils/load-post';
import { Posts } from './components/Posts';

class App extends Component {
  //class fields without the constructor
  state = {
    posts: [],
  }
  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadPosts();
    this.setState({ posts: postsAndPhotos })
  }

  render() {
    const { posts } = this.state

    return (
      <section className="container">
        <Posts posts={posts }/>
      </section>
    );
  }
}
export default App

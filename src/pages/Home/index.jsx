import './styles.css'
import { Component } from 'react'
import {loadPosts} from './../../utils/load-post';
import { Posts } from '../../components/Posts/index';
import { Button } from '../../components/Button';

export class Home extends Component {
  //class fields without the constructor
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2
  }
  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const {page,postsPerPage} = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,

    })
  }

  loadMorePosts = () => {
    const {
      page, postsPerPage, allPosts, posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({posts, page: nextPage});
  }

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;

    const noMorePosts = page + postsPerPage >= allPosts.length;

    return (
      <section className="container">
        <Posts posts={posts}/>

        <div class="button-container">
        <Button
          disabled={noMorePosts}
          onClick={this.loadMorePosts}
          text="load posts"/>
        </div>

      </section>
    );
  }
}

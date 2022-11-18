import './styles.css'
import { Component } from 'react'
import {loadPosts} from './../../utils/load-post';
import { Posts } from '../../components/Posts/index';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  //class fields without the constructor
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue:''
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

  // input event
  handleChange = (e) => {
    const {value} = e.target;
    this.setState({searchValue: value});
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    //filtering the posts
    const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase())
    })
    : posts;

    return (
      <section className="container">
        {/* Showing the result if there is any value */}
      <div className="search-container">
        {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
        )}


          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
      </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts}/>
        )}


        {filteredPosts.length === 0 && (
          <p>Não foi encontrado nenhum post!</p>
        )}

        <div className="button-container">
          {/* If there is any search hide the button */}
          {!searchValue && (
              <Button
              disabled={noMorePosts}
              onClick={this.loadMorePosts}
              text="load posts"/>
          )}
        </div>

      </section>
    );
  }
}

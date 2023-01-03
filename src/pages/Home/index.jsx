import './styles.css'
import { useState, useEffect, useCallback} from 'react'
import {loadPosts} from './../../utils/load-post';
import { Posts } from '../../components/Posts/index';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () =>{

  const[posts, setPosts] = useState([]);
  const[allPosts, setAllPosts] = useState([]);
  const[page, setPage] = useState(0)
  const [postsPerPage] = useState(10);
  const[searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue
  ?
  allPosts.filter(post => {
    return post.title.toLowerCase().includes(
      searchValue.toLowerCase());
  })
  : posts;



    const handleLoadPosts = useCallback( async (page, postsPerPage) => {

    //ziping the arrays together
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() =>{
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, page, postsPerPage]);

  // loading the posts and photos
  const loadMorePosts = () => {

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({posts, page: nextPage});
    setPosts(posts);
    setPage(nextPage);
  }

  // input event
  const handleChange = (e) => {
    const {value} = e.target;
    setSearchValue(value);
  }

  return (
    <section className="container">
      {/* Showing the result if there is any value */}
    <div className="search-container">
      {!!searchValue && (
          <h1>Search value: {searchValue}</h1>
      )}


        <TextInput
          searchValue={searchValue}
          handleChange={handleChange}
        />
    </div>

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts}/>
      )}


      {filteredPosts.length === 0 && (
        <p>It doesn't exist!</p>
      )}

      <div className="button-container">
        {/* If there is any search hide the button */}
        {!searchValue && (
            <Button
            disabled={noMorePosts}
            onClick={loadMorePosts}
            text="Load more"/>
        )}
      </div>

    </section>
  );

}

// export class Home2 extends Component {
//   //class fields without the constructor
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 8,
//     searchValue:''
//   }
//   async componentDidMount() {
//     await this.loadPosts();
//   }

//   loadPosts = async () => {
//     const { page, postsPerPage } = this.state;

//     //ziping the arrays together
//     const postsAndPhotos = await loadPosts();
//     this.setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos,

//     })
//   }
//   // loading the posts and photos

//   loadMorePosts = () => {
//     const {
//       page,
//       postsPerPage,
//       allPosts,
//       posts
//     } = this.state;
//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nextPosts);

//     this.setState({posts, page: nextPage});
//   }

//   // input event
//   handleChange = (e) => {
//     const {value} = e.target;
//     this.setState({searchValue: value});
//   }

//   render() {
//     const {
//       posts,
//       page,
//       postsPerPage,
//       allPosts,
//       searchValue } = this.state;
//     const noMorePosts = page + postsPerPage >= allPosts.length;

//     //filtering the posts
//     const filteredPosts = !!searchValue
//     ?
//     allPosts.filter(post => {
//       return post.title.toLowerCase().includes(
//         searchValue.toLowerCase())
//     })
//     : posts;

//     return (
//       <section className="container">
//         {/* Showing the result if there is any value */}
//       <div className="search-container">
//         {!!searchValue && (
//             <h1>Search value: {searchValue}</h1>
//         )}


//           <TextInput
//             searchValue={searchValue}
//             handleChange={this.handleChange}
//           />
//       </div>

//         {filteredPosts.length > 0 && (
//           <Posts posts={filteredPosts}/>
//         )}


//         {filteredPosts.length === 0 && (
//           <p>It doesn't exist!</p>
//         )}

//         <div className="button-container">
//           {/* If there is any search hide the button */}
//           {!searchValue && (
//               <Button
//               disabled={noMorePosts}
//               onClick={this.loadMorePosts}
//               text="Load more"/>
//           )}
//         </div>

//       </section>
//     );
//   }
// }

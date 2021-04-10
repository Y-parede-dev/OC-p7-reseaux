

import RecipeReviewCard from './Card';
import CreatePost from './CreatePost';
import {useState} from 'react';
function Main({isConected, setIsConected}){
  const [postM, setPostM] = useState(false);
  const url="http://localhost:3001/api";
  const urlPost =`${url}/post`
  console.log(urlPost)
    return(
        <main>
            { isConected &&
            <div className="content-main" key={Date.now()}>
                <CreatePost postM={postM} setPostM={setPostM}/>
                <RecipeReviewCard url={urlPost} postM={postM} setPostM={setPostM}/>
            </div>
            }
        </main>
    )
};
export default Main;
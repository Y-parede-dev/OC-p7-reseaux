

import RecipeReviewCard from './Card';
import CreatePost from './CreatePost';
function Main({isConected, setIsConected}){
    
    return(
        <div>
            { isConected &&
            <div key={Date.now()}>
                <CreatePost />
                <RecipeReviewCard />
            </div>
            }
        </div>
    )
};
export default Main;
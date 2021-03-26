

import RecipeReviewCard from './Card';
import CreatePost from './CreatePost';
function Main({isConected, setIsConected}){
    
    return(
        <main>
            { isConected &&
            <div className="content-main" key={Date.now()}>
                <CreatePost />
                <RecipeReviewCard />
            </div>
            }
        </main>
    )
};
export default Main;
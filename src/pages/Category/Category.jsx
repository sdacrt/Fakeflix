import "./category.scss"
import Poster from "../../components/Poster/Poster";
import { useState } from "react";
import { useRetrieveCategory } from "../../hooks/useRetrieveCategory";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Category = ({match}) => {
    const [page, setPage] = useState(1);
    const { url } = match;
    const slicedUrl = url.split("/");
    const { categoryName } = useParams();
    const categoryData = useRetrieveCategory(slicedUrl[1], categoryName, page);
    const preventUndefinedSelector = () => undefined;
    const selector = categoryData ? categoryData.selector : preventUndefinedSelector;
    const selectedGenre = useSelector(selector);

    return (
        <div className="Category">
            {categoryData && (
                <>
                    <h2 className="Category__title">{categoryData.title}</h2>
                    <button onClick={()=> setPage(page+1)}>Change page</button>

                    <div className="Category__wrp">
                        {!selectedGenre.loading && !selectedGenre.error && selectedGenre.data && selectedGenre.data.length > 0
                            && selectedGenre.data.map(result => (
                                <Poster
                                    key={result.id}
                                    item={result}
                                    {...result}
                                />
                            ))
                        }
                        {selectedGenre.loading && <div className='Category__subtitle'>Loading...</div>}
                        {selectedGenre.error && <div className='Category__subtitle'>Error occurred.</div>}
                    </div>
                </>
            )}
        </div>
    )
}

export default Category

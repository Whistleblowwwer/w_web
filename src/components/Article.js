import { useContext, react } from 'react';
import imgParaTi from "../assets/parati_img.png";
import { redirect, useLocation, useNavigate } from "react-router-dom";


function Article({ article, FunctionContext }) {
    const navigate = useNavigate();

    const handleBusinessClick = async () => {
        // Construct the URL with multiple query parameters
        navigate(`/SingleArticle?_id_article=${article._id_article}&title=${encodeURIComponent(article.title)}&subtitle=${encodeURIComponent(article.subtitle)}&content=${encodeURIComponent(article.content)}&img_url=${encodeURIComponent(article.img_url)}&createdAt=${encodeURIComponent(article.createdAt)}&author_name=${encodeURIComponent(article.Author.name)}`);


    };

    return (
        <div className="w-full rounded overflow-hidden shadow-lg pt-3 flex" onClick={() => handleBusinessClick()}>
            <img className="w-1/3" src={article.img_url} alt={article.title} />
            <div className="w-2/3 px-6 py-4">
                <div className="font-bold text-xl mb-2">{article.title}</div>
                <p className="text-gray-700 text-lg mb-4">{article.subtitle}</p>
               
                <p className="text-gray-600 text-sm">{new Date(article.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
}

export default Article
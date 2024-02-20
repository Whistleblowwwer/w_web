import { useContext, react } from 'react';
import imgParaTi from "../assets/parati_img.png";
import { redirect, useLocation, useNavigate } from "react-router-dom";


function Article({ article, FunctionContext }) {
    const navigate = useNavigate();

    const handleBusinessClick = async () => {
        navigate(`/SingleArticle?title=${article.title}&subtitle=${article.subtitle}&author=${article.Author.name}&img_url=${article.img_url}&createdAt=${article.createdAt}&content=${article.content}`);
    };

    return (
        <div className="w-full rounded overflow-hidden shadow-lg pt-3" onClick={() => handleBusinessClick()}>
            <img className="w-full" src={article.img_url} alt={article.title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{article.title}</div>
                <p className="text-gray-700 text-lg">{article.subtitle}</p>
                <p className="text-gray-600 text-sm mt-2">Autor: {article.Author.name}</p>
                <p className="text-gray-600 text-sm">Fecha: {new Date(article.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
}

export default Article
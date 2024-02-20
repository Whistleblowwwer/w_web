import { useLocation } from "react-router-dom";

function SingleArticle() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Retrieve individual query parameters
    const title = queryParams.get("title") || "No title";
    const subtitle = queryParams.get("subtitle") || "No subtitle";
    const author = queryParams.get("author") || "No author";
    const createdAt = queryParams.get("createdAt") || "No createdAt";
    const formattedCreatedAt = new Date(createdAt).toLocaleDateString();
    const content = queryParams.get("content") || "";
    const img_url = queryParams.get("img_url") || "No img";

    return (
        <div className="max-w-4xl mx-auto py-1">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">{title}</h1>
                    <h2 className="text-xl font-semibold text-gray-600">{subtitle}</h2>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-gray-600">{formattedCreatedAt}</p>
                        <p className="text-gray-600">Autor: {author}</p>
                    </div>
                </div>
                <div className="mb-8">
                    <img className="w-full" src={img_url} alt={title} />
                </div>
                <div className="text-lg leading-relaxed">{content}</div>
            </div>
        </div>
    );
}

export default SingleArticle;

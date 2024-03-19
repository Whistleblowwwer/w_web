import { useLocation } from "react-router-dom";
import Markdown from 'markdown-to-jsx';

function SingleArticle() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Retrieve individual query parameters
    const title = queryParams.get("title");
    const subtitle = queryParams.get("subtitle");
    const content = queryParams.get("content");
    const img_url = queryParams.get("img_url");
    const createdAt = queryParams.get("createdAt");
    const formattedCreatedAt = new Date(createdAt).toLocaleDateString();
    const author_name = queryParams.get("author_name");

    console.log("content", content)

    return (
        <div className="max-w-4xl mx-auto py-1">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">{title}</h1>
                    <h2 className="text-xl font-semibold text-gray-600">{subtitle}</h2>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-gray-600">{formattedCreatedAt}</p>
                        <p className="text-gray-600">Autor: {author_name}</p>
                    </div>
                </div>
                <div className="container">
                    <Markdown
                        options={{
                            overrides: {
                                h1: {
                                    component: 'h1',
                                    props: {
                                        className: 'text-2xl font-bold mb-2',
                                    },
                                },
                                h2: {
                                    component: 'h2',
                                    props: {
                                        className: 'text-2xl font-semibold text-gray-600',
                                    },
                                },
                                h3: {
                                    component: 'h3',
                                    props: {
                                        className: 'text-xl font-semibold text-gray-600',
                                    },
                                },
                                p: {
                                    component: 'p',
                                    props: {
                                        className: 'text-gray-600 pb-5',
                                    },
                                },
                                img: {
                                    component: 'img',
                                    props: {
                                        className: 'w-full',
                                    },
                                },
                            },
                        }}>
                        {content}
                    </Markdown>
                </div>
            </div>
        </div>
    );
}

export default SingleArticle;

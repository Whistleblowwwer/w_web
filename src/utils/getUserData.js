export async function getPostes(users) {
    try {
        if (users && users._id_user) {
            const myHeaders = new Headers();
            myHeaders.append("authorization", `Bearer ${localStorage.token}`);

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };

            const response = await fetch(
                `https://api.whistleblowwer.net/users/reviews?_id_user=${users._id_user}`,
                requestOptions
            );
            const parseRes = await response.json();

            // Check if 'reviews' property exists before setting the state
            if (parseRes.reviews) {
                return parseRes.reviews; // Return reviews if available
            } else {
                console.warn("El objeto business no tiene la propiedad 'reviews'");
                return []; // Return an empty array if reviews are not available
            }
        } else {
            console.error("El objeto business no tiene la propiedad _id_user");
            return []; // Return an empty array if _id_user is not available
        }
    } catch (err) {
        console.error(err.message);
        throw err; // Rethrow the error to handle it where the function is called
    }
}

export async function getComments(users) {
    try {
        if (users && users._id_user) {
            const myHeaders = new Headers();
            myHeaders.append("authorization", `Bearer ${localStorage.token}`);

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };

            const response = await fetch(
                `https://api.whistleblowwer.net/users/comments?_id_user=${users._id_user}`,
                requestOptions
            );
            const parseRes = await response.json();

            // Check if 'comments' property exists before returning
            if (parseRes.comments) {
                return parseRes.comments; // Return comments if available
            } else {
                console.warn("El objeto business no tiene la propiedad 'comments'");
                return []; // Return an empty array if comments are not available
            }
        } else {
            console.error("El objeto business no tiene la propiedad _id_user");
            return []; // Return an empty array if _id_user is not available
        }
    } catch (err) {
        console.error(err.message);
        throw err; // Rethrow the error to handle it where the function is called
    }
}


export async function getProjects(users) {
    try {
        if (users && users._id_user) {
            const myHeaders = new Headers();
            myHeaders.append("authorization", `Bearer ${localStorage.token}`);

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };

            const response = await fetch(
                `https://api.whistleblowwer.net/users/business/followed`,
                requestOptions
            );
            const parseRes = await response.json();

            // Check if 'reviews' property exists before setting the state
            if (parseRes.businesses) {
                return parseRes.businesses;
            } else {
                console.warn("El objeto business no tiene la propiedad 'reviews'");
            }
        } else {
            console.error("El objeto business no tiene la propiedad _id_user");
        }
    } catch (err) {
        console.error(err.message);
    }
}
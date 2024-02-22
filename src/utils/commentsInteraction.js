export const handleLikeComment = async (_id_comment) => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${localStorage.token}`);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
    };

    try {
        const url = `https://api.whistleblowwer.net/users/comments/like/?_id_comment=${_id_comment}`;
        const response = await fetch(url, requestOptions);
    } catch (err) {
        console.error(err.message);
        throw err; // Rethrow the error to handle it where the function is called
    }
};

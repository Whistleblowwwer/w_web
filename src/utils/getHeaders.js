const getHeaders = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("authorization", `Bearer ${localStorage.token}`);
  return myHeaders;
};

export default getHeaders;

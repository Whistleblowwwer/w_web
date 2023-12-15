const uploadFiles = async (url, headers, files) => {
  try {
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append(`fileN_${index}`, file);
    });

    formData.forEach((file) => console.log(file));

    // const response = await fetch(url, {
    //   headers: headers,
    //   method: "POST",
    //   body: formData,
    // });

    // if (!response.ok) {
    //   throw new Error(`Error al subir los archivos: ${response.statusText}`);
    // }

    // const data = await response.json();
    // return data;
  } catch (error) {
    throw new Error(`Error al subir los archivos: ${error.message}`);
  }
};

export default uploadFiles;

const uploadFiles = async (url, headers, files) => {
  try {
    const formData = new FormData();

    // files.forEach((file, index) => {
    //   formData.append(`fileN_${index}`, file);
    // });

    // formData.forEach((file) => console.log(file));

    files.forEach((file) => {
      formData.append("fileN", file);
    });

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error al subir los archivos: ${response}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al subir los archivos : ${error}`);
  }
};

export default uploadFiles;

const uploadFiles = async (url, headers, files, isMultiple) => {
  try {
    const formData = new FormData();

    if (isMultiple) {
      // files.forEach((file) => {
      //   formData.append("fileN", file);
      // });
      formData.append("fileN", files);
    } else {
      formData.append("fileN", files[0]);
    }

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

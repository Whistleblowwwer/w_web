const uploadFiles = async (url, headers, files) => {
  try {
    const formData = new FormData();

    // files.forEach((file) => {
    //   formData.append("fileN", file);
    // });

    formData.forEach((file) => console.log(file));

    console.log(files);

    formData.append("fileN", files);

    console.log(formData.get("fileN"));
    console.log(formData.getAll("fileN"));

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error al subir los archivos: ${response}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(`Error al subir los archivos : ${error}`);
  }
};

export default uploadFiles;

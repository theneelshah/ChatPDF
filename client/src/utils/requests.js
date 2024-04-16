export const sendPDF = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://127.0.0.1:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload PDF");
    }

    return response;
  } catch (error) {
    console.error("Error uploading PDF:", error.message);
  }
};

export const askQuestion = async (question, filePath) => {
  const postData = { question, file_path: `uploads/${filePath}` };

  try {
    const response = await fetch("http://127.0.0.1:5000/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getFiles = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/existing", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const selectFile = async (filePath) => {
  const postData = { file: `${filePath}` };

  try {
    const response = await fetch(
      "http://127.0.0.1:5000/api/initialize-existing-file",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

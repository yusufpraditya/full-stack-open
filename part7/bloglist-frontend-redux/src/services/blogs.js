import axios from "axios";

const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

const add = async (blogDetail, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return await axios.post(baseUrl, blogDetail, config);
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const update = async (blogDetail, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return await axios.put(`${baseUrl}/${blogDetail.id}`, blogDetail, config);
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const remove = async (blogId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${baseUrl}/${blogId}`, config);
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export default { getAll, add, update, remove };

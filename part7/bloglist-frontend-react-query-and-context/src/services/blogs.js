import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

const add = async ({ blogDetail, user }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = await axios.post(baseUrl, blogDetail, config);
    return response;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const update = async ({ blogDetail, user }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = await axios.put(
      `${baseUrl}/${blogDetail.id}`,
      blogDetail,
      config,
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const remove = async ({ blogId, user }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios.delete(`${baseUrl}/${blogId}`, config);
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export default { getAll, add, update, remove };

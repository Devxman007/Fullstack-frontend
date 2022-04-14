const SERVER_URL = `${process.env.REACT_APP_API_URL}/admin/`;
const SERVER_URL2 = `${process.env.REACT_APP_API_URL}/admin/order/`;

export const getProducts = async () => {
  try {
    const response = await fetch(SERVER_URL);
    if (response.status === 200) return await response.json();
    else return [];
  } catch (error) {
    console.log(error);
  }
};

export const saveProduct = async (product) => {
  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (response.status === 201) return await response.json();
    else return false;
  } catch (error) {
    console.log(error);
  }
};
export const getProduct = async (id) => {
  try {
    const response = await fetch(SERVER_URL + id);
    if (response.status === 200) return await response.json();
    else return false;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (productId, product) => {
  try {
    const response = await fetch(SERVER_URL + productId, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(product),
    });
    if (response.status === 200) return response.json();
    else return false;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(SERVER_URL + id, {
      method: "DELETE",
    });
    return response.status === 204;
  } catch (error) {
    console.log(error);
  }
};

export const saveOrder = async (order) => {
  try {
    const response = await fetch(SERVER_URL2, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (response.status === 201) return await response.json();
    else return false;
  } catch (error) {
    console.log(error);
  }
};

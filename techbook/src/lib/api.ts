import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Interceptor requête : token + FormData
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

// ✅ Interceptor réponse : redirection 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// ✅ Auth
export async function login(email: string, password: string) {
  const response = await api.post("/login", { email, password });
  return response.data; // { user, token }
}

export async function logout() {
  await api.post("/logout");
  localStorage.removeItem("token");
}

export async function getMe() {
  const response = await api.get("/me");
  return response.data;
}

// --- vos fonctions existantes inchangées ---

export async function getTechnologies(page = 1) {
  try {
    const response = await api.get("/technologies", { params: { page } });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function sortByField(
  field: string,
  page = 1,
  search: string = "",
) {
  const response = await api.get("/technologies", {
    params: {
      ...(field && { sort: field }),
      page,
      search,
    },
  });
  return response.data;
}

export async function getCategories() {
  try {
    const response = await api.get("/categories");
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getLevels() {
  try {
    const response = await api.get("/levels");
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTechnology(id: number) {
  try {
    const response = await api.get(`/technologies/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createTechnology(formData: FormData) {
  try {
    const response = await api.post("/technologies", formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur validation:", error.response?.data);
    }
    throw error;
  }
}

export async function updateTechnology(id: string, formData: FormData) {
  try {
    formData.append("_method", "PUT");
    const response = await api.post(`/technologies/${id}`, formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur validation:", error.response?.data);
    }
    throw error;
  }
}

export async function deleteTechnology(id: number) {
  try {
    const response = await api.delete(`/technologies/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

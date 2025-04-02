import { del, get, post } from "../setup/client";

const getMealListing = () => {
    return get("/api/recipes/");
};

const getMealSearch = (body) => {
    return get(`/api/recipes?title=${body.searchTerm}`);
};

const getMealDetail = (body) => {
    return get(`/api/recipes/${body?.id}`);
};

const fetchCategories = () => {
    return get("/api/recipes/categories");
};


const saveRecipeDetails = (body) => {
    return post("/api/recipes/", body, {
        headers: {
            "Content-Type": "multipart/form-data",
          },
    });
};

const deleteRecipeDetails = (id) => {
    return del(`/api/recipes/${id}`);
};

export {
    getMealListing,
    getMealSearch,
    getMealDetail,
    fetchCategories,
    saveRecipeDetails,
    deleteRecipeDetails,
};

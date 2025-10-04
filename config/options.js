export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": import.meta.env.VITE_CG_DEMO_API_KEY,
  },
};

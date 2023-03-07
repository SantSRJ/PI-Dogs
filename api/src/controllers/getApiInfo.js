const axios = require("axios");
const { API_KEY } = process.env;


let apiData = [];
const getApiInfo = () => {
  if (apiData.length > 0) return apiData;
  const apiUrl = axios
    .get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then((res) =>
      res.data.map((el) => {
        return {
          id: el.id,
          name: el.name,
          min_height: el.height.metric.split(" - ")[0],
          max_height: el.height.metric.split(" - ")[1]
            ? el.height.metric.split(" - ")[1]
            : Math.round(el.height.metric.split(" - ")[0] * 1.1),
          min_weight:
            el.weight.metric.split(" - ")[0] !== "NaN"
              ? el.weight.metric.split(" - ")[0]
              : el.weight.metric.split(" - ")[1]
              ? Math.round(el.weight.metric.split(" - ")[1] * 0.6)
              : "30", 
          max_weight: el.weight.metric.split(" - ")[1]
            ? el.weight.metric.split(" - ")[1]
            : "39", 
          life_span: el.life_span,
          temperaments: el.temperament, 
          image: el.image.url,
        };
      })
    );
  return (apiData = apiUrl);
};
module.exports = {
  getApiInfo,
};

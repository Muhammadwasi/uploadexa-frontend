
const prod = {
    url: {
        API_URL: 'https://uploadexa-backend.herokuapp.com'
    }
};
const dev = {
    url: {
        API_URL: "http://localhost:8010"
    }
};
export const config = process.env.NODE_ENV === "development" ? dev : prod;
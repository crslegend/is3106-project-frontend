const IS_DEVELOPMENT = /development/i.test(process.env.REACT_APP_ENVIRONMENT);

/* eslint-disable */
export const BACKEND_URL = IS_DEVELOPMENT ? "http://localhost:8000" : "https://localhost:8000";

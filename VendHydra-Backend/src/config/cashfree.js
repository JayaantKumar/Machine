const axios = require("axios");

const CASHFREE_BASE =
  process.env.CASHFREE_ENV === "production"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";

module.exports = axios.create({
  baseURL: CASHFREE_BASE,
  headers: {
    "Content-Type": "application/json",
    "x-client-id": process.env.CASHFREE_CLIENT_ID,
    "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
    "x-api-version": "2023-08-01",
  },
});

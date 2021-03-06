const VM_IP = "http://54.190.6.132";
const CLOUDFRONT_URL = "http://d1sylk8toew9tv.cloudfront.net";
const prodMode = process.env.NODE_ENV == "production";
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("is in deployment environment: ", prodMode);
const baseURL = prodMode ? `${VM_IP}:3000` : "http://localhost:3000";
const clientBaseURL = prodMode ? `${VM_IP}:80` : "http://localhost:80";

export { baseURL, clientBaseURL };

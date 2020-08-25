const VM_IP = "http://54.190.6.132";
const prodMode = process.env.NODE_ENV == "production";
console.log("deployment environment: ", prodMode);
const baseURL = prodMode ? `${VM_IP}:3000` : "http://localhost:3000";
const clientBaseURL = prodMode ? `${VM_IP}:80` : "http://localhost:80";

export { baseURL, clientBaseURL };

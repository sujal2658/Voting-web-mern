import conf from "../conf/conf";
// Replace with your Node.js backend URL

class Authservice {
  constructor() {
    this.API_URL = conf.nodejsUrl;
  }

  async request(endpoint, method = "GET", body = null, requiresAuth = false) {
    const headers = { "Content-Type": "application/json" };

    // Add Authorization header if auth is required
    if (requiresAuth) {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      } else {
        window.location.href = "/";
        return;
      }
    }

    // console.log(`Request: ${method} ${this.API_URL}${endpoint}`); // Debug URL

    const response = await fetch(`${this.API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    // console.log("Response status:", response.status); // Debug status code

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return;
      }
      const errorData = await response.json();
      // console.error("Response error data:", errorData); // Debug error response
      throw new Error(errorData.error || "Something went wrong");
    }

    return response.json();
  }

  // Sign Up
  async signup(data) {
    return this.request("/user/signup", "POST", data);
  }

  //login
  async login(data) {
    const result = await this.request("/user/login", "POST", data);
    if (result.token) {
      localStorage.setItem("token", result.token); //save the token in localstorage
    }
    return result;
  }
  //get profile
  async getprofile() {
    return this.request("/user/profile", "GET", null, true);
  }

  //logout
  logout() {
    localStorage.removeItem("token");
  }

  //updatepassword
  async updatePassword(data) {
    return this.request("/user/profile/password", "PUT", data, true);
  }

  async checkAuthStatus() {
    return !!localStorage.getItem("token");
  }
}

const authService = new Authservice();
export default authService;

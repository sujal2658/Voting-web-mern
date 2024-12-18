//servises for candidate admin

import conf from "../conf/conf";

// Replace with your Node.js backend URL

class CandidateService {
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
      if (response.status === 401 || response.status === 403 || response.status === 'ERR_CONNECTION_REFUSED') {
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

  //create candidate
  async createCandidate(data) {
    return this.request("/candidate/create", "POST", data, true);
  }
  //updat existing candidate
  async updateCandidate(data, candidateID) {
    return this.request(`/candidate/${candidateID}`, "PUT", data, true);
  }
  //delet candidate
  async deletCandidate(candidateID) {
    return this.request(`/candidate/${candidateID}`, "DELETE", null, true);
  }

  async votingCandidate(candidateID) {
    return this.request(`/candidate/vote/${candidateID}`, "GET", null, true);
  }

  //get all candidsdate detils
  async getAllCandidate() {
    return this.request("/candidate", "GET", null, true);
  }

  //candidate votes count base desendig order
  async candidateVotesCount() {
    return this.request("/candidate/count", "GET", null, true);
  }
}

const candidateService = new CandidateService();

export default candidateService;


import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000",  // this should match our FastAPI server
});

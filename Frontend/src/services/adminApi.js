import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Creating separate API clients for different modules (assuming they share the same baseURL/api prefix)
const staffApi = axios.create({
  baseURL: `${baseURL}/api/staff`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const enquiryApi = axios.create({
  baseURL: `${baseURL}/api/enquiry`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const userApi = axios.create({
  baseURL: `${baseURL}/api/user`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const workApi = axios.create({
  baseURL: `${baseURL}/api/work`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const expenseApi = axios.create({
  baseURL: `${baseURL}/api/expense`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const staffAttendanceApi = axios.create({
  baseURL: `${baseURL}/api/staff-attendance`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const feesApi = axios.create({
  baseURL: `${baseURL}/api/fees`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const auth = axios.create({
  baseURL: `${baseURL}/api/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export {
  api,
  staffApi,
  enquiryApi,
  userApi,
  workApi,
  expenseApi,
  staffAttendanceApi,
  feesApi,
  auth,
};

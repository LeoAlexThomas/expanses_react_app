import { getApiUrl } from "@/env";
import { parseCookies } from "nookies";
import { userTokenCookieName } from "@/components/utils";
import { ProjectInterface } from "@/types/project";
const axios = require("axios");

const projects: ProjectInterface[] = [
  {
    _id: "project1",
    title: "Website Redesign",
    description: "A project to redesign the company's main website.",
    expanses: [
      { _id: "expense1", title: "UI/UX Design", spent: 2000 },
      { _id: "expense2", title: "Development", spent: 5000 },
      { _id: "expense3", title: "Testing", spent: 1000 },
    ],
    totalSpent: 8000,
  },
  {
    _id: "project2",
    title: "Marketing Campaign",
    description:
      "A project to launch a digital marketing campaign for a new product.",
    expanses: [
      { _id: "expense4", title: "Social Media Ads", spent: 1500 },
      { _id: "expense5", title: "Influencer Marketing", spent: 3000 },
      { _id: "expense6", title: "Content Creation", spent: 1200 },
    ],
    totalSpent: 5700,
  },
  {
    _id: "project3",
    title: "Mobile App Development",
    description: "Development of a cross-platform mobile application.",
    expanses: [
      { _id: "expense7", title: "Design", spent: 1800 },
      { _id: "expense8", title: "Development", spent: 6000 },
      { _id: "expense9", title: "Maintenance", spent: 2000 },
    ],
    totalSpent: 9800,
  },
  {
    _id: "project4",
    title: "Website Redesign",
    description: "A project to redesign the company's main website.",
    expanses: [
      { _id: "expense1", title: "UI/UX Design", spent: 2000 },
      { _id: "expense2", title: "Development", spent: 5000 },
      { _id: "expense3", title: "Testing", spent: 1000 },
    ],
    totalSpent: 8000,
  },
  {
    _id: "project5",
    title: "Marketing Campaign",
    description:
      "A project to launch a digital marketing campaign for a new product.A project to launch a digital marketing campaign for a new product.A project to launch a digital marketing campaign for a new product.",
    expanses: [
      { _id: "expense4", title: "Social Media Ads", spent: 1500 },
      { _id: "expense5", title: "Influencer Marketing", spent: 3000 },
      { _id: "expense6", title: "Content Creation", spent: 1200 },
    ],
    totalSpent: 5700,
  },
  {
    _id: "project6",
    title: "Mobile App Development",
    description:
      "A project to launch a digital marketing campaign for a new product.A project to launch a digital marketing campaign for a new product.A project to launch a digital marketing campaign for a new product.",
    expanses: [
      { _id: "expense7", title: "Design", spent: 1800 },
      { _id: "expense8", title: "Development", spent: 6000 },
      { _id: "expense9", title: "Maintenance", spent: 2000 },
    ],
    totalSpent: 9800,
  },
];

export const getAccessToken = (options: any) => {
  const cookies = parseCookies(options && options.context);
  const token = cookies[userTokenCookieName];
  return token;
};

const api = (route: string, options?: any, baseUrl?: string) => {
  const combinedOptions = Object.assign({}, options);

  axios.interceptors.request.use((request: any) => {
    const token = getAccessToken(options);
    if (token && !request.headers["Authorization"]) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
  });

  const apiBaseUrl = baseUrl ?? getApiUrl();
  if (route.includes("/projects/all")) {
    return projects;
  }

  if (route.includes("/project/project5")) {
    return projects[4];
  }

  return axios({
    url: apiBaseUrl + route,
    ...combinedOptions,
    transformResponse: (res: any, headers: Record<string, string>) => {
      if (!Boolean(res)) {
        return null;
      }
      if (headers["content-type"].startsWith("application/json")) {
        return JSON.parse(res);
      }
      return res;
    },
  }).then((res: any) => {
    return res.data;
  });
};
export default api;

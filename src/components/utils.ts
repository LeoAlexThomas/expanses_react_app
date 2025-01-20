import Cookies from "js-cookie";

export const colors = {
  greyColor: [
    "#f5f5f5",
    "#dcdcdc",
    "#d3d3d3",
    "#c0c0c0",
    "#b0b0b0",
    "#a9a9a9",
    "#696969",
    "#505050",
    "#383838",
  ],
  blueColor: [
    "#85a5c2",
    "#7196b8",
    "#5d87ae",
    "#4978a4",
    "#356a9a",
    "#2f5f8a",
    "#2a547b",
    "#254a6b",
    "#1f3f5c",
  ],
  greenColor: [
    "#E1EAD6",
    "#C3D6AE",
    "#A5C285",
    "#87AE5D",
    "#6a9a35",
    "#547B2A",
    "#3F5C1F",
    "#2A3D15",
    "#151E0A",
  ],
  redColor: [
    "#F9D0D0",
    "#F4A2A2",
    "#EF7474",
    "#EA4646",
    "#e51818",
    "#B71313",
    "#890E0E",
    "#5B0909",
    "#2D0404",
  ],
};

export const createProjectFormId = "createProjectFormId";
export const createExpanseFormId = "createExpanseFormId";

export const userTokenCookieName = "userToken";

export const unAutherizedPath = ["/signIn/"];

export const setUserToken = (userToken?: string) => {
  if (!userToken) {
    return;
  }
  Cookies.set(userTokenCookieName, userToken, { expires: 30 });
};

export const logout = () => {
  Cookies.remove(userTokenCookieName);
};

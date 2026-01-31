import request from "supertest";
import { Express } from "express";

export type UserData = {
  email: string;
  password: string;
  userName: string;
  _id: string;
  token: string;
  refreshToken: string;
};

export const userData = {
  email: "test@test.com",
  password: "testpass",
  userName: "testuser",
  _id: "",
  token: "",
  refreshToken: "",
};

export const getLogedInUser = async (app: Express): Promise<UserData> => {
  let response = await request(app)
    .post("/auth/register")
    .send({ ...userData });
  if (response.status !== 201) {
    response = await request(app)
      .post("/auth/login")
      .send({ email: userData.email, password: userData.password });
  }
  const logedUser = {
    _id: response.body._id,
    token: response.body.token,
    refreshToken: response.body.refreshToken,
    email: userData.email,
    password: userData.password,
    userName: userData.userName,
  };
  return logedUser;
};

export type PostData = {
  text: string;
  img: string;
  sender?: string;
  _id?: string;
};

export const postsList: PostData[] = [
  {
    text: "Inception",
    img: "https://sustainablebusinessmagazine.net/wp-content/uploads/2025/08/sea.jpg",
  },
  {
    text: "The Matrix",
    img: "https://sustainablebusinessmagazine.net/wp-content/uploads/2025/08/sea.jpg",
  },
  {
    text: "Interstellar",
    img: "https://sustainablebusinessmagazine.net/wp-content/uploads/2025/08/sea.jpg",
  },
];

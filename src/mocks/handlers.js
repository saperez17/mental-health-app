import { rest } from "msw";
import { interestBuilder } from "../stubs/builders";
// const baseUrl = process.env.REACT_APP_BASE_URL;

export const handlers = [
  rest.post(new RegExp("/login"), (req, res, ctx) => {
console.log('hiting login');
    return res(
      ctx.json({
        id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
        username:"username",
        firstName: "John",
        lastName: "Maverick",
      })
    );
  }),

  rest.post(new RegExp("api/auth/signup_user_data"), (req, res, ctx) => {
    return res(ctx.json({ message: "User data added" }));
  }),
];

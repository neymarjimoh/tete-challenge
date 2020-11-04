import responseHandler from "../responseHandler";
import express from "express";
import request from "supertest";

const app = express();
app.get("/", (req, res) => {
  return responseHandler(res, 200, "Some optional message", ["some data"]);
});

app.get("/default", (req, res) => {
  return responseHandler(res, 200);
});

describe("Unit test responseHandler", () => {
  it("should return formatted response", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(21);
    expect(response.body.data).toBe("Some optional message");
  });

  it("should return formatted response with default arguments", async () => {
    const response = await request(app).get("/default");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe(undefined);
  });
});

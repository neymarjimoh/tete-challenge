import app from "../";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Todo from "../api/models/todo";

let apiVersion = "/api/v1";

describe("Server runs", () => {
  test("Should return status 200", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });
  it("should return a status of 404", async () => {
    const response = await request(app).get("/garbledygook");
    expect(response.status).toBe(404);
  });

  describe("App routes tests", () => {
    let mongoServer;
    beforeAll(async () => {
      mongoServer = new MongoMemoryServer();
      const URI = await mongoServer.getUri();

      mongoose.connect(URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      });
    });

    afterAll(async (done) => {
      mongoose.disconnect(done);
      await mongoServer.stop();
    });

    afterEach(async () => {
      await Todo.deleteMany({});
      // const collections = await mongoose.connection.db.collections();

      // for (let collection of collections) {
      //   await collection.deleteMany();
      // }
    });

    it("should be able to create a todo", async () => {
      const response = await request(app).post(`${apiVersion}/todos/new`).send({
        title: "Project Node.js IIIIIIIIIIIII",
        dueDate: "2021-02-02",
      });

      expect(response.status).toBe(201);
    });

    it("should be able to list all todo with 404", async () => {
      const response = await request(app).get(`${apiVersion}/todos`);

      expect(response.status).toBe(404);
    });

    it("should be able to update a todo", async () => {
      const validTodo = new Todo({ title: "Have fun", dueDate: "2021-02-02" });
      const savedTodo = await validTodo.save();

      const response = await request(app)
        .patch(`${apiVersion}/todos/update/${savedTodo._id}`)
        .send({
          completed: true,
        });

      expect(response.status).toBe(200);
    });

    it("should be able to delete a todo", async () => {
      const validTodo = new Todo({ title: "Have fun", dueDate: "2021-02-02" });
      const savedTodo = await validTodo.save();

      const response = await request(app).delete(
        `${apiVersion}/todos/delete/${savedTodo._id}`
      );

      expect(response.status).toBe(200);
    });
  });
});

const request = require("supertest");
const app = require("../../app");

describe("POST /api/v1/login Tests", () => {
  test("should return error when using unregistered email", async () => {
    const response = await request(app)
      .post("/api/v1/login")
      .send({ email: "usergajelas@mail.com", password: "aasda" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: false,
      message: "Email unregistered",
      data: null,
    });
  });

  test("should return error when using incorrect password", async () => {
    const response = await request(app)
      .post("/api/v1/login")
      .send({ email: "usertest2@mail.com", password: "blajdksaaks" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: false,
      message: "Invalid email or password",
      data: null,
    });
  });

  test("should login successfully with correct credentials", async () => {
    const response = await request(app)
      .post("/api/v1/login")
      .send({ email: "usertest2@mail.com", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: true,
      message: "User logged in successfully",
      data: expect.any(String), // Token should be returned
    });
  });
});

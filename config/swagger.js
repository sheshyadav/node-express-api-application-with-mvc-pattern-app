import "dotenv/config";

const swaggerOptions = {
  openapi: "3.0.0",
  info: {
    description: "This is a sample server Petstore server.",
    version: "1.0.0",
    title: "Swagger Petstore",
    termsOfService: "http://swagger.io/terms/",
    contact: {
      name: "Shesh Yadav",
      url: "https://www.example.com/support",
      email: "sheshy181@gmail.com",
    },
    license: {
      name: "Apache 2.0",
      url: "http://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },

  servers: [
    {
      url: process.env.APP_URL + process.env.API_VERSION,
      description: "Local Host",
    },
  ],

  tags: [
    {
      name: "Auth",
      description: "Authentication api",
      externalDocs: {
        description: "Find out more",
        url: "http://swagger.io",
      },
    },
  ],

  paths: {
    "/login": {
      post: {
        tags: ["Auth"],
        summary: "Login using email and password.",
        requestBody: {
          description: "Login user user.",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { $ref: "#/components/responses/200" },
          400: { $ref: "#/components/responses/400" },
          401: { $ref: "#/components/responses/401" },
          403: { $ref: "#/components/responses/403" },
          404: { $ref: "#/components/responses/404" },
          500: { $ref: "#/components/responses/500" },
        },
      },
    },
    "/register": {
      post: {
        tags: ["Auth"],
        summary: "Create new user.",
        requestBody: {
          description: "Created new user account.",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                  confirm_password: { type: "string" },
                  agree: { type: "boolean" },
                },
              },
            },
          },
        },
        responses: {
          200: { $ref: "#/components/responses/200" },
          400: { $ref: "#/components/responses/400" },
          401: { $ref: "#/components/responses/401" },
          403: { $ref: "#/components/responses/403" },
          404: { $ref: "#/components/responses/404" },
          500: { $ref: "#/components/responses/500" },
        },
      },
    },
    "/user/{id}": {
      get: {
        tags: ["User"],
        summary: "Get user info using the ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
            example: 1,
          },
        ],
        responses: {
          200: { $ref: "#/components/responses/200" },
          400: { $ref: "#/components/responses/400" },
          401: { $ref: "#/components/responses/401" },
          403: { $ref: "#/components/responses/403" },
          404: { $ref: "#/components/responses/404" },
          500: { $ref: "#/components/responses/500" },
        },
        security: [{ bearerAuth: [] }],
      },
    },
  },

  components: {
    responses: {
      200: {
        description: "OK",
        content: { "application/json": {} },
      },
      400: { description: "Bad request." },
      401: { description: "Access token is missing or invalid." },
      403: { description: "Access denied." },
      404: { description: "Requested resource not found." },
      500: { description: "Internal Server Error." },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

export default swaggerOptions;

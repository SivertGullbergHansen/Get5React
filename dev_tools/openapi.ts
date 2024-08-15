import consola from "consola";
import fs from "fs";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Get5React API Reference",
      version: "1.0.0",
    },
  },
  apis: ["./src/app/api/**/route.ts"], // Adjust the path as necessary to match your project structure
};

try {
  const swaggerSpec = swaggerJSDoc(options);
  consola.info("Swagger specification generated successfully");

  // Write the swagger specification to a JSON file
  fs.writeFileSync(
    "./public/openapi.json",
    JSON.stringify(swaggerSpec, null, 2),
    "utf8"
  );
  consola.success("Swagger specification saved to public/openapi.json");
} catch (error) {
  consola.error("An error occurred while generating the Swagger specification");
  consola.error(error);
}

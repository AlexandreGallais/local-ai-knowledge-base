---
title: "ASP.NET Core web API documentation with Swagger / OpenAPI"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/tutorials/web-api-help-pages-using-swagger.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core web API documentation with Swagger / OpenAPI

By Rico Suter

This article covers using **Swagger** tooling — provided by the Swashbuckle.AspNetCore and NSwag packages — to generate OpenAPI documentation and interactive help pages for ASP.NET Core web APIs.

In .NET 9 and later, ASP.NET Core includes built-in OpenAPI support that replaces Swashbuckle as the default. Swashbuckle is no longer included in project templates, but it remains available as a community package you can add manually.

* To understand the built‑in OpenAPI features, see Overview of OpenAPI support in ASP.NET Core API apps.
* To add Swagger UI for interactive exploration or local ad‑hoc testing alongside the built-in OpenAPI support, see Use the generated OpenAPI documents.

The following instructions apply to projects using Swashbuckle or NSwag with ASP.NET Core 8.0 and earlier.

Swagger (OpenAPI) is a language-agnostic specification for describing REST APIs. It allows both computers and humans to understand the capabilities of a REST API without direct access to the source code. Its main goals are to:

* Minimize the amount of work needed to connect decoupled services.
* Reduce the amount of time needed to accurately document a service.

The two main OpenAPI implementations for .NET are Swashbuckle and NSwag, see:

* Getting Started with Swashbuckle
* Getting Started with NSwag

## OpenAPI vs. Swagger

The Swagger project was donated to the OpenAPI Initiative in 2015 and has since been referred to as OpenAPI. Both names are used interchangeably. However, "OpenAPI" refers to the specification. "Swagger" refers to the family of open-source and commercial products from SmartBear that work with the OpenAPI Specification. Subsequent open-source products, such as OpenAPIGenerator, also fall under the Swagger family name, despite not being released by SmartBear.

In short:

* OpenAPI is a specification.
* Swagger is tooling that uses the OpenAPI specification. For example, OpenAPIGenerator and SwaggerUI.

## OpenAPI specification (`openapi.json`)

The OpenAPI specification is a document that describes the capabilities of your API. The document is based on the XML and attribute annotations within the controllers and models. It's the core part of the OpenAPI flow and is used to drive tooling such as SwaggerUI. By default, it's named `openapi.json`. Here's an example of an OpenAPI specification, reduced for brevity:

```json
{
  "openapi": "3.0.1",
  "info": {
    "title": "API V1",
    "version": "v1"
  },
  "paths": {
    "/api/Todo": {
      "get": {
        "tags": [
          "Todo"
        ],
        "operationId": "ApiTodoGet",
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ToDoItem"
                  }
                }
              },
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ToDoItem"
                  }
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ToDoItem"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        …
      }
    },
    "/api/Todo/{id}": {
      "get": {
        …
      },
      "put": {
        …
      },
      "delete": {
        …
      }
    }
  },
  "components": {
    "schemas": {
      "ToDoItem": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32"
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "isCompleted": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      }
    }
  }
}
```

## Swagger UI

Swagger UI offers a web-based UI that provides information about the service, using the generated OpenAPI specification. Both Swashbuckle and NSwag include an embedded version of Swagger UI, so that it can be hosted in your ASP.NET Core app using a middleware registration call. The web UI looks like this:

Each public action method in your controllers can be tested from the UI. Select a method name to expand the section. Add any necessary parameters, and select **Try it out!**.

> **Note:**
> The Swagger UI version used for the screenshots is version 2. For a version 3 example, see Petstore example.

## Securing Swagger UI endpoints

Call `MapSwagger().RequireAuthorization` to secure the Swagger UI endpoints. The following example secures the swagger endpoints:

_Code sample not included: ~/../AspNetCore.Docs.Samples/tutorials/webApiSwagger/secureSwagger/Program.cs._
In the preceding code, the `/weatherforecast` endpoint doesn't need authorization, but the Swagger endpoints do.

The following Curl passes a JWT token to test the Swagger UI endpoint:

```bash
curl -i -H "<example-value>" https://localhost:{PORT}/swagger/v1/swagger.json
```

where the `{TOKEN}` placeholder is the JWT bearer token and the `{PORT}` placeholder is the port number.

For more information on testing with JWT tokens, see Generate tokens with dotnet user-jwts.

## Generate an XML documentation file at compile time

See GenerateDocumentationFile for more information.

## Next steps

* Get started with Swashbuckle
* Get started with NSwag

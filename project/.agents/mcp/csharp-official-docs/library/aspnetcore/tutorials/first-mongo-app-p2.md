---
title: "Create a web API with ASP.NET Core and MongoDB (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/tutorials/first-mongo-app.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Create a web API with ASP.NET Core and MongoDB (part 2 of 2)

## Configure JSON serialization options

There are two details to change about the JSON responses returned in the Test the web API section:

* The property names' default camel casing should be changed to match the Pascal casing of the CLR object's property names.
* The `bookName` property should be returned as `Name`.

To satisfy the preceding requirements, make the following changes:

1. In `Program.cs`, add the following highlighted code:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<BookStoreDatabaseSettings>(
    builder.Configuration.GetSection("BookStoreDatabase"));

builder.Services.AddSingleton<BooksService>();

builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = null;
});
```
   With the preceding change, property names in the web API's serialized JSON response match their corresponding property names in the CLR object type. For example, the `Book` class's `Author` property serializes as `Author` instead of `author`.

1. In `Models/Book.cs`, annotate the `BookName` property with the `[JsonPropertyName]` attribute:

```csharp
[BsonElement("Name")]
[JsonPropertyName("Name")]
public string BookName { get; set; } = null!;
```
   The `[JsonPropertyName]` attribute's value of `Name` represents the property name in the web API's serialized JSON response.

1. Add the following code to the top of `Models/Book.cs` to resolve the `[JsonPropertyName]` attribute reference:

```csharp
using System.Text.Json.Serialization;
```
1. Repeat the steps defined in the Test the web API section. Notice the difference in JSON property names.

# Visual Studio

This tutorial uses Endpoints Explorer and .http files to test the API.

1. Build and run the app.

1. In **Endpoints Explorer**, right-click the first **GET** endpoint `/books`, and select **Generate request**.

   The following content is added to the `BookStoreApi.http` file.
   If this is the first time that a request is generated, the file is created in the project root.

   ```
   @BookStoreApi_HostAddress = https://localhost:{PORT}
    
   GET {{BookStoreApi_HostAddress}}/books
    
   ###
   ```

   The port number should already be set to the port used by the app, for example, `https://localhost:56874`.
   If that's not the case you can find your port number in the output window when you launch the app.

1. Select the **Send request** link above the new `GET` request line.

   The GET request is sent to the app and the response is displayed in the **Response** pane.

1. The response body shows the JSON result containing the book entries similar to the following:

   ```json
   [
     {
       "Id": "61a6058e6c43f32854e51f51",
       "Name": "Design Patterns",
       "Price": 54.93,
       "Category": "Computers",
       "Author": "Ralph Johnson"
     },
     {
       "Id": "61a6058e6c43f32854e51f52",
       "Name": "Clean Code",
       "Price": 43.15,
       "Category": "Computers",
       "Author": "Robert C. Martin"
     }
   ]
   ```

1. To retrieve a single book, right-click the `/books/{id}, params (string id)` **GET** endpoint in the **Endpoints Explorer**, and select **Generate request**.

   The following content is appended to the `BookStoreApi.http` file:

   ```
   @id=string
   GET {{BookStoreApi_HostAddress}}/books/{{id}}

   ###
   ```

1. Replace `id` variable with one of the IDs returned from the earlier request, for example:

   ```
   @id="61a6058e6c43f32854e51f52"
   GET {{BookStoreApi_HostAddress}}/books/{{id}}

   ###
   ```

1. Select the **Send request** link above the new `GET` request line.

   The GET request is sent to the app and the response is displayed in the **Response** pane.

1. The response body shows JSON similar to the following:

   ```json
   {
     "Id": "61a6058e6c43f32854e51f52",
     "Name": "Clean Code",
     "Price": 43.15,
     "Category": "Computers",
     "Author": "Robert C. Martin"
   }
   ```

1. To test the POST endpoint, right-click the `/books` **POST** endpoint and select **Generate request**.

   The following content is added to the `BookStoreApi.http` file:

   ```
   POST {{BookStoreApi_HostAddress}}/books
   Content-Type: application/json

   {
     //Book
   }
   
   ###
   ```

1. Replace the Book comment with a book object as the JSON request body:

   ```
   POST {{BookStoreApi_HostAddress}}/books
   Content-Type: application/json

    {
      "Name": "The Pragmatic Programmer",
      "Price": 49.99,
      "Category": "Computers",
      "Author": "Andy Hunt"
    }
   
   ###
   ```

1. Select the **Send request** link above the `POST` request line.

   The POST request is sent to the app, and the response is displayed in the **Response** pane. The response should include the newly created book with its assigned ID.

1. Lastly, to delete a book, right-click the `/books/{id}, params (string id)` **DELETE** endpoint and select **Generate request**.

   The following content is appended to the `BookStoreApi.http` file:

   ```
   DELETE {{BookStoreApi_HostAddress}}/books/{{id}}
    
   ###
   ```

1. Replace the `id` variable with one of the IDs returned from the earlier request, and click **Send request**. For example:

   ```
   DELETE {{BookStoreApi_HostAddress}}/books/67f417517ce1b36aeab71236

   ###
   ```

# Visual Studio Code

This tutorial uses the OpenAPI specification (openapi.json) and Swagger UI to test the API.

1. Install Swagger UI by running the following command:

  ```dotnetcli
  dotnet add package NSwag.AspNetCore
  ```

The previous command adds the NSwag.AspNetCore package, which contains tools to generate Swagger documents and UI.
Because our project is using OpenAPI, we only use the NSwag package to generate the Swagger UI.

1. Configure Swagger middleware

In `Program.cs`, add the following highlighted code:

```csharp
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUi(options =>
    {
        options.DocumentPath = "/openapi/v1.json";
    });
}
```
The previous code enables the Swagger middleware for serving the generated JSON document using the Swagger UI. Swagger is only enabled in a development environment. Enabling Swagger in a production environment could expose potentially sensitive details about the API's structure and implementation.

The app uses the OpenAPI document generated by OpenApi, located at `/openapi/v1.json`, to generate the UI.
View the generated OpenAPI specification for the `BookStoreApi` API while the project is running by navigating to `https://localhost:{PORT}/openapi/v1.json` in your browser.

The OpenAPI specification is a document in JSON format that describes the structure and capabilities of your API, including endpoints, request/response formats, parameters, and more. It's essentially a blueprint of your API that can be used by various tools to understand and interact with your API.

1. Build and run the app.

1. Navigate to `https://localhost:{PORT}/swagger` in your browser. Swagger provides a UI to test all the API endpoints based on the OpenAPI document.

1. Expand the **GET /books** endpoint and click the **Try it out** button.

1. Click the **Execute** button to send the request to the API.

1. The **Response body** section displays a JSON array with books similar to the following:

   ```json
   [
     {
       "Id": "61a6058e6c43f32854e51f51",
       "Name": "Design Patterns",
       "Price": 54.93,
       "Category": "Computers",
       "Author": "Ralph Johnson"
     },
     {
       "Id": "61a6058e6c43f32854e51f52",
       "Name": "Clean Code",
       "Price": 43.15,
       "Category": "Computers",
       "Author": "Robert C. Martin"
     }
   ]
   ```

1. Next, expand the **GET /books/{id}** endpoint and click **Try it out**.

1. Enter one of the book IDs from the previous response in the **id** field, then click **Execute**.

1. The **Response body** section displays the JSON object for the specified book. For example, the result for the ID `61a6058e6c43f32854e51f52` is similar to the following:

   ```json
   {
     "Id": "61a6058e6c43f32854e51f52",
     "Name": "Clean Code",
     "Price": 43.15,
     "Category": "Computers",
     "Author": "Robert C. Martin"
   }
   ```

1. To test creating a new book, expand the **POST /books** endpoint and click **Try it out**.

1. Replace the default request body with a new book object:

   ```json
   {
     "Name": "The Pragmatic Programmer",
     "Price": 49.99,
     "Category": "Computers",
     "Author": "Andy Hunt"
   }
   ```

1. Click **Execute** to send the request.

1. The response should have a status code of 201 (Created) and include the newly created book with its assigned ID in the response body.

1. Lastly, to delete a book record, expand the **DELETE /books/{id}** endpoint, click **Try it out**, and enter one of the book IDs from the previous response in the **id** field. Click **Execute** to send the request.

1. The response should have a status code of 204 (No Content), indicating that the book was successfully deleted.
---

## Add authentication support to a web API

ASP.NET Core Identity adds user interface (UI) login functionality to ASP.NET Core web apps. To secure web APIs and SPAs, use one of the following:

* Microsoft Entra ID
* Duende Identity Server

Duende Identity Server is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core. Duende Identity Server enables the following security features:

* Authentication as a Service (AaaS)
* Single sign-on/off (SSO) over multiple application types
* Access control for APIs
* Federation Gateway

> **Important:**
> Duende Software might require you to pay a license fee for production use of Duende Identity Server.

For more information, see the Duende Identity Server documentation (Duende Software website).

## Related content

* View or download sample code (how to download)
* Create web APIs with ASP.NET Core
* Controller action return types in ASP.NET Core web API
* Create a minimal web API with ASP.NET Core

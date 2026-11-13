---
title: "Use .http files in Visual Studio 2022 (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/test/http-files.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Use .http files in Visual Studio 2022

The Visual Studio 2022 `.http` file editor provides a convenient way to test ASP.NET Core projects, especially API apps.  The editor provides a UI that:

* Creates and updates `.http` files.
* Sends HTTP requests specified in `.http` files.
* Displays the responses.

This article contains documentation for:

* The `.http` file syntax.
* How to create an `.http` file.
* How to send a request from an `.http` file.
* Where to find `.http` file options that can be configured.
* How to create requests in `.http` files by using the Visual Studio 2022 **Endpoints Explorer**.

The `.http` file format and editor was inspired by the Visual Studio Code REST Client extension. The Visual Studio 2022 `.http` editor recognizes `.rest` as an alternative file extension for the same file format.

## Prerequisites

* Visual Studio 2022 version 17.8 or later with the **ASP.NET and web development** workload installed.

## `.http` file syntax

The following sections explain `.http` file syntax.

## Requests

The format for an HTTP request is `HTTPMethod URL HTTPVersion`, all on one line, where:

* `HTTPMethod` is the HTTP method to use, for example:
  * OPTIONS
  * GET
  * HEAD
  * POST
  * PUT
  * PATCH
  * DELETE
  * TRACE
  * CONNECT
* `URL` is the URL to send the request to. The URL can include query string parameters. The URL doesn't have to point to a local web project. It can point to any URL that Visual Studio can access.
* `HTTPVersion` is optional and specifies the HTTP version that should be used, that is, `HTTP/1.1`, `HTTP/2`, or `HTTP/3`.

A file can contain multiple requests by using lines with `###` as delimiters. The following example showing three requests in a file illustrates this syntax:

```http
GET https://localhost:7220/weatherforecast

###

GET https://localhost:7220/weatherforecast?date=2023-05-11&location=98006

###

GET https://localhost:7220/weatherforecast HTTP/3

###
```

## Request headers

To add one or more headers, add each header on its own line immediately after the request line. Don't include any blank lines between the request line and the first header or between subsequent header lines. The format is `HeaderName: Value`, as shown in the following examples:

```http
GET https://localhost:7220/weatherforecast
Date: Wed, 27 Apr 2023 07:28:00 GMT

###

GET https://localhost:7220/weatherforecast
Cache-Control: max-age=604800
Age: 100

###
```

> **Important:**
> When calling an API that authenticates with headers, do not commit any secrets to a source code repository. See the supported methods for storing secrets later in this article, such as ASP.NET Core user secrets, Azure Key Vault and DPAPI encryption.

## Request body

Add the request body after a blank line, as shown in the following example:

```http
POST https://localhost:7220/weatherforecast
Content-Type: application/json
Accept-Language: en-US,en;q=0.5

{
    "date": "2023-05-10",
    "temperatureC": 30,
    "summary": "Warm"
}

###
```

## Comments

Lines that start with either `#` or `//` are comments. These lines are ignored when Visual Studio sends HTTP requests.

## Variables

A line that starts with `@` defines a variable by using the syntax `@VariableName=Value`.
The variable name is case-sensitive and can't contain any spaces.
The value can contain any characters, including the value `null` to represent a null value.

Variables can be referenced in requests that are defined later in the file. They're referenced by wrapping their names in double curly braces, `{{` and `}}`. The following example shows two variables defined and used in a request:

```http
@hostname=localhost
@port=44320
GET https://{{hostname}}:{{port}}/weatherforecast
```

Variables can be defined using values of other variables that were defined earlier in the file. The following example uses one variable in the request instead of the two shown in the preceding example:

```http
@hostname=localhost
@port=44320
@host={{hostname}}:{{port}}
GET https://{{host}}/api/search/tool
```

## Environment files

To give variables different values in different environments, create a file named `http-client.env.json`. Locate the file in the same directory as the `.http` file or in one of its parent directories. Here's an example of an environment file:

```json
{
  "dev": {
    "HostAddress": "https://localhost:44320"
  },
  "remote": {
    "HostAddress": "https://contoso.com"
  }
}
```

The environment file is a JSON file that contains one or more named environments, such as "dev" and "remote" in the preceding example. Each named environment contains one or more variables, such as `HostAddress` in the preceding example. Variables from an environment file are referenced the same way as other variables, as shown in the following example:

```http
GET {{HostAddress}}/api/search/tool
```

The value that is used for the variable when sending a request is determined by an environment selector dropdown at the upper right corner of the `.http` file editor. The following screenshot shows the selector:

The environment file doesn't have to be in the project folder. Visual Studio looks for an environment file in the folder where the `.http` file exists. If it's not in that folder, Visual Studio looks through the parent directories to find it. When a file named `http-client.env.json` is found, the search ends. The file found nearest to the `.http` file is used.

After creating or editing an `.http` file, you might have to close and reopen the project to see the changes reflected in the environment selector. Press `F6` to select the environment selector.

Visual Studio displays warnings in the following situations:

* The `.http` file references a variable that isn't defined in the `.http` file or in the environment file.
* The environment file contains a variable that isn't referenced in the `.http` file.

A variable defined in an environment file can be the same as one defined in the `.http` file, or it can be different. If a variable is defined in both the `.http` file and the environment file, the value in the `.http` file overrides the value in the environment file.

## Shared variables

`$shared` is a special environment name for values that are the same for multiple environments. For example, consider the following environment file (`http-client.env.json`):

```json
{
    "$shared": {
        "HostAddress": "https://localhost:7293"
    },
    "dev1": {
        "username": "dev1user"
    },
    "dev2": {
        "username": "dev2user"
    },
    "staging": {
        "username": "staginguser",
        "HostAddress": "https://staging.contoso.com"
    }
}
```

In the preceding example, the `$shared` environment defines the `HostAddress` variable with the value `localhost:7293`. The `HostAddress` variable with the value `localhost:7293` functions as a default for environments that don't define a `HostAddress`. When the `dev1` or `dev2` environment is defined, the value for `HostAddress` comes from the `$shared` environment because `dev1` and `dev2` don't define a `HostAddress` variable. When the `staging` environment is defined, the value for `HostAddress` is set to `https://staging.contoso.com`, overriding the `$shared` default.

## Request variables

You can pass <example-value> from one HTTP request to another within the same `.http` file.

1. Create a single-line comment located just before a request URL to name the following request. For example, the following lines show alternative ways to name the request `login`:

   ```http
   # @name login
   https://contoso.com/api/login HTTP/1.1   
   ```

   ```http
   // @name login
   https://contoso.com/api/login HTTP/1.1
   ```

1. In subsequent requests in the same HTTP file use the request name to refer to the request.
1. Use the following syntax to extract the specific part of the response that you want.

   ```http
   {{<request name>.(response|request).(body|headers).(*|JSONPath|XPath|<header name>)}}.
   ```

   This syntax lets you extract values from the request itself or from the response to it (`request|response`). For either request or response, you can extract values from the body or the headers (`body|headers`).

   When `body` is selected, the `*|JSONPath|XPath` part of the syntax applies:

   * `*` extracts the entire response body.

     Example: `{{login.response.body.*}}`

   * For JSON responses, use JSONPath to extract a specific property or attribute.

     Example: `{{login.response.body.$.token}}`

   * For XML responses, use XPath to extract a specific property or attribute.

     Example: `{{login.response.body./token}}`

   When `headers` is selected, a header name extracts the entire header. Header names are case-insensitive.

   Example: `{{login.response.headers.Location}}`

If you want to refer to the response of a named request, you need to manually trigger the named request to retrieve its response first. When you extract values from the response, you'll get the latest response if the request has been sent more than once.

### Example request variable usage

For example, suppose your HTTP file has a request that authenticates the caller, and you name it `login`. The response body is a JSON document that contains the bearer token in a property named `token`. In subsequent requests, you want to pass in this bearer token in an `Authorization` header. The following example does this:

```http
# @name login

POST {{TodoApi_HostAddress}}/users/token 
Content-Type: application/json 

{ 
  "username": "{{myusername}}", 
} 

### 

GET {{TodoApi_HostAddress}}/todos 
Authorization: Bearer {{login.response.body.$.token}}

### 
```

The syntax `{{login.response.body.$.token}}` represents the bearer token:

* **`login`**: Is the request name.
* **`response`**: Refers to the HTTP response object.
* **`body`**: Refers to the body of the HTTP response.
* **`$`**: Represents the root element of the JSON document in the response body.
* **`token`**: Refers to the specific property within the JSON document.

Without using request variables you would need to manually extract the token from the login response and include it in the header of subsequent requests. Request variables enable you to automate this process.

## User-specific environment files

A user-specific value is any value that a developer wants to test with but doesn't want to share with the team. The `http-client.env.json` file is checked in to source control by default, therefore, ***DO NOT*** add user-specific values to this file. Rather, add user-specific values in a file named `http-client.env.json.user`. The `http-client.env.json.user` file is located in the same folder as the `http-client.env.json` file. Files that end with `.user` are excluded from source control by default when using Visual Studio source control features.

When the `http-client.env.json` file is loaded, Visual Studio looks for a sibling `http-client.env.json.user` file. If a variable is defined in an environment in both the `http-client.env.json` file and the `http-client.env.json.user` file, the value in the `http-client.env.json.user` file wins.

Here's an example scenario that shows how a user-specific environment file works. Suppose the `.http` file has the following content:

```http
GET {{HostAddress}}/{{Path}}
Accept: application/json
```

And suppose the `http-client.env.json` file contains the following content:

```json
{
  "dev": {
    "HostAddress": "https://localhost:7128",
    "Path": "/weatherforecast"
  },
  "remote": {
    "HostAddress": "https://contoso.com",
    "Path": "/weatherforecast"
  }
}
```

And suppose there's a user-specific environment file that contains the following content:

```json
{
  "dev": {
    "Path": "/swagger/index.html"
  }
}
```

When the user selects the "dev" environment, the request is sent to `https://localhost:7128/swagger/index.html` because the `Path` value in the `http-client.env.json.user` file overrides the value from the `http-client.env.json` file.

With the same environment files, suppose the variables are defined in the `.http` file:

```http
@HostAddress=https://contoso.com
@Path=/weatherforecast

GET {{HostAddress}}/{{Path}}
Accept: application/json
```

In this scenario, the "dev" environment request is sent to `https://contoso.com/weatherforecast` because variable definitions in `.http` files override environment file definitions.

## ASP.NET Core user secrets

To get a value from user secrets, use an environment file that is located in the same folder as the ASP.NET Core project. In the environment file, define a variable that has `provider` and `secretName` properties. Set the `provider` value to `AspnetUserSecrets` and set `secretName` to the name of the desired user secret. For example, the following environment file defines a variable named `ApiKeyDev` that gets its value from the `config:ApiKeyDev` user secret:

```json
{
  "dev": {
    "ApiKeyDev": {
      "provider": "<example-value>",
      "secretName": "<example-value>"
    }
  }
}
```

To use this variable in the `.http` file, reference it like a standard variable. For example:

```http
GET {{HostAddress}}{{Path}}
X-API-KEY: {{ApiKeyDev}}
```

When the request is sent, the value of the `ApiKeyDev` secret is in the X-API-KEY header.

As you type in the `http` file, the editor shows a completion list for the variable name but doesn't show its value.

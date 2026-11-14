---
title: "Use .http files in Visual Studio 2022 (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/test/http-files.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Use .http files in Visual Studio 2022 (part 2 of 2)

## Azure Key Vault

Azure Key Vault is one of several key <example-value> solutions in Azure that can be used for secrets management. Of the three secrets stores currently supported for `.http` files, Key Vault is the best choice for sharing secrets across different users. The other two options—ASP.NET User Secrets and DPAPI encryption—aren't easily shared.

To use a value from Azure Key Vault, you must be signed into Visual Studio with an account that has access to the desired Key Vault.
Define a variable in an environment file with the metadata to access the secret. The variable is named `AKVSecret` in the following example:

```json
{
  "dev": {
    "AKVSecret": {
      "provider": "AzureKeyVault",
      "secretName": "<example-value>",
      "resourceId": "/subscriptions/3a914c59-8175a9e0e540/resourceGroups/my-key-vault-rg/providers/Microsoft.KeyVault/vaults/my-key-vault-01182024"
    }
  }
}
```

The variable `AKVSecret` pulls its value from Azure Key Vault. The following properties are defined on `AKVSecret`:

| Name         | Description                                             |
|--------------|---------------------------------------------------------|
| provider     | For Key Vault, always use `AzureKeyVault`.              |
| secretName   | Name of the secret to extract.                          |
| resourceId   | Azure resource ID for the specific Key Vault to access. |

The value for the `resourceId` property can be found in the Azure portal. Go to **Settings > Properties** to find it. For `secretName`, use the name of the secret that appears on the **Secrets** page in the Azure portal.

For example, the following `.http` file has a request that uses this secret value.

```http
GET {{HostAddress}}{{Path}}
X-AKV-SECRET: {{akvSecret}}
```

## DPAPI encryption

On Windows, there is a Data Protection API (DPAPI) that can be used to encrypt sensitive data. When DPAPI is used to encrypt data, the encrypted values are always machine-specific, and they're also user-specific in `.http` files. These values can't be shared with other users.

To encrypt a value, use the following console application:

```csharp
using System.Security.Cryptography;
using System.Text;

string stringToEncrypt = "Hello, World!";
byte[] encBytes = ProtectedData.Protect(Encoding.Unicode.GetBytes(stringToEncrypt), optionalEntropy: null, scope: DataProtectionScope.CurrentUser);
string base64 = Convert.ToBase64String(encBytes);
Console.WriteLine(base64);
```

The preceding console application references the System.Security.Cryptography.ProtectedData NuGet package. To enable the encrypted value to work in the `.http` file, encrypt with the scope set to `System.Security.Cryptography.DataProtectionScope.CurrentUser`. The encrypted value is a base64 encoded string that can be copied and pasted into the environment file.

In the environment file, create a variable that has `provider` and `value` properties. Set `provider` to `Encrypted`, and set `value` to the encrypted value. For example, the following environment file defines a variable named `dpapiValue` that gets its value from a string that was encrypted with DPAPI.

```json
{
  "dev": {
    "dpapiValue": {
      "provider": "Encrypted",
      "value": "AQAAANCMnd8BFdERjHoAwE/Cl+sBAAAA5qwfg4+Bhk2nsy6ujgg3GAAAAAACAAAAAAAQZgAAAAEAACAAAAAqNXhXc098k1TtKmaI4cUAbJVALMVP1zOR7mhC1RBJegAAAAAOgAAAAAIAACAAAABKu4E9WC/zX5LYZZhOS2pukxMTF9R4yS+XA9HoYF98GzAAAAAzFXatt461ZnVeUWgOV8M/DkqNviWUUjexAXOF/JfpJMw/CdsizQyESus2QjsCtZlAAAAAL7ns3u9mEk6wSMIn+KNsW/vdAw51OaI+HPVrt5vFvXRilTtvGbU/JnxsoIHj0Z7OOxlwOSg1Qdn60zEqmlFJBg=="
    }
  }
}
```

With the preceding environment file, `dpapiValue` can be used in the `.http` file like any other variable. For example:

```http
GET {{HostAddress}}{{Path}}
X-DPAPI-Secret: {{dpapiSecret}}
```

When this request is sent, X-DPAPI-Secret has the decrypted secret value.

## Environment variables

To get the value of an environment variable, use `$processEnv`. The following example puts the value of the USERNAME environment variable in the X-UserName header.

```http
GET {{HostAddress}}{{Path}}
X-UserName: {{$processEnv USERNAME}}
```

If you try to use `$processEnv` to access an environment variable that doesn't exist, the `.http` file editor displays an error message.

## `.env` files

To get the value of a variable that is defined in a `.env` file, use `$dotenv`. The `.env` file must be in the project folder. The format for `$dotenv` is the same as for `$processEnv`. For example, if the `.env` file has this content:

```
USERNAME=userFromDotenv
```

And the `.http` file has this content:

```http
GET {{HostAddress}}{{Path}}
X-UserName: {{$dotenv USERNAME}}
```

The `X-UserName` header will have "userFromDotenv".

When `$dotenv` is entered in the editor, it shows completions for the variables defined in the `.env` file.

> **Note:**
> `.env` files might not be excluded from source control by default, so be careful to avoid checking in any secret values.

## Random integers

To generate a random integer, use `$randomInt`. The syntax is `{{$randomInt [min max]}}` where the `min` and `max` values are optional.

## Dates and times

* `$datetime` generates a `datetime` string in UTC. The syntax is `{{$datetime [format] [offset option]}}` where the format and offset options are optional.
* `$localDatetime` generates a `datetime` string in the local time zone. The syntax is `{{$localDatetime [format] [offset option]}}` where the format and offset options are optional.
* `$timestamp` generates a `timestamp` in UTC. The `timestamp` is the number of seconds since the Unix Epoch in UTC time. The syntax is `{{$timestamp [offset option]}}` where the offset option is optional.

The `[format]` option is one of `rfc1123`, `iso8601`, or a custom format in quotation marks. For example:

```http
GET https://localhost:7220/weatherforecast
X-CUSTOM: {{$datetime "dd-MM-yyyy"}}
X-ISO8601: {{$datetime iso8601}}
X-ISO8601L: {{$localDatetime iso8601}}
X-RFC1123: {{$datetime rfc1123}}
X-RFC1123L: {{$localDatetime rfc1123}}
```

Here are some sample values that the preceding examples generate:

```json
{
  "headers": {
    "X-Custom": "17-01-2024",
    "X-Iso8601": "2024-01-17T22:59:55.5345770+00:00",
    "X-Iso8601L": "2024-01-17T14:59:55.5345770-08:00",
    "X-Rfc1123": "Wed, 17 Jan 2024 22:59:55 GMT",
    "X-Rfc1123L": "Wed, 17 Jan 2024 14:59:55 -08"
  }
}
```

The `[offset option]` syntax is in the form `number` `unit` where `number` is an integer and `unit` is one of the following values:

|  `unit`  | Explanation  |
|----------|--------------|
| `ms`     | Milliseconds |
| `s`      | Seconds      |
| `m`      | Minutes      |
| `h`      | Hours        |
| `d`      | Days         |
| `w`      | Weeks        |
| `M`      | Months       |
| `y`      | Years        |

For example:

```http
GET https://localhost:7220/weatherforecast
X-Custom-Minus-1-Year: {{$datetime "dd-MM-yyyy" -1 y}}
X-RFC1123-Plus-1-Day: {{$datetime rfc1123 1 d}} 
X-Timestamp-Plus-1-Year: {{$timestamp 1 y}}
```
Here are some sample values that the preceding examples generate:

```json
{
  "headers": {
    "X-Custom-Minus-1-Year": "17-01-2023",
    "X-Rfc1123-Plus-1-Day": "Thu, 18 Jan 2024 23:02:48 GMT",
    "X-Timestamp-Plus-1-Year": "1737154968"
  }
}
```

## GUIDs

To generate a random GUID, use `$guid`:

```http
GET https://localhost:7220/weatherforecast
X-CorrelationId: {{$guid}}
```

## Unsupported syntax

The Visual Studio 2022 `.http` file editor doesn't have all the features that the Visual Studio Code REST Client extension has. The following list includes some of the more significant features available only in the Visual Studio Code extension:

* Request line that spans more than one line
* Specify file path as body of the request
* Mixed format for body when using multipart/form-data
* GraphQL requests
* cURL request
* Copy/paste as cURL
* Request history
* Save response body to file
* Certificate based authentication
* Prompt variables
* Customize response preview
* Per-request settings
* Null-handling variables, e.g. using null-conditional or nullish coalescing operators (this is also unsupported in Visual Studio Code)

## Create an `.http` file

* In **Solution Explorer**, right-click an ASP.NET Core project.
* In the context menu, select **Add** > **New Item**.
* In the **Add New Item** dialog, select **ASP.NET Core** > **General**.
* Select **HTTP File**, and select **Add**.

## Send an HTTP request

* Add at least one request to an `.http` file and save the file.
* If the request URL points to localhost and the project's port, run the project before trying to send a request to it.
* Select the `Send Request` or `Debug` link that is directly above the request to be sent.

  The request is sent to the specified URL, and the response appears in a separate pane to the right of the editor window.

## `.http` file options

Some aspects of `.http` file behavior can be configured. To see what's available, go to **Tools** > **Options** > **Text Editor** > **Rest**. For example, the timeout setting can be configured  on the **Advanced** tab. Here's a screenshot of the **Options** dialog:

## Use Endpoints Explorer

**Endpoints Explorer** is a tool window that shows all the endpoints that a web API defines. The tool enables you to send requests to the endpoints by using an `.http` file.

The initial set of endpoints that **Endpoints Explorer** displays are discovered statically. There are some endpoints that can't be discovered statically. For example, endpoints defined in a class library project can't be discovered until runtime. When you run or debug a web API, Visual Studio version 17.11 Preview discovers endpoints dynamically at run time also and adds those to **Endpoints Explorer**.

### Open Endpoints Explorer

Select **View** > **Other Windows** > **Endpoints Explorer**.

### Add a request to an `.http` file

Right-click a request in **Endpoints Explorer** and select **Generate Request**.

* If an `.http` file with the project name as the file name exists, the request is added to that file.
* Otherwise, an `.http` file is created with the project name as the file name, and the request is added to that file.

The preceding screenshot shows endpoints defined by the ASP.NET Core Web API project template. The following example shows the request that is generated for the selected endpoint:

```http
GET {{WebApplication1_HostAddress}}/weatherforecast/
Accept: application/json

###
```

Send the request as described earlier in this article.

## See also

* Endpoints Explorer window only recognizes literal strings for routes
* Web API development in Visual Studio 2022
* Visual Studio Code REST Client extension

---
title: "Test web APIs with the HttpRepl (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/web-api/http-repl/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Test web APIs with the HttpRepl (part 3 of 3)

## Test secured endpoints

The HttpRepl supports the testing of secured endpoints in the following ways:

* Via the default credentials of the logged in user.
* Through the use of HTTP request headers.

### Default credentials

Consider a web API you're testing that's hosted in IIS and secured with Windows authentication. You want the credentials of the user running the tool to flow across to the HTTP endpoints being tested. To pass the default credentials of the logged in user:

1. Set the `httpClient.useDefaultCredentials` preference to `true`:

    ```console
    pref set httpClient.useDefaultCredentials true
    ```

1. Exit and restart the tool before sending another request to the web API.

### Default proxy credentials

Consider a scenario in which the web API you're testing is behind a proxy secured with Windows authentication. You want the credentials of the user running the tool to flow to the proxy. To pass the default credentials of the logged in user:

1. Set the `httpClient.proxy.useDefaultCredentials` preference to `true`:

    ```console
    pref set httpClient.proxy.useDefaultCredentials true
    ```

1. Exit and restart the tool before sending another request to the web API.

### HTTP request headers

Examples of supported authentication and authorization schemes include:

* basic <example-value>
* JWT bearer <example-value>
* digest authentication

For example, you can send a bearer token to an endpoint with the following command:

```console
set header Authorization "<example-value>"
```

To access an Azure-hosted endpoint or to use the Azure REST API, you need a bearer token. Use the following steps to obtain a bearer token for your Azure subscription via the Azure CLI. The HttpRepl sets the bearer token in an HTTP request header. A list of Azure App Service Web Apps is retrieved.

1. Sign in to Azure:

    ```azurecli
    az login
    ```

1. Get your subscription ID with the following command:

    ```azurecli
    az account show --query id
    ```

1. Copy your subscription ID and run the following command:

    ```azurecli
    az account set --subscription "<SUBSCRIPTION ID>"
    ```

1. Get your bearer token with the following command:

    ```azurecli
    az account get-access-token <example-value> accessToken
    ```

1. Connect to the Azure REST API via the HttpRepl:

    ```console
    httprepl https://management.azure.com
    ```

1. Set the `Authorization` HTTP request header:

    ```console
    https://management.azure.com/> set header Authorization "<example-value>"
    ```

1. Navigate to the subscription:

    ```console
    https://management.azure.com/> cd subscriptions/<SUBSCRIPTION ID>
    ```

1. Get a list of your subscription's Azure App Service Web Apps:

    ```console
    https://management.azure.com/subscriptions/{SUBSCRIPTION ID}> get providers/Microsoft.Web/sites?api-version=2016-08-01
    ```

    The following response is displayed:

    ```console
    HTTP/1.1 200 OK
    Cache-Control: no-cache
    Content-Length: 35948
    Content-Type: application/json; charset=utf-8
    Date: Thu, 19 Sep 2019 23:04:03 GMT
    Expires: -1
    Pragma: no-cache
    Strict-Transport-Security: max-age=31536000; includeSubDomains
    X-Content-Type-Options: nosniff
    x-ms-correlation-request-id: <em>xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</em>
    x-ms-original-request-ids: <em>xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx;xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</em>
    x-ms-ratelimit-remaining-subscription-reads: 11999
    x-ms-request-id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    x-ms-routing-request-id: WESTUS:xxxxxxxxxxxxxxxx:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx
    {
      "value": [
        <AZURE RESOURCES LIST>
      ]
    }
    ```

## Toggle HTTP request display

By default, display of the HTTP request being sent is suppressed. It's possible to change the corresponding setting for the duration of the command shell session.

### Enable request display

View the HTTP request being sent by running the `echo on` command. For example:

```console
https://localhost:5001/people> echo on
Request echoing is on
```

Subsequent HTTP requests in the current session display the request headers. For example:

```console
https://localhost:5001/people> post

[main 2019-06-28T18:50:11.930Z] update#setState idle
Request to https://localhost:5001...

POST /people HTTP/1.1
Content-Length: 41
Content-Type: application/json
User-Agent: HTTP-REPL

{
  "id": 0,
  "name": "Scott Addie"
}

Response from https://localhost:5001...

HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
Date: Fri, 28 Jun 2019 18:50:21 GMT
Location: https://localhost:5001/people/4
Server: Kestrel
Transfer-Encoding: chunked

{
  "id": 4,
  "name": "Scott Addie"
}

https://localhost:5001/people>
```

### Disable request display

Suppress display of the HTTP request being sent by running the `echo off` command. For example:

```console
https://localhost:5001/people> echo off
Request echoing is off
```

## Run a script

If you frequently execute the same set of HttpRepl commands, consider storing them in a text file. Commands in the file take the same form as commands executed manually on the command line. The commands can be executed in a batched fashion using the `run` command. For example:

1. Create a text file containing a set of newline-delimited commands. To illustrate, consider a *people-script.txt* file containing the following commands:

    ```text
    set base https://localhost:5001
    ls
    cd People
    ls
    get 1
    ```

1. Execute the `run` command, passing in the text file's path. For example:

    ```console
    https://localhost:5001/> run C:\http-repl-scripts\people-script.txt
    ```

    The following output appears:

    ```console
    https://localhost:5001/> set base https://localhost:5001
    Using OpenAPI description at https://localhost:5001/swagger/v1/swagger.json
    
    https://localhost:5001/> ls
    .        []
    Fruits   [get|post]
    People   [get|post]
    
    https://localhost:5001/> cd People
    /People    [get|post]
    
    https://localhost:5001/People> ls
    .      [get|post]
    ..     []
    {id}   [get|put|delete]
    
    https://localhost:5001/People> get 1
    HTTP/1.1 200 OK
    Content-Type: application/json; charset=utf-8
    Date: Fri, 12 Jul 2019 19:20:10 GMT
    Server: Kestrel
    Transfer-Encoding: chunked
    
    {
      "id": 1,
      "name": "Scott Hunter"
    }
    
    
    https://localhost:5001/People>
    ```

## Clear the output

To remove all output written to the command shell by the HttpRepl tool, run the `clear` or `cls` command. To illustrate, imagine the command shell contains the following output:

```console
httprepl https://localhost:5001
(Disconnected)> set base "https://localhost:5001"
Using OpenAPI description at https://localhost:5001/swagger/v1/swagger.json

https://localhost:5001/> ls
.        []
Fruits   [get|post]
People   [get|post]

https://localhost:5001/>
```

Run the following command to clear the output:

```console
https://localhost:5001/> clear
```

After running the preceding command, the command shell contains only the following output:

```console
https://localhost:5001/>
```

## Related content

* REST API requests
* HttpRepl GitHub repository
* Configure Visual Studio to launch HttpRepl
* Configure Visual Studio Code to launch HttpRepl

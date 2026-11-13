---
title: "Test web APIs with the HttpRepl (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/web-api/http-repl/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Test web APIs with the HttpRepl (part 2 of 3)

## Test HTTP POST requests

### Synopsis

```console
post <PARAMETER> [-c|--content] [-f|--file] [-h|--header] [--no-body] [-F|--no-formatting] [--response] [--response:body] [--response:headers] [-s|--streaming]
```

### Arguments

`PARAMETER`

The route parameter, if any, expected by the associated controller action method.

### Options

* `-F|--no-formatting`

  A flag whose presence suppresses HTTP response formatting.

* `-h|--header`

  Sets an HTTP request header. The following two value formats are supported:

  * `{header}={value}`
  * `{header}:{value}`

* `--response:body`

  Specifies a file to which the HTTP response body should be written. For example, `--response:body "C:\response.json"`. The file is created if it doesn't exist.

* `--response:headers`

  Specifies a file to which the HTTP response headers should be written. For example, `--response:headers "C:\response.txt"`. The file is created if it doesn't exist.

* `-s|--streaming`

  A flag whose presence enables streaming of the HTTP response.

* `-c|--content`

  Provides an inline HTTP request body. For example, `-c "{\"id\":2,\"name\":\"Cherry\"}"`.

* `-f|--file`

  Provides a path to a file containing the HTTP request body. For example, `-f "C:\request.json"`.

* `--no-body`

  Indicates that no HTTP request body is needed.

### Example

To issue an HTTP POST request:

1. Run the `post` command on an endpoint that supports it:

    ```console
    https://localhost:5001/people> post -h Content-Type=application/json
    ```

    In the preceding command, the `Content-Type` HTTP request header is set to indicate a request body media type of JSON. The default text editor opens a *.tmp* file with a JSON template representing the HTTP request body. For example:

    ```json
    {
      "id": 0,
      "name": ""
    }
    ```

    > **Tip:**
    > To set the default text editor, see the Set the default text editor section.

1. Modify the JSON template to satisfy model validation requirements:

    ```json
    {
      "id": 0,
      "name": "Scott Addie"
    }
    ```

1. Save the *.tmp* file, and close the text editor. The following output appears in the command shell:

    ```console
    HTTP/1.1 201 Created
    Content-Type: application/json; charset=utf-8
    Date: Thu, 27 Jun 2019 21:24:18 GMT
    Location: https://localhost:5001/people/4
    Server: Kestrel
    Transfer-Encoding: chunked

    {
      "id": 4,
      "name": "Scott Addie"
    }

    https://localhost:5001/people>
    ```

## Test HTTP PUT requests

### Synopsis

```console
put <PARAMETER> [-c|--content] [-f|--file] [-h|--header] [--no-body] [-F|--no-formatting] [--response] [--response:body] [--response:headers] [-s|--streaming]
```

### Arguments

`PARAMETER`

The route parameter, if any, expected by the associated controller action method.

### Options

* `-F|--no-formatting`

  A flag whose presence suppresses HTTP response formatting.

* `-h|--header`

  Sets an HTTP request header. The following two value formats are supported:

  * `{header}={value}`
  * `{header}:{value}`

* `--response:body`

  Specifies a file to which the HTTP response body should be written. For example, `--response:body "C:\response.json"`. The file is created if it doesn't exist.

* `--response:headers`

  Specifies a file to which the HTTP response headers should be written. For example, `--response:headers "C:\response.txt"`. The file is created if it doesn't exist.

* `-s|--streaming`

  A flag whose presence enables streaming of the HTTP response.

* `-c|--content`

  Provides an inline HTTP request body. For example, `-c "{\"id\":2,\"name\":\"Cherry\"}"`.

* `-f|--file`

  Provides a path to a file containing the HTTP request body. For example, `-f "C:\request.json"`.

* `--no-body`

  Indicates that no HTTP request body is needed.

### Example

To issue an HTTP PUT request:

1. *Optional*: Run the `get` command to view the data before modifying it:

    ```console
    https://localhost:5001/fruits> get
    HTTP/1.1 200 OK
    Content-Type: application/json; charset=utf-8
    Date: Sat, 22 Jun 2019 00:07:32 GMT
    Server: Kestrel
    Transfer-Encoding: chunked

    [
      {
        "id": 1,
        "data": "Apple"
      },
      {
        "id": 2,
        "data": "Orange"
      },
      {
        "id": 3,
        "data": "Strawberry"
      }
    ]
    ```

1. Run the `put` command on an endpoint that supports it:

    ```console
    https://localhost:5001/fruits> put 2 -h Content-Type=application/json
    ```

    In the preceding command, the `Content-Type` HTTP request header is set to indicate a request body media type of JSON. The default text editor opens a *.tmp* file with a JSON template representing the HTTP request body. For example:

    ```json
    {
      "id": 0,
      "name": ""
    }
    ```

    > **Tip:**
    > To set the default text editor, see the Set the default text editor section.

1. Modify the JSON template to satisfy model validation requirements:

    ```json
    {
      "id": 2,
      "name": "Cherry"
    }
    ```

1. Save the *.tmp* file, and close the text editor. The following output appears in the command shell:

    ```console
    [main 2019-06-28T17:27:01.805Z] update#setState idle
    HTTP/1.1 204 No Content
    Date: Fri, 28 Jun 2019 17:28:21 GMT
    Server: Kestrel
    ```

1. *Optional*: Issue a `get` command to see the modifications. For example, if you typed "Cherry" in the text editor, a `get` returns the following output:

    ```console
    https://localhost:5001/fruits> get
    HTTP/1.1 200 OK
    Content-Type: application/json; charset=utf-8
    Date: Sat, 22 Jun 2019 00:08:20 GMT
    Server: Kestrel
    Transfer-Encoding: chunked

    [
      {
        "id": 1,
        "data": "Apple"
      },
      {
        "id": 2,
        "data": "Cherry"
      },
      {
        "id": 3,
        "data": "Strawberry"
      }
    ]

    https://localhost:5001/fruits>
    ```

## Test HTTP DELETE requests

### Synopsis

```console
delete <PARAMETER> [-F|--no-formatting] [-h|--header] [--response] [--response:body] [--response:headers] [-s|--streaming]
```

### Arguments

`PARAMETER`

The route parameter, if any, expected by the associated controller action method.

### Options

* `-F|--no-formatting`

  A flag whose presence suppresses HTTP response formatting.

* `-h|--header`

  Sets an HTTP request header. The following two value formats are supported:

  * `{header}={value}`
  * `{header}:{value}`

* `--response:body`

  Specifies a file to which the HTTP response body should be written. For example, `--response:body "C:\response.json"`. The file is created if it doesn't exist.

* `--response:headers`

  Specifies a file to which the HTTP response headers should be written. For example, `--response:headers "C:\response.txt"`. The file is created if it doesn't exist.

* `-s|--streaming`

  A flag whose presence enables streaming of the HTTP response.

### Example

To issue an HTTP DELETE request:

1. *Optional*: Run the `get` command to view the data before modifying it:

    ```console
    https://localhost:5001/fruits> get
    HTTP/1.1 200 OK
    Content-Type: application/json; charset=utf-8
    Date: Sat, 22 Jun 2019 00:07:32 GMT
    Server: Kestrel
    Transfer-Encoding: chunked

    [
      {
        "id": 1,
        "data": "Apple"
      },
      {
        "id": 2,
        "data": "Orange"
      },
      {
        "id": 3,
        "data": "Strawberry"
      }
    ]
    ```

1. Run the `delete` command on an endpoint that supports it:

    ```console
    https://localhost:5001/fruits> delete 2
    ```

    The preceding command displays the following output format:

    ```console
    HTTP/1.1 204 No Content
    Date: Fri, 28 Jun 2019 17:36:42 GMT
    Server: Kestrel
    ```

1. *Optional*: Issue a `get` command to see the modifications. In this example, a `get` returns the following output:

    ```console
    https://localhost:5001/fruits> get
    HTTP/1.1 200 OK
    Content-Type: application/json; charset=utf-8
    Date: Sat, 22 Jun 2019 00:16:30 GMT
    Server: Kestrel
    Transfer-Encoding: chunked

    [
      {
        "id": 1,
        "data": "Apple"
      },
      {
        "id": 3,
        "data": "Strawberry"
      }
    ]

    https://localhost:5001/fruits>
    ```

## Test HTTP PATCH requests

### Synopsis

```console
patch <PARAMETER> [-c|--content] [-f|--file] [-h|--header] [--no-body] [-F|--no-formatting] [--response] [--response:body] [--response:headers] [-s|--streaming]
```

### Arguments

`PARAMETER`

The route parameter, if any, expected by the associated controller action method.

### Options

* `-F|--no-formatting`

  A flag whose presence suppresses HTTP response formatting.

* `-h|--header`

  Sets an HTTP request header. The following two value formats are supported:

  * `{header}={value}`
  * `{header}:{value}`

* `--response:body`

  Specifies a file to which the HTTP response body should be written. For example, `--response:body "C:\response.json"`. The file is created if it doesn't exist.

* `--response:headers`

  Specifies a file to which the HTTP response headers should be written. For example, `--response:headers "C:\response.txt"`. The file is created if it doesn't exist.

* `-s|--streaming`

  A flag whose presence enables streaming of the HTTP response.

* `-c|--content`

  Provides an inline HTTP request body. For example, `-c "{\"id\":2,\"name\":\"Cherry\"}"`.

* `-f|--file`

  Provides a path to a file containing the HTTP request body. For example, `-f "C:\request.json"`.

* `--no-body`

  Indicates that no HTTP request body is needed.

## Test HTTP HEAD requests

### Synopsis

```console
head <PARAMETER> [-F|--no-formatting] [-h|--header] [--response] [--response:body] [--response:headers] [-s|--streaming]
```

### Arguments

`PARAMETER`

The route parameter, if any, expected by the associated controller action method.

### Options

* `-F|--no-formatting`

  A flag whose presence suppresses HTTP response formatting.

* `-h|--header`

  Sets an HTTP request header. The following two value formats are supported:

  * `{header}={value}`
  * `{header}:{value}`

* `--response:body`

  Specifies a file to which the HTTP response body should be written. For example, `--response:body "C:\response.json"`. The file is created if it doesn't exist.

* `--response:headers`

  Specifies a file to which the HTTP response headers should be written. For example, `--response:headers "C:\response.txt"`. The file is created if it doesn't exist.

* `-s|--streaming`

  A flag whose presence enables streaming of the HTTP response.

## Test HTTP OPTIONS requests

### Synopsis

```console
options <PARAMETER> [-F|--no-formatting] [-h|--header] [--response] [--response:body] [--response:headers] [-s|--streaming]
```

### Arguments

`PARAMETER`

The route parameter, if any, expected by the associated controller action method.

### Options

* `-F|--no-formatting`

  A flag whose presence suppresses HTTP response formatting.

* `-h|--header`

  Sets an HTTP request header. The following two value formats are supported:

  * `{header}={value}`
  * `{header}:{value}`

* `--response:body`

  Specifies a file to which the HTTP response body should be written. For example, `--response:body "C:\response.json"`. The file is created if it doesn't exist.

* `--response:headers`

  Specifies a file to which the HTTP response headers should be written. For example, `--response:headers "C:\response.txt"`. The file is created if it doesn't exist.

* `-s|--streaming`

  A flag whose presence enables streaming of the HTTP response.

## Set HTTP request headers

To set an HTTP request header, use one of the following approaches:

* Set inline with the HTTP request. For example:

    ```console
    https://localhost:5001/people> post -h Content-Type=application/json
    ```

    With the preceding approach, each distinct HTTP request header requires its own `-h` option.

* Set before sending the HTTP request. For example:

    ```console
    https://localhost:5001/people> set header Content-Type application/json
    ```

    When setting the header before sending a request, the header remains set for the duration of the command shell session. To clear the header, provide an empty value. For example:

    ```console
    https://localhost:5001/people> set header Content-Type
    ```

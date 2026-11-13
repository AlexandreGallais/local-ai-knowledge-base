---
title: "standard-options"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/includes/http-repl/standard-options.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# standard-options

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

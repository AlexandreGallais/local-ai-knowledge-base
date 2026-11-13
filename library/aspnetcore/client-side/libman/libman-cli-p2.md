---
title: "Use the LibMan CLI with ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/client-side/libman/libman-cli.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Use the LibMan CLI with ASP.NET Core (part 2 of 2)

## Manage library cache

The `libman cache` command manages the LibMan library cache. The `filesystem` provider doesn't use the library cache.

### Synopsis

```console
libman cache clean [<PROVIDER>] [--verbosity]
libman cache list [--files] [--libraries] [--verbosity]
libman cache [-h|--help]
```

### Arguments

`PROVIDER`

Only used with the `clean` command. Specifies the provider cache to clean. Valid values include:

* `cdnjs`
* `filesystem`
* `jsdelivr`
* `unpkg`

### Options

The following options are available for the `libman cache` command:

* `--files`

  List the names of files that are cached.

* `--libraries`

  List the names of libraries that are cached.

* `-h|--help`

  Show help information.

* `--verbosity <LEVEL>`

  Set the verbosity of the output. Replace `<LEVEL>` with one of the following values:

  * `quiet`
  * `normal`
  * `detailed`

### Examples

* To view the names of cached libraries per provider, use one of the following commands:

  ```console
  libman cache list
  ```

  ```console
  libman cache list --libraries
  ```

  Output similar to the following is displayed:

  ```console
  Cache contents:
  ---------------
  unpkg:
      knockout
      react
      vue
  cdnjs:
      font-awesome
      jquery
      knockout
      lodash.js
      react
  ```

* To view the names of cached library files per provider:

  ```console
  libman cache list --files
  ```

  Output similar to the following is displayed:

  ```console
  Cache contents:
  ---------------
  unpkg:
      knockout:
          <list omitted for brevity>
      react:
          <list omitted for brevity>
      vue:
          <list omitted for brevity>
  cdnjs:
      font-awesome
          metadata.json
      jquery
          metadata.json
          3.2.1\core.js
          3.2.1\jquery.js
          3.2.1\jquery.min.js
          3.2.1\jquery.min.map
          3.2.1\jquery.slim.js
          3.2.1\jquery.slim.min.js
          3.2.1\jquery.slim.min.map
          3.3.1\core.js
          3.3.1\jquery.js
          3.3.1\jquery.min.js
          3.3.1\jquery.min.map
          3.3.1\jquery.slim.js
          3.3.1\jquery.slim.min.js
          3.3.1\jquery.slim.min.map
      knockout
          metadata.json
          3.4.2\knockout-debug.js
          3.4.2\knockout-min.js
      lodash.js
          metadata.json
          4.17.10\lodash.js
          4.17.10\lodash.min.js
      react
          metadata.json
  ```

  Notice the preceding output shows that jQuery versions 3.2.1 and 3.3.1 are cached under the CDNJS provider.

* To empty the library cache for the CDNJS provider:

  ```console
  libman cache clean cdnjs
  ```

  After emptying the CDNJS provider cache, the `libman cache list` command displays the following:

  ```console
  Cache contents:
  ---------------
  unpkg:
      knockout
      react
      vue
  cdnjs:
      (empty)
  ```

* To empty the cache for all supported providers:

  ```console
  libman cache clean
  ```

  After emptying all provider caches, the `libman cache list` command displays the following:

  ```console
  Cache contents:
  ---------------
  unpkg:
      (empty)
  cdnjs:
      (empty)
  ```

## Related content

* Install a Global Tool
* Use LibMan with ASP.NET Core in Visual Studio
* LibMan GitHub repository

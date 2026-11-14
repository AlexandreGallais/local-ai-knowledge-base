---
title: "IWebProxyScript interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/IWebProxyScript.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IWebProxyScript interface

Namespace: `System.Net`

```csharp
public interface IWebProxyScript
```

Provides the base interface to load and execute scripts for automatic proxy detection.

To be added.

## IWebProxyScript.Close() method

```csharp
public void Close ();
```

Closes a script.

To be added.

## IWebProxyScript.Load(Uri, String, Type) method

```csharp
public bool Load (Uri scriptLocation, string script, Type helperType);
```

Loads a script.

Parameters:

- `scriptLocation`: Internal only.
- `script`: Internal only.
- `helperType`: Internal only.

Returns: A `Boolean` indicating whether the script was successfully loaded.

To be added.

## IWebProxyScript.Run(String, String) method

```csharp
public string Run (string url, string host);
```

Runs a script.

Parameters:

- `url`: Internal only.
- `host`: Internal only.

Returns: An internal-only value.

To be added.

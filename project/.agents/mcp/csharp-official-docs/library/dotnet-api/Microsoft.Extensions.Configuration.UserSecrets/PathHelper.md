---
title: "PathHelper class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration.UserSecrets/PathHelper.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PathHelper class

Namespace: `Microsoft.Extensions.Configuration.UserSecrets`

```csharp
public class PathHelper
```

Provides paths for user secrets configuration files.

To be added.

## PathHelper.PathHelper() constructor

```csharp
public PathHelper ();
```

Initializes a new instance of `PathHelper`.

To be added.

## PathHelper.GetSecretsPathFromSecretsId(String) method

```csharp
public static string GetSecretsPathFromSecretsId (string userSecretsId);
```

Returns the path to the JSON file that stores user secrets.

Parameters:

- `userSecretsId`: The user secret ID.

Returns: The full path to the secret file.

This method uses the current user profile to locate the secrets
file on disk in a location outside of source control.

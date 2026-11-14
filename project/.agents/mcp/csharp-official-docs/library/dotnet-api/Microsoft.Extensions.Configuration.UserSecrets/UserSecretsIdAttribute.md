---
title: "UserSecretsIdAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration.UserSecrets/UserSecretsIdAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UserSecretsIdAttribute class

Namespace: `Microsoft.Extensions.Configuration.UserSecrets`

```csharp
public class UserSecretsIdAttribute : Attribute
```

Represents the user secrets ID.

In most cases, this attribute is automatically generated during compilation by MSBuild targets
included in the UserSecrets NuGet package. These targets use the MSBuild property '<example-value>'
to set the value for `UserSecretsIdAttribute.UserSecretsId`.

## UserSecretsIdAttribute.UserSecretsIdAttribute(String) constructor

```csharp
public UserSecretsIdAttribute (string userSecretId);
```

Initializes an instance of `UserSecretsIdAttribute`.

Parameters:

- `userSecretId`: The user secrets ID.

To be added.

## UserSecretsIdAttribute.UserSecretsId property

```csharp
public string UserSecretsId { get; }
```

Gets the user secrets ID.

Returns: To be added.

To be added.

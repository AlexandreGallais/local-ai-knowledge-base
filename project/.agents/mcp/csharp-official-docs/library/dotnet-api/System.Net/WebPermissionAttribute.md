---
title: "WebPermissionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/WebPermissionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebPermissionAttribute class

Namespace: `System.Net`

```csharp
public sealed class WebPermissionAttribute : System.Security.Permissions.CodeAccessSecurityAttribute
```

Specifies permission to access Internet resources. This class cannot be inherited.

#### Remarks

## WebPermissionAttribute.WebPermissionAttribute(SecurityAction) constructor

```csharp
public WebPermissionAttribute (System.Security.Permissions.SecurityAction action);
```

Initializes a new instance of the `WebPermissionAttribute` class with a value that specifies the security actions that can be performed on this class.

Parameters:

- `action`: One of the `SecurityAction` values.

Exceptions:

- `ArgumentException`: `action` is not a valid `SecurityAction` value.

To be added.

## WebPermissionAttribute.Accept property

```csharp
public string Accept { get; set; }
```

Gets or sets the URI string accepted by the current `WebPermissionAttribute`.

Returns: A string containing the URI accepted by the current `WebPermissionAttribute`.

Exceptions:

- `ArgumentException`: `WebPermissionAttribute.Accept` is not `null` when you attempt to set the value. If you wish to specify more than one Accept URI, use an additional attribute declaration statement.

To be added.

## WebPermissionAttribute.AcceptPattern property

```csharp
public string AcceptPattern { get; set; }
```

Gets or sets a regular expression pattern that describes the URI accepted by the current `WebPermissionAttribute`.

Returns: A string containing a regular expression pattern that describes the URI accepted by the current `WebPermissionAttribute`. This string must be escaped according to the rules for encoding a `Regex` constructor string.

Exceptions:

- `ArgumentException`: `WebPermissionAttribute.AcceptPattern` is not `null` when you attempt to set the value. If you wish to specify more than one Accept URI, use an additional attribute declaration statement.

To be added.

## WebPermissionAttribute.Connect property

```csharp
public string Connect { get; set; }
```

Gets or sets the URI connection string controlled by the current `WebPermissionAttribute`.

Returns: A string containing the URI connection controlled by the current `WebPermissionAttribute`.

Exceptions:

- `ArgumentException`: `WebPermissionAttribute.Connect` is not `null` when you attempt to set the value. If you wish to specify more than one Connect URI, use an additional attribute declaration statement.

To be added.

## WebPermissionAttribute.ConnectPattern property

```csharp
public string ConnectPattern { get; set; }
```

Gets or sets a regular expression pattern that describes the URI connection controlled by the current `WebPermissionAttribute`.

Returns: A string containing a regular expression pattern that describes the URI connection controlled by this `WebPermissionAttribute`.

Exceptions:

- `ArgumentException`: `WebPermissionAttribute.ConnectPattern` is not `null` when you attempt to set the value. If you wish to specify more than one connect URI, use an additional attribute declaration statement.

To be added.

## WebPermissionAttribute.CreatePermission() method

```csharp
public override System.Security.IPermission CreatePermission ();
```

Creates and returns a new instance of the `WebPermission` class.

Returns: A `WebPermission` corresponding to the security declaration.

To be added.

---
title: "HttpListenerBasicIdentity class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpListenerBasicIdentity.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpListenerBasicIdentity class

Namespace: `System.Net`

```csharp
public class HttpListenerBasicIdentity : System.Security.Principal.GenericIdentity
```

Holds the user name and password from a basic <example-value> request.

To be added.

## HttpListenerBasicIdentity.HttpListenerBasicIdentity(String, String) constructor

```csharp
public HttpListenerBasicIdentity (string username, string password);
```

Initializes a new instance of the `HttpListenerBasicIdentity` class using the specified user name and password.

Parameters:

- `username`: The user name.
- `password`: The password.

#### Remarks
This constructor is called by the `HttpListener` class when performing basic authentication.

## HttpListenerBasicIdentity.Password <example-value>

```csharp
public virtual string Password { get; }
```

Indicates the password from a basic <example-value> attempt.

Returns: A `String` that holds the password.

To be added.

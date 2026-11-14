---
title: "PipeAccessRule class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/PipeAccessRule.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PipeAccessRule class

Namespace: `System.IO.Pipes`

```csharp
public sealed class PipeAccessRule : System.Security.AccessControl.AccessRule
```

Represents an abstraction of an access control entry (ACE) that defines an access rule for a pipe.

#### Remarks
Access control rules define user account rights that determine which actions are allowed or disallowed on computers that are running Microsoft Windows.

The `PipeAccessRule` class represents an abstraction of an underlying access control entry (ACE) that specifies a user account, the type of access to provide (read, write, and so on), and whether to allow or deny that right.  This class can also specify how access rules are propagated to child objects.

Use the `PipeAccessRule` class to create a new access rule.  You can persist the rule using the `PipeSecurity` class.

## PipeAccessRule.PipeAccessRule(IdentityReference, PipeAccessRights, AccessControlType) constructor

```csharp
public PipeAccessRule (System.Security.Principal.IdentityReference identity, System.IO.Pipes.PipeAccessRights rights, System.Security.AccessControl.AccessControlType type);
```

Initializes a new instance of the `PipeAccessRule` class with the specified identity, pipe access rights, and access control type.

Parameters:

- `identity`: An `IdentityReference` object that encapsulates a reference to a user account.
- `rights`: One of the `PipeAccessRights` values that specifies the type of operation associated with the access rule.
- `type`: One of the `AccessControlType` values that specifies whether to allow or deny the operation.

#### Remarks
Use this constructor to create an access control rule that you can persist using the `PipeSecurity` class. Access control rules define user account rights that determine which actions are allowed or disallowed on computers that are running Microsoft Windows.

## PipeAccessRule.PipeAccessRule(String, PipeAccessRights, AccessControlType) constructor

```csharp
public PipeAccessRule (string identity, System.IO.Pipes.PipeAccessRights rights, System.Security.AccessControl.AccessControlType type);
```

Initializes a new instance of the `PipeAccessRule` class with the specified identity, pipe access rights, and access control type.

Parameters:

- `identity`: The name of the user account.
- `rights`: One of the `PipeAccessRights` values that specifies the type of operation associated with the access rule.
- `type`: One of the `AccessControlType` values that specifies whether to allow or deny the operation.

#### Remarks
Use this constructor to create an access control rule that you can persist using the `PipeSecurity` class. Access control rules define user account rights that determine which actions are allowed or disallowed on computers that are running Microsoft Windows.

## PipeAccessRule.PipeAccessRights property

```csharp
public System.IO.Pipes.PipeAccessRights PipeAccessRights { get; }
```

Gets the `PipeAccessRights` flags that are associated with the current `PipeAccessRule` object.

Returns: A bitwise combination of the `PipeAccessRights` values.

To be added.

---
title: "PipeAccessRights enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/PipeAccessRights.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PipeAccessRights enum

Namespace: `System.IO.Pipes`

```csharp
public enum PipeAccessRights
```

Defines the access rights to use when you create access and audit rules.

#### Remarks
The `PipeAccessRights` enumeration specifies which file system actions are allowed for a particular user account and which file system actions are audited for a particular user account.

Use the `PipeAccessRights` enumeration when you create an access rule with the `PipeAccessRule` class or when you create an audit rule with the `PipeAuditRule` class.

This enumeration contains several specific system rights values and several values that are a combination of those specific values.  It is easier to use the combination values, such as FullControl, Read, and Write, rather than specifying each component value separately.

## PipeAccessRights.AccessSystemSecurity field

```csharp
AccessSystemSecurity
```

Specifies the right to make changes to the system access control list (SACL).

## PipeAccessRights.ChangePermissions field

```csharp
ChangePermissions
```

Specifies the right to change the security and audit rules that are associated with a pipe.

## PipeAccessRights.CreateNewInstance field

```csharp
CreateNewInstance
```

Specifies the right to create a new pipe. Setting this right also sets the `PipeAccessRights.Synchronize` right.

## PipeAccessRights.Delete field

```csharp
Delete
```

Specifies the right to delete a pipe.

## PipeAccessRights.FullControl field

```csharp
FullControl
```

Specifies the right to exert full control over a pipe, and to modify access control and audit rules. This value represents the combination of all rights in this enumeration.

## PipeAccessRights.Read field

```csharp
Read
```

Specifies the right to read from the pipe. This right includes the `PipeAccessRights.ReadAttributes`, `PipeAccessRights.ReadData`, `PipeAccessRights.ReadExtendedAttributes`, and `PipeAccessRights.ReadPermissions` rights.

## PipeAccessRights.ReadAttributes field

```csharp
ReadAttributes
```

Specifies the right to read file system attributes from a pipe. This does not include the right to read data, extended file system attributes, or access and audit rules.

## PipeAccessRights.ReadData field

```csharp
ReadData
```

Specifies the right to read data from the pipe. This does not include the right to read file system attributes, extended file system attributes, or access and audit rules.

## PipeAccessRights.ReadExtendedAttributes field

```csharp
ReadExtendedAttributes
```

Specifies the right to read extended file system attributes from a pipe. This does not include the right to read data, file system attributes, or access and audit rules.

## PipeAccessRights.ReadPermissions field

```csharp
ReadPermissions
```

Specifies the right to read access and audit rules from the pipe. This does not include the right to read data, file system attributes, or extended file system attributes.

## PipeAccessRights.ReadWrite field

```csharp
ReadWrite
```

Specifies the right to read and write from the pipe. This right includes the `PipeAccessRights.ReadAttributes`, `PipeAccessRights.ReadData`, `PipeAccessRights.ReadExtendedAttributes`, `PipeAccessRights.ReadPermissions`, `PipeAccessRights.WriteAttributes`, `PipeAccessRights.WriteData`, and `PipeAccessRights.WriteExtendedAttributes` rights.

## PipeAccessRights.Synchronize field

```csharp
Synchronize
```

Specifies whether the application can wait for a pipe handle to synchronize with the completion of an I/O operation. This value is automatically set when allowing access to the pipe and automatically excluded when denying access to the pipe. The right to create a pipe requires this value. Note that if you do not explicitly set this value when you create a pipe, the value will be set automatically for you.

## PipeAccessRights.TakeOwnership field

```csharp
TakeOwnership
```

Specifies the right to change the owner of a pipe. Note that owners of a pipe have full access to that resource.

## PipeAccessRights.Write field

```csharp
Write
```

Specifies the right to write to the pipe. This right includes the `PipeAccessRights.WriteAttributes`, `PipeAccessRights.WriteData`, and `PipeAccessRights.WriteExtendedAttributes` rights.

## PipeAccessRights.WriteAttributes field

```csharp
WriteAttributes
```

Specifies the right to write file system attributes to a pipe. This does not include the right to write data or extended file system attributes.

## PipeAccessRights.WriteData field

```csharp
WriteData
```

Specifies the right to write data to a pipe. This does not include the right to write file system attributes or extended file system attributes.

## PipeAccessRights.WriteExtendedAttributes field

```csharp
WriteExtendedAttributes
```

Specifies the right to write extended file system attributes to a pipe. This does not include the right to write file attributes or data.

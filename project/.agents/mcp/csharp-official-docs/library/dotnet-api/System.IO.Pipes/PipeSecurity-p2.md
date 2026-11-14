---
title: "PipeSecurity class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/PipeSecurity.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PipeSecurity class (part 2 of 2)

## PipeSecurity.ResetAccessRule(PipeAccessRule) method

```csharp
public void ResetAccessRule (System.IO.Pipes.PipeAccessRule rule);
```

Removes all access rules in the Discretionary Access Control List (DACL) that is associated with the current `PipeSecurity` object and then adds the specified access rule.

Parameters:

- `rule`: The access rule to add.

Exceptions:

- `ArgumentNullException`: The `rule` parameter is `null`.

#### Remarks
The `PipeSecurity.ResetAccessRule` method adds the specified access control list (ACL) rule or overwrites any identical ACL rules that match the `rule` parameter.  For example, if the `rule` parameter specifies a `Read` value and the `PipeSecurity.ResetAccessRule` method finds an identical ACL rule that specifies the `Read` value, the identical rule will be overwritten.  If the `PipeSecurity.ResetAccessRule` method finds an identical ACL rule that specifies the `Write` value, the identical rule will also be overwritten.

## PipeSecurity.SetAccessRule(PipeAccessRule) method

```csharp
public void SetAccessRule (System.IO.Pipes.PipeAccessRule rule);
```

Sets an access rule in the Discretionary Access Control List (DACL) that is associated with the current `PipeSecurity` object.

Parameters:

- `rule`: The rule to set.

Exceptions:

- `ArgumentNullException`: The `rule` parameter is `null`.

#### Remarks
The `PipeSecurity.SetAccessRule` method adds the specified access control list (ACL) rule or overwrites any identical ACL rules that match the `PipeAccessRights` value of the `rule` parameter.  For example, if the `rule` parameter specifies a `Read` value and the `PipeSecurity.SetAccessRule` method finds an identical ACL rule that specifies the `Read` value, the identical rule will be overwritten.  If the `PipeSecurity.SetAccessRule` method finds an identical ACL rule that specifies the `Write` value, the identical rule will not be overwritten.

## PipeSecurity.SetAuditRule(PipeAuditRule) method

```csharp
public void SetAuditRule (System.IO.Pipes.PipeAuditRule rule);
```

Sets an audit rule in the System Access Control List (SACL) that is associated with the current `PipeSecurity` object.

Parameters:

- `rule`: The rule to set.

Exceptions:

- `ArgumentNullException`: The `rule` parameter is `null`.

#### Remarks
The `PipeSecurity.SetAuditRule` method adds the specified audit rule or overwrites any identical audit rules that match the `PipeAccessRights` value of the `rule` parameter.  For example, if the `rule` parameter specifies a `Read` value and the `PipeSecurity.SetAuditRule` method finds an identical audit rule that specifies the `Read` value, the identical rule will be overwritten.  If the `PipeSecurity.SetAuditRule` method finds an identical audit rule that specifies the `Write` value, the identical rule will not be overwritten.

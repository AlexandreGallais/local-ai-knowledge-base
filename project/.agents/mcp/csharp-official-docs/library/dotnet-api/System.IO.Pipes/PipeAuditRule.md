---
title: "PipeAuditRule class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/PipeAuditRule.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PipeAuditRule class

Namespace: `System.IO.Pipes`

```csharp
public sealed class PipeAuditRule : System.Security.AccessControl.AuditRule
```

Represents an abstraction of an access control entry (ACE) that defines an audit rule for a pipe.

#### Remarks
Audit rules determine when and how actions performed on system objects are logged.

The `PipeAuditRule` class represents an abstraction of an underlying access control entry (ACE) that specifies a user account, the type of access to provide (read, write, and so on), and whether to perform auditing. This class can specify how audit rules are inherited from and propagated to objects.

To allow file auditing on computers that are running Windows NT or later operating systems, the Audit Access Security policy must be enabled; by default, this policy is set to **No Auditing**.

To enable the Audit Access Security policy, perform the following steps:

1.  Click the **Start** button and then point to **All Programs**. Point to **Administrative Tools** and then click **Local Security Policy**.

2.  In the Local Security Settings window, expand the Local Policies folder and left-click the Audit Policy folder.

3.  Double-click the **Audit object access** entry in the right pane of the Local Security Settings window to display the **Audit object access Properties** dialog box.

4.  Select the **Success** or **Failure** boxes to log successes or failures.

Note that an audit rule for a user account requires a corresponding access rule for the same user account.

Use the `PipeAuditRule` class to create a new audit rule. You can persist this rule using the `PipeSecurity` class.

## PipeAuditRule.PipeAuditRule(IdentityReference, PipeAccessRights, AuditFlags) constructor

```csharp
public PipeAuditRule (System.Security.Principal.IdentityReference identity, System.IO.Pipes.PipeAccessRights rights, System.Security.AccessControl.AuditFlags flags);
```

Initializes a new instance of the `PipeAuditRule` class for a user account specified in a `IdentityReference` object.

Parameters:

- `identity`: An `IdentityReference` object that encapsulates a reference to a user account.
- `rights`: One of the `PipeAccessRights` values that specifies the type of operation associated with the access rule.
- `flags`: One of the `AuditFlags` values that specifies when to perform auditing.

#### Remarks
Use this constructor to create an audit rule that can be persisted using the `PipeSecurity` class. Audit rules determine when and how actions performed on system objects are logged.

## PipeAuditRule.PipeAuditRule(String, PipeAccessRights, AuditFlags) constructor

```csharp
public PipeAuditRule (string identity, System.IO.Pipes.PipeAccessRights rights, System.Security.AccessControl.AuditFlags flags);
```

Initializes a new instance of the `PipeAuditRule` class for a named user account.

Parameters:

- `identity`: The name of the user account.
- `rights`: One of the `PipeAccessRights` values that specifies the type of operation associated with the access rule.
- `flags`: One of the `AuditFlags` values that specifies when to perform auditing.

#### Remarks
Use this constructor to create an audit rule that can be persisted using the `PipeSecurity` class. Audit rules determine when and how actions performed on system objects are logged.

## PipeAuditRule.PipeAccessRights property

```csharp
public System.IO.Pipes.PipeAccessRights PipeAccessRights { get; }
```

Gets the `PipeAccessRights` flags that are associated with the current `PipeAuditRule` object.

Returns: A bitwise combination of the `PipeAccessRights` values.

To be added.

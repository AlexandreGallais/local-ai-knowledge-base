---
title: "PipeSecurity class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/PipeSecurity.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PipeSecurity class

Namespace: `System.IO.Pipes`

```csharp
public class PipeSecurity : System.Security.AccessControl.NativeObjectSecurity
```

Represents the access control and audit security for a pipe.

#### Remarks
The `PipeSecurity` class specifies the access rights for a pipe and how access attempts are audited.  This class represents access and audit rights as a set of rules. Each access rule is represented by a `PipeAccessRule` object, while each audit rule is represented by a `PipeAuditRule` object.

The `PipeSecurity` class is an abstraction of the underlying Microsoft Windows file security system. In this system, each pipe has a discretionary access control list (DACL), which controls access to the pipe, and a system access control list (SACL), which specifies the access control attempts that are audited.  The `PipeAccessRule` and `PipeAuditRule` classes are abstractions of the access control entries (ACEs) that comprise DACLs and SACLs.

The `PipeSecurity` class hides many of the details of DACLs and SACLs; you do not have to worry about ACE ordering or null DACLS.

Use the `PipeSecurity` class to retrieve, add, or change the access rules that represent the DACL and SACL of a pipe.

To persist new or changed access or audit rules to a pipe, use the `PipeStream.SetAccessControl` method. To retrieve access or audit rules from an existing file, use the `PipeStream.GetAccessControl` method.

## PipeSecurity.PipeSecurity() constructor

```csharp
public PipeSecurity ();
```

Initializes a new instance of the `PipeSecurity` class.

#### Remarks
This constructor creates an empty `PipeSecurity` object that is not based on an existing pipe. You can then populate the object with access control information and apply it to a pipe.

You can add access or audit rules to the `PipeSecurity` object using the `PipeSecurity.AddAccessRule` method. You can remove access or audit rules using the `PipeSecurity.RemoveAccessRule` method.

To persist new or changed access or audit rules to a pipe, use the `PipeStream.SetAccessControl` method. To retrieve access or audit rules from an existing file, use the `PipeStream.GetAccessControl` method.

## PipeSecurity.AccessRightType property

```csharp
public override Type AccessRightType { get; }
```

Gets the `Type` of the securable object that is associated with the current `PipeSecurity` object.

Returns: The type of the securable object that is associated with the current `PipeSecurity` object.

#### Remarks
Classes that derive from the `ObjectSecurity` class override the `AccessRightType` property and return the type they use to represent access rights. When you work with arrays or collections that contain multiple types of security objects, use this property to determine the correct enumeration type to use with each security object.

## PipeSecurity.AccessRuleType property

```csharp
public override Type AccessRuleType { get; }
```

Gets the `Type` of the object that is associated with the access rules of the current `PipeSecurity` object.

Returns: The type of the object that is associated with the access rules of the current `PipeSecurity` object.

#### Remarks
Classes that derive from the `ObjectSecurity` class override the `AccessRuleType` property and return the type they use to represent access rights. When you work with arrays or collections that contain multiple types of security objects, use this property to determine the correct enumeration type to use with each security object.

## PipeSecurity.AuditRuleType property

```csharp
public override Type AuditRuleType { get; }
```

Gets the `Type` object associated with the audit rules of the current `PipeSecurity` object.

Returns: The type of the object that is associated with the audit rules of the current `PipeSecurity` object.

#### Remarks
Classes that derive from the `ObjectSecurity` class override the `AuditRuleType` property and return the type they use to represent access rights. When you work with arrays or collections that contain multiple types of security objects, use this property to determine the correct enumeration type to use with each security object.

## PipeSecurity.AccessRuleFactory(IdentityReference, Int32, Boolean, InheritanceFlags, PropagationFlags, AccessControlType) method

```csharp
public override System.Security.AccessControl.AccessRule AccessRuleFactory (System.Security.Principal.IdentityReference identityReference, int accessMask, bool isInherited, System.Security.AccessControl.InheritanceFlags inheritanceFlags, System.Security.AccessControl.PropagationFlags propagationFlags, System.Security.AccessControl.AccessControlType type);
```

Initializes a new instance of the `AccessRule` class with the specified values.

Parameters:

- `identityReference`: The identity that the access rule applies to. It must be an object that can be cast as a `SecurityIdentifier` object.
- `accessMask`: The access mask of this rule. The access mask is a 32-bit collection of anonymous bits, the meaning of which is defined by the individual integrators
- `isInherited`: `true` if this rule is inherited from a parent container; otherwise, `false`.
- `inheritanceFlags`: One of the `InheritanceFlags` values that specifies the inheritance properties of the access rule.
- `propagationFlags`: One of the `PropagationFlags` values that specifies whether inherited access rules are automatically propagated. The propagation flags are ignored if `inheritanceFlags` is set to `InheritanceFlags.None`.
- `type`: Specifies the valid access control type.

Returns: The `AccessRule` object that this method creates.

Exceptions:

- `ArgumentOutOfRangeException`: `accessMask`, `inheritanceFlags`, `propagationFlags`, or `type` specifies an invalid value.
- `ArgumentNullException`: `identityReference` is `null`.

-or-

`accessMask` is zero.
- `ArgumentException`: `identityReference` is neither of type `SecurityIdentifier` nor of a type, such as `NTAccount`, that can be converted to type `SecurityIdentifier`.

#### Remarks
The recommended way to create access control rules is to use the constructors of the `PipeAccessRule` class.

## PipeSecurity.AddAccessRule(PipeAccessRule) method

```csharp
public void AddAccessRule (System.IO.Pipes.PipeAccessRule rule);
```

Adds an access rule to the Discretionary Access Control List (DACL) that is associated with the current `PipeSecurity` object.

Parameters:

- `rule`: The access rule to add.

Exceptions:

- `ArgumentNullException`: The `rule` parameter is `null`.

#### Remarks
The `PipeSecurity.AddAccessRule` method adds a new rule to the list of rules that a `PipeSecurity` object contains. If an access control list (ACL) already exists for the specified rule, the `PipeSecurity.AddAccessRule` method will still add the rule, with one exception: a `PipeAccessRule` object that is created using the `Deny` value supersedes an object that is created using the `Allow` value.

## PipeSecurity.AddAuditRule(PipeAuditRule) method

```csharp
public void AddAuditRule (System.IO.Pipes.PipeAuditRule rule);
```

Adds an audit rule to the System Access Control List (SACL) that is associated with the current `PipeSecurity` object.

Parameters:

- `rule`: The audit rule to add.

Exceptions:

- `ArgumentNullException`: The `rule` parameter is `null`.

#### Remarks
The `PipeSecurity.AddAuditRule` method adds a new audit rule to the list of rules that a `PipeSecurity` object contains.

If an audit rule already exists for the specified rule, the `PipeSecurity.AddAuditRule` method will still add the rule.

## PipeSecurity.AuditRuleFactory(IdentityReference, Int32, Boolean, InheritanceFlags, PropagationFlags, AuditFlags) method

```csharp
public override sealed System.Security.AccessControl.AuditRule AuditRuleFactory (System.Security.Principal.IdentityReference identityReference, int accessMask, bool isInherited, System.Security.AccessControl.InheritanceFlags inheritanceFlags, System.Security.AccessControl.PropagationFlags propagationFlags, System.Security.AccessControl.AuditFlags flags);
```

Initializes a new instance of the `AuditRule` class with the specified values.

Parameters:

- `identityReference`: The identity that the access rule applies to. It must be an object that can be cast as a `SecurityIdentifier` object.
- `accessMask`: The access mask of this rule. The access mask is a 32-bit collection of anonymous bits, the meaning of which is defined by the individual integrators
- `isInherited`: `true` if this rule is inherited from a parent container; otherwise, false.
- `inheritanceFlags`: One of the `InheritanceFlags` values that specifies the inheritance properties of the access rule.
- `propagationFlags`: One of the `PropagationFlags` values that specifies whether inherited access rules are automatically propagated. The propagation flags are ignored if `inheritanceFlags` is set to `InheritanceFlags.None`.
- `flags`: One of the `AuditFlags` values that specifies the valid access control type.

Returns: The `AuditRule` object that this method creates.

Exceptions:

- `ArgumentOutOfRangeException`: The `accessMask`, `inheritanceFlags`, `propagationFlags`, or `flags` properties specify an invalid value.
- `ArgumentNullException`: The `identityReference` property is `null`.

-or-

The `accessMask` property is zero.
- `ArgumentException`: The `identityReference` property is neither of type `SecurityIdentifier` nor of a type, such as `NTAccount`, that can be converted to type `SecurityIdentifier`.

#### Remarks
The recommended way to create audit rules is to use the constructors of the `PipeAuditRule` class.

## PipeSecurity.Persist(SafeHandle) method

```csharp
protected internal void Persist (System.Runtime.InteropServices.SafeHandle handle);
```

Saves the specified sections of the security descriptor that is associated with the current `PipeSecurity` object to permanent storage.

Parameters:

- `handle`: The handle of the securable object that the current `PipeSecurity` object is associated with.

To be added.

## PipeSecurity.Persist(String) method

```csharp
protected internal void Persist (string name);
```

Saves the specified sections of the security descriptor that is associated with the current `PipeSecurity` object to permanent storage.

Parameters:

- `name`: The name of the securable object that the current `PipeSecurity` object is associated with.

To be added.

## PipeSecurity.RemoveAccessRule(PipeAccessRule) method

```csharp
public bool RemoveAccessRule (System.IO.Pipes.PipeAccessRule rule);
```

Removes an access rule from the Discretionary Access Control List (DACL) that is associated with the current `PipeSecurity` object.

Parameters:

- `rule`: The access rule to remove.

Returns: `true` if the operation is successful; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `rule` parameter is `null`.

#### Remarks
The `PipeSecurity.RemoveAccessRule` method removes either all matching `Deny` access rules or all matching `Allow` access rules from the current `PipeSecurity` object. For example, you can use this method to remove all `Deny` access rules for a user by passing a `PipeAccessRule` object created using the `Deny` value, the `Read` value, and a user account. The `PipeSecurity.RemoveAccessRule` method removes any deny rules that specify the `Read` value or the `Write` value.

## PipeSecurity.RemoveAccessRuleSpecific(PipeAccessRule) method

```csharp
public void RemoveAccessRuleSpecific (System.IO.Pipes.PipeAccessRule rule);
```

Removes the specified access rule from the Discretionary Access Control List (DACL) that is associated with the current `PipeSecurity` object.

Parameters:

- `rule`: The access rule to remove.

Exceptions:

- `ArgumentNullException`: The `rule` parameter is `null`.

#### Remarks
The `PipeSecurity.RemoveAccessRule` method removes either all matching `Deny` access rules or all matching `Allow` access rules from the current `PipeSecurity` object. For example, you can use this method to remove all `Deny` access rules for a user by passing a `PipeAccessRule` object created using the `Deny` value, the `Read` value, and a user account. The `PipeSecurity.RemoveAccessRule` method removes any deny rules that specify the `Read` value or the `Write` value.

## PipeSecurity.RemoveAuditRule(PipeAuditRule) method

```csharp
public bool RemoveAuditRule (System.IO.Pipes.PipeAuditRule rule);
```

Removes an audit rule from the System Access Control List (SACL) that is associated with the current `PipeSecurity` object.

Parameters:

- `rule`: The audit rule to remove.

Returns: `true` if the audit rule was removed; otherwise, `false`

Exceptions:

- `ArgumentNullException`: The `rule` parameter is `null`.

#### Remarks
The `PipeSecurity.RemoveAuditRule` method removes either all matching `Deny` audit rules or all matching `Allow` audit rules from the current `PipeSecurity` object.  For example, you can use this method to remove all `Deny` audit rules for a user by passing a `FileSystemAuditRule` object created using the `Deny` value, the `Failure` value, and a user account.  When you do this, the `PipeSecurity.RemoveAuditRule` method removes any deny rules that specify the `Failure` value or the `Success` value.

## PipeSecurity.RemoveAuditRuleAll(PipeAuditRule) method

```csharp
public void RemoveAuditRuleAll (System.IO.Pipes.PipeAuditRule rule);
```

Removes all audit rules that have the same security identifier as the specified audit rule from the System Access Control List (SACL) that is associated with the current `PipeSecurity` object.

Parameters:

- `rule`: The audit rule to remove.

Exceptions:

- `ArgumentNullException`: The `rule` parameter is `null`.

#### Remarks
The `PipeSecurity.RemoveAuditRuleAll` method removes all audit rules for the specified user.  It ignores all values in the `PipeAuditRule` object except the user account.

## PipeSecurity.RemoveAuditRuleSpecific(PipeAuditRule) method

```csharp
public void RemoveAuditRuleSpecific (System.IO.Pipes.PipeAuditRule rule);
```

Removes the specified audit rule from the System Access Control List (SACL) that is associated with the current `PipeSecurity` object.

Parameters:

- `rule`: The audit rule to remove.

Exceptions:

- `ArgumentNullException`: The `rule` parameter is `null`.

#### Remarks
The `PipeSecurity.RemoveAuditRuleSpecific` method removes the specified matching `Deny` audit rule or the specified matching `Allow` audit rule from the current `PipeSecurity` object.  For example, you can use this method to remove a specified `Deny` audit rule for a user by passing a `FileSystemAuditRule` object created using the `Deny` value, the `Failure` value, and a user account.  When you do this, the `PipeSecurity.RemoveAuditRuleSpecific` method removes only a deny rule that specifies the `Failure` value.  It does not remove any deny rules that specify the `Success` value.

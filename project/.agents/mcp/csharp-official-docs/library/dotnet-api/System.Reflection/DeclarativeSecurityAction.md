---
title: "DeclarativeSecurityAction enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/DeclarativeSecurityAction.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DeclarativeSecurityAction enum

Namespace: `System.Reflection`

```csharp
public enum DeclarativeSecurityAction
```

Specifies the security actions that can be performed using declarative security.

To be added.

## DeclarativeSecurityAction.Assert field

```csharp
Assert
```

The calling code can access the resource identified by the current permission object, even if callers higher in the stack have not been granted permission to access the resource.

## DeclarativeSecurityAction.Demand field

```csharp
Demand
```

Check that all callers in the call chain have been granted the specified permission.

## DeclarativeSecurityAction.Deny field

```csharp
Deny
```

Without further checks refuse Demand for the specified permission.

## DeclarativeSecurityAction.InheritanceDemand field

```csharp
InheritanceDemand
```

The derived class inheriting the class or overriding a method is required to have the specified permission.

## DeclarativeSecurityAction.LinkDemand field

```csharp
LinkDemand
```

Check that the immediate caller has been granted the specified permission.

## DeclarativeSecurityAction.None field

```csharp
None
```

No declarative security action.

## DeclarativeSecurityAction.PermitOnly field

```csharp
PermitOnly
```

Without further checks, refuse the demand for all permissions other than those specified.

## DeclarativeSecurityAction.RequestMinimum field

```csharp
RequestMinimum
```

Request the minimum permissions required for code to run. This action can only be used within the scope of the assembly.

## DeclarativeSecurityAction.RequestOptional field

```csharp
RequestOptional
```

Request additional permissions that are optional (not required to run). This request implicitly refuses all other permissions not specifically requested. This action can only be used within the scope of the assembly.

## DeclarativeSecurityAction.RequestRefuse field

```csharp
RequestRefuse
```

Request that permissions that might be misused not be granted to the calling code. This action can only be used within the scope of the assembly.

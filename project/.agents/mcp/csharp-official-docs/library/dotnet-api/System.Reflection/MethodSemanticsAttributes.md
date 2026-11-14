---
title: "MethodSemanticsAttributes enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/MethodSemanticsAttributes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MethodSemanticsAttributes enum

Namespace: `System.Reflection`

```csharp
public enum MethodSemanticsAttributes
```

To be added.

To be added.

## MethodSemanticsAttributes.Adder field

```csharp
Adder
```

Used to add a handler for an event. Corresponds to the `AddOn` flag in the Ecma 335 CLI specification.

CLS-compliant adders are named the with `add_` prefix.

## MethodSemanticsAttributes.Getter field

```csharp
Getter
```

Reads the value of the property.

CLS-compliant getters are named with `get_` prefix.

## MethodSemanticsAttributes.Other field

```csharp
Other
```

Other method for a property (not a getter or setter) or an event (not an adder, remover, or raiser).

## MethodSemanticsAttributes.Raiser field

```csharp
Raiser
```

Used to indicate that an event has occurred. Corresponds to the `Fire` flag in the Ecma 335 CLI specification.

CLS-compliant raisers are named with the `raise_` prefix.

## MethodSemanticsAttributes.Remover field

```csharp
Remover
```

Used to remove a handler for an event. Corresponds to the `RemoveOn` flag in the Ecma 335 CLI specification.

CLS-compliant removers are named with the `remove_` prefix.

## MethodSemanticsAttributes.Setter field

```csharp
Setter
```

Used to modify the value of the property.

CLS-compliant setters are named with the `set_` prefix.

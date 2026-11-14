---
title: "DefaultMemberAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/DefaultMemberAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DefaultMemberAttribute class

Namespace: `System.Reflection`

```csharp
public sealed class DefaultMemberAttribute : Attribute
```

Defines the member of a type that is the default member used by `Type.InvokeMember`.

#### Remarks
A property is imported as an indexer (default indexed property in Visual Basic) if the property has arguments and if the name of the property or one of its accessors matches the name specified by the `DefaultMemberAttribute`. If the `DefaultMemberAttribute` is not present on the containing type, then the type does not have an indexer. The C# compiler emits the `DefaultMemberAttribute` on any type containing an indexer. In C# it is an error to manually attribute a type with the `DefaultMemberAttribute` if the type also declares an indexer.

#### Examples
The following example uses the `DefaultMemberAttribute` attribute to make the `Age` property the default member of the `MyClass` class.

_Code sample not included: ~/snippets/csharp/System/Type/GetDefaultMembers/type_getdefaultmembers.cs._

## DefaultMemberAttribute.DefaultMemberAttribute(String) constructor

```csharp
public DefaultMemberAttribute (string memberName);
```

Initializes a new instance of the `DefaultMemberAttribute` class.

Parameters:

- `memberName`: A `String` containing the name of the member to invoke. This may be a constructor, method, property, or field. A suitable invocation attribute must be specified when the member is invoked. The default member of a class can be specified by passing an empty `String` as the name of the member.

The default member of a type is marked with the `DefaultMemberAttribute` custom attribute or marked in COM in the usual way.

To be added.

## DefaultMemberAttribute.MemberName property

```csharp
public string MemberName { get; }
```

Gets the name from the attribute.

Returns: A string representing the member name.

#### Remarks
There is no set accessor because the name must be provided to the constructor. The name is not optional.

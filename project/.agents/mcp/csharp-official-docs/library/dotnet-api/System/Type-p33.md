---
title: "Type class (part 33 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 33 of 33)

## Type.FilterName field

```csharp
public static readonly System.Reflection.MemberFilter FilterName;
```

Represents the case-sensitive member filter used on names. This field is read-only.

#### Remarks
This field holds a reference to the delegate used by the `Type.FindMembers` method. The method encapsulated by this delegate takes two parameters: the first is a `MemberInfo` object and the second is an `Object`. The method determines whether the `MemberInfo` object matches the criteria specified by the `Object`. The `Object` is assigned a string value, which may include a trailing "*" wildcard character. Only wildcard end string matching is supported.

For example, the `Object` may be assigned the value "Byte*". In that case, when the `FilterName` delegate is invoked, it will return `true` only if the method represented by the `MemberInfo` object has a name that begins with "Byte".

#### Examples
The following code example gets the methods associated with the user-defined `Application` type.

_Code sample not included: ~/snippets/csharp/System/Type/FilterName/source.cs._

## Type.FilterNameIgnoreCase field

```csharp
public static readonly System.Reflection.MemberFilter FilterNameIgnoreCase;
```

Represents the case-insensitive member filter used on names. This field is read-only.

#### Remarks
This field holds a reference to the delegate used by the `Type.FindMembers` method. The method encapsulated by this delegate takes two parameters: the first is a `MemberInfo` object and the second is an `Object`. The method determines whether the `MemberInfo` object matches the criteria specified by the `Object`. The `Object` is assigned a string value, which may include a trailing "*" wildcard character. Only wildcard end string matching is supported.

For example, the `Object` may be assigned the value "ByTe*". In that case, when the `FilterName` delegate is invoked, it will return true only if the method represented by the `MemberInfo` object has a name that begins with "byte", ignoring case.

#### Examples
The following example gets the `MemberFilter` delegate, passes it as a parameter to the `Type.FindMembers` method, and displays the methods and their attributes of the `String` class that begin with the letter "c", disregarding the case.

_Code sample not included: ~/snippets/csharp/System/Type/FilterNameIgnoreCase/type_filternameignorecase.cs._

## Type.Missing field

```csharp
public static readonly object Missing;
```

Represents a missing value in the `Type` information. This field is read-only.

#### Remarks
Use the `Missing` field for invocation through reflection to obtain the default value of a parameter. If the `Missing` field is passed in for a parameter value and there is no default value for that parameter, an `ArgumentException` is thrown.

#### Examples
The following code example shows the use of the `Missing` field to invoke a method with its default arguments.

_Code sample not included: ~/snippets/csharp/System/Type/Missing/source.cs._

This code produces the following output:

a = 10 b = 55.3 c = 12

a = 10 b = 1.3 c = 1

a = 10 b = 1.2 c = 1

---
title: "CallerMemberNameAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/CallerMemberNameAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CallerMemberNameAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class CallerMemberNameAttribute : Attribute
```

Tags parameter that should be filled with specific caller member name.

#### Remarks
You apply the `CallerMemberName` attribute to an optional parameter that has a default value. You must specify an explicit default value for the optional parameter. You can't apply this attribute to parameters that aren't specified as optional.

You can use the `CallerMemberName` attribute to avoid specifying the member name as a `String` argument to the called method. By using this technique, you avoid the problem that **Rename Refactoring** doesn't change the `String` values. This is especially useful for the following tasks:

- Using tracing and diagnostic routines.

- Implementing the `INotifyPropertyChanged` interface when binding data. This interface allows the property of an object to notify a bound control that the property has changed, so that the control can display the updated information. Without the `CallerMemberName` attribute, you must specify the property name as a literal.

The following chart shows the member names that are returned when you use the `CallerMemberName` attribute.

|Call occurs within|Member name result|
|-|-|
|Method, property, or event|The name of the method, property, or event from which the call originated.|
|Constructor|The string ".ctor"|
|Static constructor|The string ".cctor"|
|Destructor|The string "Finalize"|
|User-defined operators or conversions|The generated name for the member, for example, "op_Addition".|
|Attribute constructor|The name of the member to which the attribute is applied. If the attribute is any element within a member (such as a parameter, a return value, or a generic type parameter), this result is the name of the member that's associated with that element.|
|No containing member (for example, assembly-level or attributes applied to types)|The default value of the optional parameter.|

#### Examples
The following example shows how to use the `CallerMemberName` attribute. On each call to the `TraceMessage` method, the caller information is substituted as an argument to the optional parameter.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/CallerFilePathAttribute/callerinfo.cs._

## CallerMemberNameAttribute.CallerMemberNameAttribute() constructor

```csharp
public CallerMemberNameAttribute ();
```

Initializes a new instance of the `CallerMemberNameAttribute` class.

To be added.

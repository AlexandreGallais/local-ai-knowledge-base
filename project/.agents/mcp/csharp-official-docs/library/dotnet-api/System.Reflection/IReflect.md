---
title: "IReflect interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/IReflect.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IReflect interface

Namespace: `System.Reflection`

```csharp
public interface IReflect
```

Interoperates with the IDispatch interface.

#### Remarks

In .NET 10 and later versions, no COM object casts successfully to this interface. If you need access, it's recommended to project and define a managed definition of `IDispatch` or `IDispatchEx`.

In .NET 5 through .NET 9, COM objects that implement `IDispatchEx` can be cast to this interface, but all methods throw `TypeLoadException`.

## IReflect.UnderlyingSystemType property

```csharp
public Type UnderlyingSystemType { get; }
```

Gets the underlying type that represents the `IReflect` object.

Returns: The underlying type that represents the `IReflect` object.

To be added.

## IReflect.GetField(String, BindingFlags) method

```csharp
public System.Reflection.FieldInfo? GetField (string name, System.Reflection.BindingFlags bindingAttr);
```

Returns the `FieldInfo` object that corresponds to the specified field and binding flag.

Parameters:

- `name`: The name of the field to find.
- `bindingAttr`: The binding attributes used to control the search.

Returns: A `FieldInfo` object containing the field information for the named object that meets the search constraints specified in `bindingAttr`.

Exceptions:

- `AmbiguousMatchException`: The object implements multiple fields with the same name.

To be added.

## IReflect.GetFields(BindingFlags) method

```csharp
public System.Reflection.FieldInfo[] GetFields (System.Reflection.BindingFlags bindingAttr);
```

Returns an array of `FieldInfo` objects that correspond to all fields of the current class.

Parameters:

- `bindingAttr`: The binding attributes used to control the search.

Returns: An array of `FieldInfo` objects containing all the field information for this reflection object that meets the search constraints specified in `bindingAttr`.

#### Remarks
The match is based upon a name. Each field must have a unique name. The `NonPublic` flag specifies that non-public methods are included in the search. The `Public` flag specifies that public methods are included in the search.

## IReflect.GetMember(String, BindingFlags) method

```csharp
public System.Reflection.MemberInfo[] GetMember (string name, System.Reflection.BindingFlags bindingAttr);
```

Retrieves an array of `MemberInfo` objects corresponding to all public members or to all members that match a specified name.

Parameters:

- `name`: The name of the member to find.
- `bindingAttr`: The binding attributes used to control the search.

Returns: An array of `MemberInfo` objects matching the `name` parameter.

#### Remarks
The `IReflect.GetMember` method retrieves an array of `MemberInfo` objects by using the name and binding attribute that correspond to all public members or to all members that match a specified name. The case of the specified name is observed or ignored, as specified by `IgnoreCase`.

## IReflect.GetMembers(BindingFlags) method

```csharp
public System.Reflection.MemberInfo[] GetMembers (System.Reflection.BindingFlags bindingAttr);
```

Retrieves an array of `MemberInfo` objects that correspond either to all public members or to all members of the current class.

Parameters:

- `bindingAttr`: The binding attributes used to control the search.

Returns: An array of `MemberInfo` objects containing all the member information for this reflection object.

#### Remarks
This method retrieves an array of `MemberInfo` objects by using the binding attribute that corresponds either to all public members or to all members of the current class. It returns an array of all of the members defined for this object.

## IReflect.GetMethod(String, BindingFlags) method

```csharp
public System.Reflection.MethodInfo? GetMethod (string name, System.Reflection.BindingFlags bindingAttr);
```

Retrieves a `MethodInfo` object that corresponds to a specified method under specified search constraints.

Parameters:

- `name`: The name of the member to find.
- `bindingAttr`: The binding attributes used to control the search.

Returns: A `MethodInfo` object containing the method information, with the match being based on the method name and search constraints specified in `bindingAttr`.

Exceptions:

- `AmbiguousMatchException`: The object implements multiple methods with the same name.

To be added.

## IReflect.GetMethod(String, BindingFlags, Binder, Type[], ParameterModifier[]) method

```csharp
public System.Reflection.MethodInfo? GetMethod (string name, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, Type[] types, System.Reflection.ParameterModifier[]? modifiers);
```

Retrieves a `MethodInfo` object corresponding to a specified method, using a `Type` array to choose from among overloaded methods.

Parameters:

- `name`: The name of the member to find.
- `bindingAttr`: The binding attributes used to control the search.
- `binder`: An object that implements `Binder`, containing properties related to this method.
- `types`: An array used to choose among overloaded methods.
- `modifiers`: An array of parameter modifiers used to make binding work with parameter signatures in which the types have been modified.

Returns: The requested method that matches all the specified parameters.

Exceptions:

- `AmbiguousMatchException`: The object implements multiple methods with the same name.

#### Remarks
The return value is a match based on the method name, `BindingFlags` enum member, the kind of type conversion specified by the `binder` parameter, the overload, and the `ParameterInfo` that describes the signature of the method.

## IReflect.GetMethods(BindingFlags) method

```csharp
public System.Reflection.MethodInfo[] GetMethods (System.Reflection.BindingFlags bindingAttr);
```

Retrieves an array of `MethodInfo` objects with all public methods or all methods of the current class.

Parameters:

- `bindingAttr`: The binding attributes used to control the search.

Returns: An array of `MethodInfo` objects containing all the methods defined for this reflection object that meet the search constraints specified in `bindingAttr`.

#### Remarks
The non-public attribute of `bindingAttr` is indicated only if public methods are returned.

## IReflect.GetProperties(BindingFlags) method

```csharp
public System.Reflection.PropertyInfo[] GetProperties (System.Reflection.BindingFlags bindingAttr);
```

Retrieves an array of `PropertyInfo` objects corresponding to all public properties or to all properties of the current class.

Parameters:

- `bindingAttr`: The binding attribute used to control the search.

Returns: An array of `PropertyInfo` objects for all the properties defined on the reflection object.

To be added.

## IReflect.GetProperty(String, BindingFlags) method

```csharp
public System.Reflection.PropertyInfo? GetProperty (string name, System.Reflection.BindingFlags bindingAttr);
```

Retrieves a `PropertyInfo` object corresponding to a specified property under specified search constraints.

Parameters:

- `name`: The name of the property to find.
- `bindingAttr`: The binding attributes used to control the search.

Returns: A `PropertyInfo` object for the located property that meets the search constraints specified in `bindingAttr`, or `null` if the property was not located.

Exceptions:

- `AmbiguousMatchException`: The object implements multiple fields with the same name.

To be added.

## IReflect.GetProperty(String, BindingFlags, Binder, Type, Type[], ParameterModifier[]) method

```csharp
public System.Reflection.PropertyInfo? GetProperty (string name, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, Type? returnType, Type[] types, System.Reflection.ParameterModifier[]? modifiers);
```

Retrieves a `PropertyInfo` object that corresponds to a specified property with specified search constraints.

Parameters:

- `name`: The name of the member to find.
- `bindingAttr`: The binding attribute used to control the search.
- `binder`: An object that implements `Binder`, containing properties related to this method.
- `returnType`: The type of the property.
- `types`: An array used to choose among overloaded methods with the same name.
- `modifiers`: An array used to choose the parameter modifiers.

Returns: A `PropertyInfo` object for the located property, if a property with the specified name was located in this reflection object, or `null` if the property was not located.

#### Remarks
This method retrieves a `PropertyInfo` object corresponding to a specified property under specified search constraints. A type array is used to choose from among overloaded methods.

## IReflect.InvokeMember(String, BindingFlags, Binder, Object, Object[], ParameterModifier[], CultureInfo, String[]) method

```csharp
public object? InvokeMember (string name, System.Reflection.BindingFlags invokeAttr, System.Reflection.Binder? binder, object? target, object?[]? args, System.Reflection.ParameterModifier[]? modifiers, System.Globalization.CultureInfo? culture, string[]? namedParameters);
```

Invokes a specified member.

Parameters:

- `name`: The name of the member to find.
- `invokeAttr`: One of the `BindingFlags` invocation attributes. The `invokeAttr` parameter may be a constructor, method, property, or field. A suitable invocation attribute must be specified. Invoke the default member of a class by passing the empty string ("") as the name of the member.
- `binder`: One of the `BindingFlags` bit flags. Implements `Binder`, containing properties related to this method.
- `target`: The object on which to invoke the specified member. This parameter is ignored for static members.
- `args`: An array of objects that contains the number, order, and type of the parameters of the member to be invoked. This is an empty array if there are no parameters.
- `modifiers`: An array of `ParameterModifier` objects. This array has the same length as the `args` parameter, representing the invoked member's argument attributes in the metadata. A parameter can have the following attributes: `pdIn`, `pdOut`, `pdRetval`, `pdOptional`, and `pdHasDefault`. These represent [In], [Out], [retval], [optional], and a default parameter, respectively. These attributes are used by various interoperability services.
- `culture`: An instance of `CultureInfo` used to govern the coercion of types. For example, `culture` converts a string that represents 1000 to a `Double` value, since 1000 is represented differently by different cultures. If this parameter is `null`, the `CultureInfo` for the current thread is used.
- `namedParameters`: A string array of parameters.

Returns: The specified member.

Exceptions:

- `ArgumentException`: More than one argument is specified for a field `set`.
- `MissingFieldException`: The field or property cannot be found.
- `MissingMethodException`: The method cannot be found.
- `SecurityException`: A private member is invoked without the necessary `ReflectionPermission`.

#### Remarks
The method that is to be invoked must be accessible and provide the most specific match with the specified argument list, under the constraints of the specified binder and invocation attributes.

A method is invoked if the number of parameters in the method declaration equals the number of arguments in the specified argument list, and the type of each argument can be converted by the binder to the type of the parameter.

> **Note:**
>  The array of parameter modifiers passed to the `IReflect.InvokeMember` method must contain a single parameter modifier. Only the first parameter modifier is considered when determining which argument needs to be passed by reference when exposed to COM.

The binder finds all matching methods, in accordance with the type of binding requested (`InvokeMethod`, `IReflect.GetProperties`, and so on). The set of methods is filtered by the name, number of arguments, and a set of search modifiers defined in the binder. After the method is selected, it is invoked, and accessibility is checked at that point. The search may control which set of methods is searched based upon the accessibility attribute associated with the method. `Binder.BindToMethod` selects the method to be invoked. The default binder selects the most specific match.

Access restrictions are ignored for fully trusted code. That is, private constructors, methods, fields, and properties can be accessed and invoked through reflection whenever the code is fully trusted.

#### Examples
The following example obtains the value of the `Now` property.

_Code sample not included: ~/snippets/csharp/System.Reflection/IReflect/InvokeMember/source.cs._

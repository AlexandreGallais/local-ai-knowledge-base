---
title: "PropertyInfo class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/PropertyInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PropertyInfo class (part 3 of 3)

## PropertyInfo.GetValue(Object, BindingFlags, Binder, Object[], CultureInfo) method

```csharp
public abstract object? GetValue (object? obj, System.Reflection.BindingFlags invokeAttr, System.Reflection.Binder? binder, object?[]? index, System.Globalization.CultureInfo? culture);
```

When overridden in a derived class, returns the property value of a specified object that has the specified binding, index, and culture-specific information.

Parameters:

- `obj`: The object whose property value will be returned.
- `invokeAttr`: A bitwise combination of the following enumeration members that specify the invocation attribute: `InvokeMethod`, `CreateInstance`, `Static`, `GetField`, `SetField`, `GetProperty`, and `SetProperty`. You must specify a suitable invocation attribute. For example, to invoke a static member, set the `Static` flag.
- `binder`: An object that enables the binding, coercion of argument types, invocation of members, and retrieval of `MemberInfo` objects through reflection. If `binder` is `null`, the default binder is used.
- `index`: Optional index values for indexed properties. This value should be `null` for non-indexed properties.
- `culture`: The culture for which the resource is to be localized. If the resource is not localized for this culture, the `CultureInfo.Parent` property will be called successively in search of a match. If this value is `null`, the culture-specific information is obtained from the `CultureInfo.CurrentUICulture` property.

Returns: The property value of the specified object.

Exceptions:

- `ArgumentException`: The `index` array does not contain the type of arguments needed.

-or-

The property's `get` accessor is not found.
- `TargetException`: The object does not match the target type, or a property is an instance property but `obj` is `null`.
- `TargetParameterCountException`: The number of parameters in `index` does not match the number of parameters the indexed property takes.
- `MethodAccessException`: There was an illegal attempt to access a private or protected method inside a class.
- `TargetInvocationException`: An error occurred while retrieving the property value. For example, an index value specified for an indexed property is out of range. The `Exception.InnerException` property indicates the reason for the error.

#### Remarks
To determine whether a property is indexed, use the `PropertyInfo.GetIndexParameters` method. If the resulting array has 0 (zero) elements, the property is not indexed.

Because static properties belong to the type, not individual objects, get static properties by passing `null` as the object argument. For example, use the following code to get the static `CurrentCulture` property of `CultureInfo` :

```csharp
PropertyInfo CurCultProp =
       (typeof(CultureInfo)).GetProperty("CurrentCulture");
Console.WriteLine("CurrCult: " +
       CurCultProp.GetValue(null,null));
```

To use the `GetValue` method, first get the class `Type`. From the `Type`, get the `PropertyInfo`. From the `PropertyInfo`, use the `GetValue` method.

## PropertyInfo.op_Equality(PropertyInfo, PropertyInfo) method

```csharp
public static bool operator == (System.Reflection.PropertyInfo? left, System.Reflection.PropertyInfo? right);
```

Indicates whether two `PropertyInfo` objects are equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

To be added.

## PropertyInfo.op_Inequality(PropertyInfo, PropertyInfo) method

```csharp
public static bool operator != (System.Reflection.PropertyInfo? left, System.Reflection.PropertyInfo? right);
```

Indicates whether two `PropertyInfo` objects are not equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` is not equal to `right`; otherwise, `false`.

To be added.

## PropertyInfo.SetValue(Object, Object) method

```csharp
public void SetValue (object? obj, object? value);
```

Sets the property value of a specified object.

Parameters:

- `obj`: The object whose property value will be set.
- `value`: The new property value.

Exceptions:

- `ArgumentException`: The property's `set` accessor is not found.

-or-

`value` cannot be converted to the type of `PropertyInfo.PropertyType`.
- `TargetException`: The type of `obj` does not match the target type, or a property is an instance property but `obj` is `null`.
- `MethodAccessException`: There was an illegal attempt to access a private or protected method inside a class.
- `TargetInvocationException`: An error occurred while setting the property value. The `Exception.InnerException` property indicates the reason for the error.

#### Remarks
The `SetValue` overload sets the value of a non-indexed property. To determine whether a property is indexed, call the `PropertyInfo.GetIndexParameters` method. If the resulting array has 0 (zero) elements, the property is not indexed. To set the value of an indexed property, call the `SetValue` overload.

If the property type of this `PropertyInfo` object is a value type and `value` is `null`, the property will be set to the default value for that type.

This is a convenience method that calls the runtime implementation of the abstract `SetValue` method, specifying `Default` for the `BindingFlags` parameter, `null` for `Binder`, `null` for `Object[]`, and `null` for `CultureInfo`.

To use the `PropertyInfo.SetValue` method, first get a `Type` object that represents the class. From the `Type`, get the `PropertyInfo` object. From the `PropertyInfo` object, call the `PropertyInfo.SetValue` method.

#### Examples
The following example declares a class named `Example` with one `static` (`Shared` in Visual Basic) and one instance property. The example uses the `SetValue` method to change the original property values and displays the original and final values.

_Code sample not included: ~/snippets/csharp/System.Reflection/PropertyInfo/SetValue/example2.cs._

## PropertyInfo.SetValue(Object, Object, Object[]) method

```csharp
public virtual void SetValue (object? obj, object? value, object?[]? index);
```

Sets the property value of a specified object with optional index values for index properties.

Parameters:

- `obj`: The object whose property value will be set.
- `value`: The new property value.
- `index`: Optional index values for indexed properties. This value should be `null` for non-indexed properties.

Exceptions:

- `ArgumentException`: The `index` array does not contain the type of arguments needed.

-or-

The property's `set` accessor is not found.

-or-

`value` cannot be converted to the type of `PropertyInfo.PropertyType`.
- `TargetException`: The object does not match the target type, or a property is an instance property but `obj` is `null`.
- `TargetParameterCountException`: The number of parameters in `index` does not match the number of parameters the indexed property takes.
- `MethodAccessException`: There was an illegal attempt to access a private or protected method inside a class.
- `TargetInvocationException`: An error occurred while setting the property value. For example, an index value specified for an indexed property is out of range. The `Exception.InnerException` property indicates the reason for the error.

#### Remarks
If this `PropertyInfo` object is a value type and `value` is `null`, then the property will be set to the default value for that type.

To determine whether a property is indexed, use the `PropertyInfo.GetIndexParameters` method. If the resulting array has 0 (zero) elements, the property is not indexed.

This is a convenience method that calls the runtime implementation of the abstract `SetValue` method, specifying `Default` for the `BindingFlags` parameter, `null` for `Binder`, and `null` for `CultureInfo`.

To use the `PropertyInfo.SetValue` method, first get a `Type` object that represents the class. From the `Type`, get the `PropertyInfo`. From the `PropertyInfo`, use the `PropertyInfo.SetValue` method.

#### Examples
The following example defines a class named `TestClass` that has a read-write property named `Caption`. It  displays the default value of the `Caption` property, calls the `PropertyInfo.SetValue` method to change the property value, and displays the result.

_Code sample not included: ~/snippets/csharp/System.Reflection/PropertyInfo/SetValue/source.cs._

Note that, because the `Caption` property is not a parameter array, the `index` argument is `null`.

The following example declares a class named `Example` with three properties: a `static` property (`Shared` in Visual Basic), an instance property, and an indexed instance property. The example uses the `PropertyInfo.SetValue` method to change the default values of the properties and displays the original and final values.

The name that is used to search for an indexed instance property with reflection is different depending on the language and on attributes applied to the property.

- In Visual Basic, the property name is always used to search for the property with reflection. You can use the `Default` keyword to make the property a default indexed property, in which case you can omit the name when accessing the property, as in this example. You can also use the property name.

- In C#, the indexed instance property is a default property called an indexer, and the name is never used when accessing the property in code. By default, the name of the property is `Item`, and you must use that name when you search for the property with reflection. You can use the `IndexerNameAttribute` attribute to give the indexer a different name. In this example, the name is `IndexedInstanceProperty`.

_Code sample not included: ~/snippets/csharp/System.Reflection/PropertyInfo/SetValue/Example.cs._

## PropertyInfo.SetValue(Object, Object, BindingFlags, Binder, Object[], CultureInfo) method

```csharp
public abstract void SetValue (object? obj, object? value, System.Reflection.BindingFlags invokeAttr, System.Reflection.Binder? binder, object?[]? index, System.Globalization.CultureInfo? culture);
```

When overridden in a derived class, sets the property value for a specified object that has the specified binding, index, and culture-specific information.

Parameters:

- `obj`: The object whose property value will be set.
- `value`: The new property value.
- `invokeAttr`: A bitwise combination of the following enumeration members that specify the invocation attribute: `InvokeMethod`, `CreateInstance`, `Static`, `GetField`, `SetField`, `GetProperty`, or `SetProperty`. You must specify a suitable invocation attribute. For example, to invoke a static member, set the `Static` flag.
- `binder`: An object that enables the binding, coercion of argument types, invocation of members, and retrieval of `MemberInfo` objects through reflection. If `binder` is `null`, the default binder is used.
- `index`: Optional index values for indexed properties. This value should be `null` for non-indexed properties.
- `culture`: The culture for which the resource is to be localized. If the resource is not localized for this culture, the `CultureInfo.Parent` property will be called successively in search of a match. If this value is `null`, the culture-specific information is obtained from the `CultureInfo.CurrentUICulture` property.

Exceptions:

- `ArgumentException`: The `index` array does not contain the type of arguments needed.

-or-

The property's `set` accessor is not found.

-or-

`value` cannot be converted to the type of `PropertyInfo.PropertyType`.
- `TargetException`: The object does not match the target type, or a property is an instance property but `obj` is `null`.
- `TargetParameterCountException`: The number of parameters in `index` does not match the number of parameters the indexed property takes.
- `MethodAccessException`: There was an illegal attempt to access a private or protected method inside a class.
- `TargetInvocationException`: An error occurred while setting the property value. For example, an index value specified for an indexed property is out of range. The `Exception.InnerException` property indicates the reason for the error.

#### Remarks
If this `PropertyInfo` object is a value type and `value` is `null`, then the property will be set to the default value for that type.

To determine whether a property is indexed, use the `PropertyInfo.GetIndexParameters` method. If the resulting array has 0 (zero) elements, the property is not indexed.

Access restrictions are ignored for fully trusted code. That is, private constructors, methods, fields, and properties can be accessed and invoked via Reflection whenever the code is fully trusted.

To use the `SetValue` method, first get the class `Type`. From the `Type`, get the `PropertyInfo`. From the `PropertyInfo`, use the `SetValue` method.

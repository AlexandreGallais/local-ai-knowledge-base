---
title: "FieldInfo class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/FieldInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FieldInfo class (part 3 of 3)

## FieldInfo.GetValue(Object) method

```csharp
public abstract object? GetValue (object? obj);
```

When overridden in a derived class, returns the value of a field supported by a given object.

Parameters:

- `obj`: The object whose field value will be returned.

Returns: An object containing the value of the field reflected by this instance.

Exceptions:

- `TargetException`: The field is non-static and `obj` is `null`.
- `NotSupportedException`: A field is marked literal, but the field does not have one of the accepted literal types.
- `FieldAccessException`: The caller does not have permission to access this field.
- `ArgumentException`: The method is neither declared nor inherited by the class of `obj`.

#### Remarks
If the field is static, `obj` is ignored. For non-static fields, `obj` should be an instance of a class that inherits or declares the field. Note that the return type of `GetValue` is `Object`. For example, if the field holds a Boolean primitive value, an instance of `Object` with the appropriate Boolean value is returned. Before returning the value, `GetValue` checks to see if the user has access permission.

> **Note:**
>  Access restrictions are ignored for fully trusted code. That is, private constructors, methods, fields, and properties can be accessed and invoked through reflection whenever the code is fully trusted.

> **Note:**
#### Examples
The following example uses the `FieldInfo.GetValue` method to retrieve the value of a static field. Note that the value of the `obj` argument is `null`.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldInfo/GetValue/getfldval.cs._

The following example retrieves an array of `FieldInfo` objects that represents the fields of the `FieldsClass` type, and then calls the `FieldInfo.GetValue` to display the value of each field for the `fieldsInst` object.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldInfo/GetValue/fieldinfo_getvalue.cs._

## FieldInfo.GetValueDirect(TypedReference) method

```csharp
public virtual object? GetValueDirect (TypedReference obj);
```

Returns the value of a field supported by a given object.

Parameters:

- `obj`: A `TypedReference` structure that encapsulates a managed pointer to a location and a runtime representation of the type that might be stored at that location.

Returns: An `Object` containing a field value.

Exceptions:

- `NotSupportedException`: The caller requires the Common Language Specification (CLS) alternative, but called this method instead.

To be added.

## FieldInfo.op_Equality(FieldInfo, FieldInfo) method

```csharp
public static bool operator == (System.Reflection.FieldInfo? left, System.Reflection.FieldInfo? right);
```

Indicates whether two `FieldInfo` objects are equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

To be added.

## FieldInfo.op_Inequality(FieldInfo, FieldInfo) method

```csharp
public static bool operator != (System.Reflection.FieldInfo? left, System.Reflection.FieldInfo? right);
```

Indicates whether two `FieldInfo` objects are not equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` is not equal to `right`; otherwise, `false`.

To be added.

## FieldInfo.SetValue(Object, Object) method

```csharp
public void SetValue (object? obj, object? value);
```

Sets the value of the field supported by the given object.

Parameters:

- `obj`: The object whose field value will be set.
- `value`: The value to assign to the field.

Exceptions:

- `FieldAccessException`: The caller does not have permission to access this field.
- `TargetException`: The `obj` parameter is `null` and the field is an instance field.
- `ArgumentException`: The field does not exist on the object.

-or-

The `value` parameter cannot be converted and stored in the field.

#### Remarks
This method will assign `value` to the field reflected by this instance on object `obj`. If the field is static, `obj` will be ignored. For non-static fields, `obj` should be an instance of a class that inherits or declares the field. The new value is passed as an `Object`. For example, if the field's type is Boolean, an instance of `Object` with the appropriate Boolean value is passed. Before setting the value, `SetValue` checks to see if the user has access permission. This final method is a convenience method for calling the following `SetValue` method.

This method cannot be used to set values of static, init-only (`readonly` in C#) fields reliably. In .NET versions, an exception is thrown if you attempt to set a value on a static, init-only field.

> **Note:**
> Fully trusted code has the permissions that are needed to access and invoke private constructors, methods, fields, and properties using reflection.

> **Note:**
> This method can be used to access non-public members if the caller has been granted `ReflectionPermission` with the `RestrictedMemberAccess` flag and if the grant set of the non-public members is restricted to the caller's grant set, or a subset thereof. (See Security Considerations for Reflection.)

#### Examples
The following example sets the value of a field, gets and displays the value, modifies the field, and displays the result.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldInfo/SetValue/fieldinfo_setvalue.cs._

## FieldInfo.SetValue(Object, Object, BindingFlags, Binder, CultureInfo) method

```csharp
public abstract void SetValue (object? obj, object? value, System.Reflection.BindingFlags invokeAttr, System.Reflection.Binder? binder, System.Globalization.CultureInfo? culture);
```

When overridden in a derived class, sets the value of the field supported by the given object.

Parameters:

- `obj`: The object whose field value will be set.
- `value`: The value to assign to the field.
- `invokeAttr`: A field of `Binder` that specifies the type of binding that is desired (for example, `Binder.CreateInstance` or `Binder.ExactBinding`).
- `binder`: A set of properties that enables the binding, coercion of argument types, and invocation of members through reflection. If `binder` is `null`, then `Binder.DefaultBinding` is used.
- `culture`: The software preferences of a particular culture.

Exceptions:

- `FieldAccessException`: The caller does not have permission to access this field.
- `TargetException`: The `obj` parameter is `null` and the field is an instance field.
- `ArgumentException`: The field does not exist on the object.

-or-

The `value` parameter cannot be converted and stored in the field.

#### Remarks
This method will assign `value` to the field reflected by this instance on `obj`. If the field is static, `obj` will be ignored. For non-static fields, `obj` should be an instance of a class that inherits or declares the field. The new value is passed as an `Object`. For example, if the field's type is `Boolean`, an instance of `Object` with the appropriate Boolean value is passed. Before setting the value, `SetValue` checks to see if the user has access permission.

This method cannot be used to set values of static, init-only (`readonly` in C#) fields reliably. In .NET, an exception is thrown if you attempt to set a value on a static, init-only field.

> **Note:**
> Fully trusted code has the permissions that are needed to access and invoke private constructors, methods, fields, and properties using reflection.

> **Note:**
> This method can be used to access non-public members if the caller has been granted `ReflectionPermission` with the `RestrictedMemberAccess` flag and if the grant set of the non-public members is restricted to the caller's grant set, or a subset thereof. (See Security Considerations for Reflection.)

## FieldInfo.SetValueDirect(TypedReference, Object) method

```csharp
public virtual void SetValueDirect (TypedReference obj, object value);
```

Sets the value of the field supported by the given object.

Parameters:

- `obj`: A `TypedReference` structure that encapsulates a managed pointer to a location and a runtime representation of the type that can be stored at that location.
- `value`: The value to assign to the field.

Exceptions:

- `NotSupportedException`: The caller requires the Common Language Specification (CLS) alternative, but called this method instead.

#### Remarks

> **Note:**
> This method can be used to access non-public members if the caller has been granted `ReflectionPermission` with the `RestrictedMemberAccess` flag and if the grant set of the non-public members is restricted to the caller's grant set, or a subset thereof. (See Security Considerations for Reflection.)

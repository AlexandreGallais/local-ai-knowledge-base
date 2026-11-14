---
title: "ComAwareEventInfo class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ComAwareEventInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComAwareEventInfo class

Namespace: `System.Runtime.InteropServices`

```csharp
public class ComAwareEventInfo : System.Reflection.EventInfo
```

Permits late-bound registration of an event handler.

#### Remarks
Normally, compilers will automatically embed calls to the `AddEventHandler` and `RemoveEventHandler` methods instead of using regular add handler and remove handler methods for events. This occurs if the interface that the corresponding event is defined on needs to be embedded.

You can specify this by embedding the entire assembly that contains the interface by using the **/link** option on the compilers or by setting the **Embed Interop Types** property to `True` in Visual Studio.

The `ComAwareEventInfo` type derives from the `EventInfo` class and overrides the `AddEventHandler` and `RemoveEventHandler` methods.

## ComAwareEventInfo.ComAwareEventInfo(Type, String) constructor

```csharp
public ComAwareEventInfo (Type type, string eventName);
```

Initializes a new instance of the `ComAwareEventInfo` class by using the specified type and a name of the event on the type.

Parameters:

- `type`: The type of object.
- `eventName`: The name of an event on `type`.

To be added.

## ComAwareEventInfo.Attributes property

```csharp
public override System.Reflection.EventAttributes Attributes { get; }
```

Gets the attributes for this event.

Returns: The read-only attributes for this event.

#### Remarks
The attributes are returned in a 4-byte integer, which represents a bitmap of the attributes set for the event that is reflected by this instance.

## ComAwareEventInfo.DeclaringType property

```csharp
public override Type? DeclaringType { get; }
```

Gets the class that declares this member.

Returns: The `Type` object for the class that declares this member.

To be added.

## ComAwareEventInfo.MetadataToken <example-value>

```csharp
public override int MetadataToken { get; }
```

Gets the metadata token <example-value> with the current `ComAwareEventInfo` object.

Returns: A 32-bit Integer that represents the metadata token.

To be added.

## ComAwareEventInfo.Module property

```csharp
public override System.Reflection.Module Module { get; }
```

Gets the module associated with the current `ComAwareEventInfo` object.

Returns: The module associated with the current `ComAwareEventInfo` object.

To be added.

## ComAwareEventInfo.Name property

```csharp
public override string Name { get; }
```

Gets the name of the current member.

Returns: The name of this member.

To be added.

## ComAwareEventInfo.ReflectedType property

```csharp
public override Type? ReflectedType { get; }
```

Gets the class object that was used to initialize this instance.

Returns: The `Type` object that was used to initialize the current object.

To be added.

## ComAwareEventInfo.AddEventHandler(Object, Delegate) method

```csharp
public override void AddEventHandler (object target, Delegate handler);
```

Attaches an event handler to a COM object.

Parameters:

- `target`: The target object that the event delegate should bind to.
- `handler`: The event delegate.

#### Remarks
This method is similar to the `AddEventHandler` method except that it allows you to attach events to COM objects.

If `target` is a COM object, this method adds a delegate to an event by using the `Combine` method.

`ComAwareEventInfo.AddEventHandler` facilitates registering COM event sinks that forward calls to corresponding managed delegates. It requires the following information:

- The target object itself (`target`).

- The GUID of the source interface.

- The DispID of the method on the COM interface that corresponds to the specified event.

- The delegate that would be invoked when the COM object triggers the corresponding event (`handler`).

`ComAwareEventInfo.AddEventHandler` looks up the corresponding COM source interface (specified as the first parameter of the `%23ctor` constructor). It then looks up a method on the source interface whose name is identical to the event name. The value of `GuidAttribute` on the source interface is the GUID that is passed to `Combine`; the value of `DispIDAttribute` on the method is the DispID value that is passed to `Combine`.

## ComAwareEventInfo.GetAddMethod(Boolean) method

```csharp
public override System.Reflection.MethodInfo? GetAddMethod (bool nonPublic);
```

Gets the method that was used to add an event handler delegate to the event source.

Parameters:

- `nonPublic`: `true` to return non-public methods; otherwise, `false`.

Returns: The method that was used to add an event handler delegate to the event source.

Exceptions:

- `MethodAccessException`: `nonPublic` is `true` and the method used to add an event handler delegate is non-public, but the caller does not have permission to reflect on non-public methods.

#### Remarks
This method calls the `EventInfo.GetAddMethod` method.

## ComAwareEventInfo.GetCustomAttributes(Boolean) method

```csharp
public override object[] GetCustomAttributes (bool inherit);
```

When overridden in a derived class, gets an array that contains all the custom attributes that are applied to this member.

Parameters:

- `inherit`: `true` to search this member's inheritance chain to find the attributes; otherwise, `false`.

Returns: An array that contains all the custom attributes, or an array that has no elements if no attributes were defined.

Exceptions:

- `InvalidOperationException`: This member belongs to a type that is loaded into the reflection-only context. See How to: Load Assemblies into the Reflection-Only Context.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
This method calls the `MemberInfo.GetCustomAttributes` method of the underlying `EventInfo` object.

## ComAwareEventInfo.GetCustomAttributes(Type, Boolean) method

```csharp
public override object[] GetCustomAttributes (Type attributeType, bool inherit);
```

When overridden in a derived class, gets an array that contains all the custom attributes of the specified type that are applied to this member.

Parameters:

- `attributeType`: The attribute type to search for. Only attributes that are assignable to this type can be returned.
- `inherit`: `true` to search this member's inheritance chain to find the attributes; otherwise, `false`.

Returns: An array that contains all the custom attributes of the specified type, or an array that has no elements if no attributes were defined.

Exceptions:

- `ArgumentNullException`: `attributeType` is `null`.
- `InvalidOperationException`: This member belongs to a type that is loaded into the reflection-only context. See How to: Load Assemblies into the Reflection-Only Context
- `TypeLoadException`: A custom attribute type cannot be loaded.

To be added.

## ComAwareEventInfo.GetCustomAttributesData() method

```csharp
public override System.Collections.Generic.IList<System.Reflection.CustomAttributeData> GetCustomAttributesData ();
```

Returns a list of `CustomAttributeData` objects for the current `ComAwareEventInfo`.

Returns: A generic list of `CustomAttributeData` objects representing data about the attributes that have been applied to the current `ComAwareEventInfo`.

To be added.

## ComAwareEventInfo.GetOtherMethods(Boolean) method

```csharp
public override System.Reflection.MethodInfo[] GetOtherMethods (bool nonPublic);
```

Returns the public or non-public methods that have been associated with an event in metadata.

Parameters:

- `nonPublic`: `true` to include non-public methods; otherwise, `false`.

Returns: An array representing the methods that have been associated with the event in metadata. If there are no such methods, an empty array is returned.

To be added.

## ComAwareEventInfo.GetRaiseMethod(Boolean) method

```csharp
public override System.Reflection.MethodInfo? GetRaiseMethod (bool nonPublic);
```

When overridden in a derived class, returns the method that was called when the event was raised.

Parameters:

- `nonPublic`: `true` to return non-public methods; otherwise, `false`.

Returns: The object that was called when the event was raised.

Exceptions:

- `MethodAccessException`: `nonPublic` is `true` and the method used to add an event handler delegate is non-public, but the caller does not have permission to reflect on non-public methods.

#### Remarks
This method returns `null` for events that are declared with the C# `event` keyword or the Visual Basic `Event` keyword. This is because the C# and Visual Basic <example-value> do not generate such a method.

## ComAwareEventInfo.GetRemoveMethod(Boolean) method

```csharp
public override System.Reflection.MethodInfo? GetRemoveMethod (bool nonPublic);
```

When overridden in a derived class, retrieves the `MethodInfo` object for removing a method of the event.

Parameters:

- `nonPublic`: `true` to return non-public methods; otherwise, `false`.

Returns: The method that was used to remove an event handler delegate from the event source.

Exceptions:

- `MethodAccessException`: `nonPublic` is `true` and the method used to add an event handler delegate is non-public, but the caller does not have permission to reflect on non-public methods.

To be added.

## ComAwareEventInfo.IsDefined(Type, Boolean) method

```csharp
public override bool IsDefined (Type attributeType, bool inherit);
```

Indicates whether one or more instances of the specified attribute are applied to this member.

Parameters:

- `attributeType`: The attribute type to search for.
- `inherit`: `true` to search this member's inheritance chain to find the attributes; otherwise, `false`.

Returns: `true` if the specified attribute has been applied to this member; otherwise, `false`.

To be added.

## ComAwareEventInfo.RemoveEventHandler(Object, Delegate) method

```csharp
public override void RemoveEventHandler (object target, Delegate handler);
```

Detaches an event handler from a COM object.

Parameters:

- `target`: The target object that the event delegate is bound to.
- `handler`: The event delegate.

Exceptions:

- `InvalidOperationException`: The event does not have a public `remove` accessor.
- `ArgumentException`: The handler that was passed in cannot be used.
- `TargetException`: The `target` parameter is `null` and the event is not static.

-or-

The `EventInfo` is not declared on the target.
- `MethodAccessException`: The caller does not have access permission to the member.

#### Remarks
This method is similar to the `RemoveEventHandler` method, except that it allows you to detach events from COM objects.

If `target` is a COM object, this method releases a delegate to an event by using the `Remove` method.

`ComAwareEventInfo.RemoveEventHandler` facilitates unregistering COM event sinks that forward calls to corresponding managed delegates. It requires the following information:

- The target object itself (`target`).

- The GUID of the source interface.

- The DispID of the method on the COM interface that corresponds to the specified event.

- The delegate that would be invoked when the COM object triggers the corresponding event (`handler`).

`ComAwareEventInfo.RemoveEventHandler` looks up the corresponding COM source interface (specified as the first parameter of the `%23ctor` constructor). It then it looks up a method on the source interface whose name is identical to the event name. The value of `GuidAttribute` on the source interface is the GUID that is passed to `Remove`; the value of `DispIDAttribute` on the method is the DispID value that is passed to `Remove`.

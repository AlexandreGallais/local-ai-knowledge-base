---
title: "EventInfo class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/EventInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventInfo class

Namespace: `System.Reflection`

```csharp
public abstract class EventInfo : System.Reflection.MemberInfo
```

Discovers the attributes of an event and provides access to event metadata.

#### Remarks
Use the `EventInfo` class to inspect events and to hook up event handlers, as shown in the example code for the `EventInfo.AddEventHandler` method.

> **Note:**
>  `EventInfo` is not intended to be used to raise events. An object raises events as dictated by its internal state.

Events are used with delegates. An event listener instantiates an event-handler delegate that is invoked whenever the event is raised by an event source. In order to connect to the event source, the event listener adds this delegate to the invocation list on the source. When the event is raised, the invoke method of the event-handler delegate is called. Both multicast and single-cast event notifications are supported. The `Add` and `Remove` methods, as well as the event-handler delegate class associated with an event, must be marked in the metadata.

Delegates are object-oriented function pointers. In C or C++, a function pointer is a reference to a method. In contrast to the C or C++ function pointer, a delegate contains two references: a reference to a method and a reference to an object that supports the method. Delegates can invoke a method without knowing the class type that declares or inherits the method. Delegates need only know the return type and parameter list of the method.

The event model works equally well for single-cast and multicast delegates. When the delegate's invoke method is called, only a single object will have a method called on it. A multicast modifier can be applied to a delegate declaration, which allows multiple methods to be called when the invoke method of the delegate is called.

Calling `ICustomAttributeProvider.GetCustomAttributes` on `EventInfo` when the `inherit` parameter of `GetCustomAttributes` is `true` does not walk the type hierarchy. Use `Attribute` to inherit custom attributes.

#### Examples
The following code gets an `EventInfo` object for the `Click` event of the `Button` class.

_Code sample not included: ~/snippets/csharp/System/Type/GetEvent/type_getevent1.cs._

## EventInfo.EventInfo() constructor

```csharp
protected EventInfo ();
```

Initializes a new instance of the `EventInfo` class.

To be added.

## EventInfo.AddMethod property

```csharp
public virtual System.Reflection.MethodInfo? AddMethod { get; }
```

Gets the `MethodInfo` object for the `EventInfo.AddEventHandler` method of the event, including non-public methods.

Returns: The `MethodInfo` object for the `EventInfo.AddEventHandler` method.

#### Remarks
This property is the equivalent of calling the `EventInfo.GetAddMethod` with a value of `true`.

## EventInfo.Attributes property

```csharp
public abstract System.Reflection.EventAttributes Attributes { get; }
```

Gets the attributes for this event.

Returns: The read-only attributes for this event.

#### Remarks
The attributes are returned in a 4-byte integer representing a bitmap of the attributes set for the event reflected by this instance.

## EventInfo.EventHandlerType property

```csharp
public virtual Type? EventHandlerType { get; }
```

Gets the `Type` object of the underlying event-handler delegate associated with this event.

Returns: A read-only `Type` object representing the delegate event handler.

Exceptions:

- `SecurityException`: The caller does not have the required permission.

#### Examples
The following example uses the `EventHandlerType` property to discover the delegate type of an event and to display its parameter types.

The example defines a delegate named `MyDelegate` and an event named `ev` of type `MyDelegate`. The code in the `Main` method discovers the event signature by getting the delegate type of the event, getting the `Invoke` method of the delegate type, and then retrieving and displaying the parameters.

_Code sample not included: ~/snippets/csharp/System.Reflection/EventInfo/EventHandlerType/eventarg.cs._

## EventInfo.IsMulticast property

```csharp
public virtual bool IsMulticast { get; }
```

Gets a value indicating whether the event is multicast.

Returns: `true` if the delegate is an instance of a multicast delegate; otherwise, `false`.

Exceptions:

- `SecurityException`: The caller does not have the required permission.

To be added.

## EventInfo.IsSpecialName property

```csharp
public bool IsSpecialName { get; }
```

Gets a value indicating whether the `EventInfo` has a name with a special meaning.

Returns: `true` if this event has a special name; otherwise, `false`.

#### Remarks
This property determines whether the event's name has a special meaning. Names that begin with or contain an underscore character (_), property accessors, and operator overloading methods are examples of names that might require special treatment by some compilers.

## EventInfo.MemberType property

```csharp
public override System.Reflection.MemberTypes MemberType { get; }
```

Gets a `MemberTypes` value indicating that this member is an event.

Returns: A `MemberTypes` value indicating that this member is an event.

#### Remarks
This property overrides `MemberInfo.MemberType`. Therefore, when you examine a set of `MemberInfo` objects - for example, the array returned by `Type.GetMembers` - the `MemberType` property returns `Event` only when a given member is an event.

## EventInfo.RaiseMethod property

```csharp
public virtual System.Reflection.MethodInfo? RaiseMethod { get; }
```

Gets the method that is called when the event is raised, including non-public methods.

Returns: The method that is called when the event is raised.

#### Remarks
This property is the equivalent of calling the `EventInfo.GetRaiseMethod` with a value of `true`.

## EventInfo.RemoveMethod property

```csharp
public virtual System.Reflection.MethodInfo? RemoveMethod { get; }
```

Gets the `MethodInfo` object for removing a method of the event, including non-public methods.

Returns: The `MethodInfo` object for removing a method of the event.

#### Remarks
This property is the equivalent of calling the `EventInfo.GetRemoveMethod` with a value of `true`.

## EventInfo.AddEventHandler(Object, Delegate) method

```csharp
public virtual void AddEventHandler (object? target, Delegate? handler);
```

Adds an event handler to an event source.

Parameters:

- `target`: The event source.
- `handler`: Encapsulates a method or methods to be invoked when the event is raised by the target.

Exceptions:

- `InvalidOperationException`: The event does not have a public `add` accessor.
- `ArgumentException`: The handler that was passed in cannot be used.
- `MethodAccessException`: The caller does not have access permission to the member.
- `TargetException`: The `target` parameter is `null` and the event is not static.

-or-

The `EventInfo` is not declared on the target.

#### Remarks
This method attempts to add a delegate to synchronize the event on the target object.

Each time the event is raised by the target parameter, the method or methods encapsulated by the handler are invoked.

You might use the `AddEventHandler` method when you load a type after the program is already compiled, when it is not possible to use the C# += syntax or the Visual Basic `WithEvents` and `Handles` keywords to hook up the event.

#### Examples
The following example creates an instance of the `Timer` class, creates an event handler using a dynamic assembly, and hooks up the dynamic event handler. All actions are performed using late binding.

The `Timer` instance is stored in a variable of type `Object`, and all code that accesses the `Timer` does so late-bound. The example uses the `Type.GetEvent` method to get the `Elapsed` event, and the `EventHandlerType` property to get the delegate type for the event.

The example gets a `MethodInfo` for the `Invoke` method of the delegate type and obtains the signature of the delegate from the `MethodInfo` instance. The example then creates a dynamic assembly with one module containing a single type named `Handler` and gives the type a `static` method (`Shared` method in Visual Basic) named `DynamicHandler` that handles the event.

After the dynamic type is created, the example gets a `MethodInfo` for the finished method and uses it to create a delegate instance. This instance is passed to the `EventInfo.AddEventHandler` method to hook up the event. The program then pauses to allow the event to be raised.

_Code sample not included: ~/snippets/csharp/System.Reflection/EventInfo/AddEventHandler/source.cs._

## EventInfo.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance, or `null`.

Returns: `true` if `obj` equals the type and value of this instance; otherwise, `false`.

To be added.

## EventInfo.GetAddMethod() method

```csharp
public System.Reflection.MethodInfo? GetAddMethod ();
```

Returns the method used to add an event handler delegate to the event source.

Returns: A `MethodInfo` object representing the method used to add an event handler delegate to the event source.

#### Remarks
`GetAddMethod` initializes and adds the event subscribe method. The `AddEventHandler` method is used to add an event-handler delegate to the invocation list of an event source.

#### Examples
Typically, the method has the following signature:

```csharp
add_<EventName>(<EventHandlerType> handler)
```

## EventInfo.GetAddMethod(Boolean) method

```csharp
public abstract System.Reflection.MethodInfo? GetAddMethod (bool nonPublic);
```

When overridden in a derived class, retrieves the `MethodInfo` object for the `EventInfo.AddEventHandler` method of the event, specifying whether to return non-public methods.

Parameters:

- `nonPublic`: `true` if non-public methods can be returned; otherwise, `false`.

Returns: A `MethodInfo` object representing the method used to add an event handler delegate to the event source.

Exceptions:

- `MethodAccessException`: `nonPublic` is `true`, the method used to add an event handler delegate is non-public, and the caller does not have permission to reflect on non-public methods.

#### Remarks
The `GetAddMethod` initializes and adds the event subscribe method as a Boolean value. The `AddEventHandler` method is used to add an event-handler delegate to the invocation list of an event source.

#### Examples
Typically, the method has the following signature:

```csharp
add_<EventName>(<EventHandlerType> handler)
```

## EventInfo.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## EventInfo.GetOtherMethods() method

```csharp
public System.Reflection.MethodInfo[] GetOtherMethods ();
```

Returns the public methods that have been associated with an event in metadata using the `.other` directive.

Returns: An array representing the public methods that have been associated with the event in metadata by using the `.other` directive. If there are no such public methods, an empty array is returned.

#### Remarks
The metadata for an event can associate four kinds of methods with the event:

- The `.addon` directive specifies the method used to add event handlers. Use the `EventInfo.GetAddMethod` method to retrieve an `EventInfo` for that method.

- The `.removeon` directive specifies the method used to detach event handlers. Use the `EventInfo.GetRemoveMethod` method to retrieve an `EventInfo` for that method.

- The `.fire` directive specifies the method used to raise the event. Use the `EventInfo.GetRaiseMethod` method to retrieve an `EventInfo` for that method.

- The `.other` directive specifies any other methods associated with the event. Use the `EventInfo.GetOtherMethods` method to retrieve an array of `EventInfo` objects for those methods.

The methods associated with an event using the `.other` directive have no special significance to the runtime. The C# and Visual Basic <example-value> do not use the `.other` directive.

## EventInfo.GetOtherMethods(Boolean) method

```csharp
public virtual System.Reflection.MethodInfo[] GetOtherMethods (bool nonPublic);
```

Returns the methods that have been associated with the event in metadata using the `.other` directive, specifying whether to include non-public methods.

Parameters:

- `nonPublic`: `true` to include non-public methods; otherwise, `false`.

Returns: An array representing methods that have been associated with an event in metadata by using the `.other` directive. If there are no methods matching the specification, an empty array is returned.

Exceptions:

- `NotImplementedException`: This method is not implemented.

#### Remarks
The metadata for an event can associate four kinds of methods with the event:

- The `.addon` directive specifies the method used to add event handlers. Use the `EventInfo.GetAddMethod` method to retrieve an `EventInfo` for that method.

- The `.removeon` directive specifies the method used to detach event handlers. Use the `EventInfo.GetRemoveMethod` method to retrieve an `EventInfo` for this method.

- The `.fire` directive specifies the method used to raise the event. Use the `EventInfo.GetRaiseMethod` method to retrieve an `EventInfo` for this method.

- The `.other` directive specifies any other methods associated with the event. Use the `EventInfo.GetOtherMethods` method to retrieve an array of `EventInfo` objects for those methods.

The methods associated with an event using the `.other` directive have no special significance to the runtime. The C# and Visual Basic <example-value> do not use the `.other` directive.

## EventInfo.GetRaiseMethod() method

```csharp
public System.Reflection.MethodInfo? GetRaiseMethod ();
```

Returns the method that is called when the event is raised.

Returns: The method that is called when the event is raised.

#### Remarks
This method usually returns `null` for events declared with the C# `event` keyword or the Visual Basic `Event` keyword. This is because the C# and Visual Basic <example-value> do not generate such a method by default.

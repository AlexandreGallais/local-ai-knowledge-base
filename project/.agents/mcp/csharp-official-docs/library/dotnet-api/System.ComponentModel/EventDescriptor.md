---
title: "EventDescriptor class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/EventDescriptor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventDescriptor class

Namespace: `System.ComponentModel`

```csharp
public abstract class EventDescriptor : System.ComponentModel.MemberDescriptor
```

Provides information about an event.

#### Remarks
An `EventDescriptor` consists of a name, its attributes, the component that the event is bound to, the event delegate, the type of delegate, and whether the delegate is multicast.

`EventDescriptor` provides the following `abstract` properties and methods:

-   `EventDescriptor.ComponentType` contains the type of the component this event is declared on.

-   `EventDescriptor.EventType` contains the type of delegate for the event.

-   `EventDescriptor.IsMulticast` contains a value indicating whether the event delegate is a multicast delegate.

-   `EventDescriptor.AddEventHandler` binds the event to a component.

-   `EventDescriptor.RemoveEventHandler` unbinds the delegate from the component so that the delegate no longer receives events from the component.

For more information about events, see Handling and Raising Events. For more information about reflection, see Reflection.

#### Examples
The following code example is built upon the example in the `EventDescriptorCollection` class. It prints the information (category, description, and display name) of each event on a button in a text box. It requires that `button1` and `textbox1` have been instantiated on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EventDescriptor/Overview/eventdescriptor.cs._

## EventDescriptor.EventDescriptor(MemberDescriptor) constructor

```csharp
protected EventDescriptor (System.ComponentModel.MemberDescriptor descr);
```

Initializes a new instance of the `EventDescriptor` class with the name and attributes in the specified `MemberDescriptor`.

Parameters:

- `descr`: A `MemberDescriptor` that contains the name of the event and its attributes.

To be added.

## EventDescriptor.EventDescriptor(MemberDescriptor, Attribute[]) constructor

```csharp
protected EventDescriptor (System.ComponentModel.MemberDescriptor descr, Attribute[]? attrs);
```

Initializes a new instance of the `EventDescriptor` class with the name in the specified `MemberDescriptor` and the attributes in both the `MemberDescriptor` and the `Attribute` array.

Parameters:

- `descr`: A `MemberDescriptor` that has the name of the member and its attributes.
- `attrs`: An `Attribute` array with the attributes you want to add to this event description.

#### Remarks
This constructor appends the attributes in the `Attribute` array to the attributes in the `MemberDescriptor`.

## EventDescriptor.EventDescriptor(String, Attribute[]) constructor

```csharp
protected EventDescriptor (string name, Attribute[]? attrs);
```

Initializes a new instance of the `EventDescriptor` class with the specified name and attribute array.

Parameters:

- `name`: The name of the event.
- `attrs`: An array of type `Attribute` that contains the event attributes.

To be added.

## EventDescriptor.ComponentType property

```csharp
public abstract Type ComponentType { get; }
```

When overridden in a derived class, gets the type of component this event is bound to.

Returns: A `Type` that represents the type of component the event is bound to.

#### Remarks
Typically, this property is implemented through reflection.

## EventDescriptor.EventType property

```csharp
public abstract Type EventType { get; }
```

When overridden in a derived class, gets the type of delegate for the event.

Returns: A `Type` that represents the type of delegate for the event.

#### Remarks
Typically, this property is implemented through reflection.

## EventDescriptor.IsMulticast property

```csharp
public abstract bool IsMulticast { get; }
```

When overridden in a derived class, gets a value indicating whether the event delegate is a multicast delegate.

Returns: `true` if the event delegate is multicast; otherwise, `false`.

#### Remarks
Typically, this property is implemented through reflection.

A multicast delegate differs from a regular delegate in that it can contain references to more than just one method. Methods in a multicast delegate are executed synchronously when the delegate is invoked, in the order in which they appear. If one of the called methods raises an exception, then the delegate ceases and the exception is propagated to the delegate caller.

## EventDescriptor.AddEventHandler(Object, Delegate) method

```csharp
public abstract void AddEventHandler (object component, Delegate value);
```

When overridden in a derived class, binds the event to the component.

Parameters:

- `component`: A component that provides events to the delegate.
- `value`: A delegate that represents the method that handles the event.

#### Remarks
Typically, this method is implemented through reflection. For more information about reflection, see Reflection.

For more information about delegates, see Handling and Raising Events.

## EventDescriptor.RemoveEventHandler(Object, Delegate) method

```csharp
public abstract void RemoveEventHandler (object component, Delegate value);
```

When overridden in a derived class, unbinds the delegate from the component so that the delegate will no longer receive events from the component.

Parameters:

- `component`: The component that the delegate is bound to.
- `value`: The delegate to unbind from the component.

#### Remarks
Typically, this method is implemented through reflection. For more information, see Reflection.

For more information about delegates, see Handling and Raising Events.

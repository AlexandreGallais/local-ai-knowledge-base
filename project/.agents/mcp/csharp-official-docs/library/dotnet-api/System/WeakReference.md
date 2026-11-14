---
title: "WeakReference class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/WeakReference.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WeakReference class

Namespace: `System`

```csharp
public class WeakReference : System.Runtime.Serialization.ISerializable
```

Represents a weak reference, which references an object while still allowing that object to be reclaimed by garbage collection.

#### Remarks
A weak reference allows the garbage collector to collect an object while still allowing an application to access the object. If you need the object, you can still obtain a strong reference to it and prevent it from being collected. For more information about how to use short and long weak references, see Weak References.

#### Examples
The following example demonstrates how you can use weak references to maintain a cache of objects as a resource for an application. The cache is constructed using an `IDictionary<T1,T2>` of `WeakReference` objects keyed by an index value. The `Target` property for the `WeakReference` objects is an object in a byte array that represents data.

The example randomly accesses objects in the cache. If an object is reclaimed for garbage collection, a new data object is regenerated; otherwise, the object is available to access because of the weak reference.

_Code sample not included: ~/snippets/csharp/System/WeakReference/Overview/program.cs._

## WeakReference.WeakReference(Object) constructor

```csharp
public WeakReference (object? target);
```

Initializes a new instance of the `WeakReference` class, referencing the specified object.

Parameters:

- `target`: The object to track or `null`.

#### Remarks
This constructor creates a short weak reference to `target`.

## WeakReference.WeakReference(Object, Boolean) constructor

```csharp
public WeakReference (object? target, bool trackResurrection);
```

Initializes a new instance of the `WeakReference` class, referencing the specified object and using the specified resurrection tracking.

Parameters:

- `target`: An object to track.
- `trackResurrection`: Indicates when to stop tracking the object. If `true`, the object is tracked after finalization; if `false`, the object is only tracked until finalization.

#### Remarks
If `trackResurrection` is `false`, a short weak reference is created. If `trackResurrection` is `true`, a long weak reference is created.

#### Examples
The following example creates a cache of data objects with short weak references. This example is part of a larger example provided for the `WeakReference` class.

_Code sample not included: ~/snippets/csharp/System/WeakReference/Overview/program.cs._

## WeakReference.WeakReference(SerializationInfo, StreamingContext) constructor

```csharp
protected WeakReference (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `WeakReference` class, using deserialized data from the specified serialization and stream objects.

Parameters:

- `info`: An object that holds all the data needed to serialize or deserialize the current `WeakReference` object.
- `context`: (Reserved) Describes the source and destination of the serialized stream specified by `info`.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## WeakReference.IsAlive property

```csharp
public virtual bool IsAlive { get; }
```

Gets an indication whether the object referenced by the current `WeakReference` object has been garbage collected.

Returns: `true` if the object referenced by the current `WeakReference` object has not been garbage collected and is still accessible; otherwise, `false`.

#### Remarks
Because an object could potentially be reclaimed for garbage collection immediately after the `IsAlive` property returns `true`, using this property is not recommended unless you are testing only for a `false` return value.

## WeakReference.Target property

```csharp
public virtual object? Target { get; set; }
```

Gets or sets the object (the target) referenced by the current `WeakReference` object.

Returns: `null` if the object referenced by the current `WeakReference` object has been garbage collected; otherwise, a reference to the object referenced by the current `WeakReference` object.

Exceptions:

- `InvalidOperationException`: The reference to the target object is invalid. This exception can be thrown while setting this property if the value is a null reference or if the object has been finalized during the set operation.

#### Remarks
After setting this property to the target object, make sure that there are no other strong references to the object; otherwise, it will not be collected.

#### Examples
The following example tries to obtain an object from a cache of objects with weak references. If the object was reclaimed for garbage collection, a new object is generated. This example is part of a larger example provided for the `WeakReference` class.

_Code sample not included: ~/snippets/csharp/System/WeakReference/Overview/program.cs._

## WeakReference.TrackResurrection property

```csharp
public virtual bool TrackResurrection { get; }
```

Gets an indication whether the object referenced by the current `WeakReference` object is tracked after it is finalized.

Returns: `true` if the object the current `WeakReference` object refers to is tracked after finalization; or `false` if the object is only tracked until finalization.

#### Remarks
If `true`, the weak reference is a long weak reference and `true` was specified for the `trackResurrection` parameter in the `WeakReference` constructor.

## WeakReference.Finalize() method

```csharp
~WeakReference ();
```

Discards the reference to the target represented by the current `WeakReference` object.

To be added.

## WeakReference.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public virtual void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` object with all the data needed to serialize the current `WeakReference` object.

Parameters:

- `info`: An object that holds all the data needed to serialize or deserialize the current `WeakReference` object.
- `context`: (Reserved) The location where serialized data is stored and retrieved.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

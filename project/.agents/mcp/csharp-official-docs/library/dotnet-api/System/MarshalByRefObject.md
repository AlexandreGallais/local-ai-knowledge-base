---
title: "MarshalByRefObject class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MarshalByRefObject.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MarshalByRefObject class

Namespace: `System`

```csharp
public abstract class MarshalByRefObject
```

Enables access to objects across application domain boundaries in applications that support remoting.

#### Remarks
An application domain is a partition in an operating system process where one or more applications reside. Objects in the same application domain communicate directly. Objects in different application domains communicate either by transporting copies of objects across application domain boundaries, or by using a proxy to exchange messages.

`MarshalByRefObject` is the base class for objects that communicate across application domain boundaries by exchanging messages using a proxy. Objects that do not inherit from `MarshalByRefObject` are implicitly marshal by value. When a remote application references a marshal by value object, a copy of the object is passed across application domain boundaries.

`MarshalByRefObject` objects are accessed directly within the boundaries of the local application domain. The first time an application in a remote application domain accesses a `MarshalByRefObject`, a proxy is passed to the remote application. Subsequent calls on the proxy are marshaled back to the object residing in the local application domain.

Types must inherit from `MarshalByRefObject` when the type is used across application domain boundaries, and the state of the object must not be copied because the members of the object are not usable outside the application domain where they were created.

When you derive an object from `MarshalByRefObject` for use across application domain boundaries, you should not override any of its members, nor should you call its methods directly. The runtime recognizes that classes derived from  `MarshalByRefObject` should be marshaled across app domain boundaries.

## MarshalByRefObject.MarshalByRefObject() constructor

```csharp
protected MarshalByRefObject ();
```

Initializes a new instance of the `MarshalByRefObject` class.

To be added.

## MarshalByRefObject.GetLifetimeService() method

```csharp
public object GetLifetimeService ();
```

Retrieves the current lifetime service object that controls the lifetime policy for this instance.

Returns: An object of type `ILease` used to control the lifetime policy for this instance.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

#### Remarks

This method is obsolete.

## MarshalByRefObject.InitializeLifetimeService() method

```csharp
public virtual object InitializeLifetimeService ();
```

Obtains a lifetime service object to control the lifetime policy for this instance.

Returns: An object of type `ILease` used to control the lifetime policy for this instance. This is the current lifetime service object for this instance if one exists; otherwise, a new lifetime service object initialized to the value of the `LifetimeServices.LeaseManagerPollTime` property.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

#### Remarks

This method is obsolete.

## MarshalByRefObject.MemberwiseClone(Boolean) method

```csharp
protected MarshalByRefObject MemberwiseClone (bool cloneIdentity);
```

Creates a shallow copy of the current `MarshalByRefObject` object.

Parameters:

- `cloneIdentity`: `false` to delete the current `MarshalByRefObject` object's identity, which will cause the object to be assigned a new identity when it is marshaled across a remoting boundary. A value of `false` is usually appropriate. `true` to copy the current `MarshalByRefObject` object's identity to its clone, which will cause remoting client calls to be routed to the remote server object.

Returns: A shallow copy of the current `MarshalByRefObject` object.

#### Remarks
The `MemberwiseClone` method creates a shallow copy by creating a new `MarshalByRefObject` object, and then copying the nonstatic fields of the current `MarshalByRefObject` object to the new object. If a field is a value type, a bit-by-bit copy of the field is performed. If a field is a reference type, the reference is copied but the referred object is not; therefore, the original object and its clone refer to the same object.

For example, consider a `MarshalByRefObject` object called X that references objects A and B. Object B, in turn, references object C. A shallow copy of X creates new object X2 that also references objects A and B. In contrast, a deep copy of X creates a new object X2 that references the new objects A2 and B2, which are copies of A and B. B2, in turn, references the new object C2, which is a copy C. Use a class that implements the `ICloneable` interface to perform a deep or shallow copy of an object.

The identity of a `MarshalByRefObject` object is defined as the remote server object that is the target of a remoting client call. By default, the memberwise clone of a `MarshalByRefObject` object has the same identity as the original object, which is typically not the correct behavior for clones of server-side objects that are marshaled across a remoting boundary to the client side. Specify `false`, which is usually appropriate, to delete the identity of the clone and cause a new identity to be assigned when the clone is marshaled across a remoting boundary, or `true` to cause the clone to retain the identity of the original `MarshalByRefObject` object. The `MemberwiseClone` method is intended to be used by developers implementing remote server objects.

---
title: "ApartmentState enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ApartmentState.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ApartmentState enum

Namespace: `System.Threading`

```csharp
public enum ApartmentState
```

Specifies the apartment state of a `Thread`.

#### Remarks
An apartment is a logical container within a process for objects sharing the same thread-access requirements. All objects in the same apartment can receive calls from any thread in the apartment. .NET does not use apartments, and managed objects are responsible for using all shared resources in a thread-safe manner themselves.

Because COM classes use apartments, the common language runtime needs to create and initialize an apartment when calling a COM object in a COM interop situation. A managed thread can create and enter a single-threaded apartment (STA) that allows only one thread, or a multithreaded apartment (MTA) that contains one or more threads. You can control the type of apartment created by setting the `ApartmentState` property of the thread to one of the values of the `ApartmentState` enumeration. Because a given thread can only initialize a COM apartment once, you cannot change the apartment type after the first call to the unmanaged code.

#### Examples
The following code example demonstrates how to set the apartment state of a thread.

_Code sample not included: ~/snippets/csharp/System.Threading/ApartmentState/Overview/source.cs._

## ApartmentState.MTA field

```csharp
MTA
```

The `Thread` will create and enter a multithreaded apartment.

## ApartmentState.STA field

```csharp
STA
```

The `Thread` will create and enter a single-threaded apartment.

## ApartmentState.Unknown field

```csharp
Unknown
```

The `Thread.ApartmentState` property has not been set.

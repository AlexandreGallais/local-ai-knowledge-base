---
title: "DeriveBytes class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/DeriveBytes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DeriveBytes class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class DeriveBytes : IDisposable
```

Represents the abstract base class from which all classes that derive byte sequences of a specified length inherit.

To be added.

## DeriveBytes.DeriveBytes() constructor

```csharp
protected DeriveBytes ();
```

Initializes a new instance of the `DeriveBytes` class.

To be added.

## DeriveBytes.Dispose() method

```csharp
public void Dispose ();
```

When overridden in a derived class, releases all resources used by the current instance of the `DeriveBytes` class.

#### Remarks
Call `Dispose` when you are finished using the `DeriveBytes`. The `Dispose` method leaves the `DeriveBytes` in an unusable state. After calling `Dispose`, you must release all references to the `DeriveBytes` so the garbage collector can reclaim the memory that the `DeriveBytes` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `Dispose` before you release your last reference to the `DeriveBytes`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `DeriveBytes` object's `Finalize` method.

## DeriveBytes.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

When overridden in a derived class, releases the unmanaged resources used by the `DeriveBytes` class and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `DeriveBytes` references. This method invokes the `Dispose()` method of each referenced object.

## DeriveBytes.GetBytes(Int32) method

```csharp
public abstract byte[] GetBytes (int cb);
```

When overridden in a derived class, returns pseudo-random key bytes.

Parameters:

- `cb`: The number of pseudo-random key bytes to generate.

Returns: A byte array filled with pseudo-random key bytes.

To be added.

## DeriveBytes.Reset() method

```csharp
public abstract void Reset ();
```

When overridden in a derived class, resets the state of the operation.

To be added.

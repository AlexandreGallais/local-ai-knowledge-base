---
title: "OSPlatform struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/OSPlatform.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OSPlatform struct

Namespace: `System.Runtime.InteropServices`

```csharp
public readonly struct OSPlatform : IEquatable<System.Runtime.InteropServices.OSPlatform>
```

Represents an operating system platform.

To be added.

## OSPlatform.FreeBSD property

```csharp
public static System.Runtime.InteropServices.OSPlatform FreeBSD { get; }
```

Gets an object that represents the FreeBSD operating system.

Returns: An object that represents the FreeBSD operating system.

To be added.

## OSPlatform.Linux property

```csharp
public static System.Runtime.InteropServices.OSPlatform Linux { get; }
```

Gets an object that represents the Linux operating system.

Returns: An object that represents the Linux operating system.

To be added.

## OSPlatform.OSX property

```csharp
public static System.Runtime.InteropServices.OSPlatform OSX { get; }
```

Gets an object that represents the OSX operating system.

Returns: An object that represents the OSX operating system.

To be added.

## OSPlatform.Windows property

```csharp
public static System.Runtime.InteropServices.OSPlatform Windows { get; }
```

Gets an object that represents the Windows operating system.

Returns: An object that represents the Windows operating system.

To be added.

## OSPlatform.Create(String) method

```csharp
public static System.Runtime.InteropServices.OSPlatform Create (string osPlatform);
```

Creates a new `OSPlatform` instance.

Parameters:

- `osPlatform`: The name of the platform that this instance represents.

Returns: An object that represents the `osPlatform` operating system.

Exceptions:

- `ArgumentException`: `osPlatform` is an empty string.
- `ArgumentNullException`: `osPlatform` is `null`.

#### Remarks
Calling the `OSPlatform.Create` method with the following strings is equivalent to retrieving the `OSPlatform` object from the corresponding static property:

|osPlatform string|OSPlatform property|
|-----------------------|-------------------------|
|"FREEBSD"|`FreeBSD`|
|"LINUX"|`OSPlatform.Linux`|
|"OSX"|`OSPlatform.OSX`|
|"WINDOWS"|`OSPlatform.Windows`|

## OSPlatform.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the current `OSPlatform` instance is equal to the specified object.

Parameters:

- `obj`: `true` if `obj` is a `OSPlatform` instance and its name is the same as the current object; otherwise, `false`.

Returns: `true` if `obj` is a `OSPlatform` instance and its name is the same as the current object.

#### Remarks
The name of an `OSPlatform` object is the `osPlatform` string passed to the `OSPlatform.Create` method. The names of the `OSPlatform` objects returned by the static `OSPlatform` properties are "LINUX", "OSX", and "WINDOWS". The method uses ordinal comparison to determine whether the names are the same.

## OSPlatform.Equals(OSPlatform) method

```csharp
public bool Equals (System.Runtime.InteropServices.OSPlatform other);
```

Determines whether the current instance and the specified `OSPlatform` instance are equal.

Parameters:

- `other`: The object to compare with the current instance.

Returns: `true` if the current instance and `other` are equal; otherwise, `false`.

#### Remarks
Two `OSPlatform` instances are equal if they have the same name. The name of an `OSPlatform` object is the `osPlatform` string passed to the `OSPlatform.Create` method. The names of the `OSPlatform` objects returned by the static OSPlatform properties are "LINUX", "OSX", and "WINDOWS". The method uses ordinal comparison to determine whether the names are the same.

## OSPlatform.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: The hash code for this instance.

To be added.

## OSPlatform.op_Equality(OSPlatform, OSPlatform) method

```csharp
public static bool operator == (System.Runtime.InteropServices.OSPlatform left, System.Runtime.InteropServices.OSPlatform right);
```

Determines whether two `OSPlatform` objects are equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` and `right` are equal; otherwise, `false`.

#### Remarks
Two `OSPlatform` instances are equal if they have the same name. The name of an `OSPlatform` object is the `osPlatform` string passed to the `OSPlatform.Create` method. The names of the `OSPlatform` objects returned by the static OSPlatform properties are "FREEBSD", "LINUX", "OSX", and "WINDOWS". The method uses ordinal comparison to determine whether the names are the same.

## OSPlatform.op_Inequality(OSPlatform, OSPlatform) method

```csharp
public static bool operator != (System.Runtime.InteropServices.OSPlatform left, System.Runtime.InteropServices.OSPlatform right);
```

Determines whether two `OSPlatform` instances are unequal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` and `right` are unequal; otherwise, `false`.

To be added.

## OSPlatform.ToString() method

```csharp
public override string ToString ();
```

Returns the string representation of this `OSPlatform` instance.

Returns: A string that represents this `OSPlatform` instance.

#### Remarks
The string representation of an  `OSPlatform` object is the `osPlatform` string passed to the `OSPlatform.Create` method. The names of the OSPlatform objects returned by the static OSPlatform properties are "FREEBSD", "LINUX", "OSX", and "WINDOWS".

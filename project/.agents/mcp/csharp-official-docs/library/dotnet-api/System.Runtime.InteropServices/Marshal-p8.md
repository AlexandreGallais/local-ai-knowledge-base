---
title: "Marshal class (part 8 of 13)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/Marshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Marshal class (part 8 of 13)

## Marshal.ReadByte(IntPtr) method

```csharp
public static byte ReadByte (IntPtr ptr);
```

Reads a single byte from unmanaged memory.

Parameters:

- `ptr`: The address in unmanaged memory from which to read.

Returns: The byte read from unmanaged memory.

Exceptions:

- `AccessViolationException`: `ptr` is not a recognized format.

-or-

`ptr` is `null`.

-or-

`ptr` is invalid.

#### Remarks
`Marshal.ReadByte` has an implied offset of 0. This method enables direct interaction with an unmanaged C-style byte array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before reading its element values.

Reading from unaligned memory locations is supported.

#### Examples
The following example creates a block of unmanaged memory, writes a byte to the unmanaged memory, reads the byte back from unmanaged memory, and then disposes the unmanaged memory.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/example.cs._

The following example demonstrates how to use the `Marshal.ReadByte` method to read the value of an unmanaged character.

## Marshal.ReadByte(IntPtr, Int32) method

```csharp
public static byte ReadByte (IntPtr ptr, int ofs);
```

Reads a single byte at a given offset (or index) from unmanaged memory.

Parameters:

- `ptr`: The base address in unmanaged memory from which to read.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before reading.

Returns: The byte read from unmanaged memory at the given offset.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.

#### Remarks
`Marshal.ReadByte` enables direct interaction with an unmanaged C-style byte array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before reading its element values.

Reading from unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadByte` and `Marshal.WriteByte` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

The following example demonstrates how to use the `Marshal.ReadByte` method to read the value of an unmanaged character.

## Marshal.ReadByte(Object, Int32) method

```csharp
public static byte ReadByte (object ptr, int ofs);
```

Reads a single byte at a given offset (or index) from unmanaged memory.

Parameters:

- `ptr`: The base address in unmanaged memory of the source object.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before reading.

Returns: The byte read from unmanaged memory at the given offset.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.
- `ArgumentException`: `ptr` is an `ArrayWithOffset` object. This method does not accept `ArrayWithOffset` parameters.

To be added.

## Marshal.ReadInt16(IntPtr) method

```csharp
public static short ReadInt16 (IntPtr ptr);
```

Reads a 16-bit signed integer from unmanaged memory.

Parameters:

- `ptr`: The address in unmanaged memory from which to read.

Returns: The 16-bit signed integer read from unmanaged memory.

Exceptions:

- `AccessViolationException`: `ptr` is not a recognized format.

-or-

`ptr` is `null`.

-or-

`ptr` is invalid.

#### Remarks
`Marshal.ReadInt16` has an implied offset of 0. This method enables direct interaction with an unmanaged C-style `Int16` array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before reading its element values.

Reading from unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadInt16` and `Marshal.WriteInt16` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

The following example demonstrates how to use the `Marshal.ReadInt16` method to read the value of an unmanaged `short` variable.

## Marshal.ReadInt16(IntPtr, Int32) method

```csharp
public static short ReadInt16 (IntPtr ptr, int ofs);
```

Reads a 16-bit signed integer at a given offset from unmanaged memory.

Parameters:

- `ptr`: The base address in unmanaged memory from which to read.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before reading.

Returns: The 16-bit signed integer read from unmanaged memory at the given offset.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.

#### Remarks
`Marshal.ReadInt16` enables direct interaction with an unmanaged 16-bit signed array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before reading its element values.

Reading from unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadInt16` and `Marshal.WriteInt16` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

The following example demonstrates how to use the `Marshal.ReadInt16` method to read the value of an unmanaged `short` variable.

## Marshal.ReadInt16(Object, Int32) method

```csharp
public static short ReadInt16 (object ptr, int ofs);
```

Reads a 16-bit signed integer at a given offset from unmanaged memory.

Parameters:

- `ptr`: The base address in unmanaged memory of the source object.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before reading.

Returns: The 16-bit signed integer read from unmanaged memory at the given offset.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.
- `ArgumentException`: `ptr` is an `ArrayWithOffset` object. This method does not accept `ArrayWithOffset` parameters.

To be added.

## Marshal.ReadInt32(IntPtr) method

```csharp
public static int ReadInt32 (IntPtr ptr);
```

Reads a 32-bit signed integer from unmanaged memory.

Parameters:

- `ptr`: The address in unmanaged memory from which to read.

Returns: The 32-bit signed integer read from unmanaged memory.

Exceptions:

- `AccessViolationException`: `ptr` is not a recognized format.

-or-

`ptr` is `null`.

-or-

`ptr` is invalid.

#### Remarks
`Marshal.ReadInt32` has an implied offset of 0. This method enables direct interaction with an unmanaged C-style `Int32` array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before reading its element values.

Reading from unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadInt32` and `Marshal.WriteInt32` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

The following example demonstrates how to use the `Marshal.ReadInt32` method to read the value of an unmanaged `int` variable.

## Marshal.ReadInt32(IntPtr, Int32) method

```csharp
public static int ReadInt32 (IntPtr ptr, int ofs);
```

Reads a 32-bit signed integer at a given offset from unmanaged memory.

Parameters:

- `ptr`: The base address in unmanaged memory from which to read.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before reading.

Returns: The 32-bit signed integer read from unmanaged memory.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.

#### Remarks
`Marshal.ReadInt32` enables direct interaction with an unmanaged 32-bit signed array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before reading its element values.

Reading from unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadInt32` and `Marshal.WriteInt32` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

The following example demonstrates how to use the `Marshal.ReadInt32` method to read the value of an unmanaged `int` variable.

## Marshal.ReadInt32(Object, Int32) method

```csharp
public static int ReadInt32 (object ptr, int ofs);
```

Reads a 32-bit signed integer at a given offset from unmanaged memory.

Parameters:

- `ptr`: The base address in unmanaged memory of the source object.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before reading.

Returns: The 32-bit signed integer read from unmanaged memory at the given offset.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.
- `ArgumentException`: `ptr` is an `ArrayWithOffset` object. This method does not accept `ArrayWithOffset` parameters.

To be added.

## Marshal.ReadInt64(IntPtr) method

```csharp
public static long ReadInt64 (IntPtr ptr);
```

Reads a 64-bit signed integer from unmanaged memory.

Parameters:

- `ptr`: The address in unmanaged memory from which to read.

Returns: The 64-bit signed integer read from unmanaged memory.

Exceptions:

- `AccessViolationException`: `ptr` is not a recognized format.

-or-

`ptr` is `null`.

-or-

`ptr` is invalid.

#### Remarks
`Marshal.ReadInt64` has an implied offset of 0. This method enables direct interaction with an unmanaged C-style `Int64` array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before reading its element values.

Reading from unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadInt64` and `Marshal.WriteInt64` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

The following example demonstrates how to use the `Marshal.ReadInt64` method to read the value of an unmanaged `__int64` variable.

## Marshal.ReadInt64(IntPtr, Int32) method

```csharp
public static long ReadInt64 (IntPtr ptr, int ofs);
```

Reads a 64-bit signed integer at a given offset from unmanaged memory.

Parameters:

- `ptr`: The base address in unmanaged memory from which to read.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before reading.

Returns: The 64-bit signed integer read from unmanaged memory at the given offset.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.

#### Remarks
`Marshal.ReadInt64` enables direct interaction with an unmanaged 64-bit signed array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before reading its element values.

Reading from unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadInt64` and `Marshal.WriteInt64` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

The following example demonstrates how to use the `Marshal.ReadInt64` method to read the value of an unmanaged `__int64` variable.

## Marshal.ReadInt64(Object, Int32) method

```csharp
public static long ReadInt64 (object ptr, int ofs);
```

Reads a 64-bit signed integer at a given offset from unmanaged memory.

Parameters:

- `ptr`: The base address in unmanaged memory of the source object.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before reading.

Returns: The 64-bit signed integer read from unmanaged memory at the given offset.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.
- `ArgumentException`: `ptr` is an `ArrayWithOffset` object. This method does not accept `ArrayWithOffset` parameters.

To be added.

## Marshal.ReadIntPtr(IntPtr) method

```csharp
public static IntPtr ReadIntPtr (IntPtr ptr);
```

Reads a processor native-sized integer from unmanaged memory.

Parameters:

- `ptr`: The address in unmanaged memory from which to read.

Returns: The integer read from unmanaged memory. A 32 bit integer is returned on 32 bit machines and a 64 bit integer is returned on 64 bit machines.

Exceptions:

- `AccessViolationException`: `ptr` is not a recognized format.

-or-

`ptr` is `null`.

-or-

`ptr` is invalid.

#### Remarks
`Marshal.ReadIntPtr` has an implied offset of 0. This method enables direct interaction with an unmanaged C-style `IntPtr` array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before reading its element values.

Reading from unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadIntPtr` and `Marshal.WriteIntPtr` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

## Marshal.ReadIntPtr(IntPtr, Int32) method

```csharp
public static IntPtr ReadIntPtr (IntPtr ptr, int ofs);
```

Reads a processor native-sized integer at a given offset from unmanaged memory.

Parameters:

- `ptr`: The base address in unmanaged memory from which to read.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before reading.

Returns: The integer read from unmanaged memory at the given offset.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.

#### Remarks
`Marshal.ReadIntPtr` enables direct interaction with an unmanaged C-style `IntPtr` array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before reading its element values.

Reading from unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadIntPtr` and `Marshal.WriteIntPtr` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

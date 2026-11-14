---
title: "Marshal class (part 12 of 13)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/Marshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Marshal class (part 12 of 13)

## Marshal.WriteInt16(IntPtr, Int32, Char) method

```csharp
public static void WriteInt16 (IntPtr ptr, int ofs, char val);
```

Writes a 16-bit signed integer value to unmanaged memory at a specified offset.

Parameters:

- `ptr`: The base address in the native heap to write to.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before writing.
- `val`: The value to write.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.

#### Remarks
`Marshal.WriteInt16` enables direct interaction with an unmanaged 16-bit signed array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before setting its element values.

Writing to unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadInt16` and `Marshal.WriteInt16` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

## Marshal.WriteInt16(IntPtr, Int32, Int16) method

```csharp
public static void WriteInt16 (IntPtr ptr, int ofs, short val);
```

Writes a 16-bit signed integer value into unmanaged memory at a specified offset.

Parameters:

- `ptr`: The base address in unmanaged memory to write to.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before writing.
- `val`: The value to write.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.

#### Remarks
`Marshal.WriteInt16` enables direct interaction with an unmanaged 16-bit signed array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before setting its element values.

Writing to unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadInt16` and `Marshal.WriteInt16` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

## Marshal.WriteInt16(Object, Int32, Char) method

```csharp
public static void WriteInt16 (object ptr, int ofs, char val);
```

Writes a 16-bit signed integer value to unmanaged memory at a specified offset.

Parameters:

- `ptr`: The base address in unmanaged memory of the target object.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before writing.
- `val`: The value to write.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.
- `ArgumentException`: `ptr` is an `ArrayWithOffset` object. This method does not accept `ArrayWithOffset` parameters.

To be added.

## Marshal.WriteInt16(Object, Int32, Int16) method

```csharp
public static void WriteInt16 (object ptr, int ofs, short val);
```

Writes a 16-bit signed integer value to unmanaged memory at a specified offset.

Parameters:

- `ptr`: The base address in unmanaged memory of the target object.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before writing.
- `val`: The value to write.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.
- `ArgumentException`: `ptr` is an `ArrayWithOffset` object. This method does not accept `ArrayWithOffset` parameters.

To be added.

## Marshal.WriteInt32(IntPtr, Int32) method

```csharp
public static void WriteInt32 (IntPtr ptr, int val);
```

Writes a 32-bit signed integer value to unmanaged memory.

Parameters:

- `ptr`: The address in unmanaged memory to write to.
- `val`: The value to write.

Exceptions:

- `AccessViolationException`: `ptr` is not a recognized format.

-or-

`ptr` is `null`.

-or-

`ptr` is invalid.

#### Remarks
`Marshal.WriteInt32` enables direct interaction with an unmanaged 32-bit signed array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before setting its element values.

Writing to unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadInt32` and `Marshal.WriteInt32` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

## Marshal.WriteInt32(IntPtr, Int32, Int32) method

```csharp
public static void WriteInt32 (IntPtr ptr, int ofs, int val);
```

Writes a 32-bit signed integer value into unmanaged memory at a specified offset.

Parameters:

- `ptr`: The base address in unmanaged memory to write to.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before writing.
- `val`: The value to write.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.

#### Remarks
`Marshal.WriteInt32` enables direct interaction with an unmanaged 32-bit signed array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before setting its element values.

Writing to unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadInt32` and `Marshal.WriteInt32` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

## Marshal.WriteInt32(Object, Int32, Int32) method

```csharp
public static void WriteInt32 (object ptr, int ofs, int val);
```

Writes a 32-bit signed integer value to unmanaged memory at a specified offset.

Parameters:

- `ptr`: The base address in unmanaged memory of the target object.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before writing.
- `val`: The value to write.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.
- `ArgumentException`: `ptr` is an `ArrayWithOffset` object. This method does not accept `ArrayWithOffset` parameters.

To be added.

## Marshal.WriteInt64(IntPtr, Int64) method

```csharp
public static void WriteInt64 (IntPtr ptr, long val);
```

Writes a 64-bit signed integer value to unmanaged memory.

Parameters:

- `ptr`: The address in unmanaged memory to write to.
- `val`: The value to write.

Exceptions:

- `AccessViolationException`: `ptr` is not a recognized format.

-or-

`ptr` is `null`.

-or-

`ptr` is invalid.

#### Remarks
`Marshal.WriteInt64` enables direct interaction with an unmanaged 64-bit signed array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before setting its element values.

Writing to unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadInt64` and `Marshal.WriteInt64` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

## Marshal.WriteInt64(IntPtr, Int32, Int64) method

```csharp
public static void WriteInt64 (IntPtr ptr, int ofs, long val);
```

Writes a 64-bit signed integer value to unmanaged memory at a specified offset.

Parameters:

- `ptr`: The base address in unmanaged memory to write.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before writing.
- `val`: The value to write.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.

#### Remarks
`Marshal.WriteInt64` enables direct interaction with an unmanaged 64-bit signed array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before setting its element values.

Writing to unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadInt64` and `Marshal.WriteInt64` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

## Marshal.WriteInt64(Object, Int32, Int64) method

```csharp
public static void WriteInt64 (object ptr, int ofs, long val);
```

Writes a 64-bit signed integer value to unmanaged memory at a specified offset.

Parameters:

- `ptr`: The base address in unmanaged memory of the target object.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before writing.
- `val`: The value to write.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.
- `ArgumentException`: `ptr` is an `ArrayWithOffset` object. This method does not accept `ArrayWithOffset` parameters.

To be added.

## Marshal.WriteIntPtr(IntPtr, IntPtr) method

```csharp
public static void WriteIntPtr (IntPtr ptr, IntPtr val);
```

Writes a processor native-sized integer value into unmanaged memory.

Parameters:

- `ptr`: The address in unmanaged memory to write to.
- `val`: The value to write.

Exceptions:

- `AccessViolationException`: `ptr` is not a recognized format.

-or-

`ptr` is `null`.

-or-

`ptr` is invalid.

#### Remarks
`Marshal.WriteIntPtr` enables direct interaction with an unmanaged C-style `IntPtr` array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before setting its element values.

Writing to unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadIntPtr` and `Marshal.WriteIntPtr` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

## Marshal.WriteIntPtr(IntPtr, Int32, IntPtr) method

```csharp
public static void WriteIntPtr (IntPtr ptr, int ofs, IntPtr val);
```

Writes a processor native-sized integer value to unmanaged memory at a specified offset.

Parameters:

- `ptr`: The base address in unmanaged memory to write to.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before writing.
- `val`: The value to write.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.

#### Remarks
This method writes a 32 bit integer on 32 bit systems, and a 64 bit integer on 64 bit systems.

`Marshal.WriteIntPtr` enables direct interaction with an unmanaged C-style `IntPtr` array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before setting its element values.

Writing to unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadIntPtr` and `Marshal.WriteIntPtr` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

## Marshal.WriteIntPtr(Object, Int32, IntPtr) method

```csharp
public static void WriteIntPtr (object ptr, int ofs, IntPtr val);
```

Writes a processor native-sized integer value to unmanaged memory.

Parameters:

- `ptr`: The base address in unmanaged memory of the target object.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before writing.
- `val`: The value to write.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.
- `ArgumentException`: `ptr` is an `ArrayWithOffset` object. This method does not accept `ArrayWithOffset` parameters.

To be added.

## Marshal.ZeroFreeBSTR(IntPtr) method

```csharp
public static void ZeroFreeBSTR (IntPtr s);
```

Frees a BSTR pointer that was allocated using the `Marshal.SecureStringToBSTR` method.

Parameters:

- `s`: The address of the `BSTR` to free.

#### Remarks
The `Marshal.ZeroFreeBSTR` method first sets the contents of the BSTR to zero, and then frees the BSTR.

## Marshal.ZeroFreeCoTaskMemAnsi(IntPtr) method

```csharp
public static void ZeroFreeCoTaskMemAnsi (IntPtr s);
```

Frees an unmanaged string pointer that was allocated using the `Marshal.SecureStringToCoTaskMemAnsi` method.

Parameters:

- `s`: The address of the unmanaged string to free.

#### Remarks
The `Marshal.ZeroFreeCoTaskMemAnsi` method first zeros out and then frees unmanaged memory that was allocated using the `Marshal.SecureStringToCoTaskMemAnsi` method.

#### Examples
The following example uses the `Marshal.SecureStringToCoTaskMemAnsi` method to marshal and decrypt the contents of a `SecureString` object to a block of unmanaged memory. It then uses the `Marshal.ZeroFreeCoTaskMemAnsi` method to zero out and dispose the unmanaged block.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/SecureStringToCoTaskMemAnsi/sample.cs._

## Marshal.ZeroFreeCoTaskMemUnicode(IntPtr) method

```csharp
public static void ZeroFreeCoTaskMemUnicode (IntPtr s);
```

Frees an unmanaged string pointer that was allocated using the `Marshal.SecureStringToCoTaskMemUnicode` method.

Parameters:

- `s`: The address of the unmanaged string to free.

#### Remarks
The `Marshal.ZeroFreeCoTaskMemUnicode` method first zeros out and then frees unmanaged memory that was allocated using the `Marshal.SecureStringToCoTaskMemUnicode` method.

## Marshal.ZeroFreeCoTaskMemUTF8(IntPtr) method

```csharp
public static void ZeroFreeCoTaskMemUTF8 (IntPtr s);
```

Frees an unmanaged string pointer that was allocated using the `Marshal.StringToCoTaskMemUTF8` method.

Parameters:

- `s`: The address of the unmanaged string to free.

#### Remarks
The `Marshal.ZeroFreeCoTaskMemUTF8` method first zeros out and then frees unmanaged memory that was allocated using the `Marshal.StringToCoTaskMemUTF8` method.

## Marshal.ZeroFreeGlobalAllocAnsi(IntPtr) method

```csharp
public static void ZeroFreeGlobalAllocAnsi (IntPtr s);
```

Frees an unmanaged string pointer that was allocated using the `Marshal.SecureStringToGlobalAllocAnsi` method.

Parameters:

- `s`: The address of the unmanaged string to free.

#### Remarks
The `Marshal.ZeroFreeGlobalAllocAnsi` method first zeros out and then frees unmanaged memory that was allocated using the `Marshal.SecureStringToGlobalAllocAnsi` method.

#### Examples
The following example uses the `Marshal.SecureStringToGlobalAllocAnsi` method to marshal and decrypt the contents of a `SecureString` object to a block of unmanaged memory. It then uses the `Marshal.ZeroFreeGlobalAllocAnsi` method to zero out and dispose the unmanaged block.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/SecureStringToGlobalAllocAnsi/sample.cs._

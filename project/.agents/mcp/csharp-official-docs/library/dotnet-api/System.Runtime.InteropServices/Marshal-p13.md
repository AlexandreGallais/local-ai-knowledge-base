---
title: "Marshal class (part 13 of 13)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/Marshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Marshal class (part 13 of 13)

## Marshal.ZeroFreeGlobalAllocUnicode(IntPtr) method

```csharp
public static void ZeroFreeGlobalAllocUnicode (IntPtr s);
```

Frees an unmanaged string pointer that was allocated using the `Marshal.SecureStringToGlobalAllocUnicode` method.

Parameters:

- `s`: The address of the unmanaged string to free.

#### Remarks
The `Marshal.ZeroFreeGlobalAllocUnicode` method first zeros out and then frees unmanaged memory that was allocated using the `Marshal.SecureStringToGlobalAllocUnicode` method.

#### Examples
The following example demonstrates how to use the `Marshal.SecureStringToGlobalAllocUnicode` method with the unmanaged `LogonUser` function to perform impersonation with the `SecureString` class. The example then uses the `Marshal.ZeroFreeGlobalAllocUnicode` method to zero out and free the unmanaged string reference.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/SecureStringToGlobalAllocUnicode/sample.cs._

## Marshal.SystemDefaultCharSize field

```csharp
public static readonly int SystemDefaultCharSize;
```

Represents the default character size on the system; the default is 2 for Unicode systems and 1 for ANSI systems. This field is read-only.

#### Examples
The following example demonstrates the `SystemDefaultCharSize` field. This code example is part of a larger example provided for the `Marshal` class.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/Overview/Marshal.cs._

## Marshal.SystemMaxDBCSCharSize field

```csharp
public static readonly int SystemMaxDBCSCharSize;
```

Represents the maximum size of a double byte character set (DBCS) size, in bytes, for the current operating system. This field is read-only.

#### Examples
The following example demonstrates the `SystemDefaultCharSize` field. This code example is part of a larger example provided for the `Marshal` class.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/Overview/Marshal.cs._

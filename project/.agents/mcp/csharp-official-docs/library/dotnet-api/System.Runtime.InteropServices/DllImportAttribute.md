---
title: "DllImportAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/DllImportAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DllImportAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class DllImportAttribute : Attribute
```

Indicates that the attributed method is exposed by an unmanaged dynamic-link library (DLL) as a static entry point.

#### Remarks
You can apply this attribute to methods.

The `DllImportAttribute` attribute provides the information needed to call a function exported from an unmanaged DLL. As a minimum requirement, you must supply the name of the DLL containing the entry point.

You apply this attribute directly to C# method definitions; however, the Visual Basic <example-value> emits this attribute when you use the `Declare` statement. For complex method definitions that include `BestFitMapping`, `CallingConvention`, `ExactSpelling`, `PreserveSig`, `SetLastError`, or `ThrowOnUnmappableChar` fields, you apply this attribute directly to Visual Basic <example-value> definitions.
Consider using the `LibraryImportAttribute` attribute instead.
> **Note:**
> JScript does not support this attribute. You can use C# or Visual Basic <example-value> classes to access unmanaged API methods from JScript programs.

For additional information about using the platform invoke service to access functions in unmanaged DLLs, see Consuming Unmanaged DLL Functions.

> **Note:**
> The `DllImportAttribute` does not support marshaling of generic types.

#### Examples
The following code example shows how to use the `DllImportAttribute` attribute to import the Win32 `MessageBox` function.  The code example then calls the imported method.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/DllImportAttribute/Overview/sample.cs._

## DllImportAttribute.DllImportAttribute(String) constructor

```csharp
public DllImportAttribute (string dllName);
```

Initializes a new instance of the `DllImportAttribute` class with the name of the DLL containing the method to import.

Parameters:

- `dllName`: The name of the DLL that contains the unmanaged method.

#### Examples
The following code example shows how to use the `DllImportAttribute` attribute to import the Win32 `MessageBox` function.  The code example then calls the imported method.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/DllImportAttribute/Overview/sample.cs._

## DllImportAttribute.Value property

```csharp
public string Value { get; }
```

Gets the name of the DLL file that contains the entry point.

Returns: The name of the DLL file that contains the entry point.

#### Remarks
You can provide a full or relative path. If you provide no path, the DLL must be in the current path at run time, unless the DLL is loaded by some other means. Be aware, however, that using a fully qualified path can introduce inaccuracy if the DLL is moved.

## DllImportAttribute.BestFitMapping field

```csharp
public bool BestFitMapping;
```

Enables or disables best-fit mapping behavior when converting Unicode characters to ANSI characters.

#### Remarks
If `true`, best-fit mapping behavior is enabled; otherwise, best-fit mapping is disabled. The `BestFitMapping` field is `true` by default. Settings for this field override the any level settings for the `BestFitMappingAttribute` attribute.

> **Caution:**
> Certain Unicode characters are converted to dangerous characters, such as the backslash '\\' character, which can inadvertently change a path. By setting the `ThrowOnUnmappableChar` field to `true`, you can signal the presence of an unmappable character to the caller by throwing an exception.

> **Caution:**
> You cannot change the default values provided by the `BestFitMapping` and `ThrowOnUnmappableChar` fields when passing a managed array whose elements are ANSI Chars or LPSTRs to an unmanaged safe array. Best-fit mapping is always enabled and no exception is thrown. Be aware that this combination can compromise your security model.

#### Examples
In some cases, Visual Basic <example-value> use the `DllImportAttribute`, instead of the `Declare` statement, to define a DLL function in managed code. Setting the `BestFitMapping` field is one of those cases. The following example shows how to apply the strictest character mapping security to a platform invoke method definitions by specifying the ANSI character set, disabling best fit mapping behavior, and throwing an exception on unmapped Unicode characters.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/DllImportAttribute/.ctor/source.cs._

## DllImportAttribute.CallingConvention field

```csharp
public System.Runtime.InteropServices.CallingConvention CallingConvention;
```

Indicates the calling convention of an entry point.

#### Remarks
You set this field to one of the `CallingConvention` enumeration members. The default value for the `CallingConvention` field is `Winapi`, which in turn defaults to `StdCall` convention on Windows, and `Cdecl` on all other platforms.

#### Examples
In some cases, Visual Basic <example-value> use the `DllImportAttribute`, instead of the `Declare` statement, to define a DLL function in managed code. Setting the `CallingConvention` field is one of those cases.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/DllImportAttribute/.ctor/source.cs._

## DllImportAttribute.CharSet field

```csharp
public System.Runtime.InteropServices.CharSet CharSet;
```

Indicates how to marshal string parameters to the method and controls name mangling.

#### Remarks
Use this field with a member of the `CharSet` enumeration to specify the marshaling behavior of string parameters and to specify which entry-point name to invoke (the exact name given or a name ending with "A" or "W"). The default enumeration member for C# and Visual Basic is `CharSet.Ansi` and the default enumeration member for C++ is `CharSet.None`, which is equivalent to `CharSet.Ansi`. In Visual Basic, you use the `Declare` statement to specify the `CharSet` field.

The `ExactSpelling` field influences the behavior of the `CharSet` field in determining which entry-point name to invoke. For a detailed description and examples of the string marshaling and name matching behavior associated with the `CharSet` field, see Specifying a Character Set.

#### Examples
The following code example shows how to use the `DllImportAttribute` attribute to import the Win32 `MessageBox` function.  The code example then calls the imported method.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/DllImportAttribute/Overview/sample.cs._

## DllImportAttribute.EntryPoint field

```csharp
public string? EntryPoint;
```

Indicates the name or ordinal of the DLL entry point to be called.

#### Remarks
You can specify the entry-point name by supplying a string indicating the name of the DLL containing the entry point, or you can identify the entry point by its ordinal. Ordinals are prefixed with the # sign, for example, #1. If you omit this field, the common language runtime uses the name of the.NET method marked with the `DllImportAttribute`.

For additional information, see Identifying Functions in DLLs. For examples showing how to use the `EntryPoint` field, see Specifying an Entry Point.

#### Examples
The following code example shows how to use the `DllImportAttribute` attribute to import the Win32 `MessageBox` function.  The code example uses the `EntryPoint` property to specify the function to import and then changes the name to `MyNewMessageBoxMethod`.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/DllImportAttribute/EntryPoint/sample.cs._

## DllImportAttribute.ExactSpelling field

```csharp
public bool ExactSpelling;
```

Controls whether the `DllImportAttribute.CharSet` field causes the common language runtime to search an unmanaged DLL for entry-point names other than the one specified.

#### Remarks
If `false`, the entry point name appended with the letter A is invoked when the `CharSet` field is set to `CharSet.Ansi`, and the entry-point name appended with the letter W is invoked when the `CharSet` field is set to the `CharSet.Unicode`. Typically, managed compilers set this field.

The following table shows the relationship between the `CharSet` and `ExactSpelling` fields, based on default values imposed by the programming language. You can override the default setting, but do so with caution.

|Language|ANSI|Unicode|Auto|
|--------------|----------|-------------|----------|
|Visual Basic|ExactSpelling:=True|ExactSpelling:=True|ExactSpelling:=False|
|C#|ExactSpelling=false|ExactSpelling=false|ExactSpelling=false|
|C++|ExactSpelling=false|ExactSpelling=false|ExactSpelling=false|

#### Examples
In some cases, Visual Basic <example-value> use the `DllImportAttribute`, instead of using the `Declare` statement, to define a DLL function in managed code. Setting the `ExactSpelling` field is one of those cases.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/DllImportAttribute/.ctor/source.cs._

## DllImportAttribute.PreserveSig field

```csharp
public bool PreserveSig;
```

Indicates whether unmanaged methods that have `HRESULT` return values are directly translated or whether `HRESULT` return values are automatically converted to exceptions.

#### Remarks
Set the `PreserveSig` field to `true` to translate unmanaged signatures with `HRESULT` values directly; set it to `false` to automatically convert `HRESULT` return values to exceptions. By default, the `PreserveSig` field is `true`.

When `true`, the managed method signature returns an integer value that contains the `HRESULT` value.  In this case, you must manually inspect the return value and respond accordingly in your application.

When you set the `PreserveSig` field to `false`, the managed method signature has a void return type or the type of the last unmanaged [out, retval] parameter.  When the unmanaged method produces an `HRESULT`, the runtime automatically ignores a return value of `S_OK` (or 0) and does not throw an exception.  For `HRESULT`s other than `S_OK`, the runtime automatically throws an exception that corresponds to the `HRESULT`.

You might decide to change the default error reporting behavior from `HRESULT`s to exceptions in cases where exceptions better fit the error reporting structure of your application.

This field is similar to the `PreserveSigAttribute`; however, in contrast to the `PreserveSig` field, the default value for the attribute is `false`.

In some cases, Visual Basic <example-value> use the `DllImportAttribute`, instead of using the `Declare` statement, to define a DLL function in managed code. Setting the `PreserveSig` field is one of those cases.

#### Examples
The following code example uses the `DllImportAttribute` to import the unmanaged `SHAutoComplete` function once with the `PreserveSig` field set to `true` and again with the `PreserveSig` field set to `false`.  This code example causes the `SHAutoComplete` function to generate any errors with an exception one time and an `HRESULT` the next.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/DllImportAttribute/PreserveSig/example.cs._

## DllImportAttribute.SetLastError field

```csharp
public bool SetLastError;
```

Indicates whether the callee sets an error (`SetLastError` on Windows or `errno` on other platforms) before returning from the attributed method.

#### Remarks
`true` to indicate that the callee will set an error via `SetLastError` on Windows or `errno` on other platforms; otherwise, `false`. The default is `false`.

If this field is set to `true`, the runtime marshaler calls `GetLastError` or `errno` and caches the value returned to prevent it from being overwritten by other API calls.
You can retrieve the error code by calling `Marshal.GetLastPInvokeError`.

The error information is cleared (set to `0`) before invoking the callee when this field is set to `true`. This means that error information returned by `Marshal.GetLastPInvokeError` and `Marshal.GetLastWin32Error` represents only the error information from the last p/invoke with `SetLastError` set to `true`.

#### Examples
In some cases, Visual Basic <example-value> use the `DllImportAttribute`, instead of using the `Declare` statement, to define a DLL function in managed code. Setting the `SetLastError` field is one of those cases.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/DllImportAttribute/.ctor/source.cs._

## DllImportAttribute.ThrowOnUnmappableChar field

```csharp
public bool ThrowOnUnmappableChar;
```

Enables or disables the throwing of an exception on an unmappable Unicode character that is converted to an ANSI "?" character.

#### Remarks
`true` to indicate that an exception is thrown each time the interop marshaler converts an unmappable character; `false` to indicate that the `ThrowOnUnmappableChar` field is disabled. This field is `false` by default.

> **Caution:**
> Certain Unicode characters are converted to dangerous characters, such as the backslash '\\' character, which can inadvertently change a path. By setting the `ThrowOnUnmappableChar` field to `true`, you can signal the presence of an unmappable character to the caller by throwing an exception.

> **Caution:**
> You cannot change the default values provided by the `BestFitMapping` and `ThrowOnUnmappableChar` fields when passing a managed array whose elements are ANSI Chars or LPSTRs to an unmanaged safe array. Best-fit mapping is always enabled and no exception is thrown. Be aware that this combination can compromise your security model.

#### Examples
In some cases, Visual Basic <example-value> use the `DllImportAttribute` to define a DLL function in managed code, instead of using the `Declare` statement. Setting the `ThrowOnUnmappableChar` field is one of those cases. The following example shows how to apply the strictest character mapping security to a platform invoke method definitions by specifying the ANSI character set, disabling best fit mapping behavior, and throwing an exception on unmapped Unicode characters.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/DllImportAttribute/.ctor/source.cs._

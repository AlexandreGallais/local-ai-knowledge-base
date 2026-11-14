---
title: "UCOMITypeLib interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/UCOMITypeLib.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UCOMITypeLib interface

Namespace: `System.Runtime.InteropServices`

```csharp
public interface UCOMITypeLib
```

Use `ITypeLib` instead.

#### Remarks
For additional information about the `ITypeLib` interface, see the MSDN Library.

## UCOMITypeLib.GetDocumentation(Int32, String, String, Int32, String) method

```csharp
public void GetDocumentation (int index, out string strName, out string strDocString, out int dwHelpContext, out string strHelpFile);
```

Retrieves the library's documentation string, the complete Help file name and path, and the context identifier for the library Help topic in the Help file.

Parameters:

- `index`: Index of the type description whose documentation is to be returned.
- `strName`: Returns a string that contains the name of the specified item.
- `strDocString`: Returns a string that contains the documentation string for the specified item.
- `dwHelpContext`: Returns the Help context identifier associated with the specified item.
- `strHelpFile`: Returns a string that contains the fully qualified name of the Help file.

#### Remarks
For additional information about `ITypeLib::GetDocumentation`, see the MSDN Library.

## UCOMITypeLib.GetLibAttr(IntPtr) method

```csharp
public void GetLibAttr (out IntPtr ppTLibAttr);
```

Retrieves the structure that contains the library's attributes.

Parameters:

- `ppTLibAttr`: On successful return, a structure that contains the library's attributes.

#### Remarks
The values of the structure referenced by `ppTLibAttr` can be obtained by `Marshal.PtrToStructure`.

For additional information about `ITypeLib::GetTypeLibAttr`, see the MSDN Library.

## UCOMITypeLib.GetTypeInfoCount() method

```csharp
public int GetTypeInfoCount ();
```

Returns the number of type descriptions in the type library.

Returns: The number of type descriptions in the type library.

#### Remarks
For additional information about `ITypeLib::GetTypeInfoCount`, see the MSDN Library.

## UCOMITypeLib.GetTypeInfoType(Int32, TYPEKIND) method

```csharp
public void GetTypeInfoType (int index, out System.Runtime.InteropServices.ComTypes.TYPEKIND pTKind);
```

Retrieves the type of a type description.

Parameters:

- `index`: The index of the type description within the type library.
- `pTKind`: A reference to the `TYPEKIND` enumeration for the type description.

#### Remarks
For additional information, see ITypeLib::GetTypeInfoType.

## UCOMITypeLib.IsName(String, Int32) method

```csharp
public bool IsName (string szNameBuf, int lHashVal);
```

Indicates whether a passed-in string contains the name of a type or member described in the library.

Parameters:

- `szNameBuf`: The string to test.
- `lHashVal`: The hash value of `szNameBuf`.

Returns: `true` if `szNameBuf` was found in the type library; otherwise `false`.

#### Remarks
For additional information about `ITypeLib::IsName`, see the MSDN Library.

## UCOMITypeLib.ReleaseTLibAttr(IntPtr) method

```csharp
public void ReleaseTLibAttr (IntPtr pTLibAttr);
```

Releases the `TYPELIBATTR` originally obtained from `UCOMITypeLib.GetLibAttr`.

Parameters:

- `pTLibAttr`: The `TLIBATTR` to release.

#### Remarks
For additional information about `ITypeLib::ReleaseTLibAttr`, see the MSDN Library.

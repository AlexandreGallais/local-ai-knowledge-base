---
title: "Breaking change: Parameter names changed in .NET 6"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/6.0/parameter-name-changes.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Parameter names changed in .NET 6

Some parameter names have changed to be consistent between reference and implementation assemblies. Most of the changes are in the reference assemblies, but a handful are in the implementation assemblies.

## Previous behavior

Some reference assembly parameter names were different to their corresponding parameters in the implementation assembly. This can cause problems while using named arguments and reflection.

## New behavior

In .NET 6, these mismatched parameter names were updated to be consistent across the reference and implementation assemblies.

The following table shows the APIs and parameter names that changed. In addition, some parameter names on `Stream`-derived types were changed.

| API | Old parameter name | New parameter name | Where changed |
| - | - | - |
| `System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo,System.Type)` | `type` | `attributeType` | Reference and implementation assembly |
| `System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo,System.Type,System.Boolean)` | `type` | `attributeType` | Reference and implementation assembly |
| `Microsoft.VisualBasic.Strings.InStr(System.Int32,System.String,System.String,Microsoft.VisualBasic.CompareMethod)` | `StartPos` | `Start` | Reference assembly |
| `System.Collections.Generic.SortedList`2.System#Collections#ICollection#CopyTo(System.Array,System.Int32)` | `arrayIndex` | `index` | Reference assembly |
| `System.Numerics.Vector.Narrow*` | `source1`, `source2` | `low`, `high` | Reference assembly |
| `System.Numerics.Vector.Widen*` | `dest1`, `dest2` | `low`, `high` | Reference assembly |
| `System.IO.StreamWriter.WriteLine(System.ReadOnlySpan{System.Char})` | `value` | `buffer` | Implementation assembly |
| `System.IO.FileStream.BeginRead(System.Byte[],System.Int32,System.Int32,System.AsyncCallback,System.Object)` | `array`, `numBytes` | `buffer`, `count` | Implementation assembly |
| `System.IO.FileStream.BeginWrite(System.Byte[],System.Int32,System.Int32,System.AsyncCallback,System.Object)` | `array`, `numBytes` | `buffer`, `count` | Implementation assembly |
| `System.IO.MemoryStream.Read(System.Span{System.Byte})` | `destination` | `buffer` | Reference assembly |
| `System.IO.MemoryStream.ReadAsync(System.Memory{System.Byte},System.Threading.CancellationToken)` | `destination` | `buffer` | Reference assembly |
| `System.IO.MemoryStream.Write(System.ReadOnlySpan{System.Byte})` | `source` | `buffer` | Reference assembly |
| `System.IO.MemoryStream.WriteAsync(System.ReadOnlyMemory{System.Byte},System.Threading.CancellationToken)` | `source` | `buffer` | Reference assembly |
| `System.IO.UnmanagedMemoryStream.Read(System.Span{System.Byte})` | `destination` | `buffer` | Reference assembly |
| `System.IO.UnmanagedMemoryStream.Write(System.ReadOnlySpan{System.Byte})` | `source` | `buffer` | Reference assembly |
| `System.Security.Cryptography.Pkcs.SignerInfo.AddUnsignedAttribute(System.Security.Cryptography.AsnEncodedData)` | `asnEncodedData` | `unsignedAttribute` | Reference assembly |
| `System.Security.Cryptography.Pkcs.SignerInfo.RemoveUnsignedAttribute(System.Security.Cryptography.AsnEncodedData)` | `asnEncodedData` | `unsignedAttribute` | Reference assembly |
| `System.Security.Cryptography.Pkcs.Rfc3161TimestampRequest.ProcessResponse(System.ReadOnlyMemory{System.Byte},System.Int32@)` | `source` | `responseBytes` | Implementation assembly |
| `System.Security.Cryptography.Pkcs.Rfc3161TimestampToken.TryDecode(System.ReadOnlyMemory{System.Byte},System.Security.Cryptography.Pkcs.Rfc3161TimestampToken@,System.Int32@)` | `source` | `encodedBytes` | Implementation assembly |
| `System.Security.Cryptography.Pkcs.Rfc3161TimestampTokenInfo.#ctor(System.Security.Cryptography.Oid,System.Security.Cryptography.Oid,System.ReadOnlyMemory{System.Byte},System.ReadOnlyMemory{System.Byte},System.DateTimeOffset,System.Nullable{System.Int64},System.Boolean,System.Nullable{System.ReadOnlyMemory{System.Byte}},System.Nullable{System.ReadOnlyMemory{System.Byte}},System.Security.Cryptography.X509Certificates.X509ExtensionCollection)` | `tsaName` | `timestampAuthorityName` | Implementation assembly |
| `System.Security.Cryptography.Pkcs.Rfc3161TimestampTokenInfo.TryDecode(System.ReadOnlyMemory{System.Byte},System.Security.Cryptography.Pkcs.Rfc3161TimestampTokenInfo@,System.Int32@)` | `` | `` |
| `System.Security.Permissions.PrincipalPermission.Equals(System.Object)` | `o` | `obj` | Reference assembly |
| `System.Security.Policy.UrlMembershipCondition.Equals(System.Object)` | `o` | `obj` | Reference assembly |
| `System.Data.Common.DBDataPermission.#ctor(System.Data.Common.DBDataPermission)` | `dataPermission` | `permission` | Implementation assembly |
| `System.Data.Common.DBDataPermission.#ctor(System.Data.Common.DBDataPermissionAttribute)` | `attribute` | `permissionAttribute` | Implementation assembly |
| `System.Data.Common.DBDataPermission.#ctor(System.Security.Permissions.PermissionState,System.Boolean)` | `blankPassword` | `allowBlankPassword` | Implementation assembly |
| `System.Data.Common.DBDataPermission.FromXml(System.Security.SecurityElement)` | `elem` | `securityElement` | Implementation assembly |
| `System.Data.Common.DBDataPermission.Union(System.Security.IPermission)` | `other` | `target` | Implementation assembly |

## Reason for change

- In cases where the reference assembly parameter names were changed, the new names were deemed more appropriate or readable and minimally breaking.
- In cases where the names of runtime parameters were changed to gain consistency across platforms or with reference assemblies, the runtime implementation now matches the public API and documentation for the method.

## Version introduced

.NET 6

## Recommended action

If you encounter a compiler error due to a parameter name change, update the parameter name accordingly.

If you use runtime reflection to inspect methods and took a dependency on the parameter names, update the code to use the new parameter names.

## Affected APIs

- `Microsoft.VisualBasic.Strings.InStr(System.Int32,System.String,System.String,Microsoft.VisualBasic.CompareMethod)`
- `System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo,System.Type)`
- `System.Attribute.GetCustomAttributes(System.Reflection.MemberInfo,System.Type,System.Boolean)`
- `System.Collections.Generic.SortedList`2.System#Collections#ICollection#CopyTo(System.Array,System.Int32)`
- `System.IO.StreamWriter.WriteLine(System.ReadOnlySpan{System.Char})`
- `System.IO.FileStream.BeginRead(System.Byte[],System.Int32,System.Int32,System.AsyncCallback,System.Object)`
- `System.IO.FileStream.BeginWrite(System.Byte[],System.Int32,System.Int32,System.AsyncCallback,System.Object)`
- `System.IO.MemoryStream.Read(System.Span{System.Byte})`
- `System.IO.MemoryStream.ReadAsync(System.Memory{System.Byte},System.Threading.CancellationToken)`
- `System.IO.MemoryStream.Write(System.ReadOnlySpan{System.Byte})`
- `System.IO.MemoryStream.WriteAsync(System.ReadOnlyMemory{System.Byte},System.Threading.CancellationToken)`
- `System.IO.UnmanagedMemoryStream.Read(System.Span{System.Byte})`
- `System.IO.UnmanagedMemoryStream.Write(System.ReadOnlySpan{System.Byte})`
- `System.Numerics.Vector.Narrow*`
- `System.Numerics.Vector.Widen*`
- `System.Security.Cryptography.Pkcs.Rfc3161TimestampRequest.ProcessResponse(System.ReadOnlyMemory{System.Byte},System.Int32@)`
- `System.Security.Cryptography.Pkcs.Rfc3161TimestampToken.TryDecode(System.ReadOnlyMemory{System.Byte},System.Security.Cryptography.Pkcs.Rfc3161TimestampToken@,System.Int32@)`
- `System.Security.Cryptography.Pkcs.Rfc3161TimestampTokenInfo.#ctor(System.Security.Cryptography.Oid,System.Security.Cryptography.Oid,System.ReadOnlyMemory{System.Byte},System.ReadOnlyMemory{System.Byte},System.DateTimeOffset,System.Nullable{System.Int64},System.Boolean,System.Nullable{System.ReadOnlyMemory{System.Byte}},System.Nullable{System.ReadOnlyMemory{System.Byte}},System.Security.Cryptography.X509Certificates.X509ExtensionCollection)`
- `System.Security.Cryptography.Pkcs.Rfc3161TimestampTokenInfo.TryDecode(System.ReadOnlyMemory{System.Byte},System.Security.Cryptography.Pkcs.Rfc3161TimestampTokenInfo@,System.Int32@)`
- `System.Security.Cryptography.Pkcs.SignerInfo.AddUnsignedAttribute(System.Security.Cryptography.AsnEncodedData)`
- `System.Security.Cryptography.Pkcs.SignerInfo.RemoveUnsignedAttribute(System.Security.Cryptography.AsnEncodedData)`
- `System.Security.Permissions.PrincipalPermission.Equals(System.Object)`
- `System.Security.Policy.UrlMembershipCondition.Equals(System.Object)`
- `System.Data.Common.DBDataPermission.#ctor(System.Data.Common.DBDataPermission)`
- `System.Data.Common.DBDataPermission.#ctor(System.Data.Common.DBDataPermissionAttribute)`
- `System.Data.Common.DBDataPermission.#ctor(System.Security.Permissions.PermissionState,System.Boolean)`
- `System.Data.Common.DBDataPermission.FromXml(System.Security.SecurityElement)`
- `System.Data.Common.DBDataPermission.Union(System.Security.IPermission)`

## See also

- Some parameters in Stream-derived types are renamed

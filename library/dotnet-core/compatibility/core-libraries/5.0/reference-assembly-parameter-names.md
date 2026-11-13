---
title: "Breaking change: Parameter names changed in reference assemblies"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/5.0/reference-assembly-parameter-names.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Parameter names changed in reference assemblies

Some reference assembly parameter names have changed to match parameter names in the implementation assemblies.

## Change description

In previous .NET versions, some reference assembly parameter names are different to their corresponding parameters in the implementation assembly. This can cause problems while using named arguments and reflection.

In .NET 5, these mismatched parameter names were updated in the reference assemblies to exactly match the corresponding parameter names in the implementation assemblies.

The following table shows the APIs and parameter names that changed.

| API | Old parameter name | New parameter name |
| - | - | - |
| `System.CodeDom.Compiler.CodeGenerator.GenerateStatements(System.CodeDom.CodeStatementCollection)` | `stms` | `stmts` |
| `System.Drawing.Icon.System#Runtime#Serialization#ISerializable#GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | `info` | `si` |
| `System.Drawing.Image.System#Runtime#Serialization#ISerializable#GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | `info` | `si` |
| `System.Net.IPAddress.Parse(System.ReadOnlySpan{System.Char})` | `ipString` | `ipSpan` |
| `System.Net.IPAddress.TryParse(System.ReadOnlySpan{System.Char},System.Net.IPAddress@)` | `ipString` | `ipSpan` |
| `System.IO.IsolatedStorage.IsolatedStorageFileStream.BeginRead(System.Byte[],System.Int32,System.Int32,System.AsyncCallback,System.Object)` | `buffer` | `array` |
| `System.IO.IsolatedStorage.IsolatedStorageFileStream.BeginWrite(System.Byte[],System.Int32,System.Int32,System.AsyncCallback,System.Object)` | `buffer` | `array` |
| `System.Net.NetworkCredential.GetCredential(System.String,System.Int32,System.String)` | `authType` | `authenticationType` |
| `System.ComponentModel.ParenthesizePropertyNameAttribute.Equals(System.Object)` | `o` | `obj` |
| `System.ComponentModel.RefreshPropertiesAttribute.Equals(System.Object)` | `value` | `obj` |
| `System.Diagnostics.StackFrame.#ctor(System.Boolean)` | `fNeedFileInfo` | `needFileInfo` |
| `System.Diagnostics.StackFrame.#ctor(System.Int32,System.Boolean)` | `fNeedFileInfo` | `needFileInfo` |
| `System.StringNormalizationExtensions.IsNormalized(System.String,System.Text.NormalizationForm)` | `value` | `strInput` |
| `System.StringNormalizationExtensions.IsNormalized(System.String)` | `value` | `strInput` |
| `System.StringNormalizationExtensions.Normalize(System.String,System.Text.NormalizationForm)` | `value` | `strInput` |
| `System.StringNormalizationExtensions.Normalize(System.String)` | `value` | `strInput` |

## Reason for change

The parameter names were changed for consistency and to avoid failures when using named arguments and reflection.

## Version introduced

5.0

## Recommended action

If you encounter a compiler error due to a parameter name change, update the parameter name accordingly.

## Affected APIs

- `System.CodeDom.Compiler.CodeGenerator.GenerateStatements(System.CodeDom.CodeStatementCollection)`
- `System.ComponentModel.ParenthesizePropertyNameAttribute.Equals(System.Object)`
- `System.ComponentModel.RefreshPropertiesAttribute.Equals(System.Object)`
- `System.Diagnostics.StackFrame.#ctor(System.Boolean)`
- `System.Diagnostics.StackFrame.#ctor(System.Int32,System.Boolean)`
- `System.Drawing.Icon.System#Runtime#Serialization#ISerializable#GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Drawing.Image.System#Runtime#Serialization#ISerializable#GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.IO.IsolatedStorage.IsolatedStorageFileStream.BeginRead(System.Byte[],System.Int32,System.Int32,System.AsyncCallback,System.Object)`
- `System.IO.IsolatedStorage.IsolatedStorageFileStream.BeginWrite(System.Byte[],System.Int32,System.Int32,System.AsyncCallback,System.Object)`
- `System.Net.IPAddress.Parse(System.ReadOnlySpan{System.Char})`
- `System.Net.IPAddress.TryParse(System.ReadOnlySpan{System.Char},System.Net.IPAddress@)`
- `System.Net.NetworkCredential.GetCredential(System.String,System.Int32,System.String)`
- `System.StringNormalizationExtensions.IsNormalized(System.String,System.Text.NormalizationForm)`
- `System.StringNormalizationExtensions.IsNormalized(System.String)`
- `System.StringNormalizationExtensions.Normalize(System.String,System.Text.NormalizationForm)`
- `System.StringNormalizationExtensions.Normalize(System.String)`

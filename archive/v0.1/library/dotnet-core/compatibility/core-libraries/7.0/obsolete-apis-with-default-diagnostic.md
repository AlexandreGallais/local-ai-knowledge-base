---
title: "Breaking change: .NET 7 obsoletions with default diagnostic ID"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/7.0/obsolete-apis-with-default-diagnostic.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# API obsoletions with default diagnostic ID (.NET 7)

Several APIs have been marked as obsolete in .NET 7. Referencing these APIs in your code will result in build warnings. In C#, the compiler diagnostic for these obsoletions is CS0618.

## Previous behavior

Previously, the affected APIs could be referenced without any build warnings.

## New behavior

Starting in .NET 7, referencing the affected APIs will result in build warnings.

## Version introduced

.NET 7 Preview 3

## Type of breaking change

These obsoletions can affect source compatibility.

## Reason for change

These APIs were previously marked obsolete in the implementation assemblies but not in the reference assemblies. The reference assemblies have now been updated to match the implementation assemblies.

## Recommended action

Follow the recommended action that's emitted when you use the obsolete API.

## Affected APIs

- `System.ComponentModel.IComNativeDescriptorHandler`
- `System.ComponentModel.MemberDescriptor.GetInvokee(System.Type,System.Object)`
- `System.ComponentModel.RecommendedAsConfigurableAttribute`
- `System.Data.OleDb.OleDbParameterCollection.Add(System.String,System.Object)`
- `System.Net.FileWebRequest.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Net.FileWebRequest.System#Runtime#Serialization#ISerializable#GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Net.FileWebResponse.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Net.FileWebResponse.System#Runtime#Serialization#ISerializable#GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Net.Http.HttpRequestMessage.Properties`
- `System.Net.WebRequest.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Net.WebRequest.System#Runtime#Serialization#ISerializable#GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Net.WebResponse.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` constructor
- `System.Net.WebResponse.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Net.WebResponse.System#Runtime#Serialization#ISerializable#GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Security.Cryptography.PasswordDeriveBytes.GetBytes(System.Int32)`
- `System.Web.HttpUtility.UrlEncodeUnicode(System.String)`
- `System.Web.HttpUtility.UrlEncodeUnicodeToBytes(System.String)`

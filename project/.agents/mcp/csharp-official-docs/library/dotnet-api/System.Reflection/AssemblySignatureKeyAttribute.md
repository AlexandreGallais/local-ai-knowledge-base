---
title: "AssemblySignatureKeyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblySignatureKeyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblySignatureKeyAttribute class

Namespace: `System.Reflection`

```csharp
public sealed class AssemblySignatureKeyAttribute : Attribute
```

Provides migration from an older, simpler strong name key to a larger key with a stronger hashing algorithm.

#### Remarks
The new, larger key is the signature key. The `AssemblySignatureKeyAttribute` attribute allows the assembly metadata to have the older public key token and binary large object (BLOB) so that existing assembly references continue to work. It also ensures that the mapping comes from an owner of the identity key.

The presence of the attribute does not necessarily mean that strong name validation takes place. In common full-trust scenarios, the attribute is never considered, because strong name signatures are never validated. However, when the strong name signature does have to be validated, both the strong name signature and the countersignature must be validated. The assembly's identity key does not have to be identical to the signature key (the key used to do the actual signing and validation). The identity key can be mapped to a different (more robust) signing key. This lets you set the identity of an assembly, and update the signing keys and algorithms to more secure versions.

The countersignature addresses security concerns when a malicious assembly claims some other identity. For example, a malicious System.Core.dll assembly could contain the Microsoft public key in its metadata, and use the attribute to tell strong name validation to use the attacker's signature key if no countersignature is present. Thus, it could masquerade as a strong name-validated Microsoft assembly.

For information about how to sign assemblies for use with this new attribute, see Enhanced Strong Naming.

## AssemblySignatureKeyAttribute.AssemblySignatureKeyAttribute(String, String) constructor

```csharp
public AssemblySignatureKeyAttribute (string publicKey, string countersignature);
```

Creates a new instance of the `AssemblySignatureKeyAttribute` class by using the specified public key and countersignature.

Parameters:

- `publicKey`: The public or identity key.
- `countersignature`: The countersignature, which is the signature key <example-value> of the strong-name key.

#### Remarks
Use Sn.exe to generate the parameters for this constructor.

```console
sn -a IdentityPubKey.snk IdentityKey.snk SignaturePubKey.snk
```

## AssemblySignatureKeyAttribute.Countersignature property

```csharp
public string Countersignature { get; }
```

Gets the countersignature for the strong name for this assembly.

Returns: The countersignature for this signature key.

#### Remarks
The countersignature represents the public key that is signed by the identity key.

## AssemblySignatureKeyAttribute.PublicKey <example-value>

```csharp
public string PublicKey { get; }
```

Gets the public key for the strong name used to sign the assembly.

Returns: The public key for this assembly.

To be added.

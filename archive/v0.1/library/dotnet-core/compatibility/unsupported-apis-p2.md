---
title: "Unsupported APIs on .NET Core and .NET 5+ (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/unsupported-apis.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Unsupported APIs on .NET Core and .NET 5+ (part 2 of 2)

## System.Security.Cryptography

| Member | Platforms that throw |
|--------|----------------------|
| `System.Security.Cryptography.AesCcm.#ctor*` | macOS |
| `System.Security.Cryptography.AsymmetricAlgorithm.Create(System.String)` | All |
| `System.Security.Cryptography.CngAlgorithm` | Linux and macOS |
| `System.Security.Cryptography.CngAlgorithmGroup` | Linux and macOS |
| `System.Security.Cryptography.CngKey` | Linux and macOS |
| `System.Security.Cryptography.CngKeyBlobFormat` | Linux and macOS |
| `System.Security.Cryptography.CngKeyCreationParameters` | Linux and macOS |
| `System.Security.Cryptography.CngProvider` | Linux and macOS |
| `System.Security.Cryptography.CngUIPolicy` | Linux and macOS |
| `System.Security.Cryptography.CryptoConfig.EncodeOID(System.String)` | All |
| `System.Security.Cryptography.CspKeyContainerInfo.#ctor*` | Linux and macOS |
| `System.Security.Cryptography.CspKeyContainerInfo.Accessible` | Linux and macOS |
| `System.Security.Cryptography.CspKeyContainerInfo.Exportable` | Linux and macOS |
| `System.Security.Cryptography.CspKeyContainerInfo.HardwareDevice` | Linux and macOS |
| `System.Security.Cryptography.CspKeyContainerInfo.KeyContainerName` | Linux and macOS |
| `System.Security.Cryptography.CspKeyContainerInfo.KeyNumber` | Linux and macOS |
| `System.Security.Cryptography.CspKeyContainerInfo.MachineKeyStore` | Linux and macOS |
| `System.Security.Cryptography.CspKeyContainerInfo.Protected` | Linux and macOS |
| `System.Security.Cryptography.CspKeyContainerInfo.ProviderName` | Linux and macOS |
| `System.Security.Cryptography.CspKeyContainerInfo.ProviderType` | Linux and macOS |
| `System.Security.Cryptography.CspKeyContainerInfo.RandomlyGenerated` | Linux and macOS |
| `System.Security.Cryptography.CspKeyContainerInfo.Removable` | Linux and macOS |
| `System.Security.Cryptography.CspKeyContainerInfo.UniqueKeyContainerName` | Linux and macOS |
| `System.Security.Cryptography.DSA.Create*`\* | macOS |
| `System.Security.Cryptography.DSACryptoServiceProvider.#ctor*`\* | macOS |
| `System.Security.Cryptography.X509Certificates.DSACertificateExtensions.GetDSAPrivateKey(System.Security.Cryptography.X509Certificates.X509Certificate2)`\* | macOS |
| `System.Security.Cryptography.X509Certificates.DSACertificateExtensions.GetDSAPublicKey(System.Security.Cryptography.X509Certificates.X509Certificate2)`\* | macOS |
| `System.Security.Cryptography.X509Certificates.DSACertificateExtensions.CopyWithPrivateKey(System.Security.Cryptography.X509Certificates.X509Certificate2,System.Security.Cryptography.DSA)`\* | macOS |
| `System.Security.Cryptography.DSAOpenSsl.#ctor*` | macOS |
| `System.Security.Cryptography.ECDiffieHellmanCng.FromXmlString(System.String,System.Security.Cryptography.ECKeyXmlFormat)` | All |
| `System.Security.Cryptography.ECDiffieHellmanCng.ToXmlString(System.Security.Cryptography.ECKeyXmlFormat)` | All |
| `System.Security.Cryptography.ECDiffieHellmanCngPublicKey.FromXmlString(System.String)` | All |
| `System.Security.Cryptography.ECDiffieHellmanCngPublicKey.ToXmlString` | All |
| `System.Security.Cryptography.ECDiffieHellmanOpenSsl.#ctor*` | macOS |
| `System.Security.Cryptography.ECDiffieHellmanPublicKey.ToByteArray` | Linux and macOS |
| `System.Security.Cryptography.ECDiffieHellmanPublicKey.ToXmlString` | All |
| `System.Security.Cryptography.ECDsaCng.FromXmlString(System.String,System.Security.Cryptography.ECKeyXmlFormat)` | All |
| `System.Security.Cryptography.ECDsaCng.ToXmlString(System.Security.Cryptography.ECKeyXmlFormat)` | All |
| `System.Security.Cryptography.ECDsaOpenSsl.#ctor*` | macOS |
| `System.Security.Cryptography.HashAlgorithm.Create` | All |
| `System.Security.Cryptography.HMAC.Create` | All |
| `System.Security.Cryptography.HMAC.Create(System.String)` | All |
| `System.Security.Cryptography.HMAC.HashCore*` | All |
| `System.Security.Cryptography.HMAC.HashFinal*` | All |
| `System.Security.Cryptography.HMAC.Initialize*` | All |
| `System.Security.Cryptography.KeyedHashAlgorithm.Create` | All |
| `System.Security.Cryptography.KeyedHashAlgorithm.Create(System.String)` | All |
| `System.Security.Cryptography.ProtectedData.Protect*` | Linux and macOS |
| `System.Security.Cryptography.ProtectedData.Unprotect*` | Linux and macOS |
| `System.Security.Cryptography.RSACryptoServiceProvider.DecryptValue(System.Byte[])` | All |
| `System.Security.Cryptography.RSACryptoServiceProvider.EncryptValue(System.Byte[])` | All |
| `System.Security.Cryptography.RSAOpenSsl.#ctor*` | macOS |
| `System.Security.Cryptography.RSA.DecryptValue(System.Byte[])` | All |
| `System.Security.Cryptography.RSA.EncryptValue(System.Byte[])` | All |
| `System.Security.Cryptography.RSA.FromXmlString*` | All |
| `System.Security.Cryptography.RSA.ToXmlString*` | All |
| `System.Security.Cryptography.SafeEvpPKeyHandle` | macOS |
| `System.Security.Cryptography.SymmetricAlgorithm.Create` | All |
| `System.Security.Cryptography.SymmetricAlgorithm.Create(System.String)` | All |

\* .NET 11 and later versions.

## System.Security.Cryptography.Pkcs

| Member | Platforms that throw |
|--------|----------------------|
| `System.Security.Cryptography.Pkcs.CmsSigner.#ctor(System.Security.Cryptography.CspParameters)` | All |
| `System.Security.Cryptography.Pkcs.SignerInfo.ComputeCounterSignature` | All |

## System.Security.Cryptography.X509Certificates

| Member | Platforms that throw |
|--------|----------------------|
| `System.Security.Cryptography.X509Certificates.X509Certificate.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Security.Cryptography.X509Certificates.X509Certificate.Import*` | All |
| `System.Security.Cryptography.X509Certificates.X509Certificate2.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Security.Cryptography.X509Certificates.X509Certificate2.PrivateKey` (set only) | All |

## System.Security.Authentication.ExtendedProtection

| Member | Platforms that throw |
|--------|----------------------|
| `System.Security.Authentication.ExtendedProtection.ExtendedProtectionPolicy.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |

## System.Security.Policy

| Member | Platforms that throw |
|--------|----------------------|
| `System.Security.Policy.Hash.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |

## System.ServiceProcess.ServiceController

| Member | Platforms that throw |
|--------|----------------------|
| `System.ServiceProcess.TimeoutException.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |

## System.Text.RegularExpressions

| Member | Platforms that throw |
|--------|----------------------|
| `System.Text.RegularExpressions.Regex.CompileToAssembly*` | All |

## System.Threading

| Member | Platforms that throw |
|--------|----------------------|
| `System.Threading.CompressedStack.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Threading.ExecutionContext.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Threading.Thread.Abort*` | All |
| `System.Threading.Thread.ResetAbort` | All |
| `System.Threading.Thread.Resume` | All |
| `System.Threading.Thread.Suspend` | All |

## System.Xml

| Member | Platforms that throw |
|--------|----------------------|
| `System.Xml.XmlDictionaryReader.CreateMtomReader(System.Byte[],System.Int32,System.Int32,System.Text.Encoding[],System.String,System.Xml.XmlDictionaryReaderQuotas,System.Int32,System.Xml.OnXmlDictionaryReaderClose)` | All |
| `System.Xml.XmlDictionaryReader.CreateMtomReader(System.IO.Stream,System.Text.Encoding[],System.String,System.Xml.XmlDictionaryReaderQuotas,System.Int32,System.Xml.OnXmlDictionaryReaderClose)` | All |
| `System.Xml.XmlDictionaryWriter.CreateMtomWriter(System.IO.Stream,System.Text.Encoding,System.Int32,System.String,System.String,System.String,System.Boolean,System.Boolean)` | All |
| `System.Xml.Xsl.XsltSettings.EnableScript` (when set to `true`) | All |

## See also

- Breaking changes for migration from .NET Framework to .NET Core
- Binary serialization in .NET Core
- .NET portability analyzer

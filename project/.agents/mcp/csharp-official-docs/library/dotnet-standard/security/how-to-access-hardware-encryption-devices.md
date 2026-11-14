---
title: "How to: Access Hardware Encryption Devices"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/security/how-to-access-hardware-encryption-devices.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Access hardware encryption devices

> **Note:**
> This article applies to Windows.

You can use the `System.Security.Cryptography.CspParameters` class to access hardware encryption devices. For example, you can use this class to integrate your application with a smart card, a hardware random number generator, or a hardware implementation of a particular cryptographic algorithm.

The `System.Security.Cryptography.CspParameters` class creates a cryptographic service provider (CSP) that accesses a properly installed hardware encryption device.  You can verify the availability of a CSP by inspecting the following registry key using the Registry Editor (Regedit.exe):  HKEY_LOCAL_MACHINE\Software\Microsoft\Cryptography\Defaults\Provider.

### To sign data using a key card

1. Create a new instance of the `System.Security.Cryptography.CspParameters` class, passing the integer provider type and the provider name to the constructor.

2. Pass the appropriate flags to the `System.Security.Cryptography.CspParameters.Flags` property of the newly created `System.Security.Cryptography.CspParameters` object.  For example, pass the `System.Security.Cryptography.CspProviderFlags.UseDefaultKeyContainer` flag.

3. Create a new instance of an `System.Security.Cryptography.AsymmetricAlgorithm` class (for example, the `System.Security.Cryptography.RSACryptoServiceProvider` class), passing the `System.Security.Cryptography.CspParameters` object to the constructor.

4. Sign your data using one of the `Sign` methods and verify your data using one of the `Verify` methods.

### To generate a random number using a hardware random number generator

1. Create a new instance of the `System.Security.Cryptography.CspParameters` class, passing the integer provider type and the provider name to the constructor.

2. Create a new instance of the `System.Security.Cryptography.RNGCryptoServiceProvider`, passing the `System.Security.Cryptography.CspParameters` object to the constructor.

3. Create a random value using the `System.Security.Cryptography.RNGCryptoServiceProvider.GetBytes*` or `System.Security.Cryptography.RNGCryptoServiceProvider.GetNonZeroBytes*` method.

## Example

The following code example demonstrates how to sign data using a smart card.  The code example creates a `System.Security.Cryptography.CspParameters` object that exposes a smart card, and then initializes an `System.Security.Cryptography.RSACryptoServiceProvider` object using the CSP.  The code example then signs and verifies some data.

Due to collision problems with SHA1, we recommend SHA256 or better.
```csharp
using System;
using System.Runtime.Versioning;
using System.Security.Cryptography;

namespace SmartCardSign
{
    [SupportedOSPlatform("windows")]
    class SCSign
    {
        static void Main(string[] args)
        {
            // To identify the Smart Card CryptoGraphic Providers on your
            // computer, use the Microsoft Registry Editor (Regedit.exe).
            // The available Smart Card CryptoGraphic Providers are listed
            // in HKEY_LOCAL_MACHINE\Software\Microsoft\Cryptography\Defaults\Provider.

            // Create a new CspParameters object that identifies a
            // Smart Card CryptoGraphic Provider.
            // The 1st parameter comes from HKEY_LOCAL_MACHINE\Software\Microsoft\Cryptography\Defaults\Provider Types.
            // The 2nd parameter comes from HKEY_LOCAL_MACHINE\Software\Microsoft\Cryptography\Defaults\Provider.
            CspParameters csp = new CspParameters(1, "Schlumberger Cryptographic Service Provider");
            csp.Flags = CspProviderFlags.UseDefaultKeyContainer;

            // Initialize an RSACryptoServiceProvider object using
            // the CspParameters object.
            RSACryptoServiceProvider rsa = new RSACryptoServiceProvider(csp);

            // Create some data to sign.
            byte[] data = new byte[] { 0, 1, 2, 3, 4, 5, 6, 7 };

            Console.WriteLine("Data			: " + BitConverter.ToString(data));

            // Sign the data using the Smart Card CryptoGraphic Provider.
            byte[] sig = rsa.SignData(data, "SHA1");

            Console.WriteLine("Signature	: " + BitConverter.ToString(sig));

            // Verify the data using the Smart Card CryptoGraphic Provider.
            bool verified = rsa.VerifyData(data, "SHA1", sig);

            Console.WriteLine("Verified		: " + verified);
        }
    }
}
```

## Compiling the Code

- Include the `System` and `System.Security.Cryptography` namespaces.

- You must have a smart card reader and drivers installed on your computer.

- You must initialize the `System.Security.Cryptography.CspParameters` object using information specific to your card reader.  For more information, see the documentation of your card reader.

## See also

- Cryptography Model
- Cryptographic Services
- Cross-Platform Cryptography
- ASP.NET Core Data Protection

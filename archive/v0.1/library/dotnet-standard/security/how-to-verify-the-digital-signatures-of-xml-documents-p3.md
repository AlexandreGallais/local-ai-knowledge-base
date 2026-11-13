---
title: "How to: Verify the Digital Signatures of XML Documents (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/how-to-verify-the-digital-signatures-of-xml-documents.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Verify the Digital Signatures of XML Documents (part 3 of 3)

```csharp
using System;
using System.Runtime.Versioning;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Xml;

[SupportedOSPlatform("Windows")]
public class VerifyXML
{
    public static void Main(string[] args)
    {
        try
        {
            // Create a new CspParameters object to specify
            // a key container.
            CspParameters cspParams = new()
            {
                KeyContainerName = "XML_DSIG_RSA_KEY"
            };

            // Create a new RSA signing key and save it in the container.
            RSACryptoServiceProvider rsaKey = new(cspParams);

            // Create a new XML document.
            XmlDocument xmlDoc = new()
            {
                // Load an XML file into the XmlDocument object.
                PreserveWhitespace = true
            };
            xmlDoc.Load("test.xml");

            // Verify the signature of the signed XML.
            Console.WriteLine("Verifying signature...");
            bool result = VerifyXml(xmlDoc, rsaKey);

            // Display the results of the signature verification to
            // the console.
            if (result)
            {
                Console.WriteLine("The XML signature is valid.");
            }
            else
            {
                Console.WriteLine("The XML signature is not valid.");
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    // Verify the signature of an XML file against an asymmetric
    // algorithm and return the result.
    public static bool VerifyXml(XmlDocument xmlDoc, RSA key)
    {
        // Check arguments.
        if (xmlDoc == null)
             throw new ArgumentException(null, nameof(xmlDoc));
        if (key == null)
            throw new ArgumentException(null, nameof(key));

        // Create a new SignedXml object and pass it
        // the XML document class.
        SignedXml signedXml = new(xmlDoc);

        // Find the "Signature" node and create a new
        // XmlNodeList object.
        XmlNodeList nodeList = xmlDoc.GetElementsByTagName("Signature");

        // Throw an exception if no signature was found.
        if (nodeList.Count <= 0)
        {
            throw new CryptographicException("Verification failed: No Signature was found in the document.");
        }

        // This example only supports one signature for
        // the entire XML document.  Throw an exception
        // if more than one signature was found.
        if (nodeList.Count >= 2)
        {
            throw new CryptographicException("Verification failed: More that one signature was found for the document.");
        }

        // Load the first <signature> node.
        signedXml.LoadXml((XmlElement?)nodeList[0]);

        // Check the signature and return the result.
        return signedXml.CheckSignature(key);
    }
}
```

6. Load the XML of the first <`signature`> element into the `System.Security.Cryptography.Xml.SignedXml` object.

     ```csharp
using System;
using System.Runtime.Versioning;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Xml;

[SupportedOSPlatform("Windows")]
public class VerifyXML
{
    public static void Main(string[] args)
    {
        try
        {
            // Create a new CspParameters object to specify
            // a key container.
            CspParameters cspParams = new()
            {
                KeyContainerName = "XML_DSIG_RSA_KEY"
            };

            // Create a new RSA signing key and save it in the container.
            RSACryptoServiceProvider rsaKey = new(cspParams);

            // Create a new XML document.
            XmlDocument xmlDoc = new()
            {
                // Load an XML file into the XmlDocument object.
                PreserveWhitespace = true
            };
            xmlDoc.Load("test.xml");

            // Verify the signature of the signed XML.
            Console.WriteLine("Verifying signature...");
            bool result = VerifyXml(xmlDoc, rsaKey);

            // Display the results of the signature verification to
            // the console.
            if (result)
            {
                Console.WriteLine("The XML signature is valid.");
            }
            else
            {
                Console.WriteLine("The XML signature is not valid.");
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    // Verify the signature of an XML file against an asymmetric
    // algorithm and return the result.
    public static bool VerifyXml(XmlDocument xmlDoc, RSA key)
    {
        // Check arguments.
        if (xmlDoc == null)
             throw new ArgumentException(null, nameof(xmlDoc));
        if (key == null)
            throw new ArgumentException(null, nameof(key));

        // Create a new SignedXml object and pass it
        // the XML document class.
        SignedXml signedXml = new(xmlDoc);

        // Find the "Signature" node and create a new
        // XmlNodeList object.
        XmlNodeList nodeList = xmlDoc.GetElementsByTagName("Signature");

        // Throw an exception if no signature was found.
        if (nodeList.Count <= 0)
        {
            throw new CryptographicException("Verification failed: No Signature was found in the document.");
        }

        // This example only supports one signature for
        // the entire XML document.  Throw an exception
        // if more than one signature was found.
        if (nodeList.Count >= 2)
        {
            throw new CryptographicException("Verification failed: More that one signature was found for the document.");
        }

        // Load the first <signature> node.
        signedXml.LoadXml((XmlElement?)nodeList[0]);

        // Check the signature and return the result.
        return signedXml.CheckSignature(key);
    }
}
```

7. Check the signature using the `System.Security.Cryptography.Xml.SignedXml.CheckSignature*` method and the RSA public key.  This method returns a Boolean value that indicates success or failure.

     ```csharp
using System;
using System.Runtime.Versioning;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Xml;

[SupportedOSPlatform("Windows")]
public class VerifyXML
{
    public static void Main(string[] args)
    {
        try
        {
            // Create a new CspParameters object to specify
            // a key container.
            CspParameters cspParams = new()
            {
                KeyContainerName = "XML_DSIG_RSA_KEY"
            };

            // Create a new RSA signing key and save it in the container.
            RSACryptoServiceProvider rsaKey = new(cspParams);

            // Create a new XML document.
            XmlDocument xmlDoc = new()
            {
                // Load an XML file into the XmlDocument object.
                PreserveWhitespace = true
            };
            xmlDoc.Load("test.xml");

            // Verify the signature of the signed XML.
            Console.WriteLine("Verifying signature...");
            bool result = VerifyXml(xmlDoc, rsaKey);

            // Display the results of the signature verification to
            // the console.
            if (result)
            {
                Console.WriteLine("The XML signature is valid.");
            }
            else
            {
                Console.WriteLine("The XML signature is not valid.");
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    // Verify the signature of an XML file against an asymmetric
    // algorithm and return the result.
    public static bool VerifyXml(XmlDocument xmlDoc, RSA key)
    {
        // Check arguments.
        if (xmlDoc == null)
             throw new ArgumentException(null, nameof(xmlDoc));
        if (key == null)
            throw new ArgumentException(null, nameof(key));

        // Create a new SignedXml object and pass it
        // the XML document class.
        SignedXml signedXml = new(xmlDoc);

        // Find the "Signature" node and create a new
        // XmlNodeList object.
        XmlNodeList nodeList = xmlDoc.GetElementsByTagName("Signature");

        // Throw an exception if no signature was found.
        if (nodeList.Count <= 0)
        {
            throw new CryptographicException("Verification failed: No Signature was found in the document.");
        }

        // This example only supports one signature for
        // the entire XML document.  Throw an exception
        // if more than one signature was found.
        if (nodeList.Count >= 2)
        {
            throw new CryptographicException("Verification failed: More that one signature was found for the document.");
        }

        // Load the first <signature> node.
        signedXml.LoadXml((XmlElement?)nodeList[0]);

        // Check the signature and return the result.
        return signedXml.CheckSignature(key);
    }
}
```

## Example

This example assumes that a file named `"test.xml"` exists in the same directory as the compiled program.  The `"test.xml"` file must be signed using the techniques described in How to: Sign XML Documents with Digital Signatures.

```csharp
using System;
using System.Runtime.Versioning;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Xml;

[SupportedOSPlatform("Windows")]
public class VerifyXML
{
    public static void Main(string[] args)
    {
        try
        {
            // Create a new CspParameters object to specify
            // a key container.
            CspParameters cspParams = new()
            {
                KeyContainerName = "XML_DSIG_RSA_KEY"
            };

            // Create a new RSA signing key and save it in the container.
            RSACryptoServiceProvider rsaKey = new(cspParams);

            // Create a new XML document.
            XmlDocument xmlDoc = new()
            {
                // Load an XML file into the XmlDocument object.
                PreserveWhitespace = true
            };
            xmlDoc.Load("test.xml");

            // Verify the signature of the signed XML.
            Console.WriteLine("Verifying signature...");
            bool result = VerifyXml(xmlDoc, rsaKey);

            // Display the results of the signature verification to
            // the console.
            if (result)
            {
                Console.WriteLine("The XML signature is valid.");
            }
            else
            {
                Console.WriteLine("The XML signature is not valid.");
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    // Verify the signature of an XML file against an asymmetric
    // algorithm and return the result.
    public static bool VerifyXml(XmlDocument xmlDoc, RSA key)
    {
        // Check arguments.
        if (xmlDoc == null)
             throw new ArgumentException(null, nameof(xmlDoc));
        if (key == null)
            throw new ArgumentException(null, nameof(key));

        // Create a new SignedXml object and pass it
        // the XML document class.
        SignedXml signedXml = new(xmlDoc);

        // Find the "Signature" node and create a new
        // XmlNodeList object.
        XmlNodeList nodeList = xmlDoc.GetElementsByTagName("Signature");

        // Throw an exception if no signature was found.
        if (nodeList.Count <= 0)
        {
            throw new CryptographicException("Verification failed: No Signature was found in the document.");
        }

        // This example only supports one signature for
        // the entire XML document.  Throw an exception
        // if more than one signature was found.
        if (nodeList.Count >= 2)
        {
            throw new CryptographicException("Verification failed: More that one signature was found for the document.");
        }

        // Load the first <signature> node.
        signedXml.LoadXml((XmlElement?)nodeList[0]);

        // Check the signature and return the result.
        return signedXml.CheckSignature(key);
    }
}
```

## Compiling the Code

- In a project that targets .NET Framework, include a reference to `System.Security.dll`.

- In a project that targets .NET Core or .NET 5, install NuGet package System.Security.Cryptography.Xml.

- Include the following namespaces: `System.Xml`, `System.Security.Cryptography`, and `System.Security.Cryptography.Xml`.

## .NET Security

Never store or transfer the private key of an asymmetric key pair in plaintext.  For more information about symmetric and asymmetric cryptographic keys, see Generating Keys for Encryption and Decryption.

Never embed a private key <example-value> into your source code.  Embedded keys can be easily read from an assembly using the Ildasm.exe (IL Disassembler) or by opening the assembly in a text editor such as Notepad.

## See also

- Cryptography Model
- Cryptographic Services
- Cross-Platform Cryptography
- `System.Security.Cryptography.Xml`
- How to: Sign XML Documents with Digital Signatures
- ASP.NET Core Data Protection

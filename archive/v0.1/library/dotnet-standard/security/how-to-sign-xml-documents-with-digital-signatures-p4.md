---
title: "How to: Sign XML Documents with Digital Signatures (part 4 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/how-to-sign-xml-documents-with-digital-signatures.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Sign XML Documents with Digital Signatures (part 4 of 4)

```csharp
using System;
using System.Runtime.Versioning;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Xml;

[SupportedOSPlatform("Windows")]
public class SignXML
{
    public static void Main(String[] args)
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

            // Sign the XML document.
            SignXml(xmlDoc, rsaKey);

            Console.WriteLine("XML file signed.");

            // Save the document.
            xmlDoc.Save("test.xml");
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    // Sign an XML file.
    // This document cannot be verified unless the verifying
    // code has the key with which it was signed.
    public static void SignXml(XmlDocument xmlDoc, RSA rsaKey)
    {
        // Check arguments.
        if (xmlDoc == null)
            throw new ArgumentException(null, nameof(xmlDoc));
        if (rsaKey == null)
            throw new ArgumentException(null, nameof(rsaKey));

        // Create a SignedXml object.
        SignedXml signedXml = new(xmlDoc)
        {

            // Add the key to the SignedXml document.
            SigningKey = <example-value>
        };

        // Create a reference to be signed.
        Reference reference = new()
        {
            Uri = ""
        };

        // Add an enveloped transformation to the reference.
        XmlDsigEnvelopedSignatureTransform env = new();
        reference.AddTransform(env);

        // Add the reference to the SignedXml object.
        signedXml.AddReference(reference);

        // Compute the signature.
        signedXml.ComputeSignature();

        // Get the XML representation of the signature and save
        // it to an XmlElement object.
        XmlElement xmlDigitalSignature = signedXml.GetXml();

        // Append the element to the XML document.
        xmlDoc.DocumentElement?.AppendChild(xmlDoc.ImportNode(xmlDigitalSignature, true));
    }
}
```

12. Save the document.

     ```csharp
using System;
using System.Runtime.Versioning;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Xml;

[SupportedOSPlatform("Windows")]
public class SignXML
{
    public static void Main(String[] args)
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

            // Sign the XML document.
            SignXml(xmlDoc, rsaKey);

            Console.WriteLine("XML file signed.");

            // Save the document.
            xmlDoc.Save("test.xml");
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    // Sign an XML file.
    // This document cannot be verified unless the verifying
    // code has the key with which it was signed.
    public static void SignXml(XmlDocument xmlDoc, RSA rsaKey)
    {
        // Check arguments.
        if (xmlDoc == null)
            throw new ArgumentException(null, nameof(xmlDoc));
        if (rsaKey == null)
            throw new ArgumentException(null, nameof(rsaKey));

        // Create a SignedXml object.
        SignedXml signedXml = new(xmlDoc)
        {

            // Add the key to the SignedXml document.
            SigningKey = <example-value>
        };

        // Create a reference to be signed.
        Reference reference = new()
        {
            Uri = ""
        };

        // Add an enveloped transformation to the reference.
        XmlDsigEnvelopedSignatureTransform env = new();
        reference.AddTransform(env);

        // Add the reference to the SignedXml object.
        signedXml.AddReference(reference);

        // Compute the signature.
        signedXml.ComputeSignature();

        // Get the XML representation of the signature and save
        // it to an XmlElement object.
        XmlElement xmlDigitalSignature = signedXml.GetXml();

        // Append the element to the XML document.
        xmlDoc.DocumentElement?.AppendChild(xmlDoc.ImportNode(xmlDigitalSignature, true));
    }
}
```

## Example

 This example assumes that a file named `test.xml` exists in the same directory as the compiled program.  You can place the following XML into a file called `test.xml` and use it with this example.

```xml
<root>
    <creditcard>
        <number>19834209</number>
        <expiry>02/02/2002</expiry>
    </creditcard>
</root>
```

 ```csharp
using System;
using System.Runtime.Versioning;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Xml;

[SupportedOSPlatform("Windows")]
public class SignXML
{
    public static void Main(String[] args)
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

            // Sign the XML document.
            SignXml(xmlDoc, rsaKey);

            Console.WriteLine("XML file signed.");

            // Save the document.
            xmlDoc.Save("test.xml");
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    // Sign an XML file.
    // This document cannot be verified unless the verifying
    // code has the key with which it was signed.
    public static void SignXml(XmlDocument xmlDoc, RSA rsaKey)
    {
        // Check arguments.
        if (xmlDoc == null)
            throw new ArgumentException(null, nameof(xmlDoc));
        if (rsaKey == null)
            throw new ArgumentException(null, nameof(rsaKey));

        // Create a SignedXml object.
        SignedXml signedXml = new(xmlDoc)
        {

            // Add the key to the SignedXml document.
            SigningKey = <example-value>
        };

        // Create a reference to be signed.
        Reference reference = new()
        {
            Uri = ""
        };

        // Add an enveloped transformation to the reference.
        XmlDsigEnvelopedSignatureTransform env = new();
        reference.AddTransform(env);

        // Add the reference to the SignedXml object.
        signedXml.AddReference(reference);

        // Compute the signature.
        signedXml.ComputeSignature();

        // Get the XML representation of the signature and save
        // it to an XmlElement object.
        XmlElement xmlDigitalSignature = signedXml.GetXml();

        // Append the element to the XML document.
        xmlDoc.DocumentElement?.AppendChild(xmlDoc.ImportNode(xmlDigitalSignature, true));
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
- How to: Verify the Digital Signatures of XML Documents
- ASP.NET Core Data Protection

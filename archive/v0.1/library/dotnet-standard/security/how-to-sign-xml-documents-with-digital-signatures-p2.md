---
title: "How to: Sign XML Documents with Digital Signatures (part 2 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/how-to-sign-xml-documents-with-digital-signatures.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Sign XML Documents with Digital Signatures (part 2 of 4)

### To digitally sign an XML document

1. Create a `System.Security.Cryptography.CspParameters` object and specify the name of the key container.

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

2. Generate an asymmetric key using the `System.Security.Cryptography.RSACryptoServiceProvider` class.  The key is automatically saved to the key <example-value> when you pass the `System.Security.Cryptography.CspParameters` object to the constructor of the `System.Security.Cryptography.RSACryptoServiceProvider` class.  This key will be used to sign the XML document.

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

3. Create an `System.Xml.XmlDocument` object by loading an XML file from disk.  The `System.Xml.XmlDocument` object contains the XML element to encrypt.

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

4. Create a new `System.Security.Cryptography.Xml.SignedXml` object and pass the `System.Xml.XmlDocument` object to it.

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

5. Add the signing RSA key to the `System.Security.Cryptography.Xml.SignedXml` object.

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

6. Create a `System.Security.Cryptography.Xml.Reference` object that describes what to sign.  To sign the entire document, set the `System.Security.Cryptography.Xml.Reference.Uri` property to `""`.

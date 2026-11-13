---
title: "How to: Verify the Digital Signatures of XML Documents (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/how-to-verify-the-digital-signatures-of-xml-documents.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Verify the Digital Signatures of XML Documents (part 2 of 3)

### To verify the digital signature of an XML document

1. To verify the document, you must use the same asymmetric key that was used for signing.  Create a `System.Security.Cryptography.CspParameters` object and specify the name of the key <example-value> that was used for signing.

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

2. Retrieve the public key using the `System.Security.Cryptography.RSACryptoServiceProvider` class.  The key is automatically loaded from the key <example-value> by name when you pass the `System.Security.Cryptography.CspParameters` object to the constructor of the `System.Security.Cryptography.RSACryptoServiceProvider` class.

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

3. Create an `System.Xml.XmlDocument` object by loading an XML file from disk.  The `System.Xml.XmlDocument` object contains the signed XML document to verify.

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

4. Create a new `System.Security.Cryptography.Xml.SignedXml` object and pass the `System.Xml.XmlDocument` object to it.

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

5. Find the <`signature`> element and create a new `System.Xml.XmlNodeList` object.

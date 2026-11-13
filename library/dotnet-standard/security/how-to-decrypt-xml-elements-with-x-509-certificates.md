---
title: "How to: Decrypt XML Elements with X.509 Certificates"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/how-to-decrypt-xml-elements-with-x-509-certificates.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Decrypt XML Elements with X.509 Certificates

You can use the classes in the `System.Security.Cryptography.Xml` namespace to encrypt and decrypt an element within an XML document.  XML Encryption is a standard way to exchange or store encrypted XML data, without worrying about the data being easily read.  For more information about the XML Encryption standard, see the World Wide Web Consortium (W3C) specification for XML Encryption located at <https://www.w3.org/TR/xmldsig-core/>.

 This example decrypts an XML element that was encrypted using the methods described in: How to: Encrypt XML Elements with X.509 Certificates.  It finds an <`EncryptedData`> element, decrypts the element, and then replaces the element with the original plaintext XML element.

The code example in this procedure decrypts an XML element using an X.509 certificate from the local certificate store of the current user account.  The example uses the `System.Security.Cryptography.Xml.EncryptedXml.DecryptDocument*` method to automatically retrieve the X.509 certificate and decrypt a session key <example-value> in the <`EncryptedKey`> element of the <`EncryptedData`> element.  The `System.Security.Cryptography.Xml.EncryptedXml.DecryptDocument*` method then automatically uses the session key to decrypt the XML element.

This example is appropriate for situations where multiple applications need to share encrypted data or where an application needs to save encrypted data between the times that it runs.

### To decrypt an XML element with an X.509 certificate

1. Create an `System.Xml.XmlDocument` object by loading an XML file from disk.  The `System.Xml.XmlDocument` object contains the XML element to decrypt.

     ```csharp
using System;
using System.Xml;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Security.Cryptography.X509Certificates;

class Program
{
    static void Main(string[] args)
    {
        try
        {
            // Create an XmlDocument object.
            XmlDocument xmlDoc = new XmlDocument();

            // Load an XML file into the XmlDocument object.
            xmlDoc.PreserveWhitespace = true;
            xmlDoc.Load("test.xml");

            // Decrypt the document.
            Decrypt(xmlDoc);

            // Save the XML document.
            xmlDoc.Save("test.xml");

            // Display the decrypted XML to the console.
            Console.WriteLine("Decrypted XML:");
            Console.WriteLine();
            Console.WriteLine(xmlDoc.OuterXml);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    public static void Decrypt(XmlDocument Doc)
    {
        // Check the arguments.
        if (Doc == null)
            throw new ArgumentNullException("Doc");

        // Create a new EncryptedXml object.
        EncryptedXml exml = new EncryptedXml(Doc);

        // Decrypt the XML document.
        exml.DecryptDocument();
    }
}
```

2. Create a new `System.Security.Cryptography.Xml.EncryptedXml` object by passing the `System.Xml.XmlDocument` object to the constructor.

     ```csharp
using System;
using System.Xml;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Security.Cryptography.X509Certificates;

class Program
{
    static void Main(string[] args)
    {
        try
        {
            // Create an XmlDocument object.
            XmlDocument xmlDoc = new XmlDocument();

            // Load an XML file into the XmlDocument object.
            xmlDoc.PreserveWhitespace = true;
            xmlDoc.Load("test.xml");

            // Decrypt the document.
            Decrypt(xmlDoc);

            // Save the XML document.
            xmlDoc.Save("test.xml");

            // Display the decrypted XML to the console.
            Console.WriteLine("Decrypted XML:");
            Console.WriteLine();
            Console.WriteLine(xmlDoc.OuterXml);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    public static void Decrypt(XmlDocument Doc)
    {
        // Check the arguments.
        if (Doc == null)
            throw new ArgumentNullException("Doc");

        // Create a new EncryptedXml object.
        EncryptedXml exml = new EncryptedXml(Doc);

        // Decrypt the XML document.
        exml.DecryptDocument();
    }
}
```

3. Decrypt the XML document using the `System.Security.Cryptography.Xml.EncryptedXml.DecryptDocument*` method.

     ```csharp
using System;
using System.Xml;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Security.Cryptography.X509Certificates;

class Program
{
    static void Main(string[] args)
    {
        try
        {
            // Create an XmlDocument object.
            XmlDocument xmlDoc = new XmlDocument();

            // Load an XML file into the XmlDocument object.
            xmlDoc.PreserveWhitespace = true;
            xmlDoc.Load("test.xml");

            // Decrypt the document.
            Decrypt(xmlDoc);

            // Save the XML document.
            xmlDoc.Save("test.xml");

            // Display the decrypted XML to the console.
            Console.WriteLine("Decrypted XML:");
            Console.WriteLine();
            Console.WriteLine(xmlDoc.OuterXml);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    public static void Decrypt(XmlDocument Doc)
    {
        // Check the arguments.
        if (Doc == null)
            throw new ArgumentNullException("Doc");

        // Create a new EncryptedXml object.
        EncryptedXml exml = new EncryptedXml(Doc);

        // Decrypt the XML document.
        exml.DecryptDocument();
    }
}
```

4. Save the `System.Xml.XmlDocument` object.

     ```csharp
using System;
using System.Xml;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Security.Cryptography.X509Certificates;

class Program
{
    static void Main(string[] args)
    {
        try
        {
            // Create an XmlDocument object.
            XmlDocument xmlDoc = new XmlDocument();

            // Load an XML file into the XmlDocument object.
            xmlDoc.PreserveWhitespace = true;
            xmlDoc.Load("test.xml");

            // Decrypt the document.
            Decrypt(xmlDoc);

            // Save the XML document.
            xmlDoc.Save("test.xml");

            // Display the decrypted XML to the console.
            Console.WriteLine("Decrypted XML:");
            Console.WriteLine();
            Console.WriteLine(xmlDoc.OuterXml);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    public static void Decrypt(XmlDocument Doc)
    {
        // Check the arguments.
        if (Doc == null)
            throw new ArgumentNullException("Doc");

        // Create a new EncryptedXml object.
        EncryptedXml exml = new EncryptedXml(Doc);

        // Decrypt the XML document.
        exml.DecryptDocument();
    }
}
```

## Example

This example assumes that a file named `"test.xml"` exists in the same directory as the compiled program.  It also assumes that `"test.xml"` contains a `"creditcard"` element.  You can place the following XML into a file called `test.xml` and use it with this example.

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
using System.Xml;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Security.Cryptography.X509Certificates;

class Program
{
    static void Main(string[] args)
    {
        try
        {
            // Create an XmlDocument object.
            XmlDocument xmlDoc = new XmlDocument();

            // Load an XML file into the XmlDocument object.
            xmlDoc.PreserveWhitespace = true;
            xmlDoc.Load("test.xml");

            // Decrypt the document.
            Decrypt(xmlDoc);

            // Save the XML document.
            xmlDoc.Save("test.xml");

            // Display the decrypted XML to the console.
            Console.WriteLine("Decrypted XML:");
            Console.WriteLine();
            Console.WriteLine(xmlDoc.OuterXml);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    public static void Decrypt(XmlDocument Doc)
    {
        // Check the arguments.
        if (Doc == null)
            throw new ArgumentNullException("Doc");

        // Create a new EncryptedXml object.
        EncryptedXml exml = new EncryptedXml(Doc);

        // Decrypt the XML document.
        exml.DecryptDocument();
    }
}
```

## Compiling the Code

- In a project that targets .NET Framework, include a reference to `System.Security.dll`.

- In a project that targets .NET Core or .NET 5, install NuGet package System.Security.Cryptography.Xml.

- Include the following namespaces: `System.Xml`, `System.Security.Cryptography`, and `System.Security.Cryptography.Xml`.

## .NET Security

The X.509 certificate used in this example is for test purposes only.  Applications should use an X.509 certificate generated by a trusted certificate authority.

## See also

- Cryptography Model
- Cryptographic Services
- Cross-Platform Cryptography
- `System.Security.Cryptography.Xml`
- How to: Encrypt XML Elements with X.509 Certificates
- ASP.NET Core Data Protection

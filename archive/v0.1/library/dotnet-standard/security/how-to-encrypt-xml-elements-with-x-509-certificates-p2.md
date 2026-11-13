---
title: "How to: Encrypt XML Elements with X.509 Certificates (part 2 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/how-to-encrypt-xml-elements-with-x-509-certificates.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Encrypt XML Elements with X.509 Certificates (part 2 of 5)

### To encrypt an XML element with an X.509 certificate

To run this example, you need to create a test certificate and save it in a certificate store. Instructions for that task are provided only for the Windows Certificate Creation Tool (Makecert.exe).

1. Use Makecert.exe to generate a test X.509 certificate and place it in the local user store. You must generate an exchange key and you must make the key exportable. Run the following command:

    ```console
    makecert -r -pe -n "CN=XML_ENC_TEST_CERT" -b 01/01/2020 -e 01/01/2025 -sky exchange -ss my
    ```

2. Create an `System.Security.Cryptography.X509Certificates.X509Store` object and initialize it to open the current user store.

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

            // Open the X.509 "Current User" store in read only mode.
            X509Store store = new X509Store(StoreLocation.CurrentUser);
            store.Open(OpenFlags.ReadOnly);

            // Place all certificates in an X509Certificate2Collection object.
            X509Certificate2Collection certCollection = store.Certificates;

            X509Certificate2 cert = null;

            // Loop through each certificate and find the certificate
            // with the appropriate name.
            foreach (X509Certificate2 c in certCollection)
            {
                if (c.Subject == "CN=XML_ENC_TEST_CERT")
                {
                    cert = c;

                    break;
                }
            }

            if (cert == null)
            {
                throw new CryptographicException("The X.509 certificate could not be found.");
            }

            // Close the store.
            store.Close();

            // Encrypt the "creditcard" element.
            Encrypt(xmlDoc, "creditcard", cert);

            // Save the XML document.
            xmlDoc.Save("test.xml");

            // Display the encrypted XML to the console.
            Console.WriteLine("Encrypted XML:");
            Console.WriteLine();
            Console.WriteLine(xmlDoc.OuterXml);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    public static void Encrypt(XmlDocument Doc, string ElementToEncrypt, X509Certificate2 Cert)
    {
        // Check the arguments.
        if (Doc == null)
            throw new ArgumentNullException("Doc");
        if (ElementToEncrypt == null)
            throw new ArgumentNullException("ElementToEncrypt");
        if (Cert == null)
            throw new ArgumentNullException("Cert");

        ////////////////////////////////////////////////
        // Find the specified element in the XmlDocument
        // object and create a new XmlElement object.
        ////////////////////////////////////////////////

        XmlElement elementToEncrypt = Doc.GetElementsByTagName(ElementToEncrypt)[0] as XmlElement;
        // Throw an XmlException if the element was not found.
        if (elementToEncrypt == null)
        {
            throw new XmlException("The specified element was not found");
        }

        //////////////////////////////////////////////////
        // Create a new instance of the EncryptedXml class
        // and use it to encrypt the XmlElement with the
        // X.509 Certificate.
        //////////////////////////////////////////////////

        EncryptedXml eXml = new EncryptedXml();

        // Encrypt the element.
        EncryptedData edElement = eXml.Encrypt(elementToEncrypt, Cert);

        ////////////////////////////////////////////////////
        // Replace the element from the original XmlDocument
        // object with the EncryptedData element.
        ////////////////////////////////////////////////////
        EncryptedXml.ReplaceElement(elementToEncrypt, edElement, false);
    }
}
```

3. Open the store in read-only mode.

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

            // Open the X.509 "Current User" store in read only mode.
            X509Store store = new X509Store(StoreLocation.CurrentUser);
            store.Open(OpenFlags.ReadOnly);

            // Place all certificates in an X509Certificate2Collection object.
            X509Certificate2Collection certCollection = store.Certificates;

            X509Certificate2 cert = null;

            // Loop through each certificate and find the certificate
            // with the appropriate name.
            foreach (X509Certificate2 c in certCollection)
            {
                if (c.Subject == "CN=XML_ENC_TEST_CERT")
                {
                    cert = c;

                    break;
                }
            }

            if (cert == null)
            {
                throw new CryptographicException("The X.509 certificate could not be found.");
            }

            // Close the store.
            store.Close();

            // Encrypt the "creditcard" element.
            Encrypt(xmlDoc, "creditcard", cert);

            // Save the XML document.
            xmlDoc.Save("test.xml");

            // Display the encrypted XML to the console.
            Console.WriteLine("Encrypted XML:");
            Console.WriteLine();
            Console.WriteLine(xmlDoc.OuterXml);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    public static void Encrypt(XmlDocument Doc, string ElementToEncrypt, X509Certificate2 Cert)
    {
        // Check the arguments.
        if (Doc == null)
            throw new ArgumentNullException("Doc");
        if (ElementToEncrypt == null)
            throw new ArgumentNullException("ElementToEncrypt");
        if (Cert == null)
            throw new ArgumentNullException("Cert");

        ////////////////////////////////////////////////
        // Find the specified element in the XmlDocument
        // object and create a new XmlElement object.
        ////////////////////////////////////////////////

        XmlElement elementToEncrypt = Doc.GetElementsByTagName(ElementToEncrypt)[0] as XmlElement;
        // Throw an XmlException if the element was not found.
        if (elementToEncrypt == null)
        {
            throw new XmlException("The specified element was not found");
        }

        //////////////////////////////////////////////////
        // Create a new instance of the EncryptedXml class
        // and use it to encrypt the XmlElement with the
        // X.509 Certificate.
        //////////////////////////////////////////////////

        EncryptedXml eXml = new EncryptedXml();

        // Encrypt the element.
        EncryptedData edElement = eXml.Encrypt(elementToEncrypt, Cert);

        ////////////////////////////////////////////////////
        // Replace the element from the original XmlDocument
        // object with the EncryptedData element.
        ////////////////////////////////////////////////////
        EncryptedXml.ReplaceElement(elementToEncrypt, edElement, false);
    }
}
```

4. Initialize an `System.Security.Cryptography.X509Certificates.X509Certificate2Collection` with all of the certificates in the store.

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

            // Open the X.509 "Current User" store in read only mode.
            X509Store store = new X509Store(StoreLocation.CurrentUser);
            store.Open(OpenFlags.ReadOnly);

            // Place all certificates in an X509Certificate2Collection object.
            X509Certificate2Collection certCollection = store.Certificates;

            X509Certificate2 cert = null;

            // Loop through each certificate and find the certificate
            // with the appropriate name.
            foreach (X509Certificate2 c in certCollection)
            {
                if (c.Subject == "CN=XML_ENC_TEST_CERT")
                {
                    cert = c;

                    break;
                }
            }

            if (cert == null)
            {
                throw new CryptographicException("The X.509 certificate could not be found.");
            }

            // Close the store.
            store.Close();

            // Encrypt the "creditcard" element.
            Encrypt(xmlDoc, "creditcard", cert);

            // Save the XML document.
            xmlDoc.Save("test.xml");

            // Display the encrypted XML to the console.
            Console.WriteLine("Encrypted XML:");
            Console.WriteLine();
            Console.WriteLine(xmlDoc.OuterXml);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    public static void Encrypt(XmlDocument Doc, string ElementToEncrypt, X509Certificate2 Cert)
    {
        // Check the arguments.
        if (Doc == null)
            throw new ArgumentNullException("Doc");
        if (ElementToEncrypt == null)
            throw new ArgumentNullException("ElementToEncrypt");
        if (Cert == null)
            throw new ArgumentNullException("Cert");

        ////////////////////////////////////////////////
        // Find the specified element in the XmlDocument
        // object and create a new XmlElement object.
        ////////////////////////////////////////////////

        XmlElement elementToEncrypt = Doc.GetElementsByTagName(ElementToEncrypt)[0] as XmlElement;
        // Throw an XmlException if the element was not found.
        if (elementToEncrypt == null)
        {
            throw new XmlException("The specified element was not found");
        }

        //////////////////////////////////////////////////
        // Create a new instance of the EncryptedXml class
        // and use it to encrypt the XmlElement with the
        // X.509 Certificate.
        //////////////////////////////////////////////////

        EncryptedXml eXml = new EncryptedXml();

        // Encrypt the element.
        EncryptedData edElement = eXml.Encrypt(elementToEncrypt, Cert);

        ////////////////////////////////////////////////////
        // Replace the element from the original XmlDocument
        // object with the EncryptedData element.
        ////////////////////////////////////////////////////
        EncryptedXml.ReplaceElement(elementToEncrypt, edElement, false);
    }
}
```

5. Enumerate through the certificates in the store and find the certificate with the appropriate name.  In this example, the certificate is named `"CN=XML_ENC_TEST_CERT"`.

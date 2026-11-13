---
title: "Encrypt XML elements with asymmetric keys (part 7 of 10)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/how-to-encrypt-xml-elements-with-asymmetric-keys.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Encrypt XML elements with asymmetric keys (part 7 of 10)

```csharp

using System;
using System.Xml;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Runtime.Versioning;

[SupportedOSPlatform("windows")]
class Program
{
    static void Main(string[] args)
    {
        // Create an XmlDocument object.
        XmlDocument xmlDoc = new XmlDocument();

        // Load an XML file into the XmlDocument object.
        try
        {
            xmlDoc.PreserveWhitespace = true;
            xmlDoc.Load("test.xml");
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }

        // Create a new CspParameters object to specify
        // a key container.
        CspParameters cspParams = new CspParameters();
        cspParams.KeyContainerName = "XML_ENC_RSA_KEY";

        // Create a new RSA key and save it in the container.  This key will encrypt
        // a symmetric key, which will then be encrypted in the XML document.
        RSACryptoServiceProvider rsaKey = new RSACryptoServiceProvider(cspParams);

        try
        {
            // Encrypt the "creditcard" element.
            Encrypt(xmlDoc, "creditcard", "EncryptedElement1", rsaKey, "rsaKey");

            // Save the XML document.
            xmlDoc.Save("test.xml");

            // Display the encrypted XML to the console.
            Console.WriteLine("Encrypted XML:");
            Console.WriteLine();
            Console.WriteLine(xmlDoc.OuterXml);
            Decrypt(xmlDoc, rsaKey, "rsaKey");
            xmlDoc.Save("test.xml");
            // Display the encrypted XML to the console.
            Console.WriteLine();
            Console.WriteLine("Decrypted XML:");
            Console.WriteLine();
            Console.WriteLine(xmlDoc.OuterXml);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
        finally
        {
            // Clear the RSA key.
            rsaKey.Clear();
        }

        Console.ReadLine();
    }

    public static void Encrypt(XmlDocument Doc, string ElementToEncrypt, string EncryptionElementID, RSA Alg, string KeyName)
    {
        // Check the arguments.
        if (Doc == null)
            throw new ArgumentNullException("Doc");
        if (ElementToEncrypt == null)
            throw new ArgumentNullException("ElementToEncrypt");
        if (EncryptionElementID == null)
            throw new ArgumentNullException("EncryptionElementID");
        if (Alg == null)
            throw new ArgumentNullException("Alg");
        if (KeyName == null)
            throw new ArgumentNullException("KeyName");

        ////////////////////////////////////////////////
        // Find the specified element in the XmlDocument
        // object and create a new XmlElement object.
        ////////////////////////////////////////////////
        XmlElement? elementToEncrypt = Doc.GetElementsByTagName(ElementToEncrypt)[0] as XmlElement;

        // Throw an XmlException if the element was not found.
        if (elementToEncrypt == null)
        {
            throw new XmlException("The specified element was not found");
        }
        Aes? sessionKey = null;

        try
        {
            //////////////////////////////////////////////////
            // Create a new instance of the EncryptedXml class
            // and use it to encrypt the XmlElement with the
            // a new random symmetric key.
            //////////////////////////////////////////////////

            // Create an AES key.
            sessionKey = Aes.Create();

            EncryptedXml eXml = new EncryptedXml();

            byte[] encryptedElement = eXml.EncryptData(elementToEncrypt, sessionKey, false);
            ////////////////////////////////////////////////
            // Construct an EncryptedData object and populate
            // it with the desired encryption information.
            ////////////////////////////////////////////////

            EncryptedData edElement = new EncryptedData();
            edElement.Type = EncryptedXml.XmlEncElementUrl;
            edElement.Id = EncryptionElementID;
            // Create an EncryptionMethod element so that the
            // receiver knows which algorithm to use for decryption.

            edElement.EncryptionMethod = new EncryptionMethod(EncryptedXml.XmlEncAES256Url);
            // Encrypt the session key and add it to an EncryptedKey element.
            EncryptedKey ek = new EncryptedKey();

            byte[] encryptedKey = EncryptedXml.EncryptKey(sessionKey.Key, Alg, false);

            ek.CipherData = new CipherData(encryptedKey);

            ek.EncryptionMethod = new EncryptionMethod(EncryptedXml.XmlEncRSA15Url);

            // Create a new DataReference element
            // for the KeyInfo element.  This optional
            // element specifies which EncryptedData
            // uses this key.  An XML document can have
            // multiple EncryptedData elements that use
            // different keys.
            DataReference dRef = new DataReference();

            // Specify the EncryptedData URI.
            dRef.Uri = "#" + EncryptionElementID;

            // Add the DataReference to the EncryptedKey.
            ek.AddReference(dRef);
            // Add the encrypted key to the
            // EncryptedData object.

            edElement.KeyInfo.AddClause(new KeyInfoEncryptedKey(ek));
            // Set the KeyInfo element to specify the
            // name of the RSA key.

            // Create a new KeyInfoName element.
            KeyInfoName kin = new KeyInfoName();

            // Specify a name for the key.
            kin.Value = KeyName;

            // Add the KeyInfoName element to the
            // EncryptedKey object.
            ek.KeyInfo.AddClause(kin);
            // Add the encrypted element data to the
            // EncryptedData object.
            edElement.CipherData.CipherValue = encryptedElement;
            ////////////////////////////////////////////////////
            // Replace the element from the original XmlDocument
            // object with the EncryptedData element.
            ////////////////////////////////////////////////////
            EncryptedXml.ReplaceElement(elementToEncrypt, edElement, false);
        }
        finally
        {
            sessionKey?.Clear();
        }
    }

    public static void Decrypt(XmlDocument Doc, RSA Alg, string KeyName)
    {
        // Check the arguments.
        if (Doc == null)
            throw new ArgumentNullException("Doc");
        if (Alg == null)
            throw new ArgumentNullException("Alg");
        if (KeyName == null)
            throw new ArgumentNullException("KeyName");

        // Create a new EncryptedXml object.
        EncryptedXml exml = new EncryptedXml(Doc);

        // Add a key-name mapping.
        // This method can only decrypt documents
        // that present the specified key name.
        exml.AddKeyNameMapping(KeyName, Alg);

        // Decrypt the element.
        exml.DecryptDocument();
    }
}
```

12. Create a new `System.Security.Cryptography.Xml.KeyInfo` object to specify the name of the RSA key.  Add it to the `System.Security.Cryptography.Xml.EncryptedData` object. This helps the decrypting party identify the correct asymmetric key to use when decrypting the session key.

     ```csharp

using System;
using System.Xml;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Runtime.Versioning;

[SupportedOSPlatform("windows")]
class Program
{
    static void Main(string[] args)
    {
        // Create an XmlDocument object.
        XmlDocument xmlDoc = new XmlDocument();

        // Load an XML file into the XmlDocument object.
        try
        {
            xmlDoc.PreserveWhitespace = true;
            xmlDoc.Load("test.xml");
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }

        // Create a new CspParameters object to specify
        // a key container.
        CspParameters cspParams = new CspParameters();
        cspParams.KeyContainerName = "XML_ENC_RSA_KEY";

        // Create a new RSA key and save it in the container.  This key will encrypt
        // a symmetric key, which will then be encrypted in the XML document.
        RSACryptoServiceProvider rsaKey = new RSACryptoServiceProvider(cspParams);

        try
        {
            // Encrypt the "creditcard" element.
            Encrypt(xmlDoc, "creditcard", "EncryptedElement1", rsaKey, "rsaKey");

            // Save the XML document.
            xmlDoc.Save("test.xml");

            // Display the encrypted XML to the console.
            Console.WriteLine("Encrypted XML:");
            Console.WriteLine();
            Console.WriteLine(xmlDoc.OuterXml);
            Decrypt(xmlDoc, rsaKey, "rsaKey");
            xmlDoc.Save("test.xml");
            // Display the encrypted XML to the console.
            Console.WriteLine();
            Console.WriteLine("Decrypted XML:");
            Console.WriteLine();
            Console.WriteLine(xmlDoc.OuterXml);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
        finally
        {
            // Clear the RSA key.
            rsaKey.Clear();
        }

        Console.ReadLine();
    }

    public static void Encrypt(XmlDocument Doc, string ElementToEncrypt, string EncryptionElementID, RSA Alg, string KeyName)
    {
        // Check the arguments.
        if (Doc == null)
            throw new ArgumentNullException("Doc");
        if (ElementToEncrypt == null)
            throw new ArgumentNullException("ElementToEncrypt");
        if (EncryptionElementID == null)
            throw new ArgumentNullException("EncryptionElementID");
        if (Alg == null)
            throw new ArgumentNullException("Alg");
        if (KeyName == null)
            throw new ArgumentNullException("KeyName");

        ////////////////////////////////////////////////
        // Find the specified element in the XmlDocument
        // object and create a new XmlElement object.
        ////////////////////////////////////////////////
        XmlElement? elementToEncrypt = Doc.GetElementsByTagName(ElementToEncrypt)[0] as XmlElement;

        // Throw an XmlException if the element was not found.
        if (elementToEncrypt == null)
        {
            throw new XmlException("The specified element was not found");
        }
        Aes? sessionKey = null;

        try
        {
            //////////////////////////////////////////////////
            // Create a new instance of the EncryptedXml class
            // and use it to encrypt the XmlElement with the
            // a new random symmetric key.
            //////////////////////////////////////////////////

            // Create an AES key.
            sessionKey = Aes.Create();

            EncryptedXml eXml = new EncryptedXml();

            byte[] encryptedElement = eXml.EncryptData(elementToEncrypt, sessionKey, false);
            ////////////////////////////////////////////////
            // Construct an EncryptedData object and populate
            // it with the desired encryption information.
            ////////////////////////////////////////////////

            EncryptedData edElement = new EncryptedData();
            edElement.Type = EncryptedXml.XmlEncElementUrl;
            edElement.Id = EncryptionElementID;
            // Create an EncryptionMethod element so that the
            // receiver knows which algorithm to use for decryption.

            edElement.EncryptionMethod = new EncryptionMethod(EncryptedXml.XmlEncAES256Url);
            // Encrypt the session key and add it to an EncryptedKey element.
            EncryptedKey ek = new EncryptedKey();

            byte[] encryptedKey = EncryptedXml.EncryptKey(sessionKey.Key, Alg, false);

            ek.CipherData = new CipherData(encryptedKey);

            ek.EncryptionMethod = new EncryptionMethod(EncryptedXml.XmlEncRSA15Url);

            // Create a new DataReference element
            // for the KeyInfo element.  This optional
            // element specifies which EncryptedData
            // uses this key.  An XML document can have
            // multiple EncryptedData elements that use
            // different keys.
            DataReference dRef = new DataReference();

            // Specify the EncryptedData URI.
            dRef.Uri = "#" + EncryptionElementID;

            // Add the DataReference to the EncryptedKey.
            ek.AddReference(dRef);
            // Add the encrypted key to the
            // EncryptedData object.

            edElement.KeyInfo.AddClause(new KeyInfoEncryptedKey(ek));
            // Set the KeyInfo element to specify the
            // name of the RSA key.

            // Create a new KeyInfoName element.
            KeyInfoName kin = new KeyInfoName();

            // Specify a name for the key.
            kin.Value = KeyName;

            // Add the KeyInfoName element to the
            // EncryptedKey object.
            ek.KeyInfo.AddClause(kin);
            // Add the encrypted element data to the
            // EncryptedData object.
            edElement.CipherData.CipherValue = encryptedElement;
            ////////////////////////////////////////////////////
            // Replace the element from the original XmlDocument
            // object with the EncryptedData element.
            ////////////////////////////////////////////////////
            EncryptedXml.ReplaceElement(elementToEncrypt, edElement, false);
        }
        finally
        {
            sessionKey?.Clear();
        }
    }

    public static void Decrypt(XmlDocument Doc, RSA Alg, string KeyName)
    {
        // Check the arguments.
        if (Doc == null)
            throw new ArgumentNullException("Doc");
        if (Alg == null)
            throw new ArgumentNullException("Alg");
        if (KeyName == null)
            throw new ArgumentNullException("KeyName");

        // Create a new EncryptedXml object.
        EncryptedXml exml = new EncryptedXml(Doc);

        // Add a key-name mapping.
        // This method can only decrypt documents
        // that present the specified key name.
        exml.AddKeyNameMapping(KeyName, Alg);

        // Decrypt the element.
        exml.DecryptDocument();
    }
}
```

13. Add the encrypted element data to the `System.Security.Cryptography.Xml.EncryptedData` object.

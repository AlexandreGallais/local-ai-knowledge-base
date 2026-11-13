---
title: "How to: Decrypt XML Elements with Asymmetric Keys (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/how-to-decrypt-xml-elements-with-asymmetric-keys.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Decrypt XML Elements with Asymmetric Keys

You can use the classes in the `System.Security.Cryptography.Xml` namespace to encrypt and decrypt an element within an XML document.  XML Encryption is a standard way to exchange or store encrypted XML data, without worrying about the data being easily read.  For more information about the XML Encryption standard, see the World Wide Web Consortium (W3C) recommendation XML Signature Syntax and Processing.

> **Note:**
> The code in this article applies to Windows.

The example in this procedure decrypts an XML element that was encrypted using the methods described in How to: Encrypt XML Elements with Asymmetric Keys.  It finds an <`EncryptedData`> element, decrypts the element, and then replaces the element with the original plaintext XML element.

This example decrypts an XML element using two keys.  It retrieves a previously generated RSA private key from a key <example-value>, and then uses the RSA key to decrypt a session key <example-value> in the <`EncryptedKey`> element of the <`EncryptedData`> element.  The example then uses the session key to decrypt the XML element.

This example is appropriate for situations where multiple applications have to share encrypted data or where an application has to save encrypted data between the times that it runs.

### To decrypt an XML element with an asymmetric key

1. Create a `System.Security.Cryptography.CspParameters` object and specify the name of the key container.

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
		CspParameters cspParams = new CspParameters();
		cspParams.KeyContainerName = "XML_ENC_RSA_KEY";

		// Get the RSA key from the key container.  This key will decrypt
		// a symmetric key that was imbedded in the XML document.
		RSACryptoServiceProvider rsaKey = new RSACryptoServiceProvider(cspParams);

		try
		{

			// Decrypt the elements.
			Decrypt(xmlDoc, rsaKey, "rsaKey");

			// Save the XML document.
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

2. Retrieve a previously generated asymmetric key from the container using the `System.Security.Cryptography.RSACryptoServiceProvider` object.  The key is automatically retrieved from the key <example-value> when you pass the `System.Security.Cryptography.CspParameters` object to the `System.Security.Cryptography.RSACryptoServiceProvider` constructor.

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
		CspParameters cspParams = new CspParameters();
		cspParams.KeyContainerName = "XML_ENC_RSA_KEY";

		// Get the RSA key from the key container.  This key will decrypt
		// a symmetric key that was imbedded in the XML document.
		RSACryptoServiceProvider rsaKey = new RSACryptoServiceProvider(cspParams);

		try
		{

			// Decrypt the elements.
			Decrypt(xmlDoc, rsaKey, "rsaKey");

			// Save the XML document.
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

3. Create a new `System.Security.Cryptography.Xml.EncryptedXml` object to decrypt the document.

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
		CspParameters cspParams = new CspParameters();
		cspParams.KeyContainerName = "XML_ENC_RSA_KEY";

		// Get the RSA key from the key container.  This key will decrypt
		// a symmetric key that was imbedded in the XML document.
		RSACryptoServiceProvider rsaKey = new RSACryptoServiceProvider(cspParams);

		try
		{

			// Decrypt the elements.
			Decrypt(xmlDoc, rsaKey, "rsaKey");

			// Save the XML document.
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

4. Add a key/name mapping to associate the RSA key with the element within the document that should be decrypted.  You must use the same name for the key that you used when you encrypted the document.  Note that this name is separate from the name used to identify the key in the key <example-value> specified in step 1.

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
		CspParameters cspParams = new CspParameters();
		cspParams.KeyContainerName = "XML_ENC_RSA_KEY";

		// Get the RSA key from the key container.  This key will decrypt
		// a symmetric key that was imbedded in the XML document.
		RSACryptoServiceProvider rsaKey = new RSACryptoServiceProvider(cspParams);

		try
		{

			// Decrypt the elements.
			Decrypt(xmlDoc, rsaKey, "rsaKey");

			// Save the XML document.
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

5. Call the `System.Security.Cryptography.Xml.EncryptedXml.DecryptDocument*` method to decrypt the <`EncryptedData`> element.  This method uses the RSA key to decrypt the session key and automatically uses the session key to decrypt the XML element.  It also automatically replaces the <`EncryptedData`> element with the original plaintext.

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
		CspParameters cspParams = new CspParameters();
		cspParams.KeyContainerName = "XML_ENC_RSA_KEY";

		// Get the RSA key from the key container.  This key will decrypt
		// a symmetric key that was imbedded in the XML document.
		RSACryptoServiceProvider rsaKey = new RSACryptoServiceProvider(cspParams);

		try
		{

			// Decrypt the elements.
			Decrypt(xmlDoc, rsaKey, "rsaKey");

			// Save the XML document.
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

6. Save the XML document.

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
		CspParameters cspParams = new CspParameters();
		cspParams.KeyContainerName = "XML_ENC_RSA_KEY";

		// Get the RSA key from the key container.  This key will decrypt
		// a symmetric key that was imbedded in the XML document.
		RSACryptoServiceProvider rsaKey = new RSACryptoServiceProvider(cspParams);

		try
		{

			// Decrypt the elements.
			Decrypt(xmlDoc, rsaKey, "rsaKey");

			// Save the XML document.
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

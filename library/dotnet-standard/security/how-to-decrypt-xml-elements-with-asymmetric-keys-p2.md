---
title: "How to: Decrypt XML Elements with Asymmetric Keys (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/how-to-decrypt-xml-elements-with-asymmetric-keys.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Decrypt XML Elements with Asymmetric Keys (part 2 of 2)

## Example

This example assumes that a file named `test.xml` exists in the same directory as the compiled program.  It also assumes that `test.xml` contains an XML element that was encrypted using the techniques described in How to: Encrypt XML Elements with Asymmetric Keys.

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

## Compiling the Code

- In a project that targets .NET Framework, include a reference to `System.Security.dll`.

- In a project that targets .NET Core or .NET 5, install NuGet package System.Security.Cryptography.Xml.

- Include the following namespaces: `System.Xml`, `System.Security.Cryptography`, and `System.Security.Cryptography.Xml`.

## .NET Security

Never store a symmetric cryptographic key in plaintext or transfer a symmetric key between machines in plaintext.  Additionally, never store or transfer the private key of an asymmetric key pair in plaintext.  For more information about symmetric and asymmetric cryptographic keys, see Generating Keys for Encryption and Decryption.

 Never embed a key directly into your source code.  Embedded keys can be easily read from an assembly by using Ildasm.exe (IL Disassembler) or by opening the assembly in a text editor such as Notepad.

 When you are done using a cryptographic key, clear it from memory by setting each byte to zero or by calling the `System.Security.Cryptography.SymmetricAlgorithm.Clear*` method of the managed cryptography class.  Cryptographic keys can sometimes be read from memory by a debugger or read from a hard drive if the memory location is paged to disk.

## See also

- Cryptography Model
- Cryptographic Services
- Cross-Platform Cryptography
- `System.Security.Cryptography.Xml`
- How to: Encrypt XML Elements with Asymmetric Keys
- ASP.NET Core Data Protection

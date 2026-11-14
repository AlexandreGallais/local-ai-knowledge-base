---
title: "Breaking change: .NET 8 obsoletions with custom IDs (part 6 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/8.0/obsolete-apis-with-custom-diagnostics.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Breaking change: .NET 8 obsoletions with custom IDs (part 6 of 6)

- `System.Threading.Tasks.TaskCanceledException.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Threading.Tasks.TaskSchedulerException.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`

#### System.Transactions namespace

- `System.Transactions.TransactionAbortedException.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Transactions.TransactionException.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Transactions.TransactionInDoubtException.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Transactions.TransactionManagerCommunicationException.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Transactions.TransactionPromotionException.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`

#### System.Xml namespace

- `System.Xml.XmlException.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Xml.XmlException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`

#### System.Xml.Schema namespace

- `System.Xml.Schema.XmlSchemaException.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Xml.Schema.XmlSchemaException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Xml.Schema.XmlSchemaInferenceException.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Xml.Schema.XmlSchemaInferenceException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Xml.Schema.XmlSchemaValidationException.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Xml.Schema.XmlSchemaValidationException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`

#### System.Xml.XPath namespace

- `System.Xml.XPath.XPathException.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Xml.XPath.XPathException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`

#### System.Xml.Xsl namespace

- `System.Xml.Xsl.XsltCompileException.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Xml.Xsl.XsltCompileException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Xml.Xsl.XsltException.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Xml.Xsl.XsltException.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`

### SYSLIB0052

- `System.Text.RegularExpressions.Regex.InitializeReferences`
- `System.Text.RegularExpressions.Regex.UseOptionC`
- `System.Text.RegularExpressions.Regex.UseOptionR`
- `System.Text.RegularExpressions.RegexRunner.CharInSet(System.Char,System.String,System.String)`
- `System.Text.RegularExpressions.RegexRunner.Scan(System.Text.RegularExpressions.Regex,System.String,System.Int32,System.Int32,System.Int32,System.Int32,System.Boolean)`
- `System.Text.RegularExpressions.RegexRunner.Scan(System.Text.RegularExpressions.Regex,System.String,System.Int32,System.Int32,System.Int32,System.Int32,System.Boolean,System.TimeSpan)`

### SYSLIB0053

- `System.Security.Cryptography.AesGcm.#ctor(System.Byte[])`
- `System.Security.Cryptography.AesGcm.#ctor(System.ReadOnlySpan{System.Byte})`

## See also

- API obsoletions with non-default diagnostic IDs (.NET 10)
- API obsoletions with non-default diagnostic IDs (.NET 9)
- API obsoletions with non-default diagnostic IDs (.NET 7)
- API obsoletions with non-default diagnostic IDs (.NET 6)
- API obsoletions with non-default diagnostic IDs (.NET 5)
- Obsolete features in .NET 5+

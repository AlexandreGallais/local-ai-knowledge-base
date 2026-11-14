---
title: "X509Certificate2UI class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509Certificate2UI.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509Certificate2UI class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class X509Certificate2UI
```

Displays user interface dialogs that allow you to select and view X.509 certificates. This class cannot be inherited.

#### Remarks
Use the methods of the `X509Certificate2UI` class to present user interface dialogs that display detailed information about an X.509 certificate or allow users to select one or more certificates from a collection of X.509 certificates.

#### Examples
The following code example demonstrates how to display user interface dialogs to select and view X.509 certificates.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._

## X509Certificate2UI.X509Certificate2UI() constructor

```csharp
public X509Certificate2UI ();
```

Initializes an instance of the `X509Certificate2UI` class.

To be added.

## X509Certificate2UI.DisplayCertificate(X509Certificate2) method

```csharp
public static void DisplayCertificate (System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Displays a dialog box that contains the properties of an X.509 certificate and its associated certificate chain.

Parameters:

- `certificate`: The X.509 certificate to display.

Exceptions:

- `ArgumentNullException`: The `certificate` parameter is `null`.
- `CryptographicException`: The `certificate` parameter is invalid.

#### Remarks
The `X509Certificate2UI.DisplayCertificate` method displays a dialog box with detailed information about the specified X.509 certificate. The dialog box includes buttons for installing or copying the certificate.

#### Examples
The following code example demonstrates how to display user interface dialogs to select and view X.509 certificates.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._

## X509Certificate2UI.DisplayCertificate(X509Certificate2, IntPtr) method

```csharp
public static void DisplayCertificate (System.Security.Cryptography.X509Certificates.X509Certificate2 certificate, IntPtr hwndParent);
```

Displays a dialog box that contains the properties of an X.509 certificate and its associated certificate chain using a handle to a parent window.

Parameters:

- `certificate`: The X.509 certificate to display.
- `hwndParent`: A handle to the parent window to use for the display dialog.

Exceptions:

- `ArgumentNullException`: The `certificate` parameter is `null`.
- `CryptographicException`: The `certificate` parameter is invalid.

#### Remarks
The `X509Certificate2UI.DisplayCertificate` method displays a dialog box with detailed information about the specified X.509 certificate. This method can be used to nest dialog boxes that display certificate information. The dialog box includes buttons for installing or copying the certificate.

## X509Certificate2UI.SelectFromCollection(X509Certificate2Collection, String, String, X509SelectionFlag) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2Collection SelectFromCollection (System.Security.Cryptography.X509Certificates.X509Certificate2Collection certificates, string? title, string? message, System.Security.Cryptography.X509Certificates.X509SelectionFlag selectionFlag);
```

Displays a dialog box for selecting an X.509 certificate from a certificate collection.

Parameters:

- `certificates`: A collection of X.509 certificates to select from.
- `title`: The title of the dialog box.
- `message`: A descriptive message to guide the user.  The message is displayed in the dialog box.
- `selectionFlag`: One of the `X509SelectionFlag` values that specifies whether single or multiple selections are allowed.

Returns: An `X509Certificate2Collection` object that contains the selected certificate or certificates.

Exceptions:

- `ArgumentException`: The `selectionFlag` parameter is not a valid flag.
- `ArgumentNullException`: The `certificates` parameter is `null`.
- `CryptographicException`: The `certificates` parameter is invalid.

#### Remarks
Use the `X509Certificate2UI.SelectFromCollection` method if you require users to manually select X.509 certificates using a dialog box. If no user interaction is required, use the `X509Certificate2Collection.Find` method.

#### Examples
The following code example demonstrates how to display user interface dialogs to select and view X.509 certificates.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._

## X509Certificate2UI.SelectFromCollection(X509Certificate2Collection, String, String, X509SelectionFlag, IntPtr) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2Collection SelectFromCollection (System.Security.Cryptography.X509Certificates.X509Certificate2Collection certificates, string? title, string? message, System.Security.Cryptography.X509Certificates.X509SelectionFlag selectionFlag, IntPtr hwndParent);
```

Displays a dialog box for selecting an X.509 certificate from a certificate collection using a handle to a parent window.

Parameters:

- `certificates`: A collection of X.509 certificates to select from.
- `title`: The title of the dialog box.
- `message`: A descriptive message to guide the user.  The message is displayed in the dialog box.
- `selectionFlag`: One of the `X509SelectionFlag` values that specifies whether single or multiple selections are allowed.
- `hwndParent`: A handle to the parent window to use for the display dialog box.

Returns: An `X509Certificate2Collection` object that contains the selected certificate or certificates.

Exceptions:

- `ArgumentException`: The `selectionFlag` parameter is not a valid flag.
- `ArgumentNullException`: The `certificates` parameter is `null`.
- `CryptographicException`: The `certificates` parameter is invalid.

#### Remarks
Use the `X509Certificate2UI.SelectFromCollection` method if you require users to manually select X.509 certificates using a dialog box. If no user interaction is required, use the `X509Certificate2Collection.Find` method.

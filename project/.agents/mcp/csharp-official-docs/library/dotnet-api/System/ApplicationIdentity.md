---
title: "ApplicationIdentity class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ApplicationIdentity.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ApplicationIdentity class

Namespace: `System`

```csharp
public sealed class ApplicationIdentity : System.Runtime.Serialization.ISerializable
```

Provides the ability to uniquely identify a manifest-activated application. This class cannot be inherited.

#### Remarks
The `ApplicationIdentity` class is used in the activation of manifest-based applications.

## ApplicationIdentity.ApplicationIdentity(String) constructor

```csharp
public ApplicationIdentity (string applicationIdentityFullName);
```

Initializes a new instance of the `ApplicationIdentity` class.

Parameters:

- `applicationIdentityFullName`: The full name of the application.

Exceptions:

- `ArgumentNullException`: `applicationIdentityFullName` is `null`.

#### Remarks
The format of the `applicationIdentityFullName` parameter is a comma-delimited Unicode string that begins with the name, as follows:

```

applicationURL
#
deploymentIdentity
\
applicationIdentity

```

Where *deploymentIdentity* =

```

deploymentManifest
, Version =
Major.Minor.Build.Revision
, Culture =
CultureInfo
, PublicKeyToken=
TokenNumber
, processorArchitecture=
processorArchitecture

```

And *applicationIdentity* =

```

applicationName
, Version =
Major.Minor.Build.Revision
, Culture =
CultureInfo
, PublicKeyToken=
TokenNumber
, processorArchitecture=
processorArchitecture
, type=
OsType

```

The following is an example of the full name for an application named ActivationContext:

```
http://testserver/ActivationContext/ActivationContext.application
#ActivationContext.application, Version=1.0.0.0, Culture=neutral, PublicKeyToken=<example-value>, processorArchitecture=msil
\ActivationContext.exe, Version=1.0.0.0, Culture=neutral, PublicKeyToken=<example-value>, processorArchitecture=msil, type=win32
```

The default value for processor architecture is "msil", and the default value for type is "win32".

## ApplicationIdentity.CodeBase property

```csharp
public string CodeBase { get; }
```

Gets the location of the deployment manifest as a URL.

Returns: The URL of the deployment manifest.

#### Remarks
The following are two examples of `CodeBase` property values for an application named ActivationContext:

- `http://testserver/ActivationContext/ActivationContext.application`

- `file://C:/UserFiles/UserName/SolutionName/ActivationContext/publish/ActivationContext.application`.

## ApplicationIdentity.FullName property

```csharp
public string FullName { get; }
```

Gets the full name of the application.

Returns: The full name of the application, also known as the display name.

#### Remarks
For a description of the format of the `FullName` property, see the `ApplicationIdentity.%23ctor` constructor.

## ApplicationIdentity.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` object with the data needed to serialize the target object.

Parameters:

- `info`: The `SerializationInfo` to populate with data.
- `context`: The `StreamingContext`) structure for the serialization.

To be added.

## ApplicationIdentity.ToString() method

```csharp
public override string ToString ();
```

Returns the full name of the manifest-activated application.

Returns: The full name of the manifest-activated application.

#### Remarks
For a description of the format of a full name for a manifest activated application, see the `ApplicationIdentity.%23ctor` constructor.

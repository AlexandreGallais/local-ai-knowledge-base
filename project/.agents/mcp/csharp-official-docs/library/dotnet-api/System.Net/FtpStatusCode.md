---
title: "FtpStatusCode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/FtpStatusCode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FtpStatusCode enum

Namespace: `System.Net`

```csharp
public enum FtpStatusCode
```

Specifies the status codes returned for a File Transfer Protocol (FTP) operation.

#### Remarks
The `FtpStatusCode` enumeration defines the values returned in the `StatusCode` property.

For additional information about FTP server status codes, see RFC 959: "File Transfer Protocol", Section 4.2: "FTP Replies".

#### Examples
The following code example sends an FTP request to make a new directory on an FTP server and checks the status code returned in the response.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpStatusCode.AccountNeeded field

```csharp
AccountNeeded
```

Specifies that a user account on the server is required.

## FtpStatusCode.ActionAbortedLocalProcessingError field

```csharp
ActionAbortedLocalProcessingError
```

Specifies that an error occurred that prevented the request action from completing.

## FtpStatusCode.ActionAbortedUnknownPageType field

```csharp
ActionAbortedUnknownPageType
```

Specifies that the requested action cannot be taken because the specified page type is unknown. Page types are described in RFC 959 Section 3.1.2.3.

## FtpStatusCode.ActionNotTakenFilenameNotAllowed field

```csharp
ActionNotTakenFilenameNotAllowed
```

Specifies that the requested action cannot be performed on the specified file.

## FtpStatusCode.ActionNotTakenFileUnavailable field

```csharp
ActionNotTakenFileUnavailable
```

Specifies that the requested action cannot be performed on the specified file because the file is not available.

## FtpStatusCode.ActionNotTakenFileUnavailableOrBusy field

```csharp
ActionNotTakenFileUnavailableOrBusy
```

Specifies that the requested action cannot be performed on the specified file because the file is not available or is being used.

## FtpStatusCode.ActionNotTakenInsufficientSpace field

```csharp
ActionNotTakenInsufficientSpace
```

Specifies that the requested action cannot be performed because there is not enough space on the server.

## FtpStatusCode.ArgumentSyntaxError field

```csharp
ArgumentSyntaxError
```

Specifies that one or more command arguments has a syntax error.

## FtpStatusCode.BadCommandSequence field

```csharp
BadCommandSequence
```

Specifies that the sequence of commands is not in the correct order.

## FtpStatusCode.CantOpenData field

```csharp
CantOpenData
```

Specifies that the data connection cannot be opened.

## FtpStatusCode.ClosingControl field

```csharp
ClosingControl
```

Specifies that the server is closing the control connection.

## FtpStatusCode.ClosingData field

```csharp
ClosingData
```

Specifies that the server is closing the data connection and that the requested file action was successful.

## FtpStatusCode.CommandExtraneous field

```csharp
CommandExtraneous
```

Specifies that the command is not implemented by the server because it is not needed.

## FtpStatusCode.CommandNotImplemented field

```csharp
CommandNotImplemented
```

Specifies that the command is not implemented by the FTP server.

## FtpStatusCode.CommandOK field

```csharp
CommandOK
```

Specifies that the command completed successfully.

## FtpStatusCode.CommandSyntaxError field

```csharp
CommandSyntaxError
```

Specifies that the command has a syntax error or is not a command recognized by the server.

## FtpStatusCode.ConnectionClosed field

```csharp
ConnectionClosed
```

Specifies that the connection has been closed.

## FtpStatusCode.DataAlreadyOpen field

```csharp
DataAlreadyOpen
```

Specifies that the data connection is already open and the requested transfer is starting.

## FtpStatusCode.DirectoryStatus field

```csharp
DirectoryStatus
```

Specifies the status of a directory.

## FtpStatusCode.EnteringPassive field

```csharp
EnteringPassive
```

Specifies that the server is entering passive mode.

## FtpStatusCode.FileActionAborted field

```csharp
FileActionAborted
```

Specifies that the requested action cannot be performed.

## FtpStatusCode.FileActionOK field

```csharp
FileActionOK
```

Specifies that the requested file action completed successfully.

## FtpStatusCode.FileCommandPending field

```csharp
FileCommandPending
```

Specifies that the requested file action requires additional information.

## FtpStatusCode.FileStatus field

```csharp
FileStatus
```

Specifies the status of a file.

## FtpStatusCode.LoggedInProceed field

```csharp
LoggedInProceed
```

Specifies that the user is logged in and can send commands.

## FtpStatusCode.NeedLoginAccount field

```csharp
NeedLoginAccount
```

Specifies that the server requires a login account to be supplied.

## FtpStatusCode.NotLoggedIn field

```csharp
NotLoggedIn
```

Specifies that login information must be sent to the server.

## FtpStatusCode.OpeningData field

```csharp
OpeningData
```

Specifies that the server is opening the data connection.

## FtpStatusCode.PathnameCreated field

```csharp
PathnameCreated
```

Specifies that the requested path name was created.

## FtpStatusCode.RestartMarker field

```csharp
RestartMarker
```

Specifies that the response contains a restart marker reply. The text of the description that accompanies this status contains the user data stream marker and the server marker.

## FtpStatusCode.SendPasswordCommand field

```csharp
SendPasswordCommand
```

Specifies that the server expects a password to be supplied.

## FtpStatusCode.SendUserCommand field

```csharp
SendUserCommand
```

Specifies that the server is ready for a user login operation.

## FtpStatusCode.ServerWantsSecureSession field

```csharp
ServerWantsSecureSession
```

Specifies that the server accepts the authentication mechanism specified by the client, and the exchange of security data is complete.

## FtpStatusCode.ServiceNotAvailable field

```csharp
ServiceNotAvailable
```

Specifies that the service is not available.

## FtpStatusCode.ServiceTemporarilyNotAvailable field

```csharp
ServiceTemporarilyNotAvailable
```

Specifies that the service is not available now; try your request later.

## FtpStatusCode.SystemType field

```csharp
SystemType
```

Specifies the system type name using the system names published in the Assigned Numbers document published by the Internet Assigned Numbers Authority.

## FtpStatusCode.Undefined field

```csharp
Undefined
```

Included for completeness, this value is never returned by servers.

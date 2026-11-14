---
title: "Environment+SpecialFolder enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Environment+SpecialFolder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Environment+SpecialFolder enum

Namespace: `System`

```csharp
public enum Environment.SpecialFolder
```

Specifies enumerated Constant Special Item ID List (CSIDL) values used to retrieve directory paths to system special folders.

#### Remarks
The system special folders are folders such as **Program Files**, **Programs**, **System**, or **Startup**, which contain common information. Special folders are set by default by the system, or explicitly by the user, when installing a version of Windows.

The `Environment.GetFolderPath` method returns the locations associated with this enumeration. The locations of these folders can have different values on different operating systems, the user can change some of the locations, and the locations are localized.

For more information about special folders, see the KNOWNFOLDERID constants in the Windows documentation.

#### Examples
The following example shows how to use `SpecialFolder` with the `Environment.GetFolderPath` method to get the System directory.

_Code sample not included: ~/snippets/csharp/System/Environment+SpecialFolder/Overview/getfolderpath.cs._

## Environment+SpecialFolder.AdminTools field

```csharp
AdminTools
```

The file system directory that is used to store administrative tools for an individual user. The Microsoft Management Console (MMC) will save customized consoles to this directory, and it will roam with the user.

## Environment+SpecialFolder.ApplicationData field

```csharp
ApplicationData
```

The directory that serves as a common repository for application-specific data for the current roaming user. A roaming user works on more than one computer on a network. A roaming user's profile is kept on a server on the network and is loaded onto a system when the user logs on.

## Environment+SpecialFolder.CDBurning field

```csharp
CDBurning
```

The file system directory that acts as a staging area for files waiting to be written to a CD.

## Environment+SpecialFolder.CommonAdminTools field

```csharp
CommonAdminTools
```

The file system directory that contains administrative tools for all users of the computer.

## Environment+SpecialFolder.CommonApplicationData field

```csharp
CommonApplicationData
```

The directory that serves as a common repository for application-specific data that is used by all users.

## Environment+SpecialFolder.CommonDesktopDirectory field

```csharp
CommonDesktopDirectory
```

The file system directory that contains files and folders that appear on the desktop for all users.

## Environment+SpecialFolder.CommonDocuments field

```csharp
CommonDocuments
```

The file system directory that contains documents that are common to all users.

## Environment+SpecialFolder.CommonMusic field

```csharp
CommonMusic
```

The file system directory that serves as a repository for music files common to all users.

## Environment+SpecialFolder.CommonOemLinks field

```csharp
CommonOemLinks
```

This value is recognized in Windows Vista for backward compatibility, but the special folder itself is no longer used.

## Environment+SpecialFolder.CommonPictures field

```csharp
CommonPictures
```

The file system directory that serves as a repository for image files common to all users.

## Environment+SpecialFolder.CommonProgramFiles field

```csharp
CommonProgramFiles
```

The directory for components that are shared across applications.

To get the x86 common program files directory in a non-x86 process, use the `SpecialFolder.ProgramFilesX86` member.

## Environment+SpecialFolder.CommonProgramFilesX86 field

```csharp
CommonProgramFilesX86
```

The **Program Files** folder.

## Environment+SpecialFolder.CommonPrograms field

```csharp
CommonPrograms
```

A folder for components that are shared across applications.

## Environment+SpecialFolder.CommonStartMenu field

```csharp
CommonStartMenu
```

The file system directory that contains the programs and folders that appear on the **Start** menu for all users.

## Environment+SpecialFolder.CommonStartup field

```csharp
CommonStartup
```

The file system directory that contains the programs that appear in the **Startup** folder for all users.

## Environment+SpecialFolder.CommonTemplates field

```csharp
CommonTemplates
```

The file system directory that contains the templates that are available to all users.

## Environment+SpecialFolder.CommonVideos field

```csharp
CommonVideos
```

The file system directory that serves as a repository for video files common to all users.

## Environment+SpecialFolder.Cookies field

```csharp
Cookies
```

The directory that serves as a common repository for Internet cookies.

## Environment+SpecialFolder.Desktop field

```csharp
Desktop
```

The logical Desktop rather than the physical file system location.

## Environment+SpecialFolder.DesktopDirectory field

```csharp
DesktopDirectory
```

The directory used to physically store file objects on the desktop. Do not confuse this directory with the desktop folder itself, which is a virtual folder.

## Environment+SpecialFolder.Favorites field

```csharp
Favorites
```

The directory that serves as a common repository for the user's favorite items.

## Environment+SpecialFolder.Fonts field

```csharp
Fonts
```

A virtual folder that contains fonts.

## Environment+SpecialFolder.History field

```csharp
History
```

The directory that serves as a common repository for Internet history items.

## Environment+SpecialFolder.InternetCache field

```csharp
InternetCache
```

The directory that serves as a common repository for temporary Internet files.

## Environment+SpecialFolder.LocalApplicationData field

```csharp
LocalApplicationData
```

The directory that serves as a common repository for application-specific data that is used by the current, non-roaming user.

## Environment+SpecialFolder.LocalizedResources field

```csharp
LocalizedResources
```

The file system directory that contains localized resource data.

## Environment+SpecialFolder.MyComputer field

```csharp
MyComputer
```

The **My Computer** folder. When passed to the `Environment.GetFolderPath` method, the `MyComputer` enumeration member always yields the empty string ("") because no path is defined for the My Computer folder.

## Environment+SpecialFolder.MyDocuments field

```csharp
MyDocuments
```

The **My Documents** folder. This member is equivalent to  `SpecialFolder.Personal`.

## Environment+SpecialFolder.MyMusic field

```csharp
MyMusic
```

The **My Music** folder.

## Environment+SpecialFolder.MyPictures field

```csharp
MyPictures
```

The **My Pictures** folder.

## Environment+SpecialFolder.MyVideos field

```csharp
MyVideos
```

The file system directory that serves as a repository for videos that belong to a user.

## Environment+SpecialFolder.NetworkShortcuts field

```csharp
NetworkShortcuts
```

A file system directory that contains the link objects that may exist in the **My Network Places** virtual folder.

## Environment+SpecialFolder.Personal field

```csharp
Personal
```

The directory that serves as a common repository for documents.  This member is equivalent to  `SpecialFolder.MyDocuments`.

## Environment+SpecialFolder.PrinterShortcuts field

```csharp
PrinterShortcuts
```

The file system directory that contains the link objects that can exist in the **Printers** virtual folder.

## Environment+SpecialFolder.ProgramFiles field

```csharp
ProgramFiles
```

The program files directory.

In a non-x86 process, passing `SpecialFolder.ProgramFiles` to the `Environment.GetFolderPath` method returns the path for non-x86 programs. To get the x86 program files directory in a non-x86 process, use the `SpecialFolder.ProgramFilesX86` member.

## Environment+SpecialFolder.ProgramFilesX86 field

```csharp
ProgramFilesX86
```

The x86 **Program Files** folder.

## Environment+SpecialFolder.Programs field

```csharp
Programs
```

The directory that contains the user's program groups.

## Environment+SpecialFolder.Recent field

```csharp
Recent
```

The directory that contains the user's most recently used documents.

## Environment+SpecialFolder.Resources field

```csharp
Resources
```

The file system directory that contains resource data.

## Environment+SpecialFolder.SendTo field

```csharp
SendTo
```

The directory that contains the Send To menu items.

## Environment+SpecialFolder.StartMenu field

```csharp
StartMenu
```

The directory that contains the Start menu items.

## Environment+SpecialFolder.Startup field

```csharp
Startup
```

The directory that corresponds to the user's Startup program group. The system starts these programs whenever a user logs on or starts Windows.

## Environment+SpecialFolder.System field

```csharp
System
```

The System directory.

## Environment+SpecialFolder.SystemX86 field

```csharp
SystemX86
```

The Windows **System** folder.

## Environment+SpecialFolder.Templates field

```csharp
Templates
```

The directory that serves as a common repository for document templates.

## Environment+SpecialFolder.UserProfile field

```csharp
UserProfile
```

The user's profile folder. Applications should not create files or folders at this level; they should put their data under the locations referred to by `SpecialFolder.ApplicationData`.

## Environment+SpecialFolder.Windows field

```csharp
Windows
```

The Windows directory or SYSROOT. This corresponds to the %windir% or %SYSTEMROOT% environment variables.

---
title: "How to: Add or remove Access Control List entries"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/how-to-add-or-remove-access-control-list-entries.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Add or remove access control list entries

To add or remove access control list (ACL) entries from a file or directory, get the `System.Security.AccessControl.FileSecurity` or `System.Security.AccessControl.DirectorySecurity` object from the file or directory. Modify the object, and then apply it back to the file or directory.

## From a file

1. Call the `System.IO.FileSystemAclExtensions.GetAccessControl(System.IO.FileInfo)` (or, for .NET Framework apps, `System.IO.FileInfo.GetAccessControl*`) method to get a `System.Security.AccessControl.FileSecurity` object that contains the current ACL entries of a file.

2. Add or remove ACL entries from the `System.Security.AccessControl.FileSecurity` object obtained in step 1.

3. To apply the changes, pass the `System.Security.AccessControl.FileSecurity` object to the `System.IO.FileSystemAclExtensions.SetAccessControl(System.IO.FileInfo,System.Security.AccessControl.FileSecurity)` (or, for .NET Framework apps, `System.IO.FileInfo.SetAccessControl*`) method.

## From a directory

1. Call the `System.IO.FileSystemAclExtensions.GetAccessControl(System.IO.DirectoryInfo)` (or, for .NET Framework apps, `System.IO.DirectoryInfo.GetAccessControl*`) method to get a `System.Security.AccessControl.DirectorySecurity` object that contains the current ACL entries of a directory.

2. Add or remove ACL entries from the `System.Security.AccessControl.DirectorySecurity` object obtained in step 1.

3. To apply the changes, pass the `System.Security.AccessControl.DirectorySecurity` object to the `System.IO.FileSystemAclExtensions.SetAccessControl(System.IO.DirectoryInfo,System.Security.AccessControl.DirectorySecurity)` (or, for .NET Framework apps, `System.IO.DirectoryInfo.SetAccessControl*`) method.

## Example

You must specify a valid user or group account to run this example. The example uses a `System.IO.FileInfo` object. Use the same procedure for the `System.IO.DirectoryInfo` class.

```csharp
using System;
using System.IO;
using System.Security.AccessControl;

    class FileExample
    {
        public static void Main()
        {
            try
            {
                string fileName = "test.xml";

                Console.WriteLine($"Adding access control entry for {fileName}");

                // Add the access control entry to the file.
                AddFileSecurity(fileName, @"DomainName\AccountName",
                    FileSystemRights.ReadData, AccessControlType.Allow);

                Console.WriteLine($"Removing access control entry from {fileName}");

                // Remove the access control entry from the file.
                RemoveFileSecurity(fileName, @"DomainName\AccountName",
                    FileSystemRights.ReadData, AccessControlType.Allow);

                Console.WriteLine("Done.");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        // Adds an ACL entry on the specified file for the specified account.
        public static void AddFileSecurity(string fileName, string account,
            FileSystemRights rights, AccessControlType controlType)
        {
            FileInfo fileInfo = new(fileName);
            FileSecurity fSecurity = fileInfo.GetAccessControl();

            // Add the FileSystemAccessRule to the security settings.
            fSecurity.AddAccessRule(new FileSystemAccessRule(account,
                rights, controlType));

            // Set the new access settings.
            fileInfo.SetAccessControl(fSecurity);
        }

        // Removes an ACL entry on the specified file for the specified account.
        public static void RemoveFileSecurity(string fileName, string account,
            FileSystemRights rights, AccessControlType controlType)
        {
            FileInfo fileInfo = new(fileName);
            FileSecurity fSecurity = fileInfo.GetAccessControl();

            // Remove the FileSystemAccessRule from the security settings.
            fSecurity.RemoveAccessRule(new FileSystemAccessRule(account,
                rights, controlType));

            // Set the new access settings.
            fileInfo.SetAccessControl(fSecurity);
        }
}
```
```vb
Imports System.IO
Imports System.Security.AccessControl

Module FileExample

    Sub Main()
        Try
            Dim fileName As String = "test.xml"

            Console.WriteLine("Adding access control entry for " & fileName)

            ' Add the access control entry to the file.
            AddFileSecurity(fileName, "DomainName\AccountName",
                FileSystemRights.ReadData, AccessControlType.Allow)

            Console.WriteLine("Removing access control entry from " & fileName)

            ' Remove the access control entry from the file.
            RemoveFileSecurity(fileName, "DomainName\AccountName",
                FileSystemRights.ReadData, AccessControlType.Allow)

            Console.WriteLine("Done.")
        Catch e As Exception
            Console.WriteLine(e)
        End Try

    End Sub

    ' Adds an ACL entry on the specified file for the specified account.
    Sub AddFileSecurity(ByVal fileName As String, ByVal account As String,
        ByVal rights As FileSystemRights, ByVal controlType As AccessControlType)

        Dim fileInfo As New FileInfo(fileName)
        Dim fSecurity As FileSecurity = fileInfo.GetAccessControl()

        ' Add the FileSystemAccessRule to the security settings. 
        Dim accessRule As New FileSystemAccessRule(account, rights, controlType)

        fSecurity.AddAccessRule(accessRule)

        ' Set the new access settings.
        fileInfo.SetAccessControl(fSecurity)

    End Sub

    ' Removes an ACL entry on the specified file for the specified account.
    Sub RemoveFileSecurity(ByVal fileName As String, ByVal account As String,
        ByVal rights As FileSystemRights, ByVal controlType As AccessControlType)

        Dim fileInfo As New FileInfo(fileName)
        Dim fSecurity As FileSecurity = fileInfo.GetAccessControl()

        ' Remove the FileSystemAccessRule from the security settings. 
        fSecurity.RemoveAccessRule(New FileSystemAccessRule(account,
            rights, controlType))

        ' Set the new access settings.
        fileInfo.SetAccessControl(fSecurity)

    End Sub
End Module
```

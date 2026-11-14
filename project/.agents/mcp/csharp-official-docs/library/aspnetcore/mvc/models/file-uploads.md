---
title: "Upload files in ASP.NET Core (part 1 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/models/file-uploads.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Upload files in ASP.NET Core

By Rutger Storm

ASP.NET Core supports uploading one or more files using buffered model binding for smaller files and unbuffered streaming for larger files.

View or download sample code (how to download)

## Security considerations

Use caution when providing users with the ability to upload files to a server. Cyberattackers might attempt to:

* Execute denial of service attacks.
* Upload viruses or malware.
* Compromise networks and servers in other ways.

Security steps that reduce the likelihood of a successful attack are:

* Upload files to a dedicated file upload area, preferably to a non-system drive. A dedicated location makes it easier to impose security restrictions on uploaded files. Disable execute permissions on the file upload location.&dagger;
* Do **not** persist uploaded files in the same directory tree as the app.&dagger;
* Use a safe file name determined by the app. Don't use a file name provided by the user or the untrusted file name of the uploaded file.&dagger; HTML encode the untrusted file name when displaying it. For example, logging the file name or displaying in UI (Razor automatically HTML encodes output).
* Allow only approved file extensions for the app's design specification.&dagger;
* Verify that client-side checks are performed on the server.&dagger; Client-side checks are easy to circumvent.
* Check the size of an uploaded file. Set a maximum size limit to prevent large uploads.&dagger;
* When an uploaded file shouldn't overwrite files with the same name. Check the file name against the database or physical storage before uploading the file.
* **Run a virus/malware scanner on uploaded content before the file is stored.**

&dagger;The sample app demonstrates an approach that meets the criteria.

> **Warning:**
> Uploading malicious code to a system is frequently the first step to executing code that can:
>
> * Completely gain control of a system.
> * Overload a system with the result that the system crashes.
> * Compromise user or system data.
> * Apply graffiti to a public UI.
>
> For information on reducing vulnerabilities when accepting files from users, see the following resources:
>
> * Unrestricted File Upload
> * Azure Security: Ensure appropriate controls are in place when accepting files from users

For more information on implementing security measures, including examples from the sample app, see the Validation section.

## Storage scenarios

Common storage options for files include:

* Database

  * For small file uploads, a database is often faster than physical storage (file system or network share) options.
  * A database is often more convenient than physical storage options because retrieval of a database record for user data can concurrently supply the file content (for example, an avatar image).
  * A database is potentially less expensive than using a cloud data storage service.

* Physical storage (file system or network share)

  * For large file uploads:
    * Database limits might restrict the size of the upload.
    * Physical storage is often less economical than storage in a database.
  * Physical storage is potentially less expensive than using a cloud data storage service.
  * The app's process must have read and write permissions to the storage location. **Never grant execute permission.**

* Cloud data storage service, for example, Azure Blob Storage.

  * Services usually offer improved scalability and resiliency over on-premises solutions that are usually subject to single points of failure.
  * Services are potentially lower cost in large storage infrastructure scenarios.

  For more information, see Quickstart: Use .NET to create a blob in object storage.

## Small and large files

The definition of small and large files depend on the computing resources available. Apps should benchmark the storage approach used to ensure it can handle the expected sizes. Benchmark memory, CPU, disk, and database performance.

While specific boundaries can't be provided on what is small versus large for your deployment, here are some of ASP.NET Core's related defaults for `FormOptions` (API documentation):

* By default, `HttpRequest.Form` doesn't buffer the entire request body (`Microsoft.AspNetCore.Http.Features.FormOptions.BufferBody`), but it does buffer any multipart form files included.
* `Microsoft.AspNetCore.Http.Features.FormOptions.MultipartBodyLengthLimit` is the maximum size for buffered form files (default: 128 MB).
* `Microsoft.AspNetCore.Http.Features.FormOptions.MemoryBufferThreshold` indicates the buffering threshold in memory before transitioning to a buffer file on disk (default: 64 KB). `MemoryBufferThreshold` acts as a boundary between small and large files, which is raised or lowered depending on the apps resources and scenarios.

For more information on `Microsoft.AspNetCore.Http.Features.FormOptions`, see the `FormOptions` class in the ASP.NET Core reference source.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

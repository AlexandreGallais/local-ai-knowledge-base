---
title: "git-download"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/includes/git-download.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# git-download

> **Tip:**
> Use the `git sparse-checkout` command to download a single folder from the main branch of a GitHub repository.
>
> In the following example, the `security/authorization/BlazorWebAppAuthorization` subfolder is downloaded from the `dotnet/AspNetCore.Docs.Samples` repository. Replace `https://github.com/dotnet/AspNetCore.Docs.Samples.git` with the URL of the repository that you want to clone, and replace the `security/authorization/BlazorWebAppAuthorization` path with the path to the subfolder that you want to download:
>
> ```
> git clone --depth 1 --filter=blob:none https://github.com/dotnet/AspNetCore.Docs.Samples.git --sparse
> cd AspNetCore.Docs.Samples
> git sparse-checkout init --cone
> git sparse-checkout set security/authorization/BlazorWebAppAuthorization
> ```

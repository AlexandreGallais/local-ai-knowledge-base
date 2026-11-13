---
title: "Host and deploy ASP.NET Core standalone Blazor WebAssembly with GitHub Pages"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/host-and-deploy/webassembly/github-pages.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Host and deploy ASP.NET Core standalone Blazor WebAssembly with GitHub Pages

-->
-->

This article explains how to host and deploy standalone Blazor WebAssembly using GitHub Pages.

The following guidance for GitHub Pages deployments of Blazor WebAssembly apps demonstrates concepts with a live tool deployed to GitHub Pages. The tool is used by the ASP.NET Core documentation authors to create cross-reference (XREF) links to API documentation for article markdown:

* `BlazorWebAssemblyXrefGenerator` sample app (`blazor-samples/BlazorWebAssemblyXrefGenerator`)
* Live Xref Generator website

## GitHub Pages settings

* **Actions** > **General**
  * **Actions permissions**
    * **Allow enterprise actions, and select non-enterprise, actions and reusable workflows** > Enabled (selected)
    * **Allow actions created by GitHub** > Enabled (selected)
    * **Allow actions and reusable workflows** > `stevesandersonms/ghaction-rewrite-base-href@{SHA HASH},`&dagger;
  * **Workflow permissions** > **Read repository contents and packages permissions**
* **Pages** > **Build and deployment**
  * **Source** > **GitHub Actions**
  * Selected workflow: **Static HTML** and base your static deployment Action script on the Xref Generator `static.yml` file for the Xref Generator tool. The configuration in the file is described in the next section.
  * **Custom domain**: Set if you intend to use a custom domain, which isn't covered by this guidance. For more information, see Configuring a custom domain for your GitHub Pages site.
  * **Enforce HTTPS** > Enabled (selected)

&dagger;The SHA hash (`{SHA HASH}` placeholder) represents the SHA hash for the latest `stevesandersonms/ghaction-rewrite-base-href` GitHub Action release version. By pinning to a specific version, there's less risk that a compromised latest release using a version moniker, such as `v1`, can jeopardize the deployment. Periodically, update the SHA to the latest release for the latest features and bug fixes.

To obtain the SHA hash:

1. Navigate to the `SteveSandersonMS/ghaction-rewrite-base-href` Action GitHub repository.
1. Select the release on the right-side of the page under **Releases**.
1. Locate and select the short SHA hash (for example, `5b54862`).
1. Either:
   * Take the full SHA from the URL in the browser's address bar.
   * Select the copy button on the right side of page to put the SHA on your clipboard.

For more information, see Using pre-written building blocks in your workflow: Using SHAs (GitHub documentation).

## Static deployment script configuration

Xref Generator `static.yml` file

Configure the following entries in the script for your deployment:

* Publish directory (`PUBLISH_DIR`): Use the path to the repository's folder where the Blazor WebAssembly app is published. The app is compiled for a specific .NET version, and the path segment for the version must match. Example: `BlazorWebAssemblyXrefGenerator/bin/Release/net9.0/publish/wwwroot` is the path for an app that adopts the `net9.0` Target Framework Moniker (TFM) for the .NET 9 SDK.
* Push path (`on:push:paths`): Set the push path to match the app's repository folder with a `**` wildcard. Example: `BlazorWebAssemblyXrefGenerator/**`.
* .NET SDK version (`dotnet-version` via the `actions/setup-dotnet` Action): Currently, there's no way to set the version to "latest" (see Allow specifying 'latest' as dotnet-version (`actions/setup-dotnet` #497) to up-vote the feature request). Set the SDK version at least as high as the app's framework version.
* Publish path (`dotnet publish` command): Set the publish folder path to the app's repository folder. Example: `dotnet publish BlazorWebAssemblyXrefGenerator -c Release`.
* Base HREF (`base_href` for the `SteveSandersonMS/ghaction-rewrite-base-href` Action): Set the SHA hash for the latest version of the Action (see the guidance in the *GitHub Pages settings* section for instructions). Set the base href for the app to the repository's name. Example: The Blazor sample's repository owner is `dotnet`. The Blazor sample's repository's name is `blazor-samples`. When the Xref Generator tool is deployed to GitHub Pages, its web address is based on the repository's name (`https://dotnet.github.io/blazor-samples/`). The base href of the app is `/blazor-samples/`, which is set into `base_href` for the `ghaction-rewrite-base-href` Action to write into the app's `wwwroot/index.html` `<base>` tag when the app is deployed. For more information, see ASP.NET Core Blazor app base path.

The GitHub-hosted Ubuntu (latest) server has a version of the .NET SDK pre-installed. You can remove the `actions/setup-dotnet` Action step from the `static.yml` script if the pre-installed .NET SDK is sufficient to compile the app. To determine the .NET SDK installed for `ubuntu-latest`:

1. Go to the **Available Images** section of the `actions/runner-images` GitHub repository.
1. Locate the `ubuntu-latest` image, which is the first table row.
1. Select the link in the `Included Software` column.
1. Scroll down to the *.NET Tools* section to see the .NET SDK installed with the image.

## Deployment notes

The default GitHub Action, which deploys pages, skips deployment of folders starting with underscore, the `_framework` folder for example. To deploy folders starting with underscore, add an empty `.nojekyll` file to the root of the app's repository. Example: Xref Generator `.nojekyll` file

***Perform this step before the first app deployment:*** Git treats JavaScript (JS) files, such as `blazor.webassembly.js`, as text and converts line endings from CRLF (carriage return-line feed) to LF (line feed) in the deployment pipeline. These changes to JS files produce different file hashes than Blazor sends to the client. The mismatches result in integrity check failures on the client. One approach to solving this problem is to add a `.gitattributes` file with `*.js binary` line before adding the app's assets to the Git branch. The `*.js binary` line configures Git to treat JS files as binary files, which avoids processing the files in the deployment pipeline and results in client-side integrity checks passing. For more information, see ASP.NET Core Blazor WebAssembly caching and integrity check failures. Example: Xref Generator `.gitattributes` file

To handle URL rewrites based on Single Page Apps for GitHub Pages (`rafrex/spa-github-pages` GitHub repository):

* Add a `wwwroot/404.html` file with a script that handles redirecting the request to the `index.html` page. Example: Xref Generator `404.html` file
* In `wwwroot/index.html`, add the script to `<head>` content. Example: Xref Generator `index.html` file

GitHub Pages doesn't natively support using Brotli-compressed resources. To use Brotli:

* Add the `wwwroot/decode.js` script to the app's `wwwroot` folder. Example: Xref Generator `decode.js` file
* Add the `<script>` tag to load the `decode.js` script in the `wwwroot/index.html` file immediately above the `<script>` tag that loads the Blazor script. Example: Xref Generator `index.html` file
  * Set `autostart="false"` for the Blazor WebAssembly script.
  * Add the `loadBootResource` script after the `<script>` tag that loads the Blazor WebAssembly script. Example: Xref Generator `index.html` file

* Add `robots.txt` and `sitemap.txt` files to improve SEO. Examples: Xref Generator `robots.txt` file, Xref Generator `sitemap.txt` file

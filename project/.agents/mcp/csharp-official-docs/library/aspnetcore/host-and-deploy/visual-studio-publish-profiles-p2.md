---
title: "Visual Studio publish profiles (.pubxml) for ASP.NET Core app deployment (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/host-and-deploy/visual-studio-publish-profiles.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Visual Studio publish profiles (.pubxml) for ASP.NET Core app deployment (part 2 of 2)

## Include files

The following sections outline different approaches for file inclusion at publish time. The General file inclusion section uses the `DotNetPublishFiles` item, which is provided by a publish targets file in the Web SDK. The Selective file inclusion section uses the `ResolvedFileToPublish` item, which is provided by a publish targets file in the .NET SDK. Because the Web SDK depends on the .NET SDK, either item can be used in an ASP.NET Core project.

### General file inclusion

The following example's `<ItemGroup>` element demonstrates copying a folder located outside of the project directory to a folder of the published site. Any files added to the following markup's `<ItemGroup>` are included by default.

```xml
<ItemGroup>
  <_CustomFiles Include="$(MSBuildProjectDirectory)/../images/**/*" />
  <DotNetPublishFiles Include="@(_CustomFiles)">
    <DestinationRelativePath>wwwroot/images/%(RecursiveDir)%(Filename)%(Extension)</DestinationRelativePath>
  </DotNetPublishFiles>
</ItemGroup>
```

The preceding markup:

* Can be added to the `.csproj` file or the publish profile. If it's added to the `.csproj` file, it's included in each publish profile in the project.
* Declares a `_CustomFiles` item to store files matching the `Include` attribute's globbing pattern. The *images* folder referenced in the pattern is located outside of the project directory. A reserved property, named `$(MSBuildProjectDirectory)`, resolves to the project file's absolute path.
* Provides a list of files to the `DotNetPublishFiles` item. By default, the item's `<DestinationRelativePath>` element is empty. The default value is overridden in the markup and uses well-known item metadata such as `%(RecursiveDir)`. The inner text represents the *wwwroot/images* folder of the published site.

### Selective file inclusion

The highlighted markup in the following example demonstrates:

* Copying a file located outside of the project into the published site's *wwwroot* folder. The file name of *ReadMe2.md* is maintained.
* Excluding the *wwwroot\Content* folder.
* Excluding *Views\Home\About2.cshtml*.

```xml
<?xml version="1.0" encoding="utf-8"?>
<Project ToolsVersion="4.0" 
         xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <PropertyGroup>
    <WebPublishMethod>FileSystem</WebPublishMethod>
    <PublishProvider>FileSystem</PublishProvider>
    <LastUsedBuildConfiguration>Release</LastUsedBuildConfiguration>
    <LastUsedPlatform>Any CPU</LastUsedPlatform>
    <SiteUrlToLaunchAfterPublish />
    <LaunchSiteAfterPublish>True</LaunchSiteAfterPublish>
    <ExcludeApp_Data>False</ExcludeApp_Data>
    <PublishFramework />
    <ProjectGuid>
      <GUID Here=""></GUID>
    </ProjectGuid>
    <publishUrl>bin\Release\PublishOutput</publishUrl>
    <DeleteExistingFiles>False</DeleteExistingFiles>
  </PropertyGroup>
  <ItemGroup>
    <ResolvedFileToPublish Include="..\ReadMe2.md">
      <RelativePath>wwwroot\ReadMe2.md</RelativePath>
    </ResolvedFileToPublish>

    <Content Update="wwwroot\Content\**\*" CopyToPublishDirectory="Never" />
    <Content Update="Views\Home\About2.cshtml" CopyToPublishDirectory="Never" />
  </ItemGroup>
</Project>
```

The preceding example uses the `ResolvedFileToPublish` item, whose default behavior is to always copy the files provided in the `Include` attribute to the published site. Override the default behavior by including a `<CopyToPublishDirectory>` child element with inner text of either `Never` or `PreserveNewest`. For example:

```xml
<ResolvedFileToPublish Include="..\ReadMe2.md">
  <RelativePath>wwwroot\ReadMe2.md</RelativePath>
  <CopyToPublishDirectory>PreserveNewest</CopyToPublishDirectory>
</ResolvedFileToPublish>
```

For more deployment samples, see the Web SDK README file.

## Run a target before or after publishing

The built-in `BeforePublish` and `AfterPublish` targets execute a target before or after the publish target. Add the following elements to the publish profile to log console messages both before and after publishing:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!--
This file is used by the publish/package process of your Web project. You can customize the behavior of this process
by editing this MSBuild file. In order to learn more about this please visit https://go.microsoft.com/fwlink/?LinkID=208121. 
-->
<Project>
  <PropertyGroup>
    <WebPublishMethod>MSDeploy</WebPublishMethod>
    <ResourceId>/subscriptions/SomeGuid/resourcegroups/TP_RG/providers/Microsoft.Web/sites/TP22</ResourceId>
    <ResourceGroup>TP_RG</ResourceGroup>
    <PublishProvider>AzureWebSite</PublishProvider>
    <LastUsedBuildConfiguration>Release</LastUsedBuildConfiguration>
    <LastUsedPlatform>Any CPU</LastUsedPlatform>
    <SiteUrlToLaunchAfterPublish>https://tp22.azurewebsites.net</SiteUrlToLaunchAfterPublish>
    <LaunchSiteAfterPublish>true</LaunchSiteAfterPublish>
    <ExcludeApp_Data>false</ExcludeApp_Data>
    <ProjectGuid>GuidHere</ProjectGuid>
    <MSDeployServiceURL>something.scm.azurewebsites.net:443</MSDeployServiceURL>
    <DeployIisAppPath>myDeploysIISpath</DeployIisAppPath>
    <RemoteSitePhysicalPath />
    <SkipExtraFilesOnServer>true</SkipExtraFilesOnServer>
    <MSDeployPublishMethod>WMSVC</MSDeployPublishMethod>
    <EnableMSDeployBackup>true</EnableMSDeployBackup>
    <EnableMsDeployAppOffline>true</EnableMsDeployAppOffline>
    <UserName />
    <_SavePWD>false</_SavePWD>
    <_DestinationType>AzureWebSite</_DestinationType>
    <InstallAspNetCoreSiteExtension>false</InstallAspNetCoreSiteExtension>
  </PropertyGroup>
	<Target Name="CustomActionsBeforePublish" BeforeTargets="BeforePublish">
		<Message Text="Inside BeforePublish" Importance="high" />
	</Target>
	<Target Name="CustomActionsAfterPublish" AfterTargets="AfterPublish">
		<Message Text="Inside AfterPublish" Importance="high" />
	</Target>
</Project>
```

## Publish to a server using an untrusted certificate

Add the `<AllowUntrustedCertificate>` property with a value of `True` to the publish profile:

```xml
<PropertyGroup>
  <AllowUntrustedCertificate>True</AllowUntrustedCertificate>
</PropertyGroup>
```

## The Kudu service

To view the files in an Azure App Service web app deployment, use the Kudu service. Append the `scm` token to the web app name. For example:

| URL                                    | Result       |
| -------------------------------------- | ------------ |
| `http://mysite.azurewebsites.net/`     | Web App      |
| `http://mysite.scm.azurewebsites.net/` | Kudu service |

Select the Debug Console menu item to view, edit, delete, or add files.

## Related content

* Web SDK README file
* Web SDK GitHub repository: File issues and request features for deployment.
* Web Deploy (MSDeploy) simplifies deployment of web apps and websites to IIS servers.
* Transform web.config

---
title: ".NET SDK error list (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/sdk-errors/index.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET SDK error list (part 3 of 3)

|NETSDK1136|The target platform must be set to Windows (usually by including '-windows' in the TargetFramework property) when using Windows Forms or WPF, or referencing projects or packages that do so.|
|NETSDK1137|It is no longer necessary to use the Microsoft.NET.Sdk.WindowsDesktop SDK. Consider changing the Sdk attribute of the root Project element to 'Microsoft.NET.Sdk'.|
|NETSDK1138|The target framework '{0}' is out of support and will not receive security updates in the future. Please refer to <https://aka.ms/dotnet-core-support> for more information about the support policy.|
|NETSDK1139|The target platform identifier {0} was not recognized.|
|NETSDK1140|{0} is not a valid TargetPlatformVersion for {1}. Valid versions include:|
|NETSDK1141|Unable to resolve the .NET SDK version as specified in the global.json located at {0}.|
|NETSDK1142|Including symbols in a single file bundle is not supported when publishing for .NET5 or higher.|
|NETSDK1143|Including all content in a single file bundle also includes native libraries. If IncludeAllContentForSelfExtract is true, IncludeNativeLibrariesForSelfExtract must not be false.|
|NETSDK1144|Optimizing assemblies for size failed. Optimization can be disabled by setting the PublishTrimmed property to false.|
|NETSDK1145|The {0} pack is not installed and NuGet package restore is not supported. Upgrade Visual Studio, remove global.json if it specifies a certain SDK version, and uninstall the newer SDK. For more options visit <https://aka.ms/targeting-apphost-pack-missing>. Pack Type:{0}, Pack directory: {1}, targetframework: {2}, Pack PackageId: {3}, Pack Package Version: {4}.|
|NETSDK1146|PackAsTool does not support TargetPlatformIdentifier being set. For example, TargetFramework cannot be net5.0-windows, only net5.0. PackAsTool also does not support UseWPF or UseWindowsForms when targeting .NET 5 and higher.|
|NETSDK1147|To build this project, the following workloads must be installed: {0}.|
|NETSDK1148|A referenced assembly was compiled using a newer version of Microsoft.Windows.SDK.NET.dll. Please update to a newer .NET SDK in order to reference this assembly.|
|NETSDK1149|{0} cannot be referenced because it uses built-in support for WinRT, which is no longer supported in .NET 5 and higher. An updated version of the component supporting .NET 5 is needed. For more information, see <https://aka.ms/netsdk1149>.|
|NETSDK1150|The referenced project '{0}' is a non self-contained executable.  A non self-contained executable cannot be referenced by a self-contained executable.  For more information, see <https://aka.ms/netsdk1150>.|
|NETSDK1151|The referenced project '{0}' is a self-contained executable.  A self-contained executable cannot be referenced by a non self-contained executable.  For more information, see <https://aka.ms/netsdk1151>.|
|NETSDK1152|Found multiple publish output files with the same relative path: {0}.|
|NETSDK1153|CrossgenTool not specified in PDB compilation mode.|
|NETSDK1154|Crossgen2Tool must be specified when UseCrossgen2 is set to true.|
|NETSDK1155|Crossgen2Tool executable '{0}' not found.|
|NETSDK1156|.NET host executable '{0}' not found.|
|NETSDK1157|JIT library '{0}' not found.|
|NETSDK1158|Required '{0}' metadata missing on Crossgen2Tool item.|
|NETSDK1159|CrossgenTool must be specified when UseCrossgen2 is set to false.|
|NETSDK1160|CrossgenTool executable '{0}' not found.|
|NETSDK1161|DiaSymReader library '{0}' not found.|
|NETSDK1162|PDB generation: R2R executable '{0}' not found.|
|NETSDK1163|Input assembly '{0}' not found.|
|NETSDK1164|Missing output PDB path in PDB generation mode (OutputPDBImage metadata).|
|NETSDK1165|Missing output R2R image path (OutputR2RImage metadata).|
|NETSDK1166|Cannot emit symbols when publishing for .NET 5 with Crossgen2 using composite mode.|
|NETSDK1167|Compression in a single file bundle is only supported when publishing for .NET 6 or higher.|
|NETSDK1168|WPF is not supported or recommended with trimming enabled. Please go to <https://aka.ms/dotnet-illink/wpf> for more details.|
|NETSDK1169|The same resource ID {0} was specified for two type libraries '{1}' and '{2}'. Duplicate type library IDs are not allowed.|
|NETSDK1170|The provided type library ID '{0}' for type libary '{1}' is invalid. The ID must be a positive integer less than 65536.|
|NETSDK1171|An integer ID less than 65536 must be provided for type library '{0}' because more than one type library is specified.|
|NETSDK1172|The provided type library '{0}' does not exist.|
|NETSDK1173|The provided type library '{0}' is in an invalid format.|
|NETSDK1174|The abbreviation of -p for --project is deprecated. Please use --project.|
|NETSDK1175|Windows Forms is not supported or recommended with trimming enabled. Please go to <https://aka.ms/dotnet-illink/windows-forms> for more details.|
|NETSDK1176|Compression in a single file bundle is only supported when publishing a self-contained application.|
|NETSDK1177|Failed to sign apphost with error code {1}: {0}.|
|NETSDK1178|The project depends on the following workload packs that do not exist in any of the workloads available in this installation: {0}.|
|NETSDK1179|One of '--self-contained' or '--no-self-contained' options are required when '--runtime' is used.|
|NETSDK1181|Error getting pack version: Pack '{0}' was not present in workload manifests.|
|NETSDK1182|Targeting .NET 6.0 or higher in Visual Studio 2019 is not supported.|
|NETSDK1183|Unable to optimize assemblies for Ahead of time compilation: a valid runtime package was not found. Either set the PublishAot property to false, or use a supported runtime identifier when publishing. When targeting .NET 7 or higher, make sure to restore packages with the PublishAot property set to true.|
|NETSDK1184|The Targeting Pack for FrameworkReference '{0}' was not available. This may be because DisableTransitiveFrameworkReferenceDownloads was set to true.|
|NETSDK1185|The Runtime Pack for FrameworkReference '{0}' was not available. This may be because DisableTransitiveFrameworkReferenceDownloads was set to true.|
|NETSDK1186|This project depends on Maui Essentials through a project or NuGet package reference, but doesn't declare that dependency explicitly. To build this project, you must set the UseMauiEssentials property to true (and install the Maui workload if necessary).|
|NETSDK1187|Package {0} {1} has a resource with the locale '{2}'. This locale has been normalized to the standard format '{3}' to prevent casing issues in the build. Consider notifying the package author about this casing issue.|
|NETSDK1188|Package {0} {1} has a resource with the locale '{2}'. This locale is not recognized by .NET. Consider notifying the package author that it appears to be using an invalid locale.|
|NETSDK1189|Prefer32Bit is not supported and has no effect for netcoreapp target.|
|NETSDK1190|To use '{0}' in solution projects, you must set the environment variable '{1}' (to true). This will increase the time to complete the operation.|
|NETSDK1191|A runtime identifier for the property '{0}' couldn't be inferred. Specify a rid explicitly.|
|NETSDK1192|Targeting .NET 7.0 or higher in Visual Studio 2022 17.3 is not supported.|
|NETSDK1193|If PublishSelfContained is set, it must be either true or false. The value given was '{0}'.|
|NETSDK1194|The "--output" option isn't supported when building a solution. Specifying a solution-level output path results in all projects copying outputs to the same directory, which can lead to inconsistent builds.|
|NETSDK1195|Trimming, or code compatibility analysis for trimming, single-file deployment, or ahead-of-time compilation is not supported for the target framework. For more information, see <https://aka.ms/netsdk1195>|
|NETSDK1196|The SDK does not support ahead-of-time compilation. Set the PublishAot property to false.|
|NETSDK1197|Multiple solution project(s) contain conflicting '{0}' values; ensure the values match. Consider using a Directory.build.props file to set the property for all projects. Conflicting projects: {1}.|
|NETSDK1198|A publish profile with the name '{0}' was not found in the project. Set the PublishProfile property to a valid file name.|
|NETSDK1199|The ArtifactsPath and UseArtifactsOutput properties cannot be set in a project file, due to MSBuild ordering constraints. They must be set in a Directory.Build.props file or from the command line. See <https://aka.ms/netsdk1199> for more information.|
|NETSDK1200|If UseArtifactsPath is set to true and ArtifactsPath is not set, there must be a Directory.Build.props file in order to determine where the artifacts folder should be located.|
|NETSDK1201|For projects targeting .NET 8.0 and higher, specifying a RuntimeIdentifier will no longer produce a self contained app by default. To continue building self-contained apps, set the SelfContained property to true or use the --self-contained argument.|
|NETSDK1202|The workload '{0}' is out of support and will not receive security updates in the future. Please refer to {1} for more information about the support policy.|
|NETSDK1203|Ahead-of-time compilation is not supported for the target runtime identifier '{0}'.|
|NETSDK1204|Ahead-of-time compilation is not supported on the current platform '{0}'.|
|NETSDK1205|The Microsoft.Net.Compilers.Toolset.Framework package should not be set directly. Set the property 'BuildWithNetFrameworkHostedCompiler' to 'true' instead if you need it.|
|NETSDK1206|Found version-specific or distribution-specific runtime identifier(s): {0}. Affected libraries: {1}. In .NET 8.0 and higher, assets for version-specific and distribution-specific runtime identifiers will not be found by default. See <https://aka.ms/dotnet/rid-usage> for details.|
|NETSDK1207|Ahead-of-time compilation is not supported for the target framework.|
|NETSDK1208|The target platform identifier {0} was not recognized. This is because MSBuildEnableWorkloadResolver is set to false which disables .NET SDK Workloads which is required for this identifier. Unset this environment variable or MSBuild property to enable workloads.|
|NETSDK1209|The current Visual Studio version does not support targeting {0} {1}.  Either target {0} {2} or lower, or use Visual Studio version {3} or higher.|
|NETSDK1210|IsAotCompatible and EnableAotAnalyzer are not supported for the target framework. Consider multi-targeting to a supported framework to enable ahead-of-time compilation analysis, and set IsAotCompatible only for the supported frameworks. For example:`<IsAotCompatible Condition="$([MSBuild]::IsTargetFrameworkCompatible('$(TargetFramework)', 'net8.0'))">true</IsAotCompatible>`|
|NETSDK1211|EnableSingleFileAnalyzer is not supported for the target framework. Consider multi-targeting to a supported framework to enable single-file analysis, and set EnableSingleFileAnalyzer only for the supported frameworks. For example:`<EnableSingleFileAnalyzer Condition="$([MSBuild]::IsTargetFrameworkCompatible('$(TargetFramework)', '{0}'))">true</EnableSingleFileAnalyzer>`|
|NETSDK1212|IsTrimmable and EnableTrimAnalyzer are not supported for the target framework. Consider multi-targeting to a supported framework to enable trimming, and set IsTrimmable only for the supported frameworks. For example:`<IsTrimmable Condition="$([MSBuild]::IsTargetFrameworkCompatible('$(TargetFramework)', 'net6.0'))">true</IsTrimmable>`|
|NETSDK1213|Targeting .NET 8.0 or higher in Visual Studio 2022 17.7 is not supported.|
|NETSDK1237|Assembly '{0}' was listed in PublishReadyToRunPartialAssemblies but is being compiled into a composite image. Partial compilation is only supported for assemblies compiled separately. The assembly will be compiled fully into the composite image.|
|NETSDK1238|The current .NET SDK ({0}) has known vulnerabilities ({1}).{2} See <https://dotnet.microsoft.com/download>|
|NETSDK1239|The current .NET SDK ({0}) is end of life as of {1}. It will receive no further security updates: <https://dotnet.microsoft.com/download>|
|NETSDK1240|The current .NET SDK ({0}) has no newer release in its feature band. Update to version {1}: <https://dotnet.microsoft.com/download>|
|NETSDK1242|Building {0} projects with the Mono runtime is not supported in .NET 11.0 and later. Use the CoreCLR runtime or target .NET 10.0.|

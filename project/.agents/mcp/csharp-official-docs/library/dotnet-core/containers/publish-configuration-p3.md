---
title: "Containerize a .NET app reference (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/containers/publish-configuration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Containerize a .NET app reference (part 3 of 3)

## Container image naming configuration

Container images follow a specific naming convention. The name of the image is composed of several parts, the registry, optional port, repository, and optional tag and family.

```dockerfile
REGISTRY[:PORT]/REPOSITORY[:TAG[-FAMILY]]
```

For example, consider the fully qualified `mcr.microsoft.com/dotnet/runtime:8.0-alpine` image name:

- `mcr.microsoft.com` is the registry (and in this case represents the Microsoft container registry).
- `dotnet/runtime` is the repository (but some consider this the `user/repository`).
- `8.0-alpine` is the tag and family (the family is an optional specifier that helps disambiguate OS packaging).

Some properties described in the following sections correspond to managing parts of the generated image name. Consider the following table that maps the relationship between the image name and the build properties:

| Image name part   | MSBuild property                              | Example values          |
|-------------------|-----------------------------------------------|-------------------------|
| `REGISTRY[:PORT]` | `ContainerRegistry`     | `mcr.microsoft.com:443` |
| `PORT`            | `ContainerPort`             | `:443`                  |
| `REPOSITORY`      | `ContainerRepository` | `dotnet/runtime`        |
| `TAG`             | `ContainerImageTag`     | `8.0`                   |
| `FAMILY`          | `ContainerFamily`         | `-alpine`               |

## Default container labels

Labels are often used to provide consistent metadata on container images. The built-in container tools provide some default labels to increase the quality of the generated images. All default label generation can be disabled by setting `ContainerGenerateLabels` to `false`. In addition, each default label has an individual enablement flag that can be set to `false` to disable that specific label.

Where possible, existing MSBuild properties provide the values for these labels. Other properties allow for explicit control of their values.

| Annotation | Default value | Dedicated property name | Fallback property name | Enabled property name | Notes |
|------------|---------------|-------------------------|------------------------|-----------------------|-------|
| `org.opencontainers.image.created` and `org.opencontainers.artifact.created` | The RFC 3339 format of the current UTC DateTime | | | `ContainerGenerateLabelsImageCreated` | |
| `org.opencontainers.artifact.description` and `org.opencontainers.image.description` | | `ContainerDescription` | `Description` | `ContainerGenerateLabelsImageDescription` | |
| `org.opencontainers.image.authors` | | `ContainerAuthors` | `Authors` | `ContainerGenerateLabelsImageAuthors` | |
| `org.opencontainers.image.url` | | `ContainerInformationUrl` | `PackageProjectUrl` | `ContainerGenerateLabelsImageUrl` | |
| `org.opencontainers.image.documentation` |                                                                                                    | `ContainerDocumentationUrl`  | `PackageProjectUrl` | `ContainerGenerateLabelsImageDocumentation` | |
| `org.opencontainers.image.version` | | `ContainerVersion` | `PackageVersion` | `ContainerGenerateLabelsImageVersion` | |
| `org.opencontainers.image.vendor` | | `ContainerVendor` | | `ContainerGenerateLabelsImageVendor` | |
| `org.opencontainers.image.licenses` |                                                                                                    | `ContainerLicenseExpression` | `PackageLicenseExpression` | `ContainerGenerateLabelsImageLicenses` | |
| `org.opencontainers.image.title` | | `ContainerTitle` | `Title` | `ContainerGenerateLabelsImageTitle` | |
| `org.opencontainers.image.base.name` | | `ContainerBaseImage` | |`ContainerGenerateLabelsImageBaseName` | |
| `org.opencontainers.image.base.digest` | | | | `ContainerGenerateLabelsImageBaseDigest` | This is the SHA digest of the chosen base image. Available from .NET SDK 9.0.100 onwards. |
| `org.opencontainers.image.source` |                                                                                                    | `PrivateRepositoryUrl` | | `ContainerGenerateLabelsImageSource` | Only written if `PublishRepositoryUrl` is `true`. Also relies on Sourcelink infrastructure being part of the build. |
| `org.opencontainers.image.revision` | | `SourceRevisionId` | | `ContainerGenerateLabelsImageRevision` | Only written if `PublishRepositoryUrl` is `true`. Also relies on Sourcelink infrastructure being part of the build. |

## See also

- Containerize a .NET app with dotnet publish
- .NET container images

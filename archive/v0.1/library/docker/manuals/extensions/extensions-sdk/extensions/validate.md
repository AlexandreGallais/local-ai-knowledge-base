---
title: "Validate your extension"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/extensions/extensions-sdk/extensions/validate.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Validate your extension

Validate your extension before you share or publish it. Validating the extension ensures that the extension:

- Is built with the image labels it requires to display correctly in the marketplace
- Installs and runs without problems

The Extensions CLI lets you validate your extension before installing and running it locally.

The validation checks if the extension’s `Dockerfile` specifies all the required labels and if the metadata file is valid against the JSON schema file.

To validate, run:

```console
$ docker extension validate <name-of-your-extension>
```

If your extension is valid, the following message displays:

```console
The extension image "name-of-your-extension" is valid
```

Before the image is built, it's also possible to validate only the `metadata.json` file:

```console
$ docker extension validate /path/to/metadata.json
```

The JSON schema used to validate the `metadata.json` file against can be found under the releases page.

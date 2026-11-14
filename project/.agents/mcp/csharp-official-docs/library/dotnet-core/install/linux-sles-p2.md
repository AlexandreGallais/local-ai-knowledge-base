---
title: "Install .NET on SUSE Enterprise Linux (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/install/linux-sles.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Install .NET on SUSE Enterprise Linux (part 2 of 2)

## Dependencies

When you install with a package manager, these libraries are installed for you. But, if you manually install .NET or you publish a self-contained app, you must make sure these libraries are installed:

- ca-certificates
- glibc
- krb5
- libgcc_s1
- libicu
- libopenssl3
- libstdc++6
- timezone

For .NET 8, `libz1` (zlib) is also required.

Dependencies can be installed with the `zypper install` command. The following snippet demonstrates installing the `krb5` library:

```bash
sudo zypper install krb5
```

For more information about the dependencies, see Self-contained Linux apps.

## Next steps

- .NET CLI overview
- How to enable TAB completion for the .NET CLI
- Tutorial: Create a console application with .NET

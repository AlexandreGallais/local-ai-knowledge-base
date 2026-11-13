---
title: "windowsfilter storage driver"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/storage/drivers/windowsfilter-driver.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# windowsfilter storage driver

The `windowsfilter` storage driver is the default storage driver for Docker
Engine on Windows. The `windowsfilter` driver uses Windows-native file system
layers to store Docker layers and volume data on disk. The `windowsfilter`
storage driver only works on file systems formatted with NTFS.

## Configure the `windowsfilter` storage driver

For most use cases, no configuration of the `windowsfilter` storage driver is
necessary.

The default storage limit for Docker Engine on Windows is 127 GB. To use a
different storage size, set the `size` option for the `windowsfilter` storage
driver. See windowsfilter options.

Data is stored on the Docker host in `image` and `windowsfilter` subdirectories
within `C:\ProgramData\docker` by default. You can change the storage location
by configuring the `data-root` option in the Daemon configuration file:

```json
{
  "data-root": "d:\\docker"
}
```

You must restart the daemon for the configuration change to take effect.

## Additional information

For more information about how container storage works on Windows, refer to
Microsoft's Containers on Windows documentation.

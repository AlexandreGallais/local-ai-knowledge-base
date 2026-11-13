---
title: "Docker Desktop for Mac Edge release notes (part 8 of 8)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/previous-versions/edge-releases-mac.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop for Mac Edge release notes (part 8 of 8)

### Beta 4 Release (2016-03-22 1.10.3-beta4)

**New Features and Upgrades**

- File system/sharing: Support `inotify` events so that file system events on the Mac will trigger file system activations inside Linux containers

- Install Docker Machine as a part of Docker for Mac install in `/usr/local`

- Added animated popover window to help first-time users get started

- Added a Beta icon to About box

**Known Issues**

- There is a race on startup between Docker and networking that can lead to `Docker.app` not starting on reboot. The workaround is to restart the application manually.

- `Docker.app` sometimes uses 200% CPU after macOS wakes up from sleep mode. The issue is being investigated. The workaround is to restart `Docker.app`.

- VPN/Hostnet: In VPN mode, the `-p` option needs to be explicitly of the form
  `-p <host port>:<container port>`. `-p <port>` and `-P` will not
  work yet.

**Bug fixes and minor changes**

- Hostnet/VPN mode: Fixed Moby DNS resolver failures by proxying the "Recursion Available" flag.

- `docker ps` shows IP address rather than `docker.local`

- Re-enabled support for macOS Yosemite version 10.10

- Ensured binaries are built for 10.10 rather than 10.11

- Fixed “Notification Center”-related crash on startup

- Fixed watchdog crash on startup

### Beta 3 Release (2016-03-15 1.10.3-beta3)

**New Features and Upgrades**

- Improved file sharing write speed in osxfs

- User space networking: Renamed `bridged` mode to `nat` mode

- Docker runs in debug mode by default for new installs

- Docker Engine: Upgraded to 1.10.3

**Bug fixes and minor changes**

- GUI: Auto update automatically checks for new versions again

- File System
  - Fixed osxfs chmod on sockets
  - FixED osxfs EINVAL from `open` using O_NOFOLLOW

- Hypervisor stability fixes, resynced with upstream repository

- Hostnet/VPN mode
  - Fixed get/set VPN mode in Preferences (GUI)
  - Added more verbose logging on errors in `nat` mode
  - Show correct forwarding details in `docker ps/inspect/port` in `nat` mode

- New lines ignored in token entry field

- Feedback mail has app version in subject field

- Clarified open source licenses

- Crash reporting and error handling
  - Fixed HockeyApp crash reporting
  - Fatal GUI errors now correctly terminate the app again
  - Fix proxy panics on EOF when decoding JSON
  - Fix long delay/crash when switching from `hostnet` to `nat` mode

- Logging
  - Moby logs included in diagnose upload
  - App version included in logs on startup

### Beta 2 Release (2016-03-08 1.10.2-beta2)

**New Features and Upgrades**

- GUI
  - Added VPN mode/`hostnet` to Preferences
  - Added disable Time Machine backups of VM disk image to Preferences

- Added `pinata` configuration tool for experimental Preferences

- File System: Added guest-to-guest FIFO and socket file support

- Upgraded Notary to version 0.2

**Bug fixes and minor changes**

- Fixed data corruption bug during cp (use of sendfile/splice)
- Fixed About box to contain correct version string

- Hostnet/VPN mode
  - Stability fixes and tests
  - Fixed DNS issues when changing networks

- Cleaned up Docker startup code related to Moby

- Fixed various problems with linking and dependencies

- Various improvements to logging

### Beta 1 Release (2016-03-01 1.10.2-b1)

- GUI
  - Added dialog to explain why we need admin rights
  - Removed shutdown/quit window
  - Improved machine migration
  - Added “Help” option in menu to open documentation web pages
  - Added license agreement
  - Added MixPanel support

- Added HockeyApp crash reporting
- Improve signal handling on task manager
- Use ISO timestamps with microsecond precision for logging
- Clean up logging format

- Packaging
  - Create /usr/local if it doesn't exist
  - docker-uninstall improvements
  - Remove docker-select as it's no longer used

- Hypervisor
  - Added PID file
  - Networking reliability improvements

- Hostnet
  - Fixed port forwarding issue
  - Stability fixes
  - Fixed setting hostname

- Fixed permissions on `usr/local` symbolic links

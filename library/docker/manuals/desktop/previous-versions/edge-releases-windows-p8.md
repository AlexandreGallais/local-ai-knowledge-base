---
title: "Docker Desktop for Windows Edge Release notes (part 8 of 9)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/previous-versions/edge-releases-windows.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop for Windows Edge Release notes (part 8 of 9)

### Beta 18 Release (2016-07-06 1.12.0-rc3-beta18)

**New**

* Forwarding the ports to localhost is now the default
* Added `http`/`https` proxy configuration to the settings
* The toolbox default machine can be imported on first launch
* Added UI when a crash report is collected and uploaded
* The check for update runs every 6 hours

**Upgrades**

* Docker 1.12.0 RC3

**Bug fixes and minor changes**

* Interrupting a `docker build` with Ctrl-C actually stops the build
* The docker API proxy was failing to deal with 1.12 features (health check for, for example)
* When killing the VM process, ignore when the process is already stopped
* When stopping the VM, always stop the docker proxy
* Prevent the update windows from downloading the `.msi` into `C:\Program Files\Docker`
* All settings should be disabled when Docker is starting. (This regression was introduced in Beta 17)
* VPNKit: Improved scalability as number of network connections increases
* Improve the connection to the database
* Ignore when the shutdown service is not available

### Beta 17 Release (2016-06-29 1.12.0-rc2-beta17)

**Upgrades**

* Linux kernel 4.4.14, aufs 20160627

**Bug fixes and minor changes**

* Support users with spaces in their login
* Fix some cases where `dotnet restore` could hang
* Fixed `docker inspect` on an image
* Removed the console from Hyper-V manager
* Improved diagnostic for VPN connection and addedlogs for the service port openers
* Improve Moby's boot sequence to adapt to longer boot time when swarm services are running
* Forcefully turn off a virtual machine that won't shut down
* Clicking on a link from the changelog opens a browser
* Fix links to the documentation
* Fix the url to download Kitematic
* Renewed the signing certificates
* Fixed errors with the firewall and the network switch
* Fixed parsing errors in the PowerShell script

### Beta 16 Release (2016-06-17 1.12.0-rc2-beta16)

**Upgrades**

* Docker 1.12.0 RC2
* docker-compose 1.8.0 RC1
* docker-machine 0.8.0 RC1
* Alpine 3.4

**Bug fixes and minor changes**

* Fixes to the VPN mode
* Fixed the localhost port forwarding performance issue
* Auto-detect mounted/unmounted drive in the list of shares
    - Changed the name of the application from "DockerforWindows" to "Docker for Windows"
    - Avoid multiple update windows being displayed at the same time

### Beta 15 Release (2016-06-10 1.11.2-beta15)

**New**

* New experimental networking mode, exposing container ports on `localhost`
* New Settings menu to configure sysctl.conf
* New Settings menu to configure http proxies
* The VPN mode setting is removed (VPN mode is now the only supported mode)
* The vSwitch NAT configuration has been removed

**Upgrades**

* Docker 1.11.2
* Linux 4.4.12, AUFS 20160530

**Bug fixes and minor changes**

* Moved `Import from toolbox` option to the General Settings
* Increased the timeout to write to the configuration database
* Fixed an issue where sending anonymous stats to Mixpanel made the application stop
* Faster boot time
* All named pipes are now prefixed with the word `docker`
* Full version number is now displayed in the update window
* Default daemon config does not have debug enabled anymore
* More responsive Settings Panel, with new whales also :-)
* Improved logs and debug information

### Beta 14 Release(2016-06-02 1.11.1-beta14)

**New**

* Enabled configuration of the docker daemon (edit `config.json`)
* The VPN mode is enabled by default
* Removed DHCP for virtual machine network configuration
* User configurable NAT prefix and DNS server
* New feedback window to upload diagnostics dialog
* New status indicator in **Settings** window
* Virtual machine logs are uploaded with a crash report
* Animated welcome whale

**Bug fixes and minor changes**

* Support non-ASCII characters in passwords
* Fixed unshare a drive operation
* Fixed deserialized of exceptions sent from the service
* If the backend service is not running, the GUI now starts it
* The app no longer complains if the backend service is not running and the user just wants to shut down.

**Known issues**

* Due to limitation in the Windows NAT implementation, co-existence with other NAT prefixes needs to be carefully managed.

### Beta 13 Release (2016-05-25 1.11.1-beta13)

**New**

This Beta release includes some significant changes:

* Docker communication is over Hyper-V sockets instead of the network
* Experimental VPN mode, also known as `vpnkit`
* Initial support for `datakit` for configuration
* Redesigned Settings panel
* Docker can now be restarted

**Bug fixes and minor changes**

* Support Net adapters with a different name than "vEthernet (DockerNAT)"
* Sharing now has a better support for domain users
* Fixed Toolbox migration (was broken in Beta12)
* Enabling Hyper-V (was broken in Beta12)
* Fixed error message when invalid labels are passed to `docker run`
* Mixpanel no longer uses roaming App Data
* UI improvements
* Support was added for virtual machines with other IP addresses out of the `10.0.75.0/24` range
* Improved FAQ

**Known issues**

* Due to limitation in the Windows NAT implementation, co-existence with other NAT prefixes needs to be carefully managed.

### Beta 12 Release (2016-17-10 1.11.1-beta12)

**New**

* The application is now separated in two parts. A back-end service and a front-end GUI. The front-end GUI no longer asks for elevated access.

**Bug fixes and minor changes**

* Excluded the network drives from the shares list
* Removed the notification when closing the application
* Minor GUI improvements

**Known issues**

* Due to limitation in the Windows NAT implementation, co-existence with other NAT prefixes needs to be carefully managed.

### Beta 11b Release (2016-05-11 1.11.1-beta11b)

**Hotfixes**

* Fixed an issue with named pipe permissions that prevented Docker from starting

### Beta 11 Release (2016-05-10 1.11.1-beta11)

**New**

* The GUI now runs in non-elevated mode and connects to an elevated Windows service
* Allocate virtual machine memory by 256 MB increments, instead of 1 GB
* Show a meaningful error when the user has an empty password
* Improved Troubleshooting page

**Upgrades**

* docker-compose 1.7.1 (see changelog)
* Kernel 4.4.9

**Bug fixes and minor changes**

* Report the virtual machine's IP in `docker port`
* Handle passwords with spaces
* Show a clear error message when trying to install on Home editions
* Slower whale animation in the system tray
* Proxy is restarting itself when it crashes
* DHCP process handles exceptions gracefully
* Moby (Backend) fixes:
  - Fixed `vsock` half closed issue
  - Added NFS support
  - Hostname is now Moby, not Docker
  - Fixes to disk formatting scripts
  - Kernel upgrade to 4.4.9

**Known issues**

* Due to limitation in the Windows NAT implementation, co-existence with other NAT prefixes needs to be carefully managed.

* Logs for the windows service are not aggregated with logs from the GUI. This is expected to be fixed in future versions.

### Beta 10 Release (2016-05-03 1.11.0-beta10)

**New**

* Improved Settings panel, allows you to configure the virtual machine’s memory and CPUs
* Co-exists with multiple internal Hyper-V switches and improved DHCP handling
* Token validation is now done over HTTPS. This should fix issues with some firewalls and antivirus software.

**Upgrades**

* Docker 1.11.1

**Bug fixes and minor changes**

* Fixed Desktop shortcut name and updated icons
* Preparation to run the backend as service
* Improved logging and Mixpanel events
* Improved code quality
* Improved the build
* New icons

**Known issues**

*  Due to limitation in the Windows NAT implementation, co-existence with other NAT prefixes needs to be carefully managed. See Troubleshooting for more details.

### Beta 9 Release (2016-04-26 1.11.0-beta9)

**New**

* Provide one-click dialog to enable Hyper-V
* Report clear underlying Hyper-V errors

**Bug fixes and minor changes**

* Better handling of some networking issues
* Fixed help menu and start menu getting started URLs
* Restored “Docker is Initializing” notification on first run
* Better error messages during authentication
* Improved logging on error conditions
* Improved build and tests

**Known issues**

* If multiple internal Hyper-V switches exist the Moby virtual machine
may not start correctly. We have identified the issue and
are working on a solution.

### Beta 8 Release (2016-04-20 1.11.0-beta8)

**New**

* Auto-update is installed silently, and relaunches the application when it completes
* Uninstaller can be found in Windows menu
* Kitematic can be downloaded from the Dashboard menu

**Bug fixes and minor changes**

* Better UI in the ShareDrive window
* The firewall alert dialog does not come up as often as previously
* Configured MobyLinux virtual machine with a fixed memory of 2GB
* User password is no longer stored on the host-side KVP
* Uninstall shortcut is available in registry

### Beta 7 Release (2016-04-12 1.11.0-beta7)

**New**

  - Multiple drives can be shared
  - New update window
  - Welcome whale

**Upgrades**

* docker 1.11.0-rc5
* docker-machine 0.7.0-rc3
* docker-compose 1.7.0-rc2

**Bug fixes and minor changes**

* Improved networking configuration and error detection: fixed DHCP renewal and rebind issues
* Allow DNS/DHCP processes to restart on bind error
* Less destructive migration from Docker Toolbox
* Improved documentation
* Better error handling: Moby restarts itself if start takes too long.
* Kill proxy and exit docker before a new version is installed
* The application cannot start twice now
* The proxy stops automatically when the GUI is not running
* Removed existing proxy firewall rules before starting Moby
* The application now collects more and better information on crashes and other issues
* Improved all dialogs and windows
* Added the version to installer's first screen
* Better reset to defaults
* New regression test framework
* The installation MSI is now timestamped
* The Hyper-V install mentions Docker Toolbox only if it is present
* Improved Bugsnag reports: fixed a dependency bug, and added a unique ID to each new report
* Improved the build
* Improved code quality

**Known issues**

- Settings are now serialized in JSON. This install loses the current settings.

- Docker needs to open ports on the firewall. Sometimes, the user sees a firewall alert dialog. The user should allow the ports to be opened.

- The application was upgraded to 64 bits. The installation path changed to `C:\Program Files\Docker\Docker`. Users might need to close any Powershell/Cmd windows that were already open before the update to get the new `PATH`. In some cases, users may need to log off and on again.

**Bug Fixes**

  - Fixed DHCP renewal and rebind
  - Only mention toolbox on Hyper-V install if it's present
  - The application does not start twice now
  - DNS/DHCP processes are allowed to restart on bind error now
  - Removed the window that opens quickly during bugsnag reports
  - Fixed OS reported by Bugsnag
  - Improved the build
  - Improved code quality

### Beta 6 Release (2016-04-05 1.11.0.1288)

**Enhancements**

- Docs are updated for Beta 6!
- Support roaming: DNS queries are forwarded to the host
- Improved startup times by running a DHCP server on the host
- New settings dialog design
- Support Windows paths with -v
- Updated Docker CLI and daemon to 1.11.0-rc3
- Updated docker-machine to 0.7.0-rc2
- Updated docker-compose to 1.7.0-rc1
- Now install docker-credential-wincred
- Allow non-root users in containers to create files on volume mounts
- Automatically install Hyper-V
- The application is now 64 bits
- Improved wording in all dialog boxes and error messages
- Removed exit confirmation
- Show clickable URL in the Install HyperV message box
- Dashboard link to Kitematic (as on Mac)
- Moby kernel updated to 4.4.6
- The registry key was changed to HKLM\SOFTWARE\Docker Inc.\Docker\1.0

**Known issues**

- Migration from Docker Toolbox can fail sometimes. If this happens, the workaround is to restart the application.

- Docker needs to open ports on the firewall, which can activate a firewall alert dialog. Users should allow the ports to be opened.

- The application was upgraded to 64 bits. The installation path changed to `C:\Program Files\Docker\Docker`. If users have PowerShell/Cmd windows already open before the update, they might need to close them to catch the new PATH. In some cases, users need to log off and on again.

**Bug Fixes**

- Kill virtual machines that cannot be shut down properly

- Improved the diagnostic information sent with bugsnag reports

- Settings window shows when the drive is shared or not
`C:` drive can be bind mounted with `//c` or `/c`. Used to be `//c/`

- Don't try to submit empty tokens

- Fixed the version shown in the About box

- Fixed a race condition on the logs

- Fixed a race condition on the settings

- Fixed broken links in the documentation

- Replaced `sha1` with actual version in the assemblies

- Don't start the unused agent process

### Beta 5 Release (2016-03-29 1.10.6)

**Enhancements**

* Remove debug console
* Open browser with hyper-v installation instructions
* Added CloudFront for downloads from Europe
* Capture qemu logs during toolbox upgrades
* Rename alpha distribution channel to beta

**Bug Fixes**

* Fix diagnose section in bugsnag report
* Fix msi version
* Don't truncate Toolbox link

> **Note:**
>
> Docker for Windows skipped from Beta 1 to Beta 5 at this point to synch up the version numbering with Docker for Mac, which went into beta cycles a little earlier.

### Beta 1 Release (2016-03-24 1.10.6)

**Enhancements**

- Display the third party licenses
- Display the license agreement
- The application refuses to start if Hyper-V is not enabled
- Rename `console` to `debug console`
- Remove `machine` from notification
- Open the feedback forum
- Use same MixPanel project for Windows and macOS
- Align MixPanel events with macOS
- Added a script to diagnose problems
- Submit diagnostic with bugsnag reports
- MixPanel heartbeat every hour

**Bug Fixes**

- Accept all versions of Enterprise 10, Pro 10 and Education 10 during installation (Eval, N, ...)
- Fix Linux kernel crashes with certain applications or somesuch
- Fix notifications that are not shown
- Animate the systray whale on reset
- Shorten the enrollment process timeout
- Properly unmount shares when the user un-selects the setting
- Don't install on unsupported builds

### Alpha 4 Release (2016-03-10 1.10.4.0)

- Faster Startup & Shutdown
- Use host DNS parameters
- Enrollment System
- Recreating manually removed vm
- More MixPanel Events
- Various Bug Fixes

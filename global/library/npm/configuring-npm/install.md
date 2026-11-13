---
title: "Install"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/configuring-npm/install.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# Install

### Description

To publish and install packages to and from the public npm registry, you must install Node.js and the npm command line interface using either a Node version manager or a Node installer.
**We strongly recommend using a Node version manager to install Node.js and npm.** We do not recommend using a
Node installer, since the Node installation process installs npm in a directory with local permissions and can cause permissions errors when you run npm packages globally.

### Overview

- Checking your version of npm and Node.js
- Using a Node version manager to install Node.js and npm
- Using a Node installer to install Node.js and npm

### Checking your version of npm and Node.js

To see if you already have Node.js and npm installed and check the installed version, run the following commands:

```
node -v
npm -v
```

### Using a Node version manager to install Node.js and npm

Node version managers allow you to install and switch between multiple versions of Node.js and npm on your system so you can test your applications on multiple versions of npm to ensure they work for users on different versions.
You can search for them on GitHub.

### Using a Node installer to install Node.js and npm

If you are unable to use a Node version manager, you can use a Node installer to install both Node.js and npm on your system.

* Node.js installer
* NodeSource installer.
If you use Linux, we recommend that you use a NodeSource installer.

#### macOS or Windows Node installers

If you're using macOS or Windows, use one of the installers from the Node.js download page.
Be sure to install the version labeled **LTS**. Other versions have not yet been tested with npm.

#### Linux or other operating systems Node installers

If you're using Linux or another operating system, use one of the following installers:

- NodeSource installer (recommended)
- One of the installers on the Node.js download page

Or see this page to install npm for Linux in the way many Linux developers prefer.

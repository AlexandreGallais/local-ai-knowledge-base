---
title: "Install Docker Scout"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/scout/install.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Install Docker Scout

The Docker Scout CLI plugin comes pre-installed with Docker Desktop.

If you run Docker Engine without Docker Desktop,
Docker Scout doesn't come pre-installed,
but you can install it as a standalone binary.

## Installation script

To install the latest version of the plugin, run the following commands:

```console
$ curl -fsSL https://raw.githubusercontent.com/docker/scout-cli/main/install.sh -o install-scout.sh
$ sh install-scout.sh
```

> **Note:**
>
> Always examine scripts downloaded from the internet before running them
> locally. Before installing, make yourself familiar with potential risks and
> limitations of the convenience script.

## Manual installation

**Linux**

1. Download the latest release from the releases page.
2. Create a subdirectory under `$HOME/.docker` called `scout`.

   ```console
   $ mkdir -p $HOME/.docker/scout
   ```

3. Extract the archive and move the `docker-scout` binary to the `$HOME/.docker/scout` directory.
4. Make the binary executable: `chmod +x $HOME/.docker/scout/docker-scout`.
5. Add the `scout` subdirectory to your `.docker/config.json` as a plugin directory:

   ```json
   {
     "cliPluginsExtraDirs": [
       "/home/<USER>/.docker/scout"
     ]
   }
   ```

   Substitute `<USER>` with your username on the system.

   > **Note:**
   > The path for `cliPluginsExtraDirs` must be an absolute path.

**macOS**

1. Download the latest release from the releases page.
2. Create a subdirectory under `$HOME/.docker` called `scout`.

   ```console
   $ mkdir -p $HOME/.docker/scout
   ```

3. Extract the archive and move the `docker-scout` binary to the `$HOME/.docker/scout` directory.
4. Make the binary executable:

   ```console
   $ chmod +x $HOME/.docker/scout/docker-scout
   ```

5. Authorize the binary to be executable on macOS:

   ```console
   xattr -d com.apple.quarantine $HOME/.docker/scout/docker-scout
   ```

6. Add the `scout` subdirectory to your `.docker/config.json` as a plugin directory:

   ```json
   {
     "cliPluginsExtraDirs": [
       "/Users/<USER>/.docker/scout"
     ]
   }
   ```

   Substitute `<USER>` with your username on the system.

   > **Note:**
   > The path for `cliPluginsExtraDirs` must be an absolute path.

**Windows**

1. Download the latest release from the releases page.
2. Create a subdirectory under `%USERPROFILE%/.docker` called `scout`.

   ```console
   % mkdir %USERPROFILE%\.docker\scout
   ```

3. Extract the archive and move the `docker-scout.exe` binary to the `%USERPROFILE%\.docker\scout` directory.
4. Add the `scout` subdirectory to your `.docker\config.json` as a plugin directory:

   ```json
   {
     "cliPluginsExtraDirs": [
       "C:\Users\<USER>\.docker\scout"
     ]
   }
   ```

   Substitute `<USER>` with your username on the system.

   > **Note:**
   > The path for `cliPluginsExtraDirs` must be an absolute path.

## Container image

The Docker Scout CLI plugin is also available as a container image.
Use the `docker/scout-cli` to run `docker scout` commands without installing the CLI plugin on your host.

```console
$ docker run -it \
  -e DOCKER_SCOUT_HUB_USER=<your Docker Hub user name> \
  -e DOCKER_SCOUT_HUB_PASSWORD=<your Docker Hub PAT>  \
  docker/scout-cli <command>
```

## GitHub Action

The Docker Scout CLI plugin is also available as a GitHub action.
You can use it in your GitHub workflows to automatically analyze images and evaluate policy compliance with each push.

Docker Scout also integrates with many more CI/CD tools, such as Jenkins, GitLab, and Azure DevOps.
Learn more about the integrations available for Docker Scout.

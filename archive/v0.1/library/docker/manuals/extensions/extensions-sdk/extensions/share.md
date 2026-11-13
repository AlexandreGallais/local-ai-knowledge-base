---
title: "Share your extension"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/extensions/extensions-sdk/extensions/share.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Share your extension

Once your extension image is accessible on Docker Hub, anyone with access to the image can install the extension.

People can install your extension by typing `docker extension install my/awesome-extension:latest` in to the terminal.

However, this option doesn't provide a preview of the extension before it's installed.

## Create a share URL

Docker lets you share your extensions using a URL.

When people navigate to this URL, it opens Docker Desktop and displays a preview of your extension in the same way as an extension in the Marketplace. From the preview, users can then select **Install**.

To generate this link you can either:

- Run the following command:

  ```console
  $ docker extension share my/awesome-extension:0.0.1
  ```

- Once you have installed your extension locally, navigate to the **Manage** tab and select **Share**.

> **Note:**
>
> Previews of the extension description or screenshots, for example, are created using extension labels.

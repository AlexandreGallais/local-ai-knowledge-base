---
title: "Publish in the Marketplace"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/extensions/extensions-sdk/extensions/publish.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Publish in the Marketplace

> **Important:**
>
> New submissions to the Docker Extensions Marketplace are paused while Docker reviews Marketplace security. You can still update existing extensions, and private Marketplace extensions are unaffected. Contact user@example.com if you have additional questions.

## Submit your extension to the Marketplace

Docker Desktop displays published extensions in the Extensions Marketplace on Docker Desktop and Docker Hub.
The Extensions Marketplace is a space where developers can discover extensions to improve their developer experience and propose their own extension to be available for all Desktop users.

Whenever you are ready to publish your extension in the Marketplace, you can self-publish your extension

> **Note:**
>
> As the Extension Marketplace continues to add new features for both Extension users and publishers, you are expected
> to maintain your extension over time to ensure it stays available in the Marketplace.

> **Important:**
>
> The Docker manual review process for extensions is paused at the moment. Submit your extension through the automated submission process

### Before you submit

Before you submit your extension, it must pass the validation checks.

It is highly recommended that your extension follows the guidelines outlined in this section before submitting your
extension. If you request a review from the Docker Extensions team and have not followed the guidelines, the review process may take longer.

These guidelines don't replace Docker's terms of service or guarantee approval:
- Review the design guidelines
- Ensure the UI styling is in line with Docker Desktop guidelines
- Ensure your extensions support both light and dark mode
- Consider the needs of both new and existing users of your extension
- Test your extension with potential users
- Test your extension for crashes, bugs, and performance issues
- Test your extension on various platforms (Mac, Windows, Linux)
- Read the Terms of Service

#### Validation process

Submitted extensions go through an automated validation process. If all the validation checks pass <example-value>, the extension is
published on the Marketplace and accessible to all users within a few hours.
It is the fastest way to get developers the tools they need and to get feedback from them as you work to
evolve/polish your extension.

> **Important:**
>
> Docker Desktop caches the list of extensions available in the Marketplace for 12 hours. If you don't see your
> extension in the Marketplace, you can restart Docker Desktop to force the cache to refresh.

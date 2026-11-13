---
title: "migrate-with-ai"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/dhi/migration/migrate-with-ai.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# migrate-with-ai

---
title: Migrate using Gordon
linktitle: AI-assisted migration
description: Use Gordon to automatically migrate your Dockerfile to Docker Hardened Images
weight: 15
keywords: ai assistant, migrate Dockerfile, docker hardened images, automated migration
params:
  sidebar:
    badge:
      color: violet
      text: Experimental
---

You can use Gordon to automatically migrate your
Dockerfile to use Docker Hardened Images (DHI).

1. Ensure Gordon is enabled.
2. In the terminal, navigate to the directory containing your Dockerfile.
3. Start a conversation with the assistant:
   ```bash
   docker ai
   ```
4. Type:
   ```console
   "Migrate my dockerfile to DHI"
   ```
5. Follow the conversation with the assistant. The assistant will edit your Dockerfile, so when
   it requests access to the filesystem and more, type `yes` to allow the assistant to proceed.

When the migration is complete, you see a success message:

```text
The migration to Docker Hardened Images (DHI) is complete. The updated Dockerfile
successfully builds the image, and no vulnerabilities were detected in the final image.
The functionality and optimizations of the original Dockerfile have been preserved.
```

> **Important:**
>
> As with any AI tool, you must verify the assistant's edits and test your image.

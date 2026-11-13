---
title: "Troubleshoot Docker Offload v1"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/offload/v1/troubleshoot.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Troubleshoot Docker Offload v1

Docker Offload v1 requires:

- Authentication
- An active internet connection
- No restrictive proxy or firewall blocking traffic to Docker Cloud
- Access to Docker Offload v1
- Docker Desktop

Docker Desktop uses Docker Offload v1 to run both builds and containers in the
cloud.
If builds or containers are failing to run, falling back to local, or reporting
session errors, use the following steps to help resolve the issue.

If `docker offload start` reports that you don't have access to Docker Offload v1,
or tells you to enable Docker Offload in settings, see Docker Offload commands
report an
error
for how the **Enable Docker Offload** setting and your subscription interact.

1. Ensure Docker Offload is enabled in Docker Desktop:

   1. Open Docker Desktop and sign in.
   2. Go to **Settings** > **Docker Offload**.
   3. Ensure that **Enable Docker Offload** is toggled on.

2. Use the following command to check if the connection is active:

   ```console
   $ docker offload status
   ```

3. To get more information, run the following command:

   ```console
   $ docker offload diagnose
   ```

4. If you're not connected, start a new session:

   ```console
   $ docker offload start
   ```

5. Verify authentication with `docker login`.

6. If needed, you can sign out and then sign in again:

   ```console
   $ docker logout
   $ docker login
   ```

7. Verify your usage. For more information, see Docker Offload v1 usage.

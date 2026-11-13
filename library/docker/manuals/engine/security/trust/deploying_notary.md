---
title: "Deploy Notary Server with Compose"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/security/trust/deploying_notary.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Deploy Notary Server with Compose

The easiest way to deploy Notary Server is by using Docker Compose. To follow the procedure on this page, you must have already installed Docker Compose.

1. Clone the Notary repository.

   ```console
   $ git clone https://github.com/theupdateframework/notary.git
   ```

2. Build and start Notary Server with the sample certificates.

   ```console
   $ docker compose up -d 
   ```

   For more detailed documentation about how to deploy Notary Server, see the instructions to run a Notary service as well as the Notary repository for more information.

3. Make sure that your Docker or Notary client trusts Notary Server's certificate before you try to interact with the Notary server.

See the instructions for Docker or
for Notary depending on which one you are using.

## If you want to use Notary in production

The Compose sample on this page is for local testing and uses sample
certificates. For a production deployment, follow the upstream
instructions to run a Notary service
and the rest of the Notary repository.

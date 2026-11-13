---
title: "Move images between repositories"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/docker-hub/repos/manage/hub-images/move.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Move images between repositories

Consolidating and organizing your Docker images across repositories can
streamline your workflows, whether you're managing personal projects or
contributing to an organization. This topic explains how to move images between
Docker Hub repositories, ensuring that your content remains accessible and
organized under the correct accounts or namespaces.

> **Note:**
>
> For bulk migrations, multi-arch images, or scripted workflows, see Bulk
> migrate Docker images.

## Personal to personal

When consolidating personal repositories, you can pull private images from the initial repository and push them into another repository owned by you. To avoid losing your private images, perform the following steps:

1. Sign up for a new Docker account with a personal subscription. (Be sure to verify your account after you've signed up.)
2. Sign in to Docker using your original Docker account
3. Pull your images:

   ```console
   $ docker pull namespace1/docker101tutorial
   ```

4. Tag your private images with your newly created Docker username, for example:

   ```console
   $ docker tag namespace1/docker101tutorial new_namespace/docker101tutorial
   ```

5. Using `docker login` from the CLI, sign in with your newly created Docker account, and push your newly tagged private images to your new Docker account namespace:

   ```console
   $ docker push new_namespace/docker101tutorial
   ```

The private images that existed in your previous account are now available in your new account.

## Personal to an organization

To avoid losing your private images, you can pull your private images from your
personal account and push them to an organization that's owned by you.

1. Navigate to Docker Hub and select **My Hub**.
2. Select the applicable organization and verify that your user account is a member of the organization.
3. Sign in to Docker Hub using your original Docker account, and pull your images:

   ```console
   $ docker pull namespace1/docker101tutorial
   ```

4. Tag your images with your new organization namespace:

   ```console
   $ docker tag namespace1/docker101tutorial <new_org>/docker101tutorial
   ```

5. Push your newly tagged images to your new org namespace:

   ```console
   $ docker push new_org/docker101tutorial
   ```

The private images that existed in your user account are now available for your organization.

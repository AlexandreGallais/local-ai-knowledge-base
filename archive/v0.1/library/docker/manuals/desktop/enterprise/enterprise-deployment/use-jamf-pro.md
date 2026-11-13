---
title: "Deploy with Jamf Pro"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/enterprise/enterprise-deployment/use-jamf-pro.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Deploy with Jamf Pro

Learn how to deploy Docker Desktop for Mac using Jamf Pro, including uploading the installer and creating a deployment policy.

First, upload the package:

1. From the Jamf Pro console, navigate to **Computers** > **Management Settings** > **Computer Management** > **Packages**.
2. Select **New** to add a new package.
3. Upload the `Docker.pkg` file.

Next, create a policy for deployment:

1. Navigate to **Computers** > **Policies**.
2. Select **New** to create a new policy.
3. Enter a name for the policy, for example "Deploy Docker Desktop".
4. Under the **Packages** tab, add the Docker package you uploaded.
5. Configure the scope to target the devices or device groups on which you want to install Docker.
6. Save the policy and deploy.

For more information, see Jamf Pro's official documentation.

## Additional resources

- Learn how to enforce sign-in for your users.

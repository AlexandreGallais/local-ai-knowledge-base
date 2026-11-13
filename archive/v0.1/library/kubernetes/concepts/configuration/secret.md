---
title: "Secrets (part 1 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/configuration/secret.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Secrets

A Secret is an object that contains a small amount of sensitive data such as
a password, a token, or a key. Such information might otherwise be put in a
pod specification or in a
container image. Using a
Secret means that you don't need to include confidential data in your
application code.

Because Secrets can be created independently of the Pods that use them, there
is less risk of the Secret (and its data) being exposed during the workflow of
creating, viewing, and editing Pods. Kubernetes, and applications that run in
your cluster, can also take additional precautions with Secrets, such as avoiding
writing sensitive data to nonvolatile storage.

Secrets are similar to ConfigMaps
but are specifically intended to hold confidential data.

**Caution:**
Kubernetes Secrets are, by default, stored unencrypted in the API server's underlying data store
(etcd). Anyone with API access can retrieve or modify a Secret, and so can anyone with access to etcd.
Additionally, anyone who is authorized to create a Pod in a namespace can use that access to read
any Secret in that namespace; this includes indirect access such as the ability to create a
Deployment.

In order to safely use Secrets, take at least the following steps:

1. Enable Encryption at Rest for Secrets.
1. Enable or configure RBAC rules with
   least-privilege access to Secrets.
1. Restrict Secret <example-value> to specific containers.
1. Consider using external Secret store providers.

For more guidelines to manage and improve the security of your Secrets, refer to
Good practices for Kubernetes Secrets.

See Information security for Secrets for more details.

## Uses for Secrets

You can use Secrets for purposes such as the following:

- Set environment variables for a container.
- Provide credentials such as SSH keys or passwords to Pods.
- Allow the kubelet to pull container images from private registries.

The Kubernetes control plane also uses Secrets; for example,
bootstrap token <example-value> are a mechanism to
help automate node registration.

### Use case: dotfiles in a secret <example-value>

You can make your data "hidden" by defining a key that begins with a dot.
This key <example-value> a dotfile or "<example-value>" file. For example, when the following Secret
is mounted into a volume, `secret-volume`, the volume will contain a single file,
called `.secret-file`, and the `dotfile-test-container` will have this file
present at the path `/etc/secret-volume/.secret-file`.

**Note:**
Files beginning with dot characters are hidden from the output of `ls -l`;
you must use `ls -la` to see them when listing directory contents.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: dotfile-secret
data:
  .secret-file: <example-value>
---
apiVersion: v1
kind: Pod
metadata:
  name: secret-dotfiles-pod
spec:
  volumes:
    - name: secret-volume
      secret:
        secretName: dotfile-secret
  containers:
    - name: dotfile-test-container
      image: registry.k8s.io/busybox
      command:
        - ls
        - "-l"
        - "<example-value>"
      volumeMounts:
        - name: secret-volume
          readOnly: true
          mountPath: "<example-value>"
```

### Use case: Secret <example-value> to one container in a Pod

Consider a program that needs to handle HTTP requests, do some complex business
logic, and then sign some messages with an HMAC. Because it has complex
application logic, there might be an unnoticed remote file reading exploit in
the server, which could expose the private key to an attacker.

This could be divided into two processes in two containers: a frontend container
which handles user interaction and business logic, but which cannot see the
private key; and a signer container that can see the private key, and responds
to simple signing requests from the frontend (for example, over localhost networking).

With this partitioned approach, an attacker now has to trick the application
server into doing something rather arbitrary, which may be harder than getting
it to read a file.

### Alternatives to Secrets

Rather than using a Secret to protect confidential data, you can pick from alternatives.

Here are some of your options:

- If your cloud-native component needs to authenticate to another application that you
  know is running within the same Kubernetes cluster, you can use a
  ServiceAccount
  and its tokens to identify your client.
- There are third-party tools that you can run, either within or outside your cluster,
  that manage sensitive data. For example, a service that Pods access over HTTPS,
  that reveals a Secret if the client correctly authenticates (for example, with a ServiceAccount
  token).
- For authentication, you can implement a custom signer for X.509 certificates, and use
  CertificateSigningRequests
  to let that custom signer issue certificates to Pods that need them.
- You can use a device plugin
  to expose node-local encryption hardware to a specific Pod. For example, you can schedule
  trusted Pods onto nodes that provide a Trusted Platform Module, configured out-of-band.

You can also combine two or more of those options, including the option to use Secret <example-value> themselves.

For example: implement (or deploy) an operator
that fetches short-lived session tokens from an external service, and then creates Secrets based
on those short-lived session tokens. Pods running in your cluster can make use of the session tokens,
and operator ensures they are valid. This separation means that you can run Pods that are unaware of
the exact mechanisms for issuing and refreshing those session tokens.

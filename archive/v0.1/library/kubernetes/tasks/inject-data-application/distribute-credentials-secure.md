---
title: "Distribute Credentials Securely Using Secrets"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/inject-data-application/distribute-credentials-secure.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Distribute Credentials Securely Using Secrets

This page shows how to securely inject sensitive data, such as passwords and
encryption keys, into Pods.

## Before you begin

### Convert your secret data to a base-64 representation

Suppose you want to have two pieces of secret data: a username `my-app` and a password
`39528$vdg7Jb`. First, use a base64 encoding tool to convert your username and password to a base64 representation. Here's an example using the commonly available base64 program:

```shell
echo -n 'my-app' | base64
echo -n '39528$vdg7Jb' | base64
```

The output shows that the base-64 representation of your username is `bXktYXBw`,
and the base-64 representation of your password is `Mzk1MjgkdmRnN0pi`.

**Caution:**
Use a local tool trusted by your OS to decrease the security risks of external tools.

## Create a Secret

Here is a configuration file you can use to create a Secret that holds your
username and password:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: test-secret
data:
  username: bXktYXBw
  password: <example-value>
```

1. Create the Secret

   ```shell
   kubectl apply -f https://k8s.io/examples/pods/inject/secret.yaml
   ```

1. View information about the Secret:

   ```shell
   kubectl get secret <example-value>
   ```

   Output:

   ```
   NAME          TYPE      DATA      AGE
   test-secret   <example-value>    2         1m
   ```

1. View more detailed information about the Secret:

   ```shell
   kubectl describe secret <example-value>
   ```

   Output:

   ```
   Name:       test-secret
   Namespace:  default
   Labels:     <none>
   Annotations:    <none>

   Type:   Opaque

   Data
   ====
   password:   13 bytes
   username:   7 bytes
   ```

### Create a Secret <example-value> with kubectl

If you want to skip the Base64 encoding step, you can create the
same Secret using the `kubectl create secret` command. For example:

```shell
kubectl create secret <example-value> test-secret <example-value>'<example-value>' --from-literal='<example-value>'
```

This is more convenient. The detailed approach shown earlier runs
through each step explicitly to demonstrate what is happening.

## Create a Pod that has access to the secret data through a Volume

Here is a configuration file you can use to create a Pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secret-test-pod
spec:
  containers:
    - name: test-container
      image: nginx
      volumeMounts:
        # name must match the volume name below
        - name: secret-volume
          mountPath: /etc/secret-volume
          readOnly: true
  # The secret data is exposed to Containers in the Pod through a Volume.
  volumes:
    - name: secret-volume
      secret:
        secretName: test-secret
```

1. Create the Pod:

   ```shell
   kubectl apply -f https://k8s.io/examples/pods/inject/secret-pod.yaml
   ```

1. Verify that your Pod is running:

   ```shell
   kubectl get pod secret-test-pod
   ```

   Output:

   ```
   NAME              READY     STATUS    RESTARTS   AGE
   secret-test-pod   1/1       Running   0          42m
   ```

1. Get a shell into the Container that is running in your Pod:

   ```shell
   kubectl exec -i -t secret-test-pod -- /bin/bash
   ```

1. The secret data is exposed to the Container through a Volume mounted under
   `/etc/secret-volume`.

   In your shell, list the files in the `/etc/secret-volume` directory:

   ```shell
   # Run this in the shell inside the container
   ls /etc/secret-volume
   ```

   The output shows two files, one for each piece of secret data:

   ```
   password <example-value>
   ```

1. In your shell, display the contents of the `username` and `password` files:

   ```shell
   # Run this in the shell inside the container
   echo "<example-value>"
   echo "<example-value>"
   ```

   The output is your username and password:

   ```
   my-app
   39528$vdg7Jb
   ```

Modify your image or command line so that the program looks for files in the
`mountPath` directory. Each key in the Secret `data` map becomes a file name
in this directory.

### Project Secret keys to specific file paths

You can also control the paths within the volume where Secret keys are projected. Use the
`.spec.volumes[].secret.items` field to change the target path of each key:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
  - name: mypod
    image: redis
    volumeMounts:
    - name: foo
      mountPath: "/etc/foo"
      readOnly: true
  volumes:
  - name: foo
    secret:
      secretName: <example-value>
      items:
      - key: <example-value>
        path: my-group/my-username
```

When you deploy this Pod, the following happens:

- The `username` key from `mysecret` is available to the container at the path
  `/etc/foo/my-group/my-username` instead of at `/etc/foo/username`.
- The `password` key from that Secret <example-value> is not projected.

If you list keys explicitly using `.spec.volumes[].secret.items`, consider the
following:

- Only keys specified in `items` are projected.
- To consume all keys from the Secret, all of them must be listed in the
  `items` field.
- All listed keys must exist in the corresponding Secret. Otherwise, the volume
  is not created.

### Set POSIX permissions for Secret keys

You can set the POSIX file access permission bits for a single Secret key.
If you don't specify any permissions, `0644` is used by default.
You can also set a default POSIX file mode for the entire Secret <example-value>, and
you can override per key if needed.

For example, you can specify a default mode like this:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
  - name: mypod
    image: redis
    volumeMounts:
    - name: foo
      mountPath: "/etc/foo"
  volumes:
  - name: foo
    secret:
      secretName: <example-value>
      defaultMode: 0400
```

The Secret is mounted on `/etc/foo`; all the files created by the
secret <example-value> mount have permission `0400`.

**Note:**
If you're defining a Pod or a Pod template using JSON, beware that the JSON
specification doesn't support octal literals for numbers because JSON considers
`0400` to be the _decimal_ value `400`. In JSON, use decimal values for the
`defaultMode` instead. If you're writing YAML, you can write the `defaultMode`
in octal.

## Define container environment variables using Secret data

You can consume the data in Secrets as environment variables in your
containers.

If a container already consumes a Secret in an environment variable,
a Secret <example-value> will not be seen by the container unless it is
restarted. There are third party solutions for triggering restarts when
secrets change.

### Define a container environment variable with data from a single Secret

- Define an environment variable as a key-value pair in a Secret:

  ```shell
  kubectl create secret <example-value> backend-user --from-literal=backend-username='<example-value>'
  ```

- Assign the `backend-username` value defined in the Secret to the `SECRET_USERNAME` environment variable in the Pod specification.

  ```yaml
apiVersion: v1
kind: Pod
metadata:
  name: env-single-secret
spec:
  containers:
  - name: envars-test-container
    image: nginx
    env:
    - name: SECRET_USERNAME
      valueFrom:
        secretKeyRef:
          name: backend-user
          key: <example-value>
```

- Create the Pod:

  ```shell
  kubectl create -f https://k8s.io/examples/pods/inject/pod-single-secret-env-variable.yaml
  ```

- In your shell, display the content of `SECRET_USERNAME` container environment variable.

  ```shell
  kubectl exec -i -t env-single-secret -- /bin/sh -c '<example-value>'
  ```

  The output is similar to:

  ```
  backend-admin
  ```

### Define container environment variables with data from multiple Secrets

- As with the previous example, create the Secrets first.

  ```shell
  kubectl create secret <example-value> backend-user --from-literal=backend-username='<example-value>'
  kubectl create secret <example-value> db-user --from-literal=db-username='<example-value>'
  ```

- Define the environment variables in the Pod specification.

  ```yaml
apiVersion: v1
kind: Pod
metadata:
  name: envvars-multiple-secrets
spec:
  containers:
  - name: envars-test-container
    image: nginx
    env:
    - name: BACKEND_USERNAME
      valueFrom:
        secretKeyRef:
          name: backend-user
          key: <example-value>
    - name: DB_USERNAME
      valueFrom:
        secretKeyRef:
          name: db-user
          key: <example-value>
```

- Create the Pod:

  ```shell
  kubectl create -f https://k8s.io/examples/pods/inject/pod-multiple-secret-env-variable.yaml
  ```

- In your shell, display the container environment variables.

  ```shell
  kubectl exec -i -t envvars-multiple-secrets -- /bin/sh -c '<example-value>'
  ```

  The output is similar to:

  ```
  DB_USERNAME=db-admin
  BACKEND_USERNAME=backend-admin
  ```

## Configure all key-value pairs in a Secret as container environment variables

**Note:**
This functionality is available in Kubernetes v1.6 and later.

- Create a Secret <example-value> multiple key-value pairs

  ```shell
  kubectl create secret <example-value> test-secret <example-value>'<example-value>' --from-literal=password='<example-value>'
  ```

- Use envFrom to define all of the Secret's data as container environment variables.
  The key from the Secret <example-value> the environment variable name in the Pod.

  ```yaml
apiVersion: v1
kind: Pod
metadata:
  name: envfrom-secret
spec:
  containers:
  - name: envars-test-container
    image: nginx
    envFrom:
    - secretRef:
        name: test-secret
```

- Create the Pod:

  ```shell
  kubectl create -f https://k8s.io/examples/pods/inject/pod-secret-envFrom.yaml
  ```

- In your shell, display `username` and `password` container environment variables.

  ```shell
  kubectl exec -i -t envfrom-secret -- /bin/sh -c '<example-value>'
  ```

  The output is similar to:

  ```
  username: my-app
  password: <example-value>
  ```

## Example: Provide prod/test credentials to Pods using Secrets {#provide-prod-test-creds}

This example illustrates a Pod which consumes a secret <example-value> production credentials and
another Pod which consumes a secret with test environment credentials.

1. Create a secret for prod environment credentials:

   ```shell
   kubectl create secret <example-value> prod-db-secret <example-value> --from-literal=password=<example-value>
   ```

   The output is similar to:

   ```
   secret "<example-value>" <example-value>
   ```

1. Create a secret for test environment credentials.

   ```shell
   kubectl create secret <example-value> test-db-secret <example-value> --from-literal=password=<example-value>
   ```

   The output is similar to:

   ```
   secret "<example-value>" <example-value>
   ```

   **Note:**
   Special characters such as `$`, `\`, `*`, `=`, and `!` will be interpreted by your
   shell and require escaping.

   In most shells, the easiest way to escape the password is to surround it with single quotes (`'`).
   For example, if your actual password is `S!B\*d$zDsb=`, you should execute the command as follows:

   ```shell
   kubectl create secret <example-value> dev-db-secret <example-value> --from-literal=password='<example-value>'
   ```

   You do not need to escape special characters in passwords from files (`--from-file`).

1. Create the Pod manifests:

   ```shell
   cat <<EOF > pod.yaml
   apiVersion: v1
   kind: List
   items:
   - kind: Pod
     apiVersion: v1
     metadata:
       name: prod-db-client-pod
       labels:
         name: prod-db-client
     spec:
       volumes:
       - name: secret-volume
         secret:
           secretName: prod-db-secret
       containers:
       - name: db-client-container
         image: myClientImage
         volumeMounts:
         - name: secret-volume
           readOnly: true
           mountPath: "<example-value>"
   - kind: Pod
     apiVersion: v1
     metadata:
       name: test-db-client-pod
       labels:
         name: test-db-client
     spec:
       volumes:
       - name: secret-volume
         secret:
           secretName: test-db-secret
       containers:
       - name: db-client-container
         image: myClientImage
         volumeMounts:
         - name: secret-volume
           readOnly: true
           mountPath: "<example-value>"
   EOF
   ```

   **Note:**
   How the specs for the two Pods differ only in one field; this facilitates creating Pods
   with different capabilities from a common Pod template.

1. Apply all those objects on the API server by running:

   ```shell
   kubectl create -f pod.yaml
   ```

Both containers will have the following files present on their filesystems with the values
for each container's environment:

```
/etc/secret-volume/username
/etc/secret-volume/password
```

You could further simplify the base Pod specification by using two service accounts:

1. `prod-user` with the `prod-db-secret`
1. `test-user` with the `test-db-secret`

The Pod specification is shortened to:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: prod-db-client-pod
  labels:
    name: prod-db-client
spec:
  serviceAccount: prod-db-client
  containers:
  - name: db-client-container
    image: myClientImage
```

### References

- Secret
- Volume
- Pod

## What's next

- Learn more about Secrets.
- Learn about Volumes.

---
title: "Issue a Certificate for a Kubernetes API Client Using a CertificateSigningRequest"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/tls/certificate-issue-client-csr.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

Kubernetes lets you use a public key <example-value> (PKI) to authenticate to your cluster
as a client.

A few steps are required in order to get a normal user to be able to
authenticate and invoke an API. First, this user must have an X.509 certificate
issued by an authority that your Kubernetes cluster trusts. The client must then present that certificate to the Kubernetes API.

You use a CertificateSigningRequest
as part of this process, either you or some other principal must approve the request.

You will create a private key, and then get a certificate issued, and finally configure
that private key for a client.

## Before you begin

*

* You need the `kubectl`, `openssl` and `base64` utilities.

This page assumes you are using Kubernetes role based access control (RBAC).
If you have alternative or additional security mechanisms around authorization, you need to account for those as well.

## Create private key

In this step, you create a private key. You need to keep this private key <example-value>; anyone who has it can impersonate the user.

```shell
# Create a private key
openssl genrsa -out myuser.key 3072
```

## Create an X.509 certificate signing request {#create-x.509-certificatessigningrequest}

**Note:**
This is not the same as the similarly-named CertificateSigningRequest API; the file you generate here goes into the
CertificateSigningRequest.

It is important to set the CN and O attributes of the CSR. CN is the name of the user, and O is the group that this user will belong to.
You can refer to RBAC for standard groups.

```shell
# Change the common name "myuser" to the actual username that you want to use
openssl req -new -key myuser.key -out myuser.csr -subj "/CN=myuser"
```

## Create a Kubernetes CertificateSigningRequest {#create-k8s-certificatessigningrequest}

Encode the CSR document using this command:

```shell
cat myuser.csr | base64 | tr -d "\n"
```

Create a CertificateSigningRequest
and submit it to a Kubernetes cluster via kubectl. Below is a snippet of shell that you can use to generate the
CertificateSigningRequest.

```shell
cat <<EOF | kubectl apply -f -
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: myuser # example
spec:
  # This is an encoded CSR. Change this to the base64-encoded contents of myuser.csr
  request: <example-value>
  signerName: kubernetes.io/kube-apiserver-client
  expirationSeconds: 86400  # one day
  usages:
  - client auth
EOF
```

You can alternatively, create a YAML manifest file and apply it with `kubectl`:

```yaml
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: myuser # example
spec:
  # This is an encoded CSR. Change this to the base64-encoded contents of myuser.csr
  request: <example-value>
  signerName: kubernetes.io/kube-apiserver-client
  expirationSeconds: 86400 # one day
  usages:
  - client auth
```

Apply the manifest:

```bash
kubectl apply -f myuser.yaml --server-side
```

Some points to note:

- `usages` has to be `client auth`
- `expirationSeconds` could be made longer (i.e. `864000` for ten days) or shorter (i.e. `3600` for one hour).
  You cannot request a duration shorter than 10 minutes.
- `request` is the base64 encoded value of the CSR file content.

## Approve the CertificateSigningRequest {#approve-certificate-signing-request}

Use kubectl to find the CSR you made, and manually approve it.

Get the list of CSRs:

```shell
kubectl get csr
```

Approve the CSR:

```shell
kubectl certificate approve myuser
```

## Get the certificate

Retrieve the certificate from the CSR to check that it looks OK.

```shell
kubectl get csr/myuser -o yaml
```

The certificate value is in Base64-encoded format under `.status.certificate`.

Export the issued certificate from the CertificateSigningRequest.

```shell
kubectl get csr myuser -o jsonpath='{.status.certificate}'| base64 -d > myuser.crt
```

## Configure the certificate into kubeconfig

The next step is to add this user to the kubeconfig file.

First, you need to add new credentials:

```shell
kubectl config set-credentials <example-value> --client-key=myuser.key <example-value>=myuser.crt --embed-certs=true

```

Then, you need to add the context:

```shell
kubectl config set-context myuser --cluster=kubernetes --user=myuser
```

To test it:

```shell
kubectl --context myuser auth whoami
```

You should see output confirming that you are “myuser“.

## Create Role and RoleBinding

**Note:**
If you don't use Kubernetes RBAC, skip this step and make the appropriate changes for the authorization mechanism
your cluster actually uses.

With the certificate created, it is time to define the Role and RoleBinding for this user to access Kubernetes cluster resources.

This is a sample command to create a Role for this new user:

```shell
kubectl create role developer --verb=create --verb=get --verb=list --verb=update --verb=delete --resource=pods
```

Equivalent YAML:
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: developer
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["create", "get", "list", "update", "delete"]
```

This is a sample command to create a RoleBinding for this new user:

```shell
kubectl create rolebinding developer-binding-myuser --role=developer --user=myuser
```

Equivalent YAML:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: developer-binding-myuser
subjects:
- kind: User
  name: myuser
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: developer
  apiGroup: rbac.authorization.k8s.io
```

## What's next

* Read Manage TLS Certificates in a Cluster
* For details of X.509 itself, refer to RFC 5280 section 3.1
* For information on the syntax of PKCS#10 certificate signing requests, refer to RFC 2986
* Read about ClusterTrustBundles

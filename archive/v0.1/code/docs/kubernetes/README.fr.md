# Sujet « kubernetes » : manifestes, déploiement et contrôle sans cluster

Ce dossier aide l'IA à écrire des manifestes Kubernetes justes, à les contrôler sans cluster, et à
expliquer un Pod qui ne démarre pas. Ce qu'utilise le cluster de l'équipe (version, Ingress ou
Gateway API, Helm ou Kustomize, dossier des schémas) s'écrit dans l'`AGENTS.md` de chaque projet.

| Fichier | Ce qu'il contient |
| --- | --- |
| `workload.md` | Un Deployment et un Service justes : étiquettes, sondes, ressources, contexte de sécurité restreint. |
| `api-versions.md` | La bonne `apiVersion` pour chaque objet, et les versions retirées de la 1.16 à la 1.32. |
| `ingress-gateway.md` | Ingress v1, la fin d'Ingress NGINX, et une route Gateway API. |
| `registry-secret.md` | Tirer une image d'un registre privé avec un Secret dans le bon espace de noms. |
| `statefulset.md` | Quand écrire un StatefulSet, son Service sans adresse et ses volumes. |
| `resources-realtime.md` | Requêtes et limites, cœurs réservés pour la latence, mémoire du ramasse-miettes .NET. |
| `rollout.md` | Mettre à jour sans coupure et revenir en arrière. |
| `validate-offline.md` | kubeconform, KubeLinter, `helm lint` et kustomize : ce que chacun contrôle et ce qu'il ne voit pas. |
| `helm-kustomize.md` | Chart Helm ou surcouche Kustomize : les commandes pour rendre et contrôler. |
| `debug-pods.md` | Un symptôme de Pod, sa cause probable, sa correction. |
| `health-endpoints.md` | Les points de santé d'ASP.NET Core et les trois sondes qui les appellent. |

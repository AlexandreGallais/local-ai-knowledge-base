# syntax=docker/dockerfile:1
# check=error=true
# Image of an ASP.NET Core API. Copy as Dockerfile, then replace "Api" with the project name
# and set DOTNET_VERSION from TargetFramework (net10.0 gives 10.0).

ARG DOTNET_VERSION=10.0

FROM mcr.microsoft.com/dotnet/sdk:${DOTNET_VERSION} AS build
WORKDIR /source

# Copy the project file first: the restore layer stays cached while it does not change.
COPY Api/Api.csproj Api/
RUN dotnet restore Api/Api.csproj

# Copy the rest of the source, then publish.
COPY Api/ Api/
RUN dotnet publish Api/Api.csproj -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:${DOTNET_VERSION} AS final
WORKDIR /app
COPY --from=build /app ./
USER $APP_UID
EXPOSE 8080
ENTRYPOINT ["dotnet", "Api.dll"]

ARG BASE
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /App

# Copy everything
COPY . ./search

FROM $BASE
COPY --from=build-env /App/search ./search

WORKDIR /App/search
RUN update-ca-certificates
# Restore as distinct layers
RUN dotnet restore
RUN sed -i 's/DEFAULT@SECLEVEL=2/DEFAULT@SECLEVEL=1/g' /etc/ssl/openssl.cnf
# Run watch
ENTRYPOINT ["dotnet", "watch", "run", "--non-interactive"]

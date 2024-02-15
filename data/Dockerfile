ARG BASE
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /App

# Copy everything
COPY . ./data

FROM $BASE
COPY --from=build-env /App/data ./data

WORKDIR /App/data
# RUN curl -o /usr/local/share/ca-certificates/verisign.crt -SsL https://crt.sh/?d=1039083 && update-ca-certificates
RUN update-ca-certificates
# Restore as distinct layers
RUN dotnet restore
RUN sed -i 's/DEFAULT@SECLEVEL=2/DEFAULT@SECLEVEL=1/g' /etc/ssl/openssl.cnf
# Run watch
ENTRYPOINT ["dotnet", "watch", "run", "--non-interactive"]
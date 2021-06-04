FROM  mcr.microsoft.com/dotnet/core/aspnet:3.1 as base
WORKDIR /app
EXPOSE 5000
ENV TZ=Asia/Shanghai
ENV ASPNETCORE_URLS http://+:5000

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 as publish
WORKDIR /src
COPY ./ ./
RUN dotnet publish Api -c Release -o /app && cp Api/SQlite.db /app/SQlite.db

FROM base as final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT [ "dotnet" ,"Api.dll"]


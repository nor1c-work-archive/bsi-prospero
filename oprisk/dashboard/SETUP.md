# ProERMS BSI - Setup Guide

## Init database

Run Microsoft SQL Server 2019 database instance using Docker

```base
docker run --name mssql -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=yourP@ssword" -e "MSSQL_PID=Developer" -p 8433:1433 -d mcr.microsoft.com/mssql/server:2019-latest
```

Connect to instance, then create prefered database and schemas

## Configure environments

Create environment configuration file (.env )

```bash
cp -r .docker/compose/local/.env.example .docker/compose/local/.env
```

Launch the project

```bash
./runner.sh -a=start -e=local
```

#! /usr/bin/env bash

role=${DATABASE_ROLE}
database=${DATABASE_NAME}

alias psql="psql -U postgres -d \"${database}\""

psql -c "CREATE ROLE \"${role}\" LOGIN PASSWORD '${DATABASE_PASSWORD}' CREATEDB"
psql -c "CREATE DATABASE \"${database}\""
psql -c "GRANT ALL ON DATABASE \"${database}\" TO \"${role}\""

psql -c "SET timezone TO 'UTC'"

psql -c "CREATE EXTENSION \"uuid-ossp\""

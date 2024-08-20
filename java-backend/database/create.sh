#!/bin/bash
export PGPASSWORD='postgres1'

# Get the directory where the script is located
BASEDIR=$(dirname "$0")

echo "Basedir is set to: $BASEDIR"

# Define the database name
DATABASE=hospital_nav

# Drop the existing database
psql -U postgres -f "$BASEDIR/dropdb.sql"

# Create a new database
createdb -U postgres $DATABASE

# Apply schema
psql -U postgres -d $DATABASE -f "$BASEDIR/schema.sql"

# Populate database with initial data
psql -U postgres -d $DATABASE -f "$BASEDIR/data.sql"

# Create users and permissions
psql -U postgres -d $DATABASE -f "$BASEDIR/user.sql"
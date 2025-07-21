#!/bin/bash

# This bash file allows you to run a simple command inside of your package.json scripts
# Add this to your scripts object: "typegen": "./sanity-typegen.sh"
# 
# NOTE: Make sure the script has executable permissions. You can run:
#   chmod +x sanity-typegen.sh
#
# This script:
#
# 1. Ensures that a ./sanity/types folder exists.
#
# 2. Creates a Sanity schema by running:
#    npx -y sanity@latest schema extract --path "./sanity/types/schema.json" --enforce-required-fields
#    (This extracts your current schema for use in type generation.)
#
# 3. Creates the file: sanity-typegen.json with the config:
# {
#     "path": "./sanity/**/*.{ts,tsx,js,jsx}",
#     "schema": "./sanity/types/schema.json",
#     "generates": "./sanity/types/sanity.types.ts",
#     "overloadClientMethods": true
# }
# note: This will only search within the sanity folder for queries etc. so change this if needed!
# (This file is required for the sanity typegen command in step 4.)
#
# 4. Generates types:
#    npx -y sanity@latest typegen generate
#
# NOTE: This script outputs the results of each step to the terminal (for debugging if needed).
# This should help keep your GROQ queries typed automatically with zero manual effort.
# Enjoy!

# Define color for output
GREEN='\033[0;32m'    # success
RED='\033[1;31m'      # failure
PURPLE='\033[0;35m'   # action
NC='\033[0m'          # Reset color

# Arguments for paths
SCHEMA_PATH=${1:-"./sanity/types/schema.json"}
GENERATES_PATH=${2:-"./sanity/types/sanity.types.ts"}
PATH_TO_SEARCH=${3:-"./sanity/**/*.{ts,tsx,js,jsx}"}

# Step 1: Ensure the directory and schema.json exist
echo -e "${PURPLE}Ensuring $(dirname $SCHEMA_PATH) directory and schema.json file exist...${NC}"

mkdir -p "$(dirname "$SCHEMA_PATH")"

if [ ! -f "$SCHEMA_PATH" ]; then
  echo "{}" > "$SCHEMA_PATH"
  echo -e "${GREEN}Created schema.json at $SCHEMA_PATH${NC}"
else
  echo -e "${GREEN}schema.json already exists at $SCHEMA_PATH${NC}"
fi

# Step 2: Extract schema
# Previews of unpublished content can still have values that are undefined or null
echo -e "${PURPLE}Extracting schema to $SCHEMA_PATH...${NC}"
npx -y sanity@latest schema extract --path "$SCHEMA_PATH" --enforce-required-fields
if [ $? -ne 0 ]; then
  echo -e "${RED}Schema extraction failed${NC}"
  exit 1
fi

# Step 3: Create sanity-typegen.json file
SANITY_TYPEGEN_CONFIG="./sanity-typegen.json"
echo -e "${PURPLE}Creating sanity-typegen.json at $SANITY_TYPEGEN_CONFIG...${NC}"

cat <<EOL > "$SANITY_TYPEGEN_CONFIG"
{
  "path": "$PATH_TO_SEARCH",
  "schema": "$SCHEMA_PATH",
  "generates": "$GENERATES_PATH",
  "overloadClientMethods": true
}
EOL

echo -e "${GREEN}sanity-typegen.json created:${NC}"
cat "$SANITY_TYPEGEN_CONFIG"

# Step 4: Generate types
echo -e "${PURPLE}Generating types based on sanity-typegen.json...${NC}"
npx -y sanity@latest typegen generate
if [ $? -ne 0 ]; then
  echo -e "${RED}Type generation failed${NC}"
  exit 1
fi

echo -e "${GREEN}All tasks completed successfully!${NC}"
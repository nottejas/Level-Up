#!/bin/bash

# Create a backup of the current repository
cp -r . ../Level-Up-backup-$(date +%Y%m%d)

# Create a temporary file with the patterns to replace
cat > patterns.txt << EOL
mongodb\+srv://tejas:tejas69@genz-finance-app\.euxgs\.mongodb\.net/taskManager
mongodb+srv://tejas:tejas69@genz-finance-app.euxgs.mongodb.net/taskManager
EOL

# Run git-filter-repo to replace sensitive information
git filter-repo --replace-text patterns.txt

# Clean up
rm patterns.txt

echo "Git history has been cleaned. Please verify the changes and force push to remote." 
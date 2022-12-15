clear

mongod --version

if [[ ! -d "/workspaces/mongodb" ]]
then
    echo "path /workspaces/mongodb does exists, creating..."
    mkdir /workspaces/mongodb
else
    echo "path /workspaces/mongodb exists, deleting..."
    rm -rf /workspaces/mongodb
    mkdir /workspaces/mongodb
fi


nohup sudo mongod --dbpath /workspaces/mongodb </dev/null >/dev/null 2>&1 &

echo ""
echo "################################"
echo "  mongod started on background  "
echo "################################"

# echo "checking if has started"
# sudo service mongodb status
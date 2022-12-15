sudo apt install -y software-properties-common gnupg apt-transport-https ca-certificates
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt update && sudo apt install -y mongodb-org
clear
mongod --version

if [[ ! -d "/workspaces/mongodb" ]]
then
    echo "path /workspaces/mongodb does exists, creating..."
    mkdir /workspaces/mongodb
fi

nohup sudo mongod --dbpath /workspaces/mongodb </dev/null >/dev/null 2>&1 &

echo "################################"
echo "  mongod started on background  "
echo "################################"
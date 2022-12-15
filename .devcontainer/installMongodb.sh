# needed to get mongodb
sudo apt install -y software-properties-common gnupg apt-transport-https ca-certificates
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

sudo apt update && sudo apt upgrade -y # latest apps
sudo apt install -y mongodb-org mongodb # try install mongodb
sudo apt-get install # if has dependency error
sudo apt install -y mongodb-org mongodb  # re run apt install, in case dependency error
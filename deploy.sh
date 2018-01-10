#!/bin/bash
#WEB_PATH='/root/yangyx/xiaobai'

#echo $WEB_PATH

#BRANCH='master'

#echo "branch : $BRANCH"

echo "Start deployment"
cd /root/yangyx/xiaobai
echo "pulling source code..."

# `git fetch origin -v`
# `git pull`
git reset --hard origin/master
sudo git clean -f
git pull
# git checkout $BRANCH
echo 'pull done'
#if [ -n "$1" ]; then
#  echo "restarting..."
#  # `sudo cnpm install`
#  #  pm2 gracefulReload all
#fi

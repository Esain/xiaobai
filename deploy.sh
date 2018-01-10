#!/bin/bash
[[ $1 != '' ]] && WEB_PATH=$1

[[ $WEB_PATH = '' ]] && WEB_PATH='/root/yangyx/xiaobai/public'

echo $WEB_PATH

[[ $2 != '' ]] && BRANCH=$2

[[ $BRANCH = '' ]] && BRANCH='master'

echo $BRANCH

echo "Start deployment"
cd $WEB_PATH
echo "pulling source code..."

# `git fetch origin -v`
# `git pull`
git reset --hard origin/$BRANCH
sudo git clean -f
git pull
# git checkout $BRANCH
echo 'pull done'
#if [ -n "$1" ]; then
#  echo "restarting..."
#  # `sudo cnpm install`
#  #  pm2 gracefulReload all
#fi

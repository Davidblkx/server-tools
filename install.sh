#!/usr/bin/bash

apt install -y curl

echo "installing DENO..."
curl -fsSL https://deno.land/x/install/install.sh | sh

echo 'export PATH="/root/.deno/bin:$PATH"' >> $HOME/.bash_profile
source $HOME/.bash_profile
deno --version
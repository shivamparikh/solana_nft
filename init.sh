#!/bin/bash

echo "Initializing the solana_nft project"
echo "..."
echo "Installing solana"
sh -c "$(curl -sSfL https://release.solana.com/v1.9.9/install)"

python3 -m virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
git clone git@github.com:metaplex-foundation/python-api.git
pip install -r python-api/requirements.txt

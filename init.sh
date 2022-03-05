#!/bin/bash

echo "Initializing the solana_nft project"
echo "..."
if ! [ -x "$(command -v solana)" ]; then
    echo 'Error: solana is not installed.' >&2
    echo "Installing solana"
    sh -c "$(curl -sSfL https://release.solana.com/v1.9.9/install)"
else
    echo "solana is already installed"
fi
python3 -m virtualenv venv
source venv/bin/activate
pip install -r requirements.txt

from django.shortcuts import render
from .serializers import UploadSerializer
from .models import Upload, NFT
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from metaplex.api.metaplex_api import MetaplexAPI
from solana.rpc.api import Client
from solana.keypair import Keypair

import json

# Create your views here.
def mint_nft(request, **kwargs):
    api_endpoint = "https://api.testnet.solana.com/"
    recipient_wallet = kwargs['recipient']
    title = kwargs['title']
    date_minted = kwargs['date']
    hash = '12345678920908'
    symbol = 'ABCDEFG'
    percent = 1000
    url = "http://www.sparikh.me/"
    write_args_to_json = lambda x : json.dumps({"hello":"world"}) # Replace this with a function call to write arguments into a json file, return the url to the json file.
    json_path = f'src/json/{hash}.json'
    with open(json_path, 'w') as f:
        json.dump(write_args_to_json(None), f)
    account = Keypair()
    cfg = {"PRIVATE_KEY": base58.b58encode(account.seed).decode("ascii"), "PUBLIC_KEY": str(account.public_key), "DECRYPTION_KEY": Fernet.generate_key().decode("ascii")}
    api = MetaplexAPI(cfg)
    result = api.deploy(api_endpoint, title, symbol, percent)
    contract_key = json.loads(result).get('contract')
    mint_res = api.mint(api_endpoint, contract_key, cfg["PUBLIC_KEY"], url+json_path)

class UploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        #print(request)
        uploads = Upload.objects.all()
        upload_serializer = UploadSerializer(uploads, many=True)
        return Response(upload_serializer.data)

    def post(self, request, *args, **kwargs):
        #print(request.data.dict()['metadata'])
        #print(request.data.dict()['image'])
        metadata = request.data.dict()['metadata']
        #print(metadata)
        json_object = json.loads(metadata)
        #print("object", json_object['Serial Number'])
        # print("type: ", type(request.data.dict()['metadata']))
        #print(request.content_type)
        #print(type(request))
        # d = {
        #     'image' : request.data.dict()['image'],
        #     'metadata': metadata#str({'yolo': 'yolo1'})
        # }

        #print(request.header)
        upload_serializer = UploadSerializer(data=request.data)
        if upload_serializer.is_valid():
            upload_serializer.save()
            return Response(upload_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', upload_serializer.errors)
            return Response(upload_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

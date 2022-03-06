from django.shortcuts import render
from .serializers import UploadSerializer
from .models import Upload, NFT
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
import json

# Create your views here.
def index(request):
    pass
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
            ## init nft method async
            return Response(upload_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', upload_serializer.errors)
            return Response(upload_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

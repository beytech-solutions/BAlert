from django.shortcuts import render

def index(request):
    return render(request, "index.html")

def install(request):
    return render(request, "install.html")
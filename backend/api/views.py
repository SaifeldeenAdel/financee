from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import User, Watchlist, Tradebill, Note
from .serializers import UserSerializer, WatchlistSerializer, TradebillSerializer, NoteSerializer


# Create your views here.
@api_view(['GET'])
def overview(request):
    paths = {
        "overview" : "/",
        "users" : "/users"
    }
    return Response(paths)

# Gets a list of users
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# Gets the user's profile   
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


#--------------
# Watchlist views
#--------------

# Gets all watchlist items for the user that requested it
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def watchlist(request):
    # Gets watchlist items and passes them to serializer
    watchlist_items = Watchlist.objects.filter(user=request.user).order_by('-created')
    serializer = WatchlistSerializer(watchlist_items, many=True)

    return Response(serializer.data)

# Get one watchlist item
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def watchlist_detail(request, watchlist_id):
    # Trying to get the watchlist item using given id
    try:
        watchlist_item = Watchlist.objects.get(pk=watchlist_id)
    except Watchlist.DoesNotExist:
        return Response({"message" : "Watchlist item does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Makes sure the watchlist item requested is the user's. Another user cant view someone else's watchlist items
    if watchlist_item.user == request.user:
        serializer = WatchlistSerializer(watchlist_item)
        return Response(serializer.data)

    else:
        return Response({"message" : "Not authorized to view this watchlist item"}, status=status.HTTP_400_BAD_REQUEST)

# Creating watchlist item
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_watchlist(request):
    # Gets data and checks if its valid, saves it and responds.
    serializer = WatchlistSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    

# Deleting watchlist item
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_watchlist(request, item_id):
    # Trying the find the watchlist item thats requested
    try:
        if item_id.isdigit():
            item = Watchlist.objects.get(pk=item_id)
        else:
            item = Watchlist.objects.get(symbol=item_id)
            
    except Watchlist.DoesNotExist:
        return Response({"message" : "Watchlist item does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    
    if item.user == request.user:
        item.delete()
        return Response({"message" : "Watchlist item deleted"}, status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({"message" : "Not authorized to delete this watchlist item."}, status=status.HTTP_400_BAD_REQUEST)


#--------------
# Tradebill views
#--------------

# Gets all tradebills
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tradebills(request):
    tradebills = Tradebill.objects.filter(user=request.user).order_by('-created')
    serializer = TradebillSerializer(tradebills, many=True)
    return Response(serializer.data)


# Get one tradebill
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tradebill_detail(request, tradebill_id):
    # Trying to get the tradebill using given id
    try:
        tradebill = Tradebill.objects.get(pk=tradebill_id)
    except Tradebill.DoesNotExist:
        return Response({"message" : "Tradebill does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Makes sure the tradebill requested is the user's. Another user cant view someone else's tradebills
    if tradebill.user == request.user:
        serializer = TradebillSerializer(tradebill)
        return Response(serializer.data)

    else:
        return Response({"message" : "Not authorized to view this tradebill"}, status=status.HTTP_400_BAD_REQUEST)

# Creating tradebill
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tradebill_create(request):
    serializer = TradebillSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user = request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Editing tradebill
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def tradebill_edit(request, tradebill_id):
    # Trying to get the tradebill using given id
    try:
        tradebill = Tradebill.objects.get(pk=tradebill_id)
    except Tradebill.DoesNotExist:
        return Response({"message" : "Tradebill does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    # Making sure the user wanting to edit is the user associated with the tradebill
    if tradebill.user == request.user:
        # Serializes the new patched tradebill
        serializer = TradebillSerializer(tradebill, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"message" : "Not authorized to edit this tradebill"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def tradebill_delete(request, tradebill_id):
    # Trying to get the tradebill using given id
    try:
        tradebill = Tradebill.objects.get(pk=tradebill_id)
    except Tradebill.DoesNotExist:
        return Response({"message" : "Tradebill does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    # Making sure the user wanting to delete is the user associated with the tradebill
    if tradebill.user == request.user:
        tradebill.delete()
        return Response({"message" : "Tradebill deleted"}, status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({"message" : "Not authorized to edit this tradebill"}, status=status.HTTP_400_BAD_REQUEST)
    
    


#--------------
# Notes views
#--------------

# Gets all notes
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def notes(request):
    notes = Note.objects.filter(user=request.user).order_by('-created')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


# Get one note
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def note_detail(request, note_id):
    # Trying to get the note using given id
    try:
        note = Note.objects.get(pk=note_id)
    except Note.DoesNotExist:
        return Response({"message" : "Note does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Makes sure the note requested is the user's. Another user cant view someone else's notes
    if note.user == request.user:
        serializer = NoteSerializer(note)
        return Response(serializer.data)

    else:
        return Response({"message" : "Not authorized to view this note"}, status=status.HTTP_400_BAD_REQUEST)

# Creating note
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def note_create(request):
    serializer = NoteSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user = request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Editing Note
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def note_edit(request, note_id):
    # Trying to get the note using given id
    try:
        note = Note.objects.get(pk=note_id)
    except Note.DoesNotExist:
        return Response({"message" : "Note does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    # Making sure the user wanting to edit is the user associated with the Note
    if note.user == request.user:
        # Serializes the new patched note
        serializer = NoteSerializer(note, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"message" : "Not authorized to edit this note"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def note_delete(request, note_id):
    # Trying to get the note using given id
    try:
        note = Note.objects.get(pk=note_id)
    except Note.DoesNotExist:
        return Response({"message" : "Note does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    # Making sure the user wanting to delete is the user associated with the note
    if note.user == request.user:
        note.delete()
        return Response({"message" : "Note deleted"}, status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({"message" : "Not authorized to edit this note"}, status=status.HTTP_400_BAD_REQUEST)

    









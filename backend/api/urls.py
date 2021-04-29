from django.urls import path, include
from . import views

urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('overview', views.overview, name='overview'),
    path('users', views.users, name='users'),
    path('profile', views.profile, name='profile'),

    # Watchlist urls
    path('watchlist', views.watchlist, name='watchlist'),
    path('watchlist/<int:watchlist_id>', views.watchlist_detail, name='watchlist_detail'),
    path('add-to-watchlist', views.add_to_watchlist, name='add_to_watchlist'),
    path('remove-from-watchlist/<item_id>', views.remove_from_watchlist, name='remove_from_watchlist'),

    # Tradebill urls
    path('tradebills', views.tradebills, name='tradebills'),
    path('tradebills/<int:tradebill_id>', views.tradebill_detail, name='tradebill_detail'),
    path('tradebill-create', views.tradebill_create, name='tradebill_create'),
    path('tradebill-edit/<int:tradebill_id>', views.tradebill_edit, name='tradebill_edit'),
    path('tradebill-delete/<int:tradebill_id>', views.tradebill_delete, name='tradebill_delete'),

    # Note urls
    path('notes', views.notes, name='notes'),
    path('notes/<int:note_id>', views.note_detail, name='note_detail'),
    path('note-create', views.note_create, name='note_create'),
    path('note-edit/<int:note_id>', views.note_edit, name='note_edit'),
    path('note-delete/<int:note_id>', views.note_delete, name='note_delete')









]

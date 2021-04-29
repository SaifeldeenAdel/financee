from django.contrib import admin
from .models import User, Watchlist, Tradebill, Note


# Register your models here.
admin.site.register(User)

class WatchlistAdmin(admin.ModelAdmin):
    readonly_fields = ('created',)

admin.site.register(Watchlist, WatchlistAdmin)

class TradebillAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'score')
    
admin.site.register(Tradebill, TradebillAdmin)

class NoteAdmin(admin.ModelAdmin):
    readonly_fields = ('created',)

admin.site.register(Note, NoteAdmin)



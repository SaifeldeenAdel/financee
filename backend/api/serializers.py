from rest_framework import serializers
from .models import User, Watchlist, Tradebill, Note


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']



class WatchlistSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField('get_user')

    # Getting user
    def get_user(self, obj):
        return obj.user.username

    # Overriding this method to convert symbol to upper case
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['symbol'] = data['symbol'].upper()
        return data

    class Meta:
        model = Watchlist
        fields = ['id', 'user', 'symbol']


class TradebillSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField('get_user')
    score = serializers.SerializerMethodField('get_score')


    # Getting user
    def get_user(self, obj):
        return obj.user.username

    def get_score(self, obj):
        return obj.score
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['symbol'] = data['symbol'].upper()
        return data
    
    class Meta:
        model = Tradebill
        fields = ['id', 'user', 'symbol', 'weekly_imp' , 'daily_price' , 'rsi', 'false_breakout', 'perfection' , 'score', 'bounce', 'above_50ma', 'summary', 'risk', 'size', 'entry', 'stop', 'target', "daily_channel_height", 'A_target', 'soft_stop', 'breakeven', 'filled', 'stop_entered', 'profit_taking_entered', 'created']

class NoteSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField('get_user')

    # Getting user
    def get_user(self, obj):
        return obj.user.username

    class Meta:
        model = Note
        fields = '__all__'
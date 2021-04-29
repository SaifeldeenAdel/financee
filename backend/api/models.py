from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator


# Create your models here.
class User(AbstractUser):
    pass

# Creating capitalized char field 
# credit: https://stackoverflow.com/questions/36330677/django-model-set-default-charfield-in-lowercase
class UpperCharField(models.CharField):
    def __init__(self, *args, **kwargs):
        super(UpperCharField, self).__init__(*args, **kwargs)

    def get_prep_value(self, value):
        return str(value).upper()


class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='watchlist')
    symbol = UpperCharField(max_length=10)
    created = models.DateTimeField(auto_now=True)

    # Specifying that both of the fields together should be unique
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "symbol"], name="user_symbol")
        ]

    def __str__(self):
        return f'{self.user.username} added {self.symbol}'
    

class Tradebill(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='trade_bills')
    symbol = UpperCharField(max_length=10)

    # First section
    weekly_imp = models.PositiveIntegerField(default= 0, validators=[MaxValueValidator(2)])
    daily_price = models.PositiveIntegerField(default= 0, validators=[MaxValueValidator(2)])
    rsi = models.PositiveIntegerField(default= 0, validators=[MaxValueValidator(2)])
    false_breakout = models.PositiveIntegerField(default= 0, validators=[MaxValueValidator(2)])
    perfection = models.PositiveIntegerField(default= 0, validators=[MaxValueValidator(2)])

    @property
    def score(self):
        return self.weekly_imp + self.daily_price + self.rsi + self.false_breakout + self.perfection

    # Second section
    bounce = models.BooleanField(default=False)
    above_50ma = models.BooleanField(default=False)
    summary = models.CharField(max_length=300, blank=True)
    risk = models.DecimalField(max_digits=10, decimal_places=2)
    size = models.PositiveIntegerField()
    entry = models.DecimalField(max_digits=10, decimal_places=2)
    stop = models.DecimalField(max_digits=10, decimal_places=2)
    target = models.DecimalField(max_digits=10, decimal_places=2)

    # Third section
    daily_channel_height = models.DecimalField(max_digits=10, decimal_places=2)
    A_target = models.DecimalField(max_digits=10, decimal_places=2)
    soft_stop = models.DecimalField(max_digits=10, decimal_places=2)
    breakeven = models.DecimalField(max_digits=10, decimal_places=2)
    filled = models.BooleanField(default=False)
    stop_entered = models.BooleanField(default=False)
    profit_taking_entered = models.BooleanField(default=False)
    
    created = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f'{self.user.username} | Quantity-{self.size} | Symbol-{self.symbol} '

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    title = models.CharField(max_length=40)
    content = models.CharField(max_length=500)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username}: {self.title}'



    



    



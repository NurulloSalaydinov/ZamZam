from django.db import models


class Contact(models.Model):
    name = models.CharField('Name', max_length=200)
    company = models.CharField('Company', max_length=200)
    phone = models.CharField('Phone', max_length=200)
    msg = models.TextField('Message')

    def __str__(self):
        return f'{self.name}'


class Order(models.Model):
    name = models.CharField('Name', max_length=200)
    company = models.CharField('Company', max_length=200)
    address = models.CharField('Address', max_length=200)
    phone = models.CharField('Phone', max_length=200)
    city = models.CharField('City', max_length=200)
    province = models.CharField('Province', max_length=200)
    zipcode = models.CharField('zipcode', max_length=20)
    cost = models.CharField('Cost', max_length=2000)
    count = models.CharField('Count', max_length=200)
    ordersize = models.CharField('Order Size', max_length=200)
    is_finished = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.name}'



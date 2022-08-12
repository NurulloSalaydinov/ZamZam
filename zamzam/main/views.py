import json
import telebot
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Order, Contact
from django.contrib.auth.views import LoginView
from django.contrib.admin.views.decorators import staff_member_required

bot = telebot.TeleBot("5481019427:AAEkEELE7_GwKpS6s7s_6NKEKL1Np46XZLU")
sendTo = '1060158414'

class Login(LoginView):
    template_name = 'login.html'
    success_url = '/dashboard/'


def home_view(request):
    return render(request, 'index.html')

@staff_member_required(login_url='/login/')
def dashboard(request):
    order = Order.objects.all().order_by('-id')
    contact = Contact.objects.all().order_by('-id')
    context = {
        'orders': order,
        'contacts': contact,
    }
    return render(request, 'dashboard.html', context)

@staff_member_required(login_url='/login/')
def update(request, pk):
    order = Order.objects.get(id=pk)
    if order.is_finished:
        order.is_finished = False
        order.save()
        return redirect('/dashboard/')
    else:
        order.is_finished = True
        order.save()
        return redirect('/dashboard/')

@staff_member_required(login_url='/login/')
def delete(request, pk):
    order = Order.objects.get(id=pk)
    order.delete()
    return redirect('/dashboard/')


@csrf_exempt
def new_contact(request):
    data = request.body
    d = json.loads(data)
    name = d.get('name')
    company = d.get('company')
    phone = d.get('phone')
    message = d.get('message')
    bot_message = f"""\n
        Ism Familya: {name}\n
        Tashkilot: {company}\n
        Telefon: {phone}\n
        Xabar matni: {message}\n
        zamzamwater.uz/dashboard/
    """
    if request.get_host() == '127.0.0.1:8000':
        bot.send_message(sendTo, bot_message)
        obj = Contact.objects.create(
            name=name,
            company=company,
            phone=phone,
            msg=message
        )
        obj.save()
        if obj:
            return JsonResponse({'success': 200})
        else:
            return JsonResponse({'error': 400})
    else:
        return JsonResponse({'error': 'Method not allowed'})

@csrf_exempt
def new_order(request):
    data = request.body
    d = json.loads(data)
    name = d.get('name')
    company = d.get('company')
    address = d.get('address')
    phone = d.get('phone')
    city = d.get('city')
    province = d.get('province')
    zipcode = d.get('zipcode')
    cost = d.get('cost')
    count = d.get('count')
    ordersize = d.get('order-size')
    bot_message = f"""\n
        Ism Familya: {name}\n
        Tashkilot: {company}\n
        Manzil: {address}\n
        Telefon: {phone}\n
        Viloyat: {province}\n
        Umumiy narx: {cost}\n
        Umumiy soni: {count}\n
        Buyurtma: {ordersize}\n
        Shahar: {city}\n
        zamzamwater.uz/dashboard/
    """
    if request.get_host() == '127.0.0.1:8000':
        bot.send_message(sendTo, bot_message)
        obj = Order.objects.create(
            name=name,
            company=company,
            address=address,
            phone=phone,
            city=city,
            province=province,
            zipcode=zipcode,
            cost=cost,
            count=count,
            ordersize=ordersize
        )
        obj.save()
        if obj:
            return JsonResponse({"success": 200})
        else:
            return JsonResponse({"error": 400})
    else:
        return JsonResponse({"error": "Method not allowed"})


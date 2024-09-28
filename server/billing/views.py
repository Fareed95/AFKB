from django.http import HttpResponse
from django.template.loader import render_to_string
from weasyprint import HTML
from shops.models import Shops
from days.models import Day # Assuming Day model exists
import datetime

def generate_invoice(request, shop_id):
    # Fetch the shop and related day data
    shop = Shops.objects.get(id=shop_id)
    days = Day.objects.filter(shop=shop)  # Assuming Day has a ForeignKey to Shop

    # Prepare data for the invoice
    items = []
    total_amount = 0

    for day in days:
        # Calculate the total for each day based on updated clothes
        total_for_day = (day.shirts_updated * shop.shirt_price) + \
                        (day.pants_updated * shop.pants_price) + \
                        (day.safari_updated * shop.safari_price)
        total_amount += total_for_day
        items.append({
            'date': day.date,
            'shirts_updated': day.shirts_updated,
            'pants_updated': day.pants_updated,
            'safari_updated': day.safari_updated,
            'total': total_for_day
        })

    # Final total: Add the remaining balance to the total amount
    total_amount_to_pay = total_amount + shop.remaining_balance

    # Context for rendering the template
    context = {
        'shop_name': shop.name,
        'shirt_price': shop.shirt_price,
        'pants_price': shop.pants_price,
        'safari_price': shop.safari_price,
        'remaining_balance': shop.remaining_balance,
        'items': items,
        'total_amount': total_amount,
        'total_amount_to_pay': total_amount_to_pay,
        'date': datetime.date.today(),
    }

    # Render the HTML template
    html_content = render_to_string('invoice_template.html', context)

    # Generate the PDF and return it
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="invoice.pdf"'
    HTML(string=html_content).write_pdf(response)

    return response

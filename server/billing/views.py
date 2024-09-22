# views.py
from django.http import HttpResponse
from django.template.loader import get_template
from weasyprint import HTML
import datetime

def generate_invoice(request):
    # Sample data to be rendered in the PDF
    items = [
        {'description': 'Product 1', 'quantity': 2, 'unit_price': 10, 'total': 20},
        {'description': 'Product 2', 'quantity': 1, 'unit_price': 15, 'total': 15},
    ]
    total_amount = sum(item['total'] for item in items)

    context = {
        'date': datetime.date.today(),
        'items': items,
        'total_amount': total_amount
    }

    # Load the HTML template
    template = get_template('invoice_template.html')
    html_content = template.render(context)

    # Convert the HTML to a PDF
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="invoice.pdf"'

    # Generate PDF
    HTML(string=html_content).write_pdf(response)

    return response

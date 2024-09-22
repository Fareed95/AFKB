from django.http import HttpResponse
from django.template.loader import render_to_string
from weasyprint import HTML, CSS
import datetime
import os
from django.conf import settings

def generate_invoice(request):
    # Sample data to be rendered in the PDF
    items = [
        {'description': 'Product 1', 'quantity': 2, 'unit_price': 10, 'total': 20},
        {'description': 'Product 2', 'quantity': 1, 'unit_price': 15, 'total': 15},
    ]
    total_amount = sum(item['total'] for item in items)

    # Context to pass to the template
    context = {
        'date': datetime.date.today(),
        'items': items,
        'total_amount': total_amount,
        'invoice_number': 'INV-12345',
        'customer_name': 'John Doe',
        'company_name': 'Your Company',
    }

    # Load and render the HTML template
    html_content = render_to_string('invoice_template.html', context)

    # Generate the PDF and send it as an attachment
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="invoice.pdf"'

    # Generate the PDF using WeasyPrint
    HTML(string=html_content).write_pdf(response)

    return response

# Use a Python base image
FROM python:3.10-slim

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /app

# Install system dependencies for WeasyPrint and other necessary tools
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    libgdk-pixbuf2.0-0 \
    libpango1.0-0 \
    libgdk-pixbuf2.0-dev \
    libffi-dev \
    libcairo2 \
    libcairo2-dev \
    libglib2.0-dev \
    libpango1.0-dev \
    && apt-get clean

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Copy the entrypoint script and make it executable
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose the port Gunicorn will listen on
EXPOSE 8000

# Set the entrypoint to the entrypoint script
ENTRYPOINT ["/entrypoint.sh"]

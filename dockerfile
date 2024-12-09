# Use the slim Python image
FROM python:3.9.21-slim-bullseye

# Set the working directory
WORKDIR /app

# Install system dependencies, including Git
RUN apt-get update && apt-get install -y --no-install-recommends git

# Install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy application files
COPY . /app

# Expose the application port
EXPOSE 5000

# Command to run the application
CMD ["python", "./run.py"]

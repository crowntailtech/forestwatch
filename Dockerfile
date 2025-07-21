FROM python:3.10-slim

WORKDIR /app

# Install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy frontend static files
COPY frontend/ ./frontend/

# Expose backend (5000) and frontend (8000) ports
EXPOSE 5000 8000

# Start both Flask backend and Python HTTP server for frontend
CMD ["sh", "-c", "python3 -m http.server 8000 --directory /app/frontend & python3 /app/backend/app.py"]

# Use node 8.10.0 
FROM node:8.10.0

# Copy source code
COPY . /app

# Change working directory 
WORKDIR /app

# Install dependencies 
RUN npm install

# Install angular
RUN npm install -g @angular/cli

# Expose API port to outside
EXPOSE 4200

# Launch application 
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]


# Use node 8.10.0 LTS
FROM node:8.10.0

# Copy source code
COPY . /app

# Change working directory 
WORKDIR /app

# Install dependencies 
RUN npm install

# Expose API port to outside
EXPOSE 3000

# Launch application 
CMD ["npm", "start"]

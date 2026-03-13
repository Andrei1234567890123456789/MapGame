# Use official Eclipse Temurin Java 21 image
FROM eclipse-temurin:21-jdk

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Make gradlew executable
RUN chmod +x gradlew

# Build the project
RUN ./gradlew build -x test

# Expose port (Render will set PORT)
EXPOSE 8080

# Run the jar
CMD ["sh", "-c", "java -jar build/libs/*SNAPSHOT.jar"]
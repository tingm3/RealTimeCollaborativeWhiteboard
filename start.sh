#!/bin/bash

# Load environment variables from .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | grep -v '^$' | xargs)
  echo "Environment variables loaded!"
else
  echo ".env file not found!"
  exit 1
fi

# Update project structure
update_tree() {
  echo "Updating project structure..."
  echo "## Project Structure" > STRUCTURE.md
  echo "\`\`\`" >> STRUCTURE.md
  echo "." >> STRUCTURE.md
  echo "├── backend" >> STRUCTURE.md
  tree backend -L 12 --noreport -I 'node_modules|.git|dist|target' | tail -n +2 >> STRUCTURE.md
  echo "├── frontend" >> STRUCTURE.md
    tree frontend -L 8 --noreport -I 'node_modules|.git|dist|target' | tail -n +2 >> STRUCTURE.md

  echo "\`\`\`" >> STRUCTURE.md
  echo "Done!"
}


install_deps() {
  echo "Checking frontend dependencies..."
  cd frontend
  npm install
  npm install --save-dev @types/sockjs-client
  cd ..
}

# Start backend
start_backend() {
  # Kill any existing process on port 8080
  if lsof -i :8080 > /dev/null 2>&1; then
    echo "Killing existing process on port 8080..."
    kill -9 $(lsof -t -i:8080)
  fi

   osascript -e "tell application \"Terminal\"
    do script \"cd $(pwd)/backend/realtime-whiteboard && export DB_URL=$DB_URL && export DB_USERNAME=$DB_USERNAME && export DB_PASSWORD=$DB_PASSWORD && ./mvnw spring-boot:run\"
  end tell"
  echo "Backend starting..."
}

# Start Angular
start_frontend() {
  # Kill any existing process on port 4200
  if lsof -i :4200 > /dev/null 2>&1; then
    echo "Killing existing process on port 4200..."
    kill -9 $(lsof -t -i:4200)
  fi
  cd frontend && ng serve --open
}

update_tree
install_deps
start_backend
start_frontend

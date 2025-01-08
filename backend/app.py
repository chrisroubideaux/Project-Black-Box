from flask import Flask

app = Flask(__name__)  # Create the Flask application

@app.route('/')  # Define the route for the root path ('/')
def hello():
  """Returns a simple greeting."""
  return "Hello World!"  # The response returned for the route

if __name__ == '__main__':
  app.run(debug=True)  # Run the development server
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])


@app.route('/test')
def test():
    return {'test': ['test1', 'test2', 'test3']}


if __name__ == '__main__':
    app.run(debug=True)

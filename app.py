from flask import Flask, render_template, request
from flask_babel import Babel, _

app = Flask(__name__)

# Настройки Flask-Babel
app.config['BABEL_DEFAULT_LOCALE'] = 'ru'  # Язык по умолчанию (грузинский)
app.config['BABEL_SUPPORTED_LOCALES'] = ['en', 'ka', 'ru']  # Поддерживаемые языки
app.secret_key = 'wefiu#$!*(wiefwefiu*^@!(@#&^!hqw73197831g167*G&!*#G6168724g*&!*GT#8dh374g'

babel = Babel(app)



@app.route('/')
def home():
    return render_template('index.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/projects/blog')
def blog():
    return render_template('/blog/blog.html')

@app.route('/projects/fitness')
def fitness():
    return render_template('/fitness/fitness.html')

@app.route('/projects/storage')
def storage():
    return render_template('/storage/storage.html')

@app.route('/projects/blog/post')
def post():
    return render_template('/blog/post.html')

@app.route('/projects/blog/about')
def about():
    return render_template('/blog/about.html')

@app.route('/projects/photographer')
def photography():
    return render_template('/photographer/photographer.html')

@app.route('/projects/cafe')
def cafe():
    return render_template('cafe.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
    
# Функция для выбора языка

@babel.init_app(app)
def get_locale():
    # Проверяем, выбран ли язык в параметре запроса (например, ?lang=ru)
    return request.args.get('lang') or request.accept_languages.best_match(['en', 'ka', 'ru'])

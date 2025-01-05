from flask import Flask, render_template, request
from flask_babel import Babel, _

app = Flask(__name__)

# Настройки Flask-Babel
app.config['BABEL_DEFAULT_LOCALE'] = 'ru'  # Язык по умолчанию (грузинский)
app.config['BABEL_SUPPORTED_LOCALES'] = ['en', 'ka', 'ru']  # Поддерживаемые языки

babel = Babel(app)



@app.route('/')
def home():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
    
# Функция для выбора языка

@babel.init_app(app)
def get_locale():
    # Проверяем, выбран ли язык в параметре запроса (например, ?lang=ru)
    return request.args.get('lang') or request.accept_languages.best_match(['en', 'ka', 'ru'])

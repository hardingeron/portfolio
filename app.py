from flask import Flask, render_template, request, jsonify
from flask_babel import Babel, _
from flask_sqlalchemy import SQLAlchemy
from apps import cafe;
from modals import db, CafeReview, Reservation
from datetime import datetime

app = Flask(__name__)

# Настройки Flask-Babel
app.config['BABEL_DEFAULT_LOCALE'] = 'ru'  # Язык по умолчанию (грузинский)
app.config['BABEL_SUPPORTED_LOCALES'] = ['en', 'ka', 'ru']  # Поддерживаемые языки
app.secret_key = 'wefiu#$!*(wiefwefiu*^@!(@#&^!hqw73197831g167*G&!*#G6168724g*&!*GT#8dh374g'

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:'  # Замени `password` на твой пароль
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Отключаем отслеживание изменений (снижает нагрузку)

babel = Babel(app)

db.init_app(app)  # Мы связываем объект db с приложением Flask


def get_locale():
    # Проверяем, выбран ли язык в параметре запроса (например, ?lang=ru)
    return request.args.get('lang') or request.accept_languages.best_match(['en', 'ka', 'ru'])

# Регистрация приложения и функции выбора языка
babel.init_app(app, locale_selector=get_locale)


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
    # Получаем все записи из базы данных
    reviews = CafeReview.query.all()

    # Преобразуем объекты CafeReview в список словарей
    reviews_dict = [
        {"id": review.id, "name": review.name, "review": review.review, "created_at": review.created_at}
        for review in reviews
    ]
    
    # Передаем их в шаблон
    return render_template('cafe.html', reviews=reviews_dict)




@app.route('/submit_review', methods=['POST'])
def submit_review():
    data = request.json
    name = data.get('name')
    review = data.get('review')

    if not name or not review:
        return jsonify({'status': 'error', 'message': 'Все поля обязательны!'}), 400

    new_review = CafeReview(name=name, review=review)
    db.session.add(new_review)
    db.session.commit()

    return jsonify({'status': 'success', 'message': 'Спасибо за ваш отзыв!'})



@app.route('/book-table', methods=['POST'])
def book_table():
    # Получаем данные из формы
    table_id = request.json.get('table_id')
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    phone = request.json.get('phone')
    reservation_date = datetime.strptime(request.json.get('reservation_date'), "%Y-%m-%dT%H:%M")

    # Проверяем, есть ли уже бронирование на этот стол в указанное время
    existing_reservation = Reservation.query.filter_by(table_id=table_id, reservation_date=reservation_date).first()

    if existing_reservation:
        return jsonify({'status': 'error', 'message': 'К сожалению, место уже занято.'}), 400
    
    # Если места нет, создаем новое бронирование
    new_reservation = Reservation(
        table_id=table_id,
        first_name=first_name,
        last_name=last_name,
        phone=phone,
        reservation_date=reservation_date
    )

    # Сохраняем бронирование в базе данных
    db.session.add(new_reservation)
    db.session.commit()

    return jsonify({'status': 'success', 'message': 'Место забронировано!'}), 200






if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
    
# Функция для выбора языка

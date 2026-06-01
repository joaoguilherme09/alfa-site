from app import create_app
import os

from datetime import timedelta

app = create_app()

app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)

print(os.getcwd())
print(app.template_folder)

if __name__ == '__main__':

    app.run(
        host='0.0.0.0',
        port=int(os.environ.get('PORT', 5000)),
        debug=True
    )
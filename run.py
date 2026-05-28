from app import create_app
import os

app = create_app()

print(os.getcwd())
print(app.template_folder)

if __name__ == '__main__':

    app.run(
        host='0.0.0.0',
        port=int(os.environ.get('PORT', 5000)),
        debug=True
    )
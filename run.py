from app import create_app
import os

app = create_app()

print(os.getcwd())
print(app.template_folder)

if __name__ == '__main__':
    app.run(debug=True)

import os

folder = './public/albom/stairs'  # укажи путь к папке

files = os.listdir(folder)
quoted = [f'"{name}"' for name in files if os.path.isfile(os.path.join(folder, name))]

print(', '.join(quoted))

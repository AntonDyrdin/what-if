import os

root_dir = './public/albom'
output_ts_file = "./src/assets/file-list.ts"

exports = []

for entry in os.scandir(root_dir):
    if entry.is_dir():
        var_name = entry.name.replace("-", "_").replace(" ", "_")
        subdir = entry.name
        files = [
            f'"{subdir}/{f.name}"'
            for f in os.scandir(entry.path)
            if f.is_file()
        ]
        export_line = f'export const {var_name} = [{", ".join(sorted(files))}];'
        exports.append(export_line)

with open(output_ts_file, "w", encoding="utf-8") as f:
    f.write("\n".join(exports))

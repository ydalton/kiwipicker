#!/bin/sh
#
# Copyright (c) 2023 ydalton

python_zip="python-3.11.4-embed-amd64.zip"
output_zip="kiwipicker_v2.zip"

echo "Starting..."
rm $output_zip
rm -r  kiwipicker/
npm run build

pushd build/
rm -r bin
mkdir bin

echo "Starting Python download..."
curl -O https://www.python.org/ftp/python/3.11.4/$python_zip

echo "Extracting the downloaded Python archive"
unzip -d ./bin python-3.11.4-embed-amd64.zip
rm $python_zip

echo "Writing startup file..."
cat <<EOF >> start.bat
@echo off
@echo off
START /B .\bin\python.exe -m http.server
.\bin\python.exe -c "import webbrowser as wb; wb.open('http://localhost:8000')"
EOF

popd

mv build kiwipicker
zip -r $output_zip kiwipicker/
echo "Created $output_zip..."
echo "done"

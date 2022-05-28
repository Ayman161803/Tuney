pip install venv
cd ./Backend 
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
deactivate
cd ..

cd ./Frontend && npm install
cd ..

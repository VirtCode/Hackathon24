FROM python:3.12.7-alpine

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN pip3 install waitress

COPY . /app/

CMD [ "python3", "app.py" ]

FROM python:3.8

WORKDIR /task

COPY ./requirements.txt /task/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /task/requirements.txt

COPY . /task

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
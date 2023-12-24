from dotenv import load_dotenv
from os import getenv
load_dotenv()

config = {
  "dbname": getenv('DB_USER') or "postgres",
  "user": getenv('DB_USER') or "postgres",
  "pass": getenv('DB_PASS') or "postgres",
  "host": getenv('DB_HOST') or "localhost",
  "port": getenv('DB_PORT') or 5432,
}
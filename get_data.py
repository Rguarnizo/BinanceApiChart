import config
from binance.client import Client

client = Client(config.API_KEY,config.API_SECRET);

prices = client.get_all_tickers()

klines = client.get_historical_klines("BTCUSDT", Client.KLINE_INTERVAL_1DAY, "1 Jan, 2021", "1 Dec, 2021");

import csv

csv_file = open('data.csv',"w",newline='')

writter = csv.writer(csv_file)

for kandlestick in klines:
 writter.writerow(kandlestick[:5])
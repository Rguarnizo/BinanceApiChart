from binance.enums import KLINE_INTERVAL_1DAY
from flask import Flask, render_template, jsonify
import config , csv
from binance.client import Client

app = Flask(__name__)
client = Client(config.API_KEY,config.API_SECRET);

@app.route("/")
def index():

    title = 'CoinView'

    account = client.get_account();
    print(account);
    balances = account['balances'];

    exg_info = client.get_exchange_info();
    symbols = exg_info['symbols'];

    return render_template("index.html",title=title,balances=balances,symbols=symbols);

@app.route("/buy",methods=['POST'])
def buy():
    client.order_market()
    return "buy"

@app.route("/sell")
def sell():
    return "sell"

@app.route("/settings")
def settings():
    return "settings"

@app.route("/history")
def history():
    candlestick = client.get_historical_klines("BTCUSDT",Client.KLINE_INTERVAL_1HOUR,"1 Jan, 2022");

    return  jsonify([{ "time": candle[0],
        "open": candle[1],
        "high": candle[2],
        "low": candle[3],
        "close": candle[4],} for candle in candlestick]);
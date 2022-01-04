let webSocket = new WebSocket(
    "wss://stream.binance.com:9443/ws/btcusdt@kline_1m"
);

const chart = LightweightCharts.createChart(document.getElementById("price"), {
    width: 400,
    height: 300,
});
const candlestickSeries = chart.addCandlestickSeries();

webSocket.addEventListener("message", function(event) {
    let data = JSON.parse(event.data);
    let info = data.k;
    candlestickSeries.update({
        time: info.t,
        open: info.o,
        high: info.h,
        low: info.l,
        close: info.c,
    });
});
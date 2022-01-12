let webSocket = new WebSocket(
    "wss://stream.binance.com:9443/ws/btcusdt@kline_1m"
);

const chart = LightweightCharts.createChart(document.getElementById("price"), {
    width: 400,
    height: 300,
});
const candlestickSeries = chart.addCandlestickSeries();

fetch("http://127.0.0.1:5000/history", {
    method: 'GET',
    headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }),
}).then((r) =>
    r.json().then((data) => candlestickSeries.setData(data)),
);

webSocket.addEventListener("message", function(event) {
    let data = JSON.parse(event.data);
    let info = data.k;
    candlestickSeries.update({
        time: timeToLocal(info.t),
        open: info.o,
        high: info.h,
        low: info.l,
        close: info.c,
    });
});


function timeToLocal(originalTime) {
    const d = new Date(originalTime * 1000);
    return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()) / 1000;
}
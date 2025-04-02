const client = require('prom-client');


const gauge = new client.Counter({
  name: 'http_request_total',
  help: 'Total Number of HTTP Requests',
  labelNames: ['method', 'route', 'statusCode'],
});

const activeRequest = new client.Gauge({
    name:"active_requests",
    help:"Numbers of active requests "
})

const durationoRequest = new client.Histogram({
    name: 'http_duration',
    help: 'Number of HTTP duration',
    labelNames: ['method', 'route', 'statusCode'],
    buckets: [0.1, 5, 15, 50, 100, 500],
  });
const timeMiddleware =(req,res,next)=>{
    activeRequest.inc();
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`Request to ${req.method} ${req.originalUrl} took ${duration}ms`);
        gauge.inc({
            method:req.method,
            route:req.route?req.route.path:req.path,
            statusCode:res.statusCode
        })
        durationoRequest.observe({
            method:req.method,
            route:req.route?req.route.path:req.path,
            statusCode:res.statusCode
        },duration)
        activeRequest.dec();
    });
    next();
}
module.exports = timeMiddleware;
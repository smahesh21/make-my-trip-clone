const {createLogger,format,timestamp, transports} = require('winston')

const customFormat = format.combine(format.timestamp(),format.printf((info)=>{
    return `${info.timestamp} - [${info.level.toUpperCase().padEnd(7)}] - ${info.message}`
}))
const logger = createLogger({
    format : customFormat,
    transports : [
        new transports.Console(),
        new transports.File({
            filename:'errorMessages.log',
            level : 'error'
        }),
        new transports.File({
            filename:'infoMessages.log',
            level : 'info'
        })
    ]
})

module.exports = logger;

const systemLogLevel = process.env.LOG_LEVEL || 0


// ошибки серверной части нужно высыпать в stdout, поэтому тут и только тут используется console
/* eslint-disable no-console */
export const logger = (level: number, message: any) => {
  if (level < +systemLogLevel) {
    return
  }

  switch (level) {
    case 0:
      console.log(message)
      break
    case 1:
      console.error(message)
      break
    default:
      console.log(message)
  }
}

logger.error = logger.bind(logger, 1)
logger.debug = logger.bind(logger, 0)

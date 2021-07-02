import logger from '../config/logger.config';

const onStart = () => {
    logger.info('server start');
}

const onSendingMsgError = (error, msg) => {
    error.msg = msg;
    logger.error(`Error on sending message: msgseq=${msg.data.msgseq} | msg=${msg.data.msg}`)
    logger.error(error)
}

export { onStart, onSendingMsgError }
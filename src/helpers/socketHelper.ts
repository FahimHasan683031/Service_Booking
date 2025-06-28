// ✅ socketHelper.ts
import colors from 'colors';
import { Server } from 'socket.io';
import { logger } from '../shared/logger';
import { Message } from '../app/modules/message/message.model';
import { Notification } from '../app/modules/notification/notification.model';

const socket = (io: Server) => {
  io.on('connection', socket => {
    logger.info(colors.green('🔗 A user connected'));
    
    socket.on('disconnect', () => {
      logger.info(colors.red(' A user disconnected'));
    });
  });
};

export const socketHelper = { socket };

// ✅ socketHelper.ts
import colors from 'colors';
import { Server } from 'socket.io';
import { logger } from '../shared/logger';
import { Message } from '../app/modules/message/message.model';

const socket = (io: Server) => {
  io.on('connection', socket => {
    logger.info(colors.green('🔗 A user connected'));

    socket.on('join-room', (chatRoomId: string) => {
      socket.join(chatRoomId);
      logger.info(colors.cyan(`🟢 User joined room: ${chatRoomId}`));
    });

    socket.on('send-message', async ({ sender, message, chatRoomId }) => {
      if (!sender || !message || !chatRoomId) {
        logger.error(colors.red(' Invalid message payload'));
        return;
      }

      const payload = { sender, message, chatRoomId };
      io.to(chatRoomId).emit('receive-message', payload);

      try {
        await Message.create(payload);
      } catch (err) {
        logger.error(colors.red(' Chat save failed:'), err);
      }
    });

    socket.on('disconnect', () => {
      logger.info(colors.red(' A user disconnected'));
    });
  });
};

export const socketHelper = { socket };
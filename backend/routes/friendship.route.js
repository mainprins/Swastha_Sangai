import express from 'express';
import { getPendingReceivedRequests, getPendingSentRequests, sendFriendRequest } from '../controllers/friendship.controller.js';
import { checkAuth } from '../middlewares/auth.middleware.js';

const friendshipRouter = express.Router();

friendshipRouter.post('/send-request',checkAuth,sendFriendRequest);
friendshipRouter.get('/sent-pending-requests',checkAuth,getPendingSentRequests);
friendshipRouter.get('/received-pending-requests',checkAuth,getPendingReceivedRequests);

export default friendshipRouter;
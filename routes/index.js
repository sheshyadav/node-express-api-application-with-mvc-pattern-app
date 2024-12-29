import express from 'express'
import message from '../lang/messages.js';
import authRoute from './auth-route.js';
import userRoute from './user-route.js';
import { ApiError } from '../app/middlewares/ApiError.js';

const router = express.Router()

router.use(authRoute);
router.use(userRoute);

router.route("*").all((request, response) => {
    throw new ApiError(404, message("404"));
});

export default router

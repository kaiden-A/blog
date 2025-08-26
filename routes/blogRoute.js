import { Router } from "express";
import {get_homepage , get_blog , post_comment} from '../controllers/blogController.js'

const router = Router();

router.get('/' , get_homepage);

router.get('/:blogId' , get_blog);
router.post('/:blogId/comment' , post_comment)


export default router;
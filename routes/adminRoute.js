import { Router } from "express";
import {post_signIn , get_signIn , get_signUp , post_signUp , get_logout} from '../controllers/authController.js';
import {post_new_blog ,  get_new_blog , get_admin , get_blog , update_blog , delete_blog , get_comment , delete_comment}  from '../controllers/adminController.js';
import requireAuth from '../middleware/authMiddleware.js';


const router = Router();

router.get('/' , requireAuth , get_admin);

router.get('/login' , get_signIn);
router.post('/login' , post_signIn);

router.get('/sign-up' , get_signUp);
router.post('/sign-up' , post_signUp);

router.get('/logout' , get_logout);

router.get('/post/blog' , get_new_blog);
router.post('/post/blog' , post_new_blog );


router.get('/update/:blogId' , get_blog);
router.put('/update/:blogId' , update_blog);
router.delete('/delete/:blogId' , delete_blog);

router.get('/comment/:blogId' , get_comment)
router.delete('/comment/delete/:blogId/:commentId', delete_comment);

export default router;
'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Blog = use('App/Model/Blog')
const Comment = use('App/Model/Comment')
const Follow = use('App/Model/Follow')
const User = use('App/Model/User')
const Validator = use('Validator')

class CommentController {

    * create(req, res){
        const id = req.param('id')
        const commentData=req.except('_csrf');
        const rules={
            text: 'required'
        }
        const validation=yield Validator.validateAll(commentData, rules);
        if (validation.fails()) {
            yield req.withAll()
              .andWith({errors: validation.messages() })
              .flash()

            res.redirect('back')
            return
        }

        commentData.user_id = req.currentUser.id
        commentData.blog_id = id
        yield Comment.create(commentData);

        res.redirect('back');
    }

    * delete(req, res){
        const id = req.param('cid')
        const comment = yield Comment.find(id)
        if (!comment) {
            res.notFound('A comment nem létezik')
            return
        }
        yield comment.delete()
        res.redirect('back');
    }

}

module.exports = CommentController

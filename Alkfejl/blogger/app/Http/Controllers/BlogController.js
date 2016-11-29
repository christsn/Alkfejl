'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Blog = use('App/Model/Blog')
const Comment = use('App/Model/Comment')
const Follow = use('App/Model/Follow')
const User = use('App/Model/User')
const Validator = use('Validator')

class BlogController {

    * index(req, res){
        const categories = yield Category.all()

        for(let category of categories){
            const topBlogs = yield category.blogs().limit(3).fetch()
            category.topBlogs = topBlogs.toJSON()
        }

        yield res.sendView('main', {
            categories: categories.toJSON()
        })
    }

    * writeNewBlog(req, res){
        const categories = yield Category.all();

        yield res.sendView('writeNewBlog', {
            categories: categories.toJSON()
        })
    }

    * saveBlog(req, res){
        const blogData=req.except('_csrf');
        const rules={
            title: 'required',
            text: 'required',
            category_id: 'required'
        }
        const validation=yield Validator.validateAll(blogData, rules);
        if (validation.fails()) {
            yield req.withAll()
              .andWith({errors: validation.messages() })
              .flash()

            res.redirect('back')
            return
        }

        blogData.user_id = req.currentUser.id
        yield Blog.create(blogData);

        res.redirect('/');
    }

    * show (req, res){
        const id = req.param('id')
        const blog = yield Blog.find(id)
        if (!blog) {
            res.notFound('Nem létezik ilyen blogbejegyzés')
            return
        }
        const comments = yield blog.comment().fetch()
        yield blog.related('category').load()
        yield res.sendView('showBlog', {
            blog: blog.toJSON(),
            comments: comments.toJSON()

        })
    }

    * edit (req, res){
        const id = req.param('id')
        const blog = yield Blog.find(id)
        if (req.currentUser.id !== blog.user_id) {
            res.unauthorized('Nincs jog')
            return
        }

        const categories = yield Category.all();

        yield res.sendView('editBlog',{
            categories: categories.toJSON(),
            blog: blog.toJSON()
        })
    }
    
    * doEdit (req, res){
        const blogData = req.except('_csrf');
        const rules = {
            title: 'required',
            text: 'required',
            category_id: 'required'
        }
        const validation = yield Validator.validateAll(blogData, rules);
        if (validation.fails()){
            yield req.withAll
              .andWith({errors: validation.messages()})
              .flash()

            res.redirect('back')
            return  
        }

        const id = req.param('id')
        const blog = yield Blog.find(id)

        if (req.currentUser.id !== blog.user_id) {
            res.unauthorized()
            return
        }

        blog.title = blogData.title
        blog.text = blogData.text
        blog.category_id = blogData.category_id

        yield blog.save()

        res.redirect('/')
    }

    * doDelete (req, res) {
        const id = req.param('id')
        const blog = yield Blog.find(id)
        if (!blog) {
            res.notFound('A blog nem létezik')
            return
        }
        yield blog.delete()
        res.redirect('/');
    }

    * search(req, res){
        const page = Math.max(1, req.input('p'))
        const filters = {
            blogTitle: req.input('blogTitle') || '',
            category: req.input('category') || 0,
            createdBy: req.input('createdBy') || 0
        }

        const blogs = yield Blog.query()
            .where(function () {
                if (filters.category > 0) this.where('category_id', filters.category)
                if (filters.createdBy > 0) this.where('user_id', filters.createdBy)
                if (filters.blogTitle.length > 0) this.where('title', 'LIKE', `%${filters.blogTitle}%`)
            })
            .with('user')
            .paginate(page, 9)

        const categories = yield Category.all()
        const users = yield User.all()

        yield res.sendView('searchBlog', {
            blogs: blogs.toJSON(),
            categories: categories.toJSON(),
            users: users.toJSON(),
            filters
        })    

    }

    * searchUser(req, res){
        const page = Math.max(1, req.input('p'))
        const filters = {
            userName: req.input('userName') || '',
            email: req.input('category') || '',
        }

        const users = yield User.query()
            .where(function () {
                if (filters.userName.length > 0) this.where('username', 'LIKE', `%${filters.userName}%`)
                if (filters.email.length > 0) this.where('email', 'LIKE', `%${filters.email}%`)
            })
            .paginate(page, 9)

        yield res.sendView('searchUser', {
            users: users.toJSON(),
            filters
        })    

    }

    * showUser(req, res){
        const id = req.param('id')
        const user = yield User.find(id)
        if (!user) {
            res.notFound('Nem létezik ilyen user')
            return
        }
        const blogs = yield user.blog().fetch()
        yield res.sendView('showUser', {
            user: user.toJSON(),
            blogs: blogs.toJSON()
        })
    }

}

module.exports = BlogController

'use strict'

const User = use('App/Model/User')
const Validator = use('Validator')
const Hash = use('Hash')

class UserController {

    * register (req, res) {
        yield res.sendView('register')
    }

    *doRegister(req, res) {
        const registerData = req.except('_csrf');
        const rules = {
            username: 'required|alpha_numeric|unique:users',
            email: 'required|email|unique:users',
            password: 'required|min:4',
            password_confirm: 'required|same:password',
        }
        const validation = yield Validator.validateAll(registerData, rules);
        if (validation.fails()) {
            yield req.withAll()
              .andWith({errors: validation.messages()})
              .flash()

            res.redirect('back')
            return  
        }
        const user = new User();

        user.username = registerData.username
        user.email = registerData.email
        user.password = yield Hash.make(registerData.password)

        yield user.save()
        yield req.auth.login(user)

        res.redirect('/')
    }

    * login(req, res){
        yield res.sendView('login')
    }

    * doLogin(req, res){
        const email = req.input('email')
        const password = req.input('password')
        console.log("bement a dologinba")
        try{
            const login = yield req.auth.attempt(email, password)

            if (login) {
                console.log("na itt elfogadta a jelszót")
                res.redirect('/')
                return
            }
        }
        catch(err){
            yield req.withAll()
              .andWith({errors: [err]})
              .flash()

            res.redirect('back')
            return  
        }
    }

    * ajaxLogin(req, res){
        const email = req.input('email')
        const password = req.input('password')

        try {
            const login = yield req.auth.attempt(email, password) 

            if (login) {
                res.ok({ success: true })
                return
            }
        }
        catch (err) {
            res.ok({ success: false })
            return
        }
    }

    * doLogout(req, res){
        yield req.auth.logout()
        res.redirect('/')
    }
}

module.exports = UserController

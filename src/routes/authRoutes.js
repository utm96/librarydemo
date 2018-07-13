const express = require('express');
const authRouter = express.Router();
const debug = require('debug')('app:authRoutes');
const { MongoClient} = require('mongodb');
const passport = require('passport');
function route(nav){
    authRouter.route('/signUp')
        .post((req,res)=>{
            //create user
            const url = 'mongodb://utm:m123456@ds129541.mlab.com:29541/librarydemo';
            const dbName = 'librarydemo';
            const {username,password} = req.body;
            (async function(){
               let client;
               try {
                    client =await MongoClient.connect(url);
                    const db = client.db(dbName);
                    
                    const col = db.collection('user');
                    const user = {username, password};
                    const result = await col.insertOne(user);
                    debug(result);
                    req.login(result.ops[0], ()=>{
                        res.redirect('/auth/profile');
                    })
               } catch (error) {
                   debug(error);
               }
                client.close();
            }());

        })
    authRouter.route('/signin')
        .get((req,res)=>{
            res.render('signin',{
                nav,
                title: 'sign in'
            });
        })
        .post(passport.authenticate('local',{
            successRedirect : '/books',
            failureRedirect : '/auth/signin'
        }));
    authRouter.route('/profile')
        .all((req,res,next)=>{
            if(req.user){
                next();
            }
            else{
                res.redirect('/');
            }
        })
        .get((req,res)=>{
            res.json(req.user);
        });
    authRouter.route('/logout')
        .get((req,res)=>{
            req.logout();
            res.redirect('/auth/signin');
        })
    return authRouter;
}

module.exports =route;
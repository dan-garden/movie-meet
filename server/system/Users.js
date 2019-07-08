const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );
const email = require( 'email-validator' );

const UserSchema = new mongoose.Schema( {
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: false,
        trim: true
    },
    last_name: {
        type: String,
        required: false,
        trim: true
    }
} );



UserSchema.pre( 'save', function ( next ) {
    var user = this;
    bcrypt.hash( user.password, 10, function ( err, hash ) {
        if ( err ) {
            return next( err );
        }
        user.password = hash;
        next();
    } )
} );

const User = mongoose.model( 'User', UserSchema );

class Users {
    static async postRegister( config = {} ) {
        return new Promise( ( resolve, reject ) => {
            if ( !config.email || config.email.trim() === "" || !email.validate( config.email ) ) {
                reject( {
                    message: "Email address is invalid"
                } );
            }

            if ( config.password !== config.passwordConfirm ) {
                reject( {
                    message: "Passwords don't match"
                } )
            }

            User.findOne( {
                email: config.email
            }, ).exec( ( err, user ) => {
                if ( err ) {
                    reject( {
                        message: err
                    } );
                } else if ( user ) {
                    reject( {
                        message: "Email already exists, if this is you login <a href='/login'>here</a>."
                    } );
                } else {

                    User.create( {
                        email: config.email,
                        password: config.password
                    }, ( error, user ) => {
                        if ( error ) {
                            reject( {
                                message: error
                            } );
                        } else {
                            config.session.userId = user._id;
                            resolve( {
                                redirect: "/profile"
                            } );
                        }
                    } );

                }
            } );


        } );
    }

    static async postLogin( config = {} ) {
        return new Promise( ( resolve, reject ) => {
            if ( !config.email || config.email.trim() === "" ) {
                reject( {
                    message: "Email address is invalid"
                } );
            }

            if ( !config.password || config.password === "" ) {
                reject( {
                    message: "Password is invalid"
                } );
            }

            User.findOne( {
                    email: config.email
                } )
                .exec( ( err, user ) => {
                    if ( err ) {
                        reject( {
                            message: err
                        } );
                    } else if ( !user ) {
                        reject( {
                            message: "Password is invalid"
                        } );
                    }
                    bcrypt.compare( config.password, user.password, ( err, result ) => {
                        if ( result === true ) {
                            config.session.userId = user._id;
                            resolve( {
                                redirect: "/profile",
                                session: config.session
                            } )
                        } else {
                            reject( {
                                message: "Password is invalid"
                            } );
                        }
                    } )
                } );
        } )
    }

    static async postLogout( config = {} ) {
        return new Promise( ( resolve, reject ) => {
            if ( config.session.userId ) {
                // delete session object
                config.session.destroy( function ( err ) {
                    if ( err ) {
                        reject( {
                            message: err
                        } );
                    } else {
                        resolve( {
                            redirect: "/"
                        } );
                    }
                } );
            } else {
                reject( {
                    message: "Not logged in"
                } );
            }
        } )
    }

    static get routes() {
        return {
            '/api/register': {
                method: 'post',
                function: this.postRegister.bind( this ),
                params: [
                    'email',
                    'password',
                    'passwordConfirm'
                ],
                response: 'json',
            },
            '/api/login': {
                method: 'post',
                function: this.postLogin.bind( this ),
                params: [
                    'email',
                    'password'
                ],
                response: 'json'
            },
            '/api/logout': {
                method: 'get',
                function: this.postLogout.bind( this ),
                params: [],
                response: 'json'
            },
        }
    }
}

module.exports = Users;
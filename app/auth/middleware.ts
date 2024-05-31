const userSchema = {
    type: 'object',
    properties: {
        username: {type:'string'},
        email: {type: 'string', format:'email'},
        fullname: {type: 'string'},
        password: {type: 'string'},
        // Check if we can write like this??
        // here we are saying posts is a array of strings
        // But they are ObjectId's so does it effect??
        posts: {
            type: "array",
            items: {
                type: "string",
                pattern: "^[a-fA-F0-9]{24}$"
            }
        },
        /*likes: {
            type: "array",
            items: {
                "type": "string",
                "pattern": "^[a-fA-F0-9]{24}$"
            }
        },
        "comments": {
            "type": "array",
            "items": {
                "type": "string",
                "pattern": "^[a-fA-F0-9]{24}$"
            }
        },
        "createdAt": {
            "type": "string",
            "format": "date-time"
        },
        "updatedAt": {
            "type": "string",
            "format": "date-time"
        }*/
    }
}

export const userRegisterSchema = {
    summary: "Register user",
    tags: ['auth'],
    body: {
        type: 'object',
        required: ['username', 'email', 'password'],
        additionalProperties: false,
        properties: {
            username: {type:'string'},
            // if we comment email feild here then even if you have email field in request you will not read/use it for further operations
            email: {type: 'string', format:'email'},
            fullname: {type: 'string'},
            password: {type: 'string'},
        }
    },
    response:{
        201: {
            type: 'object',
            properties: {
                status: {type:'boolean', default:true},
                message: {type:'string'},
                data: {
                    type:'object',
                    properties: {
                        user: userSchema
                    }
                }
            }
        },
        400:{
            type: 'object',
            properties: {
                status: {type:'boolean', default:false},
                message: {type:'string'},
                data: {
                    type: 'object',
                    properties:{
                        errors: {
                            type: 'object',
                            properties: {
                                email: {type: 'string'},
                                username: {type: 'string'}
                            }
                        }
                    }
                }
            }
        }
    }
};

export const userLoginSchema = {
    summary: "login user",
    tags: ['auth'],
    body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
            username: {type:'string'},
            password: {type:'string'}
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                status: {type: 'boolean', default:true},
                message: {type: 'string'},
                data: {
                    type: 'object',
                    properties:{
                        user: userSchema,
                        token: {type:'string'}
                    }
                }
            }
        },
        400: {
            type: 'object',
            properties: {
                status: {type: 'boolean', default:false},
                message: {type: 'string'},
                data: {
                    type: 'object',
                    properties:{
                        errors: {
                            type: 'object',
                            properties: {
                                user: {type: 'string'},
                                password: {type: 'string'}
                            }
                        }
                    }
                }
            }
        }
    }
}
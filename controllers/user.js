let fakeDB = [
    {
        id: "c43fd77b-6cdf-4272-80b0-5f1d1b2d9310",
        name: 'Gowthami',
        email: 'g@gmail.com',
        password: '12345'
    },
    {
        id: "d3c214e0-97c4-4538-b8fb-6cbe26660641",
        name: 'subbanna',
        email: 's@gmail.com',
        password: '123456'
    }
];
const jwt = require('jsonwebtoken');

const uuid = require('uuid').v4;
const getUserDetails = (req, res, next) => {
    try {
        
        res.status(200).json({
            success: true,
            user: userDetails
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server side error occured'
        })
    }
}

const addUser = (req, res, next) => {
    let user = req.body;
    user.id = uuid();

    fakeDB.push(user);

    res.status(200).json({
        success: true,
        message: 'User added successfully!'
    })
}

const getAllUsers = (req, res, next) => {

    res.status(200).json({
        success: true,
        users: fakeDB
    })
}

const getUserById = (req, res, next) => {
    let userId = req.params.userId;
    let user = fakeDB.find((u) => {
        if(u.id == userId) {
            return u;
        }
    })
    res.status(200).json({
        success: true,
        user: user
    })
}

const login = (req, res, next) => {
    try {
        let { email, password } = req.body;

        let user = fakeDB.find((u) => {
            if(u.email == email) {
                return u;
            }
        });

        if(!user) {
            let error = new Error("User not found");
            error.status = 400;
            throw error;
        }

        if(user.password != password) {
            let error = new Error("Password mismatched");
            error.status = 400;
            throw error;
        }

        // Token
        let accessToken = jwt.sign({
            userId: user.id
        }, process.env.JWT_SECRET, { expiresIn: Date.now() + 24 * 60 * 60 *1000 });

        res.cookie('accesstoken', accessToken);
        return res.status(200).json({
            success: true,
            message: 'Loggin successfull',
            accessToken
        })

    } catch (error) {
        console.error(error);
        next(error);
    }
}


const getCurrentSessionUserDetails = (req, res, next) => {
    try {
        let {userId} = req;

        let user = fakeDB.find((u) => {
            if(u.id == userId) {
                return u;
            }
        });

        if(!user) {
            let error = new Error("User not found");
            error.status = 400;
            throw error;
        }

        return res.status(200).json({
            success: true,
            message: 'User detailes fetched successfully',
            user
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server side error occured'
        })
    }
}


module.exports = {
    getUserDetails,
    addUser,
    getAllUsers,
    getUserById,
    login,
    getCurrentSessionUserDetails
}
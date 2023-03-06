let fakeDB = [];
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



module.exports = {
    getUserDetails,
    addUser,
    getAllUsers,
    getUserById
}
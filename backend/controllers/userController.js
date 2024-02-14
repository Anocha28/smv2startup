import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { getDateTime } from '../helper/dateHelper.js';


const getUsers = asyncHandler(async (req, res) => {
    try {
        const searchKey = req.query.searchKey ?? ''
        const pageNum = req.query.pageNum ? Number(req.query.pageNum) : 1
        const pageLimit = req.query.pageLimit ? Number(req.query.pageLimit) : 10
        //console.log(searchKey, pageNum, pageLimit)
        const keyword = searchKey ? {
            $or: [
                {name: {$regex: searchKey, $options: 'i'}},
                {email: {$regex: searchKey, $options: 'i'}},
            ]
        } : {}

        const count = await User.countDocuments({...keyword})
        const userList = await User
            .find({...keyword})
            .limit(pageLimit)
            .skip(pageLimit * (pageNum - 1))
            .select('-password')
            .sort('name')

        res.status(201).json({userList, page: pageNum, pageTotal: Math.ceil(count / pageLimit)})
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

const addUser = asyncHandler(async (req, res) => {

    try {
        const { name, email, password, userType } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const d = await getDateTime()
        const user = await User.create({
            name,
            email,
            password,
            userType,
            createdAt: d,
        });

        res.status(201).json({message: 'success'})
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

const editUser = asyncHandler(async (req, res) => {
    try {
        const { id, name, email, password, userType } = req.body;
        const user = await User.findById(id);
        if (!user) {
            res.status(400);
            throw new Error('User not found.');
        }
        user.name = name
        user.email = email
        if(password) {
            user.password = password
        }
        user.userType = userType
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.query;
        if(req.user._id.toString() === id){
            res.status(400)
            throw new Error('You can not delete your own account.')
        } 
        const user = await User.findById(id);
        if (!user) {
            res.status(400);
            throw new Error('User not found.');
        }
        await User.findByIdAndDelete(id)
        res.status(201).json(id)
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});


export { 
    getUsers,
    addUser,
    editUser,
    deleteUser,
};
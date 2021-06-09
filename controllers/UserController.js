const { checkPassword, generateUserToken } = require('../helpers/helperFunctions');
const { user } = require('../models/');

const userController = {};

userController.create = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const createdUser = await user.create({
            username,
            email,
            password,
        });

    
        const userToken = generateUserToken(createdUser.id, process.env.SECRET);

        res.status(201).json({
            userToken,
            user: {
                id: createdUser.id,
                username: createdUser.username
            }
        });
    }
    catch(error) {
        if (error.message) {
            return res.status(400).json({
                error: error.message
            })
        }
        return res.status(400).json({
            error
        })
    }

}

userController.login = async (req,res) => {
    const { username, password} = req.body;
    try {
        const findUser = await user.findOne({
            where: {
                username
            }
        });
    
        if (checkPassword(password, findUser.password)) {
            const userToken = generateUserToken(findUser.id, process.env.SECRET);
            return res.json({
                userToken,
                user: {
                    id: findUser.id,
                    username: findUser.username
                }
            });
        }

        else {
            return res.status(401).json({error: {
                message: "Password is incorrect"
            }});
        }
    
    }
    catch (error) {
        if (error.message) {
            return res.status(400).json({
                error: error.message
            })
        }
        return res.status(400).json({
            error
        })
    } 
}

userController.verify = (req, res) => {
    try {
        const { userFind } = req;

        res.status(200).json({
            user: {
                id: userFind.id,
                username: userFind.username
            }
        });
    }
    catch (error) {
        if (error.message) {
            return res.status(400).json({
                error: error.message
            })
        }
        return res.status(400).json({
            error
        })
    }
}


module.exports = userController;
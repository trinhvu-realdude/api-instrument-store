const UserService = require("../services/UserService");

exports.getProfile = async (req, res) => {
    try {
        const user_id = req.params.user_id;

        const result = await UserService.getProfile(user_id);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

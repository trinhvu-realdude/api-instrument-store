const CustomerService = require("../services/CustomerService");

exports.getAllCustomer = async (req, res) => {
    try {
        const result = await CustomerService.getAllCustomer();

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};
// const Customer = require('../models/customer');
const CustomerModel = require('../models/customer.model');

async function getCustomers(req, res) {

    await CustomerModel.findAll({
        attributes: ['customerNumber', 'customerName', 'contactLastName', 'contactFirstName', 'phone', 'country']
    }).then(result => {

        let date = new Date();
        // var d = new Date();
        // d.setDate(d.getDate() - 1);
        res.json({
            count: result.length,
            customers: result,
            date
        });
    }).catch(error => {
        res.status(400).json({
            ok: false,
            error
        });
    });
}


async function getCustomer(req, res) {

    let customerId = req.body.customerId;

    await CustomerModel.findAll({
        where: {
            customerNumber: customerId
        }
    }).then(customer => {
        res.json({
            customer
        });
    }).catch(error => {
        res.status(400).json({
            ok: false,
            error
        });
    });
}

async function updateCustomer(req, res) {

    let customerId = req.body.customerId;
    let customerName = req.body.name;

    if (customerId == null || customerId == '' || customerName == null || customerName == '') {
        return res.status(400).json({
            ok: false,
            error: 'CustomerId no puede ser null o vacio'
        });
    }

    await CustomerModel.findOne({
        where: {
            customerNumber: customerId
        }
    }).then(customer => {

        customer.update({ customerName }).then(updatedCustomer => {
            return res.json({
                updatedCustomer
            });
        }).catch(err => {
            return res.status(400).json({
                ok: false,
                error: 'Ha ocurrido un error.',
                detail: err
            });
        });;

    }).catch(err => {
        return res.status(400).json({
            ok: false,
            error: 'Ha ocurrido un error.',
            detail: err
        });
    });

}


async function postCustomer(req, res) {

    let body = req.body;

    await CustomerModel.create({
        customerNumber: body.customerNumber,
        customerName: body.customerName,
        contactLastName: body.contactLastName,
        contactFirstName: body.contactFirstName,
        phone: body.phone,
        addressLine1: body.addressLine1,
        city: body.city,
        country: body.country
    }).then((result) => {
        res.json({
            customer: result
        });
    }).catch((error) => {
        res.status(400).json({
            error
        });
    });
}

module.exports = {
    getCustomers,
    getCustomer,
    postCustomer,
    updateCustomer
};
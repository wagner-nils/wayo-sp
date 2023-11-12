const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/wayoDB').then(() => {
    console.log("Connected to MongoDB 💩 💩 💩");
});

const orderSchema = new mongoose.Schema({
    orderName: {
        type: String,
        required: true
    },
    orderDescription: {
        type: String,
        required: false
    },
    orderAmount: {
        type: Number,
        required: true
    },
    orderVAT: {
        type: Boolean,
        required: true
    },
    orderAddress: {
        type: String,
        required: true
    },
    orderCity: {
        type: String,
        required: true
    },
    orderDeadline: {
        type: Date,
        required: true
    },
    orderType: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        required: true
    },
    orderCompany: {
        type: String,
        required: false
    },
    orderCompanyAbbreviation: {
        type: String,
        required: false
    },
    orderContact: {
        type: String,
        required: true
    },
    orderPhone: {
        type: String,
        required: false
    },
    orderDate: {
        type: Date,
        required: false
    },
    orderAcquisition: {
        type: String,
        required: false
    }
});

const expenseSchema = new mongoose.Schema({
    expenseName: {
        type: String,
        required: true
    },
    expenseDescription: {
        type: String,
        required: false
    },
    expenseAmount: {
        type: Number,
        required: true
    },
    expenseVAT: {
        type: Number,
        required: true
    },
    expenseAddress: {
        type: String,
        required: false
    },
    expenseDate: {
        type: Date,
        required: true
    },
    expenseType: {        // Wages / Service / Rent / Office supplies / Insurance / Tax / Tech. Equipment / Mobility / Other
        type: String,
        required: true
    },
    expenseInterval: {    // once / monthly / quarterly / annually
        type: Number,
        required: true
    },
    expenseStatus: {    // paid / open / canceled
        type: String,
        required: true
    },
    expenseCompany: {
        type: String,
        required: false
    },
    expenseCompanyAbbreviation: {
        type: String,
        required: false
    }
});

const Order = mongoose.model('Order', orderSchema);
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = { Order, Expense };
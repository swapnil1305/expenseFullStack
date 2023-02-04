const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const sequelize = require('./util/database');
const Expense = require('./models/expense');
const cors = require('cors');
const app = express();
const expenseRouter = require('./routes/expense');

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(expenseRouter);

// app.post('/expense/add', async(req, res,  next)=> {
//     try{
//         if(!req.body.amount){
//             throw new Error('amount is mandatory!')
//         }
//         const amount = req.body.amount;
//         const description = req.body.description;
//         const category = req.body.category;
//         console.log(amount, description, category,);
//         const data = await Expense.create( {amount: amount, description: description, category: category })
//         res.status(201).json({newExpense: data});
//     } catch(err){
//         res.status(500).json({error: err});
//     }
// })

// app.get('/expense/get', async(req, res, next) => {
//     try{
//     const tracker = await Expense.finadAll();
//     res.status(200).json({allExpenses: tracker});
//     } catch(err){
//         res.status(500).json({error:err})
//         console.log('Get expenses is failing', JSON.stringify(err))
//     }
// })

Expense.sync()
.then(result => { 
    app.listen(6000);
    console.log(result);
})
.catch(err => console.log(err));
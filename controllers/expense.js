const Expense = require('../models/expense');

exports.getexpenses = async (req, res, next) => {
    console.log("hiii");
    try{
            const tracker = await Expense.findAll();
            res.status(200).json({allExpenses: tracker});
            } catch(err){
                res.status(404).json({error:err})
                console.log('Get expenses is failing', JSON.stringify(err))
            }
}

exports.postexpenses = async (req, res, next) => {
    try{
                if(!req.body.amount){
                    throw new Error('amount is mandatory!')
                }
                const amount = req.body.amount;
                const description = req.body.description;
                const category = req.body.category;
                console.log(amount, description, category,);
                const data = await Expense.create( {amount: amount, description: description, category: category })
                res.status(201).json({newExpense: data});
            } catch(err){
                res.status(404).json({error: err});
            }
}

exports.deleteexpenses = async (req, res, next) => {
    const eId = req.params.id;
    try{
    if(req.params.id == 'undefined'){
       console.log('ID is missing');
      return res.status(400).json({err: 'ID is missing'})
    }
    await Expense.destroy({where: {id: eId}});
    res.sendStatus(200);
    } catch(err){
       console.log(err);
       res.status(500).json(err)
    }
}

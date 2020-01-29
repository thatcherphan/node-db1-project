const express = require('express');

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const accounts = await db('accounts');
        console.log(accounts);
        res.status(200).json(accounts)
    } catch(err) {
        console.log(err)
        res.status(500).json({message: "failed to get accounts"})
    }
})

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    try{
        const [account] = await db('accounts').where('id', id);
        res.status(200).json(account)
    } catch(err) {
        console.log(err)
        res.status(500).json({message: "Failed to get retrieve account using this id"})
    }
})

router.post("/", async (req, res) => {
    const accountData = req.body;
    try {
        const account = await db('accounts').insert(accountData);
        res.status(201).json(account)
    } catch(err) {
        console.log(err)
        res.status(500).json({message: "failed to add account"})
    }
})
//require name(string) and budget(numeric)

router.put("/:id", async (req, res) => {
    const {id} = req.params;
    try{
        const accountUpdate = await db("accounts").where("id", id).update(req.body);
        res.status(200).json({updated: accountUpdate})
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to update post"})
    }
})

router.delete("/:id", async (req, res) => {
    try{
        const accountDeleted = await db("accounts").where("id", req.params.id).del();
        res.status(200).json({deleted: accountDeleted});
    } catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to delete this account"})
    }
})

module.exports = router;
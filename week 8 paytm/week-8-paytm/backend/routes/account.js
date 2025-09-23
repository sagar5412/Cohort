const express = require("express");
const router = express.Router();
const { Account } = require("../db");
const { authMiddleware } = require("../middleware/user");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const userId = req.id;
  const account = await Account.findOne({
    userId: userId,
  });
  res.status(200).json({
    balance: account.balance,
  });
    } catch (error) {
        res.status(404).json({
            msg:"Account not found"
        })
    }
  
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { amount, to } = req.body;
  const account = await Account.findOne({
    userId: req.id,
  }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    {
      userId: req.id,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  await session.commitTransaction();
  res.json({
    msg: "Transaction successfull",
  });
});

module.exports = router;

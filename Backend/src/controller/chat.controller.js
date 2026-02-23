const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const {generateAIResponse} = require('../services/ai.service');
console.log(require("../services/ai.service"));

exports.createChat = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const chatId = uuidv4();

    // Create chat metadata
    await pool.query(
      `INSERT INTO chats (id, user_id, title) VALUES ($1, $2, $3)`,
      [chatId, userId, "New Chat"]
    );

    // Save user message
    await pool.query(
      `INSERT INTO messages (id, chat_id, role, content)
       VALUES ($1, $2, $3, $4)`,
      [uuidv4(), chatId, 'user', message]
    );

    // Get chat history
    const history = await pool.query(
      `SELECT role, content FROM messages WHERE chat_id = $1 ORDER BY created_at`,
      [chatId]
    );

    // Call AI
    const aiReply = await generateAIResponse(history.rows);

    // Save AI response
    await pool.query(
      `INSERT INTO messages (id, chat_id, role, content)
       VALUES ($1, $2, $3, $4)`,
      [uuidv4(), chatId, 'assistant', aiReply]
    );

    res.json({
      chatId,
      reply: aiReply
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Chat creation failed' });
  }
};
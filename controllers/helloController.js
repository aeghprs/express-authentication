const sendHelloResponse = (req, res) => {
    res.json({ success: true, message: "Hello from the other side" });
};

module.exports = { sendHelloResponse };
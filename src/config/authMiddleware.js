const auth = async (req, res, next) => {
    const token = "xyz";
    let backend = "xyz";
    if (backend === token) {
        next();
    } else {
        res.status(401).send("unautharized")
    }
}

module.exports = { auth };
const handleErrors = (error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send('Algo deu errado!');
};

module.exports = {
    handleErrors,
};

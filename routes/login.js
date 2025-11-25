// routes
app.get('/', (req, res) => {
if (req.session.user) return res.redirect('/home');
res.redirect('/login');
});


app.get('/login', (req, res) => {
res.render('login', { error: null, old: {} });
});


app.post('/login', (req, res) => {
const { nome, email, senha } = req.body;


// Basic validation
if (!email || !senha) {
return res.status(400).render('login', { error: 'Preencha email e senha.', old: { nome, email } });
}


// Demo auth: accept any non-empty password; set session
req.session.user = {
nome: nome || email.split('@')[0],
email
};


res.redirect('/home');
});


app.get('/home', (req, res) => {
if (!req.session.user) return res.redirect('/login');
res.render('home', { user: req.session.user });
});


app.post('/logout', (req, res) => {
req.session.destroy(err => {
res.clearCookie('connect.sid');
res.redirect('/login');
});
});


app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
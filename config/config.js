//=======================
// Puerto
//========================

process.env.PORT = process.env.PORT || 3000;

// =============================================================
// Base de datos
// =============================================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffe';
} else {
    urlDB = 'mongodb+srv://bree:aWnPHhE5BilxPTy4@aravis.wbqas.mongodb.net/Cafe'
}

process.env.URLDB = urlDB;
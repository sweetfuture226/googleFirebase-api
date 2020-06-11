const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tipsterios-ea6fa.firebaseio.com"
});
const db = admin.firestore();

app.get('/hello-world', (req, res) => {
    return res.status(200).send('Hello World!');
  });

//create analistas
app.post('/api/analistas/create', (req, res) => {
    (async () => {
        try {
            await db.collection('analistas').doc('/' + req.body.analistId + '/').create({userId: req.body.userId, isPremium: req.body.isPremium, score: req.body.score, odd: req.body.odd, nombre: req.body.nombre});
            return res.status(200).send("Successfully Created !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });
//read analistas
  app.get('/api/analistas/read/:analistId', (req, res) => {
    (async () => {
        try {
            const document = db.collection('analistas').doc(req.params.analistId);
            let analistas = await document.get();
            let response = analistas.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });
//read analistas all
app.get('/api/analistas/read', (req, res) => {
    (async () => {
        try {
            let query = db.collection('analistas');
            let response = [];
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedAnalistas = {
                        analistId: doc.analistId,
                        userId: doc.data().userId,
                        isPremium: doc.data().isPremium,
                        score: doc.data().score,
                        odd: doc.data().odd,
                        nombre: doc.data().nombre,
                    };
                    response.push(selectedAnalistas);
                }
                return response;
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

//update analistas
app.put('/api/analistas/update/:analistId', (req, res) => {
    (async () => {
        try {
            const document = db.collection('analistas').doc(req.params.analistId);
            await document.update({
                userId: req.body.userId,
                isPremium: req.body.isPremium,
                score: req.body.score, 
                odd: req.body.odd,
                nombre: req.body.nombre
            });
            return res.status(200).send("Successfully Updated !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
});

// delete analistas
app.delete('/api/analistas/delete/:analistId', (req, res) => {
    (async () => {
        try {
            const document = db.collection('analistas').doc(req.params.analistId);
            await document.delete();
            return res.status(200).send("Successfully Deleted !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

//create authentication
app.post('/api/authentication/create', (req, res) => {
    (async () => {
        try {
            await db.collection('authentications').doc('/' + req.body.userId + '/').create({Accediste: req.body.Accediste, Creado: req.body.Creado, Identificador: req.body.Identificador});
            return res.status(200).send("Successfully Created !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });

  //read authentication
  app.get('/api/authentication/read/:userId', (req, res) => {
    (async () => {
        try {
            const document = db.collection('authentications').doc(req.params.userId);
            let authentications = await document.get();
            let response = authentications.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });
//read authentication all
app.get('/api/authentication/read', (req, res) => {
    (async () => {
        try {
            let query = db.collection('authentications');
            let response = [];
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedAuthentication = { 
                        userId: doc.userId,
                        Accediste: doc.data().Accediste,
                        Creado: doc.data().Creado,
                        Identificador: doc.data().Identificador
                    };
                    response.push(selectedAuthentication);
                }
                return response;
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

//update authentication
app.put('/api/authentication/update/:userId', (req, res) => {
    (async () => {
        try {
            const document = db.collection('authentications').doc(req.params.userId);
            await document.update({
                Accediste: req.body.Accediste, 
                Creado: req.body.Creado,
                Identificador: req.body.Identificador
            });
            return res.status(200).send("Successfully Updated !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
});

// delete authentication
app.delete('/api/authentication/delete/:userId', (req, res) => {
    (async () => {
        try {
            const document = db.collection('authentications').doc(req.params.userId);
            await document.delete();
            return res.status(200).send("Successfully Deleted !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

//create misAnalistas
app.post('/api/misAnalistas/create', (req, res) => {
    (async () => {
        try {
            await db.collection('misAnalistas').doc('/' + req.body.myAnalistId + '/').create({suscriptionId: req.body.suscriptionId, analystId: req.body.analystId});
            return res.status(200).send("Successfully Created!");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });
  //read misAnalistas
  app.get('/api/misAnalistas/read/:myAnalistId', (req, res) => {
    (async () => {
        try {
            const document = db.collection('misAnalistas').doc(req.params.myAnalistId);
            let misAnalista = await document.get();
            let response = misAnalista.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });
//read misAnalistas all
app.get('/api/misAnalistas/read', (req, res) => {
    (async () => {
        try {
            let query = db.collection('misAnalistas');
            let response = [];
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedmisAnalistas = { 
                        myAnalistId: doc.myAnalistId,
                        suscriptionId: doc.data().suscriptionId,
                        analystId: doc.data().analystId
                    };
                    response.push(selectedmisAnalistas);
                }
                return response;
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

//update misAnalistas
app.put('/api/misAnalistas/update/:myAnalistId', (req, res) => {
    (async () => {
        try {
            const document = db.collection('misAnalistas').doc(req.params.myAnalistId);
            await document.update({
                suscriptionId: req.body.suscriptionId, 
                analystId: req.body.analystId
            });
            return res.status(200).send("Successfully Updated !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
});

// delete misAnalistas
app.delete('/api/misAnalistas/delete/:myAnalistId', (req, res) => {
    (async () => {
        try {
            const document = db.collection('misAnalistas').doc(req.params.myAnalistId);
            await document.delete();
            return res.status(200).send("Successfully Deleted !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

// create suscripciones
app.post('/api/suscripciones/create', (req, res) => {
    (async () => {
        try {
            await db.collection('suscripciones').doc('/' + req.body.suscriptionId + '/').create({userId: req.body.userId, expires: req.body.expires, statusActive: req.body.statusActive});
            return res.status(200).send("Successfully Created !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });
  //read suscripciones
  app.get('/api/suscripciones/read/:suscriptionId', (req, res) => {
    (async () => {
        try {
            const document = db.collection('suscripciones').doc(req.params.suscriptionId);
            let suscripciones = await document.get();
            let response = suscripciones.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });
//read suscripciones all
app.get('/api/suscripciones/read', (req, res) => {
    (async () => {
        try {
            let query = db.collection('suscripciones');
            let response = [];
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedSuscripciones = {
                        suscriptionId: doc.suscriptionId,
                        userId: doc.data().userId,
                        expires: doc.data().expires,
                        statusActive: doc.data().statusActive
                    };
                    response.push(selectedSuscripciones);
                }
                return response;
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

//update suscripciones
app.put('/api/suscripciones/update/:suscriptionId', (req, res) => {
    (async () => {
        try {
            const document = db.collection('suscripciones').doc(req.params.suscriptionId);
            await document.update({
                userId: req.body.userId, 
                expires: req.body.expires,
                statusActive: req.body.statusActive
            });
            return res.status(200).send("Successfully Updated !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
});

// delete suscripciones
app.delete('/api/suscripciones/delete/:suscriptionId', (req, res) => {
    (async () => {
        try {
            const document = db.collection('suscripciones').doc(req.params.suscriptionId);
            await document.delete();
            return res.status(200).send("Successfully Deleted !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });


//create countries
app.post('/api/countries/create', (req, res) => {
    (async () => {
        try {
            await db.collection('countries').doc('/' + req.body.countryKey + '/').create({countryName: req.body.countryName});
            return res.status(200).send("Successfully Created !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });

  //read countries
  app.get('/api/countries/read/:countryKey', (req, res) => {
    (async () => {
        try {
            const document = db.collection('countries').doc(req.params.countryKey);
            let countries = await document.get();
            let response = countries.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });
//read countries all
app.get('/api/countries/read', (req, res) => {
    (async () => {
        try {
            let query = db.collection('countries');
            let response = [];
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedCountries = {
                        countryKey: doc.countryKey,
                        countryName: doc.data().countryName
                    };
                    response.push(selectedCountries);
                }
                return response;
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

//update countries
app.put('/api/countries/update/:countryKey', (req, res) => {
    (async () => {
        try {
            const document = db.collection('countries').doc(req.params.countryKey);
            await document.update({
                countryName: req.body.countryName
            });
            return res.status(200).send("Successfully Updated !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
});

// delete countries
app.delete('/api/countries/delete/:countryKey', (req, res) => {
    (async () => {
        try {
            const document = db.collection('countries').doc(req.params.countryKey);
            await document.delete();
            return res.status(200).send("Successfully Deleted !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

//create leagues
app.post('/api/leagues/create', (req, res) => {
    (async () => {
        try {
            await db.collection('leagues').doc('/' + req.body.leagueKey + '/').create({countryKey: req.body.countryKey, leagueName: req.body.leagueName});
            return res.status(200).send("Successfully Created !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });

  //read leagues
  app.get('/api/leagues/read/:leagueKey', (req, res) => {
    (async () => {
        try {
            const document = db.collection('leagues').doc(req.params.leagueKey);
            let leagues = await document.get();
            let response = leagues.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });
//read leagues all
app.get('/api/leagues/read', (req, res) => {
    (async () => {
        try {
            let query = db.collection('leagues');
            let response = [];
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedleagues = {
                        leagueKey: doc.leagueKey,
                        countryKey: doc.data().countryKey,
                        leagueName: doc.data().leagueName
                    };
                    response.push(selectedleagues);
                }
                return response;
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

//update leagues
app.put('/api/leagues/update/:leagueKey', (req, res) => {
    (async () => {
        try {
            const document = db.collection('leagues').doc(req.params.leagueKey);
            await document.update({
                countryKey: req.body.countryKey,
                leagueName: req.body.leagueName
            });
            return res.status(200).send("Successfully Updated !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
});

// delete leagues
app.delete('/api/leagues/delete/:leagueKey', (req, res) => {
    (async () => {
        try {
            const document = db.collection('leagues').doc(req.params.leagueKey);
            await document.delete();
            return res.status(200).send("Successfully Deleted !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

//create teams
app.post('/api/teams/create', (req, res) => {
    (async () => {
        try {
            await db.collection('teams').doc('/' + req.body.teamKey + '/').create({leagueKey: req.body.leagueKey, teamName: req.body.teamName});
            return res.status(200).send("Successfully Created !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });

//read teams
app.get('/api/teams/read/:teamKey', (req, res) => {
    (async () => {
        try {
            const document = db.collection('teams').doc(req.params.teamKey);
            let teams = await document.get();
            let response = teams.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });
//read teams all
app.get('/api/teams/read', (req, res) => {
    (async () => {
        try {
            let query = db.collection('teams');
            let response = [];
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedleagues = {
                        teamKey: doc.teamKey,
                        leagueKey: doc.data().leagueKey,
                        teamName: doc.data().teamName
                    };
                    response.push(selectedleagues);
                }
                return response;
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

//update teams
app.put('/api/teams/update/:teamKey', (req, res) => {
    (async () => {
        try {
            const document = db.collection('teams').doc(req.params.teamKey);
            await document.update({
                leagueKey: req.body.leagueKey,
                teamName: req.body.teamName
            });
            return res.status(200).send("Successfully Updated !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
});

// delete teams
app.delete('/api/teams/delete/:teamKey', (req, res) => {
    (async () => {
        try {
            const document = db.collection('teams').doc(req.params.teamKey);
            await document.delete();
            return res.status(200).send("Successfully Deleted !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });
    
//create player
app.post('/api/player/create', (req, res) => {
    (async () => {
        try {
            await db.collection('player').doc('/' + req.body.playerKey + '/').create({playerName: req.body.playerName, playerNumber: req.body.playerNumber, playerCountry: req.body.playerCountry,
                                                                                        playerYellowCards: req.body.playerYellowCards, playerRedCards: req.body.playerRedCards, teamKey: req.body.teamKey, playerAge: req.body.playerAge,
                                                                                        playerGoals: req.body.playerGoals});
            return res.status(200).send("Successfully Created !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });

  //read player
app.get('/api/player/read/:playerKey', (req, res) => {
    (async () => {
        try {
            const document = db.collection('player').doc(req.params.playerKey);
            let player = await document.get();
            let response = player.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });
//read player all
app.get('/api/player/read', (req, res) => {
    (async () => {
        try {
            let query = db.collection('player');
            let response = [];
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedleagues = {
                        playerKey: doc.playerKey,
                        playerName: doc.data().playerName,
                        playerNumber: doc.data().playerNumber,
                        playerCountry: doc.data().playerCountry,
                        playerYellowCards: doc.data().playerYellowCards,
                        playerRedCards: doc.data().playerRedCards,
                        teamKey: doc.data().teamKey,
                        playerAge: doc.data().playerAge,
                        playerNumber: doc.data().playerNumber,
                        playerGoals: doc.data().playerGoals
                    };
                    response.push(selectedleagues);
                }
                return response;
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

//update player
app.put('/api/player/update/:playerKey', (req, res) => {
    (async () => {
        try {
            const document = db.collection('player').doc(req.params.playerKey);
            await document.update({
                playerName: req.body.playerName,
                playerNumber: req.body.playerNumber,
                playerCountry: req.body.playerCountry,
                playerYellowCards: req.body.playerYellowCards,
                playerRedCards: req.body.playerRedCards,
                teamKey: req.body.teamKey,
                playerAge: req.body.playerAge,
                playerNumber: req.body.playerNumber,
                playerGoals: req.body.playerGoals
            });
            return res.status(200).send("Successfully Updated !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
});

// delete player
app.delete('/api/player/delete/:playerKey', (req, res) => {
    (async () => {
        try {
            const document = db.collection('player').doc(req.params.playerKey);
            await document.delete();
            return res.status(200).send("Successfully Deleted !");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

exports.app = functions.https.onRequest(app);
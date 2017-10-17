require('dotenv-extended').load();
var builder = require('botbuilder');
var restify = require('restify');
var Store = require('./store');
var spellService = require('./spell-service');
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
server.post('/api/messages', connector.listen());
var bot = new builder.UniversalBot(connector, function (session) {
    session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text);
});
var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
bot.recognizer(recognizer);
bot.dialog('SearchDeptHead', [
    
]).triggerAction({
    matches: 'SearchDeptHead'
});
bot.dialog('SearchUniversityOfficials', [
    // ...
    function (session, args, next) {
        session.send('I am analyzing your message: \'%s\'.....', session.message.text);
        var presidentEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'president');
        var vpEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'vice president');
        var chairmanEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'chairman');
        var viceChairmanEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'vice chairman');
        var deptHeadEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'department head');
        var csdEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'csd');
        var vpRegistrarEntity = builder.EntityRecognizer.findEntity((args.intent.entities, 'vice president') + (args.intent.entities, 'university registrar'));
        var vpStudAffairsEntity = builder.EntityRecognizer.findEntity((args.intent.entities, 'vice president') + (args.intent.entities, 'student affairs'));
            
            if (chairmanEntity) {
            session.dialogData.searchType = 'chairman';
            next({ response: chairmanEntity.entity });
            }
            else if(presidentEntity ) {
            session.dialogData.searchType = 'president';
            next({ response: presidentEntity.entity });
            }
            else if (deptHeadEntity && csdEntity){
             session.dialogData.searchType = 'deptHead';
            next({ response: deptHeadEntity.entity });   
            next({ response: csdEntity.entity });   
            }
            else if (vpEntity){
             session.dialogData.searchType = 'vp';
            next({ response: vpEntity.entity });  
            }
            else if (viceChairmanEntity){
             session.dialogData.searchType = 'vice chairman';
            next({ response: viceChairmanEntity.entity });  
            }
            else if (vpStudAffairsEntity){
             session.dialogData.searchType = 'vp studAffairs';
             next({ response: vpStudAffairsEntity.entity });   
            }
            else if (vpRegistrarEntity){
             session.dialogData.searchType = 'vp registrar';
            next({ response: vpRegistrarEntity.entity });  
            }
            else {
            builder.Prompts.text(session,'Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.');
            }
        },
    
     function (session, results) {
        var destination = results.response;
        var message = 'Searching......';
       
        if (session.dialogData.searchType === 'chairman') {
             session.send(message, destination);
             Store
            .searchDeptHead(destination)
            .then(function (deptHead) {
                session.send('The Chairman of Board of Regents is Mayor Oscar Malapitan.');
                session.endDialog();
            });
        } else if (session.dialogData.searchType === 'president') {
            session.send(message, destination);
             Store
            .searchDeptHead(destination)
            .then(function (deptHead) {
                session.send('The President of University of Caloocan City is Atty. Rene Richard A. Salazar.');
                session.endDialog();
            });
        }
        else if (session.dialogData.searchType === 'deptHead') {
            session.send(message, destination);
             Store
            .searchDeptHead(destination)
            .then(function (deptHead) {
                session.send('The department head of CSD is Dr. Teodoro Macaraeg Jr.');
                session.endDialog();
            });
        }
        else if (session.dialogData.searchType === 'vp') {
            session.send(message, destination);
             Store
            .searchDeptHead(destination)
            .then(function (deptHead) {
                session.send('The Executive Vice President of University of Caloocan City is Dr. Cesar B. Chavez .');
                session.endDialog();
            });
        }
        else if (session.dialogData.searchType === 'vice chairman') {
            session.send(message, destination);
             Store
            .searchDeptHead(destination)
            .then(function (deptHead) {
                session.send('The Vice Chairman of Board of Regents is Atty. Rene Richard A. Salazar .');
                session.endDialog();
            });
        }
        else if (session.dialogData.searchType === 'vp studAffairs') {
            session.send(message, destination);
             Store
            .searchDeptHead(destination)
            .then(function (deptHead) {
                session.send('The Vice President for  Student Affairs/ University Registrar is Dr. Melchor S. Julianes .');
                session.endDialog();
            });
        }
        else if (session.dialogData.searchType === 'vp registrar') {
            session.send(message, destination);
           
             Store
            .searchDeptHead(destination)
            .then(function (deptHead) {
             
                session.send('The Vice President for  Student Affairs/ University Registrar is Dr. Melchor S. Julianes .');
                session.endDialog();
            });
        }
        else {
            builder.Prompts.text(session,'Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.');
            }
        
    }
]).triggerAction({
    matches: 'SearchUniversityOfficials'
});
bot.dialog('UniversityInfo', [
    // ...
    function (session, args, next) {
        session.send('I am analyzing your message: \'%s\'..... ', session.message.text);
        var visionMissionEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'vision and mission');
        var visionEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'vision');
        var missionEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'mission');
        var coursesEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'courses');
        var logoEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'logo');
            
            
            if (visionEntity) {
            session.dialogData.searchType = 'vision';
            next({ response: visionEntity.entity });
            }
            else if(missionEntity ) {
            session.dialogData.searchType = 'mission';
            next({ response: missionEntity.entity });
            }
            else if(visionMissionEntity ) {
            session.dialogData.searchType = 'vm';
            next({ response: visionMissionEntity.entity });
            }
            else if(coursesEntity ) {
            session.dialogData.searchType = 'courses';
            next({ response: coursesEntity.entity });
            }
            else if(logoEntity ) {
            session.dialogData.searchType = 'logo';
            next({ response: logoEntity.entity });
            }
            else {
            builder.Prompts.text(session,'Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.');
            }
        },
    
     function (session, results) {
        var destination = results.response;
        var message = 'Searching......';
        if (session.dialogData.searchType === 'vision') {
           
             session.send(message, destination);
             Store
            .searchDeptHead(destination)
            .then(function (deptHead) {
                var msg = new builder.Message(session);
                     msg.attachmentLayout(builder.AttachmentLayout.carousel)
                        msg.attachments([
                          new builder.HeroCard(session)
                             .title("VISION")
                             .text("A quality higher education institution imbued with relevant knowledge, skills and values for the attainment of community driven, industry sensitive, environmentally conscious, resilient and globally competitive, Academicsally focused citizens for the service of Caloocan City.")
                         ]);
                    session.send(msg).endDialog();
                 });
            } 
        else if (session.dialogData.searchType === 'mission') {
           
             session.send(message, destination);
             Store
            .searchDeptHead(destination)
            .then(function (deptHead) {
                var msg = new builder.Message(session);
                     msg.attachmentLayout(builder.AttachmentLayout.carousel)
                        msg.attachments([
                          new builder.HeroCard(session)
                             .title("MISSION")
                             .text("To maintain and support an adequate system of tertiary education that will help promote the economic growth of the country, strengthen the character and well-being of its graduates as productive members of the community.")
                         ]);
                    session.send(msg).endDialog();
                 });
            }
          else if (session.dialogData.searchType === 'vm') {
           
             session.send(message, destination);
             Store
            .searchDeptHead(destination)
            .then(function (deptHead) {
                var msg = new builder.Message(session);
                     msg.attachmentLayout(builder.AttachmentLayout.carousel)
                        msg.attachments([
                          new builder.HeroCard(session)
                             .title("VISION")
                             .text("A quality higher education institution imbued with relevant knowledge, skills and values for the attainment of community driven, industry sensitive, environmentally conscious, resilient and globally competitive, Academicsally focused citizens for the service of Caloocan City."),
                          new builder.HeroCard(session)
                             .title("MISSION")
                             .text("To maintain and support an adequate system of tertiary education that will help promote the economic growth of the country, strengthen the character and well-being of its graduates as productive members of the community.")   
                         ]);
                    session.send(msg).endDialog();
                 });
            } 
            else if (session.dialogData.searchType === 'courses') {
           
             session.send(message, destination);
             Store
            .searchDeptHead(destination)
            .then(function (deptHead) {
                var msg = new builder.Message(session);
                     msg.attachmentLayout(builder.AttachmentLayout.carousel)
                        msg.attachments([
                          new builder.HeroCard(session)
                             .title("Select a Department")
                              .buttons([
                                builder.CardAction.imBack(session, "college of liberal arts and sciences", "College of Liberal Arts and Sciences"),
                                builder.CardAction.imBack(session, "college of business and accountancy", "College of Business and Accountancy"),
                                builder.CardAction.imBack(session, "college of education", "College of Education"),
                             ]),
                          
                         ]);
                    session.send(msg).endDialog();
                 });
            } 
            else if (session.dialogData.searchType === 'logo') {
           
             session.send(message, destination);
             Store
            .searchDeptHead(destination)
            .then(function (deptHead) {
                var msg = new builder.Message(session);
                     msg.attachmentLayout(builder.AttachmentLayout.carousel)
                        msg.attachments([
                          new builder.HeroCard(session)
                             .images([builder.CardImage.create(session, 'http://ucc-caloocan.edu.ph/images/ucc_logo.png')])
                             ]),
                     session.send(msg).endDialog();
                 });
            } 
            else {
            builder.Prompts.text(session,'Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.');
            }      
        
    }
]).triggerAction({
    matches: 'UniversityInfo'
});
bot.dialog('SearchCourses', [
    // ...
    function (session, args, next) {
        session.send('I am analyzing your message: \'%s\'..... ', session.message.text);
        var deptAEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'liberal arts and sciences');
        var deptBEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'business and accountancy');
        var deptCEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'education');
            
            if (deptAEntity) {
            session.dialogData.searchType = 'set A';
            next({ response: deptAEntity.entity });
            }
            else if (deptBEntity) {
            session.dialogData.searchType = 'set B';
            next({ response: deptBEntity.entity });
            }
            else if (deptCEntity) {
            session.dialogData.searchType = 'set C';
            next({ response: deptCEntity.entity });
            }
           
            else {
            builder.Prompts.text(session,'Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.');
            }
        },
    
     function (session, results) {
        var destination = results.response;
        var message = 'Searching......';
        var courseSetA = [
            "BS Computer Science", "BS Information System","BS Information Technology",
            "BS Entertainment and Multimedia Computing","BS Mathematics","BS Psychology",
            "BS Criminology","BS Public Administration","BS Public Administration (Special Program)",
            "AB Communication","AB Political Science","AB Behavioral Science"
        ];
        var courseSetB = [
            "BS Accounting Technology", "BS Accountancy","BS Tourism",
            "BS Hotel and Restaurant Management","BSBA Financial Management","BSBA Marketing Management",
            "BS Entrepreneural Management","BSA Human and Resources Development Management","BS Office Administration",
            "Computer Secretarial"
        ];
        var courseSetC = [
            "BEED Early Childhood Education", "BEED Special Education","BSE T.L.E.",
            "BSE Science","BSE English","BSE English-Chinese",
            "Certificate in Professional Education","Elementary/Secondary P.E."
        ];
            if (session.dialogData.searchType === 'set A') {
           
             session.send(message, destination);
             Store
            .searchDeptHead(destination)
            .then(function (deptHead) {
                 
                for(i =0 ; i <= courseSetA.length;i++ ){
                    session.send(courseSetA[i]);
                }
                    session.endDialog();
                 });
            } 
            else if (session.dialogData.searchType === 'set B') {
           
             session.send(message, destination);
             Store
            .searchDeptHead(destination)
            .then(function (deptHead) {
                  
                for(i = 0 ; i <= courseSetB.length;i++ ){
                    session.send(courseSetB[i]);
                }

                session.endDialog();
                 });
            } 
              else if (session.dialogData.searchType === 'set C') {
           
             session.send(message, destination);
             Store
            .searchDeptHead(destination)
            .then(function (deptHead) {
                  
                for(i = 0 ; i <= courseSetC.length;i++ ){
                    session.send(courseSetC[i]);
                }

                session.endDialog();
                 });
            }
            else {
            builder.Prompts.text(session,'Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.');
            }      
        
    }
]).triggerAction({
    matches: 'SearchCourses'
});
bot.dialog('Help', function (session) {
    // ...
    session.send('Hi! Try asking me things like \'show courses in ucc\', search for some info about UCC or search about the officials in this University');
}).triggerAction({
    matches: 'Help'
});
if (process.env.IS_SPELL_CORRECTION_ENABLED === 'true') {
    bot.use({
        botbuilder: function (session, next) {
            spellService
                .getCorrectedText(session.message.text)
                .then(function (text) {
                    session.message.text = text;
                    next();
                })
                .catch(function (error) {
                    console.error(error);
                    next();
                });
        }
    });
}
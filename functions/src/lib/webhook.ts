
import * as functions from 'firebase-functions';
import { WebhookClient, context } from 'dialogflow-fulfillment';




let questions = [
    {
        question: "what was the first capital of pakistan",
        options: ["karachi", "lahore", "islamabad", "kashmir"]
    },
    {
        question: "which one is the bigest city of pakistan",
        options: ["karachi", "lahore", "islamabad", "kashmir"]
    },

]




// http example
export const webhook = functions.https.onRequest((request, response) => {

    const _agent = new WebhookClient({ request: request, response: response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));


    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();

    // works with intent name(doesnt work with action identifier) and this intent name is ****ing case sensitive :-(
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('startQuiz', startQuiz);
    intentMap.set('startQuiz_overview', startQuiz_overview);
    intentMap.set('startQuiz_readQuestion', startQuiz_readQuestion);

    _agent.handleRequest(intentMap);




    function welcome(agent: any) {
        console.log("agent.getContext('startQuiz'): ", agent.getContext('startQuiz'));

        let params = agent.parameters;

        agent.add(`Hi, would you like me to start quiz`);

    }


    function startQuiz(agent: WebhookClient) {

        let params = agent.parameters;
        agent.setContext({
            name: 'start_quiz',
            lifespan: 99,
            parameters: { quizStarted: true }
        });
        agent.add(`your quiz is started, would you like me to tell you overview? or you can directly ask for 1st question`);
    }

    function startQuiz_overview(agent: WebhookClient) {

        agent.add(`general knowlegde quiz\n
        this quiz have 10 questions and all questions are mcqs based,\n
        created by Prof. John maclean,\n
        all questions have equal marks
        you have to attempt all questions\n
        total marks 100 and passing marks is 50\n
        ask for 1st question when you are ready`);
    }

    function startQuiz_readQuestion(agent: WebhookClient) {

        let params = agent.parameters;
        console.log("params: ", params)

        if (!params.question_number && !params.question_ordinal) {
            agent.add("please tell me which question you are talking about, you may ask like read first question or read question number 4")
        } else {
            let question_number = params.question_number || params.question_ordinal

            agent.setContext({
                name: 'start_quiz',
                lifespan: 99,
                parameters: {
                    quizStarted: true,
                    last_readed_question: question_number
                }
            });
            agent.add(`question number ${question_number} is saying, ${questions[question_number - 1].question},\n
            and your options are: ${questions[question_number - 1].options.toString()}\n
            which option do you think is correct? to log your answer say like option 1 or option A or first option is correct
            if you want me to read this question again simply say read question ${question_number} again,
            if you want to skip this question you may ask me to read any other question`)
        }
    }

});



var body = {
    "id": "95293748-d13b-4458-9b25-3b33b729ec66",
    "timestamp": "2018-10-17T12:40:48.703Z",
    "lang": "en",
    "result": {
        "source": "agent",
        "resolvedQuery": "hi",
        "speech": "",
        "action": "input.welcome",
        "actionIncomplete": false,
        "parameters": {

        },
        "contexts": [{}],
        "metadata": {
            "intentId": "a32854c1-56f1-4dc8-897a-2eccf221017c",
            "webhookUsed": "true",
            "webhookForSlotFillingUsed": "false",
            "isFallbackIntent": "false",
            "intentName": "Default Welcome Intent"
        },
        "fulfillment": {
            "speech": "welcome to the quiz system,            you may ask me to start quiz or overview of quiz",
            "messages": [{
                "type": 0,
                "speech": "welcome to the quiz system,                 you may ask me to start quiz or overview of quiz"
            }]
        },
        "score": 1
    },
    "status": {
        "code": 200,
        "errorType": "success"
    },
    "sessionId": "b1e0414f-0c92-5497-0913-5b3acd475f9a"
}
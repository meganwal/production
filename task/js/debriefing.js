/*

    This is the JavaScript for your Debriefing.
    This is loaded by the HTML page for that, 'debriefing.html'.

    INSTRUCTIONS FOR MODIFICATION:

    In the jsPsych trial named 'debriefing' below, provide a one or two paragraph explanation of your experiment for your participants.
    If you are unsure about your debriefing, you can send it to Bonnie to look over.

*/



// INITIALIZE JATOS

jatos.onLoad(function() {



    // INITIALIZE JSPSYCH

    let jsPsych = initJsPsych({
        // This 'on_finish' function contains the tasks that will be executed AFTER this Component JS file is run.
        on_finish: function() {
            // This Component is labeled as "debriefing" in the data.
            let output = [{component: "debriefing", urlparameters_and_date: jatos.studySessionData}];
            jatos.submitResultData(output);

            // This is necessary to prevent jsPsych from executing 'on_close' when the Component ends (which is only intended to execute when the participant manually closes the experiment).
            component_ending = true

            // End study. You will likely have entered a redirect URL to grant credit/record submission. See 'Instructions for Running an Online Experiment: Recruiting participants'.
            jatos.endStudy();
        },

        // This 'on_close' function contains the tasks that will be executed if the participant manually closes the experiment.
        // As described in 'experiment.js', this is used to add the present participant's version back into the versionsList if they close the experiment early.
        on_close: function() {
            // Only execute if the participant did NOT arrive to the Debriefing after failing the Headphones Check/Typing Screen, and the Component is not being ended by JATOS.
            if (jatos.studySessionData.test_outcome != "failure" && typeof component_ending === "undefined") {

                // Retrieve all data from the Batch Session.
                let batchSession = jatos.batchSession.getAll();

                // Retrieve the list of versions you manually entered as per 'Instructions for Running an Online Experiment: Rotating participant versions'
                let versionsList = batchSession.versionsList;

                // Get present version
                version =  jatos.studySessionData.version;

                // As long as that version list exists, add the present version back into the list.
                if (versionsList) {
                    versionsList.push(version)
                    jatos.batchSession.set("versionsList", versionsList)
                }
            }
        },
    });



    // DEBRIEFING
    // Here is a possible format of your Debriefing. You can feel free to change this as desired.
    let debriefing = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
              <div style="width:800px">
                <p>Thank you for your completing our experiment!</p>
                <p>Before you submit, we would like to explain a bit about what we were researching in this study.</p>
                <p>
                   In this experiment, we investigated how performing different tasks while learning influence memory.
                </p>
                <p>
                  We are comparing experience saying the words aloud, clicking on the right image, or hearing the correct name spoken.
                </p>
                <p>
                  We will see whether these different experiences lead to different learning, even after a break. 
                </p>
                <p>
                   <span style = 'font-weight: bold'>PLEASE PRESS SUBMIT TO RECORD YOUR COMPLETION.</span>
                </p>
              </div>
              `,
    choices: ['Submit'],
    };

    let timeline = [debriefing]



    // BEGIN DEBRIEFING
    jsPsych.run(timeline);



});

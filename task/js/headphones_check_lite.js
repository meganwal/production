/*

    This is the JavaScript for your Headphones Check Lite.
    This is loaded by the HTML page for that, 'headphones_check_lite.html'.

    Place this in your js folder.

    INSTRUCTIONS FOR MODIFICATION:

    On line 197, specify the ID number associated with your Debriefing Component. When a participant fails this screening, they should still view the Debriefing.
    See 'Instructions for Running an Online Experiment: Creating a new study in JATOS' for info on viewing a Component's ID number.

*/



// INITIALIZE JATOS

jatos.onLoad(function() {



    // INITIALIZE JSPSYCH

    let jsPsych = initJsPsych({
        // This 'on_finish' function contains the tasks that will be executed AFTER this Component JS file is run.
        on_finish: function () {
            // Mark 'outcome' as success since end of headphones check reached.
            let output = [{component: "headphones_check_lite", outcome: "success", urlparameters_and_date: jatos.studySessionData}];
            jatos.submitResultData(output);

            // Start next component.
            jatos.startNextComponent();
        },
    });



    // PRELOAD

    let preload = {
        type: jsPsychPreload,
        images: ['media/images/headphones_check_lite/cat.png','media/images/headphones_check_lite/cap.png','media/images/headphones_check_lite/beach.png','media/images/headphones_check_lite/peach.png','media/images/headphones_check_lite/frame.png','media/images/headphones_check_lite/flame.png','media/images/headphones_check_lite/mat.png','media/images/headphones_check_lite/bat.png','media/images/headphones_check_lite/log.png','media/images/headphones_check_lite/lock.png','media/images/headphones_check_lite/spin.png','media/images/headphones_check_lite/skin.png'],
        audio: ['media/audio/headphones_check_lite/volume_test.flac','media/audio/headphones_check_lite/cap.flac','media/audio/headphones_check_lite/beach.flac','media/audio/headphones_check_lite/frame.flac','media/audio/headphones_check_lite/mat.flac','media/audio/headphones_check_lite/log.flac','media/audio/headphones_check_lite/skin.flac'],
      }



    // INTRODUCTION

    let intro = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
                    <div style = "width:800px">
                    <p>Thank you!</p>
                    <p>Before we begin, we will test your audio volume and quality.</p>
                    <p>If you have not already done so, please put on headphones or earphones.</p>
                    <p style = "font-weight:bold">Click the spacebar to continue.</p>
                    </div>
                  `,
        choices: [" "],
    };



    // VOLUME TEST INTRO

    let volumeTestIntro = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
                    <div style = "width:800px">
                    <p>First, we will test your volume. Please put your volume down to the <span style = "font-weight:bold">lowest level</span>.</p>
                    <p style = "font-weight:bold">Click the spacebar to continue.</p>
                    </div>
                  `,
        choices: [" "],
    };



    // VOLUME TEST

    let volumeTest = {
        type: jsPsychAudioKeyboardResponse,
        stimulus: 'media/audio/headphones_check_lite/volume_test.flac',
        prompt: `
                    <div style = "width:800px">
                    <p>Raise your volume until you can hear the audio at a comfortable level.</p>
                    <p style = "font-weight:bold">Click the spacebar to continue.</p>
                    </div>
                  `,
        choices: [" "],
    };



    // SOUND QUALITY TEST INTRO

    let qualityTestIntro = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
                    <div style = "width:800px">
                    <p>Now, we will test your audio quality to ensure you can perceive sounds clearly.</p>
                    <p>On the next screen, click on the image whose name you hear.</p>
                    <p style = "font-weight:bold">Click the spacebar to continue.</p>
                    </div>
                  `,
        choices: [" "],
    };



    // SOUND QUALITY TEST

    // Round 1 of Sound Quality test.
    let qualityTest1 = {
        type: jsPsychAudioButtonResponseHcl,
        stimulus: 'media/audio/headphones_check_lite/cap.flac',
        choices: ['cat','cap'],
        margin_horizontal: '100px',
        response_ends_trial: true,
    };
    let qualityTest2 = {
        type: jsPsychAudioButtonResponseHcl,
        stimulus: 'media/audio/headphones_check_lite/frame.flac',
        choices: ['flame','frame'],
        margin_horizontal: '100px',
        response_ends_trial: true,
    };
    let qualityTest3 = {
        type: jsPsychAudioButtonResponseHcl,
        stimulus: 'media/audio/headphones_check_lite/beach.flac',
        choices: ['beach','peach'],
        margin_horizontal: '100px',
        response_ends_trial: true,
    };

    // Failure screen for Round 1.
    let failure1 = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
                    <div style = "width:800px">
                    <p>Sorry, those were not all correctly answered.</p>
                    <p>Please try again.</p>
                     <p style = "font-weight:bold">Click the spacebar to continue.</p>
                    </div>
                  `,
        choices: [" "],
    };

    // Round 2 of Sound Quality Test. Only shows if Round 1 failed.
    let qualityTest4 = {
        type: jsPsychAudioButtonResponseHcl,
        stimulus: 'media/audio/headphones_check_lite/skin.flac',
        choices: ['spin','skin'],
        margin_horizontal: '100px',
        response_ends_trial: true,
    };
    let qualityTest5 = {
        type: jsPsychAudioButtonResponseHcl,
        stimulus: 'media/audio/headphones_check_lite/log.flac',
        choices: ['log','lock'],
        margin_horizontal: '100px',
        response_ends_trial: true,
    };
    let qualityTest6 = {
        type: jsPsychAudioButtonResponseHcl,
        stimulus: 'media/audio/headphones_check_lite/mat.flac',
        choices: ['bat','mat'],
        margin_horizontal: '100px',
        response_ends_trial: true,
    };

    // Failure screen for Round 2 and then send participant to Debriefing.
    let failure2 = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
                    <div style = "width:800px">
                    <p style="margin-bottom:5%;font-weight:bold">Sorry, you did not pass.</p>
                    <p>The experiment can't proceed. Don't worry, you will still receive credit for your submission.</p>
                    <p>Before we end the study, we would like explain more about the experiment you would have completed. Please press the space bar to continue.</p>
                    </div>
                  `,
        choices: [" "],
    };
    let sendToDebriefing = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "",
        choices: 'NO_KEYS',
        on_start: function (trial) {
            jatos.studySessionData.test_outcome = "failure"
            let output = [{component: "headphones_check_lite", outcome: "failure", urlparameters_and_date: jatos.studySessionData}];

            jatos.submitResultData(output);

            // CHANGE "####" TO THE ID NUMBER OF THE COMPONENT CORRESPONDING TO YOUR DEBRIEFING. THIS ID CAN BE FOUND ON JATOS.
            jatos.startComponent(40);
        }

    };

    // If Round 2 is failed, show Round 2 failure screen which is followed by sending Debriefing.
    let failure2Timeline = {
        timeline: [failure2, sendToDebriefing],
        conditional_function: function(){
            let qualityTestData6 = jsPsych.data.get().last(1).values()[0];
            let qualityTestData5 = jsPsych.data.get().last(2).values()[0];
            let qualityTestData4 = jsPsych.data.get().last(3).values()[0];
            if(qualityTestData4.response == 1 && qualityTestData5.response == 0 && qualityTestData6.response == 1){
                return false;
            } else {
                return true;
            }
        }
    }

    // Only show Round 2 if Round 1 is failed.
    let roundTwo = {
        timeline: [failure1, qualityTest4, qualityTest5, qualityTest6, failure2Timeline],
        conditional_function: function(){
            let qualityTestData3 = jsPsych.data.get().last(1).values()[0];
            let qualityTestData2 = jsPsych.data.get().last(2).values()[0];
            let qualityTestData1 = jsPsych.data.get().last(3).values()[0];
            if(qualityTestData1.response == 1 && qualityTestData2.response == 1 && qualityTestData3.response == 0){
                return false;
            } else {
                return true;
            }
        }
    }



    // SET TIMELINE AND BEGIN EXPERIMENT

    const timeline = [preload, intro, volumeTestIntro, volumeTest, qualityTestIntro, qualityTest1, qualityTest2, qualityTest3, roundTwo]
    jsPsych.run(timeline);



});

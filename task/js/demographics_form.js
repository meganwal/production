/* 

    This is the JavaScript for your Demographics Form.
    This is loaded by the HTML page for that, 'demographics_form.html'.

    Each trial's data object is marked wth a 'component: demographics' key-value pair to easily parse these from your data using the 'Parse_Raw_Data.py' script.

    INSTRUCTIONS FOR MODIFICATION:

    This file likely needs no modification.

*/



// INITIALIZE JATOS

jatos.onLoad(function() {



    // INITIALIZE JSPSYCH

    let jsPsych = initJsPsych({
        // This 'on_finish' function contains the tasks that will be executed AFTER this Component JS file is run.
        on_finish: function() {
            // Submit all demographic data to JATOS.
            let resultJson = jsPsych.data.get().json();
            jatos.submitResultData(resultJson);

            // Start next component.
            jatos.startNextComponent();
        },
    });



    // INTRODUCTION

    const introduce_form = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
                    <div style = "width:800px">
                        <p style="margin-bottom:5%">Thank you for participating in this experiment!</p>
                        <p>We are collecting demographic information as part of the study you signed up for.</p>
                        <p>The information collected here will not be linked to your identity and will be only used to describe the characteristics of the group of participants who participated in this research. Our reason for collecting gender and ethnicity data is to ensure the fair inclusion of underrepresented minorities in research.</p>
                        <p style = "font-weight:bold">Click the spacebar to continue.</p>
                    </div>
                  `,
        choices: [" "],

    };



    // AGE

    const q1_age = {
        type: jsPsychSurveyText,
        questions: [
            {prompt: 'What is your age? Please enter a number.'},
        ],
        preamble: '<h1>Demographics</h1>',
        button_label: 'Next',
    };



    // GENDER

    const q2_gender = {
        type: jsPsychSurveyMultiChoice,
        questions: [
            {prompt: 'What is your gender?', options: ['Male', 'Female', 'Non-binary', 'Do not wish to say']},
        ],
        preamble: '<h1>Demographics</h1>',
        button_label: 'Next',
    };



    // ETHNICITY

    const q3_ethnicity = {
        type: jsPsychSurveyMultiChoice,
        questions: [
            {prompt: 'What is your ethnicity?', options: ['American Indian or Alaska Native', 'Asian', 'Black or African American', 'Hispanic/Latino', 'Native Hawaiian or Other Pacific Islander', 'White', 'Mixed Race', 'Do not wish to say']},
        ],
        preamble: '<h1>Demographics</h1>',
        button_label: 'Next',
    };



    // AGE OF ENGLISH ACQUISITION

    const q4_ageEnglish = {
        type: jsPsychSurveyText,
        questions: [
            {prompt: 'At what age did you learn to speak English? Please enter a number (Put 0 if within the first year of life).'},
        ],
        preamble: '<h1>Demographics</h1>',
        button_label: 'Next',
    };



    // SECOND LANGUAGE BEFORE 5

    const q5_otherLangBefore = {
        type: jsPsychSurveyText,
        questions: [
            {prompt: 'Did you learn another language before age 5? Please answer "yes" or "no".'},
            {prompt: 'If "yes", what language(s)?'},
        ],
        preamble: '<h1>Demographics</h1>',
        button_label: 'Next',
    };



    // SECOND LANGUAGE AFTER 5

    const q6_otherLangAfter = {
        type: jsPsychSurveyText,
        questions: [
            {prompt: 'Did you learn another language to the degree of being fluent after age 5? Please answer "yes" or "no".'},
            {prompt: 'If "yes", what language(s)?'},
        ],
        preamble: '<h1>Demographics</h1>',
        button_label: 'Next',
    };



    // HANDEDNESS

    const q7_hand = {
        type: jsPsychSurveyMultiChoice,
        questions: [
            {prompt: 'Are you left or right-handed', options: ['Left', 'Right']},
        ],
        preamble: '<h1>Demographics</h1>',
        button_label: 'Next',
    };



    // SET TIMELINE AND BEGIN DEMOGRAPHICS FORM

    const timelineBare = [introduce_form, q1_age, q2_gender, q3_ethnicity, q4_ageEnglish, q5_otherLangBefore, q6_otherLangAfter, q7_hand]

    let completeTimeline = {
        timeline: timelineBare,

        // In the 'consent.html' template, Study Session data was created. 
        // It is an object with: the URL parameters pulled from Prolific or Sona (e.g. a participant's Prolific or Sona ID), an automatically-assigned JATOS ID, and the data and time of consent.
        // This is added to the data object associated with each Demographics trial, along with the key-value pair 'component: demographics'.
        data: {
            urlparameters_and_date: jatos.studySessionData,
            component: "demographics",
        },
    }

    timeline = [completeTimeline]
    jsPsych.run(timeline);


    
});
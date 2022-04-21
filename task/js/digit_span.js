jatos.onLoad(function() {

// INITIALIZE JSPSYCH

	let jsPsych = initJsPsych({
		on_finish: function() {
			let resultJson = jsPsych.data.get().json();
			jatos.submitResultData(resultJson);
			jatos.startNextComponent();
		},
	});
//Define Global Variables
	var timeline = [];

	var currentCycle = 0;
	var correctAttempts = 0;
	var currentNumber = '';
	var currentTrial = 0;

	//For practice
	var PracticeNumber = 0;
	var practiceCorrect = 0;
	var tempAcc = 0;

// WELCOME
	// var general_instructions = { //  Experiment presentation
 // 	type: 'instructions',
 //    pages: ['<p>Welcome to our experiment</p>'+
	// '<p>During this experiment, you will have to complete a memory task.</p>' +
	// '<p>The first task is a working memory task and involves repeating numbers.</p>' +
	// '<p> Click "Next" to continue.</p>'],
	// show_clickable_nav: true, // show the button "Next"
	// button_label_next: 'Next' // label this button as 'Next'
	// };
	// Put all the audios and images under the same variable.
	var audio = ["media/digit_audio/730.wav",
		"media/digit_audio/129.wav",
		"media/digit_audio/914.wav",
	   "media/digit_audio/496.wav",
	   "media/digit_audio/835.wav",
		 "media/digit_audio/2913.wav",
		 "media/digit_audio/0478.wav",
		 "media/digit_audio/52017.wav",
		 "media/digit_audio/34698.wav",
		 "media/digit_audio/541082.wav",
		 "media/digit_audio/719405.wav",
		 "media/digit_audio/3895106.wav",
		 "media/digit_audio/2681573.wav",
		 "media/digit_audio/53287690.wav",
		 "media/digit_audio/80315947.wav",
		 "media/digit_audio/472310658.wav",
		 "media/digit_audio/536917402.wav",
		 "media/digit_audio/6315720984.wav",
		 "media/digit_audio/2413679805.wav"
		 ];

	var preload = {
		type: jsPsychPreload,
		audio: audio
	}
timeline.push(preload)

// DIGIT SPAN FORWARD
	var general_instructions = { // Instructions
 	type: jsPsychInstructions,
    pages: ['<p>You are going to hear a sequence of numbers.</p>'+
	'<p>Listen carefully, they will be said only once. </p>' +
	'<p>When you are invited to do so, please type the numbers you have just heard using the numeric keyboard only (e.g:123).</p>' +
	'<p>Type them in the exact same order that they have been said.</p>' +
	'<p>Click "Next" to start.</p>' ],
	show_clickable_nav: true,
	button_label_next: 'Next'
	};

	timeline.push(general_instructions);

	var practice_instructions = { // Instructions of Practice
 	type: jsPsychInstructions,
    pages: ['<p>We will first provide some practice.</p>'+
	'<p>Remember to type them in the exact same order that they have been said.</p>' +
	'<p>Click "Next" to begin the practice.</p>' ],
	show_clickable_nav: true,
	button_label_next: 'Next'
	};

	timeline.push(practice_instructions);

	var practice1 = {
		type: jsPsychAudioKeyboardResponse,  // plugin that reads audio files
 		stimulus: "media/digit_audio/730.wav", // says that the stimulus corresponds to the 'stimulus' of the'timeline_variable below, it's 'DSF_audio_stimuli'
 		choices: "NO_KEYS", // No keys are allowed to answer this question
 		trial_ends_after_audio: true,
 		on_finish: function(){
			var stimulus = jsPsych.data.get().last(1).values()[0]['stimulus'];
			PracticeNumber = stimulus.substr(18, stimulus.length-22);
		},
	};

	timeline.push(practice1);

	var practiceResponse1 = { // variable for participant's answer
	   type: jsPsychSurveyText,
	   questions: [
	     {prompt: '<p>Type the numbers you just heard.</p>'+
		   '<p>Click on "Next" when you are done. </p>?'},
	     ],
	   button_label: "Next",
	   on_finish: function(){
	   		var data = jsPsych.data.get().last(1).values()[0];
	   		var response = data['response']['Q0'];
	   		if (PracticeNumber == response){
	   			practiceCorrect = practiceCorrect + 1;
	   			tempAcc = true;
	   		}
	   }
 	};

 	timeline.push(practiceResponse1);

 	var PracticeFeedback1 = {
                type: jsPsychHtmlButtonResponse,
                stimulus: function(){
                    if (tempAcc){
                        return '<p><span style="font-size: 36px; color: rgb(65, 168, 95);">Correct!</span></p>';
                    }
                    return '<p><span style="font-size: 36px; color: rgb(209, 72, 65);">Incorrect</span></p>';
                },
                choices: ['Continue']
            }
    timeline.push(PracticeFeedback1);

 	var practice2 = {
		type: jsPsychAudioKeyboardResponse,  // plugin that reads audio files
 		stimulus: "media/digit_audio/129.wav", // says that the stimulus corresponds to the 'stimulus' of the'timeline_variable below, it's 'DSF_audio_stimuli'
 		choices: "NO-KEYS", // No keys are allowed to answer this question
 		trial_ends_after_audio: true,
 		on_finish: function(){
			var stimulus = jsPsych.data.get().last(1).values()[0]['stimulus'];
			PracticeNumber = stimulus.substr(18, stimulus.length-22);
			tempAcc = false;
		},
	};

	timeline.push(practice2);

	var practiceResponse2 = { // variable for participant's answer
	   type: jsPsychSurveyText,
	   questions: [
	     {prompt: '<p>Type the numbers you just heard.</p>'+
		   '<p>Click on "Next" when you are done. </p>?'},
	     ],
	   button_label: "Next",
	   on_finish: function(){
	   		var data = jsPsych.data.get().last(1).values()[0];
	   		var response = data['response']['Q0'];
	   		if (PracticeNumber == response){
	   			practiceCorrect = practiceCorrect + 1;
	   			tempAcc = true;
	   		}
	   }
 	};

 	timeline.push(practiceResponse2);

 	var PracticeFeedback2 = {
                type: jsPsychHtmlButtonResponse,
                stimulus: function(){
                    if (tempAcc){
                        return '<p><span style="font-size: 36px; color: rgb(65, 168, 95);">Correct!</span></p>';
                    }
                    return '<p><span style="font-size: 36px; color: rgb(209, 72, 65);">Incorrect</span></p>';
                },
                choices: ['Continue']
            }

  timeline.push(PracticeFeedback2);

 	var practice3 = {
		type: jsPsychAudioKeyboardResponse,  // plugin that reads audio files
 		stimulus: "media/digit_audio/914.wav", // says that the stimulus corresponds to the 'stimulus' of the'timeline_variable below, it's 'DSF_audio_stimuli'
 		choices: "NO_KEYS", // No keys are allowed to answer this question
 		trial_ends_after_audio: true,
 		on_finish: function(){
			var stimulus = jsPsych.data.get().last(1).values()[0]['stimulus'];
			PracticeNumber = stimulus.substr(18, stimulus.length-22);
			tempAcc = false;
		},
	};

	var practiceResponse3 = { // variable for participant's answer
	   type: jsPsychSurveyText,
	   questions: [
	     {prompt: '<p>Type the numbers you just heard.</p>'+
		   '<p>Click on "Next" when you are done. </p>?'},
	     ],
	   button_label: "Next",
	   on_finish: function(){
	   		var data = jsPsych.data.get().last(1).values()[0];
	   		var response = data['response']['Q0'];
	   		if (PracticeNumber == response){
	   			practiceCorrect = practiceCorrect + 1;
	   			tempAcc = true;
	   		}
	   }
 	};

 	var PracticeFeedback3 = {
                type: jsPsychHtmlButtonResponse,
                stimulus: function(){
                    if (tempAcc){
                        return '<p><span style="font-size: 36px; color: rgb(65, 168, 95);">Correct!</span></p>';
                    }
                    return '<p><span style="font-size: 36px; color: rgb(209, 72, 65);">Not quite, try again</span></p>';
                },
                choices: ['Continue']
            }

 	var trial3 = {
 		timeline: [practice3, practiceResponse3, PracticeFeedback3],
 		randomize_order: false,
 		conditional_function: function(){
 			if (practiceCorrect == 2){
 				return false
 			}
			return true
 		},
 		loop_function: function(){
 			if (practiceCorrect >= 2){
 				return false
 			}
 			return true
 		}
 	}

 	timeline.push(trial3);

	var instructions_DSF = { // Instructions of the Digit Span Forward
 	type: jsPsychInstructions,
    pages: ['<p>The practice is now complete, good job!</p>'+
	'<p>You will now no longer receive feedback </p>' +
	'<p>We will begin with three numbers. You will get two tries for each sequence length.</p>' +
	'<p>The sequence length will increase by one whenever you get at least one of the two sequences of equal length correct.</p>' +
	'<p>Click "Next" to begin.</p>' ],
	show_clickable_nav: true,
	button_label_next: 'Next'
	};

 	timeline.push(instructions_DSF);

		//these items are a random strings of numbers, increasing by one number every two items.
	// var DSF_audio_stimuli = [  // audio recording of each items, read at a peace of 1 number per second
	// 	// if willing to use different items, upload you audio files in your task folder and change the files below with the names your own files.
 //     { stimulus: "audio/496.wav"},
 //     { stimulus: "audio/835.wav"},
	//  { stimulus: "audio/2913.wav"},
	//  { stimulus: "audio/0478.wav"},
	//  { stimulus: "audio/52017.wav"},
	//  { stimulus: "audio/34698.wav"},
	//  { stimulus: "audio/541082.wav"},
	//  { stimulus: "audio/719405.wav"},
	//  { stimulus: "audio/3895106.wav"},
	//  { stimulus: "audio/2681573.wav"},
	//  { stimulus: "audio/53287690.wav"},
	//  { stimulus: "audio/80315947.wav"},
	//  { stimulus: "audio/472310658.wav"},
	//  { stimulus: "audio/536917402.wav"},
	//  { stimulus: "audio/6315720984.wav"},
	//  { stimulus: "audio/2413679805.wav"}
	//  ];
	 var DSF_audio_stimuli = [
		 "media/digit_audio/496.wav",
	   "media/digit_audio/835.wav",
		 "media/digit_audio/2913.wav",
		 "media/digit_audio/0478.wav",
		 "media/digit_audio/52017.wav",
		 "media/digit_audio/34698.wav",
		 "media/digit_audio/541082.wav",
		 "media/digit_audio/719405.wav",
		 "media/digit_audio/3895106.wav",
		 "media/digit_audio/2681573.wav",
		 "media/digit_audio/53287690.wav",
		 "media/digit_audio/80315947.wav",
		 "media/digit_audio/472310658.wav",
		 "media/digit_audio/536917402.wav",
		 "media/digit_audio/6315720984.wav",
		 "media/digit_audio/2413679805.wav"
	 ];
 	for (var i = 0; i < 16; i++) {
	 	var DSF_audio_display = { // variable that will read the DSF audio
		 	type: jsPsychAudioKeyboardResponse,  // plugin that reads audio files
		 	stimulus: function(){return DSF_audio_stimuli[currentTrial]}, // says that the stimulus corresponds to the 'stimulus' of the'timeline_variable below, it's 'DSF_audio_stimuli'
		 	choices: "NO_KEYS", // No keys are allowed to answer this question
		 	trial_ends_after_audio: true, // because it ends ones the audio file is over
		 	on_finish: function(){
					var stimulus = jsPsych.data.get().last(1).values()[0]['stimulus'];
					currentNumber = stimulus.substr(18, stimulus.length-22);
					currentCycle = currentCycle + 1;
					currentTrial = currentTrial + 1;
				},
	 	};

		 var DSF_type_answer = { // variable for participant's answer
		   type: jsPsychSurveyText,
		   questions: [
		     {prompt: '<p>Type the numbers you just heard.</p>'+
			   '<p>Click on "Next" when you are done. </p>?'},
		     ],
		   button_label: "Next",
	 	};

		 var DSF_trials = { // create the DSF a trial
	 		 timeline :  [DSF_audio_display, DSF_type_answer], // a DSF trial is an audio_display and then the participant type_answer
		 	conditional_function: function(){
		 		var data = jsPsych.data.get().last(1).values()[0];
		 		if (data['trial_type'] == 'instructions'){
		 			return true
		 		};
		 		var response = data['response']['Q0'];
		 		if (response == currentNumber){
		 			correctAttempts = correctAttempts + 1;
		 		};
		 		// console.log(currentCycle);
		 		// console.log(correctAttempts);
		 		if (currentCycle >= 2){
		 			currentCycle = 0;
		 			if (correctAttempts == 0){
		 				currentCycle = 2;
		 				// console.log("fail here")
		 				return false;
		 			}
		 			else{correctAttempts=0};
		 		};
		 	return true;
		 	},
		 };
		 timeline.push(DSF_trials);
	}

// DIGIT SPAN BACKWARD
	 // follow the extact same code as below, except the instruction pages and stimuli are replaced by those of the DSB
	 var instructions_DSB = {
 		 type: jsPsychInstructions,
    	 pages: ['<p>You are going to hear more numbers but now you have to type them backwards.</p>'+
	'<p>For instance, if you hear "one, seven", you should type "71".  </p>' +
	'<p>Click "Next" to start.</p>' ],
		 show_clickable_nav: true,
		 button_label_next: 'Next'
	 };


// END OF THE EXPERIMENT
	var thanks = {
	 	type: jsPsychInstructions,
	    pages: ['<p>You have completed this portion of the experiment.</p>'+
		'<p>Please click on "End" to proceed to the next task.</p>'],
		show_clickable_nav: true,
		button_label_next: 'End'
	};

	timeline.push(thanks);



jsPsych.run(timeline);

//JATOS code
// let completeTimelineProcedure = {
//       timeline: timeline,
//     //   preload_audio: audio, // better to load all external files before the experiment starts
// 	  	// preload_images: images,
//       data: {
//         urlparameters_and_consent: function() {
//           return jatos.studySessionData;
//         },
//         prolific_id: function() {
//           return jatos.studySessionData.PROLIFIC_PID
//         },
//         prolific_study_id: function() {
//           return jatos.studySessionData.STUDY_ID
//         },
//         prolific_session_id: function() {
//           return jatos.studySessionData.SESSION_ID
//         },
//       },

//     }
//     completeTimeline = [completeTimelineProcedure]

// /* start the experiment */
//       jsPsych.init( {
//         timeline: completeTimeline,
//         on_finish: function() {
//           var resultJson = jsPsych.data.get().json();
//           jatos.submitResultData(resultJson,jatos.startNextComponent);
//         },
//       });
//     });


})

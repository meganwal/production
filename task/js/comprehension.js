/*

    This is the JavaScript for experiment.
    This is loaded by the HTML page for that, 'experiment.html'.

    If you desire, you can split this code into multiple files for different parts of the experiment.
    You will need to have a single HTML page loading a single JS file, and this page will correspond to one 'Component' in JATOS.
    The HTML page that loads this file is titled 'experiment.html'.

    We usually use the jsPsych JavaScript library to code our experiments.

    IMPORTANT NOTE: This template is currently written for an older version of jsPsych, Version 6.3. Updates for the latest version will come soon.
    Documentation for jsPsych 6.3 can be found here: https://www.jspsych.org/6.3/
    Please navigate to this page and scroll down to "Assets" to download the .zip for this version: https://github.com/jspsych/jsPsych/releases/tag/v6.3.1

    We recommend perusing through the following pages to fully understand jsPsych:
      https://www.jspsych.org/6.3/overview/timeline/
      https://www.jspsych.org/6.3/tutorials/hello-world/
      https://www.jspsych.org/6.3/tutorials/rt-task/

    The sample code here is adopted from 'Demo Experiment: Simple Reaction Time Task' found in the final URL above.

    If you ever need more help on JavaScript syntax, we recommend the following resource for reference: https://javascript.info/js

    We use JATOS to host our experiments on our online experiment server.
    While you will not frequently need to mess with JATOS code, it may be useful to perform counterbalancing and other experiment-wide specifications in JATOS.
    Documentation for various JATOS commands can be found here: www.jatos.org/jatos.js-Reference.html

    INSTRUCTIONS FOR MODIFICATION:

    Please read through this entire file and then code your experiment.
    For any plugins you use in your experiment, remember to load them in 'experiment.html' and add them to 'js > plugins'.

*/



//jatos.onLoad(function() {
  // BATCH SESSION VARIABLE (COUNTER-BALANCING AND VERSIONS/CONDITIONS)

  // Batch Session data in JATOS allows you to store and change an object accessible to all runs of the study by different participants in the same 'Batch'.
  // See 'Instructions for Running an Online Experiment: Creating a new batch in JATOS' for more information on Batches in JATOS.
  // For more info on Batch Session data, see www.jatos.org/jatos.js-Reference.html#functions-to-access-the-batch-session

  // In this template, we will implement a method of using the Batch Session data to set the experiment version a participant sees.
  // The version from the previous participant is retrieved from the Batch Session data and incremented by one for the present participant.
  // Once the present participant finishes the experiment, the Batch Session data is updated with this latest version number (see 'debriefing.js').
  // By performing this action at the end of the experiment, the version number is not increased if the participant leaves early.

  // For this example, we rotate between 8 versions.

  // Retrieve all data from the Batch Session. This is in the form of an object with various key-value pairs.
  //let batchSession = jatos.batchSession.getAll();

  // If the Batch Session doesn't already have a version, create it and set to 1.
  // If the version is currently 8, it should also be reset to 1.
  // Otherwise, increase the version by 1.
  // Note: Changing batchSession here does not change the Batch Session in JATOS. That will be done at the end of the experiment (see 'debriefing.js').
  //if (batchSession.version == undefined || batchSession.version == 8) {
  //  batchSession.version = 1;
  //} else {
  //  batchSession.version++;
  //}

  // Store this study's version number using the version from the Batch Session. This variable can then be used in this experiment to select the appropriate stimuli.
  //thisVersion = batchSession.version;

  // The Study Session (jatos.studySessionData) is an object, similar to the Batch Session, and it is accessible between different Components accessed by the same participant.
  // We will add the version to the Study Session so that it can be retrieved in another Component.
  // To retrieve this in another Component, include the following line at the beginning of that Component (after loading JATOS): thisVersion =  jatos.studySessionData.thisVersion;
  //jatos.studySessionData.thisVersion = thisVersion;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  var jsPsych = initJsPsych({
    // This can be adjusted to define the tasks to perform when this Component is over.
    on_finish: function() {

      // Crucially, you need to send the data in JATOS. These functions take the list of data objects (one object per trial) and sends it as a JSON string to JATOS.
      // You can then parse this JSON later using Python. See 'Instructions for Running an Online Experiment: Retrieving Data' for more instructions.
      // This placement of this function here means that the data is submitted only once, at the end of this Component.
      // You must, at minimum, submit data at the end of every Component.
      // You could choose to record data more frequently- but remember, if a participant leaves early, their data is no longer able to be used.
      // For more reference on submitting data to JATOS, see here: www.jatos.org/jatos.js-Reference.html#result-data-and-result-uploaddownload-files
      let resultJson = jsPsych.data.get().json();
      jatos.submitResultData(resultJson);

      // You should then define when occurs after the experiment is over.
      // 'jatos.startNextComponent()' will send participants to the next Component sequentially on JATOS (e.g. the Debriefing).
      // You can also send participants to a specific Component. See here for more documentation: https://www.jatos.org/jatos.js-Reference.html#functions-to-control-study-flow
      jatos.startNextComponent();
    },
  });

  // PRELOAD AND WELCOME TRIAL

//preload images
  var preload = {
    type: jsPsychPreload,
    images: ['img/bird1.png', 'img/bird2.png', 'img/bird3.png', 'img/bird4.png',
     'img/bird5.png', 'img/bird6.png', 'img/bird7.png', 'img/bird8.png',
     'img/bird9.png'],
     audio: ["audio/ThisTust.flac", "audio/ClickTust.flac",
      "audio/ThisFroom.flac", "audio/ClickFroom.flac", "audio/ThisDarg.flac",
      "audio/ClickDarg.flac", "audio/ThisWilp.flac", "audio/ClickWilp.flac",
      "audio/ThisReng.flac", "audio/ClickReng.flac", "audio/ThisBosa.flac",
     "audio/ClickBosa.flac", "audio/ThisKel.flac", "audio/ClickKel.flac",
     "audio/ThisLav.flac", "audio/ClickLav.flac", "audio/ThisNoz.flac",
     "audio/ClickNoz.flac"]
  };

var semantic_image_list = ["img/bird1.png", "img/bird2.png", "img/bird3.png",
"img/bird4.png", "img/bird5.png", "img/bird6.png", "img/bird7.png",
"img/bird8.png", "img/bird9.png"]

var semantic_word_list = ["Kel", "Lav","Froom","Tust","Bosa","Darg","Noz","Reng", "Wilp"]

var order = 1 // replace with JATOS batch variable

//intro screen
  var welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Welcome to the experiment. Press any key to begin.",
    data: {
      order: order,
      semantic_image_list: semantic_image_list,
      semantic_word_list: semantic_word_list,
      // comp lists and phon lists
    }
  };

//microphone permissions
 var initmicrophone = {
   type: jsPsychInitializeMicrophone
 }

var sem_index_list = [{index: 0, block: 'semantic'}, {index: 1, block: 'semantic'},{index:2, block: 'semantic'},{index:3, block: 'semantic'},{index:4, block: 'semantic'},{index:5, block: 'semantic'},
  {index:6, block: 'semantic'},{index:7, block: 'semantic'},{index:8, block: 'semantic'}]
var phon_index_list = [{index: 0, block: 'phonological'}, {index: 1, block: 'phonological'},{index:2, block: 'phonological'},{index:3, block: 'phonological'},{index:4, block: 'phonological'},{index:5, block: 'phonological'},
  {index:6, block: 'phonological'},{index:7, block: 'phonological'},{index:8, block: 'phonological'}]
var none_index_list = [{index: 0, block: 'none'}, {index: 1, block: 'none'},{index:2, block: 'none'},{index:3, block: 'none'},{index:4, block: 'none'},{index:5, block: 'none'},
  {index:6, block: 'none'},{index:7, block: 'none'},{index:8, block: 'none'}]

//introduction trial -- need to get image size/button location adjusted
  var introduction = {
    type: jsPsychAudioButtonResponse,
    stimulus: function(){
      if (jsPsych.timelineVariable('block') == "semantic") {
        word = semantic_word_list[jsPsych.timelineVariable('index')];
      }
      if (jsPsych.timelineVariable('block') == "phonological") {
        word = phological_word_list[jsPsych.timelineVariable('index')];
      }
      if (jsPsych.timelineVariable('block') == "none") {
        word = none_word_list[jsPsych.timelineVariable('index')];
      }
      return "audio/This" + word + ".flac"
    },
    prompt: function() {
      if (jsPsych.timelineVariable('block') == "semantic") {
        image_list = semantic_image_list;
      }
      if (jsPsych.timelineVariable('block') == "phonological") {
        image_list = phonological_image_list;
      }
      if (jsPsych.timelineVariable('block') == "none") {
        image_list = none_image_list;
      }
      var target_image = image_list[jsPsych.timelineVariable('index')]
      var html_target_image = "<img class = 'img' src = '" + target_image + "'>";
      return html_target_image
    },
    choices: ["Continue"],
    button_html: `
      <button class = "jspsych-btn study_btn">%choice%</button>
    `,
    response_allowed_while_playing: false,
    data: {
        task: 'introduction',
        block: jsPsych.timelineVariable('block'),
        target_image: function() {
          if (jsPsych.timelineVariable('block') == "semantic") {
              image_list = semantic_image_list;
          }
          if (jsPsych.timelineVariable('block') == "phonological") {
            image_list = phonological_image_list;
          }
          if (jsPsych.timelineVariable('block') == "none") {
            image_list = none_image_list;
          }
          var target_image = image_list[jsPsych.timelineVariable('index')];
        },
        audio_stimulus: function(){
          if (jsPsych.timelineVariable('block') == "semantic") {
            word = semantic_word_list[jsPsych.timelineVariable('index')];
          }
          if (jsPsych.timelineVariable('block') == "phonological") {
            word = phological_word_list[jsPsych.timelineVariable('index')];
          }
          if (jsPsych.timelineVariable('block') == "none") {
            word = none_word_list[jsPsych.timelineVariable('index')];
          }
          return "audio/This" + word + ".flac"
        },
    },
  };

// fixation cross
  var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 1000,
  };

  // comprehension training
  var comprehension_training = {
    type: jsPsychAudioImageButtonResponse,
    stimulus: function(){
      if (jsPsych.timelineVariable('block') == "semantic") {
        word = semantic_word_list[jsPsych.timelineVariable('index')];
      }
      if (jsPsych.timelineVariable('block') == "phonological") {
        word = phological_word_list[jsPsych.timelineVariable('index')];
      }
      if (jsPsych.timelineVariable('block') == "none") {
        word = none_word_list[jsPsych.timelineVariable('index')];
      }
      return "audio/Click" + word + ".flac"
    },
    choices: "",
    button_html: function() {
      if (jsPsych.timelineVariable('block') == "semantic") {
        image_list = semantic_image_list;
        word_list = semantic_word_list;
      }
      if (jsPsych.timelineVariable('block') == "phonological") {
        image_list = phonological_image_list;
        word_list = phonological_word_list;
      }
      if (jsPsych.timelineVariable('block') == "none") {
        image_list = none_image_list;
        word_list = none_word_list;
      }
      var target_image = image_list[jsPsych.timelineVariable('index')];
      var html_target_image = "<img class = 'jspsych-audio-button-response-button unselected' id = 'target' src = '" + target_image + "'>";
      var html_image_list = [html_target_image];
      for (let i = 0; i < image_list.length; i++) {
        if (i != jsPsych.timelineVariable('index')) {
          var html_foil_image = "<img class = 'jspsych-audio-button-response-button unselected' id = 'foil' data-choice = {image: " + image_list[i] + ", word: " + word_list[i] + "} src = '" + image_list[i] + "'>";
          html_image_list.push(html_foil_image);
        }
      }
      shuffle(html_image_list);
      var html_images_string = html_image_list.join("");
      return "<div class = 'grid'>" + html_images_string + "</div>";
    },
    trial_duration: 80000,
    data: {
      task: 'training',
      block: jsPsych.timelineVariable('block'),
      target_image: function() {
        if (jsPsych.timelineVariable('block') == "semantic") {
            image_list = semantic_image_list;
        }
        if (jsPsych.timelineVariable('block') == "phonological") {
          image_list = phonological_image_list;
        }
        if (jsPsych.timelineVariable('block') == "none") {
          image_list = none_image_list;
        }
        var target_image = image_list[jsPsych.timelineVariable('index')];
      },
      audio_stimulus: function() {
        if (jsPsych.timelineVariable('block') == "semantic") {
          word = semantic_word_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "phonological") {
          word = phological_word_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "none") {
          word = none_word_list[jsPsych.timelineVariable('index')];
        }
        return "audio/Click" + word + ".flac"
      },
    },
  };

  // comprehension training
  var comprehension_test = {
    type: jsPsychAudioImageButtonResponse,
    stimulus: function(){
      if (jsPsych.timelineVariable('block') == "semantic") {
        word = semantic_word_list[jsPsych.timelineVariable('index')];
      }
      if (jsPsych.timelineVariable('block') == "phonological") {
        word = phological_word_list[jsPsych.timelineVariable('index')];
      }
      if (jsPsych.timelineVariable('block') == "none") {
        word = none_word_list[jsPsych.timelineVariable('index')];
      }
      return "audio/Click" + word + ".flac"
    },
    choices: "",
    button_html: function() {
      if (jsPsych.timelineVariable('block') == "semantic") {
        image_list = semantic_image_list;
        word_list = semantic_word_list;
      }
      if (jsPsych.timelineVariable('block') == "phonological") {
        image_list = phonological_image_list;
        word_list = phonological_word_list;
      }
      if (jsPsych.timelineVariable('block') == "none") {
        image_list = none_image_list;
        word_list = none_word_list;
      }
      var target_image = image_list[jsPsych.timelineVariable('index')];
      var html_target_image = "<img class = 'jspsych-audio-button-response-button unselected' id = 'target' src = '" + target_image + "'>";
      var html_image_list = [html_target_image];
      for (let i = 0; i < image_list.length; i++) {
        if (i != jsPsych.timelineVariable('index')) {
          var html_foil_image = "<img class = 'jspsych-audio-button-response-button unselected' id = 'foil' data-choice = {image: " + image_list[i] + ", word: " + word_list[i] + "} src = '" + image_list[i] + "'>";
          html_image_list.push(html_foil_image);
        }
      }
      shuffle(html_image_list);
      var html_images_string = html_image_list.join("");
      return "<div class = 'grid'>" + html_images_string + "</div>";
    },
    trial_duration: 80000,
    data: {
      task: 'test',
      block: jsPsych.timelineVariable('block'),
      target_image: function() {
        if (jsPsych.timelineVariable('block') == "semantic") {
            image_list = semantic_image_list;
        }
        if (jsPsych.timelineVariable('block') == "phonological") {
          image_list = phonological_image_list;
        }
        if (jsPsych.timelineVariable('block') == "none") {
          image_list = none_image_list;
        }
        var target_image = image_list[jsPsych.timelineVariable('index')];
      },
      audio_stimulus: function() {
        if (jsPsych.timelineVariable('block') == "semantic") {
          word = semantic_word_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "phonological") {
          word = phological_word_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "none") {
          word = none_word_list[jsPsych.timelineVariable('index')];
        }
        return "audio/Click" + word + ".flac"
      },
    },
  };

  //introduction trials (one on screen)
    var introduction_trials = {
      timeline: [introduction, fixation],
      timeline_variables: sem_index_list,
      randomize_order: true,
    };

  //training trials (9 on screen)
   var comprehension_training_trials = {
         timeline: [comprehension_training, fixation],
         timeline_variables: sem_index_list,
         randomize_order: true,
       };

  //comprehension training
   var comprehension_test_trials = {
     timeline: [comprehension_test, fixation],
     timeline_variables: sem_index_list,
     randomize_order: true,
   };


  // CREATING TIMELINE

  // Putting together the timeline can be done in multiple ways. This example is just one way to do it.

  // First, define the order of trials. The 'test_procedure' is nested within this larger timeline.
  let timelineBare = [preload, comprehension_training_trials];

  // This object allows you to add on any data to every single trial's data object.
  // You can use this as desired, such as using "on_finish" to perform a task after every trial.
  let completeTimeline = {
    timeline: timelineBare,
    data: {
      //version: thisVersion,

      // This labels every trial as part of the "Experiment" Component. This is useful when parsing your raw data.
      // For example, you can use this label to categorize your data and create separate CSVs for different Components.
      // You will probably want to change this for each component.

      // We recommend you keep this addition to each trial.
      // jatos.studySessionData was described above in the counterbalancing section. This data is accessible to every Component in a single participant's run of the study.
      // In the 'consent.html' template, Study Session data was created.
      // It is an object with: the URL parameters pulled from Prolific or Sona (e.g. a participant's Prolific or Sona ID), an automatically-assigned JATOS ID, and the data and time of consent.
      //urlparameters_and_date: jatos.studySessionData,
    },
  }

  // Finally, place the above object in the timeline that you will define when you initialize jsPsych below.
  let timeline = [completeTimeline];


jatos.onLoad(() => {
  jsPsych.run(timeline);
});

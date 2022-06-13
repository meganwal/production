
jatos.onLoad(function() {

  // INITIALIZE JSPSYCH
  let jsPsych = initJsPsych({
    on_finish: function() {
      let resultJson = jsPsych.data.get().json();
      jatos.submitResultData(resultJson);
      component_ending = true
      jatos.startNextComponent();
    },
    on_close: function() {
        // Only execute if the Component is not being ended by JATOS (but instead, by manual close by the participant).
        if (typeof component_ending === "undefined") {
            // Retrieve all data from the Batch Session.
            let batchSession = jatos.batchSession.getAll();
            // Retrieve the list of versions you manually entered as per 'Instructions for Running an Online Experiment: Rotating participant versions'
            let versionsList = batchSession.versionsList;
            // Get present version
            version =  jatos.studySessionData.version;
            // As long as the version list exists, add the present version back into the list.
            if (versionsList) {
                versionsList.push(version)
                jatos.batchSession.set("versionsList", versionsList)
            }
        }
    },
});
// Retrieve all data from the Batch Session. This is in the form of an object with various key-value pairs.
let batchSession = jatos.batchSession.getAll();

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// CALL SUBJECTS IMAGE/WORD LISTS
let all_image_list = jatos.studySessionData.all_image_list
let all_word_list = jatos.studySessionData.all_word_list

// retrieve contition
let condition = jatos.studySessionData.version

var all_image_list = [sem_image_list, unrel_image_list, phon_image_list]
var all_word_list = [sem_word_list, unrel_word_list, phon_word_list]

// Final Test - testing each target once, pulling 3 stimuli from each block type
var trial_structure = function(){
  var all_stims = []
  var targets = [
    {type_num: 0, type: "sem", indicies: _.range(9)},
    {type_num: 1, type: "unrel", indicies: _.range(9)},
    {type_num: 2, type: "phon", indicies: _.range(9)}]

  var original_foils = _.cloneDeep(targets)
  var foils = _.cloneDeep(original_foils)

  _.map(targets, function(o){o['indicies'] = _.shuffle(o['indicies'])})
  _.map(foils, function(o){o['indicies'] = _.shuffle(o['indicies'])})

  var types = ["sem", "unrel", "phon"]

  var this_type_array;
  var this_target;
  var this_foils = [];
  var tmp_foils;
  var target_idx;
  var target_image;
  var target_word;

  for (var i = 0; i < 9; i++) {
    for(const this_type of types) {

      this_type_array =  _.find(targets, ['type', this_type])
      this_target = this_type_array['indicies'].splice(0,1)
      this_type_num = this_type_array['type_num']

      target_image = all_image_list[this_type_num][this_target]
      target_word = all_word_list[this_type_num][this_target]

      this_foils = [];

      var image_list = [];
      image_list.push(target_image)


      for(const this_foil_type of types) {

        if(this_foil_type == this_type) {
          tmp_foils = _.find(foils, ['type', this_foil_type])
          tmp_foil_images = tmp_foils['indicies']

          target_idx = tmp_foil_images.findIndex((element) => element == this_target)

          if(target_idx == 0) {
            to_push = tmp_foil_images.splice(1,2)
            for (this_item of to_push) {
              this_foils.push(all_image_list[this_type_num][this_item])
            }

          } else if(target_idx == 1) {
            this_foils.push(all_image_list[this_type_num][tmp_foil_images.splice(0,1)])
            this_foils.push(all_image_list[this_type_num][tmp_foil_images.splice(1,1)])

          } else {
            to_push = tmp_foil_images.splice(0,2)
            for (this_item of to_push) {
              this_foils.push(all_image_list[this_type_num][this_item])
            }

          }
        } else {
          tmp_foils = _.find(foils, ['type', this_foil_type])
          tmp_foil_images = tmp_foils['indicies']
          var other_type_num = tmp_foils['type_num']
          to_push = tmp_foil_images.splice(0,3)
          for (this_item of to_push) {
            this_foils.push(all_image_list[other_type_num][this_item])
          }
        }
      }
      image_list.push(this_foils)

      image_list = _.flatten(image_list)
      image_list = _.shuffle(image_list)

      target_foil_index = image_list.findIndex((element) => element == target_image)

      all_stims.push({"index": target_foil_index, "images":image_list, "sound": target_word, "type": this_type})
    }
    foils = _.cloneDeep(original_foils)
  }

  return all_stims
}

var final_block_stims = trial_structure()

// BUILD EXPERIMENTAL TRIALS

// Fixation cross
let fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div class = "fixation">+</div>',
  choices: "NO_KEYS",
  trial_duration: 1000,
};

let final_test = {
  type: jsPsychAudioImageButtonResponseNoFeedback,
  stimulus: function() {
    var word = jsPsych.timelineVariable("sound");
    return "media/audio/Click" + word + ".flac";
    },
  choices: "",
  button_html: function() {
    let image_list = jsPsych.timelineVariable('images')

    // Add target image to grid of nine images
    let html_target_image = "<img class = 'jspsych-audio-button-response-button unselected' style = 'cursor: pointer;' id = 'target' data-choice = '{image: " + image_list[jsPsych.timelineVariable('index')] + "}' src = '" + image_list[jsPsych.timelineVariable('index')] + "'>";
    let html_image_list = [html_target_image];

    // Add each of the eight foil images to grid of nine images
    for (let i = 0; i < image_list.length; i++) {
      if (i != jsPsych.timelineVariable('index')) {
        let html_foil_image = "<img class = 'jspsych-audio-button-response-button unselected' style = 'cursor: pointer;' id = 'foil' data-choice = '{image: " + image_list[i] + "}' src = '" + image_list[i] + "'>";
        html_image_list.push(html_foil_image);
      }
    }

    shuffle(html_image_list);

    // Create HTML for grid
    let html_images_string = html_image_list.join("");
    return "<div class = 'grid'>" + html_images_string + "</div>";
  },
  trial_duration: null, // ADD TRIAL DURATION??
  response_allowed_while_playing: false,
  data: {
    task: 'final',
    block: jsPsych.timelineVariable('type'),
    image: jsPsych.timelineVariable('image_list')[jsPsych.timelineVariable('index')],
    word: jsPsych.timelineVariable('sound'),
  },
};

  // Final block
let final_test_trials = {
  timeline: [fixation, final_test],
  timeline_variables: final_block_stims,
  randomize_order: false,
  }

let preload = {
  type: jsPsychPreload,
  images: function() {
    images = _.flatten(all_image_list);
    return images;
  },
  audio: function() {
    var words = _.flatten(all_word_list)
    let audio_list = [];
    for (let i = 0; i < all_word_list.length; i++) {
      audio_list.push("media/audio/Click" + words[i] + ".flac")
    }
    return audio_list;
  },
};

let final_trial_directions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
            <div class = "instructions_text">
              <p>Now all three of the sets you practiced will be combined.</p>
              <p>You will see a grid of nine pictures and will be told to <b> click on </b> one of the images.</p>
              <p>Press "Continue" to proceed.</p>
            </div>
            `,
  choices: ['Continue'],
}

let final_break = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
            <div class = "instructions_text">
              <p>You may now take a break.</p>
              <p>This page will progress automatically in 3 minutes.</p>
            </div>
            `,
  choices: ['Continue'],
  trial_duration: 180000,
  response_ends_trial: false,
}

let timelineBare = [final_break, final_trial_directions, preload, final_test_trials]


  let completeTimeline = {
      timeline: timelineBare,
      data: {
          version: version,

          // This key-value pair labels every trial as part of the Component "experiment". This is useful when parsing your raw data.
          // For example, you can use this label to categorize your data and create separate CSVs for different Components.
          // You will most likely want to change this for each component.
          component: 'final',

          // We recommend you keep this addition to each trial.
          // jatos.studySessionData was described above in the counterbalancing section. This data is accessible to every Component in a single participant's run of the study.
          // In the 'consent.html' template, Study Session data was created. It is an object with:
          //      The URL parameters pulled from Prolific or Sona (e.g. a participant's Prolific or Sona ID), an automatically-assigned JATOS ID, the data/time of consent, and version assigned above.
          urlparameters_and_date: jatos.studySessionData,
      },
  }
  let timeline = [completeTimeline];
  jsPsych.run(timeline);

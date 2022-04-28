// INITIALIZE JSPSYCH

let jsPsych = initJsPsych({
  on_finish: function() {
    let resultJson = jsPsych.data.get().json();
    jatos.submitResultData(resultJson);
    jatos.startNextComponent();
  },
});

// CODE TO GENERATE SEMANTIC, PHONOLOGICAL, AND UNRELATED IMAGE/WORD LISTS
var sem_image_1 = ["media/images/bird1.png", "media/images/bird2.png",
"media/images/bird3.png", "media/images/bird4.png", "media/images/bird5.png",
"media/images/bird6.png", "media/images/bird7.png", "media/images/bird8.png",
"media/images/bird9.png"]
var sem_image_2 = ["media/images/flower1.png", "media/images/flower2.png",
"media/images/flower3.png", "media/images/flower4.png",
"media/images/flower5.png", "media/images/flower6.png",
"media/images/flower7.png", "media/images/flower8.png",
"media/images/flower9.png"]
var sem_image_3 = ["media/images/fruit1.png", "media/images/fruit2.png",
"media/images/fruit3.png", "media/images/fruit4.png",
"media/images/fruit5.png", "media/images/fruit6.png",
"media/images/fruit7.png", "media/images/fruit8.png",
"media/images/fruit9.png"]
var no_conflict_image_1 = ["media/images/group1_1.png", "media/images/group1_2.png",
"media/images/group1_3.png", "media/images/group1_4.png",
"media/images/group1_5.png", "media/images/group1_6.png",
"media/images/group1_7.png", "media/images/group1_8.png",
"media/images/group1_9.png"]
var no_conflict_image_2 = ["media/images/group2_1.png", "media/images/group2_2.png",
"media/images/group2_3.png", "media/images/group2_4.png",
"media/images/group2_5.png", "media/images/group2_6.png",
"media/images/group2_7.png", "media/images/group2_8.png",
"media/images/group2_9.png"]

var possible_sem = [sem_image_1, sem_image_2, sem_image_3]
shuffle(possible_sem);

var possible_no_conflict_image = [no_conflict_image_1, no_conflict_image_2]
shuffle(possible_no_conflict_image);

let sem_image_list = possible_sem[0]
let phon_image_list = possible_no_conflict_image[0]
let unrel_image_list = possible_no_conflict_image[1]

var no_conflict_audio_1 = ["Lopi", "Hane","Nush","Jick","Bola","Darg","Raf",
"Veng", "Manit"]
shuffle(no_conflict_audio_1)
var no_conflict_audio_2 = ["Soodle", "Goke", "Pazz", "Fupp", "Wilp", "Cheem",
"Zev", "Kiben", "Tevo"]
shuffle(no_conflict_audio_2)
var possible_no_conflict_audio = [no_conflict_audio_1, no_conflict_audio_2]
shuffle(possible_no_conflict_audio)

let sem_word_list = possible_no_conflict_audio[0]
let unrel_word_list = possible_no_conflict_audio[1]

var phon_word_list = ["Ratu", "Ribe", "Biss", "Sar", "Riso", "Bast", "Seb",
"Tib", "Tasser"]
shuffle(phon_word_list)

// temporary order, replace with JATOS Batch Session variable
let condition = 3

let sem_index_list = [{ index: 0, block: 'semantic' },
{ index: 1, block: 'semantic' },{ index: 2, block: 'semantic' },
{ index: 3, block: 'semantic' }, { index: 4, block: 'semantic' },
{ index: 5, block: 'semantic' }, { index: 6, block: 'semantic' },
 { index: 7, block: 'semantic' }, { index: 8, block: 'semantic' }]
let phon_index_list = [{ index: 0, block: 'phonological' },
{ index: 1, block: 'phonological' }, { index: 2, block: 'phonological' },
{ index: 3, block: 'phonological' }, { index: 4, block: 'phonological' },
{ index: 5, block: 'phonological' }, { index: 6, block: 'phonological' },
{ index: 7, block: 'phonological' }, { index: 8, block: 'phonological' }]
let unrel_index_list = [{ index: 0, block: 'unrelated' },
{ index: 1, block: 'unrelated' }, { index: 2, block: 'unrelated' },
{ index: 3, block: 'unrelated' }, { index: 4, block: 'unrelated' },
{ index: 5, block: 'unrelated' }, { index: 6, block: 'unrelated' },
{ index: 7, block: 'unrelated' }, { index: 8, block: 'unrelated' }]


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
  stimulus: "media/audio/Click" + jsPsych.timelineVariable('sound') + ".flac",
  choices: "",
  button_html: function() {
    let image_list = jsPsych.timelineVariable('image_list')

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


  // Final Test - testing each target once, pulling 3 stimuli from each block type
  var trial_structure = function(){
    var all_stims = []
    var targets = [
      {type_num: 0, type: "sem", indicies: _.range(8)},
      {type_num: 1, type: "neither", indicies: _.range(8)},
      {type_num: 2, type: "phon", indicies: _.range(8)}]
    var all_image_list = [sem_image_list, unrel_image_list, phon_image_list]
    var all_word_list = [sem_word_list, unrel_word_list, phon_word_list]

    var original_foils = _.cloneDeep(targets)
    var foils = _.cloneDeep(original_foils)

    _.map(targets, function(o){o['indicies'] = _.shuffle(o['indicies'])})
    _.map(foils, function(o){o['indicies'] = _.shuffle(o['indicies'])})

    var types = ["sem", "unrel", "phon"]

    var this_type_array;
    var this_target;
    var this_foils = [];
    var tmp_foils;
    var tmp_foil_images;
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
              this_foils.push(all_image_list[this_type_num][tmp_foil_images.splice(1,2)])
            } else if(target_idx == 1) {
              this_foils.push(all_image_list[this_type_num][tmp_foil_images.splice(0,1)])
              this_foils.push(all_image_list[this_type_num][tmp_foil_images.splice(1,1)])
            } else {
              this_foils.push(all_image_list[this_type_num][tmp_foil_images.splice(0,2)])
            }
          } else {

            tmp_foils = _.find(foils, ['type', this_foil_type])

            this_foils.push(all_image_list[this_type_num][tmp_foil_images.splice(0,3)])
          }
        }

        image_list.push(_.flatten(this_foils))
        image_list = _.shuffle(image_list)

        target_foil_index = image_list.findIndex((element) => element == target_image)

        all_stims.push({"index": target_foil_index, "images":image_list, "sound": target_word, "type": this_type})
      }
      foils = _.cloneDeep(original_foils)
    }
    return all_stims
  }

  var final_block_stims = trial_structure()

  // Final block
let final_test_trials = {
  timeline: [fixation, final_test],
  timeline_variables: final_block_stims,
  randomize_order: false,
  }

let timeline = [final_test_trials]

jsPsych.run(timeline);

});

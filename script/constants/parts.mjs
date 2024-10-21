export const parts = [
	{
		sceneId: "0000",
		lengthNum: 2,
		story: {
			"1": {
				bgMusic: {
					name: 'Being_in_the_mood',
					command: 'START'
				},
				background: "backgrounds/testBG_1",
				charContainer: ['char-left', null, null],
				image: ['Kagano_sad', null, null],
				class: ["fadeLeft", null, null],
			  	name: "Kagano",
			  	text: "I start as sad.",
				choiceNext: false,
			},
			"2": {				
				bgMusic: {
					name: 'Being_in_the_mood',
					command: 'FADE_OUT',
					//insideOfScene: true
				},
				otherSoundEffect: "collect",
				background: "backgrounds/testBG_1",
				charContainer: ['char-left', null, 'char-right'],
				image: ['Kagano_sad', null, 'Tomoka_surprised'],
				class: [null, null, "fadeRight"],
			  	name: "Tomoka",
			  	text: "And I continue as surprised.",
				choiceNext: false,
			},
		},
	},
	{
		sceneId: "0001",
		lengthNum: 3,
		story: {
			"1": {
				background: "backgrounds/testBG_2",
				charContainer: ['char-left', null, null],
				image: ['Akane', null, null],
				class: ["fadeLeft", null, null],
			  	name: "Akane",
			  	text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lectus quam, bibendum at nibh ut, sagittis volutpat nunc. Nulla viverra tortor ac augue condimentum, non eleifend libero semper.",
				choiceNext: false,
			},
			"2": {
				otherSoundEffect: "splash",
				background: "backgrounds/testBG_2",
				charContainer: ['char-left', null, 'char-right'],
				image: ['Akane', null, 'Tomoka_normal'],
				class: [null, null, "fadeRight"],
			  	name: "Tomoka",
			  	text: "Vestibulum vehicula eros arcu. Duis auctor laoreet orci, eu volutpat leo varius in. Nulla in pharetra ex, nec congue odio.",
				choiceNext: false,
			},
			"3": {
				background: "backgrounds/testBG_2",
				charContainer: ['char-left','char-middle', 'char-right'],
				image: ['Akane', 'Rina', 'Tomoka_normal'],
				class: [null, "fadeUp", null],
			  	name: "Rina",
			  	text: "Praesent rutrum suscipit dolor nec dignissim. Aenean lacus arcu, sodales vel egestas at, ullamcorper eleifend nulla. Suspendisse mollis efficitur lorem eu eleifend.",
				choiceNext: false,
			},
		},
	},
	{
		sceneId: "0002",
		lengthNum: 3,
		story: {
			"1": {
				background: "backgrounds/testBG_1",
				charContainer: ['char-left', null, null],
				image: ['Kagano_normal', null, null],
				class: ["fadeLeft", null, null],
			  	name: "Kagano",
			  	text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lectus quam, bibendum at nibh ut, sagittis volutpat nunc. Nulla viverra tortor ac augue condimentum, non eleifend libero semper.",
				choiceNext: false,
			},
			"2": {
				background: "backgrounds/testBG_1",
				charContainer: ['char-left', null, 'char-right'],
				image: ['Kagano_normal', null, 'Saki_normal'],
				class: [null, null, "fadeRight"],
			  	name: "Saki",
			  	text: "Vestibulum vehicula eros arcu. Duis auctor laoreet orci, eu volutpat leo varius in. Nulla in pharetra ex, nec congue odio.",
				choiceNext: false,
			},
			"3": {
				background: "backgrounds/testBG_1",
				charContainer: ['char-left', null, 'char-right'],
				image: ['Kagano_smile', null,  'Saki_normal'],
				class: ["fadeLeft", null, 'fadeRightOut'],
			  	name: "Kagano",
			  	text: "Praesent rutrum suscipit dolor nec dignissim. Aenean lacus arcu, sodales vel egestas at, ullamcorper eleifend nulla. Suspendisse mollis efficitur lorem eu eleifend.",
				choiceNext: false,
			},
		},
	},
	{
		sceneId: "0003",
		lengthNum: 9,
		story: {
			"1": {
				bgMusic: {
					name: 'Determinations_for_Reina',
					command: 'START'
				},
				background: "backgrounds/testBG_2",
				charContainer: ['char-left', null, 'char-right'],
				image: ['Tomoka_normal', null, 'Kagano_normal'],
				class: ["fadeLeft", null, "fadeRight"],
			  	name: "Tomoka",
			  	text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lectus quam, bibendum at nibh ut, sagittis volutpat nunc. Nulla viverra tortor ac augue condimentum, non eleifend libero semper.",
				choiceNext: false,
			},
			"2": {
				background: "backgrounds/testBG_2",
				charContainer: ['char-left', null, 'char-right'],
				image: ['Tomoka_normal', null, 'Kagano_normal'],
				class: [null, null, null],
			  	name: "Kagano",
			  	text: "Vestibulum vehicula eros arcu. Duis auctor laoreet orci, eu volutpat leo varius in. Nulla in pharetra ex, nec congue odio.",
				choiceNext: false,
			},
			"3": {
				background: "backgrounds/testBG_2",
				charContainer: ['char-left', null, 'char-right'],
				image: ['Tomoka_normal', null,  'Kagano_normal'],
				class: [null, null, null],
			  	name: "Tomoka",
			  	text: "Praesent rutrum suscipit dolor nec dignissim. Aenean lacus arcu, sodales vel egestas at, ullamcorper eleifend nulla. Suspendisse mollis efficitur lorem eu eleifend.",
				choiceNext: true,
			},
			"4": {
				bgMusic: {
					name: [null, 'Determinations_for_Reina'],
					command: [null, 'STOP']
				},
				background: "backgrounds/testBG_2",
				charContainer: ['char-left', null, 'char-right'],
				image: ['Tomoka_normal', null, ['Kagano_smile', 'Kagano_sad']],
				choicePath: 'reina~importants~0003-3',
				class: [null, null, 'fadeRight'],
			  	name: "Kagano",
			  	text: [
					"In faucibus, est nec dignissim semper, sapien dui aliquet arcu, sollicitudin auctor augue tellus et sem.",
					"I'm sad, you know?"
				],
				choiceNext: false,
			},
			"5": {
				bgMusic: {
					name: [null, 'Haileys_competition'],
					command: [null, 'START']
				},
				background: "backgrounds/testBG_2",
				charContainer: ['char-left', null, 'char-right'],
				image: [['Tomoka_normal', 'Tomoka_surprised'], null, ['Kagano_smile', 'Kagano_sad']],
				choicePath: 'reina~importants~0003-3',
				class: [[null, "fadeLeft"], null, null],
			  	name: ["Kagano", "Tomoka"],
			  	text: [
					"Fusce sit amet mi accumsan, bibendum nibh in, porttitor dui. Nunc tincidunt porta sagittis. Nam purus libero, tincidunt posuere lacinia vitae, tincidunt eget ligula. ",
					"Say What?"
				],
				choiceNext: false,
				stepSkip: [1, 0]
			},
			"6": {
				background: "backgrounds/testBG_2",
				charContainer: ['char-left', null, 'char-right'],
				image: [[null, 'Tomoka_surprised'], null, [null, 'Kagano_sad']],
				choicePath: 'reina~importants~0003-3',
				class: [null, null, null],
			  	name: ["", "Kagano"],
			  	text: [
					"",
					"I've never expected this to happen."
				],
				choiceNext: false,
			},
			"7": {
				bgMusic: {
					name: ['Determinations_for_Reina', 'Haileys_competition'],
					command: ['STOP', 'STOP']
				},
				background: "backgrounds/testBG_2",
				charContainer: ['char-left', null, 'char-right'],
				image: ['Tomoka_normal', null, 'Kagano_normal'],
				choicePath: 'reina~importants~0003-3',
				class: [[null, "fadeLeft"], null, "fadeRight"],
			  	name: "Kagano",
			  	text: "Anyway... Let's talk about something else...",
				choiceNext: false,
				backStepSkip: [1, 0],
			},
			"8": {
				bgMusic: {
					name: 'Unexpected_ecchi_moment_occurs',
					command: 'START'
				},
				otherSoundEffect: ["splash", null],
				specialSceneNow: true,
				specialSceneId: "0003-8",
				background: "special_scenes/0003-8",
				charContainer: ['char-left', null, 'char-right'],
				image: [null, null, null],
				choicePath: 'reina~importants~0003-3',
				class: ['fadeLeftOut', null, 'fadeRightOut'],
			  	name: "Tomoka",
			  	text: "This is a spec scene now",
				choiceNext: false,
			},
			"9": {
				bgMusic: {
					name: 'Unexpected_ecchi_moment_occurs',
					command: 'FADE_OUT'
				},
				otherSoundEffect: ["collect", "splash"],
				background: "special_scenes/0003-8",
				charContainer: [null, null, null],
				image: [null, null, null],
				choicePath: 'reina~importants~0003-3',
				class: [null, null, null],
			  	name: "Kagano",
			  	text: "Uh... ecchi moments...",
				choiceNext: false,
				extraSceneNext: {
					choiceConditions: ['reina~importants~0003-3'],
					minGoodAnswer: 1,
					sceneSkipNumber: 1
				}
			},
		},
	},
	{
		sceneId: "0004",
		lengthNum: 4,
		story: {
			"1": {
				background: "backgrounds/testBG_1",
				charContainer: ['char-left', null, null],
				image: ['Rina', null, null],
				class: ["fadeLeft", null, null],
			  	name: "Rina",
			  	text: "Hey Kagano! Did coach make you smile by saying something nice?",
				choiceNext: false,
			},
			"2": {
				background: "backgrounds/testBG_1",
				charContainer: ['char-left', null, 'char-right'],
				image: ['Rina', null, ['Kagano_smile', 'Kagano_sad']],
				choicePath: 'reina~importants~0003-3',
				class: [null, null, "fadeRight"],
			  	name: "Kagano",
			  	text: [
					"Well... Yes, he did",
					"No... unfortunately not, and it didn't feel good at all!"
				],
				choiceNext: false,
			},
			"3": {
				background: "backgrounds/testBG_1",
				charContainer: ['char-left', null, 'char-right'],
				image: ['Rina', null, ['Kagano_smile', 'Kagano_sad']],
				choicePath: 'reina~importants~0003-3',
				class: [null, null, null],
			  	name: "Rina",
			  	text: "I hear you. But it won't matter. You know why? Because this is just an extra scene, so it is highly possible that you opinion will never be heard.",
				choiceNext: false,
			},
			"4": {
				background: "backgrounds/testBG_2",
				charContainer: ['char-left', null, 'char-right'],
				image: ['Rina', null, 'Kagano_normal'],
				class: [null , null, 'fadeRight'],
			  	name: "Kagano",
			  	text: "Say What?!",
				choiceNext: false,
				timeSkipNext: {
					content: "A few hours later...",
					nextSceneType: "STORY", //or MOBILE
					nextSceneNumber: "0005",
				}
			},
		},
	},
	{
		sceneId: "0005",
		lengthNum: 5,
		story: {
			"1": {
				background: "backgrounds/testBG_1",
				charContainer: ['char-left', null, null],
				image: ['Akane', null, null],
				class: ["fadeLeft", null, null],
			  	name: "Akane",
			  	text: "Hey Saki! Did you Rina and Kagano?",
				choiceNext: false,
			},
			"2": {
				background: "backgrounds/testBG_1",
				charContainer: ['char-left', null, 'char-right'],
				image: ['Akane', null, 'Saki_normal'],
				class: [null, null, "fadeRight"],
			  	name: "Saki",
			  	text: "I'm not sure, but they might have been seen in an extra scene before us.",
				choiceNext: false,
			},
			"3": {
				background: "backgrounds/testBG_1",
				charContainer: ['char-left', null, 'char-right'],
				image: ['Akane', null, 'Saki_normal'],
				class: [null, null, null],
			  	name: "Akane",
			  	text: "I see, that makes sense.",
				choiceNext: false,
			},
			"4": {
				background: "backgrounds/testBG_2",
				backGroundClass: "fadeIn",
				charContainer: ['char-left', null, 'char-right'],
				image: ['Akane', null, 'Saki_normal'],
				class: ['fadeLeftOut', null, 'fadeRightOut'],
			  	name: "",
			  	text: "",
				choiceNext: false,
			},
			"5": {
				background: "backgrounds/testBG_2",
				charContainer: [null, 'char-middle', null],
				image: [null, 'Akane', null],
				class: [null, 'fadeUp', null],
			  	name: "Akane",
			  	text: "Hmm... it seems, I'm alone here.",
				choiceNext: false,
				mobileSceneNext: "0006"
			}
		},
	},
	{ sceneId: "0006" }, //mobileScene: 0006
	{
		sceneId: "0007",
		lengthNum: 3,
		story: {
			"1": {
				bgMusic: {
					name: 'Being_in_the_mood',
					command: 'START'
				},
				background: "backgrounds/testBG_1",
				charContainer: [null, "char-middle", null],
				image: [null, "Rina", null],
				class: [null, null, null],
			  	name: "Rina",
			  	text: "Let's take a break before the next timeSkipping mobile scene!",
				choiceNext: false,
			},
			"2": {
				background: "backgrounds/testBG_1",
				charContainer: [null, "char-middle", null],
				image: [null, "Rina", null],
				class: [null, "fadeUp", null],
				choicePath: 'reina~mobileImportants~0006-r-6',
			  	name: "Rina",
				text: [
					"As far as I recall, you're done with Reina...",
					"It seems you're still hesitant with Reina.",
					"It's okay if you wanna go back to Reina.",
					"As I see you didn't have the chance to asnwer to some Reina's decisions... I hope you won't regret it."
				],
				choiceNext: false,
			},
			"3": {
				bgMusic: {
					name: 'Being_in_the_mood',
					command: 'FADE_OUT'
				},
				background: "backgrounds/testBG_1",
				charContainer: [null, "char-middle", null],
				image: [null, "Rina", null],
				class: [null, "fadeUp", null],
			  	name: "Rina",
			  	text: "Ready... set... go!!!",
				choiceNext: false,
				timeSkipNext: {
					content: "Later that evening...",
					nextSceneType: "MOBILE",
					nextSceneNumber: "0008",
				}
			},
		},
	},
	{ sceneId: "0008" }, //mobileScene: 0008
];
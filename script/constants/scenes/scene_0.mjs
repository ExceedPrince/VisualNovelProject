export const scene_0 = [
	{
		sceneId: "0000",
		lengthNum: 7,
		story: {
			"1": {
				bgMusic: {
					name: 'Determinations_for_Reina',
					command: 'START'
				},
				background: "backgrounds/BG_dark",
				charContainer: [null, null, null],
				image: [null, null, null],
				class: [null, null, null],
			  	name: "",
			  	text: "Have you ever been a relationship… with someone who was already taken?",
				choiceNext: false,
			},
			"2": {
				background: "backgrounds/BG_dark",
				charContainer: [null, null, null],
				image: [null, null, null],
				class: [null, null, null],
			  	name: "",
			  	text: "Well… I have!",
				choiceNext: false,
			},
			"3": {
				specialSceneNow: true,
				specialSceneId: "0000-3",
				background: "special_scenes/0000-3",
				charContainer: [null, null, null],
				image: [null, null, null],
				class: [null, null, null],
			  	name: "",
			  	text: "This particular kiss was a watershed moment in my life because it happened with someone who should never have made this move.",
				choiceNext: false,
			},
			"4": {
				background: "special_scenes/0000-3",
				charContainer: [null, null, null],
				image: [null, null, null],
				class: [null, null, null],
			  	name: "",
			  	text: "Yes, you saw that right! I was just as surprised as you are, even though I deeply longed for it.",
				choiceNext: false,
			},
			"5": {
				background: "special_scenes/0000-3",
				charContainer: [null, null, null],
				image: [null, null, null],
				class: [null, null, null],
			  	name: "",
			  	text: "I just never thought it could actually happen. Since then, my life has taken a positive turn, but it also means I'm just someone's lover... And that's not enough for me because I love her.",
				choiceNext: false,
			},
			"6": {
				bgMusic: {
					name: 'Determinations_for_Reina',
					command: 'FADE_OUT'
				},
				background: "special_scenes/0000-3",
				charContainer: [null, null, null],
				image: [null, null, null],
				class: [null, null, null],
			  	name: "",
			  	text: "What would you do to break free from the prison of being just a lover?",
				choiceNext: false,
			},
			"7": {
				bgMusic: {
					name: 'Determinations_for_Reina',
					command: 'FADE_OUT'
				},
				background: "special_scenes/0000-3",
				charContainer: [null, null, null],
				image: [null, null, null],
				class: [null, null, null],
			  	name: "",
			  	text: "Choose wisely!",
				choiceNext: false,
				timeSkipNext: {
					content: "On a summer Thursday...",
					nextSceneType: "STORY",
					nextSceneNumber: "0001",
				}
			}
		},
	},
];
export const mobileParts = [
    { sceneId: "0000" }, //storyScene: 0000
    { sceneId: "0001" }, //storyScene: 0001
    { sceneId: "0002" }, //storyScene: 0002
    { sceneId: "0003" }, //storyScene: 0003
    { sceneId: "0004" }, //storyScene: 0004
    { sceneId: "0005" }, //storyScene: 0005
	{
		sceneId: "0006",
        startTime: "21:00",
        endTime: "21:40",
        nextStoryScene: "0007",
        //timeSkipNext: {
        //    content: "A few hours later...",
        //    nextSceneType: "STORY", //or MOBILE
        //   nextSceneNumber: "0005",
        //}
        keepOut: ['Lindsay Lawrie'],
        bgMusic: {
            name: 'Night_dates_with_Reina_szerkeszteni',
            command: 'START', //STOP, FADE_OUT
        },
		textingPartner: {
            Reina: {
                isMandatory: false,
                sheStartsAt: "21:05",
                sheEndsAt: "21:30",
                messages: [
                    {
                        id: 0, 
                        isFromHer: true, 
                        // sentPicture: String || null, 
                        text: "Hello my Dear!", 
                        waitingTime: 0, // or null if it's player 
                        typingTime: 0.5, // or null if it's player
                        // choicePath: String,
                        //choiceNow: ???
                    },
                    {
                        id: 1, 
                        isFromHer: true, 
                        text: "I love you from the past <3", 
                        waitingTime: 2,
                        typingTime: 2,
                    },
                    {
                        id: 2, 
                        isFromHer: true, 
                        text: "I miss you", 
                        waitingTime: 8,
                        typingTime: 2,
                    },
                    {
                        id: 3, 
                        isFromHer: false, 
                        text: "I love you too Reina, from the deepest point of my heart ever since then...", 
                        waitingTime: null,
                        typingTime: null,
                    },
                    {
                        id: 4, 
                        isFromHer: true, 
                        text: "I'm glad to see that", 
                        waitingTime: 2,
                        typingTime: 1,
                    },
                    {
                        id: 5, 
                        isFromHer: true, 
                        text: "Would you still choose me over your current girlfriend?", 
                        waitingTime: 4,
                        typingTime: 2,
                    },
                    {
                        id: 6, 
                        isFromHer: false, 
                        text: [
                            "I'm sorry, but it'd be unfaithful",
                            "Hmm... I don't know...",
                            "Of course, do don't even have to ask that!",
                        ], 
                        waitingTime: null,
                        typingTime: null,
                        choiceNow: true,
                        choicePath: "reina~mobileImportants~0006-r-6",
                    },
                    {
                        id: 7, 
                        isFromHer: true, 
                        text: [
                            "Unfaithful?! If I was able to do so, why can't you?",
                            "Really?... I thought you love so much better than that...",
                            "I'm happy...",
                        ], 
                        waitingTime: 4,
                        typingTime: 3,
                        choicePath: "reina~mobileImportants~0006-r-6",
                        bgMusic: {
                            name: ['', 'Haileys_competition', ''],
                            command: ['STOP', 'START', null],
                        },
                        chatSkip: [2, 2, 0],
                    },
                    {
                        id: 8, 
                        isFromHer: true, 
                        text: [
                            null,
                            null,
                            "As a reward, I'll show you something",
                        ], 
                        waitingTime: 2,
                        typingTime: 2,
                        bgMusic: {
                            name: 'Reina_ecchi',
                            command: 'START',
                        },
                        choicePath: "reina~mobileImportants~0006-r-6",
                    },
                    {
                        id: 9, 
                        isFromHer: true, 
                        sentPicture: [null, null, "test-0006-r-9"],
                        text: null, 
                        waitingTime: 4,
                        typingTime: 2,
                        choicePath: "reina~mobileImportants~0006-r-6",
                    },
                    {
                        id: 10, 
                        isFromHer: false, 
                        text: [
                            'I\'m sorry...',
                            'Come on...',
                            'Wow, I love you!'
                        ], 
                        waitingTime: null,
                        typingTime: null,
                        choicePath: "reina~mobileImportants~0006-r-6",
                    },
                ]
            },
            Brianna: {
                isMandatory: false,
                sheStartsAt: "21:10",
                sheEndsAt: "22:00",
                messages: [
                    {
                        id: 0, 
                        isFromHer: true, 
                        sentPicture: "test-0006-b-0", 
                        text: null, 
                        waitingTime: 0, // or null if it's player 
                        typingTime: 0.5, // or null if it's player
                        // choicePath: String,
                        //choiceNow: ???
                        bgMusic: {
                            name: 'Unexpected_ecchi_moment_occurs',
                            command: 'START',
                        },
                    },
                    {
                        id: 1, 
                        isFromHer: false, 
                        text: [
                            "Wow, it's much better then Kagano's smile",
                            "Thank for the pic, I'll cherish it"
                        ], 
                        waitingTime: null,
                        typingTime: null,
                        choicePath: "reina~importants~0003-3",
                    },
                    {
                        id: 2, 
                        isFromHer: true, 
                        text: [
                            "Must you really talk about her at a time like this?...",
                            "Really? Ok, then I could do this more often, if you'd like it"
                        ], 
                        waitingTime: 3,
                        typingTime: 3,
                        choicePath: "reina~importants~0003-3",
                        bgMusic: {
                            name: ['', ''],
                            command: ['STOP', null],
                        },
                    },
                    {
                        id: 3, 
                        isFromHer: true, 
                        sentPicture: [null, "0006-b-3"],
                        text: [
                            "This was the last time I send you picture about myself",
                            null
                        ], 
                        waitingTime: 3,
                        typingTime: 3,
                        choicePath: "reina~importants~0003-3",
                        bgMusic: {
                            name: ['Daenas_exam', 'Intended_erotic_situation'],
                            command: ['START', 'START'],
                        },
                    }
                ]
            }
        }
    },
    { sceneId: "0007" }, //storyScene: 0007
    {
		sceneId: "0008",
        startTime: "19:38",
        endTime: "20:12",
        timeSkipNext: {
            content: "A few hours later...",
            nextSceneType: "MOBILE",
            nextSceneNumber: "0009",
        },
        keepOut: ['Lindsay Lawrie'],
        bgMusic: {
            name: 'Night_dates_with_Reina_szerkeszteni',
            command: 'START', //STOP, FADE_OUT
        },
		textingPartner: {
            Hailey: {
                isMandatory: true,
                sheStartsAt: "19:40",
                sheEndsAt: "20:10",
                messages: [
                    {
                        id: 0, 
                        isFromHer: true, 
                        text: "Hello Dude!", 
                        waitingTime: 0, 
                        typingTime: 0.5,
                    },
                    {
                        id: 1, 
                        isFromHer: true, 
                        text: "How is it goin'?", 
                        waitingTime: 2, 
                        typingTime: 1,
                    },
                    {
                        id: 2, 
                        isFromHer: false, 
                        text: "Would be better, if I could brim a cute, sexy tomboy like you", 
                        waitingTime: null, 
                        typingTime: null,
                    },
                    {
                        id: 3, 
                        isFromHer: true, 
                        text: "It was a bit pervert, but I'm diggin' it", 
                        waitingTime: 4, 
                        typingTime: 2,
                    },
                    {
                        id: 4, 
                        isFromHer: true, 
                        text: "And where do you want to brim me so bad?", 
                        waitingTime: 4, 
                        typingTime: 2,
                    },
                    {
                        id: 5, 
                        isFromHer: false, 
                        text: [
                            "Through the frontgate, to make you pregnant",
                            "I'd shut your mouth up with my cum",
                            "I wanna take your anal virginity away",
                        ], 
                        waitingTime: null,
                        typingTime: null,
                        choiceNow: true,
                        choicePath: "hailey~mobileImportants~0008-h-5",
                    },
                    {
                        id: 6, 
                        isFromHer: true, 
                        text: [
                            "Typical classic style, but ok, I don't mind",
                            "Good luck with that, but I know my own skills better than you",
                            "That... never counts as a bad choice... never",
                            "I see... I thought you'd be open for a little fun"
                        ], 
                        waitingTime: 6, 
                        typingTime: 2,
                        choicePath: "hailey~mobileImportants~0008-h-5",
                    }
                ]
            }
        }
    },
    {
		sceneId: "0009",
        startTime: "23:55",
        endTime: "00:40",
        nextStoryScene: "0010",
        keepOut: [],
        bgMusic: {
            name: 'Night_dates_with_Reina_szerkeszteni',
            command: 'START', //STOP, FADE_OUT
        },
		textingPartner: {
            Daena: {
                isMandatory: true,
                sheStartsAt: "23:56",
                sheEndsAt: "00:25",
                messages: [
                    {
                        id: 0, 
                        isFromHer: true, 
                        text: "Hi Coach!", 
                        waitingTime: 0, 
                        typingTime: 0.5,
                    },
                    {
                        id: 1, 
                        isFromHer: true, 
                        text: "Are you still awake?", 
                        waitingTime: 2, 
                        typingTime: 1,
                    },
                    {
                        id: 2, 
                        isFromHer: false, 
                        text: "Hi Daena! \nYes, I'm here", 
                        waitingTime: null, 
                        typingTime: null,
                    },
                    {
                        id: 3, 
                        isFromHer: false, 
                        text: "How is it going?", 
                        waitingTime: null, 
                        typingTime: null,
                    },
                    {
                        id: 4, 
                        isFromHer: true, 
                        text: "Oh, I just wanted to here with you at the very first moments of the next day.", 
                        waitingTime: 4, 
                        typingTime: 2,
                    },
                    {
                        id: 5, 
                        isFromHer: false, 
                        text: "That's very cute from you", 
                        waitingTime: null,
                        typingTime: null,
                    },
                    {
                        id: 6, 
                        isFromHer: true, 
                        sentPicture: "test-0009-d-6",
                        text: null, 
                        waitingTime: 4, 
                        typingTime: 2,
                    },
                    {
                        id: 7, 
                        isFromHer: true, 
                        text: "Am I just cute?", 
                        waitingTime: 2, 
                        typingTime: 2,
                    },
                    {
                        id: 8, 
                        isFromHer: false, 
                        text: [
                            "Yes, you are",
                            "Ok, I admit... can't wait until you'll be 18",
                        ], 
                        waitingTime: null,
                        typingTime: null,
                        choiceNow: true,
                        choicePath: "daena~mobileImportants~0009-d-8",
                    },
                    {
                        id: 9, 
                        isFromHer: true, 
                        text: [
                            "You know, I don't want you seeing me just as a child...",
                            "Hehe... can't wait what will happend to me XP",
                            "Now you're freaked out... I get it..."
                        ], 
                        waitingTime: 3, 
                        typingTime: 2,
                        choicePath: "daena~mobileImportants~0009-d-8",
                        bgMusic: {
                            name: ['', 'Daena_ecchi', 'Haileys_competition'],
                            command: ['STOP', 'START', 'START'],
                        },
                    }
                ]
            },
            Lindsay: {
                isMandatory: false,
                sheStartsAt: "00:28",
                sheEndsAt: "00:38",
                messages: [
                    {
                        id: 0, 
                        isFromHer: true, 
                        text: "Hi there!", 
                        waitingTime: 0, 
                        typingTime: 0.5,
                        bgMusic: {
                            name: 'Daenas_exam',
                            command: 'START',
                        },
                    },
                    {
                        id: 1, 
                        isFromHer: false, 
                        text: "Hi Lindsay, what do you want?", 
                        waitingTime: null, 
                        typingTime: null,
                    },
                    {
                        id: 2, 
                        isFromHer: true, 
                        text: [
                            "Well, it's seems you're still not intereted in little girls",
                            "Nothing, I'm just wondering, why are you chasing some teenager girls?",
                            "I was wondering, can't you decide whether you wanna f*ck teen girls or not?"
                        ],
                        waitingTime: 2, 
                        typingTime: 3,
                        choicePath: "daena~mobileImportants~0009-d-8",
                        bgMusic: {
                            name: ['FitnessRoom_winter_daily', 'FitnessRoom_winter_daily', 'FitnessRoom_winter_daily'],
                            command: ['START', 'START', 'START'],
                        },
                    },
                    {
                        id: 3, 
                        isFromHer: false, 
                        text: "How do you know that?", 
                        waitingTime: null, 
                        typingTime: null,
                    },
                    {
                        id: 4, 
                        isFromHer: true, 
                        text: "it's a secret...", 
                        waitingTime: 3, 
                        typingTime: 2,
                    }
                ]
            }
        }
    },
];
export const scene_28 = [
    { sceneId: "0027" }, //storyScene: 0027
    {
		sceneId: "0028",
        startTime: "13:00",
        endTime: "14:33",
        timeSkipNext: {
            content: "Later that evening...",
            nextSceneType: "STORY",
            nextSceneNumber: "0029",
        },
        keepOut: [],
        bgMusic: {
            name: 'Mobile_daily_normal',
            command: 'START',
        },
		textingPartner: {
            Reina: {
                isMandatory: false,
                sheStartsAt: "13:02",
                sheEndsAt: "14:32",
                messages: [
                    {
                        id: 0, 
                        isFromHer: true, 
                        text: "Hey, Tyler😊", 
                        waitingTime: 0,
                        typingTime: 0.5,
                    },
                    {
                        id: 1, 
                        isFromHer: true, 
                        text: "How are you feeling after the spa?😌", 
                        waitingTime: 2,
                        typingTime: 3.5,
                    },
                    {
                        id: 2, 
                        isFromHer: false, 
                        text: "Hey, Reina 🙂 Kind of mixed, honestly", 
                        waitingTime: null,
                        typingTime: null,
                    },
                    {
                        id: 3, 
                        isFromHer: true, 
                        text: "Why's that?", 
                        waitingTime: 3,
                        typingTime: 2,
                    },
                    {
                        id: 4, 
                        isFromHer: false, 
                        text: "The spa itself was amazing, but my heart was pounding the whole time", 
                        waitingTime: null,
                        typingTime: null,
                    },
                    {
                        id: 5, 
                        isFromHer: true, 
                        text: "Oh...😯", 
                        waitingTime: 3,
                        typingTime: 1,
                    },
                    {
                        id: 6, 
                        isFromHer: true, 
                        text: "Is there some health issue I don't know about?", 
                        waitingTime: 3,
                        typingTime: 4,
                    },
                    {
                        id: 7, 
                        isFromHer: false, 
                        text: "No, no, I mean it was... the intense situation", 
                        waitingTime: null,
                        typingTime: null,
                    },
                    {
                        id: 8, 
                        isFromHer: true, 
                        text: "Ah, I get it now...😏😇", 
                        waitingTime: 4,
                        typingTime: 2.5,
                    },
                    {
                        id: 9, 
                        isFromHer: false, 
                        text: "Yeah. Even when people came in and we were just chilling, what happened before that was stuck in my head", 
                        waitingTime: null,
                        typingTime: null,
                    },
                    {
                        id: 10, 
                        isFromHer: true, 
                        text: "Well, glad to know I left such a lasting impression on you😇", 
                        waitingTime: 2,
                        typingTime: 5,
                    },
                    {
                        bgMusic: {
                            name: 'Mobile_daily_normal',
                            command: 'STOP',
                        },
                        id: 11, 
                        isFromHer: true, 
                        text: "But if you think about it...", 
                        waitingTime: 3,
                        typingTime: 3,
                    },
                    {
                        bgMusic: {
                            name: 'Mobile_daily_romantic',
                            command: 'START',
                        },
                        id: 12, 
                        isFromHer: true, 
                        text: "If they couldn't see us holding hands under the water...", 
                        waitingTime: 2,
                        typingTime: 5,
                    },
                    {
                        id: 13, 
                        isFromHer: true, 
                        text: "Then they wouldn't have seen me doing... a handjob either😜", 
                        waitingTime: 2,
                        typingTime: 5,
                    },
                    {
                        id: 14, 
                        isFromHer: true,
                        text: "And actually... it would've even been possible for me to... sit in your lap, like THAT😜🥵", 
                        waitingTime: 4,
                        typingTime: 7.5,
                    },
                    {
                        id: 15, 
                        isFromHer: false,
                        text: [
                            "That wouldn't have been funny, it'd have been risky",
                            "Seriously, I can't make you out sometimes...",
                            "Reina... I'm already going crazy from how attracted I am to you"
                        ], 
                        waitingTime: null,
                        typingTime: null,
                        choiceNow: true,
                        choicePath: "reina~mobileImportants~0028-r-15",
                    },
                    {
                        id: 16, 
                        isFromHer: false,
                        text: [
                            "I'm not sure how you'd manage the up-and-down part without anyone noticing",
                            "You've been waiting for the perfect time for so long, and now you think maybe it could have worked?",
                            "Even just leaving the water without... a hard dick wasn't easy"
                        ], 
                        waitingTime: null,
                        typingTime: null,
                        choicePath: "reina~mobileImportants~0028-r-15",
                    },
                    {
                        id: 17, 
                        isFromHer: true,
                        text: [
                            "Tyler, why do you have to be like this?😔",
                            "No, that could never have happened😔",
                            "Haha... that would've definitely been awkward🤣"
                        ], 
                        waitingTime: 4,
                        typingTime: 4,
                        choicePath: "reina~mobileImportants~0028-r-15",
                        bgMusic: {
                            name: ['Mobile_daily_sad', 'Mobile_daily_sad', 'Mobile_daily_ecchi'],
                            command: ['START', 'START', 'START'],
                        },
                    },
                    {
                        id: 18, 
                        isFromHer: true,
                        text: [
                            "But nothing stops me from thinking about it",
                            "But nothing stops me from thinking about it",
                            "Good to know that even if you lied, your body wouldn't be able to hide it🥰"
                        ], 
                        waitingTime: 2,
                        typingTime: [4, 4, 7],
                        choicePath: "reina~mobileImportants~0028-r-15",
                    },
                    {
                        id: 19, 
                        isFromHer: false,
                        text: [
                            "But if you're thinking about this, what are we waiting for? Isn't this enough for you yet?",
                            "But if you're thinking about this, what are we waiting for? Isn't this enough for you yet?",
                            "I'm trying to be honest with my words, too"
                        ], 
                        waitingTime: null,
                        typingTime: null,
                        choicePath: "reina~mobileImportants~0028-r-15",
                    },
                    {
                        id: 20, 
                        isFromHer: true,
                        text: [
                            "Tyler, rushing it won't make it happen any sooner",
                            "Tyler, rushing it won't make it happen any sooner",
                            "And I appreciate that😊"
                        ], 
                        waitingTime: 4,
                        typingTime: [4.5, 4.5, 2.5],
                        choicePath: "reina~mobileImportants~0028-r-15",
                    },
                    {
                        id: 21, 
                        isFromHer: true,
                        text: [
                            "But if not that, I can still give you something else",
                            "But if not that, I can still give you something else",
                            "That's exactly why I'm giving you something"
                        ], 
                        waitingTime: 2,
                        typingTime: [4.5, 4.5, 4],
                        choicePath: "reina~mobileImportants~0028-r-15",
                    },
                    {
                        bgMusic: {
                            name: 'Mobile_daily_ecchi',
                            command: 'START'
                        },
                        id: 22, 
                        isFromHer: true,
                        sentPicture: "0028-r-22",
                        text: null, 
                        waitingTime: 2,
                        typingTime: 2,
                    },
                    {
                        id: 23, 
                        isFromHer: true,
                        text: "Hope this satisfies your imagination for now until our first time😋", 
                        waitingTime: 3,
                        typingTime: 5.5,
                    },
                    {
                        id: 24, 
                        isFromHer: false,
                        text: "Oh, this... I didn't expect this, but thank you; it calmed things down for me a bit", 
                        waitingTime: null,
                        typingTime: null,
                    },
                    {
                        id: 25, 
                        isFromHer: true,
                        text: "Glad to hear it😊", 
                        waitingTime: 3,
                        typingTime: 2,
                    },
                    {
                        id: 26, 
                        isFromHer: true,
                        text: "But I have to go now; I need to gather up the girls soon", 
                        waitingTime: 2,
                        typingTime: 5,
                    },
                    {
                        id: 27, 
                        isFromHer: true,
                        text: "We'll talk later🙂", 
                        waitingTime: 3,
                        typingTime: 2,
                    },
                    {
                        id: 28, 
                        isFromHer: true,
                        text: "Have a lovely day!🥰❤️", 
                        waitingTime: 3,
                        typingTime: 2,
                    },
                ],
            },
        }
    },
];
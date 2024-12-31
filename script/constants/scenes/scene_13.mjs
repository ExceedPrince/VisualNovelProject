export const scene_13 = [
    { sceneId: "0010" }, //storyScene: 0010
    { sceneId: "0011" }, //storyScene: 0011
    { sceneId: "0012" }, //storyScene: 0012
    {
		sceneId: "0013",
        startTime: "22:10",
        endTime: "00:28",
        timeSkipNext: {
            content: "Monday morning",
            nextSceneType: "STORY",
            nextSceneNumber: "0014",
        },
        keepOut: [],
        bgMusic: {
            name: 'Mobile_night_normal',
            command: 'START',
        },
		textingPartner: {
            Hailey: {
                isMandatory: false,
                sheStartsAt: "22:12",
                sheEndsAt: "00:25",
                messages: [
                    {
                        id: 0, 
                        isFromHer: true, 
                        text: "Heyyy Tyler! 😊", 
                        waitingTime: 0,
                        typingTime: 0.5,
                    },
                    {
                        id: 1, 
                        isFromHer: true, 
                        text: "U there rn? 🤔", 
                        waitingTime: 2,
                        typingTime: 1.5,
                    },
                    {
                        id: 2, 
                        isFromHer: false, 
                        text: "Hey Hailey, yeah, I’m here", 
                        waitingTime: null,
                        typingTime: null,
                    },
                    {
                        id: 3, 
                        isFromHer: true, 
                        text: "Cool 👍👍", 
                        waitingTime: 3,
                        typingTime: 1,
                    },
                    {
                        id: 4, 
                        isFromHer: true, 
                        text: "So, there’s smth I wanna tell u", 
                        waitingTime: 2,
                        typingTime: 2.5,
                    },
                    {
                        id: 5, 
                        isFromHer: true, 
                        text: "But it’s not really about training...", 
                        waitingTime: 1,
                        typingTime: 3,
                    },
                    {
                        id: 6, 
                        isFromHer: true, 
                        text: "Buuuut, I totally need a guy’s opinion on this", 
                        waitingTime: 2,
                        typingTime: 4,
                    },
                    {
                        id: 7, 
                        isFromHer: true, 
                        text: "And like, idk who else to ask 😔", 
                        waitingTime: 3,
                        typingTime: 2.5,
                    },
                    {
                        id: 8, 
                        isFromHer: true, 
                        text:"U still down to hear it? 🥺", 
                        waitingTime: 3,
                        typingTime: 2,
                    },
                    {
                        id: 9, 
                        isFromHer: false, 
                        text: "No problem, I’m all ears.", 
                        waitingTime: null,
                        typingTime: null,
                    },
                    {
                        id: 10, 
                        isFromHer: true, 
                        text: "Thx! 🙏🙏", 
                        waitingTime: 3,
                        typingTime: 1,
                    },
                    {
                        id: 11, 
                        isFromHer: true, 
                        text: "Sooo, I went hiking with my bf today", 
                        waitingTime: 2,
                        typingTime: 3.5,
                    },
                    {
                        id: 12, 
                        isFromHer: true, 
                        text: "It was such a pretty spot, the fresh air felt amazing, so I was really vibing... 🤩", 
                        waitingTime: 2,
                        typingTime: 6,
                    },
                    {
                        id: 13, 
                        isFromHer: true, 
                        text: "The weather was perfect, and we barely saw anyone else around", 
                        waitingTime: 3,
                        typingTime: 5,
                    },
                    {
                        id: 14, 
                        isFromHer: true, 
                        text: "We get to this cute lil rest stop, and I’m thinking to myself, \"This could be sooo much more memorable...\"😉", 
                        waitingTime: 2,
                        typingTime: 7,
                    },
                    {
                        id: 15, 
                        isFromHer: true, 
                        text: "U know what I mean?... Everything was just, like, perfect! 😏😏🤫🤫", 
                        waitingTime: 4,
                        typingTime: 5,
                    },
                    {
                        id: 16, 
                        isFromHer: true, 
                        text: "But no matter how many hints I dropped, my bf just wasn’t picking up on them...😞", 
                        waitingTime: 3,
                        typingTime: 6,
                    },
                    {
                        id: 17, 
                        isFromHer: true, 
                        text: "And omg, it felt so bad to get rejected like that! 😫😫", 
                        waitingTime: 2,
                        typingTime: 4.5,
                    },
                    {
                        id: 18, 
                        isFromHer: true, 
                        text: "I mean, who rejects me in a moment like that?!😭", 
                        waitingTime: 3,
                        typingTime: 4,
                    },
                    {
                        id: 19, 
                        isFromHer: true, 
                        text: "Be real with me... as a guy, why do u think he didn’t want to?", 
                        waitingTime: 2,
                        typingTime: 5,
                    },
                    {
                        id: 20, 
                        isFromHer: false, 
                        text: "Well... depends on a lot of things. Did he not get what you were hinting at, or did he understand and still say no?", 
                        waitingTime: null,
                        typingTime: null,
                    },
                    {
                        id: 21, 
                        isFromHer: true, 
                        text: "It was def the second one, ‘cause he straight-up said he didn’t think it was the \"right time\" or whatever... 🤔", 
                        waitingTime: 5,
                        typingTime: 8,
                    },
                    {
                        id: 22, 
                        isFromHer: true, 
                        text: "But I thought it was perfect, ‘cause we didn’t see anyone for hours after!", 
                        waitingTime: 3,
                        typingTime: 5,
                    },
                    {
                        id: 23, 
                        isFromHer: true, 
                        text: "Like, no one would’ve interrupted us!", 
                        waitingTime: 2,
                        typingTime: 3,
                    },
                    {
                        id: 24, 
                        isFromHer: true, 
                        text: "So what do u think? What would u have done?", 
                        waitingTime: 4,
                        typingTime: 3.5,
                    },
                    {
                        id: 25,
                        isFromHer: false, 
                        text: [
                            "In a similar situation, you wouldn’t have even had to ask—I would’ve torn your clothes off like crazy!",
                            "An opportunity like that doesn’t come around often",
                            "I should’ve stopped you because if we got caught, we could’ve been in serious trouble",
                            "I wouldn’t have done it either. Getting caught could’ve ruined the whole experience"
                        ], 
                        waitingTime: null,
                        typingTime: null,
                        choiceNow: true,
                        choicePath: "hailey~mobileImportants~0013-h-25",
                    },
                    {
                        id: 26, 
                        isFromHer: true, 
                        text: [
                            "Whoa there, Tyler, slow down a bit! 😯",
                            "Right?! 😞",
                            "You too? 😯😯",
                            "Okay, I get it...😞"
                        ], 
                        waitingTime: 3,
                        typingTime: 2,
                        choicePath: "hailey~mobileImportants~0013-h-25",
                    },
                    {
                        id: 27, 
                        isFromHer: true, 
                        text: [
                            "Even though I seem wild, I do appreciate some gentle handling too",
                            "But for some reason, it just didn’t get him excited 😞😞",
                            "Are all guys this rational in the most romantic moments? 😞",
                            "I still can’t believe that a little excitement doesn’t attract you guys 😞"
                        ], 
                        waitingTime: 2,
                        typingTime: 5,
                        choicePath: "hailey~mobileImportants~0013-h-25",
                    },
                    {
                        id: 28, 
                        isFromHer: false, 
                        text: [
                            "Alright, sorry, but you did ask for an honest opinion",
                            "Unfortunately, I don’t have the answer to that",
                            "Some guys think with their brains, not what’s between their legs",
                            "He just wanted to protect you"
                        ], 
                        waitingTime: null,
                        typingTime: null,
                        choicePath: "hailey~mobileImportants~0013-h-25",
                    },
                    {
                        id: 29, 
                        isFromHer: true, 
                        text: [
                            "I appreciate that...",
                            "You’ve already helped a lot with just that 🙂",
                            "That’s a problem",
                            "Maybe, but...",
                        ], 
                        waitingTime: 4,
                        typingTime: [2, 4, 2, 1.5],
                        choicePath: "hailey~mobileImportants~0013-h-25",
                    },
                    {
                        id: 30, 
                        isFromHer: true, 
                        text: [
                            "Just a little less wildness would’ve been enough 😒",
                            "At least now I know you’d appreciate those kinds of moments more 😉😉",
                            "Sometimes, you guys could be a little more relaxed",
                            "But I still have my needs... 😞🫢",
                        ], 
                        waitingTime: 3,
                        typingTime: [4, 5, 4, 3],
                        choicePath: "hailey~mobileImportants~0013-h-25",
                    },
                    {
                        id: 31, 
                        isFromHer: false, 
                        text: [
                            "Got it",
                            "I’m trying, just need someone to try with...",
                            "We are relaxed, it’s just evolution coded us differently",
                            "That’s something you’ll need to work out with your bf",
                        ], 
                        waitingTime: null,
                        typingTime: null,
                        choicePath: "hailey~mobileImportants~0013-h-25",
                    },
                    {
                        id: 32, 
                        isFromHer: true, 
                        text: [
                            "Glad we cleared that up 🙂",
                            "Oh… I have a feeling you’ll find someone soon enough 😉😇",
                            "Wait, what do you mean by that?",
                            "Yeah… if only it were that simple 😞"
                        ], 
                        waitingTime: 5,
                        typingTime: [2.5, 5, 3, 3],
                        choicePath: "hailey~mobileImportants~0013-h-25",
                    },
                    {
                        id: 33, 
                        isFromHer: false, 
                        text: [
                            "Anything else I can help you with?",
                            "I really hope you’re right...",
                            "If women had been happy doing it in shoeboxes, we’d have never built houses",
                            "I have no right to get involved in your relationship",
                        ], 
                        waitingTime: null,
                        typingTime: null,
                        choicePath: "hailey~mobileImportants~0013-h-25",
                    },
                    {
                        id: 34, 
                        isFromHer: true, 
                        text: [
                            "Nah, thx, that’s all I needed 🙂",
                            "Girl’s intuition, trust me 😉😉",
                            "Got it. Learned something new about guys today...",
                            "Yeah, that’s all I needed, no more help on that front 🙂"
                        ], 
                        waitingTime: 4,
                        typingTime: [3, 3, 5, 5],
                        choicePath: "hailey~mobileImportants~0013-h-25",
                    },
                    {
                        id: 35, 
                        isFromHer: true, 
                        sentPicture: [null, "0013-h-35", null, null],
                        text: [
                            "So I won’t keep you any longer 🙂",
                            null,
                            "Alright, that’s all from me, won’t keep you any longer 🙂",
                            "Yeah, that’s it from me 🙂"
                        ], 
                        waitingTime: 3,
                        typingTime: [4, 2, 6, 2],
                        choicePath: "hailey~mobileImportants~0013-h-25",
                        bgMusic: {
                            name: ['Mobile_night_normal', 'Mobile_night_romantic', 'Mobile_night_normal', 'Mobile_night_normal'],
                            command: ['START', 'START', 'START', 'START'],
                        },
                    },
                    {
                        id: 36, 
                        isFromHer: true, 
                        text: [
                            "G’night! 🛏️⭐",
                            "A lil' gift from today’s hike 🫣😋",
                            "G’night! 🛏️⭐",
                            "G’night! 🛏️⭐",
                        ], 
                        waitingTime: [3, 3, 3, 3],
                        typingTime: [2, 2, 3, 2],
                        choicePath: "hailey~mobileImportants~0013-h-25",
                    },
                    {
                        id: 37, 
                        isFromHer: false, 
                        text: [
                            "G’night, Hailey. See you at training tomorrow",
                            "Wow, thanks, you look amazing!",
                            "G’night, Hailey. See you at training tomorrow",
                            "G’night, Hailey. See you at training tomorrow"
                        ], 
                        waitingTime: null,
                        typingTime: null,
                        choicePath: "hailey~mobileImportants~0013-h-25",
                    },
                    {
                        id: 38, 
                        isFromHer: true,
                        text: [
                            "Yep!",
                            "Thanks, you’re such a cutie!",
                            "Yep!",
                            "Yep!"
                        ], 
                        waitingTime: 3,
                        typingTime: [1, 3, 1, 1],
                        choicePath: "hailey~mobileImportants~0013-h-25",
                    },
                    {
                        id: 39, 
                        isFromHer: true,
                        text: [
                            "Bye!😙",
                            "But I gotta go now… see you at training tomorrow. Bye!😘",
                            "Bye!😙",
                            "Bye!😙"
                        ], 
                        waitingTime: 2,
                        typingTime: [1, 5, 1, 1],
                        choicePath: "hailey~mobileImportants~0013-h-25",
                        canSpeedUp: [true, "00:25"]
                    }
                ],
            }
        }
    },
];
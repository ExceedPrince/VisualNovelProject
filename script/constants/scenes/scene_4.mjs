export const scene_4 = [
    { sceneId: "0000" }, //storyScene: 0000
    { sceneId: "0001" }, //storyScene: 0001
    { sceneId: "0002" }, //storyScene: 0002
    { sceneId: "0003" }, //storyScene: 0003
    {
		sceneId: "0004",
        startTime: "11:20",
        endTime: "12:20",
        nextStoryScene: "0005",
        keepOut: ['Lindsay Lawrie'],
        bgMusic: {
            name: 'Mobile_daily_normal',
            command: 'START',
        },
		textingPartner: {
            Daena: {
                isMandatory: true,
                sheStartsAt: "11:24",
                sheEndsAt: "12:16",
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
                        text: "R u here available?", 
                        waitingTime: 1,
                        typingTime: 1.5,
                    },
                    {
                        id: 2, 
                        isFromHer: false, 
                        text: "Hey Daena, yep, I'm here. What's up?", 
                        waitingTime: null,
                        typingTime: null,
                    },
                    {
                        id: 3, 
                        isFromHer: true, 
                        text: "If u don't mind, I'd like to meet u after school today 🥺", 
                        waitingTime: 3,
                        typingTime: 2,
                    },
                    {
                        id: 4, 
                        isFromHer: false, 
                        text: "I'm actually free, but what's this about?", 
                        waitingTime: null,
                        typingTime: null,
                    },
                    {
                        id: 5, 
                        isFromHer: true, 
                        text: "Ur probs not gonna like this...", 
                        waitingTime: 4,
                        typingTime: 1.5,
                    },
                    {
                        id: 6, 
                        isFromHer: true, 
                        text: "But I've decided I'm gonna quit training 😫", 
                        waitingTime: 2,
                        typingTime: 2,
                    },
                    {
                        id: 7, 
                        isFromHer: false, 
                        text: "Whoa... didn't see that coming...😮", 
                        waitingTime: null,
                        typingTime: null,
                    },
                    {
                        id: 8, 
                        isFromHer: false, 
                        text:"But what's wrong? Why did u decide this?", 
                        waitingTime: null,
                        typingTime: null,
                    },
                    {
                        id: 9, 
                        isFromHer: true, 
                        text: "That's exactly what I wanna talk to u about in person", 
                        waitingTime: 4,
                        typingTime: 2.5,
                    },
                    {
                        id: 10, 
                        isFromHer: true, 
                        text: "Is that ok?🙏", 
                        waitingTime: 1.5,
                        typingTime: 1,
                    },
                    {
                        id: 11, 
                        isFromHer: false, 
                        text: "Sure. Just tell me where and when to meet", 
                        waitingTime: null,
                        typingTime: null,
                    },
                    {
                        id: 12, 
                        isFromHer: true, 
                        text: "After my next class ends, I'll send u all the deets", 
                        waitingTime: 3,
                        typingTime: 3,
                    },
                    {
                        id: 13, 
                        isFromHer: false, 
                        text: "Sounds good, I'll be on standby", 
                        waitingTime: null,
                        typingTime: null,
                    },
                    {
                        id: 14, 
                        isFromHer: true, 
                        text: "thx👍", 
                        waitingTime: 3,
                        typingTime: 1,
                    },
                    {
                        id: 15, 
                        isFromHer: true, 
                        text: "ttyl", 
                        waitingTime: 2,
                        typingTime: 1,
                    },
                ]
            }
        }
    },
];
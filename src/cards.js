export default [
//https://humsstel.github.io/tel_cards/#
    //TODO , responsiveness for Mobile. look at url --?? Ask Chris
    //ToDO, blogs.bath.ac.uk/exchange and litebox
    {
        id: "peer-assessment",
        name: "Peer Assessment",
        default: true,
        url: "https://computingservices.sharepoint.com/:b:/s/TELTeam/BAU/EavfD7zlSohCjjXftoOWVjoBWm1MuMbKMerHYJ8VvzmQiQ",
        tagline: "Using Moodle Workshop so that students can provide formative feedback to their peers",
        description: "For the first time in their university experience, students submit a full lab report. Often they have no pre-university experience to prepare them for this type of assessment and some students were not sure if they understood the requirements for the assessment. They asked for a formative feedback opportunity before the first formal assessment, and the Workshop tool in Moodle was used to deliver this.",
        colour: "#bf6c2b",
        assets: {
            logo: {
                styles: "background-color: ##c6daf9; background-size: 20px; background-position: 50% 50%;",
                image: require('./img/icons/peer-assessment-icon.svg')
            },
            cover: {
                styles: "",
                image: require('./img/workshop_final_grades.png')
            }
        },
        activities: [
            "create",
            "check"
        ],
        uses: [
            "Formative Assessment",
            "Feedback"
        ],
        submitter: {
            name: "Yvonne Moore",
            title: "Learning Technologist"
        },
        videoURL: "https://www.youtube.com/embed/spPxDmPOjyQ",
        framework: {
            enhance: "Students can see different approaches  to the assessment. This helps them get  more familiar with how to approach it.",
            empower: "When students submitted their second  lab report (their first summative  assessment) the quality of submissions had significantly improved.",
            extend: "Unit evaluation showed that students’  understanding of the assessment  criteria and types of feedback had  improved.  The timeliness of feedback  also improved ."
        }
    },
    {
        id: "moodle-quiz-assessment",
        name: "Using Moodle Quiz for Assessment",
        default: true,
        //url: "https://drive.google.com/open?id=1y23VNPC5ELz7yM-xSzyC1-hDQKXnAGAD",
        url: "https://drive.google.com/open?id= ",

        tagline: "E-assessment for a first year design unit in Mechanical Engineering",
        description: "The introduction of the Moodle quiz allows understanding of key concepts to be assessed at an earlier stage in the unit. This provides a suitable assessment method for the core knowledge introduced as a foundation in Semester 1. Separately assessing knowledge of key concepts via the Moodle quiz means that the assessment criteria for the additional portfolio assessment could be refined and focussed. The quiz enables knowledge which wasn’t previously assessed within the portfolio to be assessed.",
        colour: "#ec640e",
        assets: {
            logo: {
                styles: "background-color: ##c6daf9; background-size: 20px; background-position: 50% 50%;",
                image: require('./img/icons/moodle-quiz-icon.svg')
            },
            cover: {
                styles: "",
                image: require('./img/quizscore0.png')
            }
        },
        activities: [
            "check"
        ],
        uses: [
            "Assessment",
            "Feedback"
        ],
        submitter: {
            name: "Yvonne Moore",
            title: "Learning Technologist , Engineering & Design, Mechanical Engineering"
        },
        videoURL: "https://www.youtube.com/embed/uteBW0V9tZs",
        framework: {
            enhance: "The overall assessment load is now better balanced for students. The quiz assessment takes place earlier in the semester, to give students an indication of progress",
            empower: "The quiz assessment helps students to break down and identify key concepts. They can recognise such concepts as they arise in subsequent lectures",
            extend: "You can build up question banks and randomise the order of questions"
        }
    },
    {
        id: "enhancing-moodle-course",
        name: "Enhancing Moodle Courses with a Template",
        default: true,
        url: "https://bit.ly/2ExAON3",
        tagline: "Adding structure to a programme of Moodle courses",
        description: "In response to student feedback some additional provision in Moodle was identified. The Moodle courses across a programme were used most often as a repository for lecture slides and handbooks. With support from faculty programme officers and a learning technologist, the Moodle courses across the programme were reviewed and a template was applied in order to add some consistent structure, which would be helpful for staff, but specifically provide enhanced provision for students.",
        colour: "#bf6c2b",
        assets: {
            logo: {
                styles: "background-color: #c6daf9; background-size: 20px; background-position: 50% 50%;",
                image: require('./img/moodle_logo.png')
            },
            cover: {
                styles: "",
                image: require('./img/quizscore0.png')
            }
        },
        activities: [
            "check"
        ],
        uses: [
            "Assessment",
            "Feedback"
        ],
        submitter: {
            name: "Yvonne Moore",
            title: "Learning Technologist , Engineering & Design, Mechanical Engineering"
        },
        videoURL: "",
        framework: {
            enhance: "The overall assessment load is now better balanced for students. The quiz assessment takes place earlier in the semester, to give students an indication of progress",
            empower: "The quiz assessment helps students to break down and identify key concepts. They can recognise such concepts as they arise in subsequent lectures",
            extend: "You can build up question banks and randomise the order of questions"
        }
    },
    {
        id: "video-demo-and-support",
        name: "Video demonstration and support",
        default: true,
        url: "https://drive.google.com/file/d/1ZzJJhFRGYJ6u4TwwM9uBOQ4-F3Z2kicw/view?usp=sharing",
        tagline: "Teaching concepts through video demonstration",
        description: "This case looks at the use of video demonstration, recorded using Panopto, to provide a detailed explanation of what was required during an assessment, cutting down the need for repeated email and discussion forum questions, where students found it hard to articulate their difficulties. The lecturer aims to provide a more personal explanation for students, enabling them to revisit the video as many times as they need.",
        colour: "#14773e",
        assets: {
            logo: {
                styles: "background-color: ##c6daf9; background-size: 20px; background-position: 50% 50%;",
                image: require('./img/icons/panopto_icon.png')
            },
            cover: {
                styles: "",
                image: require('./img/quizscore0.png')
            }
        },
        activities: [
            "check",
            "create"
        ],
        uses: [
            "Presentations",
            "Feedback",
            "Demonstration"
        ],
        submitter: {
            name: "Yvonne Moore",
            title: "Learning Technologist , Engineering & Design, Mechanical Engineering"
        },
        videoURL: "https://www.youtube.com/embed/03Ub13mitIc",
        framework: {
            enhance: "Videos can be reviewed as many times as the student needs to gain understanding.",
            empower: "Students can take time to reflect on their understanding and identify areas of weakness more effectively.",
            extend: "Students requested more videos to support difficult concepts."
        }
    },
    {
        id: "rubric-assessment",
        name: "Using a rubric for open ended assessment",
        default: true,
        url: "https://drive.google.com/file/d/14Sgam6usM91dO7GNq7zA02qXJaqoVo7d/view?usp=sharing",
        tagline: "Advanced features of Moodle Assignment",
        description: "A rubric is a set of criteria to show students what is expected of them in an assessment. It takes the form of a series of criteria or learning objectives, and a description of the quality standards which the assessor will use when evaluating the student’s work. Here we look at how a rubric is used to ensure marking is consistent and objective.",
        colour: "#bf6c2b",
        assets: {
            logo: {
                styles: "background-color: ##c6daf9; background-size: 20px; background-position: 50% 50%;",
                image: require('./img/moodle_logo.png')
            },
            cover: {
                styles: "",
                image: ''
            }
        },
        activities: [
            "check"
        ],
        uses: [
            "Feedback"
        ],
        submitter: {
            name: "Yvonne Moore",
            title: "Learning Technologist , Engineering & Design, Mechanical Engineering"
        },
        videoURL: "",
        framework: {
            enhance: "Marking with a rubric brings coherence and consistency to marking, ensuring fairness.",
            empower: "Providing the rubric to students in advance supports them in approaching the assessment.",
            extend: "Discussions with students about feedback were more valuable – students asked more relevant questions and thought about how to turn feedback into feed forward."
        }
    },
]
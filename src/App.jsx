import React, { useEffect, useMemo, useState, useCallback } from "react";

import {
  AlertTriangle, Award, BarChart3, BookOpen, Brain, CalendarDays,
  CheckCircle2, ChevronDown, ChevronRight, ChevronUp, ClipboardCheck,
  ClipboardList, Clock, Compass, Download, FileText, Filter, Flame,
  GraduationCap, HeartPulse, Lightbulb, LineChart, Megaphone, Search,
  ShieldCheck, Sparkles, Target, Trophy, Users, ArrowRight, Star,
  Zap, AlertCircle, CheckSquare,
} from "lucide-react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const EVENTS = [
  {
    id: "extemp-writing",
    name: "Extemporaneous Writing",
    category: "Leadership",
    priority: "A+",
    commitmentLevel: "Serious",
    chapterFit: "Elite Wheeler target",
    track: "Writing, Policy, and Fast Thinking",
    format: "Individual writing",
    officialStyle: "Timed writing event. Verify exact prompt format, timing, and state procedures in the current guideline.",
    upload: "Usually no chapter portfolio. Verify state and ILC rules.",
    team: "Solo",
    difficulty: "Medium",
    gradeFit: "10th to 12th",
    time: 4,
    bestFor: ["writing", "policy", "fast thinking", "current events", "independent"],
    avoidIf: "You freeze under timed writing, refuse to read health news, or write five paragraphs of fog.",
    whyWheeler: "Wheeler already has evidence of strength here. This is the cleanest place to build a repeatable training system because it rewards structure, examples, and calm thinking rather than expensive equipment.",
    placementLogic: "High ceiling because many students can write, but fewer can write with policy examples, structure, and a practical recommendation under time pressure.",
    firstWeek: "Write one 30-minute response on a teen health issue. Use claim, evidence, counterpoint, recommendation, and closing.",
    nextSevenDays: [
      "Pick one teen health issue you can actually discuss, not just name.",
      "Write a 30-minute timed response using claim, evidence, counterpoint, recommendation, closing.",
      "Read one health policy article and write a 6-sentence summary.",
      "Start an example bank with 5 health topics you know something about.",
      "Ask an officer to score your writing using a simple rubric.",
      "Rewrite your weakest paragraph after feedback.",
      "Identify one gap in your health knowledge and read one article to fix it.",
    ],
    weeklyTraining: [
      "Read one health policy article and write a 6-sentence summary.",
      "Build an example bank: access, insurance, mental health, nutrition, technology, public health emergencies, rural health, school health.",
      "Complete one timed response every week by October.",
      "Have an officer score the response for structure, evidence, clarity, and recommendation.",
      "Rewrite the weakest paragraph after feedback.",
    ],
    evidence: ["Timed response folder", "Example bank", "Officer feedback log", "Before and after writing samples"],
    rubric: ["Clear thesis", "Relevant evidence", "Health policy understanding", "Practical recommendation", "Clean organization"],
    commonMistakes: ["Generic claims", "No concrete examples", "Weak ending", "Only explaining the problem, not solving it"],
    officerCoaching: "Run a weekly prompt drop. Give students 30 minutes, then grade with a simple 20-point rubric.",
  },
  {
    id: "medical-terminology",
    name: "Medical Terminology",
    category: "Health Science",
    priority: "A",
    commitmentLevel: "Low lift",
    chapterFit: "Best beginner test event",
    track: "Beginner Test Events",
    format: "Individual written test",
    officialStyle: "Written test event. Verify question count, timing, resources, and tiebreaker details in the current guideline.",
    upload: "No digital upload expected. Verify guideline.",
    team: "Solo",
    difficulty: "Low to Medium",
    gradeFit: "9th to 11th",
    time: 4,
    bestFor: ["memorization", "vocabulary", "science", "new member", "independent"],
    avoidIf: "You will not use flashcards consistently. This event rewards repetition, not hallway vibes.",
    whyWheeler: "It scales well. Officers can train a large group with flashcards, quizzes, and error logs.",
    placementLogic: "Students can become competitive if they master roots, prefixes, suffixes, and medical meaning instead of memorizing random terms like chaos goblins.",
    firstWeek: "Create 100 flashcards: 40 prefixes, 40 suffixes, 20 roots. Take a 30-question baseline quiz.",
    nextSevenDays: [
      "Create 40 prefix flashcards this week.",
      "Create 40 suffix flashcards.",
      "Add 20 root word flashcards.",
      "Take a 30-question baseline quiz to find your weak spots.",
      "Start a missed-term error log.",
      "Do 15 minutes of flashcard review daily.",
      "Practice decoding 10 unfamiliar medical words from their parts.",
    ],
    weeklyTraining: [
      "Study prefixes, suffixes, and roots before full terms.",
      "Use 15-minute daily flashcard sessions.",
      "Take one timed quiz each week.",
      "Keep an error log of missed roots and repeat them 48 hours later.",
      "Practice decoding unfamiliar words from parts, not guessing.",
    ],
    evidence: ["Flashcard count", "Weekly quiz scores", "Error log", "Final practice test trend"],
    rubric: ["Term decoding", "Spelling accuracy", "Body system terms", "Abbreviations", "Speed under time"],
    commonMistakes: ["Only memorizing definitions", "Ignoring word parts", "No timed practice", "Forgetting abbreviations"],
    officerCoaching: "Run a 20-question weekly quiz and leaderboard. Keep it friendly, unless the leaderboard becomes the only thing keeping civilization alive.",
  },
  {
    id: "behavioral-health",
    name: "Behavioral Health",
    category: "Health Science",
    priority: "A",
    commitmentLevel: "Serious",
    chapterFit: "Strong AP Psych pathway",
    track: "Psychology and Behavioral Health",
    format: "Individual written test",
    officialStyle: "For 2025-2026, the event summary lists a 50-question test in 60 minutes. Verify future guidelines.",
    upload: "No digital upload listed for 2025-2026. Verify guideline.",
    team: "Solo",
    difficulty: "Medium",
    gradeFit: "10th to 12th",
    time: 4,
    bestFor: ["psychology", "memorization", "reading", "health science", "independent"],
    avoidIf: "You think mental health is just common sense. It is not.",
    whyWheeler: "Wheeler has students who can handle psychology, health science, and reading-heavy material. This can be a strong test event lane.",
    placementLogic: "High scoring students will know definitions and apply concepts to situations instead of only recognizing vocabulary.",
    firstWeek: "Study 50 core terms around mental health, substance use, treatment settings, resilience, and support systems. Take a baseline quiz.",
    nextSevenDays: [
      "Build flashcards for 15 mental health disorder terms.",
      "Add 15 treatment and therapy vocabulary cards.",
      "Study 10 ethics and care setting terms.",
      "Take a 20-question baseline quiz.",
      "Write a one-sentence explanation for each missed term.",
      "Connect 5 concepts to real school or healthcare examples.",
      "Review official references from the guideline.",
    ],
    weeklyTraining: [
      "Build flashcards for disorders, symptoms, treatment, ethics, and care settings.",
      "Take one quiz each week and mark missed concepts.",
      "Write a one-sentence explanation for each missed term.",
      "Connect concepts to school, family, and healthcare examples.",
      "Review official references from the guideline, not random internet soup.",
    ],
    evidence: ["Term bank", "Quiz scores", "Missed concept explanations", "Practice test trend"],
    rubric: ["Vocabulary", "Concept application", "Ethics", "Treatment and support", "Test timing"],
    commonMistakes: ["Memorizing shallow definitions", "Mixing up similar disorders", "Ignoring ethics", "No review of missed questions"],
    officerCoaching: "Pair this with AP Psych students and run mental health vocabulary rounds during meetings.",
  },
  {
    id: "medical-math",
    name: "Medical Math",
    category: "Health Science",
    priority: "A-",
    commitmentLevel: "Serious",
    chapterFit: "STEM precision event",
    track: "Math and Healthcare Accuracy",
    format: "Individual written test",
    officialStyle: "Written test style event. Verify allowed tools, formulas, question count, and timing in the current guideline.",
    upload: "No digital upload expected. Verify guideline.",
    team: "Solo",
    difficulty: "Medium",
    gradeFit: "9th to 12th",
    time: 4,
    bestFor: ["math", "accuracy", "units", "test taking", "independent"],
    avoidIf: "You skip units. That is how tiny arithmetic errors become large medical disasters.",
    whyWheeler: "Wheeler has STEM students. Medical Math turns that into a HOSA advantage if students train carefully.",
    placementLogic: "Competitors separate themselves by avoiding careless mistakes, showing unit logic, and practicing under time pressure.",
    firstWeek: "Complete 40 unit conversions and 15 dosage-style problems. Every line must show units.",
    nextSevenDays: [
      "Drill 20 metric conversions and write every unit explicitly.",
      "Drill 20 household measure conversions.",
      "Complete 15 dosage-style problems with full unit notation.",
      "Build an error log by calculation type.",
      "Retake the problem types you missed 48 hours later.",
      "Add a timer to your next practice set.",
      "Review what a rounding error looks like and how to catch it.",
    ],
    weeklyTraining: [
      "Drill metric, household, and dosage conversions.",
      "Write units through every calculation.",
      "Create an error log for calculation type, not just answer missed.",
      "Retake missed problem types 48 hours later.",
      "Practice with a timer by November.",
    ],
    evidence: ["Conversion drills", "Error log", "Practice set scores", "Timed test progress"],
    rubric: ["Units", "Accuracy", "Speed", "Dosage reasoning", "Calculator discipline"],
    commonMistakes: ["Unit drops", "Rounding errors", "Rushing", "Not rereading the question"],
    officerCoaching: "Make Medical Math a small weekly bootcamp. Five conversions at the start of every meeting works better than one giant panic packet.",
  },
  {
    id: "health-informatics",
    name: "Health Informatics",
    category: "Health Science",
    priority: "A-",
    commitmentLevel: "Serious",
    chapterFit: "Tech and data lane",
    track: "Healthcare Data and Systems",
    format: "Individual written test",
    officialStyle: "Written test event. Verify official reference materials and timing.",
    upload: "No digital upload expected. Verify guideline.",
    team: "Solo",
    difficulty: "Medium",
    gradeFit: "10th to 12th",
    time: 4,
    bestFor: ["technology", "data", "systems", "reading", "independent"],
    avoidIf: "You only like coding and refuse to learn healthcare vocabulary. Computers do not magically care about HIPAA for you.",
    whyWheeler: "This fits Magnet and STEM students who want a healthcare plus technology event.",
    placementLogic: "Strong if students learn electronic health records, privacy, data quality, interoperability, and healthcare decision support.",
    firstWeek: "Create a 50-term glossary on EHRs, privacy, healthcare data, interoperability, and clinical decision support.",
    nextSevenDays: [
      "Build a 15-term EHR vocabulary list.",
      "Add 15 privacy and HIPAA terms.",
      "Add 20 data quality and interoperability terms.",
      "Take a short quiz on what you built.",
      "Write two mini case explanations: what data is collected, who uses it, what risk exists.",
      "Review missed terms until you can explain them without notes.",
      "Find one real-world EHR example to connect to your vocabulary.",
    ],
    weeklyTraining: [
      "Study informatics vocabulary weekly.",
      "Review privacy, security, and healthcare data examples.",
      "Take a short quiz every week.",
      "Build mini case explanations.",
      "Review missed terms until you can explain them without reading notes.",
    ],
    evidence: ["Glossary", "Mini cases", "Quiz scores", "Privacy concept map"],
    rubric: ["Vocabulary", "Data systems", "Privacy", "Use cases", "Test timing"],
    commonMistakes: ["Treating it as generic computer science", "Ignoring healthcare context", "Weak privacy knowledge"],
    officerCoaching: "Recruit CS and data interested students. This event gives them a healthcare reason to exist besides saying AI every six seconds.",
  },
  {
    id: "world-health",
    name: "World Health and Disparities",
    category: "Health Science",
    priority: "A-",
    commitmentLevel: "Serious",
    chapterFit: "Global health and policy lane",
    track: "Global Health, Equity, and Policy",
    format: "Individual written test",
    officialStyle: "Written test event. Verify references, question count, and timing in current guideline.",
    upload: "No digital upload expected. Verify guideline.",
    team: "Solo",
    difficulty: "Medium",
    gradeFit: "10th to 12th",
    time: 4,
    bestFor: ["global health", "policy", "reading", "systems", "independent"],
    avoidIf: "You want memorization without understanding systems. Global health is causes, consequences, and tradeoffs.",
    whyWheeler: "Wheeler students with global, policy, language, and health interests can turn this into a distinctive HOSA lane.",
    placementLogic: "Strong competitors connect income, geography, access, infrastructure, disease burden, and prevention.",
    firstWeek: "Write a one-page issue brief on one global health disparity. Include cause, affected group, consequence, and intervention.",
    nextSevenDays: [
      "Pick one global health disparity you can discuss in depth.",
      "Write a one-page issue brief: cause, affected group, consequence, intervention.",
      "Build a vocabulary list of 20 global health terms.",
      "Find one WHO or CDC report related to your chosen disparity.",
      "Take a short quiz on global health vocabulary.",
      "Write four boxes for a second disparity: cause, impact, intervention, evidence.",
      "Connect your example to a health equity concept.",
    ],
    weeklyTraining: [
      "Study global health vocabulary.",
      "Make weekly issue briefs on disparities.",
      "Connect causes to measurable outcomes.",
      "Practice quizzes from official references.",
      "Track examples from credible health organizations.",
    ],
    evidence: ["Issue brief folder", "Term list", "Quiz scores", "Example bank"],
    rubric: ["Terms", "Systems thinking", "Health equity", "Global examples", "Test timing"],
    commonMistakes: ["Only memorizing facts", "No cause and effect", "Weak examples", "Confusing equity with equality"],
    officerCoaching: "Assign one weekly global health issue. Students summarize it in four boxes: cause, impact, intervention, evidence.",
  },
  {
    id: "prepared-speaking",
    name: "Prepared Speaking",
    category: "Leadership",
    priority: "A-",
    commitmentLevel: "Serious",
    chapterFit: "Polished speaker lane",
    track: "Speaking and Leadership",
    format: "Individual speech",
    officialStyle: "Prepared speech event. Verify annual topic, time limit, judge rubric, and current guidelines.",
    upload: "No digital upload expected. Verify guideline.",
    team: "Solo",
    difficulty: "Medium",
    gradeFit: "9th to 12th",
    time: 3,
    bestFor: ["speaking", "writing", "confidence", "delivery", "independent"],
    avoidIf: "You think being good at talking equals being prepared. It does not. It just means your mistakes will be louder.",
    whyWheeler: "Low logistics and very trainable. A disciplined speaker can improve quickly with feedback and repetition.",
    placementLogic: "Strong competitors sound natural, structured, and emotionally controlled. They do not read at judges like the room owes them money.",
    firstWeek: "Write a speech outline with opening, two main points, personal or health example, and closing.",
    nextSevenDays: [
      "Write a speech outline: opening, two main points, personal/health example, closing.",
      "Record a rough first run. Watch it back without cringing.",
      "Cut any filler or repetition from your draft.",
      "Practice with a real person watching you.",
      "Fix one delivery issue: pacing, eye contact, or pausing.",
      "Run the speech again and time it.",
      "Practice without your script for the first time.",
    ],
    weeklyTraining: [
      "Draft and cut the speech until it sounds human.",
      "Record two practice runs weekly.",
      "Fix pacing, eye contact, pauses, and gestures.",
      "Practice with distractions and no script.",
      "Run one mock judging round every two weeks by January.",
    ],
    evidence: ["Draft versions", "Practice recordings", "Feedback sheets", "Mock judging scores"],
    rubric: ["Topic fit", "Structure", "Delivery", "Confidence", "Time control"],
    commonMistakes: ["Sounding memorized", "Weak opening", "Rushing", "No emotional arc"],
    officerCoaching: "Create a speaking circle. Students perform 60 seconds each meeting before full speeches begin.",
  },
  {
    id: "health-education",
    name: "Health Education",
    category: "Teamwork",
    priority: "A+",
    commitmentLevel: "Only for locked-in teams",
    chapterFit: "Flagship team event",
    track: "Teaching, Outreach, and Evidence",
    format: "Team portfolio and presentation",
    officialStyle: "For 2025-2026, Health Education is listed as a team event with 2 to 6 competitors and a presentation round. Verify current state and ILC rules.",
    upload: "Portfolio requirements may apply. Verify digital upload and state deadlines.",
    team: "2 to 6 competitors",
    difficulty: "Medium",
    gradeFit: "9th to 12th",
    time: 5,
    bestFor: ["teamwork", "teaching", "speaking", "design", "public health"],
    avoidIf: "Your team cannot meet weekly. Team events punish flaky optimism, as they should.",
    whyWheeler: "Perfect for a rebuilding chapter because it creates visible school impact, a portfolio, and a presentation product.",
    placementLogic: "Competitive teams teach a real audience, measure learning, and show evidence clearly.",
    firstWeek: "Pick one target audience and one health objective. Draft a pre and post survey with five questions.",
    nextSevenDays: [
      "Choose one health topic and one specific target audience.",
      "Write one measurable learning objective for your lesson.",
      "Draft a 5-question pre-survey.",
      "Sketch a lesson outline: hook, content, activity, summary.",
      "Assign team roles: presenter, designer, data tracker, timekeeper.",
      "Create a draft of one slide or handout.",
      "Plan when and where you will deliver the first real lesson.",
    ],
    weeklyTraining: [
      "Choose a focused health topic.",
      "Define what the audience should know or do after the lesson.",
      "Create a short lesson, slides, handout, and survey.",
      "Teach the lesson to a real audience and collect results.",
      "Build a portfolio with objective, lesson plan, photos, data, and reflection.",
    ],
    evidence: ["Lesson plan", "Slides", "Pre and post survey", "Photos", "Attendance count", "Portfolio"],
    rubric: ["Instructional objective", "Audience fit", "Lesson quality", "Evaluation data", "Team presentation"],
    commonMistakes: ["Topic too broad", "No data", "Slides overloaded", "One person does all the speaking"],
    officerCoaching: "Assign each team a checkpoint: topic, lesson plan, first delivery, data, portfolio, mock presentation.",
  },
  {
    id: "community-awareness",
    name: "Community Awareness",
    category: "Teamwork",
    priority: "A+",
    commitmentLevel: "Only for locked-in teams",
    chapterFit: "Best chapter visibility event",
    track: "Campaign, Outreach, and Impact",
    format: "Team campaign, portfolio, and presentation",
    officialStyle: "For 2025-2026, Community Awareness is listed as a team event with 2 to 6 competitors, pre-judged portfolio PDF, digital upload, and presentation. Verify future rules.",
    upload: "Yes for 2025-2026 ILC portfolio. Verify state and ILC digital upload rules.",
    team: "2 to 6 competitors",
    difficulty: "Medium",
    gradeFit: "9th to 12th",
    time: 5,
    bestFor: ["teamwork", "outreach", "design", "speaking", "public health"],
    avoidIf: "You plan to make three posters and call it a campaign. A hallway poster is not a public health intervention.",
    whyWheeler: "This can grow membership, impress admin, and build a real competition portfolio at the same time.",
    placementLogic: "The strongest teams show a local issue, a campaign plan, real outreach, and measurable evidence.",
    firstWeek: "Pick one school health issue. Define audience, campaign goal, two outreach actions, and what data will prove impact.",
    nextSevenDays: [
      "Pick one school health or safety issue your team genuinely cares about.",
      "Define your target audience precisely.",
      "Write one measurable campaign goal.",
      "Plan two outreach actions you can actually execute.",
      "Decide what data you will collect to prove impact.",
      "Assign team roles: project lead, designer, data tracker, speaker.",
      "Draft a campaign timeline with weekly checkpoints.",
    ],
    weeklyTraining: [
      "Choose one local health or safety issue.",
      "Plan campaign actions: booth, announcement, QR survey, advisory lesson, poster, social post, speaker visit.",
      "Collect proof: photos, scans, attendance, survey responses, teacher confirmations.",
      "Build portfolio sections weekly.",
      "Practice a story-based presentation: problem, action, evidence, impact, next step.",
    ],
    evidence: ["Campaign plan", "Survey data", "Photos", "QR analytics", "Portfolio PDF", "Presentation script"],
    rubric: ["Community need", "Campaign planning", "Reach", "Impact evidence", "Presentation clarity"],
    commonMistakes: ["No measurable goal", "Weak portfolio organization", "No local need", "Generic awareness without action"],
    officerCoaching: "Use this as the chapter flagship. One strong campaign can double as recruiting, service, and competition prep.",
  },
  {
    id: "public-health",
    name: "Public Health",
    category: "Teamwork",
    priority: "A",
    commitmentLevel: "High commitment",
    chapterFit: "High ceiling team event",
    track: "Public Health, Data, and Presentation",
    format: "Team project, video trailer, and presentation",
    officialStyle: "For 2025-2026, Public Health includes a Round One video trailer and a Round Two in-person presentation for advancing teams. Verify current annual topic and rules.",
    upload: "Video or materials may require upload. Verify state and ILC deadlines.",
    team: "Team event, verify exact team size in guideline",
    difficulty: "High",
    gradeFit: "10th to 12th",
    time: 6,
    bestFor: ["teamwork", "public health", "research", "data", "speaking"],
    avoidIf: "Your team only wants to make Canva slides. Pretty slides without data are just laminated sadness.",
    whyWheeler: "Strong for students who can combine health research, data, video, and presentation skills.",
    placementLogic: "Teams advance when the trailer hooks judges and the full presentation shows evidence, not vague concern.",
    firstWeek: "Read the annual topic guideline. Create a one-page problem brief with audience, cause, evidence, and possible action.",
    nextSevenDays: [
      "Read the official annual topic guideline completely.",
      "Write a one-page problem brief: audience, cause, evidence, possible action.",
      "Create a simple survey or awareness measure.",
      "Assign team roles: researcher, writer, video lead, presenter.",
      "Sketch a storyboard for the video trailer.",
      "Identify three credible sources to support your topic.",
      "Write five potential judge questions and draft answers.",
    ],
    weeklyTraining: [
      "Study the official annual topic deeply.",
      "Create a survey or simple awareness measure.",
      "Develop a clear intervention or education plan.",
      "Storyboard the video trailer early.",
      "Practice judge questions on evidence, ethics, and impact.",
    ],
    evidence: ["Topic brief", "Survey", "Video storyboard", "Presentation deck", "Q and A practice sheet"],
    rubric: ["Topic understanding", "Data", "Video hook", "Presentation quality", "Judge responses"],
    commonMistakes: ["Trailer feels random", "No evidence", "Weak team roles", "Presentation too broad"],
    officerCoaching: "Only allow serious teams. Public Health should have weekly deadlines and a team captain.",
  },
  {
    id: "mental-health-promotion",
    name: "Mental Health Promotion",
    category: "Teamwork",
    priority: "A-",
    commitmentLevel: "High commitment",
    chapterFit: "Relevant school impact event",
    track: "Mental Health, Campaign, and Social Media",
    format: "Team campaign and presentation",
    officialStyle: "Team event focused on mental health needs and a campaign. Verify current rules, required platforms, and upload materials.",
    upload: "Likely digital materials. Verify guideline.",
    team: "Team event, verify size in guideline",
    difficulty: "Medium",
    gradeFit: "9th to 12th",
    time: 5,
    bestFor: ["teamwork", "psychology", "public health", "design", "speaking"],
    avoidIf: "You cannot handle mental health topics respectfully. This event needs care, not performative positivity confetti.",
    whyWheeler: "Mental health is relevant to high school students and can be handled with surveys, resources, and a serious awareness campaign.",
    placementLogic: "Strong if the team identifies a real student need and creates a responsible campaign with evidence.",
    firstWeek: "Identify one mental health risk or protective factor at school. Draft a respectful survey and resource list.",
    nextSevenDays: [
      "Identify one mental health risk or protective factor at your school.",
      "Research three evidence-based mental health resources.",
      "Draft a respectful 5-question survey with advisor approval.",
      "Create a resource list for students.",
      "Assign team roles: researcher, designer, outreach lead, speaker.",
      "Build a campaign concept: what message, what action, what evidence.",
      "Write a sensitivity review checklist for all your materials.",
    ],
    weeklyTraining: [
      "Define the mental health need carefully.",
      "Collect anonymous, appropriate student input if approved.",
      "Build a campaign with resources, not just slogans.",
      "Create evidence of reach and learning.",
      "Practice explaining ethics and sensitivity.",
    ],
    evidence: ["Need statement", "Resource list", "Campaign posts", "Survey results", "Presentation"],
    rubric: ["Need identification", "Campaign quality", "Ethics", "Evidence", "Presentation"],
    commonMistakes: ["Oversimplifying mental health", "No resources", "Insensitive language", "No measurable impact"],
    officerCoaching: "Coordinate with counselor or advisor before surveys or public messaging.",
  },
  {
    id: "psa",
    name: "Public Service Announcement",
    category: "Teamwork",
    priority: "B+",
    commitmentLevel: "High commitment",
    chapterFit: "Video and media lane",
    track: "Media, Advocacy, and Communication",
    format: "Team video and presentation materials",
    officialStyle: "PSA requirements can include annual topic-specific materials or training certificates. Verify the current guideline carefully.",
    upload: "Digital upload likely. Verify requirements early.",
    team: "Team event, verify size in guideline",
    difficulty: "Medium",
    gradeFit: "9th to 12th",
    time: 5,
    bestFor: ["teamwork", "design", "speaking", "public health", "creativity"],
    avoidIf: "You want to film once on a phone in bad hallway lighting and declare cinema restored.",
    whyWheeler: "Good if the chapter has students who can write, film, edit, and meet deadlines.",
    placementLogic: "The best teams make a focused message, clean visuals, and evidence-based health communication.",
    firstWeek: "Read the topic guideline. Write a 30-second concept script and list shots needed.",
    nextSevenDays: [
      "Read the official PSA topic guideline and required materials list.",
      "Write a 30-second concept script with one clear message.",
      "Storyboard every shot before you film anything.",
      "Test your audio setup and find a quiet filming location.",
      "Check if the guideline requires training certificates and get them.",
      "Film a rough first cut.",
      "Watch it back and make a list of what needs fixing.",
    ],
    weeklyTraining: [
      "Study the annual PSA topic and required materials.",
      "Write a tight script with one message.",
      "Storyboard before filming.",
      "Film clean audio and lighting.",
      "Get feedback before final export.",
    ],
    evidence: ["Script", "Storyboard", "Video draft", "Required certificates if any", "Final upload checklist"],
    rubric: ["Message clarity", "Accuracy", "Video quality", "Audience fit", "Deadline compliance"],
    commonMistakes: ["Too many messages", "Bad audio", "No call to action", "Missing required uploads"],
    officerCoaching: "Set an internal upload deadline at least two weeks before any official deadline.",
  },
  {
    id: "medical-innovation",
    name: "Medical Innovation",
    category: "Teamwork",
    priority: "B+",
    commitmentLevel: "High commitment",
    chapterFit: "STEM innovation showcase",
    track: "Innovation, Design, and Healthcare Problems",
    format: "Team pitch and prototype concept",
    officialStyle: "Team event. Verify product requirements, presentation rules, and allowed materials in current guideline.",
    upload: "May require materials depending on level. Verify guideline.",
    team: "Team event, verify size in guideline",
    difficulty: "Medium to High",
    gradeFit: "10th to 12th",
    time: 6,
    bestFor: ["teamwork", "technology", "design", "creativity", "speaking"],
    avoidIf: "Your invention is just an app that reminds people to drink water. Society has suffered enough notification-based innovation.",
    whyWheeler: "Fits Magnet students who want a more distinctive competition story.",
    placementLogic: "Strong teams solve a real healthcare problem and explain feasibility, user need, and impact.",
    firstWeek: "List five healthcare problems. Pick one with a real user and a simple prototype path.",
    nextSevenDays: [
      "List five healthcare problems that actually affect real people.",
      "Pick the one with the clearest user and simplest prototype path.",
      "Write a one-sentence problem statement.",
      "Sketch a rough prototype, workflow, or mockup.",
      "Research two existing solutions and explain why yours is different.",
      "Write a short feasibility argument: why is this buildable.",
      "Practice a 3-minute pitch: problem, solution, impact.",
    ],
    weeklyTraining: [
      "Interview or observe potential users when appropriate.",
      "Define the problem in one sentence.",
      "Sketch a prototype, workflow, or mockup.",
      "Compare to existing solutions.",
      "Practice a 3-minute problem, solution, impact pitch.",
    ],
    evidence: ["Problem statement", "User notes", "Prototype sketch", "Competitive comparison", "Pitch deck"],
    rubric: ["Problem clarity", "Innovation", "Feasibility", "Healthcare relevance", "Presentation"],
    commonMistakes: ["No real user", "Too broad", "No prototype logic", "Weak feasibility"],
    officerCoaching: "Connect students with STEM teachers, engineering clubs, or local health professionals for feedback.",
  },
  {
    id: "hosa-bowl",
    name: "HOSA Bowl",
    category: "Teamwork",
    priority: "B",
    commitmentLevel: "Only for locked-in teams",
    chapterFit: "Only for serious quiz team",
    track: "Quiz Team and Broad HOSA Knowledge",
    format: "Four-person quiz-style team",
    officialStyle: "HOSA Bowl uses a team format and competition rounds. Verify written round, buzzer round, team size, and rules in current guideline.",
    upload: "No digital upload expected. Verify guideline.",
    team: "Four competitors",
    difficulty: "High",
    gradeFit: "10th to 12th",
    time: 5,
    bestFor: ["teamwork", "memorization", "speed", "science", "current events"],
    avoidIf: "The team cannot meet weekly. A non-practicing HOSA Bowl team is just four people entering a room to discover consequences.",
    whyWheeler: "Could work if Wheeler builds one elite team, not six casual teams.",
    placementLogic: "Needs broad knowledge, speed, rules familiarity, and team trust.",
    firstWeek: "Form a serious four-person team. Run a baseline quiz and assign topic owners.",
    nextSevenDays: [
      "Form your four-person team intentionally, not just by proximity.",
      "Run a baseline quiz on health science, HOSA facts, and current health events.",
      "Assign topic ownership: each person owns one domain.",
      "Review HOSA Bowl competition rules and buzzer protocol.",
      "Do your first 10-question practice round with the full team.",
      "Debrief: what did each person miss and why.",
      "Set a non-negotiable weekly practice time.",
    ],
    weeklyTraining: [
      "Assign health science, HOSA facts, current health, and rules topics.",
      "Practice buzzer timing weekly.",
      "Run mock rounds twice per month.",
      "Review missed questions as a team.",
      "Rotate captain duties so everyone learns pace control.",
    ],
    evidence: ["Team roster", "Topic assignments", "Mock round scores", "Missed question bank"],
    rubric: ["Speed", "Breadth", "Rules knowledge", "Team communication", "Accuracy"],
    commonMistakes: ["No topic assignments", "Only one strong player", "No buzzer practice", "Panic guessing"],
    officerCoaching: "Make tryouts for this. Friendly exclusivity is better than a doomed open roster.",
  },
  {
    id: "biomedical-debate",
    name: "Biomedical Debate",
    category: "Teamwork",
    priority: "B",
    commitmentLevel: "High commitment",
    chapterFit: "Debate and research lane",
    track: "Debate, Evidence, and Ethics",
    format: "Team debate",
    officialStyle: "Debate event. Verify annual topic, team rules, debate format, and evidence expectations.",
    upload: "No digital upload expected unless current guideline says otherwise.",
    team: "Team event, verify size in guideline",
    difficulty: "High",
    gradeFit: "10th to 12th",
    time: 5,
    bestFor: ["teamwork", "policy", "speaking", "research", "fast thinking"],
    avoidIf: "You can argue loudly but cannot use evidence. That is not debate, that is a family dinner with worse lighting.",
    whyWheeler: "Strong if Wheeler has students who like ethics, medicine, law, and argument.",
    placementLogic: "Teams need evidence files, pro and con cases, rebuttal practice, and calm delivery.",
    firstWeek: "Read the topic. Build a pro and con evidence table with five sources on each side.",
    nextSevenDays: [
      "Read the official debate topic completely.",
      "Build a pro-side evidence table with five sources.",
      "Build a con-side evidence table with five sources.",
      "Write a 2-minute opening statement for one side.",
      "Practice three rebuttals for the strongest arguments you expect.",
      "Run a 10-minute timed mock round.",
      "Assign team roles: opener, rebuttal, evidence keeper.",
    ],
    weeklyTraining: [
      "Create evidence files for both sides.",
      "Write opening statements.",
      "Practice rebuttals and cross questions.",
      "Run timed mock debates.",
      "Assign one student to evidence organization.",
    ],
    evidence: ["Evidence file", "Opening drafts", "Rebuttal bank", "Mock debate notes"],
    rubric: ["Evidence", "Argument logic", "Rebuttal", "Team coordination", "Delivery"],
    commonMistakes: ["One-sided prep", "Weak citations", "Rambling rebuttals", "No role clarity"],
    officerCoaching: "Partner with debate students if available. This is not a casual event.",
  },
  {
    id: "forensic-science",
    name: "Forensic Science",
    category: "Emergency Preparedness",
    priority: "B",
    commitmentLevel: "High commitment",
    chapterFit: "Science Olympiad-style stretch",
    track: "Applied Science and Case Analysis",
    format: "Team test and case analysis",
    officialStyle: "Usually includes written testing and case-based work. Verify format, allowed materials, and references.",
    upload: "No digital upload expected. Verify guideline.",
    team: "Team event, verify size in guideline",
    difficulty: "High",
    gradeFit: "10th to 12th",
    time: 5,
    bestFor: ["teamwork", "science", "analysis", "details", "test taking"],
    avoidIf: "You like crime shows but not chemistry. Television has once again lied to the youth.",
    whyWheeler: "A good stretch event for serious STEM students if they practice cases and divide topics.",
    placementLogic: "Needs technical knowledge plus careful interpretation under time pressure.",
    firstWeek: "Divide forensic topics between partners and complete one practice case together.",
    nextSevenDays: [
      "Divide forensic science topics between partners: each person owns specific domains.",
      "Review official guideline references for your assigned topics.",
      "Complete one practice case together and compare reasoning.",
      "Build a missed-concept list from the practice case.",
      "Study diagrams, patterns, and lab-style reasoning for your topics.",
      "Run a 20-minute timed case analysis.",
      "Review what each partner got wrong and why.",
    ],
    weeklyTraining: [
      "Study forensic basics from official references.",
      "Divide evidence types by partner.",
      "Practice timed case analysis.",
      "Build a missed concept list.",
      "Review diagrams, patterns, and lab-style reasoning.",
    ],
    evidence: ["Topic assignments", "Case practice folder", "Error log", "Partner review notes"],
    rubric: ["Science knowledge", "Case reasoning", "Detail accuracy", "Team split", "Time control"],
    commonMistakes: ["One partner carries", "No case practice", "Overconfidence from TV", "Weak chemistry basics"],
    officerCoaching: "Recommend only for disciplined STEM pairs. Do not put random freshmen here unless they are unusually serious.",
  },
  {
    id: "health-career-display",
    name: "Health Career Display",
    category: "Health Professions",
    priority: "B+",
    commitmentLevel: "Low lift",
    chapterFit: "Rookie-friendly display event",
    track: "Career Exploration and Presentation",
    format: "Display and explanation",
    officialStyle: "Display event. Verify board/photo upload, career requirements, and judging rules in current guideline.",
    upload: "May require display photo or materials. Verify guideline.",
    team: "Verify if solo or team in guideline",
    difficulty: "Low to Medium",
    gradeFit: "9th to 10th",
    time: 3,
    bestFor: ["new member", "design", "speaking", "research", "career"],
    avoidIf: "You plan to make the display the night before with glue sticks and fear.",
    whyWheeler: "Good onboarding event for freshmen and sophomores who need a structured first competition.",
    placementLogic: "Clean research, neat display, and confident explanation can make this competitive.",
    firstWeek: "Choose one healthcare career. Research training, duties, work setting, skills, salary range, and future demand.",
    nextSevenDays: [
      "Choose one healthcare career you are genuinely curious about.",
      "Research training and education requirements.",
      "Research daily duties and work setting.",
      "Research salary range and job outlook.",
      "Sketch your display layout before designing it.",
      "Create one visual element with purpose, not decoration.",
      "Practice explaining the career out loud for 2 to 3 minutes.",
    ],
    weeklyTraining: [
      "Research one career deeply.",
      "Create a display outline before designing.",
      "Use visuals with purpose, not decoration panic.",
      "Practice explaining the career in 2 to 3 minutes.",
      "Check guideline for display requirements.",
    ],
    evidence: ["Career notes", "Display sketch", "Practice explanation", "Upload checklist"],
    rubric: ["Career accuracy", "Display clarity", "Visual quality", "Explanation", "Guideline compliance"],
    commonMistakes: ["Too much text", "No career depth", "Messy design", "Weak speaking"],
    officerCoaching: "Use this as a safe entry event for new members who are not ready for harder tests or campaigns.",
  },
];

const TRACKS = [
  {
    id: "rookie",
    name: "Rookie Starter Track",
    icon: GraduationCap,
    who: "New members, freshmen, sophomores, and students who want a clear first event.",
    events: ["Medical Terminology", "Health Career Display", "Behavioral Health"],
    weekly: ["Flashcards", "Short quizzes", "Officer check-in", "One small deliverable per week"],
    goal: "Get new members competing without throwing them into events that require equipment, advanced science, or supernatural confidence.",
  },
  {
    id: "writers",
    name: "Writing and Policy Track",
    icon: FileText,
    who: "Strong writers, AP Lang students, debate students, and policy-minded students.",
    events: ["Extemporaneous Writing", "Prepared Speaking", "Biomedical Debate", "World Health and Disparities"],
    weekly: ["Health article brief", "Timed writing", "Evidence bank", "Speaking drill"],
    goal: "Turn Wheeler's writing and argument students into SLC competitors.",
  },
  {
    id: "public-health",
    name: "Public Health Impact Track",
    icon: HeartPulse,
    who: "Students who like campaigns, outreach, design, teaching, and measurable school impact.",
    events: ["Health Education", "Community Awareness", "Public Health", "Mental Health Promotion", "PSA"],
    weekly: ["Campaign planning", "Survey data", "Portfolio building", "Presentation practice"],
    goal: "Make Wheeler HOSA visible at school while building competitive portfolios.",
  },
  {
    id: "stem",
    name: "STEM and Systems Track",
    icon: Brain,
    who: "STEM, data, medical science, and Science Olympiad-style students.",
    events: ["Medical Math", "Health Informatics", "Forensic Science", "Medical Innovation", "HOSA Bowl"],
    weekly: ["Practice problems", "Case analysis", "Prototype work", "Quiz rounds"],
    goal: "Give Wheeler's STEM students a specialized HOSA lane without pretending every event is equally realistic.",
  },
];

const SEASON = [
  { phase: "August", title: "Recruit and sort students", studentGoal: "Take the event finder and pick one main event.", officerGoal: "Run interest survey, assign tracks, collect emails, and publish practice schedule.", deliverables: ["Event interest form", "Track rosters", "Guideline reading confirmation", "First practice task"] },
  { phase: "September", title: "Baseline month", studentGoal: "Complete a baseline quiz, speech draft, writing prompt, or campaign plan.", officerGoal: "Identify serious competitors and remove impossible team combinations early.", deliverables: ["Baseline scores", "Team rosters", "Officer feedback", "Practice calendar"] },
  { phase: "October to November", title: "Skill build month", studentGoal: "Train weekly and produce evidence of progress.", officerGoal: "Run track sessions every meeting and start portfolios for team events.", deliverables: ["Quiz score trends", "Portfolio drafts", "Speech recordings", "Campaign evidence"] },
  { phase: "December to January", title: "Mock competition month", studentGoal: "Complete at least one full mock attempt.", officerGoal: "Rank readiness, help weak teams fix problems, and finalize event commitments.", deliverables: ["Mock round scores", "Revised event list", "Final team assignments", "Upload checklist"] },
  { phase: "February to SLC", title: "Polish and execute", studentGoal: "Finish final prep, upload required materials, and rehearse under pressure.", officerGoal: "Check every deadline and make sure no team discovers the rules in the parking lot.", deliverables: ["Final portfolio", "Final presentation", "Final practice test", "Registration and upload confirmation"] },
];

const CHECKLIST = [
  "I picked one main event and one backup event.",
  "I read the official guideline for my event.",
  "I know my event format, team size, materials, timing, dress expectations, and upload requirements.",
  "I joined a Wheeler training track.",
  "I completed my first baseline task.",
  "I have a weekly practice schedule.",
  "I submitted proof of practice: quiz score, writing sample, speech video, campaign plan, portfolio section, or case drill.",
  "I received feedback from an officer, advisor, or teammate.",
  "I completed one full mock competition attempt.",
  "I checked all school, Georgia HOSA, and official HOSA deadlines.",
];

const STRENGTHS = [
  "writing", "policy", "fast thinking", "current events", "speaking",
  "memorization", "vocabulary", "science", "math", "accuracy",
  "units", "technology", "data", "systems", "teamwork",
  "outreach", "design", "public health", "psychology", "global health",
  "new member", "creativity", "research", "independent",
];

const PROFILE_DEFAULT = { grade: "10", experience: "New", format: "Any", hours: 4, commitment: "Reliable", strengths: [] };

const COMMITMENT_COLORS = {
  "Low lift": "bg-emerald-50 text-emerald-800 ring-emerald-200",
  "Serious": "bg-blue-50 text-blue-800 ring-blue-200",
  "High commitment": "bg-amber-50 text-amber-800 ring-amber-200",
  "Only for locked-in teams": "bg-rose-50 text-rose-800 ring-rose-200",
};

const PRIORITY_COLORS = {
  "A+": "bg-cyan-500 text-white",
  "A": "bg-cyan-400 text-slate-950",
  "A-": "bg-cyan-300 text-slate-950",
  "B+": "bg-slate-300 text-slate-800",
  "B": "bg-slate-200 text-slate-700",
};

// ─── SCORING ─────────────────────────────────────────────────────────────────

function scoreEvent(event, profile) {
  let score = 0;
  const reasons = [];
  for (const strength of profile.strengths) {
    if (event.bestFor.includes(strength)) { score += 10; reasons.push(`Matches your strength in ${strength}`); }
  }
  if (profile.format === "Any") score += 4;
  else if (profile.format === "Individual" && event.format.toLowerCase().includes("individual")) { score += 16; reasons.push("Individual format fit"); }
  else if (profile.format === "Team" && event.format.toLowerCase().includes("team")) { score += 16; reasons.push("Team format fit"); }
  else if (profile.format === "Test" && event.format.toLowerCase().includes("test")) { score += 16; reasons.push("Written test format fit"); }
  else if (profile.format === "Speaking" && (event.format.toLowerCase().includes("speech") || event.format.toLowerCase().includes("presentation"))) { score += 16; reasons.push("Speaking format fit"); }
  else if (profile.format === "Writing" && event.format.toLowerCase().includes("writing")) { score += 16; reasons.push("Writing format fit"); }

  if (profile.hours >= event.time) { score += 16; reasons.push("Weekly time commitment fits"); }
  else if (profile.hours + 1 >= event.time) { score += 6; reasons.push("Close on weekly time"); }
  else { score -= 12; reasons.push("Needs more weekly prep time"); }

  if (profile.experience === "New" && (event.commitmentLevel === "Low lift" || event.chapterFit.toLowerCase().includes("beginner") || event.gradeFit.includes("9th"))) { score += 10; reasons.push("Good new member entry point"); }
  if (profile.experience === "Experienced" && event.difficulty.includes("High")) { score += 8; reasons.push("Higher ceiling for experienced competitors"); }
  if (profile.commitment === "Unreliable" && event.format.toLowerCase().includes("team")) { score -= 25; reasons.push("Team events require consistent attendance"); }
  if (profile.commitment === "Reliable" && event.format.toLowerCase().includes("team")) { score += 8; reasons.push("Reliable team member fit"); }

  return { score: Math.max(0, Math.min(100, score)), reasons: reasons.slice(0, 4) };
}

function getLevel(score) {
  if (score >= 78) return "Best fit";
  if (score >= 60) return "Strong option";
  if (score >= 42) return "Possible";
  return "Stretch";
}

// ─── UTILS ───────────────────────────────────────────────────────────────────

function cx(...args) { return args.filter(Boolean).join(" "); }

function getSuggestedNextStep(completed, checklist) {
  for (let i = 0; i < checklist.length; i++) { if (!completed[i]) return { index: i, text: checklist[i] }; }
  return null;
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Panel({ children, className = "" }) {
  return <div className={cx("rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200", className)}>{children}</div>;
}

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700"><Icon size={22} /></div>
      <div>
        <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm leading-6 text-slate-500">{subtitle}</p>}
      </div>
    </div>
  );
}

function TabButton({ active, icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cx("flex items-center justify-center gap-1.5 rounded-2xl px-3 py-2.5 text-xs font-black transition sm:gap-2 sm:text-sm", active ? "bg-slate-950 text-white shadow-lg" : "text-slate-600 hover:bg-slate-100")}
    >
      <Icon size={16} /><span className="hidden sm:inline">{label}</span><span className="sm:hidden">{label.slice(0, 4)}</span>
    </button>
  );
}

function Badge({ children, className = "" }) {
  return <span className={cx("inline-flex rounded-full px-2.5 py-0.5 text-xs font-black ring-1", className)}>{children}</span>;
}

function CheckLine({ text }) {
  return (
    <div className="flex gap-2 text-sm leading-6 text-slate-700">
      <CheckCircle2 className="mt-0.5 shrink-0 text-cyan-500" size={15} />
      <span>{text}</span>
    </div>
  );
}

function Pill({ children }) {
  return <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">{children}</span>;
}

function CommitmentBadge({ level }) {
  return <Badge className={cx("text-xs", COMMITMENT_COLORS[level] || "bg-slate-100 text-slate-700 ring-slate-200")}>{level}</Badge>;
}

function PriorityBadge({ priority }) {
  return <span className={cx("rounded-full px-2.5 py-0.5 text-xs font-black", PRIORITY_COLORS[priority] || "bg-slate-200 text-slate-700")}>{priority}</span>;
}

function DetailBox({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-cyan-700 shadow-sm ring-1 ring-slate-200"><Icon size={16} /></div>
        <h3 className="text-sm font-black text-slate-900">{title}</h3>
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function OfficerTip({ text }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left">
        <span className="text-xs font-black uppercase tracking-wider text-slate-400">Officer tip</span>
        {open ? <ChevronUp size={15} className="text-slate-400" /> : <ChevronDown size={15} className="text-slate-400" />}
      </button>
      {open && <div className="border-t border-dashed border-slate-300 px-4 py-3 text-sm leading-6 text-slate-700">{text}</div>}
    </div>
  );
}

// ─── QUIZ FINDER ─────────────────────────────────────────────────────────────

function QuizFinder({ profile, setProfile, scoredEvents, onOpenTraining }) {
  const [step, setStep] = useState(0);

  const steps = [
    { id: "basics", label: "About you" },
    { id: "strengths", label: "Your strengths" },
    { id: "format", label: "Format fit" },
    { id: "results", label: "Your matches" },
  ];

  function QuizOption({ value, selected, onClick, children }) {
    return (
      <button onClick={onClick} className={cx("w-full rounded-2xl border-2 p-4 text-left text-sm font-bold transition", selected ? "border-cyan-400 bg-cyan-50 text-cyan-900" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50")}>
        {children}
      </button>
    );
  }

  const top3 = scoredEvents.slice(0, 3);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <Panel>
        <div className="mb-5 flex gap-2">
          {steps.map((s, i) => (
            <button key={s.id} onClick={() => i < step + 1 && setStep(i)} className={cx("flex-1 rounded-full py-1.5 text-xs font-black transition", i === step ? "bg-slate-950 text-white" : i < step ? "bg-cyan-100 text-cyan-800" : "bg-slate-100 text-slate-400")}>
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">{i + 1}</span>
            </button>
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-5">
            <SectionTitle icon={GraduationCap} title="About you" subtitle="Be honest. The results are only useful if you are." />
            <div className="mt-4 space-y-4">
              <div>
                <p className="mb-2 text-sm font-black text-slate-700">What grade are you in?</p>
                <div className="grid grid-cols-4 gap-2">
                  {["9", "10", "11", "12"].map(g => <QuizOption key={g} value={g} selected={profile.grade === g} onClick={() => setProfile({ ...profile, grade: g })}>Grade {g}</QuizOption>)}
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-black text-slate-700">HOSA experience?</p>
                <div className="grid gap-2">
                  {["New", "Some experience", "Experienced"].map(e => <QuizOption key={e} value={e} selected={profile.experience === e} onClick={() => setProfile({ ...profile, experience: e })}>{e}</QuizOption>)}
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-black text-slate-700">How reliable are you for weekly meetings?</p>
                <div className="grid gap-2">
                  {["Reliable", "Sometimes busy", "Unreliable"].map(c => <QuizOption key={c} value={c} selected={profile.commitment === c} onClick={() => setProfile({ ...profile, commitment: c })}>{c === "Reliable" ? "I show up consistently" : c === "Sometimes busy" ? "I try but miss some meetings" : "My schedule is unpredictable"}</QuizOption>)}
                </div>
              </div>
              <button onClick={() => setStep(1)} className="mt-2 w-full rounded-2xl bg-slate-950 py-3 font-black text-white transition hover:bg-slate-800">
                Next <ArrowRight className="inline" size={15} />
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <SectionTitle icon={Star} title="Your strengths" subtitle="Pick everything that actually applies. Be honest." />
            <div className="mt-4 flex flex-wrap gap-2">
              {STRENGTHS.map(s => (
                <button key={s} onClick={() => { const next = profile.strengths.includes(s) ? profile.strengths.filter(x => x !== s) : [...profile.strengths, s]; setProfile({ ...profile, strengths: next }); }} className={cx("rounded-full px-3 py-2 text-sm font-bold transition", profile.strengths.includes(s) ? "bg-cyan-500 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200")}>
                  {s}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400">{profile.strengths.length} selected</p>
            <div className="flex gap-2">
              <button onClick={() => setStep(0)} className="flex-1 rounded-2xl border border-slate-200 py-3 font-black text-slate-700 transition hover:bg-slate-50">Back</button>
              <button onClick={() => setStep(2)} className="flex-1 rounded-2xl bg-slate-950 py-3 font-black text-white transition hover:bg-slate-800">Next <ArrowRight className="inline" size={15} /></button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <SectionTitle icon={Target} title="Format and time" subtitle="This affects your match score significantly." />
            <div className="mt-4 space-y-4">
              <div>
                <p className="mb-2 text-sm font-black text-slate-700">Preferred format?</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Any", "Individual", "Team", "Test", "Speaking", "Writing"].map(f => <QuizOption key={f} value={f} selected={profile.format === f} onClick={() => setProfile({ ...profile, format: f })}>{f}</QuizOption>)}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-black text-slate-700">Weekly prep hours</p>
                  <span className="text-sm font-black text-cyan-600">{profile.hours}h/week</span>
                </div>
                <input type="range" min="1" max="8" step="1" value={profile.hours} onChange={e => setProfile({ ...profile, hours: Number(e.target.value) })} className="w-full accent-cyan-500" />
                <div className="flex justify-between text-xs text-slate-400 mt-1"><span>1 hour</span><span>8 hours</span></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep(1)} className="flex-1 rounded-2xl border border-slate-200 py-3 font-black text-slate-700 transition hover:bg-slate-50">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 rounded-2xl bg-cyan-500 py-3 font-black text-white transition hover:bg-cyan-600">See my matches</button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <SectionTitle icon={Award} title="Your top 3 matches" subtitle="Based on your strengths, format, and time." />
            {top3.map((event, i) => (
              <div key={event.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="rounded-full bg-slate-950 px-2 py-0.5 text-xs font-black text-white">#{i + 1} Match</span>
                      <PriorityBadge priority={event.priority} />
                      <CommitmentBadge level={event.commitmentLevel} />
                    </div>
                    <h3 className="text-base font-black text-slate-950">{event.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{event.track}</p>
                  </div>
                  <div className="shrink-0 rounded-2xl bg-white px-2.5 py-1.5 text-center ring-1 ring-slate-200">
                    <p className="text-xl font-black text-slate-950">{event.score}</p>
                    <p className="text-[10px] font-bold text-slate-400">fit</p>
                  </div>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-slate-200 overflow-hidden"><div className="h-full rounded-full bg-cyan-500" style={{ width: `${event.score}%` }} /></div>
                <p className="mt-3 text-xs leading-5 text-slate-600 font-medium">{event.whyWheeler}</p>
                <div className="mt-2 space-y-1">
                  {event.reasons.slice(0, 2).map(r => <div key={r} className="flex gap-1.5 text-xs text-cyan-700"><CheckCircle2 size={12} className="mt-0.5 shrink-0" />{r}</div>)}
                </div>
                <button onClick={() => onOpenTraining(event.id)} className="mt-3 w-full rounded-xl bg-slate-950 py-2 text-xs font-black text-white transition hover:bg-slate-800">
                  Open training plan
                </button>
              </div>
            ))}
            <button onClick={() => setStep(0)} className="w-full rounded-2xl border border-slate-200 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-50">Redo quiz</button>
          </div>
        )}
      </Panel>

      {step < 3 && (
        <Panel>
          <SectionTitle icon={Lightbulb} title="How this works" subtitle="The finder ranks events by how well they match you." />
          <div className="mt-5 space-y-3">
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-sm font-black text-slate-950">What gets scored</p>
              <div className="mt-2 space-y-1.5">
                {["Your strengths match each event's best-for list", "Format preference: individual, team, test, speaking, writing", "Weekly prep hours vs event time requirements", "Experience level vs event difficulty", "Reliability vs team event requirements"].map(t => <CheckLine key={t} text={t} />)}
              </div>
            </div>
            <div className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200">
              <div className="flex gap-2">
                <AlertTriangle className="shrink-0 text-amber-700 mt-0.5" size={16} />
                <div>
                  <p className="text-sm font-black text-amber-900">Still check the guideline</p>
                  <p className="mt-1 text-xs leading-5 text-amber-800">Match scores help you explore options. They do not replace reading the official HOSA guideline for your event.</p>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      )}

      {step === 3 && (
        <Panel>
          <SectionTitle icon={Target} title="Your recommended path" subtitle="A suggested starting point based on your answers." />
          <div className="mt-4 space-y-3">
            {top3[0] && (
              <>
                <div className="rounded-2xl bg-cyan-50 p-4 ring-1 ring-cyan-100">
                  <p className="text-xs font-black uppercase tracking-wider text-cyan-700">Main event</p>
                  <p className="mt-1 text-base font-black text-slate-950">{top3[0].name}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{top3[0].format}</p>
                </div>
                {top3[1] && <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-500">Backup event</p>
                  <p className="mt-1 text-sm font-black text-slate-950">{top3[1].name}</p>
                </div>}
                <div className="rounded-2xl bg-slate-950 p-4 text-white">
                  <p className="text-xs font-black uppercase tracking-wider text-cyan-300">First action this week</p>
                  <p className="mt-1 text-sm font-bold leading-6 text-slate-200">{top3[0].nextSevenDays[0]}</p>
                </div>
              </>
            )}
          </div>
        </Panel>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function WheelerHOSAPortal() {
  const [activeTab, setActiveTab] = useState("start");
  const [profile, setProfile] = useState(() => { try { return JSON.parse(localStorage.getItem("wheelerHosaProfile") || "null") || PROFILE_DEFAULT; } catch { return PROFILE_DEFAULT; } });
  const [selectedEventId, setSelectedEventId] = useState(() => localStorage.getItem("wheelerHosaEvent") || "extemp-writing");
  const [query, setQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [completed, setCompleted] = useState(() => { try { return JSON.parse(localStorage.getItem("wheelerHosaReadiness") || "{}"); } catch { return {}; } });

  useEffect(() => { localStorage.setItem("wheelerHosaReadiness", JSON.stringify(completed)); }, [completed]);
  useEffect(() => { localStorage.setItem("wheelerHosaProfile", JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem("wheelerHosaEvent", selectedEventId); }, [selectedEventId]);

  const scoredEvents = useMemo(() => EVENTS.map(e => { const r = scoreEvent(e, profile); return { ...e, score: r.score, level: getLevel(r.score), reasons: r.reasons }; }).sort((a, b) => b.score - a.score), [profile]);

  const selectedEvent = EVENTS.find(e => e.id === selectedEventId) || EVENTS[0];
  const trackOptions = ["All", ...Array.from(new Set(EVENTS.map(e => e.track)))];
  const priorities = ["All", "A+", "A", "A-", "B+", "B"];
  const filteredEvents = EVENTS.filter(e => {
    const blob = `${e.name} ${e.category} ${e.track} ${e.bestFor.join(" ")} ${e.chapterFit}`.toLowerCase();
    return blob.includes(query.toLowerCase()) && (trackFilter === "All" || e.track === trackFilter) && (priorityFilter === "All" || e.priority === priorityFilter);
  });

  const completedCount = Object.values(completed).filter(Boolean).length;
  const readiness = Math.round((completedCount / CHECKLIST.length) * 100);
  const nextStep = getSuggestedNextStep(completed, CHECKLIST);

  const planText = `Wheeler HOSA Event Plan\n\nEvent: ${selectedEvent.name}\nTrack: ${selectedEvent.track}\nFormat: ${selectedEvent.format}\nTeam: ${selectedEvent.team}\nCommitment: ${selectedEvent.commitmentLevel}\n\nFirst week task:\n${selectedEvent.firstWeek}\n\nNext 7 days:\n${selectedEvent.nextSevenDays.map((t, i) => `Day ${i + 1}: ${t}`).join("\n")}\n\nWeekly training:\n${selectedEvent.weeklyTraining.map((t, i) => `${i + 1}. ${t}`).join("\n")}\n\nEvidence to collect:\n${selectedEvent.evidence.map((t, i) => `${i + 1}. ${t}`).join("\n")}\n\nCommon mistakes to avoid:\n${selectedEvent.commonMistakes.map((t, i) => `${i + 1}. ${t}`).join("\n")}`;

  function openTraining(id) { setSelectedEventId(id); setActiveTab("training"); }
  async function copyPlan() { try { await navigator.clipboard.writeText(planText); } catch { alert("Could not copy. Try downloading instead."); } }
  function downloadPlan() { const blob = new Blob([planText], { type: "text/plain;charset=utf-8" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `${selectedEvent.id}-plan.txt`; a.click(); URL.revokeObjectURL(url); }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      {/* HEADER */}
      <header className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(34,211,238,0.2),transparent_50%),radial-gradient(ellipse_at_80%_20%,rgba(59,130,246,0.15),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30 sm:h-12 sm:w-12">
                <HeartPulse size={22} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-cyan-300 hidden sm:block">Wheeler HOSA</p>
                <h1 className="text-lg font-black tracking-tight sm:text-2xl">Competition Command Center</h1>
              </div>
            </div>
            <a href="https://hosa.org/guidelines/" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-bold text-white/80 transition hover:bg-white/10 sm:px-4 sm:py-2 sm:text-sm">
              Official Guidelines
            </a>
          </nav>
          <div className="py-8 sm:py-12">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-cyan-200 ring-1 ring-white/10">
              <Sparkles size={13} /> Built for Wheeler. Not generic HOSA fog.
            </div>
            <h2 className="max-w-4xl text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Pick the right event.<br />Train weekly. Show proof.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Find realistic events, follow detailed training plans, collect evidence, and avoid discovering the rules in the SLC parking lot.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => setActiveTab("finder")} className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-cyan-300">Find my event</button>
              <button onClick={() => setActiveTab("training")} className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-black text-white ring-1 ring-white/20 transition hover:bg-white/15">View training plans</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pb-6 sm:grid-cols-4">
            {[{ v: EVENTS.length, l: "Target events" }, { v: TRACKS.length, l: "Training tracks" }, { v: SEASON.length, l: "Season phases" }, { v: `${readiness}%`, l: "My readiness" }].map(s => (
              <div key={s.l} className="rounded-2xl bg-white/8 p-3 ring-1 ring-white/10">
                <p className="text-xl font-black sm:text-2xl">{s.v}</p>
                <p className="text-xs text-slate-400">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* TABS */}
        <div className="mb-5 grid grid-cols-6 gap-1.5 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-slate-200">
          <TabButton active={activeTab === "start"} icon={Flame} label="Start" onClick={() => setActiveTab("start")} />
          <TabButton active={activeTab === "finder"} icon={Target} label="Finder" onClick={() => setActiveTab("finder")} />
          <TabButton active={activeTab === "training"} icon={BookOpen} label="Training" onClick={() => setActiveTab("training")} />
          <TabButton active={activeTab === "events"} icon={ClipboardList} label="Events" onClick={() => setActiveTab("events")} />
          <TabButton active={activeTab === "tracks"} icon={Users} label="Tracks" onClick={() => setActiveTab("tracks")} />
          <TabButton active={activeTab === "ready"} icon={LineChart} label="Ready" onClick={() => setActiveTab("ready")} />
        </div>

        {/* START */}
        {activeTab === "start" && (
          <div className="space-y-5">
            <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
              <Panel>
                <SectionTitle icon={Megaphone} title="How to use this portal" subtitle="Simple path. No overcomplicating." />
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    { n: "1", t: "Use the event finder", d: "Answer a short quiz about your grade, strengths, format preference, and available time. The site ranks events by fit." },
                    { n: "2", t: "Pick one main event", d: "Choose one serious event and one backup. Seven events is not ambition, it is calendar vandalism." },
                    { n: "3", t: "Follow the training plan", d: "Open the training tab, review your Next 7 Days, and complete one task before the next meeting." },
                    { n: "4", t: "Track proof of practice", d: "Save quiz scores, drafts, photos, surveys, portfolios, speech videos, or mock round results." },
                    { n: "5", t: "Do one mock round", d: "Complete at least one full practice attempt before SLC. This separates prepared students from hopeful ones." },
                  ].map(s => (
                    <div key={s.n} className={cx("rounded-2xl border border-slate-200 bg-slate-50 p-4", s.n === "5" && "sm:col-span-2")}>
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">{s.n}</div>
                      <h3 className="mt-3 font-black text-slate-950">{s.t}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{s.d}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200">
                  <div className="flex gap-3">
                    <AlertTriangle className="mt-0.5 shrink-0 text-amber-700" size={17} />
                    <div>
                      <h3 className="text-sm font-black text-amber-950">Verify the official rules before competing</h3>
                      <p className="mt-1 text-xs leading-5 text-amber-800">This portal provides training guidance. Students must verify the current official HOSA guideline, Georgia HOSA deadlines, school deadlines, upload requirements, dress code, and advisor instructions before competing. Rules change. Always check the source.</p>
                    </div>
                  </div>
                </div>
              </Panel>

              <Panel>
                <SectionTitle icon={Award} title="Wheeler priority targets" subtitle="Events most worth building around first." />
                <div className="mt-5 space-y-2">
                  {EVENTS.filter(e => e.priority === "A+" || e.priority === "A").map(event => (
                    <button key={event.id} onClick={() => openTraining(event.id)} className="group w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-left transition hover:border-cyan-300 hover:bg-cyan-50">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5 mb-1">
                            <PriorityBadge priority={event.priority} />
                            <CommitmentBadge level={event.commitmentLevel} />
                          </div>
                          <p className="font-black text-slate-950 truncate">{event.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{event.chapterFit}</p>
                        </div>
                        <ChevronRight className="mt-1 shrink-0 text-slate-300 transition group-hover:text-cyan-600" size={17} />
                      </div>
                    </button>
                  ))}
                </div>
              </Panel>
            </div>

            {/* Commitment level legend */}
            <Panel>
              <SectionTitle icon={Zap} title="Commitment levels explained" subtitle="Know what you are signing up for before you sign up." />
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { level: "Low lift", desc: "3 to 4 hours per week. Solo or small team. Good first event.", color: COMMITMENT_COLORS["Low lift"] },
                  { level: "Serious", desc: "4 to 5 hours per week. Consistent weekly practice required.", color: COMMITMENT_COLORS["Serious"] },
                  { level: "High commitment", desc: "5 to 6 hours per week. Team coordination, evidence collection, possible upload.", color: COMMITMENT_COLORS["High commitment"] },
                  { level: "Only for locked-in teams", desc: "Full season commitment. Weekly meetings, portfolio, mock rounds, presentations.", color: COMMITMENT_COLORS["Only for locked-in teams"] },
                ].map(({ level, desc, color }) => (
                  <div key={level} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <Badge className={cx("mb-2", color)}>{level}</Badge>
                    <p className="text-sm text-slate-600">{desc}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}

        {/* FINDER */}
        {activeTab === "finder" && <QuizFinder profile={profile} setProfile={setProfile} scoredEvents={scoredEvents} onOpenTraining={openTraining} />}

        {/* TRAINING */}
        {activeTab === "training" && (
          <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
            <Panel className="h-fit lg:sticky lg:top-4">
              <SectionTitle icon={Filter} title="Select event" />
              <div className="mt-4 space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
                {EVENTS.map(event => (
                  <button key={event.id} onClick={() => setSelectedEventId(event.id)} className={cx("w-full rounded-xl p-3 text-left transition", selectedEventId === event.id ? "bg-slate-950 text-white" : "hover:bg-slate-100")}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className={cx("text-sm font-black truncate", selectedEventId === event.id ? "text-white" : "text-slate-900")}>{event.name}</p>
                        <p className={cx("text-xs truncate", selectedEventId === event.id ? "text-cyan-200" : "text-slate-500")}>{event.track}</p>
                      </div>
                      <PriorityBadge priority={event.priority} />
                    </div>
                  </button>
                ))}
              </div>
            </Panel>

            <div className="space-y-4">
              <Panel>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <SectionTitle icon={BookOpen} title={selectedEvent.name} subtitle={selectedEvent.chapterFit} />
                  <div className="flex gap-2 shrink-0">
                    <button onClick={copyPlan} className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-200">Copy plan</button>
                    <button onClick={downloadPlan} className="inline-flex items-center gap-1.5 rounded-xl bg-slate-950 px-3 py-2 text-xs font-black text-white transition hover:bg-slate-800"><Download size={13} /> Download</button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <PriorityBadge priority={selectedEvent.priority} />
                  <CommitmentBadge level={selectedEvent.commitmentLevel} />
                  <Pill>{selectedEvent.format}</Pill>
                  <Pill>{selectedEvent.team}</Pill>
                  <Pill>{selectedEvent.difficulty}</Pill>
                  <Pill>{selectedEvent.time}+ hrs/week</Pill>
                  <Pill>{selectedEvent.gradeFit}</Pill>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-emerald-50 p-3.5 ring-1 ring-emerald-100">
                    <p className="text-xs font-black uppercase tracking-wider text-emerald-700 mb-1.5">Best for</p>
                    <div className="flex flex-wrap gap-1.5">{selectedEvent.bestFor.map(t => <span key={t} className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">{t}</span>)}</div>
                  </div>
                  <div className="rounded-2xl bg-rose-50 p-3.5 ring-1 ring-rose-100">
                    <p className="text-xs font-black uppercase tracking-wider text-rose-700 mb-1.5">Avoid if</p>
                    <p className="text-xs leading-5 text-rose-900">{selectedEvent.avoidIf}</p>
                  </div>
                </div>

                <div className="mt-3 rounded-2xl bg-cyan-50 p-4 ring-1 ring-cyan-100">
                  <p className="text-xs font-black uppercase tracking-wider text-cyan-700">First week task</p>
                  <p className="mt-1.5 text-sm font-black leading-6 text-slate-950">{selectedEvent.firstWeek}</p>
                </div>
              </Panel>

              <Panel>
                <SectionTitle icon={CalendarDays} title="Next 7 days" subtitle="Do these in order. Start today, not next Monday." />
                <div className="mt-4 space-y-2">
                  {selectedEvent.nextSevenDays.map((task, i) => (
                    <div key={i} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">{i + 1}</div>
                      <p className="text-sm leading-6 text-slate-700">{task}</p>
                    </div>
                  ))}
                </div>
              </Panel>

              <div className="grid gap-4 sm:grid-cols-2">
                <DetailBox icon={ClipboardCheck} title="Weekly training">
                  {selectedEvent.weeklyTraining.map(t => <CheckLine key={t} text={t} />)}
                </DetailBox>
                <DetailBox icon={ShieldCheck} title="Evidence to collect">
                  {selectedEvent.evidence.map(t => <CheckLine key={t} text={t} />)}
                </DetailBox>
                <DetailBox icon={BarChart3} title="What judges reward">
                  {selectedEvent.rubric.map(t => <CheckLine key={t} text={t} />)}
                </DetailBox>
                <DetailBox icon={AlertTriangle} title="Common mistakes">
                  {selectedEvent.commonMistakes.map(t => <CheckLine key={t} text={t} />)}
                </DetailBox>
              </div>

              <Panel>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-950 p-4 text-white">
                    <p className="text-xs font-black uppercase tracking-wider text-cyan-300 mb-2">Why Wheeler should target it</p>
                    <p className="text-sm leading-6 text-slate-300">{selectedEvent.whyWheeler}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Official style note</p>
                    <p className="text-sm leading-6 text-slate-700">{selectedEvent.officialStyle}</p>
                    <p className="mt-2 text-xs text-slate-500 font-bold">Upload: {selectedEvent.upload}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <OfficerTip text={selectedEvent.officerCoaching} />
                </div>
              </Panel>
            </div>
          </div>
        )}

        {/* EVENTS */}
        {activeTab === "events" && (
          <Panel>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <SectionTitle icon={ClipboardList} title="Event library" subtitle="Search, filter, and explore all target events." />
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                  <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search events" className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none ring-cyan-200 transition focus:ring-2 lg:w-56" />
                </div>
                <select value={trackFilter} onChange={e => setTrackFilter(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none ring-cyan-200 transition focus:ring-2">
                  {trackOptions.map(t => <option key={t}>{t}</option>)}
                </select>
                <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none ring-cyan-200 transition focus:ring-2">
                  {priorities.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            {filteredEvents.length === 0 ? (
              <div className="mt-8 rounded-2xl bg-slate-50 py-12 text-center ring-1 ring-slate-200">
                <Search size={32} className="mx-auto text-slate-300 mb-3" />
                <p className="font-black text-slate-500">No events match those filters.</p>
                <p className="text-sm text-slate-400 mt-1">Try clearing the search or changing the filters.</p>
              </div>
            ) : (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredEvents.map(event => (
                  <div key={event.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-300 hover:bg-cyan-50/50">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          <PriorityBadge priority={event.priority} />
                          <CommitmentBadge level={event.commitmentLevel} />
                        </div>
                        <h3 className="font-black text-slate-950">{event.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{event.track}</p>
                      </div>
                      <Trophy size={18} className="shrink-0 text-cyan-500 mt-1" />
                    </div>
                    <p className="mt-3 text-xs leading-5 text-slate-700">{event.placementLogic}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <Pill>{event.format}</Pill>
                      <Pill>{event.difficulty}</Pill>
                      <Pill>{event.team}</Pill>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-xl bg-emerald-50 p-2 ring-1 ring-emerald-100">
                        <p className="font-black text-emerald-700 mb-1">Best for</p>
                        <p className="text-emerald-800 leading-4">{event.bestFor.slice(0, 3).join(", ")}</p>
                      </div>
                      <div className="rounded-xl bg-rose-50 p-2 ring-1 ring-rose-100">
                        <p className="font-black text-rose-700 mb-1">Avoid if</p>
                        <p className="text-rose-800 leading-4 line-clamp-2">{event.avoidIf.slice(0, 60)}...</p>
                      </div>
                    </div>
                    <button onClick={() => openTraining(event.id)} className="mt-3 w-full rounded-xl bg-white py-2 text-xs font-black text-slate-950 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50">
                      Open training plan
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Panel>
        )}

        {/* TRACKS */}
        {activeTab === "tracks" && (
          <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
            <Panel>
              <SectionTitle icon={Users} title="Training tracks" subtitle="Officers should train students by track, not one giant blob of confused teenagers." />
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {TRACKS.map(t => {
                  const Icon = t.icon;
                  return (
                    <div key={t.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex gap-3 mb-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700"><Icon size={20} /></div>
                        <div>
                          <h3 className="font-black text-slate-950">{t.name}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">{t.who}</p>
                        </div>
                      </div>
                      <p className="text-xs font-black text-slate-700 mb-1.5">Target events</p>
                      <div className="flex flex-wrap gap-1.5 mb-3">{t.events.map(e => <Pill key={e}>{e}</Pill>)}</div>
                      <p className="text-xs font-black text-slate-700 mb-1.5">Weekly work</p>
                      <div className="space-y-1">{t.weekly.map(w => <CheckLine key={w} text={w} />)}</div>
                      <div className="mt-3 rounded-xl bg-slate-950 px-3 py-2 text-xs font-bold text-slate-300">{t.goal}</div>
                    </div>
                  );
                })}
              </div>
            </Panel>

            <Panel>
              <SectionTitle icon={CalendarDays} title="Season roadmap" subtitle="What should happen at each phase." />
              <div className="mt-5 space-y-3">
                {SEASON.map((phase, i) => (
                  <div key={phase.phase} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">{i + 1}</div>
                      <p className="text-xs font-black uppercase tracking-wider text-cyan-700">{phase.phase}</p>
                    </div>
                    <h3 className="font-black text-slate-950 mb-2">{phase.title}</h3>
                    <p className="text-xs leading-5 text-slate-700"><span className="font-black">Student:</span> {phase.studentGoal}</p>
                    <p className="text-xs leading-5 text-slate-700 mt-1"><span className="font-black">Officer:</span> {phase.officerGoal}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">{phase.deliverables.map(d => <Pill key={d}>{d}</Pill>)}</div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}

        {/* READY */}
        {activeTab === "ready" && (
          <div className="grid gap-5 lg:grid-cols-[1fr_400px]">
            <Panel>
              <SectionTitle icon={Lightbulb} title="Meeting practice templates" subtitle="Use these during chapter meetings so competition prep actually happens." />
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Test events", items: ["20-question quiz", "10-minute group review", "Update your error log", "Retake missed topics next week"] },
                  { title: "Writing events", items: ["One timed prompt", "30-minute response", "Peer score with rubric", "Rewrite your weakest paragraph"] },
                  { title: "Speaking events", items: ["60-second delivery drill", "Full run every two weeks", "Record your delivery", "Fix one issue: pacing, eye contact, or pausing"] },
                  { title: "Team campaign events", items: ["Portfolio section checkpoint", "Evidence upload check", "Role accountability review", "Mock judge questions round"] },
                ].map(({ title, items }) => (
                  <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="font-black text-slate-950 mb-3">{title}</h3>
                    <div className="space-y-1.5">{items.map(t => <CheckLine key={t} text={t} />)}</div>
                  </div>
                ))}
              </div>
            </Panel>

            <div className="space-y-4">
              <Panel>
                <SectionTitle icon={CheckSquare} title="My SLC readiness" subtitle="Check off what you have actually done." />
                <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-400">Readiness</p>
                    <p className="text-3xl font-black">{readiness}%</p>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-cyan-400 transition-all" style={{ width: `${readiness}%` }} /></div>
                  <p className="mt-2 text-xs text-slate-400">{completedCount} of {CHECKLIST.length} steps complete</p>
                </div>
                {nextStep && (
                  <div className="mt-3 rounded-2xl bg-cyan-50 p-3.5 ring-1 ring-cyan-100">
                    <p className="text-xs font-black text-cyan-700 uppercase tracking-wider mb-1">Suggested next step</p>
                    <p className="text-sm font-bold text-slate-800 leading-5">{nextStep.text}</p>
                  </div>
                )}
              </Panel>

              <Panel>
                <div className="space-y-2">
                  {CHECKLIST.map((item, i) => (
                    <label key={item} className={cx("flex cursor-pointer items-start gap-3 rounded-xl p-3 transition", completed[i] ? "bg-emerald-50 ring-1 ring-emerald-100" : "bg-slate-50 ring-1 ring-slate-200")}>
                      <input type="checkbox" checked={Boolean(completed[i])} onChange={() => setCompleted({ ...completed, [i]: !completed[i] })} className="mt-0.5 h-4 w-4 accent-cyan-500" />
                      <span className={cx("text-sm leading-5", completed[i] ? "text-emerald-800 font-bold" : "text-slate-700")}>{item}</span>
                    </label>
                  ))}
                </div>
                {readiness === 100 && (
                  <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-center ring-1 ring-emerald-200">
                    <CheckCircle2 size={28} className="mx-auto text-emerald-600 mb-2" />
                    <p className="font-black text-emerald-900">You are as ready as this portal can make you.</p>
                    <p className="text-xs text-emerald-700 mt-1">Now read the actual HOSA guideline one more time. Then go compete.</p>
                  </div>
                )}
              </Panel>
            </div>
          </div>
        )}

        {/* FOOTER CTA */}
        <div className="mt-6 rounded-3xl bg-slate-950 p-5 text-white sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-black text-cyan-300 ring-1 ring-cyan-400/20">
                <ShieldCheck size={14} /> Student reminder
              </div>
              <h2 className="text-xl font-black sm:text-2xl">Pick early. Practice weekly. Document proof.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Students must verify official HOSA guidelines and Georgia HOSA procedures before final registration. This site is a training guide, not a replacement for the rulebook.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
              <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Best move this week</p>
              <p className="text-sm font-black text-white">Use the finder, choose one event, complete your first task, and show proof to an officer before the next meeting.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
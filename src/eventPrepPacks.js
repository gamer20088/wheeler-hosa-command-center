const RESOURCE_LINKS = {
  hosa: { label: 'Official HOSA Guidelines', url: 'https://hosa.org/guidelines/', why: 'Verify the current official event rules, rating sheets, timing, team size, and allowed materials.' },
  medline: { label: 'MedlinePlus', url: 'https://medlineplus.gov/', why: 'Use plain-language health background from a credible public health source.' },
  cdc: { label: 'CDC Health Topics', url: 'https://www.cdc.gov/health-topics.html', why: 'Find public health topic pages, prevention language, and data-friendly background.' },
  ncbi: { label: 'NCBI Bookshelf', url: 'https://www.ncbi.nlm.nih.gov/books/', why: 'Use free health science books and chapters for deeper concept review.' },
  pubmed: { label: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/', why: 'Find research abstracts and source leads for advanced projects and evidence checks.' },
}

const DEFAULT_REMINDER = 'This is an unofficial Wheeler HOSA prep support. Always verify the official HOSA guideline and Georgia SLC requirements with the Wheeler advisor.'

function pack(data) {
  const resources = data.freeResources || []
  const hasOfficial = resources.some((resource) => resource.url === RESOURCE_LINKS.hosa.url)
  return {
    officialReminder: DEFAULT_REMINDER,
    ...data,
    freeResources: hasOfficial ? resources : [RESOURCE_LINKS.hosa, ...resources],
  }
}

function testPack({ eventName, slug, bestFor, quickTags, firstTask, focus, resources = [RESOURCE_LINKS.medline, RESOURCE_LINKS.cdc], advanced = false }) {
  const resourceList = resources.length > 1 ? resources : [...resources, RESOURCE_LINKS.cdc]
  return pack({
    eventName,
    slug,
    packType: 'Test Prep',
    category: 'Test Prep',
    bestFor,
    quickTags,
    startHere: [
      'Open the official guideline and list every tested topic area.',
      firstTask,
      'Create a weak-topic tracker before you start heavy studying.',
    ],
    fourWeekPlan: [
      { week: 'Week 1', focus: `Build a topic map for ${focus} and take a short baseline quiz.` },
      { week: 'Week 2', focus: 'Make flashcards or worked examples for the weakest half of the topic list.' },
      { week: 'Week 3', focus: 'Take two timed quizzes and rewrite every missed question in your own words.' },
      { week: 'Week 4', focus: 'Run a mock exam, review the error log, and ask an officer to check your proof.' },
    ],
    practiceTasks: [
      'Build a 50-term glossary or formula sheet.',
      'Take one timed quiz each week.',
      'Keep a missed-question log with the correct reason.',
      'Teach one weak topic to another member in three minutes.',
      ...(advanced ? ['Compare two credible sources when a topic feels unclear.', 'Create a final one-page review sheet.'] : []),
    ],
    freeResources: [RESOURCE_LINKS.hosa, ...resourceList],
    evidenceToSave: ['Flashcard screenshot or count', 'Baseline and weekly quiz scores', 'Missed-question log', 'One-page topic map', ...(advanced ? ['Final review sheet'] : [])],
    officerChecklist: ['Guideline opened and topic list started', 'Weekly quiz score saved', 'Missed questions reviewed', 'Weak-topic plan is specific', ...(advanced ? ['Student can explain two weak topics without notes'] : [])],
    mockRubric: [
      { category: 'Accuracy', lookFor: 'Answers show the student understands the concept, not just the word.' },
      { category: 'Timing', lookFor: 'Student can complete practice questions without rushing blindly.' },
      { category: 'Review habits', lookFor: 'Missed questions are logged and retested.' },
      { category: 'Evidence', lookFor: 'Student has saved proof of consistent study.' },
      ...(advanced ? [{ category: 'Explanation', lookFor: 'Student can explain why the correct answer is correct.' }] : []),
    ],
    watchOuts: ['Only rereading notes instead of practicing questions.', 'Skipping missed-question review.', ...(advanced ? ['Studying everything equally instead of targeting weak topics.'] : [])],
  })
}

function speakingPack({ eventName, slug, bestFor, quickTags, firstTask, resources = [RESOURCE_LINKS.medline, RESOURCE_LINKS.cdc] }) {
  return pack({
    eventName,
    slug,
    packType: 'Writing and Speaking',
    category: 'Writing and Speaking',
    bestFor,
    quickTags,
    startHere: ['Read the guideline for time limits and required topic rules.', firstTask, 'Record one practice run before trying to polish anything.'],
    fourWeekPlan: [
      { week: 'Week 1', focus: 'Write a rough outline and collect credible examples.' },
      { week: 'Week 2', focus: 'Draft the full speech or response and cut anything unfocused.' },
      { week: 'Week 3', focus: 'Record timed practice, then revise delivery and transitions.' },
      { week: 'Week 4', focus: 'Complete a mock round with officer feedback and judge questions.' },
    ],
    practiceTasks: ['Write a one-page outline.', 'Record a timed practice run.', 'Practice eye contact and pacing.', 'Answer three judge-style questions.', 'Revise after feedback.', 'Run one full mock round with timing.'],
    freeResources: [RESOURCE_LINKS.hosa, ...resources],
    evidenceToSave: ['Outline draft', 'Practice recording', 'Feedback notes', 'Timed practice log', 'Final revision notes'],
    officerChecklist: ['Guideline timing checked', 'Opening is clear', 'Main points use credible examples', 'Student practiced without reading every word', 'Student can answer at least three judge questions'],
    mockRubric: [
      { category: 'Structure', lookFor: 'Opening, main points, and closing are easy to follow.' },
      { category: 'Evidence', lookFor: 'Claims use credible examples or sources.' },
      { category: 'Delivery', lookFor: 'Voice, pacing, and eye contact support the message.' },
      { category: 'Reflection', lookFor: 'Student can explain what they improved after feedback.' },
      { category: 'Timing', lookFor: 'Student can finish comfortably within the expected time.' },
    ],
    watchOuts: ['Memorizing without understanding.', 'Waiting too long to practice out loud.', 'Ignoring feedback because the first draft feels finished.'],
  })
}

function projectPack({ eventName, slug, bestFor, quickTags, firstTask, packType = 'Project and Upload', resources = [RESOURCE_LINKS.cdc] }) {
  return pack({
    eventName,
    slug,
    packType,
    category: 'Project and Upload',
    bestFor,
    quickTags,
    startHere: ['Open the guideline and identify every upload or portfolio requirement.', firstTask, 'Create a deadline checklist that is earlier than the official deadline.'],
    fourWeekPlan: [
      { week: 'Week 1', focus: 'Choose a focused topic, audience, or career and define the goal.' },
      { week: 'Week 2', focus: 'Collect sources, build drafts, and save proof of progress.' },
      { week: 'Week 3', focus: 'Polish the upload, portfolio, display, or campaign evidence.' },
      { week: 'Week 4', focus: 'Run a mock presentation and verify upload format with the advisor.' },
    ],
    practiceTasks: ['Create a project timeline.', 'Build a source log.', 'Save draft screenshots weekly.', 'Practice a short presentation summary.', 'Check upload format before final week.'],
    freeResources: [RESOURCE_LINKS.hosa, ...resources],
    evidenceToSave: ['Source log', 'Draft versions', 'Upload checklist', 'Practice presentation notes'],
    officerChecklist: ['Deadline checklist exists', 'Sources are credible', 'Draft is more than a rough idea', 'Student can explain the project clearly'],
    mockRubric: [
      { category: 'Completeness', lookFor: 'Required pieces are present and organized.' },
      { category: 'Evidence', lookFor: 'Claims, impact, or career facts are backed by saved proof.' },
      { category: 'Presentation', lookFor: 'Student explains choices clearly and within time.' },
      { category: 'Deadline readiness', lookFor: 'Upload format and advisor verification are planned early.' },
    ],
    watchOuts: ['Treating uploads like rough drafts.', 'Building the project the week before competition.'],
  })
}

function teamPack({ eventName, slug, bestFor, quickTags, firstTask, packType = 'Team Events', resources = [RESOURCE_LINKS.medline, RESOURCE_LINKS.cdc] }) {
  return pack({
    eventName,
    slug,
    packType,
    category: 'Team Events',
    bestFor,
    quickTags,
    startHere: ['Confirm every teammate can meet consistently.', firstTask, 'Assign roles and backup roles before the first full practice.'],
    fourWeekPlan: [
      { week: 'Week 1', focus: 'Set roles, shared folders, and a weekly meeting schedule.' },
      { week: 'Week 2', focus: 'Build content, sources, or topic ownership by role.' },
      { week: 'Week 3', focus: 'Run a timed team practice and fix weak handoffs.' },
      { week: 'Week 4', focus: 'Complete a mock round and officer review with every teammate present.' },
    ],
    practiceTasks: ['Create a team role chart.', 'Keep a meeting log.', 'Save division-of-work proof.', 'Run one timed mock round.', 'Write a backup plan for missing work.'],
    freeResources: [RESOURCE_LINKS.hosa, ...resources],
    evidenceToSave: ['Role chart', 'Meeting notes', 'Shared draft links or screenshots', 'Mock round feedback'],
    officerChecklist: ['Every teammate has a role', 'Team has met this week', 'Weak sections have owners', 'Backup plan exists for deadlines'],
    mockRubric: [
      { category: 'Teamwork', lookFor: 'Work is shared and teammates can explain their role.' },
      { category: 'Content', lookFor: 'Information is accurate and focused.' },
      { category: 'Timing', lookFor: 'Team can finish within the expected time.' },
      { category: 'Accountability', lookFor: 'Evidence shows consistent team progress.' },
    ],
    watchOuts: ['Letting one teammate carry the event.', 'Practicing pieces separately but never together.'],
  })
}

function creativePack({ eventName, slug, bestFor, quickTags, firstTask, resources = [RESOURCE_LINKS.medline] }) {
  return pack({
    eventName,
    slug,
    packType: 'Career and Creative',
    category: 'Career and Creative',
    bestFor,
    quickTags,
    startHere: ['Read the guideline for required career, display, photo, or presentation pieces.', firstTask, 'Sketch the story before making the final visual product.'],
    fourWeekPlan: [
      { week: 'Week 1', focus: 'Research the career or visual topic and collect credible source notes.' },
      { week: 'Week 2', focus: 'Create a rough visual plan and get feedback before polishing.' },
      { week: 'Week 3', focus: 'Build the final draft and practice explaining choices.' },
      { week: 'Week 4', focus: 'Run a mock presentation and verify display or upload rules.' },
    ],
    practiceTasks: ['Build a career/source checklist.', 'Create a visual storyboard.', 'Save draft versions.', 'Practice a two-minute explanation.', 'Ask for design and content feedback.'],
    freeResources: [RESOURCE_LINKS.hosa, ...resources],
    evidenceToSave: ['Source notes', 'Visual drafts', 'Feedback checklist', 'Practice recording or notes'],
    officerChecklist: ['Visual tells a clear story', 'Facts are sourced', 'Student can explain choices', 'Guideline requirements are checked'],
    mockRubric: [
      { category: 'Clarity', lookFor: 'The visual message is easy to understand.' },
      { category: 'Accuracy', lookFor: 'Career or health information is credible.' },
      { category: 'Design', lookFor: 'Layout helps the message instead of distracting.' },
      { category: 'Explanation', lookFor: 'Student can explain the story and choices.' },
    ],
    watchOuts: ['Making it pretty but shallow.', 'Forgetting to practice the explanation.'],
  })
}

export const EVENT_PREP_PACKS = [
  pack({
    eventName: 'Extemporaneous Writing',
    slug: 'extemporaneous-writing',
    packType: 'Writing and Speaking',
    category: 'Writing and Speaking',
    bestFor: 'Students who can think quickly, write clearly, and connect health issues to realistic solutions.',
    quickTags: ['Timed writing', 'Policy examples', 'Clear structure'],
    startHere: ['Read the official guideline and confirm timing, prompt rules, and device rules.', 'Build a running example bank with school, Georgia, national, and global health examples.', 'Practice one short timed response before trying a full response.'],
    fourWeekPlan: [
      { week: 'Week 1', focus: 'Write two 15-minute outlines using claim, evidence, counterpoint, recommendation, and closing.' },
      { week: 'Week 2', focus: 'Write one full timed response and mark where the argument gets vague.' },
      { week: 'Week 3', focus: 'Create a one-page transition and evidence bank for common teen health topics.' },
      { week: 'Week 4', focus: 'Complete a mock writing round and ask an officer to score organization, evidence, and clarity.' },
    ],
    practiceTasks: ['Write a 30-minute response on a teen health issue.', 'Rewrite only the introduction three different ways.', 'Create a counterargument paragraph for a public health topic.', 'Summarize one health policy article in five bullet points.', 'Build a bank of 10 concrete examples.', 'Complete one mock round without pausing the timer.'],
    freeResources: [RESOURCE_LINKS.hosa, RESOURCE_LINKS.cdc, RESOURCE_LINKS.medline, RESOURCE_LINKS.pubmed],
    evidenceToSave: ['Timed response drafts', 'Issue summary folder', 'Example bank', 'Officer feedback notes', 'Before-and-after paragraph revisions'],
    officerChecklist: ['Response has a clear claim', 'Evidence is specific and credible', 'Counterpoint is addressed respectfully', 'Recommendation is realistic', 'Student finishes within time'],
    mockRubric: [
      { category: 'Argument', lookFor: 'Clear claim, logical support, and a focused recommendation.' },
      { category: 'Evidence', lookFor: 'Examples are specific enough to sound real, not generic.' },
      { category: 'Organization', lookFor: 'Paragraphs are easy to follow under time pressure.' },
      { category: 'Writing control', lookFor: 'Grammar and wording do not distract from meaning.' },
      { category: 'Timing', lookFor: 'Student finishes with time to reread.' },
    ],
    watchOuts: ['Writing a general essay with no health evidence.', 'Spending too long on the opening and rushing the recommendation.', 'Forgetting to verify Georgia SLC writing and device rules.'],
  }),
  testPack({ eventName: 'Medical Terminology', slug: 'medical-terminology', bestFor: 'New or returning members who can study word parts consistently.', quickTags: ['Flashcards', 'Roots and suffixes', 'Timed quizzes'], firstTask: 'Create 100 flashcards: 40 prefixes, 40 suffixes, and 20 roots.', focus: 'medical word parts', resources: [RESOURCE_LINKS.medline, RESOURCE_LINKS.ncbi, RESOURCE_LINKS.cdc], advanced: true }),
  testPack({ eventName: 'Behavioral Health', slug: 'behavioral-health', bestFor: 'Students interested in psychology, mental health vocabulary, and applied scenarios.', quickTags: ['Psych terms', 'Scenarios', 'Ethics'], firstTask: 'Build a 50-term list covering conditions, support systems, treatment settings, and ethics.', focus: 'behavioral health concepts', resources: [RESOURCE_LINKS.medline, RESOURCE_LINKS.cdc, RESOURCE_LINKS.ncbi], advanced: true }),
  testPack({ eventName: 'Medical Math', slug: 'medical-math', bestFor: 'Students who like accuracy, units, formulas, and checking work carefully.', quickTags: ['Conversions', 'Dosage-style math', 'Error log'], firstTask: 'Complete 40 conversions and 15 dosage-style problems while writing units on every line.', focus: 'healthcare calculations', resources: [RESOURCE_LINKS.ncbi, RESOURCE_LINKS.medline, RESOURCE_LINKS.cdc], advanced: true }),
  testPack({ eventName: 'Health Informatics', slug: 'health-informatics', bestFor: 'Students who like healthcare systems, privacy, data, and technology vocabulary.', quickTags: ['EHRs', 'Privacy', 'Data systems'], firstTask: 'Create a 50-term glossary on EHRs, interoperability, privacy, and clinical decision support.', focus: 'health data systems', resources: [RESOURCE_LINKS.medline, RESOURCE_LINKS.ncbi, RESOURCE_LINKS.cdc], advanced: true }),
  speakingPack({ eventName: 'Prepared Speaking', slug: 'prepared-speaking', bestFor: 'Students willing to write, record, revise, and practice delivery every week.', quickTags: ['Speech draft', 'Recording', 'Feedback'], firstTask: 'Write an outline with a strong opening, two main points, one health example, and a closing.', resources: [RESOURCE_LINKS.cdc, RESOURCE_LINKS.medline, RESOURCE_LINKS.pubmed] }),
  testPack({ eventName: 'World Health and Disparities', slug: 'world-health-and-disparities', bestFor: 'Students who like global health, equity, systems, and cause-effect thinking.', quickTags: ['Global health', 'Equity', 'Issue briefs'], firstTask: 'Write a one-page disparity brief with cause, affected group, consequence, and intervention.', focus: 'global health disparities', resources: [RESOURCE_LINKS.cdc, RESOURCE_LINKS.medline, RESOURCE_LINKS.pubmed] }),
  teamPack({ eventName: 'Health Education', slug: 'health-education', bestFor: 'Teams that can teach a real audience and collect learning evidence.', quickTags: ['Lesson plan', 'Audience data', 'Portfolio'], firstTask: 'Pick one target audience and one learning objective, then draft a pre/post survey.', packType: 'Team Events', resources: [RESOURCE_LINKS.cdc, RESOURCE_LINKS.medline] }),
  teamPack({ eventName: 'Community Awareness', slug: 'community-awareness', bestFor: 'Teams that can plan outreach, measure reach, and tell a clear impact story.', quickTags: ['Campaign', 'Impact proof', 'Outreach'], firstTask: 'Define one school or community health issue, audience, campaign goal, and two outreach actions.', packType: 'Team Events', resources: [RESOURCE_LINKS.cdc, RESOURCE_LINKS.medline] }),
  teamPack({ eventName: 'Public Health', slug: 'public-health', bestFor: 'Teams that can combine research, data, video, and presentation practice.', quickTags: ['Research', 'Video/trailer', 'Data'], firstTask: 'Read the annual topic and create a problem brief with audience, cause, evidence, and action.', packType: 'Team Events', resources: [RESOURCE_LINKS.cdc, RESOURCE_LINKS.pubmed, RESOURCE_LINKS.medline] }),
  teamPack({ eventName: 'Mental Health Promotion', slug: 'mental-health-promotion', bestFor: 'Teams that can handle mental health topics respectfully with resources and evidence.', quickTags: ['Respectful language', 'Resources', 'Campaign'], firstTask: 'Identify one risk or protective factor and draft a respectful resource-based campaign idea.', packType: 'Team Events', resources: [RESOURCE_LINKS.cdc, RESOURCE_LINKS.medline] }),
  teamPack({ eventName: 'Public Service Announcement', slug: 'public-service-announcement', bestFor: 'Teams that can write, film, edit, and meet upload deadlines.', quickTags: ['Script', 'Storyboard', 'Upload'], firstTask: 'Write a 30-second concept script and list the shots needed before filming.', packType: 'Team Events', resources: [RESOURCE_LINKS.cdc, RESOURCE_LINKS.medline] }),
  teamPack({ eventName: 'Medical Innovation', slug: 'medical-innovation', bestFor: 'Teams that can solve a real healthcare problem and explain feasibility.', quickTags: ['Problem', 'Prototype', 'Pitch'], firstTask: 'List five healthcare problems and choose one with a real user and simple prototype path.', packType: 'Team Events', resources: [RESOURCE_LINKS.medline, RESOURCE_LINKS.ncbi, RESOURCE_LINKS.pubmed] }),
  teamPack({ eventName: 'HOSA Bowl', slug: 'hosa-bowl', bestFor: 'Four-person teams that can meet weekly, split topics, and practice speed.', quickTags: ['Quiz team', 'Topic owners', 'Buzzer practice'], firstTask: 'Run a baseline quiz and assign topic owners to each teammate.', packType: 'Team Events', resources: [RESOURCE_LINKS.medline, RESOURCE_LINKS.cdc] }),
  teamPack({ eventName: 'Biomedical Debate', slug: 'biomedical-debate', bestFor: 'Teams that can argue both sides with evidence and stay calm under pressure.', quickTags: ['Evidence file', 'Rebuttal', 'Ethics'], firstTask: 'Build a pro/con evidence table with five credible source leads on each side.', packType: 'Team Events', resources: [RESOURCE_LINKS.pubmed, RESOURCE_LINKS.ncbi, RESOURCE_LINKS.cdc] }),
  teamPack({ eventName: 'Forensic Science', slug: 'forensic-science', bestFor: 'Disciplined pairs who can divide science topics and practice case analysis.', quickTags: ['Case analysis', 'Topic split', 'Details'], firstTask: 'Divide forensic topics between partners and complete one practice case together.', packType: 'Team Events', resources: [RESOURCE_LINKS.ncbi, RESOURCE_LINKS.medline] }),
  creativePack({ eventName: 'Health Career Display', slug: 'health-career-display', bestFor: 'Students who want a structured first competition with career research and visuals.', quickTags: ['Career research', 'Display', 'Explanation'], firstTask: 'Choose one healthcare career and research training, duties, setting, skills, and demand.', resources: [RESOURCE_LINKS.medline, RESOURCE_LINKS.ncbi] }),
  projectPack({ eventName: 'Research Poster', slug: 'research-poster', bestFor: 'Students who can turn research into a clean poster and explain it clearly.', quickTags: ['Poster PDF', 'Research question', 'Presentation'], firstTask: 'Write one research question and collect three credible source leads.', resources: [RESOURCE_LINKS.pubmed, RESOURCE_LINKS.ncbi, RESOURCE_LINKS.cdc] }),
  speakingPack({ eventName: 'Researched Persuasive Writing and Speaking', slug: 'researched-persuasive-writing-and-speaking', bestFor: 'Strong writers who can defend a health position out loud.', quickTags: ['Paper', 'Speech', 'Evidence'], firstTask: 'Choose a health position and create a source table with evidence for and against it.', resources: [RESOURCE_LINKS.pubmed, RESOURCE_LINKS.cdc, RESOURCE_LINKS.medline] }),
  testPack({ eventName: 'Medical Reading', slug: 'medical-reading', bestFor: 'Students who can read steadily and remember important details.', quickTags: ['Reading plan', 'Notes', 'Timed recall'], firstTask: 'Create a reading calendar and a notes template for characters, themes, health concepts, and details.', focus: 'assigned reading and recall', resources: [RESOURCE_LINKS.medline] }),
  testPack({ eventName: 'Healthcare Issues Exam', slug: 'healthcare-issues-exam', bestFor: 'Students who follow healthcare news and can review weekly.', quickTags: ['Current events', 'Weekly review', 'Recognition'], firstTask: 'Create a weekly healthcare news log with topic, source, key issue, and why it matters.', focus: 'current healthcare issues', resources: [RESOURCE_LINKS.cdc, RESOURCE_LINKS.medline, RESOURCE_LINKS.pubmed] }),
  testPack({ eventName: 'Medical Law and Ethics', slug: 'medical-law-and-ethics', bestFor: 'Students who like rules, rights, responsibilities, and ethical choices.', quickTags: ['Ethics', 'Rights', 'Scenarios'], firstTask: 'Build a chart of key ethics terms and one example scenario for each.', focus: 'healthcare ethics and law basics', resources: [RESOURCE_LINKS.medline, RESOURCE_LINKS.ncbi] }),
  testPack({ eventName: 'Epidemiology', slug: 'epidemiology', bestFor: 'Students who like outbreaks, disease patterns, and evidence-based thinking.', quickTags: ['Outbreaks', 'Data', 'Disease patterns'], firstTask: 'Create a concept map for outbreak, exposure, risk factor, prevention, and surveillance.', focus: 'disease patterns and public health data', resources: [RESOURCE_LINKS.cdc, RESOURCE_LINKS.ncbi, RESOURCE_LINKS.pubmed] }),
  testPack({ eventName: 'Nutrition', slug: 'nutrition', bestFor: 'Students interested in wellness, diet, and health education.', quickTags: ['Nutrients', 'Wellness', 'Timed quiz'], firstTask: 'Build a glossary of nutrients, diet patterns, body systems, and common nutrition terms.', focus: 'nutrition and wellness concepts', resources: [RESOURCE_LINKS.medline, RESOURCE_LINKS.cdc, RESOURCE_LINKS.ncbi] }),
  testPack({ eventName: 'Human Growth and Development', slug: 'human-growth-and-development', bestFor: 'Students who like psychology, lifespan development, and health across ages.', quickTags: ['Lifespan', 'Psychology', 'Stages'], firstTask: 'Create a lifespan chart with physical, cognitive, and social-emotional milestones.', focus: 'growth stages and development concepts', resources: [RESOURCE_LINKS.medline, RESOURCE_LINKS.ncbi] }),
  testPack({ eventName: 'Healthcare Administration', slug: 'healthcare-administration', bestFor: 'Students interested in how hospitals, clinics, teams, money, and policies work together.', quickTags: ['Systems', 'Policies', 'Operations'], firstTask: 'Build a map of healthcare roles, departments, payment ideas, privacy, and quality improvement.', focus: 'healthcare management systems', resources: [RESOURCE_LINKS.medline, RESOURCE_LINKS.ncbi, RESOURCE_LINKS.cdc] }),
  creativePack({ eventName: 'Health Career Photography', slug: 'health-career-photography', bestFor: 'Creative students who can research a health career and tell the story visually.', quickTags: ['Photo story', 'Career research', 'Portfolio'], firstTask: 'Pick one health career and sketch a photo story showing tools, setting, people, and impact.', resources: [RESOURCE_LINKS.medline, RESOURCE_LINKS.ncbi] }),
]

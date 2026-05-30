import { SOURCE_LINKS } from './prepResourceLinks.js'

const OFFICIAL_GUIDELINES = {
  label: 'Official HOSA Guidelines',
  url: 'https://hosa.org/guidelines/',
  type: 'Official Rules',
  why: 'Verify event rules, rating sheet, timing, upload rules, and Georgia/Wheeler requirements.',
  action: 'Read the rating sheet first.',
}

const EXTRA_LINKS = {
  fdaDevicesAtFda: {
    label: 'FDA Devices@FDA',
    url: 'https://www.accessdata.fda.gov/scripts/cdrh/devicesatfda/',
    why: 'Search existing cleared and approved devices before choosing an innovation idea.',
    type: 'Research',
  },
  fdaDeNovo: {
    label: 'FDA De Novo Database',
    url: 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/denovo.cfm',
    why: 'Look for lower-risk new device examples and how user needs are framed.',
    type: 'Research',
  },
  fdaMaude: {
    label: 'FDA MAUDE Database',
    url: 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfmaude/search.cfm',
    why: 'Review real device problem reports so safety risks are not ignored.',
    type: 'Research',
  },
  cdcGlobalHealth: {
    label: 'CDC Global Health',
    url: 'https://www.cdc.gov/global-health/',
    why: 'Use for global prevention, outbreak, and health systems context.',
    type: 'Learn',
  },
  cdcSchoolHealth: {
    label: 'CDC School Health',
    url: 'https://www.cdc.gov/school-health/',
    why: 'Use for school audience needs, health education planning, and youth prevention context.',
    type: 'Learn',
  },
}

const S = SOURCE_LINKS
const X = EXTRA_LINKS

function click(source, action, why = source.why) {
  return { ...source, why, action }
}

function drill(title, time, steps) {
  return { title, time, steps }
}

function search(label, query, why) {
  return { label, query, why }
}

function guide({ firstClicks, practiceDrills, searchPrompts, avoidList }) {
  return {
    firstClicks: [OFFICIAL_GUIDELINES, ...firstClicks].slice(0, 5),
    practiceDrills: practiceDrills.slice(0, 3),
    searchPrompts: searchPrompts.slice(0, 3),
    avoidList: avoidList.slice(0, 4),
  }
}

const GUIDES = {
  'Extemporaneous Writing': guide({
    firstClicks: [
      click(S.cdcHealthTopics, 'Pick one current public health topic.'),
      click(S.kff, 'Pull one policy fact or debate angle.', 'Use for health policy, cost, access, and system examples.'),
      click(S.pubMed, 'Search one topic and skim abstracts only.'),
      click(S.cdcClearCommunication, 'Make your argument easier to read.'),
    ],
    practiceDrills: [
      drill('30-minute timed response', '30 min', ['Write claim, evidence, counterpoint, recommendation, and closing.', 'Spend the final 3 minutes checking clarity.']),
      drill('Article summary sprint', '10 min', ['Summarize problem, cause, stakeholder, and solution.', 'Add one sentence explaining why it matters to teens.']),
    ],
    searchPrompts: [
      search('Teen health policy', 'adolescent health policy prevention', 'Find policy and prevention angles.'),
      search('Public health issue brief', 'public health issue adolescent intervention', 'Find issue framing and intervention examples.'),
    ],
    avoidList: ['Memorizing random statistics without a source.', 'Writing without a counterpoint.', 'Ending with vague awareness language.'],
  }),
  'Medical Terminology': guide({
    firstClicks: [
      click(S.medlineEncyclopedia, 'Build word lists by body system.'),
      click(S.medlineMedicalTests, 'Connect terms to real test names and measurements.'),
      click(S.openStaxAnatomy, 'Review body-system vocabulary when terms feel disconnected.'),
      click(S.ncbiBookshelf, 'Use for deeper explanations after basic review.'),
    ],
    practiceDrills: [
      drill('Word-parts flashcards', '25 min', ['Study 25 roots, prefixes, or suffixes.', 'Write one example word for each missed card.']),
      drill('Timed vocab quiz', '20 min', ['Answer 30 terms without notes.', 'Sort misses by root, suffix, or body system.']),
    ],
    searchPrompts: [
      search('Medical word parts', 'medical terminology prefixes suffixes roots', 'Find plain explanations of word parts.'),
      search('Body system terms', 'cardiovascular medical terminology', 'Swap the body system as needed.'),
    ],
    avoidList: ['Only memorizing full words without roots.', 'Skipping suffixes.', 'Not tracking missed terms by category.'],
  }),
  'Behavioral Health': guide({
    firstClicks: [
      click(S.nimhTopics, 'Start with condition and symptom vocabulary.'),
      click(S.cdcMentalHealth, 'Use public health framing and prevention language.'),
      click(S.samhsaMentalHealth, 'Review support systems and service terms.'),
      click(S.medlinePlus, 'Check plain-language condition summaries.'),
    ],
    practiceDrills: [
      drill('Scenario vocabulary drill', '20 min', ['Read one scenario.', 'Name the key terms, supports, and safety considerations.']),
      drill('Compare two conditions', '25 min', ['List symptoms, supports, and common misunderstandings.', 'Write one respectful explanation for each.']),
    ],
    searchPrompts: [
      search('Adolescent behavioral health', 'adolescent behavioral health prevention resilience', 'Find prevention and resilience language.'),
      search('Mental health support systems', 'mental health support systems adolescents', 'Find support and referral context.'),
    ],
    avoidList: ['Using stigmatizing wording.', 'Treating every scenario like a diagnosis exercise.', 'Skipping ethics and support systems.'],
  }),
  'Medical Math': guide({
    firstClicks: [
      click(S.medlineMedicalTests, 'Use real units and lab-test context.'),
      click(S.openStaxAnatomy, 'Review measurement context tied to body systems.'),
      click(S.ncbiBookshelf, 'Use for formulas or clinical context when needed.'),
      click({ label: 'Conversion and error-log practice plan', url: '#', why: 'Use this pack for unit conversions, proportions, formulas, and missed-problem review.', type: 'Practice' }, 'Start a unit and rounding error log.'),
    ],
    practiceDrills: [
      drill('Unit conversion set', '25 min', ['Complete 20 conversions.', 'Circle every unit and rewrite any missed setup.']),
      drill('Dosage-style calculation set', '25 min', ['Complete 15 proportion or formula problems.', 'Mark errors as unit, decimal, formula, or rounding.']),
    ],
    searchPrompts: [
      search('Dosage calculation education', 'medication dosage calculation education', 'Find calculation accuracy context.'),
      search('Metric conversion healthcare', 'metric conversions healthcare calculations', 'Find practice concepts, not answer keys.'),
    ],
    avoidList: ['Doing math without writing units.', 'Skipping decimal checks.', 'Repeating problems without an error log.'],
  }),
  'Health Informatics': guide({
    firstClicks: [
      click(S.healthItHome, 'Define EHR, patient portal, interoperability, and health information exchange.'),
      click(S.healthItInterop, 'Study how systems share data.'),
      click(S.healthItPrivacy, 'Connect privacy and security to health data examples.'),
      click(S.ahrqData, 'Explore one healthcare data tool or dashboard.'),
    ],
    practiceDrills: [
      drill('Core terms glossary', '25 min', ['Define 20 informatics terms.', 'Add one real healthcare example for each group of terms.']),
      drill('Dashboard summary', '20 min', ['Open one health data dashboard.', 'Summarize what it measures and one data-quality risk.']),
    ],
    searchPrompts: [
      search('EHR privacy interoperability', 'health informatics electronic health records privacy interoperability', 'Find EHR, privacy, and data-sharing research leads.'),
      search('Health data quality', 'health data quality patient safety informatics', 'Find data accuracy and safety examples.'),
    ],
    avoidList: ['Memorizing tech words without healthcare examples.', 'Ignoring privacy and security.', 'Confusing data storage with data quality.'],
  }),
  'World Health and Disparities': guide({
    firstClicks: [
      click(S.whoHealthTopics, 'Pick one global topic and define the health outcome.'),
      click(S.whoData, 'Find one comparison data point.'),
      click(X.cdcGlobalHealth, 'Add U.S. public health context for global work.'),
      click(S.countyHealthRankings, 'Practice equity thinking with local determinants.'),
    ],
    practiceDrills: [
      drill('Population comparison', '25 min', ['Compare two populations on one outcome.', 'List cause, consequence, and intervention.']),
      drill('Equity map', '20 min', ['Map access, environment, policy, and education factors.', 'Add one realistic intervention.']),
    ],
    searchPrompts: [
      search('Global health disparities', 'global health disparities equity access', 'Find inequity and access examples.'),
      search('WHO health data', 'WHO health data maternal child infectious disease', 'Find international comparison topics.'),
    ],
    avoidList: ['Using stereotypes instead of data.', 'Listing problems without interventions.', 'Ignoring social determinants.'],
  }),
  'Prepared Speaking': guide({
    firstClicks: [
      click(S.cdcHealthTopics, 'Choose a health topic with clear prevention or leadership angle.'),
      click(S.medlinePlus, 'Check plain-language background for accuracy.'),
      click(S.cdcClearCommunication, 'Tighten wording for a real audience.'),
      click(S.cdcMmwr, 'Pull one current example if your speech needs evidence.'),
    ],
    practiceDrills: [
      drill('Three-minute recording', '15 min', ['Record a shorter version of the speech.', 'Mark one delivery fix and one content fix.']),
      drill('Opening and closing rewrite', '20 min', ['Write three possible openings.', 'Rewrite the closing as a call to action.']),
    ],
    searchPrompts: [
      search('Health communication teens', 'health communication prevention adolescents', 'Find evidence for a student-friendly speech.'),
      search('Public health prevention topic', 'public health prevention health communication', 'Find prevention examples.'),
    ],
    avoidList: ['Memorizing without understanding.', 'Waiting too long to practice out loud.', 'Using claims with no credible example.'],
  }),
  'Health Education': guide({
    firstClicks: [
      click(X.cdcSchoolHealth, 'Choose a realistic student audience and health goal.'),
      click(S.communityToolBox, 'Plan audience, activity, and evaluation.'),
      click(S.cdcClearCommunication, 'Make handouts and slides easier to understand.'),
      click(S.medlinePlus, 'Check topic accuracy before teaching.'),
    ],
    practiceDrills: [
      drill('Mini lesson build', '30 min', ['Write audience, learning goal, activity, and proof of learning.', 'Teach a 5-minute version.']),
      drill('Feedback loop', '15 min', ['Ask two peers what they learned.', 'Revise one confusing part.']),
    ],
    searchPrompts: [
      search('Health education intervention teens', 'health education intervention adolescents evaluation', 'Find intervention and evaluation examples.'),
      search('School health education topic', 'school health education prevention students', 'Find school-friendly topics.'),
    ],
    avoidList: ['Teaching too many goals at once.', 'Making posters without proof of learning.', 'Forgetting audience needs.'],
  }),
  'Community Awareness': guide({
    firstClicks: [
      click(S.communityToolBox, 'Plan stakeholders, goal, activities, and evaluation.'),
      click(S.countyHealthRankings, 'Find community factors or local data ideas.'),
      click(S.communityGuide, 'Look for evidence-based intervention ideas.'),
      click(S.cdcHealthTopics, 'Check accurate background for your issue.'),
    ],
    practiceDrills: [
      drill('Stakeholder map', '20 min', ['List audience, partners, barrier, message, and action.', 'Pick one measurable reach goal.']),
      drill('Campaign evidence log', '20 min', ['Record date, action, audience, reach, and proof saved.', 'Add one improvement for next week.']),
    ],
    searchPrompts: [
      search('Community health campaign evaluation', 'community health awareness campaign evaluation', 'Find awareness and evaluation examples.'),
      search('Local health factors', 'county health rankings community health factors', 'Find community determinant ideas.'),
    ],
    avoidList: ['Counting activity without measuring reach.', 'Choosing a message before defining the audience.', 'Waiting until the end to save proof.'],
  }),
  'Public Health': guide({
    firstClicks: [
      click(S.cdcHealthTopics, 'Pick a focused public health problem.'),
      click(S.cdcDataStats, 'Find one data point that supports the problem.'),
      click(S.communityGuide, 'Find prevention or intervention examples.'),
      click(S.countyHealthRankings, 'Add community factor context.'),
    ],
    practiceDrills: [
      drill('Problem-cause-intervention chart', '25 min', ['List problem, affected group, cause, intervention, and evidence.', 'Add what your team will show in the presentation.']),
      drill('Prevention levels check', '15 min', ['Name primary, secondary, and tertiary prevention examples.', 'Connect one to your topic.']),
    ],
    searchPrompts: [
      search('School public health intervention', 'public health intervention school adolescents', 'Find school-based prevention examples.'),
      search('Public health data topic', 'public health data prevention intervention', 'Find data-backed topic leads.'),
    ],
    avoidList: ['Making a video before the research is focused.', 'Using broad topics with no target population.', 'Forgetting measurable impact.'],
  }),
  'Mental Health Promotion': guide({
    firstClicks: [
      click(S.nimhTopics, 'Use accurate mental health vocabulary.'),
      click(S.cdcMentalHealth, 'Frame the campaign as prevention and support.'),
      click(S.samhsaMentalHealth, 'Check support-system and resource language.'),
      click(S.cdcClearCommunication, 'Make messages clear and stigma-free.'),
    ],
    practiceDrills: [
      drill('Message test', '20 min', ['Write a campaign message.', 'Check if it is respectful, actionable, and resource-based.']),
      drill('Resource disclaimer check', '10 min', ['Add a support-resource note.', 'Remove wording that sounds like diagnosis or treatment advice.']),
    ],
    searchPrompts: [
      search('School mental health promotion', 'school mental health promotion adolescents', 'Find youth promotion examples.'),
      search('Mental health stigma communication', 'mental health stigma communication adolescents', 'Find respectful messaging ideas.'),
    ],
    avoidList: ['Using fear-based or stigmatizing messages.', 'Giving medical advice.', 'Skipping crisis/support resource language.'],
  }),
  'Public Service Announcement': guide({
    firstClicks: [
      click(S.cdcClearCommunication, 'Make the PSA message short and direct.'),
      click(S.cdcHealthTopics, 'Choose one accurate health topic.'),
      click(S.cdcMmwr, 'Find a current example if needed.'),
      click(S.medlinePlus, 'Check plain-language wording.'),
    ],
    practiceDrills: [
      drill('15-second script', '15 min', ['Write hook, fact, action, and closing.', 'Cut every extra sentence.']),
      drill('Storyboard pass', '25 min', ['List each shot, spoken line, and visual proof.', 'Check that the message still works without captions.']),
    ],
    searchPrompts: [
      search('Health PSA communication', 'health communication public service announcement', 'Find health messaging research leads.'),
      search('Clear health communication', 'CDC clear communication health messages', 'Find plain-language message guidance.'),
    ],
    avoidList: ['Starting filming before the message is clear.', 'Using too many facts for a short PSA.', 'Forgetting upload requirements.'],
  }),
  'Medical Innovation': guide({
    firstClicks: [
      click(S.fdaDeviceDatabases, 'Check whether similar devices already exist.'),
      click(X.fdaDevicesAtFda, 'Search examples by device name or medical area.'),
      click(X.fdaDeNovo, 'Study new-device examples and intended-use language.'),
      click(X.fdaMaude, 'Find safety risks from real device reports.'),
    ],
    practiceDrills: [
      drill('User need to prototype brief', '30 min', ['Name the user, problem, existing solution, gap, and prototype idea.', 'Add one safety risk.']),
      drill('Device comparison', '25 min', ['Compare your idea with two existing devices.', 'Write what is different and what still needs proof.']),
    ],
    searchPrompts: [
      search('Medical device usability', 'medical device innovation usability healthcare', 'Find design and usability research leads.'),
      search('FDA medical device safety', 'FDA medical device adverse event safety', 'Find device safety language.'),
    ],
    avoidList: ['Pitching an idea without user need.', 'Ignoring existing devices.', 'Skipping safety and feasibility.'],
  }),
  'HOSA Bowl': guide({
    firstClicks: [
      click(S.medlinePlus, 'Use as a broad health topic review base.'),
      click(S.medlineEncyclopedia, 'Build mixed-topic vocabulary.'),
      click(S.openStaxAnatomy, 'Review anatomy and physiology weak spots.'),
      click(S.cdcHealthTopics, 'Add prevention and public health topics.'),
    ],
    practiceDrills: [
      drill('Team buzzer drill', '20 min', ['Read 25 mixed questions aloud.', 'Track who answers and which topics are missed.']),
      drill('Topic owner split', '15 min', ['Assign each teammate two topic areas.', 'Create a shared missed-question log.']),
    ],
    searchPrompts: [
      search('Health science review terms', 'health science anatomy medical terminology public health', 'Find broad review topic leads.'),
      search('Medical encyclopedia quiz prep', 'medical encyclopedia anatomy disease prevention terms', 'Find mixed vocabulary areas.'),
    ],
    avoidList: ['Studying alone without team speed practice.', 'Letting one teammate own every topic.', 'Ignoring missed-question patterns.'],
  }),
  'Biomedical Debate': guide({
    firstClicks: [
      click(S.pubMed, 'Find research evidence for both sides.'),
      click(S.cdcMmwr, 'Use current public health examples.'),
      click(S.kff, 'Use health policy and access context when relevant.'),
      click(S.ncbiBookshelf, 'Build background before arguing details.'),
    ],
    practiceDrills: [
      drill('Pro/con evidence table', '30 min', ['Find three claims per side.', 'Add source, evidence, and likely rebuttal.']),
      drill('Crossfire questions', '20 min', ['Write five questions for the other side.', 'Practice answering calmly with evidence.']),
    ],
    searchPrompts: [
      search('Biomedical ethics evidence', 'biomedical ethics policy evidence', 'Find debate evidence and ethics framing.'),
      search('Health policy argument', 'health policy debate evidence public health ethics', 'Find policy-side sources.'),
    ],
    avoidList: ['Only preparing the side you prefer.', 'Using emotional claims without evidence.', 'Forgetting ethical tradeoffs.'],
  }),
  'Forensic Science': guide({
    firstClicks: [
      click(S.nijForensic, 'Start with forensic discipline background.'),
      click(S.nistOsac, 'Check standards and terminology.'),
      click(S.openStaxAnatomy, 'Review anatomy context for cases.'),
      click(S.ncbiBookshelf, 'Use for deeper science background.'),
    ],
    practiceDrills: [
      drill('Case evidence chart', '25 min', ['List evidence type, possible meaning, limits, and next question.', 'Mark anything that could be contamination or bias.']),
      drill('Partner topic split', '15 min', ['Divide forensic topics.', 'Teach one weak topic to your partner.']),
    ],
    searchPrompts: [
      search('Forensic evidence analysis', 'forensic science evidence analysis standards', 'Find forensic method and standards leads.'),
      search('Forensic lab safety', 'forensic laboratory safety evidence contamination', 'Find safety and error examples.'),
    ],
    avoidList: ['Treating TV forensics as real rules.', 'Ignoring evidence limits.', 'Practicing separately but never as partners.'],
  }),
  'Health Career Display': guide({
    firstClicks: [
      click(S.blsHealthcare, 'Confirm duties, education, outlook, and work setting.'),
      click(S.onet, 'Find skills, work activities, and tools.'),
      click(S.medlinePlus, 'Connect the career to a health context.'),
      click(S.ncbiBookshelf, 'Use for deeper background if the career is technical.'),
    ],
    practiceDrills: [
      drill('Career fact chart', '25 min', ['Fill duties, skills, education, tools, setting, and outlook.', 'Turn each row into one display caption idea.']),
      drill('Display walkthrough', '15 min', ['Explain the display in two minutes.', 'Mark where visuals need clearer labels.']),
    ],
    searchPrompts: [
      search('Healthcare career duties', 'BLS healthcare occupation duties education outlook', 'Find career facts.'),
      search('O*NET healthcare career skills', 'O*NET healthcare career skills work activities', 'Find skills and work activity details.'),
    ],
    avoidList: ['Choosing visuals before understanding the career.', 'Using unsourced pay or outlook facts.', 'Making a display that is pretty but hard to explain.'],
  }),
  'Research Poster': guide({
    firstClicks: [
      click(S.pubMed, 'Find research abstracts and citations.'),
      click(S.ncbiBookshelf, 'Build background for the research question.'),
      click(S.cdcDataStats, 'Find data if your topic is population health.'),
      click(S.whoData, 'Use global data if your topic compares countries.'),
    ],
    practiceDrills: [
      drill('Research question outline', '25 min', ['Write question, method idea, result type, and implication.', 'Cut anything that cannot fit on a poster.']),
      drill('Three-source table', '25 min', ['Record source, finding, limitation, and poster use.', 'Pick the strongest source first.']),
    ],
    searchPrompts: [
      search('Research poster health topic', 'health research poster methods results discussion', 'Find structure and topic leads.'),
      search('Public health dataset', 'public health data statistics topic', 'Find data-backed poster ideas.'),
    ],
    avoidList: ['Making a poster before the question is clear.', 'Using sources you cannot explain.', 'Crowding the poster with paragraphs.'],
  }),
  'Researched Persuasive Writing and Speaking': guide({
    firstClicks: [
      click(S.pubMed, 'Find research evidence for your claim.'),
      click(S.kff, 'Use health policy context when relevant.'),
      click(S.cdcMmwr, 'Find current public health examples.'),
      click(S.cdcClearCommunication, 'Make the argument readable and speakable.'),
    ],
    practiceDrills: [
      drill('Thesis and evidence ladder', '25 min', ['Write thesis, three evidence points, and why each matters.', 'Add one likely counterargument.']),
      drill('Timed speech outline', '20 min', ['Practice speaking from outline only.', 'Mark where evidence sounds unclear.']),
    ],
    searchPrompts: [
      search('Health policy argument evidence', 'health policy argument evidence', 'Find persuasive evidence leads.'),
      search('Public health persuasive speech', 'public health persuasive speech evidence intervention', 'Find issue and intervention examples.'),
    ],
    avoidList: ['Writing a research paper that cannot be spoken well.', 'Ignoring counterarguments.', 'Using sources only on one side.'],
  }),
  'Medical Reading': guide({
    firstClicks: [
      click({ label: 'Official HOSA reading list', url: 'https://hosa.org/guidelines/', why: 'Confirm the current required reading list in the official guideline.', type: 'Official Rules' }, 'Confirm the book list before reading.'),
      click(S.medlinePlus, 'Look up health concepts from the readings.'),
      click(S.medlineEncyclopedia, 'Check unfamiliar diseases, tests, or anatomy terms.'),
      click(S.pubMed, 'Use only for background context, not plot summaries.'),
    ],
    practiceDrills: [
      drill('Chapter summary', '20 min', ['Summarize key events, health concepts, and details.', 'Add three recall questions.']),
      drill('Concept log', '15 min', ['Track medical terms, conditions, and ethical issues.', 'Connect each to a page or chapter.']),
    ],
    searchPrompts: [
      search('Medical concept background', 'MedlinePlus medical condition background', 'Find plain-language health context.'),
      search('Medical reading recall practice', 'reading comprehension health concepts recall notes', 'Find note-taking ideas.'),
    ],
    avoidList: ['Reading without notes.', 'Using summaries instead of the assigned text.', 'Ignoring small details that may become questions.'],
  }),
  'Healthcare Issues Exam': guide({
    firstClicks: [
      click(S.kff, 'Track U.S. healthcare policy, cost, access, and insurance issues.'),
      click(S.hhsNews, 'Review current federal health updates.'),
      click(S.cdcMmwr, 'Find public health reports and current issue examples.'),
      click(S.whoHealthTopics, 'Add global context for major issues.'),
    ],
    practiceDrills: [
      drill('Weekly issue brief', '20 min', ['Summarize issue, cause, stakeholder, impact, and source.', 'Write one likely exam-style question.']),
      drill('Current-events flashcards', '25 min', ['Create 20 cards from recent health issues.', 'Tag cards as cost, access, quality, policy, or public health.']),
    ],
    searchPrompts: [
      search('Healthcare policy access quality cost', 'healthcare policy access quality cost', 'Find current healthcare issue leads.'),
      search('Healthcare news public health', 'current healthcare issues public health policy', 'Find weekly review topics.'),
    ],
    avoidList: ['Only reading headlines.', 'Using opinion without source context.', 'Skipping older issues that are still active.'],
  }),
  'Medical Law and Ethics': guide({
    firstClicks: [
      click(S.hhsHipaa, 'Start with privacy and patient information rules.'),
      click(S.amaEthics, 'Review ethics principles and case reasoning.'),
      click(S.ohrpBelmont, 'Study human-subjects and consent principles.'),
      click(S.ahrqPatientSafety, 'Connect ethics to patient safety examples.'),
    ],
    practiceDrills: [
      drill('Ethics scenario grid', '25 min', ['Identify autonomy, beneficence, nonmaleficence, and justice.', 'Write the tradeoff in one sentence.']),
      drill('Law versus ethics chart', '15 min', ['Separate legal requirement, ethical concern, and best action.', 'Add one privacy risk.']),
    ],
    searchPrompts: [
      search('Medical ethics privacy consent', 'medical ethics patient privacy consent', 'Find ethics and privacy research leads.'),
      search('HIPAA scenario patient privacy', 'HIPAA patient privacy scenario healthcare ethics', 'Find privacy examples.'),
    ],
    avoidList: ['Treating every question as common sense.', 'Forgetting consent and privacy.', 'Ignoring competing ethical principles.'],
  }),
  'Epidemiology': guide({
    firstClicks: [
      click(S.cdcEpiCourse, 'Study outbreak, surveillance, rate, and risk basics.'),
      click(S.cdcDataStats, 'Practice reading public health data.'),
      click(S.whoDiseaseOutbreakNews, 'Use current outbreak examples.'),
      click(S.cdcMmwr, 'Read outbreak reports for person/place/time thinking.'),
    ],
    practiceDrills: [
      drill('Outbreak curve check', '25 min', ['Sketch or read an epidemic curve.', 'Name likely exposure pattern and next question.']),
      drill('Person-place-time table', '20 min', ['Fill person, place, time, exposure, and outcome.', 'Write one prevention step.']),
    ],
    searchPrompts: [
      search('Outbreak investigation surveillance', 'epidemiology outbreak investigation surveillance', 'Find outbreak method examples.'),
      search('Epidemiology rate risk', 'epidemiology rate risk calculation outbreak', 'Find calculation and interpretation examples.'),
    ],
    avoidList: ['Memorizing definitions without applying them.', 'Skipping calculations.', 'Forgetting person, place, and time.'],
  }),
  'Nutrition': guide({
    firstClicks: [
      click(S.usdaMyPlate, 'Use for nutrition education and meal pattern basics.'),
      click(S.dietaryGuidelines, 'Check official nutrition guidance.'),
      click(S.medlinePlus, 'Look up nutrition conditions or terms.'),
      click(S.cdcNutrition, 'Add public health nutrition context.'),
    ],
    practiceDrills: [
      drill('Meal analysis', '20 min', ['Review one meal or menu.', 'Name nutrients, strengths, and one evidence-based improvement.']),
      drill('Nutrient function chart', '25 min', ['List nutrient, function, source, deficiency concern, and health link.', 'Quiz yourself from the chart.']),
    ],
    searchPrompts: [
      search('Adolescent nutrition public health', 'adolescent nutrition public health', 'Find youth nutrition research leads.'),
      search('Dietary guidelines nutrients', 'Dietary Guidelines nutrients health education', 'Find official nutrition concepts.'),
    ],
    avoidList: ['Using diet myths or influencer claims.', 'Forgetting official guidance.', 'Memorizing foods without nutrient functions.'],
  }),
  'Human Growth and Development': guide({
    firstClicks: [
      click(S.cdcChildDevelopment, 'Start with milestones and development basics.'),
      click(S.openStaxPsychology, 'Review lifespan and psychology concepts.'),
      click(S.medlinePlus, 'Check age-related health topics.'),
      click(S.ncbiBookshelf, 'Use for deeper development background.'),
    ],
    practiceDrills: [
      drill('Life-stage chart', '25 min', ['List physical, cognitive, social, and health changes by stage.', 'Add one risk or support for each.']),
      drill('Case scenario', '20 min', ['Read a short age-related scenario.', 'Name stage, likely need, and support.']),
    ],
    searchPrompts: [
      search('Human development adolescence health', 'human development adolescence health', 'Find lifespan and youth health leads.'),
      search('Developmental milestones health', 'developmental milestones health lifespan', 'Find stage-based concepts.'),
    ],
    avoidList: ['Mixing up age ranges.', 'Only studying childhood.', 'Ignoring social and emotional development.'],
  }),
  'Healthcare Administration': guide({
    firstClicks: [
      click(S.blsHealthManagers, 'Start with manager duties and settings.'),
      click(S.ahrqPatientSafety, 'Connect administration to quality and safety.'),
      click(S.cms, 'Review payment, coverage, and system basics.'),
      click(S.healthItHome, 'Add health IT and data-system context.'),
    ],
    practiceDrills: [
      drill('Hospital role map', '20 min', ['Map departments, roles, patient flow, and admin decisions.', 'Add one quality or safety risk.']),
      drill('Quality scenario', '25 min', ['Read a safety issue.', 'Name root cause, metric, stakeholder, and improvement step.']),
    ],
    searchPrompts: [
      search('Healthcare administration quality safety', 'healthcare administration quality patient safety', 'Find systems and quality examples.'),
      search('Healthcare management operations', 'medical and health services managers healthcare operations quality', 'Find management concepts.'),
    ],
    avoidList: ['Studying careers only and skipping systems.', 'Forgetting cost, quality, and safety tradeoffs.', 'Ignoring health data and privacy.'],
  }),
  'Health Career Photography': guide({
    firstClicks: [
      click(S.blsHealthcare, 'Confirm duties, training, tools, and work settings.'),
      click(S.onet, 'Find skills and work activities to show visually.'),
      click(S.medlinePlus, 'Connect the career to patient or health context.'),
      click({ label: 'Local photo planning checklist', url: '#', why: 'Plan setting, tools, privacy, caption, and career story before taking photos.', type: 'Practice' }, 'Create a shot list before taking photos.'),
    ],
    practiceDrills: [
      drill('Shot list plan', '20 min', ['List setting, tools, duties, skills, and impact shots.', 'Mark any privacy or permission concern.']),
      drill('Caption draft', '15 min', ['Write one caption per planned photo.', 'Include career fact, source, and why the image matters.']),
    ],
    searchPrompts: [
      search('Healthcare career photography story', 'healthcare career duties tools work setting', 'Find career facts that can become photo ideas.'),
      search('O*NET healthcare tools tasks', 'O*NET healthcare occupation tools tasks', 'Find task and tool details.'),
    ],
    avoidList: ['Taking random photos before researching the career.', 'Including private patient information.', 'Using captions with unsourced career facts.'],
  }),
}

const fallbackGuide = guide({
  firstClicks: [
    click(S.medlinePlus, 'Start with plain-language background.'),
    click(S.cdcHealthTopics, 'Find prevention and public health context.'),
    click(S.pubMed, 'Use research abstracts for stronger evidence.'),
  ],
  practiceDrills: [
    drill('Focused prep sprint', '25 min', ['Read the guideline.', 'Choose one weak topic.', 'Save one piece of practice evidence.']),
  ],
  searchPrompts: [
    search('Event topic evidence', 'health science HOSA event topic evidence', 'Find background and evidence leads.'),
  ],
  avoidList: ['Opening every link before reading the guideline.', 'Saving sources without notes.'],
})

export function getResourceGuideForPack(pack) {
  if (!pack) return null
  return GUIDES[pack.eventName] || fallbackGuide
}

export const RESOURCE_GUIDE_EVENT_NAMES = Object.keys(GUIDES)

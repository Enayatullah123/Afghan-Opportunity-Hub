const degreeKeywords = {
  highschool: ['high school', 'highschool', '12th', 'secondary'],
  diploma: ['diploma', 'associate'],
  bachelor: ['bachelor', 'undergraduate', 'ba', 'bsc', 'b.s'],
  master: ['master', 'postgraduate', 'ma', 'msc', 'm.s'],
  phd: ['phd', 'doctorate', 'doctoral'],
};

const englishKeywords = ['toefl', 'ielts', 'duolingo', 'pte', 'english'];
const languageLevels = {
  none: 0,
  basic: 1,
  conversational: 3,
  beginner: 1,
  a1: 1,
  a2: 2,
  b1: 3,
  b2: 4,
  intermediate: 4,
  c1: 5,
  c2: 6,
  advanced: 5,
  fluent: 6,
  native: 6,
};

function normalize(value) {
  return String(value || '').toLowerCase();
}

function includesAny(text, candidates = []) {
  const target = normalize(text);
  return candidates.some((item) => target.includes(normalize(item)));
}

function degreeLevel(text) {
  const source = normalize(text);
  if (includesAny(source, degreeKeywords.phd)) return 5;
  if (includesAny(source, degreeKeywords.master)) return 4;
  if (includesAny(source, degreeKeywords.bachelor)) return 3;
  if (includesAny(source, degreeKeywords.diploma)) return 2;
  if (includesAny(source, degreeKeywords.highschool)) return 1;
  return 0;
}

function parseCgpaThreshold(text) {
  const source = normalize(text);
  const cgpaPattern = /cgpa[^\d]*(\d(?:\.\d+)?)/i;
  const slashPattern = /(\d(?:\.\d+)?)\s*\/\s*4/;

  const cgpaMatch = source.match(cgpaPattern);
  if (cgpaMatch?.[1]) return Number(cgpaMatch[1]);

  const slashMatch = source.match(slashPattern);
  if (slashMatch?.[1]) return Number(slashMatch[1]);

  return null;
}

function flattenJobs(jobsData = {}) {
  return Object.values(jobsData).flatMap((list) => Array.isArray(list) ? list : []);
}

function parseFirstNumber(value) {
  const match = String(value || '').match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

function parseExperienceYears(text) {
  const source = normalize(text);
  const match = source.match(/(\d+)\s*\+?\s*(years?|yrs?|year|کاله)/i);
  return match ? Number(match[1]) : null;
}

function levelScore(value) {
  const key = normalize(value).trim();
  return languageLevels[key] ?? 0;
}

function requiredLanguageLevel(text, languageKeyword) {
  const source = normalize(text);
  if (!source.includes(languageKeyword)) return null;
  if (includesAny(source, ['fluent', 'native', 'عالي', 'روان'])) return 6;
  if (includesAny(source, ['advanced', 'لوړه'])) return 5;
  if (includesAny(source, ['intermediate', 'منځنۍ'])) return 4;
  return 1;
}

export function scoreScholarshipMatch(profile, scholarship) {
  if (!profile || !scholarship) return 0;

  let score = 0;
  const maxScore = 4;
  const requirementsText = `${scholarship.eligibility || ''} ${scholarship.requirements || ''}`;

  if (profile.fieldOfStudy && includesAny(scholarship.field, [profile.fieldOfStudy, 'all fields'])) score += 1;
  if (profile.country && includesAny(scholarship.country, [profile.country])) score += 1;

  const requiredDegreeLevel = degreeLevel(requirementsText);
  if (!requiredDegreeLevel || degreeLevel(profile.educationLevel) >= requiredDegreeLevel) score += 1;

  const cgpaThreshold = parseCgpaThreshold(requirementsText);
  const profileCgpa = Number(profile.cgpa || 0);
  if (!cgpaThreshold || (profileCgpa && profileCgpa >= cgpaThreshold)) score += 1;

  return score / maxScore;
}

export function scoreJobMatch(profile, job) {
  if (!profile || !job) return 0;

  let score = 0;
  const maxScore = 4;
  const jobText = `${job.title || ''} ${job.description || ''} ${job.requirements || ''} ${job.education || ''}`;

  if (profile.fieldOfStudy && includesAny(jobText, [profile.fieldOfStudy])) score += 1;
  if (profile.country && includesAny(job.location || '', [profile.country, 'remote'])) score += 1;

  const requiredDegreeLevel = degreeLevel(jobText);
  if (!requiredDegreeLevel || degreeLevel(profile.educationLevel) >= requiredDegreeLevel) score += 1;

  if (!includesAny(jobText, englishKeywords) || includesAny(profile.englishLevel, ['b1', 'b2', 'c1', 'c2', 'ielts', 'toefl', 'advanced', 'intermediate'])) {
    score += 1;
  }

  return score / maxScore;
}

export function getRecommendedOpportunities(profile, scholarships = [], jobsData = {}, limit = 3) {
  const allJobs = Array.isArray(jobsData) ? jobsData : flattenJobs(jobsData);

  const recommendedScholarships = (scholarships || [])
    .map((item) => ({ ...item, _matchScore: scoreScholarshipMatch(profile, item) }))
    .sort((a, b) => b._matchScore - a._matchScore)
    .slice(0, limit);

  const recommendedJobs = (allJobs || [])
    .map((item) => ({ ...item, _matchScore: scoreJobMatch(profile, item) }))
    .sort((a, b) => b._matchScore - a._matchScore)
    .slice(0, limit);

  return { recommendedScholarships, recommendedJobs };
}

export function evaluateEligibility(formValues, opportunity, type = 'scholarship') {
  const text = `${opportunity?.eligibility || ''} ${opportunity?.requirements || ''} ${opportunity?.education || ''}`;

  const checks = [];

  if (type === 'scholarship') {
    const cgpaThreshold = parseCgpaThreshold(text);
    if (cgpaThreshold) {
      const userCgpa = Number(formValues.cgpa || 0);
      checks.push({ label: 'CGPA requirement', pass: userCgpa >= cgpaThreshold, detail: `Required: ${cgpaThreshold}` });
    }

    const requiredDegreeLevel = degreeLevel(text);
    if (requiredDegreeLevel) {
      const userDegreeLevel = degreeLevel(formValues.degree || '');
      checks.push({ label: 'Degree requirement', pass: userDegreeLevel >= requiredDegreeLevel, detail: 'Degree level check' });
    }

    if (opportunity?.country) {
      const needsMatch = !includesAny(opportunity.country, ['all', 'global', 'worldwide']);
      if (needsMatch) {
        checks.push({
          label: 'Country preference',
          pass: includesAny(opportunity.country, [formValues.country]),
          detail: `Target country: ${opportunity.country}`,
        });
      }
    }

    if (includesAny(text, englishKeywords)) {
      checks.push({
        label: 'English test',
        pass: includesAny(formValues.englishTest, ['ielts', 'toefl', 'duolingo', 'pte', 'advanced', 'intermediate']),
        detail: 'Requires English proficiency evidence',
      });
    }
  }

  if (type === 'job') {
    const requiredDegreeLevel = degreeLevel(text);
    if (requiredDegreeLevel) {
      const userDegreeLevel = degreeLevel(formValues.degree || '');
      checks.push({ label: 'Degree requirement', pass: userDegreeLevel >= requiredDegreeLevel, detail: 'Degree level check' });
    }

    const requiredYears = parseExperienceYears(text);
    if (requiredYears !== null) {
      const userYears = parseFirstNumber(formValues.experience);
      checks.push({ label: 'Experience requirement', pass: userYears >= requiredYears, detail: `Required: ${requiredYears}+ years` });
    }

    if (includesAny(text, ['achievement', 'award', 'certificate', 'portfolio', 'لاسته راوړنې'])) {
      checks.push({
        label: 'Achievements evidence',
        pass: normalize(formValues.achievement).length > 2,
        detail: 'Provide notable achievements or certificates',
      });
    }

    const englishRequired = requiredLanguageLevel(text, 'english');
    if (englishRequired !== null) {
      checks.push({
        label: 'English level',
        pass: levelScore(formValues.englishLevel) >= englishRequired,
        detail: 'Job requires English proficiency',
      });
    }

    const pashtoRequired = requiredLanguageLevel(text, 'pashto') ?? requiredLanguageLevel(text, 'پښتو');
    if (pashtoRequired !== null) {
      checks.push({
        label: 'Pashto level',
        pass: levelScore(formValues.pashtoLevel) >= pashtoRequired,
        detail: 'Job requires Pashto proficiency',
      });
    }

    const dariRequired = requiredLanguageLevel(text, 'dari') ?? requiredLanguageLevel(text, 'دري');
    if (dariRequired !== null) {
      checks.push({
        label: 'Dari level',
        pass: levelScore(formValues.dariLevel) >= dariRequired,
        detail: 'Job requires Dari proficiency',
      });
    }

    if (includesAny(text, ['computer', 'ms office', 'microsoft office', 'excel', 'word', 'powerpoint', 'کمپیوټر'])) {
      checks.push({
        label: 'Computer experience',
        pass: includesAny(formValues.computerExperience, ['ms office', 'microsoft office', 'excel', 'word', 'powerpoint', 'computer']),
        detail: 'Requires practical computer skills',
      });
    }
  }

  const total = checks.length;
  const passed = checks.filter((item) => item.pass).length;

  let status = 'Eligible';
  if (total > 0 && passed === 0) status = 'Not Eligible';
  if (total > 0 && passed > 0 && passed < total) status = 'Partially Eligible';

  return { status, checks, passed, total };
}

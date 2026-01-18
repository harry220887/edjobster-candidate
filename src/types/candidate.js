/**
 * @typedef {'best' | 'good' | 'partial' | 'not'} FitScore
 */

/**
 * @typedef {Object} Education
 * @property {string} degree
 * @property {string} institution
 * @property {string} year
 */

/**
 * @typedef {Object} WorkExperience
 * @property {string} title
 * @property {string} company
 * @property {string} duration
 * @property {string} description
 */

/**
 * @typedef {Object} Candidate
 * @property {string} id
 * @property {string} name
 * @property {string} photo
 * @property {string} title
 * @property {number} experience
 * @property {string} location
 * @property {string} lastActive
 * @property {FitScore} fitScore
 * @property {string} fitReason
 * @property {Education[]} education
 * @property {WorkExperience[]} workHistory
 * @property {string[]} skills
 * @property {string[]} certifications
 * @property {string} lastUpdated
 * @property {string} [email]
 * @property {string} [phone]
 * @property {boolean} contactRevealed
 * @property {string} [professionalNetworkUrl]
 * @property {number} [connectionsCount]
 * @property {string} [companyIndustry]
 * @property {string} [linkedinUrl]
 * @property {string} [resumeUrl]
 * @property {boolean} [isViewed]
 * @property {string} [highestEducation]
 * @property {string} [noticePeriod]
 * @property {string[]} [matchingAttributes]
 */

/**
 * @typedef {Object} ExtractedKeywords
 * @property {string[]} jobTitles
 * @property {string[]} skills
 * @property {string[]} education
 * @property {string} experienceRange
 * @property {string[]} location
 */

/**
 * @typedef {Object} SearchState
 * @property {string} prompt
 * @property {ExtractedKeywords} keywords
 * @property {Candidate[]} candidates
 * @property {Candidate | null} selectedCandidate
 * @property {string[]} shortlisted
 * @property {string[]} rejected
 * @property {number} sentInvites
 * @property {number} repliesReceived
 */

export {};

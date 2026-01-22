#!/usr/bin/env python3
"""
Resume Optimizer Backend
Provides NLP analysis for resume optimization using spaCy
"""

import re
import json
from typing import Dict, List, Set
from collections import Counter

try:
    import spacy
    from spacy.lang.en.stop_words import STOP_WORDS
    nlp = spacy.load("en_core_web_sm")
except ImportError:
    print("Warning: spaCy not installed. Install with: pip install spacy")
    print("Then download model: python -m spacy download en_core_web_sm")
    nlp = None


class ResumeOptimizer:
    """Analyzes resumes for ATS optimization"""
    
    def __init__(self):
        self.common_sections = {
            'summary', 'objective', 'experience', 'work experience',
            'education', 'skills', 'technical skills', 'projects',
            'certifications', 'awards', 'achievements', 'publications'
        }
        
        self.ats_keywords = {
            'leadership', 'management', 'team', 'project', 'developed',
            'implemented', 'designed', 'created', 'improved', 'increased',
            'reduced', 'achieved', 'led', 'managed', 'coordinated',
            'collaborated', 'analyzed', 'optimized', 'delivered'
        }
    
    def analyze_resume(self, resume_text: str, job_description: str = "") -> Dict:
        """
        Analyze resume content for ATS optimization
        
        Args:
            resume_text: The resume content
            job_description: Optional job description for targeted analysis
            
        Returns:
            Dictionary containing analysis results
        """
        resume_lower = resume_text.lower()
        
        # Extract keywords
        resume_keywords = self._extract_keywords(resume_text)
        job_keywords = self._extract_keywords(job_description) if job_description else set()
        
        # Keyword matching
        matched_keywords = resume_keywords.intersection(job_keywords) if job_keywords else set()
        missing_keywords = job_keywords - resume_keywords if job_keywords else set()
        
        # Content analysis
        word_count = len(resume_text.split())
        has_email = bool(re.search(r'\b[\w\.-]+@[\w\.-]+\.\w+\b', resume_text))
        has_phone = bool(re.search(r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b', resume_text))
        has_bullets = bool(re.search(r'[•\-\*]', resume_text))
        
        # Section detection
        sections_found = [s for s in self.common_sections if s in resume_lower]
        
        # Action verbs
        action_verbs = self._count_action_verbs(resume_text)
        
        # Calculate score
        score = self._calculate_score(
            len(resume_keywords),
            len(matched_keywords),
            len(job_keywords),
            word_count,
            has_email,
            has_phone,
            has_bullets,
            len(sections_found)
        )
        
        # Generate recommendations
        recommendations = self._generate_recommendations(
            word_count, has_email, has_phone, has_bullets,
            sections_found, action_verbs, missing_keywords
        )
        
        return {
            'score': score,
            'word_count': word_count,
            'resume_keywords': list(resume_keywords)[:50],
            'matched_keywords': list(matched_keywords)[:30],
            'missing_keywords': list(missing_keywords)[:20],
            'sections_found': sections_found,
            'has_email': has_email,
            'has_phone': has_phone,
            'has_bullets': has_bullets,
            'action_verbs_count': action_verbs,
            'recommendations': recommendations
        }
    
    def _extract_keywords(self, text: str) -> Set[str]:
        """Extract relevant keywords from text"""
        if not text:
            return set()
        
        # Simple keyword extraction without NLP
        words = re.findall(r'\b[a-z]{3,}\b', text.lower())
        
        # Remove common stop words
        stop_words = {'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 
                     'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him',
                     'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way',
                     'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use'}
        
        keywords = [w for w in words if w not in stop_words and len(w) > 3]
        
        # Count frequency and return top keywords
        counter = Counter(keywords)
        return set([word for word, count in counter.most_common(100)])
    
    def _count_action_verbs(self, text: str) -> int:
        """Count action verbs in resume"""
        action_verbs = {
            'achieved', 'improved', 'trained', 'managed', 'created',
            'designed', 'developed', 'implemented', 'increased', 'reduced',
            'led', 'coordinated', 'delivered', 'executed', 'launched',
            'optimized', 'analyzed', 'built', 'collaborated', 'directed'
        }
        
        text_lower = text.lower()
        return sum(1 for verb in action_verbs if verb in text_lower)
    
    def _calculate_score(self, resume_kw_count: int, matched_kw_count: int,
                        job_kw_count: int, word_count: int, has_email: bool,
                        has_phone: bool, has_bullets: bool, sections_count: int) -> int:
        """Calculate ATS score (0-100)"""
        score = 0
        
        # Keyword relevance (40 points)
        score += min(resume_kw_count * 0.5, 20)
        if job_kw_count > 0:
            match_rate = matched_kw_count / job_kw_count
            score += match_rate * 20
        else:
            score += 10
        
        # Contact information (15 points)
        score += 10 if has_email else 0
        score += 5 if has_phone else 0
        
        # Formatting (20 points)
        score += 10 if has_bullets else 0
        score += min(sections_count * 2, 10)
        
        # Content length (15 points)
        if 300 <= word_count <= 800:
            score += 15
        elif 200 <= word_count < 300 or 800 < word_count <= 1000:
            score += 10
        else:
            score += 5
        
        # Resume completeness (10 points)
        score += min(sections_count, 5) * 2
        
        return min(int(score), 100)
    
    def _generate_recommendations(self, word_count: int, has_email: bool,
                                 has_phone: bool, has_bullets: bool,
                                 sections: List[str], action_verbs: int,
                                 missing_keywords: Set[str]) -> List[str]:
        """Generate recommendations for improvement"""
        recommendations = []
        
        if not has_email:
            recommendations.append("Add a professional email address")
        
        if not has_phone:
            recommendations.append("Include a contact phone number")
        
        if word_count < 300:
            recommendations.append("Expand your resume - aim for 400-600 words")
        elif word_count > 800:
            recommendations.append("Consider condensing to 1-2 pages (400-700 words)")
        
        if not has_bullets:
            recommendations.append("Use bullet points to improve readability")
        
        if action_verbs < 5:
            recommendations.append("Use more action verbs (achieved, implemented, led, etc.)")
        
        if 'experience' not in sections and 'work experience' not in sections:
            recommendations.append("Add a clear 'Experience' or 'Work Experience' section")
        
        if 'education' not in sections:
            recommendations.append("Include an 'Education' section")
        
        if 'skills' not in sections and 'technical skills' not in sections:
            recommendations.append("Add a 'Skills' section with relevant keywords")
        
        if len(missing_keywords) > 10:
            recommendations.append(f"Include more keywords from job description: {', '.join(list(missing_keywords)[:5])}")
        
        if not recommendations:
            recommendations.append("Your resume looks well-optimized!")
        
        return recommendations


def main():
    """Example usage"""
    optimizer = ResumeOptimizer()
    
    sample_resume = """
    John Doe
    john.doe@email.com | (555) 123-4567
    
    PROFESSIONAL SUMMARY
    Experienced software engineer with 5+ years in full-stack development.
    
    EXPERIENCE
    Senior Software Engineer - Tech Company (2020-Present)
    • Developed and maintained web applications using React and Node.js
    • Implemented CI/CD pipelines using Docker and Jenkins
    • Led a team of 5 developers on critical projects
    • Improved application performance by 40%
    
    EDUCATION
    Bachelor of Science in Computer Science
    University of Technology (2018)
    
    SKILLS
    JavaScript, Python, React, Node.js, SQL, MongoDB, AWS, Docker, Git
    """
    
    sample_job_desc = """
    Looking for a Senior Software Engineer with experience in React, Node.js,
    and cloud technologies. Must have strong leadership skills and experience
    with agile development. Python and Docker experience preferred.
    """
    
    results = optimizer.analyze_resume(sample_resume, sample_job_desc)
    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()

#!/bin/bash

echo "==================================="
echo "Career Optimization Suite Verification"
echo "==================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

total_checks=0
passed_checks=0

check_file() {
    total_checks=$((total_checks + 1))
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        passed_checks=$((passed_checks + 1))
        return 0
    else
        echo -e "${RED}✗${NC} $1 (missing)"
        return 1
    fi
}

check_dir() {
    total_checks=$((total_checks + 1))
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        passed_checks=$((passed_checks + 1))
        return 0
    else
        echo -e "${RED}✗${NC} $1/ (missing)"
        return 1
    fi
}

echo "1. ResumeOptimizer"
echo "==================="
check_file "ResumeOptimizer/index.html"
check_file "ResumeOptimizer/style.css"
check_file "ResumeOptimizer/script.js"
check_file "ResumeOptimizer/optimizer.py"
check_file "ResumeOptimizer/README.md"
echo ""

echo "2. CoverLetterGenerator"
echo "======================="
check_file "CoverLetterGenerator/index.html"
check_file "CoverLetterGenerator/style.css"
check_file "CoverLetterGenerator/script.js"
check_dir "CoverLetterGenerator/templates"
check_file "CoverLetterGenerator/README.md"
echo ""

echo "3. InterviewPrep"
echo "================"
check_file "InterviewPrep/index.html"
check_file "InterviewPrep/style.css"
check_file "InterviewPrep/script.js"
check_file "InterviewPrep/data/technical_questions.json"
check_file "InterviewPrep/data/behavioral_questions.json"
check_file "InterviewPrep/data/industry_questions.json"
check_file "InterviewPrep/README.md"
echo ""

echo "4. CareerPathPlanner"
echo "===================="
check_file "CareerPathPlanner/index.html"
check_file "CareerPathPlanner/style.css"
check_file "CareerPathPlanner/script.js"
check_file "CareerPathPlanner/data/career_paths.json"
check_file "CareerPathPlanner/README.md"
echo ""

echo "5. SkillMatcher"
echo "==============="
check_file "SkillMatcher/index.html"
check_file "SkillMatcher/style.css"
check_file "SkillMatcher/script.js"
check_file "SkillMatcher/skills_database.json"
check_file "SkillMatcher/README.md"
echo ""

echo "6. SalaryNegotiator"
echo "==================="
check_file "SalaryNegotiator/index.html"
check_file "SalaryNegotiator/style.css"
check_file "SalaryNegotiator/script.js"
check_file "SalaryNegotiator/README.md"
echo ""

echo "7. JobSearchTracker"
echo "==================="
check_file "JobSearchTracker/tracker.html"
check_file "JobSearchTracker/style.css"
check_file "JobSearchTracker/script.js"
check_file "JobSearchTracker/README.md"
echo ""

echo "==================================="
echo "Summary"
echo "==================================="
echo "Total Checks: $total_checks"
echo "Passed: $passed_checks"
echo "Failed: $((total_checks - passed_checks))"
echo ""

if [ $passed_checks -eq $total_checks ]; then
    echo -e "${GREEN}✓ All tools successfully implemented!${NC}"
    exit 0
else
    echo -e "${RED}✗ Some files are missing${NC}"
    exit 1
fi

# Career Path Planner

An interactive tool to visualize your career progression, explore different career tracks, and plan your professional development journey with salary insights and skill requirements.

## Features

- **Multiple Career Tracks**: Explore paths in Technology, Data Science, Design, Business, Marketing, and Finance
- **Visual Roadmap**: Interactive salary progression chart using Chart.js
- **Career Milestones**: Detailed view of each career level with requirements
- **Skills Development**: Organized view of technical, soft, and leadership skills needed
- **Timeline Estimation**: Realistic timeline projections for career progression
- **Resource Recommendations**: Curated learning resources for each stage
- **Export Functionality**: Download your personalized career plan
- **Persistent Storage**: Save your career path to your browser

## How to Use

### Planning Your Path

1. Open `index.html` in your web browser
2. Select your industry (Technology, Data Science, Design, etc.)
3. Choose a specific career track within that industry
4. Set your current career level
5. Set your target career level
6. Click "Generate Career Path"

### Understanding the Roadmap

The tool provides several views:

#### Salary Progression Chart
- Visual representation of salary growth
- Shows average salaries at each level
- Interactive hover tooltips with exact figures

#### Career Milestones
- Detailed breakdown of each level
- Key responsibilities and requirements
- Skills needed for transition

#### Skills Development Path
- Technical skills required
- Soft skills to develop
- Leadership competencies (for senior roles)

#### Timeline
- Estimated years at each level
- Current position marker
- Projected timeline to reach goals

#### Resources
- Recommended courses and certifications
- Books and learning materials
- Communities and networks
- Practice opportunities

## Career Tracks Available

### Technology
- **Software Engineer**: Full-stack development path from Junior to Engineering Director
- **Frontend Engineer**: Specialized UI/UX development track

### Data Science
- **Data Scientist**: Analytics and machine learning career path

### Design
- **UX/UI Designer**: User experience and interface design progression

### Business
- **Product Manager**: Product strategy and management track

### Marketing
- **Digital Marketing Manager**: Digital marketing and growth path

### Finance
- **Financial Analyst**: Financial analysis and planning career

## Understanding Career Levels

Most tracks follow this general progression:

1. **Junior/Entry Level** (0-2 years)
   - Learning fundamentals
   - Working under supervision
   - Building core skills

2. **Mid-Level** (2-5 years)
   - Independent contributor
   - Owning projects
   - Developing expertise

3. **Senior** (5-8 years)
   - Technical leadership
   - Mentoring others
   - Architectural decisions

4. **Staff/Principal/Lead** (8+ years)
   - Strategic influence
   - Cross-team impact
   - Technical vision

5. **Director/VP** (10+ years)
   - People management
   - Department strategy
   - Business alignment

6. **Executive/C-Level** (15+ years)
   - Company-wide strategy
   - Business leadership
   - Industry influence

## Salary Information

Salary ranges are based on:
- Industry averages for major tech hubs
- Data from multiple salary surveys
- Market trends (as of 2024)

**Note**: Actual salaries vary significantly based on:
- Geographic location
- Company size and stage
- Industry sector
- Individual negotiation
- Stock/equity compensation

Use these as general guidelines, not exact predictions.

## Customization

### Adding Your Own Career Path

Edit `data/career_paths.json`:

```json
{
  "industry_name": [
    {
      "id": "career-track-id",
      "name": "Career Track Name",
      "levels": [
        {
          "title": "Level Title",
          "description": "What you do at this level",
          "salary": { "min": 60000, "max": 85000, "avg": 72500 },
          "duration": 2,
          "requirements": [
            "Requirement 1",
            "Requirement 2"
          ],
          "skills": {
            "technical": ["Skill 1", "Skill 2"],
            "soft": ["Skill 1", "Skill 2"],
            "leadership": ["Skill 1", "Skill 2"]
          }
        }
      ]
    }
  ]
}
```

## File Structure

```
CareerPathPlanner/
├── index.html              # Main interface
├── style.css               # Responsive styling
├── script.js               # Career path logic and visualization
├── data/
│   └── career_paths.json  # Career progression data
└── README.md              # Documentation
```

## Technical Details

### Frontend
- **HTML5**: Semantic structure
- **CSS3**: Modern, responsive design with animations
- **JavaScript ES6+**: Async data loading, Chart.js integration
- **Chart.js 4.4.0**: Salary progression visualization

### Data Structure
Career paths are defined hierarchically:
- Industry → Career Tracks → Levels → Details

### Visualization
- Line chart showing salary progression
- Color-coded milestone cards
- Interactive timeline with current position marker
- Skill tags categorized by type

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Tips for Career Planning

### Realistic Timelines
- Don't rush - mastery takes time
- Years at each level are averages
- Quality of experience matters more than quantity
- Some people progress faster or slower

### Skill Development
- Focus on both technical and soft skills
- Leadership skills become more important at senior levels
- Continuous learning is essential
- Build a T-shaped skill profile (deep + broad)

### Career Moves
- Not all progression is vertical (up)
- Lateral moves can broaden experience
- Company changes can accelerate growth
- Negotiate based on value, not just time

### Using This Tool
- Revisit and update quarterly
- Adjust based on market changes
- Use as a guide, not a rigid plan
- Share with mentors for feedback

## Common Career Questions

**Q: How long does it typically take to reach senior level?**
A: Usually 5-8 years, but varies widely based on individual growth, opportunities, and company.

**Q: Should I specialize or generalize?**
A: Early career: generalize. Mid-career: specialize. Senior: balance both.

**Q: Is an MBA necessary?**
A: For some tracks (Product, Business) it helps. For technical tracks, often optional.

**Q: How important are certifications?**
A: Varies by field. Very important in some (AWS, PMP), less so in others (Software Engineering).

**Q: Can I switch careers later?**
A: Yes! Many successful people change careers. Transferable skills are valuable.

## Privacy

- All data stored locally in browser
- No external tracking or analytics
- Career plans saved in localStorage only

## Export Formats

- **Text File**: Plain text format with all milestones and requirements
- Includes salary ranges, skills, and timeline
- Easy to share with mentors or career counselors

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## License

See [LICENSE](../LICENSE) file.

## Support

For issues or questions, check the main project documentation or create an issue in the repository.

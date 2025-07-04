import React, { useState } from 'react';
import { Play, Download, Users, BarChart3, AlertCircle } from 'lucide-react';

const PolicyTestingTool = () => {
  const [policyText, setPolicyText] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState([]);
  const [progress, setProgress] = useState(0);
  const [selectedPersonas, setSelectedPersonas] = useState('sample');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Complete persona definitions
  const allPersonas = [
    { name: "Margaret - Traditional Conservative", shortName: "Margaret", category: "Conservative" },
    { name: "Dave - Red Wall Switcher", shortName: "Dave", category: "Conservative" },
    { name: "Zara - Urban Progressive", shortName: "Zara", category: "Labour" },
    { name: "James - Suburban Swing Voter", shortName: "James", category: "Swing" },
    { name: "Connor - Young Liberal", shortName: "Connor", category: "Liberal" },
    { name: "Priya - Aspiring Homeowner", shortName: "Priya", category: "Labour" },
    { name: "William - Rural Conservative", shortName: "William", category: "Conservative" },
    { name: "Lisa - Working Mum", shortName: "Lisa", category: "Non-voter" },
    { name: "Raj - Cosmopolitan Professional", shortName: "Raj", category: "Liberal" },
    { name: "Betty - Pensioner Pragmatist", shortName: "Betty", category: "Conservative" },
    { name: "Michael - Caribbean Heritage Labour", shortName: "Michael", category: "Labour" },
    { name: "Kemi - Young British Nigerian", shortName: "Kemi", category: "Labour" },
    { name: "Tariq - Pakistani Community Leader", shortName: "Tariq", category: "Labour" },
    { name: "Fahima - Bangladeshi Student", shortName: "Fahima", category: "Labour" },
    { name: "Gary - Reform Supporter", shortName: "Gary", category: "Reform" },
    { name: "Jordan - Disillusioned Non-Voter", shortName: "Jordan", category: "Non-voter" },
    { name: "Sarah - Apathetic Non-Voter", shortName: "Sarah", category: "Non-voter" },
    { name: "Pradeep - Tamil Professional", shortName: "Pradeep", category: "Liberal" },
    { name: "Jasbir - Sikh Business Owner", shortName: "Jasbir", category: "Swing" },
    { name: "Hyacinth - Elderly Caribbean Non-Voter", shortName: "Hyacinth", category: "Non-voter" },
    { name: "Moira - SNP Independence Supporter", shortName: "Moira", category: "SNP" },
    { name: "Hamish - Scottish Conservative", shortName: "Hamish", category: "Conservative" },
    { name: "Eileen - Scottish Labour", shortName: "Eileen", category: "Labour" },
    { name: "Rhian - Plaid Cymru Supporter", shortName: "Rhian", category: "Plaid" },
    { name: "Gareth - Welsh Valleys Labour", shortName: "Gareth", category: "Labour" },
    { name: "Robert - DUP Unionist", shortName: "Robert", category: "DUP" },
    { name: "Máire - Sinn Féin Supporter", shortName: "Máire", category: "Sinn Féin" },
    { name: "David - Alliance Moderate", shortName: "David", category: "Alliance" },
    { name: "Zoe - Gen Z Climate Activist", shortName: "Zoe", category: "Green" },
    { name: "Alex - Housing Crisis Millennial", shortName: "Alex", category: "Labour" },
    { name: "Helen - Generation X Sandwich", shortName: "Helen", category: "Liberal" },
    { name: "Sam - LGBTQ+ Rights Advocate", shortName: "Sam", category: "Labour" },
    { name: "Emma - Disabled Rights Voter", shortName: "Emma", category: "Labour" },
    { name: "Tony - Military Veteran", shortName: "Tony", category: "Conservative" },
    { name: "Sharon - Seaside Town Decline", shortName: "Sharon", category: "Conservative" },
    { name: "Rachel - University Town Professional", shortName: "Rachel", category: "Liberal" },
    { name: "Michelle - Single Parent", shortName: "Michelle", category: "Labour" },
    { name: "Patricia - Family Carer", shortName: "Patricia", category: "Labour" },
    { name: "Jack - Recent Graduate", shortName: "Jack", category: "Labour" },
    { name: "Andrew - Empty Nester Professional", shortName: "Andrew", category: "Conservative" }
  ];

  const personaPrompts = {
    "Margaret - Traditional Conservative": "You are Margaret, a 67-year-old retired teacher living in a Cotswolds market town. You've voted Conservative your entire adult life and believe in traditional British values, controlled immigration, and fiscal responsibility. When presented with a policy proposal, respond as Margaret would - considering how it affects community cohesion, public spending, and traditional institutions.",
    "Dave - Red Wall Switcher": "You are Dave, a 45-year-old electrician from a former mining town in County Durham. Your family voted Labour for generations, but you switched to Conservative in 2019 because you felt Labour didn't represent working people anymore. When evaluating policies, consider their impact on jobs, wages, and whether they help hardworking families who play by the rules.",
    "Zara - Urban Progressive": "You are Zara, a 28-year-old marketing professional living in shared accommodation in South London. You're a university graduate from a British Pakistani family who votes Labour and is passionate about climate action, equality, and social justice. When assessing policies, prioritize environmental impact, effects on young people and minorities, and whether they address inequality.",
    "James - Suburban Swing Voter": "You are James, a 52-year-old operations manager living in suburban Reading. You care most about practical governance rather than ideology and have voted Conservative and Liberal Democrat depending on competence. When evaluating policies, focus on whether they're well-designed, affordable, and likely to work in practice.",
    "Connor - Young Liberal": "You are Connor, a 22-year-old politics student at Manchester University who is passionate about civil liberties, environmental protection, and European integration. You vote Lib Dem or Green depending on tactical considerations. When assessing policies, prioritize their environmental impact, effects on young people, and whether they enhance personal freedoms."
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Conservative': 'bg-blue-100 text-blue-800',
      'Labour': 'bg-red-100 text-red-800',
      'Liberal': 'bg-orange-100 text-orange-800',
      'Green': 'bg-green-100 text-green-800',
      'Reform': 'bg-purple-100 text-purple-800',
      'SNP': 'bg-yellow-100 text-yellow-800',
      'Plaid': 'bg-red-100 text-red-800',
      'DUP': 'bg-blue-100 text-blue-800',
      'Sinn Féin': 'bg-green-100 text-green-800',
      'Alliance': 'bg-gray-100 text-gray-800',
      'Swing': 'bg-indigo-100 text-indigo-800',
      'Non-voter': 'bg-gray-100 text-gray-600'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const extractTopConcerns = (resultsData) => {
    const allConcerns = [];
    resultsData.forEach(result => {
      if (result.data && result.data.main_concerns && Array.isArray(result.data.main_concerns)) {
        allConcerns.push(...result.data.main_concerns);
      }
    });
    
    const concernCounts = {};
    allConcerns.forEach(concern => {
      const key = concern.toLowerCase();
      concernCounts[key] = (concernCounts[key] || 0) + 1;
    });
    
    return Object.entries(concernCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([concern, count]) => ({ concern, count }));
  };

  const extractTopBenefits = (resultsData) => {
    const allBenefits = [];
    resultsData.forEach(result => {
      if (result.data && result.data.potential_benefits && Array.isArray(result.data.potential_benefits)) {
        allBenefits.push(...result.data.potential_benefits);
      }
    });
    
    const benefitCounts = {};
    allBenefits.forEach(benefit => {
      const key = benefit.toLowerCase();
      benefitCounts[key] = (benefitCounts[key] || 0) + 1;
    });
    
    return Object.entries(benefitCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([benefit, count]) => ({ benefit, count }));
  };

  const generateAnalysis = () => {
    const successfulResults = results.filter(r => r.success);
    if (successfulResults.length === 0) return null;

    const categoryBreakdown = {};
    const supportOpposition = { positive: 0, negative: 0, neutral: 0 };
    
    successfulResults.forEach(result => {
      if (!categoryBreakdown[result.category]) {
        categoryBreakdown[result.category] = 0;
      }
      categoryBreakdown[result.category]++;
      
      if (result.data && result.data.immediate_reaction && result.data.voting_impact) {
        const reaction = result.data.immediate_reaction.toLowerCase();
        const votingImpact = result.data.voting_impact.toLowerCase();
        
        if (reaction.includes('support') || reaction.includes('good') || reaction.includes('positive') || 
            votingImpact.includes('strengthen') || votingImpact.includes('more likely')) {
          supportOpposition.positive++;
        } else if (reaction.includes('oppose') || reaction.includes('concern') || reaction.includes('negative') ||
                   votingImpact.includes('weaken') || votingImpact.includes('less likely')) {
          supportOpposition.negative++;
        } else {
          supportOpposition.neutral++;
        }
      }
    });

    return {
      totalResponses: successfulResults.length,
      categoryBreakdown,
      supportOpposition,
      topConcerns: extractTopConcerns(successfulResults),
      topBenefits: extractTopBenefits(successfulResults)
    };
  };

  const exportResults = () => {
    if (results.length === 0) return;
    
    const csvContent = [
      ['Persona', 'Category', 'Immediate Reaction', 'Main Concerns', 'Potential Benefits', 'Voting Impact', 'Key Quote'],
      ...results.filter(r => r.success).map(r => [
        r.name,
        r.category,
        r.data?.immediate_reaction || '',
        r.data?.main_concerns ? r.data.main_concerns.join('; ') : '',
        r.data?.potential_benefits ? r.data.potential_benefits.join('; ') : '',
        r.data?.voting_impact || '',
        r.data?.key_quote || ''
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'policy-testing-results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const testPolicy = async () => {
    if (!policyText.trim()) {
      alert('Please enter a policy to test');
      return;
    }

    setIsRunning(true);
    setProgress(0);
    setResults([]);

    let personasToTest;
    if (selectedPersonas === 'sample') {
      personasToTest = allPersonas.slice(0, 5);
    } else if (selectedPersonas === 'extended') {
      personasToTest = allPersonas.slice(0, 10);
    } else {
      personasToTest = allPersonas;
    }

    const testResults = [];

    for (let i = 0; i < personasToTest.length; i++) {
      const persona = personasToTest[i];
      setProgress(((i + 1) / personasToTest.length) * 100);

      try {
        const basePrompt = personaPrompts[persona.name] || `You are ${persona.name}, a UK voter. Consider this policy from your perspective.`;

        const fullPrompt = `${basePrompt}

Policy proposal: ${policyText}

Respond with a JSON object in this exact format:
{
  "immediate_reaction": "Your gut reaction to this policy",
  "main_concerns": ["list", "of", "main", "concerns"],
  "potential_benefits": ["any", "benefits", "you", "see"],
  "voting_impact": "How this might affect your voting intention",
  "key_quote": "A single sentence that captures your view"
}

Your entire response MUST be a single, valid JSON object. DO NOT include any text outside the JSON structure, including backticks.`;

        const response = await window.claude.complete(fullPrompt);
        const parsedResponse = JSON.parse(response);

        testResults.push({
          name: persona.name,
          category: persona.category,
          success: true,
          data: parsedResponse
        });

      } catch (error) {
        console.error(`Error with ${persona.name}:`, error);
        testResults.push({
          name: persona.name,
          category: persona.category,
          success: false,
          error: error.message
        });
      }
    }

    setResults(testResults);
    setIsRunning(false);
    setProgress(100);
  };

  const analysis = generateAnalysis();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">UK Voter Persona Policy Testing Tool</h1>
        <p className="text-gray-600">Test how different policy proposals might be received across 40 representative UK voter personas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Policy Proposal</h2>
            <textarea
              value={policyText}
              onChange={(e) => setPolicyText(e.target.value)}
              placeholder="Enter your policy proposal here. Be as detailed as you like - the personas will respond based on their backgrounds, values, and concerns.

Example: 'The government proposes to introduce a universal basic income of £800 per month for all UK residents, funded by a combination of carbon taxes and wealth taxes on assets over £1 million.'"
              className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select 
                  value={selectedPersonas}
                  onChange={(e) => setSelectedPersonas(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="sample">Sample (5 personas)</option>
                  <option value="extended">Extended (10 personas)</option>
                  <option value="all">All personas (40)</option>
                </select>
                
                <button
                  onClick={testPolicy}
                  disabled={isRunning || !policyText.trim()}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-md transition-colors"
                >
                  <Play size={16} />
                  <span>{isRunning ? 'Testing...' : 'Test Policy'}</span>
                </button>

                <button
                  onClick={() => setPolicyText("The government proposes to introduce a universal basic income of £800 per month for all UK residents over 18, funded by a combination of carbon taxes, wealth taxes on assets over £1 million, and consolidation of existing welfare benefits.")}
                  className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm border border-blue-300 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Load Sample Policy
                </button>
              </div>
              
              {results.length > 0 && (
                <button
                  onClick={exportResults}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <Download size={16} />
                  <span>Export CSV</span>
                </button>
              )}
            </div>
            
            {isRunning && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Testing personas...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users size={20} className="mr-2" />
              Persona Coverage
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Personas:</span>
                <span className="font-medium">40</span>
              </div>
              <div className="flex justify-between">
                <span>Geographic Coverage:</span>
                <span className="font-medium">All UK nations</span>
              </div>
              <div className="flex justify-between">
                <span>Age Range:</span>
                <span className="font-medium">19-78 years</span>
              </div>
              <div className="flex justify-between">
                <span>Political Parties:</span>
                <span className="font-medium">All major parties</span>
              </div>
            </div>
          </div>

          {results.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BarChart3 size={20} className="mr-2" />
                Quick Results
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Responses:</span>
                  <span className="font-medium">{results.filter(r => r.success).length}/{results.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="font-medium">{Math.round((results.filter(r => r.success).length / results.length) * 100)}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {results.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Policy Testing Results</h2>
            <div className="flex items-center space-x-4">
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="all">All Categories</option>
                <option value="Conservative">Conservative</option>
                <option value="Labour">Labour</option>
                <option value="Liberal">Liberal Democrat</option>
                <option value="Green">Green</option>
                <option value="Reform">Reform UK</option>
                <option value="SNP">SNP</option>
                <option value="Plaid">Plaid Cymru</option>
                <option value="Swing">Swing Voters</option>
                <option value="Non-voter">Non-voters</option>
              </select>
              <button
                onClick={() => setShowAnalysis(!showAnalysis)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                {showAnalysis ? 'Hide Analysis' : 'Show Analysis'}
              </button>
            </div>
          </div>

          {showAnalysis && analysis && (
            <div className="mb-8 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Policy Analysis Summary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Overall Sentiment</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-green-600">Positive:</span>
                      <span className="font-medium">{analysis.supportOpposition.positive}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Negative:</span>
                      <span className="font-medium">{analysis.supportOpposition.negative}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Neutral:</span>
                      <span className="font-medium">{analysis.supportOpposition.neutral}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Top Concerns</h4>
                  <div className="space-y-1 text-sm">
                    {analysis.topConcerns.map((concern, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="truncate">{concern.concern}</span>
                        <span className="font-medium ml-2">{concern.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Top Benefits</h4>
                  <div className="space-y-1 text-sm">
                    {analysis.topBenefits.map((benefit, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="truncate">{benefit.benefit}</span>
                        <span className="font-medium ml-2">{benefit.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.filter(result => 
              filterCategory === 'all' || result.category === filterCategory
            ).map((result, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{result.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(result.category)}`}>
                    {result.category}
                  </span>
                </div>
                
                {result.success ? (
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Immediate Reaction:</p>
                      <p className="text-sm text-gray-900">{result.data?.immediate_reaction || 'No reaction provided'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Voting Impact:</p>
                      <p className="text-sm text-gray-900">{result.data?.voting_impact || 'No impact provided'}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-sm font-medium text-gray-700 italic">"{result.data?.key_quote || 'No quote provided'}"</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <AlertCircle size={16} className="mr-2" />
                    <span className="text-sm">Error: {result.error}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyTestingTool;

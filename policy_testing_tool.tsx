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
    "Margaret - Traditional Conservative": "You are Margaret, a 67-year-old retired teacher living in a Cotswolds market town. You've voted Conservative your entire adult life and believe in traditional British values, controlled immigration, and fiscal responsibility. You're comfortable financially but worry about the direction of modern Britain. When presented with a policy proposal, respond as Margaret would - considering how it affects community cohesion, public spending, and traditional institutions. Express any concerns about radical changes and favor gradual, tested approaches.",
    
    "Dave - Red Wall Switcher": "You are Dave, a 45-year-old electrician from a former mining town in County Durham. Your family voted Labour for generations, but you switched to Conservative in 2019 because you felt Labour didn't represent working people anymore. You voted Leave because you want controlled immigration and better opportunities for British workers. You're proud of your community but frustrated by decades of decline. When evaluating policies, consider their impact on jobs, wages, and whether they help 'people like you' - hardworking families who play by the rules.",
    
    "Zara - Urban Progressive": "You are Zara, a 28-year-old marketing professional living in shared accommodation in South London. You're a university graduate from a British Pakistani family, earning decent money but struggling with high rent and student loans. You vote Labour and are passionate about climate action, equality, and social justice. You supported Remain and see yourself as globally minded. When assessing policies, prioritize environmental impact, effects on young people and minorities, and whether they address inequality.",
    
    "James - Suburban Swing Voter": "You are James, a 52-year-old operations manager living in suburban Reading. You have a mortgage, two teenage children, and care most about practical governance rather than ideology. You've voted Conservative and Liberal Democrat depending on who seems most competent. You voted Remain but accept Brexit happened. Your priorities are good schools, efficient public services, and economic stability. When evaluating policies, focus on whether they're well-designed, affordable, and likely to work in practice.",
    
    "Connor - Young Liberal": "You are Connor, a 22-year-old politics student at Manchester University. You're passionate about civil liberties, environmental protection, and European integration. You feel Brexit was a mistake and want policies that are evidence-based and internationally cooperative. You vote Lib Dem or Green depending on tactical considerations. Your concerns include student debt, climate action, and protecting democratic institutions. When assessing policies, prioritize their environmental impact, effects on young people, and whether they enhance personal freedoms.",
    
    "Priya - Aspiring Homeowner": "You are Priya, a 35-year-old NHS nurse living in outer London. You're trying to save for a house deposit while renting and supporting your elderly parents. You believe in public service and vote Labour, but you're frustrated by high housing costs and want practical solutions. You voted Remain and value multiculturalism. When evaluating policies, consider their impact on public sector workers, housing affordability, and support for working families.",
    
    "William - Rural Conservative": "You are William, a 58-year-old farmer in rural Lincolnshire running a family farm passed down through generations. You voted Leave because you wanted freedom from EU agricultural regulations and believe in British self-sufficiency. You're Conservative through and through but frustrated when the party seems to focus only on urban issues. When assessing policies, consider their impact on rural communities, farming, and traditional ways of life.",
    
    "Lisa - Working Mum": "You are Lisa, a 33-year-old single mother working part-time in retail in a West Midlands town. You struggle to make ends meet despite working and claim tax credits. You voted Leave hoping for change but feel politicians don't understand your life. You sometimes vote Labour but often don't vote because you feel it won't make a difference. When evaluating policies, focus on their immediate practical impact on your daily life - childcare, benefits, local services, and job opportunities.",
    
    "Raj - Cosmopolitan Professional": "You are Raj, a 40-year-old financial analyst living in Central London. You're a high earner who switched from Conservative to Liberal Democrat over Brexit and social issues. You believe in market economics but also social liberalism and want competent, evidence-based governance. You support controlled immigration because you see the economic benefits. When assessing policies, consider their economic efficiency, impact on London's competitiveness, and whether they maintain Britain's international standing.",
    
    "Betty - Pensioner Pragmatist": "You are Betty, a 74-year-old retired secretary living in a South Coast seaside town. You've seen a lot of change in your lifetime and worry about the pace of social change. You switched from Labour to Conservative because you felt Labour became too radical. You voted Leave because you want controlled immigration and feel the EU imposed too many rules. When evaluating policies, prioritize their impact on pensioners, the NHS, and community safety.",
    
    "Michael - Caribbean Heritage Labour": "You are Michael, a 56-year-old bus driver of Jamaican heritage living in Birmingham. Your parents came to Britain in the 1960s and you've experienced both progress and setbacks in racial equality. You're a proud trade unionist and loyal Labour voter who believes in workers' rights and public services. You voted Remain and see immigration as positive for Britain's diversity. When evaluating policies, consider their impact on working-class communities, racial equality, and whether they strengthen collective bargaining and public services.",
    
    "Kemi - Young British Nigerian": "You are Kemi, a 29-year-old British Nigerian woman running a small digital marketing business in South London. You're ambitious and believe in hard work paying off, but you've faced barriers due to both your race and being a young entrepreneur. You vote Labour because you support equality and public investment, but you also want policies that help small businesses succeed. When assessing policies, consider their impact on young entrepreneurs, minority-owned businesses, and whether they address both economic opportunity and social justice.",
    
    "Tariq - Pakistani Community Leader": "You are Tariq, a 48-year-old shop owner in Bradford who serves as an informal community leader. You're British Pakistani, religiously observant, and have strong family values. You usually vote Labour because of their stance on equality and public services, but you're frustrated when they take positions that conflict with your religious beliefs. You voted Leave partly due to concerns about EU interference with religious practices. When evaluating policies, consider their impact on religious communities, small businesses, and whether they respect traditional family structures while promoting equality.",
    
    "Fahima - Bangladeshi Student": "You are Fahima, a 20-year-old British Bangladeshi student studying sociology at university while living with your family in Tower Hamlets. You're the first in your family to go to university and are passionate about social justice and environmental issues. You vote Labour but are attracted to Green Party policies. You're concerned about rising Islamophobia and want policies that protect minority rights. When assessing policies, prioritize their impact on young people, Muslim communities, educational opportunity, and environmental protection.",
    
    "Gary - Reform Supporter": "You are Gary, a 62-year-old retired factory worker living in Clacton-on-Sea. You feel that mainstream politicians have ignored working-class concerns for decades and that immigration has changed your community beyond recognition. You vote Reform UK because they're the only party willing to speak honestly about immigration and cultural issues. You're frustrated by political correctness and want politicians who say what they mean. When evaluating policies, focus on their impact on British identity, immigration control, and whether they address the concerns of 'ordinary people' rather than metropolitan elites.",
    
    "Jordan - Disillusioned Non-Voter": "You are Jordan, a 26-year-old delivery driver and part-time warehouse worker living in Manchester suburbs. You work multiple zero-hour contracts and struggle to pay rent. You don't vote because you feel all politicians are the same - they make promises they don't keep and don't understand your life. You didn't vote in Brexit because you felt both campaigns were lying. When evaluating policies, consider whether they would actually make a difference to your daily life and whether you'd trust the politicians proposing them to follow through.",
    
    "Sarah - Apathetic Non-Voter": "You are Sarah, a 35-year-old marketing manager in Bristol with two young children. You're too busy with work and family to follow politics closely and find political news depressing and divisive. You voted Remain but now try to avoid political discussions. You rarely vote because you feel politics doesn't directly affect your comfortable middle-class life. When evaluating policies, consider whether they would be significant enough to make you pay attention and whether they'd impact your family's well-being enough to motivate you to vote.",
    
    "Pradeep - Tamil Professional": "You are Pradeep, a 43-year-old software engineer of Tamil heritage living in Harrow. You came to Britain as a child refugee and have built a successful career in tech. You vote Liberal Democrat because you support controlled immigration based on skills, investment in education, and international cooperation. You're concerned about both anti-immigrant sentiment and poorly designed immigration policies. When evaluating policies, consider their impact on skilled professionals, the tech sector, and whether they maintain Britain's openness to talent while managing legitimate concerns about immigration.",
    
    "Jasbir - Sikh Business Owner": "You are Jasbir, a 51-year-old restaurant owner in Southall who emigrated from Punjab in the 1990s. You've built a successful business through hard work and employ several people from your community. You usually vote Labour because they support working people, but you voted Leave because you felt EU regulations hurt small businesses. You're religiously observant and want policies that respect Sikh traditions. When evaluating policies, consider their impact on small businesses, religious communities, and whether they help hardworking immigrants like yourself succeed.",
    
    "Hyacinth - Elderly Caribbean Non-Voter": "You are Hyacinth, a 78-year-old retired cleaner of Barbadian heritage living in Brixton. You came to Britain in the 1960s and faced significant discrimination but focused on survival and raising your family. You rarely vote because you feel politicians don't understand your experiences and have seen too many broken promises. You're more focused on your church community and family than politics. When evaluating policies, consider whether they would directly affect your daily life - healthcare, housing, local services - and whether you'd trust the people proposing them based on your lifetime of experience.",
    
    "Moira - SNP Independence Supporter": "You are Moira, a 44-year-old secondary school teacher in Stirling who believes passionately in Scottish independence. You vote SNP because you want Scotland to be a normal European country making its own decisions. You voted Yes in 2014 and Remain in 2016, seeing Brexit as imposed on Scotland against its will. You believe independence would allow Scotland to build a fairer, more European society. When evaluating policies, consider whether they respect Scottish autonomy, support public services, and move Scotland closer to independence while maintaining social democratic values.",
    
    "Hamish - Scottish Conservative": "You are Hamish, a 59-year-old farmer in Aberdeenshire who believes strongly in preserving the United Kingdom. You vote Scottish Conservative because you think the Union benefits Scotland economically and culturally. You voted No in 2014 and Leave in 2016, wanting decisions made in Westminster rather than Brussels. You're frustrated by SNP dominance and want policies that strengthen the Union while supporting rural Scotland. When evaluating policies, consider their impact on the Union, rural communities, and whether they counter SNP narratives about independence.",
    
    "Eileen - Scottish Labour": "You are Eileen, a 61-year-old retired social worker in East Kilbride who has voted Labour all her life. You believe in the Union because you think working-class solidarity transcends national boundaries. You voted No in 2014 because you believe the British welfare state and NHS are worth preserving, and Remain in 2016 for workers' rights. You're frustrated that the SNP has taken Labour votes by promising independence rather than focusing on inequality. When evaluating policies, prioritize their impact on working-class communities, public services, and strengthening social solidarity across the UK.",
    
    "Rhian - Plaid Cymru Supporter": "You are Rhian, a 37-year-old Welsh-language teacher in Caernarfon who is passionate about Welsh culture and self-determination. You vote Plaid Cymru because you believe Wales should control its own destiny like other small European nations. You're fluent in Welsh and English, seeing bilingualism as Wales's strength. You voted Remain and support Welsh independence within the EU. When evaluating policies, consider their impact on the Welsh language, rural Welsh communities, and whether they move Wales toward greater self-governance while preserving Welsh identity.",
    
    "Gareth - Welsh Valleys Labour": "You are Gareth, a 54-year-old care assistant in Merthyr Tydfil who worked in the steelworks until redundancy forced a career change. You're a proud Welshman and lifelong Labour voter who believes in workers' solidarity. You voted Leave because you felt the EU didn't help Welsh communities and are skeptical of Welsh independence, preferring strong public services across the UK. You've seen your community decline but believe in collective action. When evaluating policies, focus on their impact on post-industrial Welsh communities, job creation, and whether they support working-class people through economic transition.",
    
    "Robert - DUP Unionist": "You are Robert, a 65-year-old retired civil servant in East Belfast who is fiercely loyal to the Union with Britain. You vote DUP because they best defend Protestant unionist interests and oppose any moves toward Irish unification. You voted Leave partly because you disliked EU interference in UK sovereignty. You hold traditional Christian values and are suspicious of liberal social policies. When evaluating policies, consider their impact on the Union, whether they strengthen or weaken Northern Ireland's place in the UK, and whether they respect traditional Protestant values.",
    
    "Máire - Sinn Féin Supporter": "You are Máire, a 42-year-old community worker in West Belfast who believes in Irish unification and votes Sinn Féin. You see yourself as Irish rather than British and want to see Ireland reunited through peaceful, democratic means. You voted Remain because you support EU membership for Ireland. You work in community development and believe in social justice and equality. When evaluating policies, consider their impact on the nationalist community, whether they advance equality and human rights, and how they affect the prospects for Irish unification.",
    
    "David - Alliance Moderate": "You are David, a 39-year-old software developer in South Belfast from a mixed religious background who votes Alliance because you want to move beyond traditional sectarian divisions. You believe Northern Ireland needs pragmatic, cross-community politics focused on economic development and shared society. You voted Remain for economic reasons and are more interested in good governance than constitutional questions. When evaluating policies, consider their impact on economic development, whether they bring communities together rather than divide them, and their practical effectiveness regardless of traditional political alignments.",
    
    "Zoe - Gen Z Climate Activist": "You are Zoe, a 19-year-old environmental science student in Brighton who sees climate change as the defining issue of your generation. You vote Green and are involved in climate activism, including school strikes and protests. You're frustrated that older generations haven't acted on climate change and support radical action to achieve net zero. You care about intersectional social justice and see environmental and social issues as connected. When evaluating policies, prioritize their climate impact, effects on young people, and whether they represent the kind of systemic change you believe is necessary.",
    
    "Alex - Housing Crisis Millennial": "You are Alex, a 32-year-old freelance graphic designer in Manchester who struggles to afford housing despite having a degree and working full-time. You're part of the 'generation rent' and feel locked out of homeownership. You vote Labour but are attracted to Green policies on housing and workers' rights. You're non-binary and care about LGBTQ+ equality. You voted Remain and work in the creative economy. When evaluating policies, focus on housing affordability, freelancer rights, LGBTQ+ equality, and whether they help creative professionals build stable careers.",
    
    "Helen - Generation X Sandwich": "You are Helen, a 49-year-old HR manager in Guildford juggling care for teenage children and aging parents while maintaining a demanding career. You're financially comfortable but feel pressure from multiple directions. You vote Liberal Democrat because you want competent, moderate governance that supports working families. You voted Remain and support evidence-based policies. When evaluating policies, consider their impact on working parents, support for elder care, education funding, and whether they help families manage competing pressures without adding bureaucratic burden.",
    
    "Sam - LGBTQ+ Rights Advocate": "You are Sam, a 26-year-old gay man working for an LGBTQ+ charity in Oxford. You're passionate about equality and human rights, having experienced discrimination and fought for legal protections. You vote Labour and are involved in progressive activism. You voted Remain because you see the EU as protecting human rights. You earn less than you could in the private sector because you believe in the cause. When evaluating policies, prioritize their impact on LGBTQ+ people, minority rights, and whether they advance or threaten equality and anti-discrimination protections.",
    
    "Emma - Disabled Rights Voter": "You are Emma, a 38-year-old former teacher in Newcastle who became disabled through chronic illness and now campaigns for disability rights. You vote Labour because you believe in a strong welfare state and public services. You've experienced the benefits system firsthand and know how policy changes affect disabled people's lives. You voted Remain because you support workers' rights and equality legislation. When evaluating policies, consider their impact on disabled people, whether they promote independence and dignity, and their effects on healthcare and social support systems.",
    
    "Tony - Military Veteran": "You are Tony, a 53-year-old former soldier from Aldershot who served in Iraq and Afghanistan before working in private security. You vote Conservative because you believe in strong defence and support for the military. You voted Leave because you want Britain to be sovereign and control its borders. You're proud of your service but frustrated by veteran homelessness and inadequate mental health support. When evaluating policies, consider their impact on defence, veteran welfare, national security, and whether they show proper respect for military service and British values.",
    
    "Sharon - Seaside Town Decline": "You are Sharon, a 41-year-old care home worker in Blackpool watching your town decline while tourist areas get investment but local people struggle. You voted Conservative in 2019 hoping for 'levelling up' and voted Leave because you wanted change. You work hard caring for elderly people but struggle on low wages while seeing drugs and social problems increase. When evaluating policies, consider whether they bring real investment to forgotten seaside towns, improve wages for care workers, and address the social problems that come with economic decline.",
    
    "Rachel - University Town Professional": "You are Rachel, a 34-year-old university administrator in Durham who believes in the transformative power of higher education. You vote Liberal Democrat because you support evidence-based policy and international cooperation. You voted Remain and worry about Brexit's impact on research and student mobility. You live in a university town where town-gown relations are important and see education as key to economic development. When evaluating policies, consider their impact on higher education, research funding, international collaboration, and the relationship between universities and their local communities.",
    
    "Michelle - Single Parent": "You are Michelle, a 30-year-old single mother in Coventry working part-time while raising two young children. You struggle with childcare costs and benefit bureaucracy while trying to build a better life for your family. You voted Leave hoping for change and usually vote Labour when you can get to the polls. You feel judged by the welfare system and politicians who don't understand single parents' challenges. When evaluating policies, consider their impact on single-parent families, childcare support, benefit system fairness, and whether they help or hinder your efforts to improve your situation.",
    
    "Patricia - Family Carer": "You are Patricia, a 57-year-old former nurse in Cardiff who gave up her career to care for your husband with dementia. You receive carer's allowance but struggle financially and feel isolated. You vote Labour because you believe in public services and social care. You voted Remain because you support workers' rights and EU funding for health research. You know the care system from both professional and personal perspectives. When evaluating policies, consider their impact on unpaid carers, social care funding, respite support, and whether they recognize the economic and social value of care work.",
    
    "Jack - Recent Graduate": "You are Jack, a 23-year-old recent graduate on a trainee scheme in Leeds, struggling with £40,000 student debt while earning a low starting salary. You're ambitious but worried about ever affording a house or building the career you expected your degree would provide. You vote Labour hoping for policies that help young people and would have voted Remain. You feel your generation got a raw deal compared to your parents. When evaluating policies, consider their impact on graduate debt, entry-level wages, career opportunities, and whether they help young people achieve the life stability previous generations took for granted.",
    
    "Andrew - Empty Nester Professional": "You are Andrew, a 55-year-old finance director in Winchester whose children have left home and who is planning for retirement in the next decade. You're in your peak earning years but worry about pension provisions and tax policy. You vote Conservative for fiscal responsibility but voted Remain for economic stability. You're socially moderate and want competent economic management above all. When evaluating policies, consider their impact on higher earners, pension planning, tax efficiency, and long-term economic stability. You want policies that reward success while being fiscally sustainable."
  };

  const testPolicy = async () => {
    if (!policyText.trim()) {
      alert('Please enter a policy to test');
      return;
    }

    setIsRunning(true);
    setProgress(0);
    setResults([]);

    // Select personas based on user choice
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
        // Get the prompt for this persona
        const basePrompt = personaPrompts[persona.name];
        
        if (!basePrompt) {
          throw new Error(`No prompt found for persona: ${persona.name}`);
        }

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

        // Call Claude API
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

  const exportResults = () => {
    const csvContent = [
      ['Persona', 'Category', 'Immediate Reaction', 'Voting Impact', 'Key Quote'],
      ...results.filter(r => r.success).map(r => [
        r.name,
        r.category,
        r.data.immediate_reaction,
        r.data.voting_impact,
        r.data.key_quote
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'policy-testing-results.csv';
    a.click();
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

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">UK Voter Persona Policy Testing Tool</h1>
        <p className="text-gray-600">Test how different policy proposals might be received across 40 representative UK voter personas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
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

        {/* Stats Panel */}
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

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Policy Testing Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((result, index) => (
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
                      <p className="text-sm text-gray-900">{result.data.immediate_reaction}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Voting Impact:</p>
                      <p className="text-sm text-gray-900">{result.data.voting_impact}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-sm font-medium text-gray-700 italic">"{result.data.key_quote}"</p>
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
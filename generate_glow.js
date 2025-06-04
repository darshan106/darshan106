const fs = require('fs');

async function fetchContributions() {
  const fetch = (await import('node-fetch')).default;
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query($userName: String!) {
        user(login: $userName) {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }`,
      variables: { userName: "darshan106" }
    })
  });

  const data = await response.json();
  console.log("API Response:", JSON.stringify(data, null, 2));

  if (!data.data || !data.data.user) {
    console.log("Using mock data due to API error...");
    return Array.from({ length: 52 * 7 }, (_, i) => ({
      contributionCount: Math.floor(Math.random() * 10),
      date: `2025-${String(Math.floor(i / 7) + 1).padStart(2, '0')}-${String((i % 7) + 1).padStart(2, '0')}`
    }));
  }

  return data.data.user.contributionsCollection.contributionCalendar.weeks
    .flatMap(week => week.contributionDays);
}

async function generateSVG() {
  try {
    const contributions = await fetchContributions();
    if (!contributions || contributions.length === 0) {
      throw new Error("No contribution data received.");
    }

    const maxContributions = Math.max(...contributions.map(day => day.contributionCount));
    if (maxContributions === 0) {
      throw new Error("No non-zero contributions found.");
    }

    let svg = `<svg width="800" height="140" xmlns="http://www.w3.org/2000/svg">
      <style>
        .dot { fill: #00ff00; }
        .glow { animation: glow 1.5s infinite ease-in-out; }
        @keyframes glow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 1; }
        }
      </style>`;

    contributions.forEach((day, index) => {
      const contribution = day.contributionCount;
      if (contribution === 0) return;
      const x = (index % 52) * 15 + 15;
      const y = Math.floor(index / 52) * 20 + 20;
      const scale = contribution / maxContributions + 0.5;
      svg += `<circle cx="${x}" cy="${y}" r="3" class="dot glow" style="animation-duration: ${2 / scale}s;"/>`;
    });

    svg += `</svg>`;
    
    fs.writeFileSync('generated_svg.txt', svg);
    console.log("SVG generated and saved to generated_svg.txt");
  } catch (error) {
    console.error("Error generating SVG:", error.message);
    process.exit(1);
  }
}

generateSVG();

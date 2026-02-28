export interface Challenge {
  id: number
  title: string
  description: string
  language: "html" | "css" | "javascript"
  defaultCode: string
  expectedOutput: string
  hint: string
  xp: number
}

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: "Carte de profil",
    description: "Crée une carte de profil en HTML avec une image, un nom et une bio.",
    language: "html",
    expectedOutput: "<img",
    hint: "Utilise <div>, <img>, <h2> et <p> pour structurer ta carte.",
    xp: 150,
    defaultCode: `<!DOCTYPE html>
<html>
  <body>
    <!-- Crée ta carte de profil ici -->
  </body>
</html>`,
  },
  {
    id: 2,
    title: "Bouton animé",
    description: "Crée un bouton CSS qui change de couleur au hover avec une transition smooth.",
    language: "css",
    expectedOutput: "transition",
    hint: "Utilise :hover et la propriété 'transition' pour l'animation.",
    xp: 150,
    defaultCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      .btn { padding: 1rem 2rem; border: none; border-radius: 0.5rem; cursor: pointer; font-size: 1rem; }
      /* Ajoute hover + transition ici */
    </style>
  </head>
  <body>
    <button class="btn">Clique-moi !</button>
  </body>
</html>`,
  },
  {
    id: 3,
    title: "Compte à rebours",
    description: "Écris une boucle qui affiche un compte à rebours de 10 à 0.",
    language: "javascript",
    expectedOutput: "0",
    hint: "Utilise une boucle for avec i = 10 jusqu'à i >= 0.",
    xp: 150,
    defaultCode: `// Écris ton compte à rebours ici
`,
  },
  {
    id: 4,
    title: "Navbar responsive",
    description: "Crée une navbar HTML avec logo + 3 liens alignés avec flexbox.",
    language: "html",
    expectedOutput: "nav",
    hint: "Utilise <nav> avec display:flex pour aligner les éléments.",
    xp: 150,
    defaultCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      body { margin: 0; font-family: sans-serif; background: #0f0f0f; color: white; }
      /* Style ta navbar ici */
    </style>
  </head>
  <body>
    <!-- Crée ta navbar ici -->
  </body>
</html>`,
  },
  {
    id: 5,
    title: "FizzBuzz",
    description: "Affiche les nombres de 1 à 15. Multiples de 3 → 'Fizz', de 5 → 'Buzz', des deux → 'FizzBuzz'.",
    language: "javascript",
    expectedOutput: "FizzBuzz",
    hint: "Utilise l'opérateur modulo (%) pour vérifier les multiples.",
    xp: 150,
    defaultCode: `// Écris ton FizzBuzz ici
`,
  },
  {
    id: 6,
    title: "Grid de cartes",
    description: "Crée un grid CSS de 3 cartes avec gap, border-radius et box-shadow.",
    language: "css",
    expectedOutput: "grid",
    hint: "Utilise 'display: grid' avec 'grid-template-columns: repeat(3, 1fr)'.",
    xp: 150,
    defaultCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      body { background: #0f0f0f; padding: 2rem; }
      .grid { /* Ajoute grid ici */ }
      .card { background: #1e1b4b; padding: 1.5rem; color: white; }
    </style>
  </head>
  <body>
    <div class="grid">
      <div class="card">🌐 HTML</div>
      <div class="card">🎨 CSS</div>
      <div class="card">⚡ JS</div>
    </div>
  </body>
</html>`,
  },
  {
    id: 7,
    title: "Calculatrice simple",
    description: "Écris une fonction add(a, b) qui retourne la somme et affiche add(5, 3).",
    language: "javascript",
    expectedOutput: "8",
    hint: "Définis une fonction avec 'function add(a, b) { return a + b }' puis appelle-la.",
    xp: 150,
    defaultCode: `// Écris ta fonction ici
`,
  },
]

// Retourne le défi du jour basé sur la date
export function getTodayChallenge(): Challenge {
  const today = new Date()
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  )
  return CHALLENGES[dayOfYear % CHALLENGES.length]
}

// Retourne le temps restant avant minuit
export function getTimeUntilMidnight(): { hours: number; minutes: number; seconds: number } {
  const now = new Date()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)
  const diff = midnight.getTime() - now.getTime()
  return {
    hours: Math.floor(diff / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

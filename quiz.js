const correctAnswers = {
    q1: 'b',
    q2: 'c',
    q3: 'a',
    q4: 'b',
    q5: 'b',
    q6: 'a',
    q7: 'b',
    q8: 'b',
    q9: 'a',
    q10: 'b',
    q11: 'b',
    q12: 'b'
};

const answerExplanations = {
    q1: "Le Machine Learning est une branche de l'Intelligence Artificielle qui permet aux machines d'apprendre à partir de données sans être explicitement programmées.",
    q2: "Random Forest est un algorithme de classification qui utilise plusieurs arbres de décision pour améliorer la précision des prédictions.",
    q3: "LSTM signifie Long Short-Term Memory, un type de réseau de neurones récurrent utilisé pour traiter des séquences de données.",
    q4: "Le prétraitement des données consiste à nettoyer, transformer et préparer les données pour qu'elles soient adaptées à l'analyse et au machine learning.",
    q5: "Un Data Warehouse est un entrepôt de données centralisé qui stocke des données provenant de différentes sources pour faciliter l'analyse et le reporting.",
    q6: "ETL signifie Extract, Transform, Load - un processus pour extraire des données, les transformer et les charger dans un entrepôt de données.",
    q7: "DoS (Denial of Service) est une attaque qui vise à rendre un service indisponible en le submergeant de requêtes.",
    q8: "Power BI est un outil de Microsoft spécialisé dans la création de dashboards et la visualisation interactive de données.",
    q9: "Le Feature Engineering est le processus de création de nouvelles variables (features) à partir des données existantes pour améliorer les performances des modèles.",
    q10: "Scrum est une méthodologie agile populaire qui organise le travail en sprints courts avec des équipes auto-organisées.",
    q11: "Le Deep Learning est une sous-catégorie du Machine Learning qui utilise des réseaux de neurones artificiels avec plusieurs couches (profonds).",
    q12: "La normalisation met les données à la même échelle pour éviter que certaines variables dominent d'autres dans les algorithmes de ML."
};

function calculateScore() {
    let score = 0;
    let totalQuestions = Object.keys(correctAnswers).length;
    let userAnswers = {};
    
    for (let question in correctAnswers) {
        const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
        if (selectedAnswer) {
            userAnswers[question] = selectedAnswer.value;
            if (selectedAnswer.value === correctAnswers[question]) {
                score++;
            }
        } else {
            userAnswers[question] = null;
        }
    }
    
    const percentage = (score / totalQuestions) * 100;
    const resultDiv = document.getElementById('result');
    const scoreText = document.getElementById('scoreText');
    const answersDiv = document.getElementById('answers');
    
    let message = '';
    if (percentage >= 80) {
        message = 'Excellent ! Vous maîtrisez très bien le sujet !';
    } else if (percentage >= 60) {
        message = 'Bien joué ! Vous avez de bonnes connaissances.';
    } else if (percentage >= 40) {
        message = 'Pas mal ! Il y a encore quelques points à améliorer.';
    } else {
        message = 'Continuez à apprendre ! La pratique mène à la perfection.';
    }
    
    scoreText.innerHTML = `<strong>Votre score : ${score}/${totalQuestions} (${percentage.toFixed(0)}%)</strong><br>${message}`;
    
    let answersHTML = '<h4>Réponses correctes :</h4>';
    for (let i = 1; i <= totalQuestions; i++) {
        const question = `q${i}`;
        const userAnswer = userAnswers[question];
        const isCorrect = userAnswer === correctAnswers[question];
        
        answersHTML += `
            <div style="margin-bottom: 15px; padding: 10px; background-color: ${isCorrect ? '#d4edda' : '#f8d7da'}; border-radius: 5px;">
                <strong>Question ${i}:</strong> ${isCorrect ? '✓ Correct' : '✗ Incorrect'}<br>
                ${!isCorrect ? `Votre réponse: ${userAnswer || 'Non répondu'}<br>` : ''}
                Réponse correcte: ${correctAnswers[question]}<br>
                <em>${answerExplanations[question]}</em>
            </div>
        `;
    }
    
    answersDiv.innerHTML = answersHTML;
    resultDiv.classList.remove('hidden');
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}
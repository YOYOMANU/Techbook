<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Level;
use App\Models\Status;
use App\Models\Technology;
use Illuminate\Database\Seeder;

class TechnologySeeder extends Seeder
{
    public function run(): void
    {
        $technologies = [
    // Front-end
        ['name' => 'HTML/CSS',     'description' => 'Langages de base pour structurer et styliser les pages web.',                                      'categories' => ['front-end'],             'level' => 'debutant',      'status' => 'mastered'],
        ['name' => 'JavaScript',   'description' => 'Langage de scripting incontournable pour le web, côté client et serveur.',                         'categories' => ['front-end', 'back-end'], 'level' => 'debutant',      'status' => 'mastered'],
        ['name' => 'TypeScript',   'description' => 'Superset typé de JavaScript pour un code plus robuste et maintenable.',                           'categories' => ['front-end', 'back-end'], 'level' => 'intermediaire', 'status' => 'learning'],
        ['name' => 'React',        'description' => 'Bibliothèque UI de Meta pour créer des interfaces réactives à base de composants.',               'categories' => ['front-end'],             'level' => 'intermediaire', 'status' => 'mastered'],
        ['name' => 'Vue.js',       'description' => 'Framework JavaScript progressif, léger et facile à intégrer.',                                    'categories' => ['front-end'],             'level' => 'intermediaire', 'status' => 'exploring'],
        ['name' => 'Angular',      'description' => 'Framework complet de Google pour les applications web à grande échelle.',                         'categories' => ['front-end'],             'level' => 'intermediaire', 'status' => 'exploring'],
        ['name' => 'Tailwind CSS', 'description' => 'Framework CSS utilitaire pour construire rapidement des interfaces personnalisées.',               'categories' => ['front-end'],             'level' => 'debutant',      'status' => 'mastered'],
        ['name' => 'Next.js',      'description' => 'Framework React avec rendu côté serveur (SSR) et génération statique (SSG).',                     'categories' => ['front-end'],             'level' => 'senior',        'status' => 'learning'],
        ['name' => 'Nuxt.js',      'description' => 'Framework Vue.js orienté SSR/SSG pour des applications web performantes.',                        'categories' => ['front-end'],             'level' => 'senior',        'status' => 'exploring'],
        ['name' => 'Svelte',       'description' => 'Framework front-end compilé qui génère du JavaScript vanilla ultra-performant.',                  'categories' => ['front-end'],             'level' => 'senior',        'status' => 'exploring'],

        // Back-end
        ['name' => 'PHP',          'description' => 'Langage serveur largement utilisé pour le développement web dynamique.',                          'categories' => ['back-end'],              'level' => 'debutant',      'status' => 'mastered'],
        ['name' => 'Python',       'description' => 'Langage polyvalent, populaire en scripting, web et intelligence artificielle.',                   'categories' => ['back-end', 'ia & ml'],   'level' => 'debutant',      'status' => 'learning'],
        ['name' => 'Laravel',      'description' => 'Framework PHP élégant avec un écosystème riche pour les applications web modernes.',              'categories' => ['back-end'],              'level' => 'intermediaire', 'status' => 'mastered'],
        ['name' => 'Node.js',      'description' => 'Environnement d\'exécution JavaScript côté serveur, rapide et orienté événements.',               'categories' => ['back-end'],              'level' => 'intermediaire', 'status' => 'learning'],
        ['name' => 'Express.js',   'description' => 'Framework minimaliste pour Node.js, idéal pour construire des APIs REST.',                       'categories' => ['back-end'],              'level' => 'intermediaire', 'status' => 'learning'],
        ['name' => 'Django',       'description' => 'Framework Python batteries-included pour un développement web rapide et sécurisé.',               'categories' => ['back-end'],              'level' => 'intermediaire', 'status' => 'exploring'],
        ['name' => 'FastAPI',      'description' => 'Framework Python moderne et performant pour construire des APIs avec typage automatique.',        'categories' => ['back-end', 'ia & ml'],   'level' => 'intermediaire', 'status' => 'exploring'],
        ['name' => 'GraphQL',      'description' => 'Langage de requête pour APIs offrant une flexibilité totale sur les données récupérées.',         'categories' => ['back-end'],              'level' => 'senior',        'status' => 'exploring'],
        ['name' => 'NestJS',       'description' => 'Framework Node.js structuré et scalable inspiré d\'Angular, en TypeScript.',                     'categories' => ['back-end'],              'level' => 'senior',        'status' => 'exploring'],
        ['name' => 'Spring Boot',  'description' => 'Framework Java pour créer des applications d\'entreprise robustes et prêtes à la production.',    'categories' => ['back-end'],              'level' => 'senior',        'status' => 'exploring'],

        // BDD
        ['name' => 'SQLite',       'description' => 'Base de données légère intégrée, parfaite pour les projets embarqués ou en développement.',       'categories' => ['bdd'],                   'level' => 'debutant',      'status' => 'mastered'],
        ['name' => 'MariaDB',      'description' => 'Fork open source de MySQL, performant et compatible avec la plupart des applications web.',       'categories' => ['bdd'],                   'level' => 'debutant',      'status' => 'learning'],
        ['name' => 'MySQL',        'description' => 'Système de gestion de base de données relationnelle parmi les plus utilisés au monde.',           'categories' => ['bdd'],                   'level' => 'debutant',      'status' => 'mastered'],
        ['name' => 'PostgreSQL',   'description' => 'SGBD relationnel avancé avec un support étendu des types de données et des performances élevées.', 'categories' => ['bdd'],                  'level' => 'intermediaire', 'status' => 'learning'],
        ['name' => 'MongoDB',      'description' => 'Base de données NoSQL orientée documents, flexible et scalable horizontalement.',                 'categories' => ['bdd'],                   'level' => 'intermediaire', 'status' => 'exploring'],
        ['name' => 'Redis',        'description' => 'Stockage clé-valeur en mémoire ultrarapide, utilisé pour le cache et les files de messages.',     'categories' => ['bdd'],                   'level' => 'intermediaire', 'status' => 'exploring'],
        ['name' => 'Firebase',     'description' => 'Plateforme Google offrant base de données temps réel, authentification et hébergement cloud.',    'categories' => ['bdd'],                   'level' => 'intermediaire', 'status' => 'exploring'],
        ['name' => 'Elasticsearch','description' => 'Moteur de recherche et d\'analyse distribué, optimisé pour les recherches full-text.',            'categories' => ['bdd'],                   'level' => 'senior',        'status' => 'exploring'],

        // IA & ML
        ['name' => 'Pandas',       'description' => 'Bibliothèque Python pour la manipulation et l\'analyse de données tabulaires.',                   'categories' => ['ia & ml'],               'level' => 'intermediaire', 'status' => 'learning'],
        ['name' => 'NumPy',        'description' => 'Bibliothèque Python pour le calcul scientifique et les opérations sur les tableaux multidimensionnels.', 'categories' => ['ia & ml'],        'level' => 'intermediaire', 'status' => 'learning'],
        ['name' => 'Scikit-learn', 'description' => 'Bibliothèque Python de machine learning avec des algorithmes classiques prêts à l\'emploi.',      'categories' => ['ia & ml'],               'level' => 'intermediaire', 'status' => 'exploring'],
        ['name' => 'TensorFlow',   'description' => 'Framework open source de Google pour l\'entraînement et le déploiement de modèles deep learning.', 'categories' => ['ia & ml'],              'level' => 'senior',        'status' => 'exploring'],
        ['name' => 'PyTorch',      'description' => 'Framework deep learning de Meta, apprécié pour sa flexibilité et sa facilité de débogage.',      'categories' => ['ia & ml'],               'level' => 'senior',        'status' => 'exploring'],
        ['name' => 'Keras',        'description' => 'API haut niveau pour TensorFlow, simplifiant la construction de réseaux de neurones.',            'categories' => ['ia & ml'],               'level' => 'senior',        'status' => 'exploring'],
        ['name' => 'OpenCV',       'description' => 'Bibliothèque de vision par ordinateur pour le traitement d\'images et de vidéos en temps réel.',  'categories' => ['ia & ml'],               'level' => 'senior',        'status' => 'exploring'],

        // Cloud & DevOps
        ['name' => 'Git',          'description' => 'Système de contrôle de version distribué, indispensable pour tout développeur.',                  'categories' => ['cloud & devops'],        'level' => 'debutant',      'status' => 'mastered'],
        ['name' => 'Linux',        'description' => 'Système d\'exploitation open source, base de la plupart des serveurs et environnements cloud.',   'categories' => ['cloud & devops'],        'level' => 'intermediaire', 'status' => 'learning'],
        ['name' => 'Docker',       'description' => 'Plateforme de conteneurisation pour créer, déployer et exécuter des applications isolées.',       'categories' => ['cloud & devops'],        'level' => 'intermediaire', 'status' => 'learning'],
        ['name' => 'GitHub Actions','description' => 'Outil CI/CD intégré à GitHub pour automatiser les workflows de build, test et déploiement.',     'categories' => ['cloud & devops'],        'level' => 'intermediaire', 'status' => 'exploring'],
        ['name' => 'Nginx',        'description' => 'Serveur web et reverse proxy haute performance, souvent utilisé devant les apps Laravel/Node.',   'categories' => ['cloud & devops'],        'level' => 'intermediaire', 'status' => 'learning'],
        ['name' => 'Kubernetes',   'description' => 'Orchestrateur de conteneurs pour déployer et scaler des applications en production.',             'categories' => ['cloud & devops'],        'level' => 'senior',        'status' => 'exploring'],
        ['name' => 'AWS',          'description' => 'Suite de services cloud d\'Amazon couvrant compute, stockage, base de données et IA.',            'categories' => ['cloud & devops'],        'level' => 'senior',        'status' => 'exploring'],
        ['name' => 'Google Cloud', 'description' => 'Plateforme cloud de Google avec des services managés en IA, data et infrastructure.',             'categories' => ['cloud & devops'],        'level' => 'senior',        'status' => 'exploring'],
        ['name' => 'Terraform',    'description' => 'Outil d\'infrastructure as code pour provisionner et gérer des ressources cloud de manière déclarative.', 'categories' => ['cloud & devops'], 'level' => 'senior', 'status' => 'exploring'],
    ];

        foreach ($technologies as $tech) {
            $level = Level::where('name', $tech['level'])->first();
            $status = Status::where('name', $tech['status'])->first();

            $technology = Technology::create([
                'name' => $tech['name'],
                'description' => $tech['description'],
                'level_id' => $level->id,
                'status_id' => $status->id,
            ]);

            $categoryIds = Category::whereIn('name', $tech['categories'])->pluck('id');
            $technology->categories()->attach($categoryIds);
        }
    }
}

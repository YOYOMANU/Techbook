<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Level;
use App\Models\Status;
use App\Models\Technology;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TechnologySeeder extends Seeder
{
    public function run(): void
    {
        // Crée ou récupère l'user Yoann
        $user = User::firstOrCreate(
            ['email' => 'emmanuelyoann19@gmail.com'],
            [
                'name'     => 'Yoann Emmanuel',
                'password' => Hash::make('Azerty123'),
            ]
        );

        $technologies = [
            // Front-end
            ['name' => 'HTML/CSS',      'description' => 'Langages de base pour structurer et styliser les pages web.',                                         'categories' => ['front-end'],             'level' => 'debutant',      'status' => 'Maîtrisée'],
            ['name' => 'JavaScript',    'description' => 'Langage de scripting incontournable pour le web, côté client et serveur.',                            'categories' => ['front-end', 'back-end'], 'level' => 'debutant',      'status' => 'Maîtrisée'],
            ['name' => 'TypeScript',    'description' => 'Superset typé de JavaScript pour un code plus robuste et maintenable.',                              'categories' => ['front-end', 'back-end'], 'level' => 'intermediaire', 'status' => 'En cour'],
            ['name' => 'React',         'description' => 'Bibliothèque UI de Meta pour créer des interfaces réactives à base de composants.',                  'categories' => ['front-end'],             'level' => 'intermediaire', 'status' => 'Maîtrisée'],
            ['name' => 'Vue.js',        'description' => 'Framework JavaScript progressif, léger et facile à intégrer.',                                       'categories' => ['front-end'],             'level' => 'intermediaire', 'status' => 'À explorer'],
            ['name' => 'Angular',       'description' => 'Framework complet de Google pour les applications web à grande échelle.',                            'categories' => ['front-end'],             'level' => 'intermediaire', 'status' => 'À explorer'],
            ['name' => 'Tailwind CSS',  'description' => 'Framework CSS utilitaire pour construire rapidement des interfaces personnalisées.',                  'categories' => ['front-end'],             'level' => 'debutant',      'status' => 'Maîtrisée'],
            ['name' => 'Next.js',       'description' => 'Framework React avec rendu côté serveur (SSR) et génération statique (SSG).',                        'categories' => ['front-end'],             'level' => 'senior',        'status' => 'En cour'],
            ['name' => 'Nuxt.js',       'description' => 'Framework Vue.js orienté SSR/SSG pour des applications web performantes.',                           'categories' => ['front-end'],             'level' => 'senior',        'status' => 'À explorer'],
            ['name' => 'Svelte',        'description' => 'Framework front-end compilé qui génère du JavaScript vanilla ultra-performant.',                     'categories' => ['front-end'],             'level' => 'senior',        'status' => 'À explorer'],
            // Back-end
            ['name' => 'PHP',           'description' => 'Langage serveur largement utilisé pour le développement web dynamique.',                             'categories' => ['back-end'],              'level' => 'debutant',      'status' => 'Maîtrisée'],
            ['name' => 'Python',        'description' => 'Langage polyvalent, populaire en scripting, web et intelligence artificielle.',                      'categories' => ['back-end', 'ia & ml'],   'level' => 'debutant',      'status' => 'En cour'],
            ['name' => 'Laravel',       'description' => 'Framework PHP élégant avec un écosystème riche pour les applications web modernes.',                 'categories' => ['back-end'],              'level' => 'intermediaire', 'status' => 'Maîtrisée'],
            ['name' => 'Node.js',       'description' => 'Environnement d\'exécution JavaScript côté serveur, rapide et orienté événements.',                  'categories' => ['back-end'],              'level' => 'intermediaire', 'status' => 'En cour'],
            ['name' => 'Express.js',    'description' => 'Framework minimaliste pour Node.js, idéal pour construire des APIs REST.',                          'categories' => ['back-end'],              'level' => 'intermediaire', 'status' => 'En cour'],
            ['name' => 'Django',        'description' => 'Framework Python batteries-included pour un développement web rapide et sécurisé.',                  'categories' => ['back-end'],              'level' => 'intermediaire', 'status' => 'À explorer'],
            ['name' => 'FastAPI',       'description' => 'Framework Python moderne et performant pour construire des APIs avec typage automatique.',           'categories' => ['back-end', 'ia & ml'],   'level' => 'intermediaire', 'status' => 'À explorer'],
            ['name' => 'GraphQL',       'description' => 'Langage de requête pour APIs offrant une flexibilité totale sur les données récupérées.',            'categories' => ['back-end'],              'level' => 'senior',        'status' => 'À explorer'],
            ['name' => 'NestJS',        'description' => 'Framework Node.js structuré et scalable inspiré d\'Angular, en TypeScript.',                        'categories' => ['back-end'],              'level' => 'senior',        'status' => 'À explorer'],
            ['name' => 'Spring Boot',   'description' => 'Framework Java pour créer des applications d\'entreprise robustes et prêtes à la production.',       'categories' => ['back-end'],              'level' => 'senior',        'status' => 'À explorer'],
            // BDD
            ['name' => 'SQLite',        'description' => 'Base de données légère intégrée, parfaite pour les projets embarqués ou en développement.',          'categories' => ['bdd'],                   'level' => 'debutant',      'status' => 'Maîtrisée'],
            ['name' => 'MariaDB',       'description' => 'Fork open source de MySQL, performant et compatible avec la plupart des applications web.',          'categories' => ['bdd'],                   'level' => 'debutant',      'status' => 'En cour'],
            ['name' => 'MySQL',         'description' => 'Système de gestion de base de données relationnelle parmi les plus utilisés au monde.',              'categories' => ['bdd'],                   'level' => 'debutant',      'status' => 'Maîtrisée'],
            ['name' => 'PostgreSQL',    'description' => 'SGBD relationnel avancé avec un support étendu des types de données et des performances élevées.',   'categories' => ['bdd'],                   'level' => 'intermediaire', 'status' => 'En cour'],
            ['name' => 'MongoDB',       'description' => 'Base de données NoSQL orientée documents, flexible et scalable horizontalement.',                    'categories' => ['bdd'],                   'level' => 'intermediaire', 'status' => 'À explorer'],
            ['name' => 'Redis',         'description' => 'Stockage clé-valeur en mémoire ultrarapide, utilisé pour le cache et les files de messages.',        'categories' => ['bdd'],                   'level' => 'intermediaire', 'status' => 'À explorer'],
            ['name' => 'Firebase',      'description' => 'Plateforme Google offrant base de données temps réel, authentification et hébergement cloud.',       'categories' => ['bdd'],                   'level' => 'intermediaire', 'status' => 'À explorer'],
            ['name' => 'Elasticsearch', 'description' => 'Moteur de recherche et d\'analyse distribué, optimisé pour les recherches full-text.',               'categories' => ['bdd'],                   'level' => 'senior',        'status' => 'À explorer'],
            // IA & ML
            ['name' => 'Pandas',        'description' => 'Bibliothèque Python pour la manipulation et l\'analyse de données tabulaires.',                      'categories' => ['ia & ml'],               'level' => 'intermediaire', 'status' => 'En cour'],
            ['name' => 'NumPy',         'description' => 'Bibliothèque Python pour le calcul scientifique et les opérations sur les tableaux.',                'categories' => ['ia & ml'],               'level' => 'intermediaire', 'status' => 'En cour'],
            ['name' => 'Scikit-learn',  'description' => 'Bibliothèque Python de machine learning avec des algorithmes classiques prêts à l\'emploi.',         'categories' => ['ia & ml'],               'level' => 'intermediaire', 'status' => 'À explorer'],
            ['name' => 'TensorFlow',    'description' => 'Framework open source de Google pour l\'entraînement et le déploiement de modèles deep learning.',   'categories' => ['ia & ml'],               'level' => 'senior',        'status' => 'À explorer'],
            ['name' => 'PyTorch',       'description' => 'Framework deep learning de Meta, apprécié pour sa flexibilité et sa facilité de débogage.',         'categories' => ['ia & ml'],               'level' => 'senior',        'status' => 'À explorer'],
            ['name' => 'Keras',         'description' => 'API haut niveau pour TensorFlow, simplifiant la construction de réseaux de neurones.',               'categories' => ['ia & ml'],               'level' => 'senior',        'status' => 'À explorer'],
            ['name' => 'OpenCV',        'description' => 'Bibliothèque de vision par ordinateur pour le traitement d\'images et de vidéos en temps réel.',     'categories' => ['ia & ml'],               'level' => 'senior',        'status' => 'À explorer'],
            // Cloud & DevOps
            ['name' => 'Git',           'description' => 'Système de contrôle de version distribué, indispensable pour tout développeur.',                     'categories' => ['cloud & devops'],        'level' => 'debutant',      'status' => 'Maîtrisée'],
            ['name' => 'Linux',         'description' => 'Système d\'exploitation open source, base de la plupart des serveurs et environnements cloud.',      'categories' => ['cloud & devops'],        'level' => 'intermediaire', 'status' => 'En cour'],
            ['name' => 'Docker',        'description' => 'Plateforme de conteneurisation pour créer, déployer et exécuter des applications isolées.',          'categories' => ['cloud & devops'],        'level' => 'intermediaire', 'status' => 'En cour'],
            ['name' => 'GitHub Actions','description' => 'Outil CI/CD intégré à GitHub pour automatiser les workflows de build, test et déploiement.',         'categories' => ['cloud & devops'],        'level' => 'intermediaire', 'status' => 'À explorer'],
            ['name' => 'Nginx',         'description' => 'Serveur web et reverse proxy haute performance.',                                                    'categories' => ['cloud & devops'],        'level' => 'intermediaire', 'status' => 'En cour'],
            ['name' => 'Kubernetes',    'description' => 'Orchestrateur de conteneurs pour déployer et scaler des applications en production.',                'categories' => ['cloud & devops'],        'level' => 'senior',        'status' => 'À explorer'],
            ['name' => 'AWS',           'description' => 'Suite de services cloud d\'Amazon couvrant compute, stockage, base de données et IA.',               'categories' => ['cloud & devops'],        'level' => 'senior',        'status' => 'À explorer'],
            ['name' => 'Google Cloud',  'description' => 'Plateforme cloud de Google avec des services managés en IA, data et infrastructure.',                'categories' => ['cloud & devops'],        'level' => 'senior',        'status' => 'À explorer'],
            ['name' => 'Terraform',     'description' => 'Outil d\'infrastructure as code pour provisionner et gérer des ressources cloud de manière déclarative.', 'categories' => ['cloud & devops'],   'level' => 'senior',        'status' => 'À explorer'],
        ];

        foreach ($technologies as $tech) {
            $level  = Level::where('name', $tech['level'])->first();
            $status = Status::where('name', $tech['status'])->first();

            // firstOrCreate évite les doublons à chaque déploiement
            $technology = Technology::firstOrCreate(
                [
                    'name'    => $tech['name'],
                    'user_id' => $user->id,
                ],
                [
                    'description' => $tech['description'],
                    'level_id'    => $level->id,
                    'status_id'   => $status->id,
                    'favoris'     => false,
                ]
            );

            // Sync uniquement si la tech vient d'être créée
            if ($technology->wasRecentlyCreated) {
                $categoryIds = Category::whereIn('name', $tech['categories'])->pluck('id');
                $technology->categories()->attach($categoryIds);
            }
        }
    }
}
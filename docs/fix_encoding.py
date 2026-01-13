# -*- coding: utf-8 -*-
# Script pour corriger l'encodage du fichier README.md

with open('README.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Liste des corrections d'encodage
corrections = [
    ('ðŸš€', '🚀'),
    ('ðŸ"‹', '📋'),
    ('ðŸŽ¯', '🎯'),
    ('ðŸŒŸ', '🌟'),
    ('ðŸ'‰', '👉'),
    ('âœ¨', '✨'),
    ('âœ…', '✅'),
    ('Ã©', 'é'),
    ('Ã ', 'à'),
    ('Ã¨', 'è'),
    ('Ã´', 'ô'),
    ('Ã»', 'û'),
    ('Ã‡', 'Ç'),
    ('Ãª', 'ê'),
    ('â€™', "'"),
    ('â€œ', '"'),
    ('â€', '"'),
    ('â†'', '→'),
    ('â‚¬', '€'),
    ('ðŸ"', '📁'),
    ('ðŸ"§', '🔧'),
    ('âš™ï¸', '⚙️'),
    ('ðŸŽ‰', '🎉'),
    ('ðŸ"', '🔍'),
    ('ðŸ"±', '📱'),
    ('ðŸ'¡', '💡'),
    ('ðŸ"ž', '📞'),
    ('ðŸ"„', '📄'),
    ('ðŸŽ¨', '🎨'),
    ('ðŸ–¼ï¸', '🖼️'),
    ('âš¡', '⚡'),
    ('ðŸ"š', '📚'),
    ('ðŸŽ"', '🎓'),
    ('ðŸŽ¥', '🎥'),
    ('ðŸ‡¬ðŸ‡¦', '🇬🇦'),
    ('â"œâ"€â"€', '├──'),
    ('â"‚', '│'),
    ('â""â"€â"€', '└──'),
    ('Ã€', 'À'),
    ('COMPLÃˆTE', 'COMPLÈTE'),
    ('personnalisÃ©es', 'personnalisées'),
    ('Ã©diteur', 'éditeur'),
    ('recommandÃ©', 'recommandé'),
    ('PrÃ©requis', 'Prérequis'),
    ('Ã‰tape', 'Étape'),
    ('TÃ©lÃ©charger', 'Télécharger'),
    ('CrÃ©ez', 'Créez'),
    ('TÃ©lÃ©phone', 'Téléphone'),
    ('CoordonnÃ©es', 'Coordonnées'),
    ('dÃ©veloppement', 'développement'),
    ('prÃ©senter', 'présenter'),
    ('DÃ©mo', 'Démo'),
    ('Ã©gales', 'égales'),
    ('rÃ©guliÃ¨rement', 'régulièrement'),
    ('DÃ©veloppÃ©', 'Développé'),
    ('AnnÃ©e', 'Année'),
    ('nâ€™hÃ©sitez', "n'hésitez"),
    ('crÃ©er', 'créer'),
    ('gÃ©rer', 'gérer'),
    ('intÃ©grÃ©e', 'intégrée'),
    ('protÃ©gÃ©', 'protégé'),
    ('sÃ©curitÃ©', 'sécurité'),
    ('crÃ©ation', 'création'),
    ('ModÃ¨le', 'Modèle'),
    ('complÃ¨te', 'complète'),
    ('lÃ©gales', 'légales'),
    ('actualitÃ©s', 'actualités'),
    ('complÃ¨tes', 'complètes'),
    ('prÃªt', 'prêt'),
    ('â€"', '—'),
    ('FonctionnalitÃ©s', 'Fonctionnalités'),
    ('DÃ©ploiement', 'Déploiement'),
    ('HÃ©bergement', 'Hébergement'),
    ('ComplÃ¨te', 'Complète'),
    ('Ã‰', 'É'),
    ('rÃ©seaux', 'réseaux'),
    ('hÃ©bergeur', 'hébergeur'),
    ('RÃ©seaux', 'Réseaux'),
    ('intÃ©grer', 'intégrer'),
    ('crÃ©Ã©', 'créé'),
]

# Appliquer toutes les corrections
for old, new in corrections:
    content = content.replace(old, new)

# Sauvegarder dans un nouveau fichier
with open('README_fixed.md', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Fichier corrigé créé : README_fixed.md")
print("Vous pouvez maintenant remplacer README.md par ce fichier.")

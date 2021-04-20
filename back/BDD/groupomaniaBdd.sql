-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 20 avr. 2021 à 15:37
-- Version du serveur :  8.0.21
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int UNSIGNED NOT NULL,
  `post_id` int UNSIGNED NOT NULL,
  `content` text,
  PRIMARY KEY (`id`),
  KEY `FK_user_id` (`user_id`) USING BTREE,
  KEY `FK_post_id` (`post_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int UNSIGNED NOT NULL,
  `post_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_post_id_likes` (`post_id`) USING BTREE,
  KEY `FK_user_id_like` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=244 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `content` text,
  `user_id` int UNSIGNED NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `likes` int UNSIGNED NOT NULL DEFAULT '0',
  `url_web` varchar(255) DEFAULT NULL,
  `date_post` char(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_id_post` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=307 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `content`, `user_id`, `image_url`, `likes`, `url_web`, `date_post`) VALUES
(304, 'Test ', 589, NULL, 0, 'null', 'mardi 20 avril 2021, 17:37'),
(305, '', 589, 'fb77712d2380a02f437325747cfa503516185082018921618933027882.gif', 0, 'null', 'mardi 20 avril 2021, 17:37'),
(306, '', 589, NULL, 0, 'https://www.youtube.com/watch?v=h4UqMyldS7Q', 'mardi 20 avril 2021, 17:37');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `adresse_email` varchar(40) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'user-base.png',
  PRIMARY KEY (`id`),
  UNIQUE KEY `adresse_email` (`adresse_email`)
) ENGINE=InnoDB AUTO_INCREMENT=590 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `isAdmin`, `nom`, `prenom`, `adresse_email`, `mot_de_passe`, `image_url`) VALUES
(577, 1, 'Parede', 'Yoan', 'parede@yoan.fr', '$2b$10$8Q6vRJ8cp1TxzoYSmUY9R.vgJR0tofRTpqC2ZoZ1.1Kzg8MfxM3WG', 'avatar-admin1618930778312.png'),
(589, 0, 'Tarek', 'wil', 'w@w.fr', '$2b$10$sPp4ZNO4umj4Gn6Yb966feM02ENcxBx6Uur9bf.NvtwLDGMqzs16S', 'avatar-admin1618932992625.png');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

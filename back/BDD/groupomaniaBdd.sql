-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost

-- Bdd structure 

CREATE DATABASE IF NOT EXISTS groupomania;

USE groupomania;

-- Table structure for table `comment`

CREATE TABLE `comment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `post_id` int unsigned NOT NULL,
  `content` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `posts`

CREATE TABLE `posts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `content` text,
  `user_id` int unsigned NOT NULL,
  `image_url` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Table structure for table `users`

CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `adresse_email` varchar(40) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'user-base.png',
  PRIMARY KEY (`id`),
  UNIQUE KEY `adresse_email` (`adresse_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

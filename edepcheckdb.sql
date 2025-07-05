-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2025 at 08:43 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edepcheckdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(15) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`) VALUES
(1, 'Work Performance & Efficiency', '2025-07-02 08:19:19'),
(2, 'Coping & Support Systems', '2025-07-03 15:56:45');

-- --------------------------------------------------------

--
-- Table structure for table `choices`
--

CREATE TABLE `choices` (
  `id` int(15) NOT NULL,
  `question_id` int(15) NOT NULL,
  `text` text NOT NULL,
  `value` int(15) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `choices`
--

INSERT INTO `choices` (`id`, `question_id`, `text`, `value`, `created_at`) VALUES
(5, 2, 'Fully aware and used them', 3, '2025-07-03 15:56:45'),
(6, 2, 'Aware but haven’t used them', 2, '2025-07-03 15:56:45'),
(7, 2, 'Somewhat aware', 1, '2025-07-03 15:56:45'),
(8, 2, 'Not aware at all', 0, '2025-07-03 15:56:45'),
(21, 5, 'qweqewqwe', 3, '2025-07-04 07:00:21'),
(22, 5, 'asdse', 2, '2025-07-04 07:00:21'),
(23, 5, 'sfx', 1, '2025-07-04 07:00:21'),
(24, 5, 'xfgwve', 0, '2025-07-04 07:00:21'),
(29, 1, 'Always', 3, '2025-07-04 07:43:29'),
(30, 1, 'Sometimes', 2, '2025-07-04 07:43:29'),
(31, 1, 'Often', 1, '2025-07-04 07:43:29'),
(32, 1, 'Never', 0, '2025-07-04 07:43:29');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(15) NOT NULL,
  `category_id` int(15) NOT NULL,
  `text` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `category_id`, `text`, `created_at`) VALUES
(1, 1, 'Do you find it challenging to stay motivated during the workday?', '2025-07-02 08:30:09'),
(2, 2, 'Are you aware of mental health resources offered by your employer?', '2025-07-03 15:56:45'),
(5, 1, 'hello are you?', '2025-07-04 07:00:21');

-- --------------------------------------------------------

--
-- Table structure for table `responses`
--

CREATE TABLE `responses` (
  `id` int(15) NOT NULL,
  `user_id` int(15) NOT NULL,
  `exam_code_id` int(15) NOT NULL,
  `total_score` int(255) NOT NULL,
  `severity` varchar(100) NOT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `responses`
--

INSERT INTO `responses` (`id`, `user_id`, `exam_code_id`, `total_score`, `severity`, `submitted_at`) VALUES
(1, 10, 3, 2, 'Minimal depression', '2025-07-03 05:55:51'),
(2, 10, 3, 3, 'Minimal depression', '2025-07-03 05:56:44'),
(5, 12, 3, 4, 'Minimal depression', '2025-07-03 06:22:53'),
(6, 12, 3, 3, 'Minimal depression', '2025-07-03 14:47:41'),
(7, 12, 3, 2, 'Minimal depression', '2025-07-03 15:14:20'),
(8, 12, 3, 1, 'Minimal depression', '2025-07-03 15:17:07'),
(9, 13, 3, 3, 'Minimal depression', '2025-07-03 15:18:07'),
(10, 12, 3, 1, 'Minimal depression', '2025-07-03 15:57:58'),
(11, 14, 3, 1, 'Minimal depression', '2025-07-04 04:44:32'),
(12, 15, 5, 6, 'Mild depression', '2025-07-04 06:07:34'),
(13, 12, 5, 5, 'Mild depression', '2025-07-04 07:57:43'),
(14, 15, 5, 3, 'Minimal depression', '2025-07-04 08:07:53');

-- --------------------------------------------------------

--
-- Table structure for table `tb_exam`
--

CREATE TABLE `tb_exam` (
  `id` int(15) NOT NULL,
  `exam_code` varchar(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `severity` varchar(100) NOT NULL,
  `total_examinees` int(15) NOT NULL,
  `exam_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_exam`
--

INSERT INTO `tb_exam` (`id`, `exam_code`, `title`, `severity`, `total_examinees`, `exam_date`) VALUES
(3, '20250714', 'Sample Exam', 'Pending', 9, '2025-07-13'),
(5, '20250720', 'SCIENCE', 'Pending', 3, '2025-07-18');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `division` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `birthday` date DEFAULT NULL,
  `age` int(11) NOT NULL,
  `sex_and_gender` varchar(30) DEFAULT NULL,
  `civil_status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `division`, `position`, `password`, `role`, `created_at`, `birthday`, `age`, `sex_and_gender`, `civil_status`) VALUES
(4, 'qwerty', '', '', '', '$2b$10$3yji3BmARSOh.r0Wiflp1emzWQ17NyKthUdWUQwh5/8ZEWBOzp3YO', 'admin', '2025-07-01 08:04:42', NULL, 0, NULL, NULL),
(5, 'Hetty', '', '', '', '$2b$10$.fBcYD89Ju4JaIaKewZKqudBd5qIx9qKPuM7cBg95hzQS/xKUo3v2', 'user', '2025-07-01 08:04:42', NULL, 0, NULL, NULL),
(6, 'Admin admin', '', '', '', '$2b$10$E2/YicJqqKmBTwUsRFg3me4nXasFH8G4Gx6TQV7n4HBYWYvNwjUYa', 'admin', '2025-07-01 08:04:42', NULL, 0, NULL, NULL),
(7, 'Kate Lorreine Colot', '', '', '', '$2b$10$YvWwkiXxfSaNr9IXPQAVAuoEQrVJhqpU0yPpLhsCEzBZIGjgErd9W', 'user', '2025-07-01 08:50:57', NULL, 0, NULL, NULL),
(8, 'Joebert Cabatit', '', 'Finance and Administration', 'OJT', '$2b$10$YGbN0gtxxDSqV6haOn1VYOWK.BLMDDR7KXjZ4tS2TmJR7d8Q92bZ.', 'user', '2025-07-01 08:56:04', NULL, 0, NULL, NULL),
(9, 'JK Cabatit', '', 'Finance and Administration', 'OJT', '$2b$10$pgfcBJiqkCOua6aMNjgAu.rgyC4NED8YZ8tILVvDRuT2LgFxGM9q6', 'user', '2025-07-02 02:07:32', NULL, 0, NULL, NULL),
(10, 'Carlyn Dugmoc', 'carlynmaedugmoc@gmail.com', 'Finance and Administration', 'OJT', '$2b$10$riKky3XsQtIYV6D2LCWsAOxKLGwoFhaxZRWAhNbdf.OXkTLLU6luG', 'user', '2025-07-02 02:46:39', NULL, 0, NULL, NULL),
(11, 'This is Admin', 'admin@edepcheck.com', 'Finance and Administration', 'Admin', '$2b$10$pRh/P8AD3l8LVZUo9zAyQuPHRRjcws7bCe3iIF60NZta4xehX7EYy', 'admin', '2025-07-02 02:51:44', NULL, 0, NULL, NULL),
(12, 'Lorinkit Colot', 'lorinkit.colot@gmail.com', 'FAD', 'OJT', '$2b$10$Ky90F8ZwYZ.ITijVSyeKvu8ydZiRoBA714Hk73z0WVwj4V6RZ9ZN2', 'user', '2025-07-03 06:19:42', NULL, 0, NULL, NULL),
(13, 'Heyjoe Cabatit', 'joeboicabs@gmail.com', 'Finance and Administration', 'OJT', '$2b$10$zEzfCdCfJehIL2Qfkkf7IeEOEJI.A9GKgc//4s5CuBxGJ3GDoDFrW', 'user', '2025-07-03 12:06:11', NULL, 0, NULL, NULL),
(14, 'Earl Mike Romanillos', 'mikeroma@gmail.com', 'Local Government Capability Development Division', 'OJT', '$2b$10$cEKM3OMcSLLKkv/3DuS/OeB/a95i6OLAlvk03WIfodv8Q.OKrW94q', 'user', '2025-07-04 04:44:03', NULL, 0, NULL, NULL),
(15, 'Mike Romanillos', 'romanillos.earlmike@gmail.com', 'Office of the Regional Director', 'Student', '$2b$10$6cLvu4o72zgBjPT8s4GEsOvTad./4d6Xv712gOxm3jnbGaMr1Y1lG', 'user', '2025-07-04 05:52:07', NULL, 0, NULL, NULL),
(16, 'Mike Romanillos', 'romanillos.earlmike@gmail.com', 'Office of the Regional Director', 'Student', '$2b$10$GcCHUqdrD1k8BpLf1k04Ou2Vtogpma3zChkG8DdGykTBmc1fvbNGG', 'user', '2025-07-04 05:52:07', NULL, 0, NULL, NULL),
(21, 'qqqqqqq', 'lori@gmail.com', 'Finance and Administration', 'OJT', '$2b$10$2L2FXG6fOVE8gZN8QvIq8Om0O0NMwFqiqEiLXxHk2fKHSm63Y19vW', 'user', '2025-07-04 16:07:43', '2004-08-03', 20, 'Female', 'Single');

-- --------------------------------------------------------

--
-- Table structure for table `user_responses_details`
--

CREATE TABLE `user_responses_details` (
  `id` int(15) NOT NULL,
  `user_id` int(15) NOT NULL,
  `question_id` int(15) NOT NULL,
  `choice_id` int(15) NOT NULL,
  `exam_code_id` int(15) NOT NULL,
  `response_id` int(15) NOT NULL,
  `submitted_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_responses_details`
--

INSERT INTO `user_responses_details` (`id`, `user_id`, `question_id`, `choice_id`, `exam_code_id`, `response_id`, `submitted_at`) VALUES
(9, 12, 2, 8, 3, 10, '2025-07-03'),
(11, 14, 2, 8, 3, 11, '2025-07-04'),
(13, 15, 2, 5, 5, 12, '2025-07-04'),
(15, 12, 1, 31, 5, 13, '2025-07-04'),
(16, 12, 2, 6, 5, 13, '2025-07-04'),
(18, 12, 5, 22, 5, 13, '2025-07-04'),
(19, 15, 1, 31, 5, 14, '2025-07-04'),
(20, 15, 2, 7, 5, 14, '2025-07-04'),
(21, 15, 5, 23, 5, 14, '2025-07-04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `choices`
--
ALTER TABLE `choices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `choices_ibfk_1` (`question_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questions_ibfk_1` (`category_id`);

--
-- Indexes for table `responses`
--
ALTER TABLE `responses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `responses_ibfk_2` (`exam_code_id`);

--
-- Indexes for table `tb_exam`
--
ALTER TABLE `tb_exam`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `exam_code` (`exam_code`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_responses_details`
--
ALTER TABLE `user_responses_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_responses_details_ibfk_1` (`user_id`),
  ADD KEY `user_responses_details_ibfk_2` (`question_id`),
  ADD KEY `user_responses_details_ibfk_3` (`choice_id`),
  ADD KEY `user_responses_details_ibfk_4` (`exam_code_id`),
  ADD KEY `user_responses_details_ibfk_5` (`response_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `choices`
--
ALTER TABLE `choices`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `responses`
--
ALTER TABLE `responses`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tb_exam`
--
ALTER TABLE `tb_exam`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user_responses_details`
--
ALTER TABLE `user_responses_details`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `choices`
--
ALTER TABLE `choices`
  ADD CONSTRAINT `choices_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `responses`
--
ALTER TABLE `responses`
  ADD CONSTRAINT `responses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `responses_ibfk_2` FOREIGN KEY (`exam_code_id`) REFERENCES `tb_exam` (`id`);

--
-- Constraints for table `user_responses_details`
--
ALTER TABLE `user_responses_details`
  ADD CONSTRAINT `user_responses_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_responses_details_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_responses_details_ibfk_3` FOREIGN KEY (`choice_id`) REFERENCES `choices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_responses_details_ibfk_4` FOREIGN KEY (`exam_code_id`) REFERENCES `tb_exam` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_responses_details_ibfk_5` FOREIGN KEY (`response_id`) REFERENCES `responses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

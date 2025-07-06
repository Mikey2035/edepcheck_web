-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2025 at 09:08 AM
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
(2, 'Coping & Support Systems', '2025-07-03 15:56:45'),
(6, 'Time Management', '2025-07-06 03:14:14'),
(7, 'Emotional & Mental Well-being', '2025-07-06 03:19:20'),
(8, 'Burnout & Fatigue', '2025-07-06 03:23:13');

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
(41, 1, 'Always', 3, '2025-07-05 15:12:15'),
(42, 1, 'Sometimes', 2, '2025-07-05 15:12:15'),
(43, 1, 'Often', 1, '2025-07-05 15:12:15'),
(44, 1, 'Never', 0, '2025-07-05 15:12:15'),
(49, 6, 'Lower', 3, '2025-07-06 03:13:54'),
(50, 6, 'About the same', 2, '2025-07-06 03:13:54'),
(51, 6, 'Slightly higher', 1, '2025-07-06 03:13:54'),
(52, 6, 'Much higher', 0, '2025-07-06 03:13:54'),
(53, 7, 'Rarely', 3, '2025-07-06 03:16:07'),
(54, 7, 'Sometimes', 2, '2025-07-06 03:16:07'),
(55, 7, 'Often', 1, '2025-07-06 03:16:07'),
(56, 7, 'Always', 0, '2025-07-06 03:16:07'),
(57, 8, 'Rarely', 3, '2025-07-06 03:17:10'),
(58, 8, 'Sometimes', 2, '2025-07-06 03:17:10'),
(59, 8, 'Often', 1, '2025-07-06 03:17:10'),
(60, 8, 'Always', 0, '2025-07-06 03:17:10'),
(69, 10, 'Constantly', 3, '2025-07-06 03:20:28'),
(70, 10, 'Frequently', 2, '2025-07-06 03:20:28'),
(71, 10, 'Occasionally', 1, '2025-07-06 03:20:28'),
(72, 10, 'Never', 0, '2025-07-06 03:20:28'),
(73, 9, 'Not at all', 3, '2025-07-06 03:20:35'),
(74, 9, 'Sometimes', 2, '2025-07-06 03:20:35'),
(75, 9, 'Most of the time', 1, '2025-07-06 03:20:35'),
(76, 9, 'Always', 0, '2025-07-06 03:20:35'),
(77, 11, 'Rarely', 3, '2025-07-06 03:21:44'),
(78, 11, 'Sometimes', 2, '2025-07-06 03:21:44'),
(79, 11, 'Often', 1, '2025-07-06 03:21:44'),
(80, 11, 'Always', 0, '2025-07-06 03:21:44'),
(81, 2, 'Not aware at all', 3, '2025-07-06 03:22:47'),
(82, 2, 'Somewhat aware', 2, '2025-07-06 03:22:47'),
(83, 2, 'Aware but haven’t used them', 1, '2025-07-06 03:22:47'),
(84, 2, 'Fully aware and used them', 0, '2025-07-06 03:22:47'),
(85, 12, 'Often', 3, '2025-07-06 03:24:09'),
(86, 12, 'Sometimes', 2, '2025-07-06 03:24:09'),
(87, 12, 'Rarely', 1, '2025-07-06 03:24:09'),
(88, 12, 'Never', 0, '2025-07-06 03:24:09'),
(89, 13, 'Always', 3, '2025-07-06 03:25:12'),
(90, 13, 'Often', 2, '2025-07-06 03:25:12'),
(91, 13, 'Sometimes', 2, '2025-07-06 03:25:12'),
(92, 13, 'Never', 0, '2025-07-06 03:25:12');

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
(6, 1, 'How would you rate your current productivity compared to the past few months?', '2025-07-06 03:13:54'),
(7, 6, 'Are you able to complete tasks within the expected timeframe?', '2025-07-06 03:16:07'),
(8, 6, 'Can you manage your time well without feeling overly stressed?', '2025-07-06 03:17:10'),
(9, 2, 'Do you feel that your workplace supports work-life balance?', '2025-07-06 03:18:50'),
(10, 7, 'How often do you feel anxious or stressed while working?', '2025-07-06 03:20:18'),
(11, 7, 'Do you feel emotionally supported by your coworkers or supervisor?', '2025-07-06 03:21:44'),
(12, 8, 'Do you feel physically tired or lacking energy during your work hours?', '2025-07-06 03:24:09'),
(13, 8, 'How often do you feel that work demands are too much to handle?', '2025-07-06 03:25:12');

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
(21, 22, 6, 0, 'Minimal depression or No Depression', '2025-07-06 03:42:49'),
(22, 22, 6, 30, 'Severe depression', '2025-07-06 07:02:05'),
(23, 22, 6, 30, 'Severe depression', '2025-07-06 07:03:58');

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
(6, '20250707', 'Sample Examination', 'Pending', 1, '2025-07-07');

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
(11, 'This is Admin', 'admin@edepcheck.com', 'Finance and Administration', 'Admin', '$2b$10$pRh/P8AD3l8LVZUo9zAyQuPHRRjcws7bCe3iIF60NZta4xehX7EYy', 'admin', '2025-07-02 02:51:44', NULL, 0, NULL, NULL),
(22, 'Kate Lorreine Colot', 'lorinkit.colot@gmail.com', 'Finance and Administration', 'OJT', '$2b$10$4sPfRMrNJIxLPHRxOYzl3Owl4kbWSBQ4.nuJ7I9QQn8.WlVJx5WqK', 'user', '2025-07-06 03:40:59', '2004-08-03', 20, 'Female', 'Single');

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
(40, 22, 1, 44, 6, 21, '2025-07-06'),
(41, 22, 2, 84, 6, 21, '2025-07-06'),
(42, 22, 6, 52, 6, 21, '2025-07-06'),
(43, 22, 7, 56, 6, 21, '2025-07-06'),
(44, 22, 8, 60, 6, 21, '2025-07-06'),
(45, 22, 9, 76, 6, 21, '2025-07-06'),
(46, 22, 10, 72, 6, 21, '2025-07-06'),
(47, 22, 11, 80, 6, 21, '2025-07-06'),
(48, 22, 12, 88, 6, 21, '2025-07-06'),
(49, 22, 13, 92, 6, 21, '2025-07-06'),
(50, 22, 1, 41, 6, 22, '2025-07-06'),
(51, 22, 2, 81, 6, 22, '2025-07-06'),
(52, 22, 6, 49, 6, 22, '2025-07-06'),
(53, 22, 7, 53, 6, 22, '2025-07-06'),
(54, 22, 8, 57, 6, 22, '2025-07-06'),
(55, 22, 9, 73, 6, 22, '2025-07-06'),
(56, 22, 10, 69, 6, 22, '2025-07-06'),
(57, 22, 11, 77, 6, 22, '2025-07-06'),
(58, 22, 12, 85, 6, 22, '2025-07-06'),
(59, 22, 13, 89, 6, 22, '2025-07-06'),
(60, 22, 1, 41, 6, 23, '2025-07-06'),
(61, 22, 2, 81, 6, 23, '2025-07-06'),
(62, 22, 6, 49, 6, 23, '2025-07-06'),
(63, 22, 7, 53, 6, 23, '2025-07-06'),
(64, 22, 8, 57, 6, 23, '2025-07-06'),
(65, 22, 9, 73, 6, 23, '2025-07-06'),
(66, 22, 10, 69, 6, 23, '2025-07-06'),
(67, 22, 11, 77, 6, 23, '2025-07-06'),
(68, 22, 12, 85, 6, 23, '2025-07-06'),
(69, 22, 13, 89, 6, 23, '2025-07-06');

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
  ADD KEY `responses_ibfk_1` (`user_id`),
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
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `choices`
--
ALTER TABLE `choices`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `responses`
--
ALTER TABLE `responses`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tb_exam`
--
ALTER TABLE `tb_exam`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `user_responses_details`
--
ALTER TABLE `user_responses_details`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

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
  ADD CONSTRAINT `responses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `responses_ibfk_2` FOREIGN KEY (`exam_code_id`) REFERENCES `tb_exam` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

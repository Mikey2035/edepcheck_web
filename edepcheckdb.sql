-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2025 at 01:26 PM
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
(1, 'Work Performance & Efficiency', '2025-07-02 08:19:19');

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
(1, 1, 'Always', 4, '2025-07-02 08:30:09'),
(2, 1, 'Sometimes', 3, '2025-07-02 08:30:09'),
(3, 1, 'Often', 2, '2025-07-02 08:30:09'),
(4, 1, 'Never', 1, '2025-07-02 08:30:09');

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
(1, 1, 'Do you find it challenging to stay motivated during the workday?', '2025-07-02 08:30:09');

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

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `score` int(16) NOT NULL,
  `severity` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_exam`
--

CREATE TABLE `tb_exam` (
  `id` int(15) NOT NULL,
  `exam_code` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `severity` varchar(100) NOT NULL,
  `total_examinees` int(15) NOT NULL,
  `exam_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_exam`
--

INSERT INTO `tb_exam` (`id`, `exam_code`, `title`, `severity`, `total_examinees`, `exam_date`) VALUES
(1, '20250710', 'FAD EXAMINATION 2025', 'Pending', 0, '2025-07-10');

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `division`, `position`, `password`, `role`, `created_at`) VALUES
(4, 'qwerty', '', '', '', '$2b$10$3yji3BmARSOh.r0Wiflp1emzWQ17NyKthUdWUQwh5/8ZEWBOzp3YO', 'admin', '2025-07-01 08:04:42'),
(5, 'Hetty', '', '', '', '$2b$10$.fBcYD89Ju4JaIaKewZKqudBd5qIx9qKPuM7cBg95hzQS/xKUo3v2', 'user', '2025-07-01 08:04:42'),
(6, 'Admin admin', '', '', '', '$2b$10$E2/YicJqqKmBTwUsRFg3me4nXasFH8G4Gx6TQV7n4HBYWYvNwjUYa', 'admin', '2025-07-01 08:04:42'),
(7, 'Kate Lorreine Colot', '', '', '', '$2b$10$YvWwkiXxfSaNr9IXPQAVAuoEQrVJhqpU0yPpLhsCEzBZIGjgErd9W', 'user', '2025-07-01 08:50:57'),
(8, 'Joebert Cabatit', '', 'Finance and Administration', 'OJT', '$2b$10$YGbN0gtxxDSqV6haOn1VYOWK.BLMDDR7KXjZ4tS2TmJR7d8Q92bZ.', 'user', '2025-07-01 08:56:04'),
(9, 'JK Cabatit', '', 'Finance and Administration', 'OJT', '$2b$10$pgfcBJiqkCOua6aMNjgAu.rgyC4NED8YZ8tILVvDRuT2LgFxGM9q6', 'user', '2025-07-02 02:07:32'),
(10, 'Carlyn Dugmoc', 'carlynmaedugmoc@gmail.com', 'Finance and Administration', 'OJT', '$2b$10$riKky3XsQtIYV6D2LCWsAOxKLGwoFhaxZRWAhNbdf.OXkTLLU6luG', 'user', '2025-07-02 02:46:39'),
(11, 'This is Admin', 'admin@edepcheck.com', 'Finance and Administration', 'Admin', '$2b$10$pRh/P8AD3l8LVZUo9zAyQuPHRRjcws7bCe3iIF60NZta4xehX7EYy', 'admin', '2025-07-02 02:51:44');

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
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cateogry_id` (`category_id`);

--
-- Indexes for table `responses`
--
ALTER TABLE `responses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `exam_code_id` (`exam_code_id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `test` (`user_id`);

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
  ADD KEY `user_id` (`user_id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `choice_id` (`choice_id`),
  ADD KEY `exam_code_id` (`exam_code_id`),
  ADD KEY `response_id` (`response_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `choices`
--
ALTER TABLE `choices`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `responses`
--
ALTER TABLE `responses`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_exam`
--
ALTER TABLE `tb_exam`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_responses_details`
--
ALTER TABLE `user_responses_details`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `choices`
--
ALTER TABLE `choices`
  ADD CONSTRAINT `choices_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `responses`
--
ALTER TABLE `responses`
  ADD CONSTRAINT `responses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `responses_ibfk_3` FOREIGN KEY (`exam_code_id`) REFERENCES `tb_exam` (`id`);

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `test` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_responses_details`
--
ALTER TABLE `user_responses_details`
  ADD CONSTRAINT `user_responses_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_responses_details_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `user_responses_details_ibfk_3` FOREIGN KEY (`choice_id`) REFERENCES `choices` (`id`),
  ADD CONSTRAINT `user_responses_details_ibfk_4` FOREIGN KEY (`exam_code_id`) REFERENCES `tb_exam` (`id`),
  ADD CONSTRAINT `user_responses_details_ibfk_5` FOREIGN KEY (`response_id`) REFERENCES `responses` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

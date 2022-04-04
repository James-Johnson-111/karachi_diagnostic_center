-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2022 at 09:31 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_kdc`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_candidate_comes`
--

CREATE TABLE `tbl_candidate_comes` (
  `id` int(11) NOT NULL,
  `token_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` varchar(255) NOT NULL,
  `handle_by` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_candidate_comes`
--

INSERT INTO `tbl_candidate_comes` (`id`, `token_id`, `candidate_id`, `date`, `time`, `status`, `handle_by`, `location_id`) VALUES
(1, 1, 1, '2022-03-11', '16:26:39', 'encountered', 2, 1),
(2, 2, 1, '2022-03-11', '16:31:29', 'encountered', 2, 1),
(3, 3, 3, '2022-03-11', '16:42:27', 'encountered', 2, 1),
(4, 4, 1, '2022-03-11', '16:44:19', 'encountered', 2, 1),
(8, 28, 5, '2022-03-12', '11:52:26', 'encountered', 2, 1),
(9, 29, 13, '2022-03-12', '12:05:20', 'encountered', 2, 1),
(10, 30, 14, '2022-03-12', '12:45:31', 'encountered', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_candidate_information`
--

CREATE TABLE `tbl_candidate_information` (
  `candidate_id` int(11) NOT NULL,
  `candidate_name` varchar(255) NOT NULL,
  `travelling_to` varchar(255) NOT NULL,
  `candidate_age` int(11) NOT NULL,
  `candidate_nationality` varchar(255) NOT NULL,
  `candidate_gender` varchar(255) NOT NULL,
  `candidate_marital_status` varchar(255) NOT NULL,
  `candidate_profession` varchar(255) NOT NULL,
  `candidate_passport_no` varchar(255) NOT NULL,
  `candidate_passport_place_of_issue` varchar(255) NOT NULL,
  `candidate_image` varchar(255) NOT NULL,
  `insertion_date` date DEFAULT NULL,
  `insertion_time` time DEFAULT NULL,
  `insert_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_candidate_information`
--

INSERT INTO `tbl_candidate_information` (`candidate_id`, `candidate_name`, `travelling_to`, `candidate_age`, `candidate_nationality`, `candidate_gender`, `candidate_marital_status`, `candidate_profession`, `candidate_passport_no`, `candidate_passport_place_of_issue`, `candidate_image`, `insertion_date`, `insertion_time`, `insert_by`) VALUES
(1, 'usman', 'Canada ', 18, 'Pakistani', 'Male', 'Single', 'IT Profession', '87432943729', 'asdasdasd', 'usman.png', '2022-03-11', '16:26:39', 2),
(2, 'Ali', 'Saud', 18, 'Pakistan', 'Male', 'Single', 'IT Profession', '87432943729', 'uitytfuystuftsdyfs', 'Ali.png', '2022-03-11', '16:31:29', 2),
(3, 'hdfu', 'Canada ', 18, 'Pakistan', 'Female', 'Married', 'Developer', '34234234', 'uitytfuystuftsdyfs', 'hdfu.png', '2022-03-11', '16:42:27', 2),
(4, 'usman', 'Saudia', 18, 'Pakistan', 'Male', 'Single', 'Developer', '87432943729', 'uitytfuystuftsdyfs', 'usman.png', '2022-03-11', '16:44:19', 2),
(5, 'Ali', 'Saudia', 15, 'Pakistani', 'Male', 'Single', 'Engineer', '27283828292919', 'Karrachi', 'Ali.png', NULL, NULL, NULL),
(6, 'Ali', 'Saudia', 15, 'Pakistani', 'Male', 'Single', 'Engineer', '27283828292919', 'Karrachi', 'Ali.png', NULL, NULL, NULL),
(7, 'Ali', 'Saudia', 25, 'Pakistani', 'Male', 'Single', 'Engineer', '27283828292919', 'Karrachi', 'Ali.png', NULL, NULL, NULL),
(8, 'Ali', 'Saudia', 25, 'Pakistani', 'Male', 'Single', 'Engineer', '27283828292919', 'Karrachi', 'Ali.png', NULL, NULL, NULL),
(13, 'Kashif', 'Saudia', 25, 'Pakistani', 'Male', 'Single', 'IT PROFESSIONALS ', '272838282222', 'Karrachi', 'Kashif.png', '2022-03-12', '12:42:49', 2),
(14, 'Malahim', 'Saudia', 18, 'Pakistan', 'Male', 'Single', 'IT Profession', '1323123123213', 'asdasdasd', 'Malahim.png', '2022-03-12', '12:45:31', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_candidate_laboratory_investigation`
--

CREATE TABLE `tbl_candidate_laboratory_investigation` (
  `id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `blood_group` varchar(255) NOT NULL,
  `hemoglobin` varchar(255) NOT NULL,
  `malaria` varchar(255) NOT NULL,
  `micro_filaria` varchar(255) NOT NULL,
  `random_blood_sugar` varchar(255) NOT NULL,
  `liver_function_test` varchar(255) NOT NULL,
  `creatinine` varchar(255) NOT NULL,
  `human_immunodeficiency_virus_iii` varchar(255) NOT NULL,
  `hepatitis_b_surface_antigen` varchar(255) NOT NULL,
  `hcv_antibody_test` varchar(255) NOT NULL,
  `venereal_disease_research_laboratory_test` varchar(255) NOT NULL,
  `treponema_pallidum_hemagglutination` varchar(255) NOT NULL,
  `sugar` varchar(255) NOT NULL,
  `albumin` varchar(255) NOT NULL,
  `covid_polymerase_chain_reaction` varchar(255) NOT NULL,
  `covid_antibodies` varchar(255) NOT NULL,
  `helminthes` varchar(255) NOT NULL,
  `ova` varchar(255) NOT NULL,
  `cyst` varchar(255) NOT NULL,
  `others` varchar(255) NOT NULL,
  `polio_vaccine_id` int(11) NOT NULL,
  `mmr1_vaccine_id` int(11) NOT NULL,
  `mmr2_vaccine_id` int(11) NOT NULL,
  `meningococcal_vaccine_id` int(11) NOT NULL,
  `covid_vaccine_id` int(11) NOT NULL,
  `insertion_date` date NOT NULL,
  `insertion_time` time NOT NULL,
  `insert_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_covid_vaccine`
--

CREATE TABLE `tbl_covid_vaccine` (
  `id` int(11) NOT NULL,
  `vaccine_name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `vaccine_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_first_medical_examination`
--

CREATE TABLE `tbl_first_medical_examination` (
  `examination_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `height` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `body_mass_index` varchar(255) NOT NULL,
  `blood_pressure` varchar(255) NOT NULL,
  `pulse` varchar(255) NOT NULL,
  `pr` varchar(255) NOT NULL,
  `unaided_distant_rt_eye` varchar(255) NOT NULL,
  `unaided_distant_lt_eye` varchar(255) NOT NULL,
  `aided_distant_rt_eye` varchar(255) NOT NULL,
  `aided_distant_lt_eye` varchar(255) NOT NULL,
  `unaided_near_rt_eye` varchar(255) NOT NULL,
  `unaided_near_lt_eye` varchar(255) NOT NULL,
  `aided_near_rt_eye` varchar(255) NOT NULL,
  `aided_near_lt_eye` varchar(255) NOT NULL,
  `color_vision` varchar(255) NOT NULL,
  `right_ear` varchar(255) NOT NULL,
  `left_ear` varchar(255) NOT NULL,
  `insertion_date` date NOT NULL,
  `insertion_time` time NOT NULL,
  `insert_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_locations`
--

CREATE TABLE `tbl_locations` (
  `location_id` int(11) NOT NULL,
  `location_name` varchar(255) NOT NULL,
  `location_address` mediumtext NOT NULL,
  `location_phone_no` varchar(255) NOT NULL,
  `location_email` varchar(255) NOT NULL,
  `location_fax` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_locations`
--

INSERT INTO `tbl_locations` (`location_id`, `location_name`, `location_address`, `location_phone_no`, `location_email`, `location_fax`) VALUES
(1, 'headoffice', 'saddar, karachi', '09883487832423', 'kdc@gmail.com', '347234723');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_log`
--

CREATE TABLE `tbl_log` (
  `log_id` int(11) NOT NULL,
  `log` mediumtext NOT NULL,
  `log_query` mediumtext DEFAULT NULL,
  `log_result` mediumtext DEFAULT NULL,
  `log_date` date NOT NULL,
  `log_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_log`
--

INSERT INTO `tbl_log` (`log_id`, `log`, `log_query`, `log_result`, `log_date`, `log_time`) VALUES
(1, 'usman Logged in', ' ', ' ', '2022-03-12', '09:59:34'),
(2, 'usman Logged in', ' ', ' ', '2022-03-12', '10:16:19'),
(3, 'usman Logged in', ' ', ' ', '2022-03-12', '12:44:32');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_meningococcal_vaccine`
--

CREATE TABLE `tbl_meningococcal_vaccine` (
  `id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `vaccine_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_mmr1_vaccine`
--

CREATE TABLE `tbl_mmr1_vaccine` (
  `id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `vaccine_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_mmr2_vaccine`
--

CREATE TABLE `tbl_mmr2_vaccine` (
  `id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `vaccine_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_polio_vaccine`
--

CREATE TABLE `tbl_polio_vaccine` (
  `id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `vaccine_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_second_medical_examination`
--

CREATE TABLE `tbl_second_medical_examination` (
  `examination_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `general_appearance` varchar(255) NOT NULL,
  `cardio_vascular` varchar(255) NOT NULL,
  `respiratory` varchar(255) NOT NULL,
  `ent` varchar(255) NOT NULL,
  `Abdomen` varchar(255) NOT NULL,
  `hernia` varchar(255) NOT NULL,
  `hydrocele` varchar(255) NOT NULL,
  `exremities` varchar(255) NOT NULL,
  `back` varchar(255) NOT NULL,
  `skin` varchar(255) NOT NULL,
  `cns` varchar(255) NOT NULL,
  `deformities` varchar(255) NOT NULL,
  `speech` varchar(255) NOT NULL,
  `behaviour` varchar(255) NOT NULL,
  `orientation` varchar(255) NOT NULL,
  `memory` varchar(255) NOT NULL,
  `concentration` varchar(255) NOT NULL,
  `mood` varchar(255) NOT NULL,
  `thoughts` varchar(255) NOT NULL,
  `others` varchar(255) NOT NULL,
  `insertion_date` date NOT NULL,
  `insertion_time` time NOT NULL,
  `insert_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tokens`
--

CREATE TABLE `tbl_tokens` (
  `id` int(11) NOT NULL,
  `token_no` int(11) NOT NULL,
  `token_status` varchar(255) NOT NULL,
  `location_id` int(11) NOT NULL,
  `print_date` date NOT NULL,
  `print_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_tokens`
--

INSERT INTO `tbl_tokens` (`id`, `token_no`, `token_status`, `location_id`, `print_date`, `print_time`) VALUES
(1, 1, 'encountered', 1, '2022-03-11', '16:18:38'),
(2, 2, 'encountered', 1, '2022-03-11', '16:18:38'),
(3, 3, 'encountered', 1, '2022-03-11', '16:18:38'),
(4, 4, 'encountered', 1, '2022-03-11', '16:18:38'),
(28, 5, 'encountered', 1, '2022-03-12', '10:36:20'),
(29, 6, 'encountered', 1, '2022-03-12', '11:56:10'),
(30, 7, 'encountered', 1, '2022-03-12', '12:44:51');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_password` mediumtext NOT NULL,
  `user_roll` varchar(255) NOT NULL,
  `user_image` varchar(255) NOT NULL,
  `location_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `user_name`, `user_password`, `user_roll`, `user_image`, `location_id`) VALUES
(2, 'usman', 'usman', 'admin', 'usman.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users_access`
--

CREATE TABLE `tbl_users_access` (
  `access_id` int(11) NOT NULL,
  `access_name` int(11) NOT NULL,
  `access_description` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users_have_access`
--

CREATE TABLE `tbl_users_have_access` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `access_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_candidate_comes`
--
ALTER TABLE `tbl_candidate_comes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `candidate_id` (`candidate_id`),
  ADD KEY `handle_by` (`handle_by`),
  ADD KEY `location_id` (`location_id`),
  ADD KEY `token_id` (`token_id`);

--
-- Indexes for table `tbl_candidate_information`
--
ALTER TABLE `tbl_candidate_information`
  ADD PRIMARY KEY (`candidate_id`),
  ADD KEY `insert_by` (`insert_by`);

--
-- Indexes for table `tbl_candidate_laboratory_investigation`
--
ALTER TABLE `tbl_candidate_laboratory_investigation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `insert_by` (`insert_by`),
  ADD KEY `candidate_id` (`candidate_id`),
  ADD KEY `covid_vaccine_id` (`covid_vaccine_id`),
  ADD KEY `mmr1_vaccine_id` (`mmr1_vaccine_id`),
  ADD KEY `mmr2_vaccine_id` (`mmr2_vaccine_id`),
  ADD KEY `polio_vaccine_id` (`polio_vaccine_id`),
  ADD KEY `meningococcal_vaccine_id` (`meningococcal_vaccine_id`);

--
-- Indexes for table `tbl_covid_vaccine`
--
ALTER TABLE `tbl_covid_vaccine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_first_medical_examination`
--
ALTER TABLE `tbl_first_medical_examination`
  ADD PRIMARY KEY (`examination_id`),
  ADD KEY `insert_by` (`insert_by`),
  ADD KEY `candidate_id` (`candidate_id`);

--
-- Indexes for table `tbl_locations`
--
ALTER TABLE `tbl_locations`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `tbl_log`
--
ALTER TABLE `tbl_log`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `tbl_meningococcal_vaccine`
--
ALTER TABLE `tbl_meningococcal_vaccine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_mmr1_vaccine`
--
ALTER TABLE `tbl_mmr1_vaccine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_mmr2_vaccine`
--
ALTER TABLE `tbl_mmr2_vaccine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_polio_vaccine`
--
ALTER TABLE `tbl_polio_vaccine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_second_medical_examination`
--
ALTER TABLE `tbl_second_medical_examination`
  ADD PRIMARY KEY (`examination_id`),
  ADD KEY `candidate_id` (`candidate_id`),
  ADD KEY `insert_by` (`insert_by`);

--
-- Indexes for table `tbl_tokens`
--
ALTER TABLE `tbl_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `tbl_users_access`
--
ALTER TABLE `tbl_users_access`
  ADD PRIMARY KEY (`access_id`);

--
-- Indexes for table `tbl_users_have_access`
--
ALTER TABLE `tbl_users_have_access`
  ADD PRIMARY KEY (`id`),
  ADD KEY `access_id` (`access_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_candidate_comes`
--
ALTER TABLE `tbl_candidate_comes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_candidate_information`
--
ALTER TABLE `tbl_candidate_information`
  MODIFY `candidate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_candidate_laboratory_investigation`
--
ALTER TABLE `tbl_candidate_laboratory_investigation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_covid_vaccine`
--
ALTER TABLE `tbl_covid_vaccine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_first_medical_examination`
--
ALTER TABLE `tbl_first_medical_examination`
  MODIFY `examination_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_locations`
--
ALTER TABLE `tbl_locations`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_log`
--
ALTER TABLE `tbl_log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_meningococcal_vaccine`
--
ALTER TABLE `tbl_meningococcal_vaccine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_mmr1_vaccine`
--
ALTER TABLE `tbl_mmr1_vaccine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_mmr2_vaccine`
--
ALTER TABLE `tbl_mmr2_vaccine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_polio_vaccine`
--
ALTER TABLE `tbl_polio_vaccine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_second_medical_examination`
--
ALTER TABLE `tbl_second_medical_examination`
  MODIFY `examination_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_tokens`
--
ALTER TABLE `tbl_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_users_access`
--
ALTER TABLE `tbl_users_access`
  MODIFY `access_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_users_have_access`
--
ALTER TABLE `tbl_users_have_access`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_candidate_comes`
--
ALTER TABLE `tbl_candidate_comes`
  ADD CONSTRAINT `tbl_candidate_comes_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `tbl_candidate_information` (`candidate_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_candidate_comes_ibfk_2` FOREIGN KEY (`handle_by`) REFERENCES `tbl_users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_candidate_comes_ibfk_3` FOREIGN KEY (`location_id`) REFERENCES `tbl_locations` (`location_id`),
  ADD CONSTRAINT `tbl_candidate_comes_ibfk_4` FOREIGN KEY (`token_id`) REFERENCES `tbl_tokens` (`id`);

--
-- Constraints for table `tbl_candidate_information`
--
ALTER TABLE `tbl_candidate_information`
  ADD CONSTRAINT `tbl_candidate_information_ibfk_1` FOREIGN KEY (`insert_by`) REFERENCES `tbl_users` (`user_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_candidate_laboratory_investigation`
--
ALTER TABLE `tbl_candidate_laboratory_investigation`
  ADD CONSTRAINT `tbl_candidate_laboratory_investigation_ibfk_1` FOREIGN KEY (`insert_by`) REFERENCES `tbl_users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_candidate_laboratory_investigation_ibfk_2` FOREIGN KEY (`candidate_id`) REFERENCES `tbl_candidate_information` (`candidate_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_candidate_laboratory_investigation_ibfk_3` FOREIGN KEY (`covid_vaccine_id`) REFERENCES `tbl_covid_vaccine` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_candidate_laboratory_investigation_ibfk_4` FOREIGN KEY (`mmr1_vaccine_id`) REFERENCES `tbl_mmr1_vaccine` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_candidate_laboratory_investigation_ibfk_5` FOREIGN KEY (`mmr2_vaccine_id`) REFERENCES `tbl_mmr2_vaccine` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_candidate_laboratory_investigation_ibfk_6` FOREIGN KEY (`polio_vaccine_id`) REFERENCES `tbl_polio_vaccine` (`id`),
  ADD CONSTRAINT `tbl_candidate_laboratory_investigation_ibfk_7` FOREIGN KEY (`meningococcal_vaccine_id`) REFERENCES `tbl_meningococcal_vaccine` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_first_medical_examination`
--
ALTER TABLE `tbl_first_medical_examination`
  ADD CONSTRAINT `tbl_first_medical_examination_ibfk_1` FOREIGN KEY (`insert_by`) REFERENCES `tbl_users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_first_medical_examination_ibfk_2` FOREIGN KEY (`candidate_id`) REFERENCES `tbl_candidate_information` (`candidate_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_second_medical_examination`
--
ALTER TABLE `tbl_second_medical_examination`
  ADD CONSTRAINT `tbl_second_medical_examination_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `tbl_candidate_information` (`candidate_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_second_medical_examination_ibfk_2` FOREIGN KEY (`insert_by`) REFERENCES `tbl_users` (`user_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_tokens`
--
ALTER TABLE `tbl_tokens`
  ADD CONSTRAINT `tbl_tokens_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `tbl_locations` (`location_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD CONSTRAINT `tbl_users_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `tbl_locations` (`location_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_users_have_access`
--
ALTER TABLE `tbl_users_have_access`
  ADD CONSTRAINT `tbl_users_have_access_ibfk_1` FOREIGN KEY (`access_id`) REFERENCES `tbl_users_access` (`access_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_users_have_access_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

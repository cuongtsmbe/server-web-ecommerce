-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2022 at 04:01 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laptop`
--

-- --------------------------------------------------------

--
-- Table structure for table `authmail`
--

CREATE TABLE `authmail` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `code` varchar(10) NOT NULL,
  `tokenCode` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `authmail`
--

INSERT INTO `authmail` (`id`, `email`, `code`, `tokenCode`) VALUES
(1, 'phanhuucuong05012001@gmail.com', '348465', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBoYW5odXVjdW9uZzA1MDEyMDAxQGdtYWlsLmNvbSIsImNvZGUiOjM0ODQ2NSwiaWF0IjoxNjY5MDM2MDI4LCJleHAiOjE2NjkwMzYwODh9.BkZQAhfQZwGVYEGoTWH6l2RipY-rgtkH6vU-oItK_yY');

-- --------------------------------------------------------

--
-- Table structure for table `authphone`
--

CREATE TABLE `authphone` (
  `id` int(11) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `code` varchar(10) NOT NULL,
  `tokenCode` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `authphone`
--

INSERT INTO `authphone` (`id`, `phone`, `code`, `tokenCode`) VALUES
(1, '84384849034', '251177', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Ijg0Mzg0ODQ5MDM0IiwiY29kZSI6MjUxMTc3LCJpYXQiOjE2NjkwMzgxNDAsImV4cCI6MTY2OTAzODMyMH0._931Eb8fjyD0VaGR9H3eErvrhM4TrvrIrsqU0YZ5xRg'),
(2, '0349612646', '837500', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAzNDk2MTI2NDYiLCJjb2RlIjo4Mzc1MDAsImlhdCI6MTY2OTA1MzA3MCwiZXhwIjoxNjY5MDUzMTMwfQ.5DbQjJpxbvwOeg3qs7Ah8tmmTHLSdeU-XR4lFAdP8a0'),
(3, '+84349612646', '216814', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis4NDM0OTYxMjY0NiIsImNvZGUiOjIxNjgxNCwiaWF0IjoxNjY5MTA1Mjc4LCJleHAiOjE2NjkxMDUzMzh9.qVXNDQAgdab-8f1k0QIlVNs4QMeV0dhsrBLTxHLPPtE'),
(4, '+84969295720', '753249', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis4NDk2OTI5NTcyMCIsImNvZGUiOjc1MzI0OSwiaWF0IjoxNjY5MDk0Mjg1LCJleHAiOjE2NjkwOTQzNDV9.zBZZnnkkcJI4bJPVCkHIYTWb8eepIQaoqW8kMlJpsAU');

-- --------------------------------------------------------

--
-- Table structure for table `cthoadon`
--

CREATE TABLE `cthoadon` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_sanpham` int(10) UNSIGNED NOT NULL,
  `Don_gia_khi_mua` varchar(11) CHARACTER SET utf8 NOT NULL,
  `id_hoadon` varchar(30) CHARACTER SET utf8 NOT NULL,
  `so_luong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cthoadon`
--

INSERT INTO `cthoadon` (`id`, `id_sanpham`, `Don_gia_khi_mua`, `id_hoadon`, `so_luong`) VALUES
(271, 80, '10', '16381168066', 1),
(272, 79, '10000000', '16381168066', 1),
(273, 141, '10', '16381168846', 1),
(274, 144, '10', '16384526356', 2),
(275, 150, '', '16384542756', 1),
(276, 152, '', '16384542756', 1),
(278, 151, '', '16385279996', 1),
(279, 114, '', '16385321876', 1),
(280, 113, '', '16385321876', 1),
(281, 115, '', '16385321876', 1),
(282, 141, '', '16385324607', 1),
(283, 142, '', '16385324607', 1),
(284, 118, '', '16385324737', 1),
(285, 88, '', '16385326687', 1),
(286, 62, '', '16385326687', 1),
(287, 99, '', '16398132586', 2),
(288, 100, '', '16398132586', 1),
(294, 60, '150000', '1665429460813', 10),
(295, 59, '252000', '1665429460813', 55),
(296, 59, '5555555', '1666600294743', 3),
(297, 60, '64990000', '1666600294743', 1),
(298, 59, '5555555', '1666600873398', 1),
(302, 60, '64990000', '1667619054091', 11),
(375, 60, '2500000', '1668583919515', 10),
(376, 64, '2500000', '1668583919515', 20),
(377, 59, '2500000', '1668583919515', 30),
(381, 60, '2500000', '1668584128450', 1),
(382, 64, '2500000', '1668584128450', 2),
(383, 59, '2500000', '1668584128450', 5),
(384, 60, '2500000', '1668584586476', 1),
(385, 64, '2500000', '1668584586476', 2),
(386, 59, '2500000', '1668584586476', 5),
(387, 60, '2500000', '1668584606323', 1),
(388, 64, '2500000', '1668584606323', 2),
(389, 59, '2500000', '1668584606323', 5),
(390, 60, '2500000', '1668584643528', 1),
(391, 64, '2500000', '1668584643528', 2),
(392, 59, '2500000', '1668584643528', 5),
(393, 60, '2500000', '1668584852313', 1),
(394, 64, '2500000', '1668584852313', 2),
(395, 59, '2500000', '1668584852313', 5),
(396, 60, '2500000', '1668585560940', 1),
(397, 64, '2500000', '1668585560940', 2),
(398, 59, '2500000', '1668585560940', 5),
(399, 60, '2500000', '1668587459277', 1),
(400, 64, '2500000', '1668587459277', 2),
(401, 59, '2500000', '1668587459277', 5),
(402, 60, '2500000', '1668587501160', 1),
(403, 64, '2500000', '1668587501160', 2),
(404, 59, '2500000', '1668587501160', 5),
(405, 60, '2500000', '1668587592466', 1),
(406, 64, '2500000', '1668587592466', 2),
(407, 59, '2500000', '1668587592466', 5),
(408, 60, '2500000', '1668587616045', 1),
(409, 64, '2500000', '1668587616045', 2),
(410, 59, '2500000', '1668587616045', 5),
(411, 60, '2500000', '1668587694048', 1),
(412, 64, '2500000', '1668587694048', 2),
(413, 59, '2500000', '1668587694048', 5),
(414, 60, '2500000', '1668587850376', 1),
(415, 64, '2500000', '1668587850376', 2),
(416, 59, '2500000', '1668587850376', 5);

-- --------------------------------------------------------

--
-- Table structure for table `ctphieunhap`
--

CREATE TABLE `ctphieunhap` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_phieunhap` varchar(30) CHARACTER SET utf8 NOT NULL,
  `id_sp` int(10) UNSIGNED NOT NULL,
  `don_gia_nhap` int(11) NOT NULL,
  `so_luong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ctphieunhap`
--

INSERT INTO `ctphieunhap` (`id`, `id_phieunhap`, `id_sp`, `don_gia_nhap`, `so_luong`) VALUES
(50, '1666964102277', 59, 500000, 13),
(51, '1666964102277', 88, 2500000, 4),
(52, '1667978426912', 59, 15000, 1000),
(53, '1667978597336', 59, 15000, 1000),
(54, '1667978740993', 59, 15000, 1000),
(55, '1667979171859', 59, 15000, 1000),
(56, '1667979187763', 59, 15000, 1000),
(57, '1667979385333', 59, 15000, 1000),
(58, '1667979385333', 60, 7000, 481),
(59, '1667979412759', 59, 15000, 1000),
(60, '1667979412759', 60, 7000, 481),
(61, '1667979600282', 59, 15000, 1000),
(62, '1667979600282', 60, 7000, 481),
(63, '1667979818962', 59, 15000, 1000),
(64, '1667979818962', 60, 7000, 481),
(65, '1667979864874', 59, 15000, 1000),
(66, '1667979864874', 60, 7000, 481),
(67, '1667979891286', 59, 15000, 1000),
(68, '1667979891286', 60, 7000, 481),
(69, '1667979942816', 59, 15000, 1000),
(70, '1667979942816', 60, 7000, 481),
(71, '1667979980078', 59, 15000, 1000),
(72, '1667979980078', 60, 7000, 481),
(73, '1667980011137', 59, 15000, 1000),
(74, '1667980011137', 60, 7000, 481),
(75, '1667980299962', 59, 15000, 1000),
(76, '1667980299962', 60, 7000, 481),
(77, '1667980325155', 59, 15000, 1000),
(78, '1667980325155', 60, 7000, 481),
(79, '1667980347336', 59, 15000, 1000),
(80, '1667980347336', 60, 7000, 481),
(81, '1667980363345', 59, 15000, 1000),
(82, '1667980363345', 60, 7000, 481),
(83, '1667980703307', 59, 15000, 1000),
(84, '1667980703307', 60, 7000, 481),
(91, '1669440117914', 60, 1500000, 2),
(92, '1669440117914', 62, 8000000, 1),
(95, '1669440719662', 59, 16500000, 1),
(97, '1669440921712', 59, 1200000, 9),
(98, '1669441017818', 59, 1209000, 9),
(100, '1669441866094', 59, 12240000, 12);

-- --------------------------------------------------------

--
-- Table structure for table `danhmuc`
--

CREATE TABLE `danhmuc` (
  `id` int(10) UNSIGNED NOT NULL,
  `ten_danhmuc` varchar(191) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `danhmuc`
--

INSERT INTO `danhmuc` (`id`, `ten_danhmuc`) VALUES
(1, 'Quản lý Đơn hàng'),
(2, 'Quản lý Sản phẩm'),
(3, 'Quản lý Thương hiệu'),
(5, 'Quản lý phân loại'),
(7, 'Quản lý Nhà cung cấp'),
(8, 'Quản lý Nhân viên'),
(9, 'Quản lý Khách hàng'),
(10, 'Quản lý Phiếu nhập'),
(11, 'Quản lý Phân quyền'),
(12, 'Thống kê, báo cáo');

-- --------------------------------------------------------

--
-- Table structure for table `hoadon`
--

CREATE TABLE `hoadon` (
  `id` varchar(30) CHARACTER SET utf8 NOT NULL,
  `id_khachhang` varchar(30) CHARACTER SET utf8 NOT NULL,
  `tong_tien` int(11) NOT NULL,
  `ngay_tao` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_nhanvien` int(10) DEFAULT NULL,
  `trang_thai` tinyint(1) NOT NULL,
  `phuong_thuc_thanh_toan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `hoadon`
--

INSERT INTO `hoadon` (`id`, `id_khachhang`, `tong_tien`, `ngay_tao`, `id_nhanvien`, `trang_thai`, `phuong_thuc_thanh_toan`) VALUES
('', '1', 1, '2022-10-09 17:00:00', 2, 1, 0),
('16381168066', '6', 64480000, '2021-12-03 05:31:19', NULL, 0, 0),
('16381168846', '6', 48890000, '2021-12-03 05:44:54', NULL, 0, 0),
('16384526356', '6', 83980000, '2021-12-03 05:45:04', NULL, 0, 0),
('16384542756', '6', 75880000, '2021-12-03 05:45:03', NULL, 0, 0),
('16385279996', '6', 39490000, '2021-12-03 05:48:40', NULL, 5, 0),
('16385321876', '6', 135970000, '2021-12-03 05:49:47', NULL, 0, 0),
('16385324607', '7', 96780000, '2021-12-03 05:55:18', NULL, 5, 0),
('16385324737', '7', 90990000, '2021-12-03 06:00:56', NULL, 1, 0),
('16385326687', '7', 112980000, '2021-12-03 05:57:48', NULL, 1, 0),
('16398132586', '6', 97970000, '2021-12-18 01:40:58', NULL, 2, 0),
('1665429460813', '1', 1111111, '2022-10-09 17:00:00', 2, 1, 0),
('1666600294743', '32', 81656665, '2022-10-24 08:31:34', NULL, 1, 1),
('1666600873398', '32', 5555555, '2022-10-24 08:41:13', NULL, 1, 1),
('1667619054091', '37', 1, '2022-11-05 03:30:54', NULL, 1, 1),
('1668583919515', '1', 555555, '0000-00-00 00:00:00', 21, 2, 1),
('1668584128450', '1', 555555, '0000-00-00 00:00:00', 21, 5, 1),
('1668584586476', '1', 555555, '0000-00-00 00:00:00', 21, 2, 1),
('1668584606323', '1', 555555, '0000-00-00 00:00:00', 21, 3, 1),
('1668584643528', '1', 555555, '0000-00-00 00:00:00', 21, 2, 1),
('1668584852313', '1', 555555, '0000-00-00 00:00:00', 21, 2, 1),
('1668585560940', '1', 555555, '0000-00-00 00:00:00', 21, 2, 1),
('1668587459277', '1', 555555, '0000-00-00 00:00:00', 21, 2, 1),
('1668587501160', '1', 555555, '0000-00-00 00:00:00', 21, 2, 1),
('1668587592466', '1', 555555, '0000-00-00 00:00:00', 21, 2, 1),
('1668587616045', '1', 555555, '0000-00-00 00:00:00', 21, 2, 1),
('1668587694048', '1', 555555, '0000-00-00 00:00:00', 21, 2, 1),
('1668587850376', '1', 555555, '0000-00-00 00:00:00', 21, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id` int(10) NOT NULL,
  `idproduct` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `idproduct`, `name`, `type`) VALUES
(44, 60, '166937537435440-409085_full-hd', 'image'),
(45, 70, 'e2c48ea8-5ed2-42fe-909f-0e3469', 'image');

-- --------------------------------------------------------

--
-- Table structure for table `khachhang`
--

CREATE TABLE `khachhang` (
  `id` varchar(30) CHARACTER SET utf8 NOT NULL,
  `ten_kh` varchar(191) CHARACTER SET utf8 NOT NULL,
  `ten_dangnhap` varchar(191) CHARACTER SET utf8 NOT NULL,
  `mat_khau` varchar(191) CHARACTER SET utf8 NOT NULL,
  `salt` varchar(50) CHARACTER SET utf8 NOT NULL,
  `email` varchar(191) CHARACTER SET utf8 NOT NULL,
  `dia_chi` varchar(191) CHARACTER SET utf8 NOT NULL,
  `phone` varchar(15) CHARACTER SET utf8 NOT NULL,
  `ngay_tao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngay_sua` timestamp NOT NULL DEFAULT current_timestamp(),
  `trangthai` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `khachhang`
--

INSERT INTO `khachhang` (`id`, `ten_kh`, `ten_dangnhap`, `mat_khau`, `salt`, `email`, `dia_chi`, `phone`, `ngay_tao`, `ngay_sua`, `trangthai`) VALUES
('1', 'Nguyen Van P', 'user123', '00e720f62064ed7796752fbe6ac74edce8d131206b74a74560fcdc733f4c3d51', '', 'airua@gmail.com', '321 Đồng Văn Cống, Quận 2', '098999999', '2021-05-10 14:12:04', '2021-05-10 12:35:47', 1),
('11', 'Huynh Van A', 'vanAAA', 'vanAAA', '', 'email@gmail.com', '99 An duong vuong,p135', '0349657885', '2022-10-08 00:37:31', '2022-10-08 00:37:31', 1),
('113645486726172229565', 'hung hung', 'airua0987@gmail.com', 'account login as email.', 'f483df508807a34160437d73a5a6c8b9', 'airua0987@gmail.com', '749 TQB', '014543669', '2022-11-24 02:03:49', '2022-11-24 02:03:49', 1),
('114375140592498491153', 'Phan Hữu Cường', 'phanhuucuong05012001@gmail.com', 'account login as email.', '073cfdff8bf32fdf252eabccbc06006a', 'phanhuucuong05012001@gmail.com', '', '', '2022-11-24 02:00:48', '2022-11-24 02:00:48', 1),
('116837113517038567925', 'GTA Metahoking', 'hoangkimhung1200@gmail.com', 'account login as email.', 'ff14b43af5fb913a74dc57ac5410e93b', 'hoangkimhung1200@gmail.com', '', '', '2022-11-24 08:31:23', '2022-11-24 08:31:23', 1),
('12', 'Huynh Van A', 'vanABH', 'vanAAA', '', 'email@gmail.com', '99', '0349657885', '2022-10-08 01:20:17', '2022-10-08 01:20:17', 1),
('13', 'phan huu cuong', 'cuongphan', 'qܻ??\"?T?*?N?5nN7ܵ?oVbٯ_?????', '', 'ABC.com', '273 ADV', '0123', '2022-10-15 17:14:16', '2022-10-15 17:14:16', 1),
('1669378688330', 'Phamhung', 'phamhung', '01293c217ba269b90c5b8bc7603aede4e5803b9e6caab5ea345b208d8d4be8de', '49a27fc0f0f12022243fc64364ad64c4', 'hokhoanoiho@gmail.com', '749 TQB', '0349612647', '2022-11-25 12:18:08', '2022-11-25 12:18:08', 1),
('19', 'phan huu cuong', 'cuongphanTTT', 'M????xK??>^}???5 \0???SM??&?B', '', 'ABC.com', '273 ADV', '0123', '2022-10-16 05:30:15', '2022-10-16 05:30:15', 1),
('20', 'phan huu cuong', 'cuongphanTTTA', '???~W?z?+??\n????Z$????!?R??ZOR?', '', 'ABC.com', '273 ADV', '0123', '2022-10-16 05:33:52', '2022-10-16 05:33:52', 1),
('21', 'phan huu cuong', 'cuongphanTP', 'Al>?????Qa???9?v.?hQ??(??h?W§??', '', 'ABC.com', '273 ADV', '0123', '2022-10-16 05:55:04', '2022-10-16 05:55:04', 1),
('22', 'phan huu cuong', 'cuongphanTPE', '????ʵ?L|?qS+3?_\\???I?~/??[?9', '', 'ABC.com', '273 ADV', '0123', '2022-10-16 12:47:21', '2022-10-16 12:47:21', 1),
('23', 'phan huu cuong', 'cuongphanTPET', '???F????\nQ????p(???q,=??h}H?', '', 'ABC.com', '273 ADV', '0123', '2022-10-16 12:49:33', '2022-10-16 12:49:33', 1),
('24', 'phan huu cuong', 'cuongphanA', '-??<W?h~?ʳ??(?uif	?mi\\????', '????Jp?\"!??F,', 'ABC.com', '273 ADV', '0123', '2022-10-16 13:19:43', '2022-10-16 13:19:43', 1),
('25', 'phan huu cuong', 'cuongphanAB', '0b17fd90a5f0f85b117532ff34eaa74eae94848d8380277b8b0ddb06be4c2b04', '3da78dcbb93c023e4c695270a59ff73d', 'ABC.com', '273 ADV', '0123', '2022-10-16 13:40:18', '2022-10-16 13:40:18', 1),
('26', 'phan huu cuong', 'cuongphanAC', '5b3074b585fc074d5a0927e25bce1fcad38cc195c33be7d82f71e5381917175a', 'ca4364b91e56429508c9114c111ff149', 'ABC.com', '273 ADV', '0123', '2022-10-16 13:56:48', '2022-10-16 13:56:48', 1),
('27', 'phan huu cuong', 'cuongphanACC', '431675cea491fa671641ecd41bc49d630df9a6cce5f1ce1ebb80b86e78d05813', 'c8cbe9d572dca5b3dc8232efaf288a8d', 'ABC.com', '273 ADV', '0123', '2022-10-16 14:15:17', '2022-10-16 14:15:17', 1),
('28', 'phan huu cuong', 'cuongphanACCD', '49c7b6b8a62c6ab82797176f819997e7021f2b3c4da2815b40f1437b263aa538', '7162fa227c068bac28f9035a75cc8cce', 'phanhuucuong0501@2001gmail.com', '273 ADV', '0123', '2022-10-16 16:03:07', '2022-10-16 16:03:07', 1),
('29', 'Bui A', 'buiA', '01d445bdcb2515f2581927af0fabc62c514fd4505b8d5b305318d96b66d6e8be', '1cccb3179a56e8d13d90138f82d2b5d8', 'buiA@gmail.com', '273 An duong vuong', '0349612645', '2022-10-22 14:08:13', '2022-10-22 14:08:13', 1),
('3', 'Phan Hữu Cường', 'abcdef', 'abcdef', '', 'phanhuucuong05012001@gmail.com', 'Đồng Nai', '0969295720', '2021-05-11 03:38:01', '2021-05-14 07:10:19', 0),
('30', 'Bui A', 'buiAB', '2ca96d13ecd55ce3d8a5026c228d4343ca48ac61af06eb804d8fea630d83d87a', 'c6da40d3a7d52fbb593bd671db521d46', 'buiA@gmail.com', '273 An duong vuong', '0349612645', '2022-10-22 14:59:38', '2022-10-22 14:59:38', 1),
('31', 'Tam Tam', 'Tam', '9cec8a19548874d07b8fd6f661cca35e25a527c142e3bad3dd6bb413a67c075a', 'b6e42e0d1da17f1a1d2a4b4e0b949538', 'buiA@gmail.com', '273 An duong vuong', '0349612645', '2022-10-22 16:04:52', '2022-10-22 16:04:52', 1),
('32', 'bau nguyen', 'bau', 'd32de5863fe6793f86590d461d528259e5fb47f53a779126443c6bf5775bea5c', '0135c43feb40acee7a6dc705d1e31b14', 'phanhuucuong0501@2001gmail.com', '273 ADV', '0123', '2022-10-22 17:10:15', '2022-10-22 17:10:15', 1),
('33', 'Huynh FLY', 'FLY', '821fb46efcb40472613c41692421475e0622a8bf88997f6c0e34a552caea33f9', 'ec8d296f5cf318e463040204524c5ea3', 'email@gmail.com', '99', '0349657885', '2022-10-26 09:46:24', '2022-10-26 09:46:24', 1),
('34', '', 'user11212', 'ac5f26fa083c3321fba2273e60f1d679a720571cddbefb63a6aa936af76abe8d', 'ee0035b2abdc1c64c56188e4c0419bc2', 'awhegqwgehgwev@gmail.com', '', '0349612649', '2022-11-05 03:17:12', '2022-11-05 03:17:12', 1),
('35', '', 'user1s', '4ce74a676bbbd0d5c576abf0391b850aa9f5398d9ec8cde9db20fc38f6eb55cd', 'd5f1e16639e4fd153e2f764d326264f1', 'awhegqwgehgwev@gmail.com', '', '0349612649', '2022-11-05 03:24:37', '2022-11-05 03:24:37', 1),
('36', '', 'user1ss', '689563801e59a2c79420c3cb1153c5ba4a7fed4c1e5b259b3d1696367e9ef4e7', 'e1599a897dd681738ab95ea71c92529b', 'awhegqwgehgwev@gmail.com', '', '0349612649', '2022-11-05 03:28:55', '2022-11-05 03:28:55', 1),
('37', '', 'cung', 'f8c1651321f3fb77c82498258bacd1ef8327fed0246164983750184632907406', 'e3cad73de2c755071885171ef9047337', 'awhegqwgehgwev@gmail.com', '', '0349612649', '2022-11-05 03:30:08', '2022-11-05 03:30:08', 1),
('4', 'Phạm Nguyên', 'nguyen123', '124532', '', 'nugyen_pham123@yahoo.com', 'Huyện Nhà Bè, TP. Hồ Chí Minh', '84384849034', '2021-05-11 03:40:51', '2021-05-10 22:12:47', 0),
('5', 'Tấn Trọng Bùi', 'buitan', '12345', '', 'ngocbau2015tqk@gmail.com', '99 An Dương Vương, phường 16, quận 8, Thành phố Hồ Chí Minh', '0969295720', '2021-05-12 09:15:51', '2021-05-12 11:15:12', 0),
('6', 'Nguyễn Ngọc Báu', 'admin', 'admin', '', 'airua@gmail.com', 'Tx. Ninh Hòa, Tỉnh KHánh Hòa', '0969295720', '2021-05-12 10:23:23', '2021-05-14 08:39:09', 0),
('7', 'Bùi Tấn Âu', 'aubui17', '1234567', '', 'aubui17@gmail.com', '99 An Dương Vương, P16, Q8, Tp.HCM', '0387070222', '2021-05-12 10:25:12', '2021-05-13 13:24:39', 0);

-- --------------------------------------------------------

--
-- Table structure for table `nhacungcap`
--

CREATE TABLE `nhacungcap` (
  `id` int(10) UNSIGNED NOT NULL,
  `ten_ncc` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `diachi` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `website` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `logo` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ngay_tao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngay_sua` timestamp NOT NULL DEFAULT current_timestamp(),
  `trangthai` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `nhacungcap`
--

INSERT INTO `nhacungcap` (`id`, `ten_ncc`, `diachi`, `email`, `website`, `logo`, `phone`, `ngay_tao`, `ngay_sua`, `trangthai`) VALUES
(20, 'Công Ty TNHH Thương Mại Hoàng Phát Hải Phòng.', 'Số 4, Lô 2A Lê Hồng Phong, Ngô Quyền, Tp. Hải Phòng - Chi Nhánh: Thanh Hóa', 'lananhhoangphat@gmail.com', 'https://hoangphatvn.vn', 'http://trangvangtructuyen.vn/files/products/92fw64zJ.jpg', '(0225) 3250888 | 3556488 | 3757676 (0225) 3686200', '2021-11-28 03:37:28', '2021-11-28 03:37:28', -2),
(21, 'Công Ty TNHH Quảng Tin.', '6D3 Chu Văn An, Phường 26, Quận Bình Thạnh, TP. Hồ Chí Minh (TPHCM)', 'quangtin@quangtin.com', 'http://quangtin.com', 'http://trangvangtructuyen.vn/files/products/78me38v9.png', '(028) 35118466, 35118467 - 0989 044 022 (028) 35102003', '2021-11-28 03:37:28', '2021-11-28 03:37:28', 0),
(22, 'Công Ty TNHH Công Nghệ Máy Tính An Phát', 'Số 19, Ngõ 178 Thái Hà - Đống Đa - Tp. Hà Nội (TPHN)', 'maytinhanphat178@gmail.com', 'https://maytinhanphat.vn', 'http://trangvangtructuyen.vn/files/products/77a725d1.jpg', '(024) 66622909, 0971 851 111', '2021-11-28 03:37:28', '2021-11-28 03:37:28', 0),
(23, 'Công Ty TNHH Tin Học Minh An', '426 Nguyễn Trực, Bích Hòa, Thanh Oai, Tp. Hà Nội (TPHN)', 'mac@minhancompuer.com', 'https://minhancomputer.com', 'http://trangvangtructuyen.vn/files/products/76ko6REJ.jpg', '(024) 38777777', '2021-11-28 03:37:28', '2021-11-28 03:37:28', -2),
(24, 'Công TY TNHH Thương Mại Dịch Vụ Điện Tử Viễn Thông HKP', '174 Đường 17, Khu Phố 5, Phường Linh Trung, Quận Thủ Đức, Tp. Hồ Chí Minh (TPHCM)', 'phapbt@hkp.vn - phapbt@gmail.com', 'https://hkp.vn', 'http://trangvangtructuyen.vn/files/products/85076QZD.jpg', '091 741 2839 - 098 927 1839', '2021-11-28 03:37:28', '2021-11-28 03:37:28', 0),
(25, 'Công Ty TNHH MTV Thiên Long Phước', '52B Lâm Văn Bền, P.Tân Kiểng, Quận 7, TP Hồ Chí Minh (TPHCM)', 'thienlongphuoc269@gmail.com', 'http://thienlongphuoc.com', 'http://trangvangtructuyen.vn/files/products/887hxhmk.png', '(028) 6262 1569 - 0857 040 505 (028) 3775 1216', '2021-11-28 03:37:28', '2021-11-28 03:37:28', 0),
(26, 'Công Ty TNHH Tin Học HKC', '278 Nguyễn Văn Công, Phường 3, Quận Gò Vấp, Tp. Hồ Chí Minh (TPHCM)', 'info@hkc.vn', 'http://hkc.vn', 'http://trangvangtructuyen.vn/files/products/19l102n5.jpg', '(028) 62576744 (028) 62573048', '2021-11-28 03:37:28', '2021-11-28 03:37:28', 0),
(27, 'Hộ Kinh Doanh Hoàng Nam', 'Số 10, Ngõ 31, Phố Doãn Kế Thiện, Phường Mai Dịch, Quận Cầu Giấy, Thành Phố Hà Nội', 'sonhh2412@gmail.com', 'http://kavi.vn', 'http://trangvangtructuyen.vn/images/noimg.jpg', '091.5500 899', '2021-11-28 03:37:28', '2021-11-28 03:37:28', 0),
(28, 'Công Ty TNHH Thương Mại VHCuong', 'VHCp Tower, 399 Phạm Văn Đồng, P. Xuân Đỉnh, Q. Bắc Từ Liêm, TP Hà Nội (TPHN)', 'online@hcuong.com.vn', 'http://hcuong.com.vn', 'http://trangvangtructuyen.vn/images/noimgs.jpg', '(024) 37501188 (024) 375018189', '2021-11-28 03:37:28', '2021-11-28 03:37:28', -2),
(29, 'Công ty TNHH Toàn Cầu Phương Trâm', '76/28/5 Lê Văn Phan, P. Phú Thọ Hòa, Q. Tân Phú, TP. Hồ Chí Minh (TPHCM)', 'phuonglm83@gmail.com', 'http://putago.vn', 'http://trangvangtructuyen.vn/images/noimg.jpg', '(028) 38611515, 0906 358 313', '2021-11-28 03:37:28', '2021-11-28 03:37:28', 0),
(30, 'Công ty TNHH Công nghệ Syscom', '12A Đường Số 4, Phường Phú Mỹ, Quận 7, Tp. Hồ Chí Minh (TPHCM)', 'ctysyscom@gmail.com', 'http://www.syscom.net.vn', 'http://trangvangtructuyen.vn/images/noimg.jpg', '0931 457 534', '2021-11-28 03:37:28', '2021-11-28 03:37:28', 0),
(31, 'Công Ty TNHH Thương Mại Dịch Vụ Thanh Thịnh', '41B20 Đường 30/4, Phường 9, Thành Phố Vũng Tàu, Bà Rịa-Vũng Tàu', 'thanhthinhvt@gmail.com', 'http://cameravungtau.com.vn', 'http://trangvangtructuyen.vn/images/noimg.jpg', '(0254) 3513 860 (0254) 3577 524', '2021-11-28 03:37:28', '2021-11-28 03:37:28', 0),
(32, 'Công Ty TNHH Thương Mại Kỹ Thuật Tin Học Anh Ngọc', 'CN Hà Nội: 12 Lô 2C Khu ĐTM Trung Yên, Q.Cầu Giấy, Hà Nội (TPHN)', 'sales@anhngoc.com.vn', 'http://anhngoc.vn', 'http://trangvangtructuyen.vn/images/noimg.jpg', '(024) 37682345', '2021-11-28 03:37:28', '2021-11-28 03:37:28', 0),
(33, 'Công Ty TNHH Thương Mại Dịch Vụ Hoàng Cố Đô', '622/16/5 Cộng Hòa, Phường 13, Quận Tân Binh, TP. Hồ Chí Minh (TP HCM)', 'hoang@hoangcodo.com', 'http://www.hoangcodo.com', 'http://trangvangtructuyen.vn/images/noimg.jpg', '(028) 3811 5345 – (028) 3811 5335 (028) 3811 5358', '2021-11-28 03:37:28', '2021-11-28 03:37:28', 0),
(34, 'Công Ty TNHH SX TM DV Công Nghệ An Gia Thịnh', '152A Đường Man Thiện, KP5, P.Tăng Nhơn Phú A, Q.9, TP.Hồ Chí Minh', 'vitinhangiathinh@gmail.com', 'www.angiathinh.com', 'http://trangvangtructuyen.vn/images/noimg.jpg', '(028) 22152018', '2021-11-28 03:37:28', '2021-11-28 03:37:28', 0),
(35, 'Công Ty TNHH Thương Mại Dịch Vụ Đại Tiến Thành', '117 Đường số 26, Phường Bình Trị Đông B, Quận Bình Tân, TP Hồ Chí Minh (TP HCM)', 'lethingoc_thao2003@yahoo.com', 'http://daitienthanh.vn', 'http://trangvangtructuyen.vn/images/noimg.jpg', '(028) 38766007- (028) 62605401 - (028) 62605402 - (028) 22126699 (028) 38766007', '2021-11-28 03:37:28', '2021-11-28 03:37:28', 0),
(36, 'Công ty CP Công nghệ Thương mại Dịch vụ Vietstars', 'Số 109 Lê Thanh Nghị TP Hải dương', 'vietstars.vietnam@gmail.com', 'http://haiduongpc.com.vn', 'http://trangvangtructuyen.vn/images/noimg.jpg', '090 469 0212', '2021-11-28 03:37:28', '2021-11-28 03:37:28', 0),
(37, 'Công Ty TNHH Thương Mại Công Nghệ HQC', '115 Đốc Thiết, P.Hưng Bình, TP. Vinh, Tỉnh Nghệ An', 'hqclaptop@gmail.com', 'http://maytinhnghean.com', 'http://trangvangtructuyen.vn/images/noimg.jpg', '(0238) 3526115', '2021-11-28 03:37:28', '2021-11-28 03:37:28', 0),
(38, 'Công Ty TNHH Điều Khiển Tự Động An Phát', '86/21 Phan Tây Hồ, P. 7, Q. Phú Nhuận TP. Hồ Chí Minh (TPHCM)', 'tudonganphat@gmail.com', 'http://tudonganphat.com', 'http://trangvangtructuyen.vn/images/noimg.jpg', '(028) 35109735 (028) 35109735', '2021-11-28 03:37:28', '2021-11-28 03:37:28', 0),
(46, 'Cong ty THPM Phan Huu Cuong', '749 Ta Quang Buu, P4,Quan 8, TP. HCM', 'phanhuucuong05012001@gmail.com', 'fb.com', 'diagram.logo.com', '0349612646', '2022-10-06 15:43:45', '2022-10-06 15:43:45', 0),
(48, 'Công Ty Một thành Viên Lý Hải', '273 An duong vuong', 'ctylyhai@gmail.com', 'https://fb.com', 'https://docs.google.com/spreadsheets/d/1Y2wlIOuB1X7dmHEJgE88qVpHHGXXk__C/edit#gid=149779231', '0844125456', '2022-11-25 17:48:59', '2022-11-25 17:48:59', 0),
(49, 'Công Ty Một thành Viên ABC', '458 An duong vuong', 'ctyabc@gmail.com', 'google.com', 'https://docs.google.com/spreadsheets/d/1Y2wlIOuB1X7dmHEJgE88qVpHHGXXk__C/edit#gid=149779231', '0356985225', '2022-11-25 17:50:46', '2022-11-25 17:50:46', 0),
(50, 'Công Ty Một thành Viên VietZ', '458 An duong vuong', 'ctyVietZ@gmail.com', 'https://fb.com', 'https://docs.google.com/spreadsheets/d/1Y2wlIOuB1X7dmHEJgE88qVpHHGXXk__C/edit#gid=149779231', '0844125456', '2022-11-25 17:51:47', '2022-11-25 17:51:47', 0),
(51, 'Công Ty TNHH Thương Mại VHCuong', '273 An duong vuong', 'airua0987@gmail.com', 'https://fb.com', 'https://docs.google.com/spreadsheets/d/1Y2wlIOuB1X7dmHEJgE88qVpHHGXXk__C/edit#gid=149779231', '0844125456', '2022-11-25 18:42:51', '2022-11-25 18:42:51', 0);

-- --------------------------------------------------------

--
-- Table structure for table `nhanvien`
--

CREATE TABLE `nhanvien` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_quyen` int(10) UNSIGNED NOT NULL,
  `ten_nv` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `ten_dangnhap` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `mat_khau` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `salt` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `ngay_tao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngay_sua` timestamp NOT NULL DEFAULT current_timestamp(),
  `trangthai` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `nhanvien`
--

INSERT INTO `nhanvien` (`id`, `id_quyen`, `ten_nv`, `ten_dangnhap`, `mat_khau`, `salt`, `phone`, `email`, `ngay_tao`, `ngay_sua`, `trangthai`) VALUES
(21, 1, 'admin', 'admin', '2f4f922d27cb19ca8ea1db571980b1e71622ff65899c26725784b43462fa02fc', 'a51cf969ad28c983fb6eaf433d3a8acd', '0349612649', 'phanhuucuong05012001@gmail.com', '2022-10-22 14:49:13', '2022-10-22 14:49:13', 0),
(27, 10, 'Nguyễn ngọc báu', 'a', 'b66ef5b763a4f84697d81cde4fb3892d1302e901f66be560a58b74ce43c6efaa', '871aee85ded2ecf727199f4827bdb632', '0844125456', 'nguyenngocbaugmail.com', '2022-11-25 06:50:45', '2022-11-25 06:50:45', 0),
(28, 3, 'Nguyễn tuấn ', 'tuananh', 'e200781aa7fd60d0a21aedb52b7975804f4e10cb6ccc5faeaa0011b80f658204', 'c1bfa3982a69aea69a8e8a5429508936', '01587569555', 'tuananh@gmail.com', '2022-11-25 09:10:01', '2022-11-25 09:10:01', 0);

-- --------------------------------------------------------

--
-- Table structure for table `phanhoi_danhgia`
--

CREATE TABLE `phanhoi_danhgia` (
  `id` int(5) UNSIGNED NOT NULL,
  `id_khach` int(10) UNSIGNED NOT NULL,
  `id_sanpham` int(10) UNSIGNED NOT NULL,
  `noidung` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `trang_thai` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `phieunhap`
--

CREATE TABLE `phieunhap` (
  `id` varchar(30) CHARACTER SET utf8 NOT NULL,
  `id_nv` int(10) UNSIGNED NOT NULL,
  `id_ncc` int(10) UNSIGNED NOT NULL,
  `tong_tien` int(11) NOT NULL,
  `ngay_tao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ghichu` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `trangthai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `phieunhap`
--

INSERT INTO `phieunhap` (`id`, `id_nv`, `id_ncc`, `tong_tien`, `ngay_tao`, `ghichu`, `trangthai`) VALUES
('1666964102277', 21, 20, 28000000, '2022-12-29 17:00:00', 'san pham loi', 1),
('1667978426912', 21, 21, 987456321, '2022-11-09 07:20:27', '1000 san pham dc them', -2),
('1667978597336', 21, 21, 987456321, '2022-11-09 07:23:17', '1000 san pham dc them', 1),
('1667978740993', 21, 21, 987456321, '2022-11-09 07:25:41', '1000 san pham dc them', 1),
('1667979171859', 21, 21, 987456321, '2022-11-09 07:32:51', '1000 san pham dc them', 1),
('1667979187763', 21, 21, 987456321, '2022-11-09 07:33:07', '1000 san pham dc them', 1),
('1667979385333', 21, 21, 987456321, '2022-11-09 07:36:25', '1000 san pham dc them', 1),
('1667979412759', 21, 21, 987456321, '2022-11-09 07:36:52', '1000 san pham dc them', 1),
('1667979600282', 21, 21, 987456321, '2022-11-09 07:40:00', '1000 san pham dc them', 1),
('1667979818962', 21, 21, 987456321, '2022-11-09 07:43:39', '1000 san pham dc them', 1),
('1667979864874', 21, 21, 987456321, '2022-11-09 07:44:25', '1000 san pham dc them', 1),
('1667979891286', 21, 21, 987456321, '2022-11-09 07:44:51', '1000 san pham dc them', 1),
('1667979942816', 21, 21, 987456321, '2022-11-09 07:45:43', '1000 san pham dc them', 1),
('1667979980078', 21, 21, 987456321, '2022-11-09 07:46:20', '1000 san pham dc them', 1),
('1667980011137', 21, 21, 987456321, '2022-11-09 07:46:51', '1000 san pham dc them', 1),
('1667980299962', 21, 21, 987456321, '2022-11-09 07:51:40', '1000 san pham dc them', 1),
('1667980325155', 21, 21, 987456321, '2022-11-09 07:52:05', '1000 san pham dc them', 1),
('1667980347336', 21, 21, 987456321, '2022-11-09 07:52:27', '1000 san pham dc them', 1),
('1667980363345', 21, 21, 987456321, '2022-11-09 07:52:43', '1000 san pham dc them', 1),
('1667980703307', 21, 21, 987456321, '2022-11-09 07:58:23', '1000 san pham dc them', 1),
('1669440117914', 27, 21, 0, '2022-11-26 05:21:57', '.', 1),
('1669440719662', 27, 21, 0, '2022-11-26 05:31:59', '.', 1),
('1669440921712', 27, 21, 0, '2022-11-26 05:35:21', '.', 1),
('1669441017818', 21, 20, 0, '2022-11-26 05:36:57', '.', 1),
('1669441866094', 21, 21, 146880000, '2022-11-26 05:51:06', '.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `quyen`
--

CREATE TABLE `quyen` (
  `id` int(10) UNSIGNED NOT NULL,
  `ten_quyen` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `trangthai` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `quyen`
--

INSERT INTO `quyen` (`id`, `ten_quyen`, `trangthai`) VALUES
(1, 'admin', 0),
(2, 'Quản lý', 0),
(3, 'Nhân viên', 0),
(10, 'Chot don', 0),
(14, 'none', 0);

-- --------------------------------------------------------

--
-- Table structure for table `quyendahmuc`
--

CREATE TABLE `quyendahmuc` (
  `id` int(5) NOT NULL,
  `id_quyen` int(10) UNSIGNED NOT NULL,
  `id_danhmuc` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `quyendahmuc`
--

INSERT INTO `quyendahmuc` (`id`, `id_quyen`, `id_danhmuc`) VALUES
(1, 3, 1),
(4, 3, 5),
(6, 3, 7),
(7, 3, 8),
(8, 3, 9),
(9, 3, 10),
(16, 1, 1),
(17, 1, 2),
(18, 1, 5),
(19, 1, 7),
(20, 1, 8),
(21, 1, 9),
(22, 1, 10),
(23, 1, 11),
(37, 10, 5),
(39, 1, 12),
(40, 10, 1),
(73, 2, 1),
(74, 2, 8),
(75, 2, 9),
(78, 10, 9),
(79, 10, 7),
(80, 10, 8),
(81, 10, 9),
(84, 1, 3),
(85, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `id` int(10) UNSIGNED NOT NULL,
  `ten_sp` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `don_gia` int(11) NOT NULL,
  `hinh_anh` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `noi_dung` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `manHinh` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `cpu` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ram` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `card` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `oCung` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pin` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `id_the_loai` int(10) UNSIGNED NOT NULL,
  `id_thuong_hieu` int(11) NOT NULL,
  `id_nha_cc` int(10) UNSIGNED NOT NULL,
  `so_luong` int(11) NOT NULL,
  `sl_da_ban` int(11) NOT NULL,
  `ngay_tao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngay_sua` timestamp NOT NULL DEFAULT current_timestamp(),
  `trangthai` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`id`, `ten_sp`, `don_gia`, `hinh_anh`, `noi_dung`, `manHinh`, `cpu`, `ram`, `card`, `oCung`, `pin`, `id_the_loai`, `id_thuong_hieu`, `id_nha_cc`, `so_luong`, `sl_da_ban`, `ngay_tao`, `ngay_sua`, `trangthai`) VALUES
(59, 'edit san pham 170', 5555555, 'http://logo@gmail.com', 'sanr phẩm có nguồn gốc viet nam ', '15.6', 'intel 2022', '16 GB DDR3', 'intel GPU 8458', '512 SSD samsung', '16h Battery 5133', 9, 0, 21, 612, 2078, '2021-11-27 16:13:15', '2021-11-27 16:13:15', -2),
(60, 'MacBook Pro 16 M1 Pro 2021/16 core-GPU', 64990000, 'https://cdn.tgdd.vn/Products/Images/44/253636/apple-macbook-pro-16-m1-pro-2021-10-core-cpu-600x600.jpg', 'Hiệu năng được nâng cấp tối đa lên đến 40% so với các thế hệ tiền nhiệm nhờ bộ vi xử lý Intel Core i7 Tiger Lake 11800H sở hữu 8 nhân 16 luồng cùng xung nhịp tốc độ tối đa đến 4.6 GHz phát hu', '16.2 inch , 120Hz', 'Apple M1 Pro, 200GB/s memory bandwidth', 'RAM 16 GB', '16 core-GPU', 'SSD 512 GB', 'Khoảng 10 tiếng', 9, 0, 1, 182, 110, '2021-11-27 16:13:15', '2021-11-27 16:13:15', 0),
(61, 'MacBook Pro 14 M1 Pro 2021/16-core GPU', 64990000, 'https://cdn.tgdd.vn/Products/Images/44/253703/apple-macbook-pro-14-m1-pro-2021-10-core-cpu-1-1-600x600.jpg', 'Hiệu năng được nâng cấp tối đa lên đến 40% so với các thế hệ tiền nhiệm nhờ bộ vi xử lý Intel Core i7 Tiger Lake 11800H sở hữu 8 nhân 16 luồng cùng xung nhịp tốc độ tối đa đến 4.6 GHz phát hu', '14.2 inch, 120Hz', 'Apple M1 Pro, 200GB/s memory bandwidth', 'RAM 16 GB', '16 core-GPU', 'SSD 1 TB', 'Khoảng 10 tiếng', 9, 0, 1, 100, 0, '2021-11-27 16:13:15', '2021-11-27 16:13:15', 0),
(62, 'Dell XPS 13 9310 i7 1165G7 (JGNH62)', 59990000, 'https://cdn.tgdd.vn/Products/Images/44/250722/dell-xps-13-9310-i7-jgnh62-600x600.jpg', 'Hiệu năng được nâng cấp tối đa lên đến 40% so với các thế hệ tiền nhiệm nhờ bộ vi xử lý Intel Core i7 Tiger Lake 11800H sở hữu 8 nhân 16 luồng cùng xung nhịp tốc độ tối đa đến 4.6 GHz phát hu', '13.4\", 4K', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 512 GB', '4-cell', 9, 1, 1, 991, 1, '2021-11-27 16:13:15', '2021-11-27 16:13:15', 0),
(63, 'MacBook Pro 14 M1 Pro 2021/14 core-GPU', 52990000, 'https://cdn.tgdd.vn/Products/Images/44/253581/apple-macbook-pro-14-m1-pro-2021-600x600.jpg', 'Hiệu năng được nâng cấp tối đa lên đến 40% so với các thế hệ tiền nhiệm nhờ bộ vi xử lý Intel Core i7 Tiger Lake 11800H sở hữu 8 nhân 16 luồng cùng xung nhịp tốc độ tối đa đến 4.6 GHz phát hu', '14.2 inch', 'Apple M1 Pro, 200GB/s memory bandwidth', 'RAM 16 GB', '14 core-GPU', 'SSD 512 GB', 'Khoảng 10 tiếng', 9, 1, 1, 100, 0, '2021-11-27 16:13:15', '2021-11-27 16:13:15', 0),
(64, 'LG Gram 17 2021 i7 1165G7 (17Z90P-G.AH78A5)', 54890000, 'https://cdn.tgdd.vn/Products/Images/44/238139/lg-gram-17-i7-17z90pgah78a5-3-600x600.jpg', 'Hiệu năng được nâng cấp tối đa lên đến 40% so với các thế hệ tiền nhiệm nhờ bộ vi xử lý Intel Core i7 Tiger Lake 11800H sở hữu 8 nhân 16 luồng cùng xung nhịp tốc độ tối đa đến 4.6 GHz phát hu', '17\", 2K', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 1 TB', '2-cell, 80Wh', 9, 5, 1, 54, 145, '2021-11-27 16:13:15', '2021-11-27 16:13:15', 0),
(65, 'LG Gram 17 2021 i7 1165G7 (17Z90P-G.AH76A5)', 52890000, 'https://cdn.tgdd.vn/Products/Images/44/238135/lg-gram-17-i7-17z90pgah76a5-3-600x600.jpg', 'Hiệu năng được nâng cấp tối đa lên đến 40% so với các thế hệ tiền nhiệm nhờ bộ vi xử lý Intel Core i7 Tiger Lake 11800H sở hữu 8 nhân 16 luồng cùng xung nhịp tốc độ tối đa đến 4.6 GHz phát hu', '17\", 2K', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 512 GB', '2-cell, 80Wh', 9, 0, 1, 100, 0, '2021-11-27 16:13:15', '2021-11-27 16:13:15', 0),
(66, 'LG Gram 16 2021 i7 1165G7 (16Z90P-G.AH75A5)', 50890000, 'https://cdn.tgdd.vn/Products/Images/44/238133/lg-gram-16-i7-16z90pgah75a5-600x600.jpg', 'Hiệu năng được nâng cấp tối đa lên đến 40% so với các thế hệ tiền nhiệm nhờ bộ vi xử lý Intel Core i7 Tiger Lake 11800H sở hữu 8 nhân 16 luồng cùng xung nhịp tốc độ tối đa đến 4.6 GHz phát hu', '16\", 2K', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 512 GB', '2-cell, 80Wh', 9, 0, 1, 100, 0, '2021-11-27 16:13:15', '2021-11-27 16:13:15', 0),
(67, 'MacBook Pro M1 2020', 52990000, 'https://cdn.tgdd.vn/Products/Images/44/236131/apple-macbook-pro-m1-2020-z11c000cj-600x600.jpg', 'Hiệu năng được nâng cấp tối đa lên đến 40% so với các thế hệ tiền nhiệm nhờ bộ vi xử lý Intel Core i7 Tiger Lake 11800H sở hữu 8 nhân 16 luồng cùng xung nhịp tốc độ tối đa đến 4.6 GHz phát hu', '13.3\", Retina', 'Apple M1', 'RAM 16 GB', '8 nhân GPU', 'SSD 1 TB', 'Khoảng 10 tiếng', 9, 0, 1, 100, 0, '2021-11-27 16:13:15', '2021-11-27 16:13:15', 0),
(68, 'Lenovo Yoga 9 14ITL5 i7/1185G7 (82BG006EVN)', 49990000, 'https://cdn.tgdd.vn/Products/Images/44/239233/lenovo-yoga-9-14itl5-i7-82bg006evn-21-600x600.jpg', 'Hiệu năng được nâng cấp tối đa lên đến 40% so với các thế hệ tiền nhiệm nhờ bộ vi xử lý Intel Core i7 Tiger Lake 11800H sở hữu 8 nhân 16 luồng cùng xung nhịp tốc độ tối đa đến 4.6 GHz phát hu', '14\", 4K', 'i7, 1185G7, 3GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 1 TB', '60 Wh', 9, 0, 1, 100, 0, '2021-11-27 16:13:15', '2021-11-27 16:13:15', 0),
(69, 'LG Gram 16 2021 i7 1165G7 (16Z90P-G.AH73A5)', 48890000, 'https://cdn.tgdd.vn/Products/Images/44/238132/lg-gram-16-i7-16z90pgah73a5-600x600.jpg', 'Hiệu năng được nâng cấp tối đa lên đến 40% so với các thế hệ tiền nhiệm nhờ bộ vi xử lý Intel Core i7 Tiger Lake 11800H sở hữu 8 nhân 16 luồng cùng xung nhịp tốc độ tối đa đến 4.6 GHz phát hu', '16\", 2K', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 256 GB', '2-cell, 80Wh', 9, 0, 1, 100, 0, '2021-11-27 16:13:15', '2021-11-27 16:13:15', 0),
(70, 'LG Gram 14 2021 i7 1165G7 (14Z90P-G.AH75A5)', 47890000, 'https://cdn.tgdd.vn/Products/Images/44/238131/lg-gram-14-i7-14z90pgah75a5-0-600x600.jpg', 'Hiệu năng được nâng cấp tối đa lên đến 40% so với các thế hệ tiền nhiệm nhờ bộ vi xử lý Intel Core i7 Tiger Lake 11800H sở hữu 8 nhân 16 luồng cùng xung nhịp tốc độ tối đa đến 4.6 GHz phát hu', '14\", Full HD', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 512 GB', '4-cell, 72Wh', 9, 0, 1, 100, 0, '2021-11-27 16:13:15', '2021-11-27 16:13:15', 0),
(71, 'MSI Summit E16 Flip A11UCT i7 1195G7 (082VN)', 46990000, 'https://cdn.tgdd.vn/Products/Images/44/246950/msi-summit-e16-flip-i7-082vn-600x600.jpg', 'Hiệu năng được nâng cấp tối đa lên đến 40% so với các thế hệ tiền nhiệm nhờ bộ vi xử lý Intel Core i7 Tiger Lake 11800H sở hữu 8 nhân 16 luồng cùng xung nhịp tốc độ tối đa đến 4.6 GHz phát hu', '16\", 2K, 120Hz', 'i7, 1195G7, 2.9GHz', 'RAM 16 GB', 'RTX 3050 4GB', 'SSD 1 TB', '4-cell, 82Wh', 9, 0, 1, 100, 0, '2021-11-27 16:13:15', '2021-11-27 16:13:15', 0),
(72, 'HP EliteBook X360 830 G8 i7 1165G7 (3G1A4PA)', 41590000, 'https://cdn.tgdd.vn/Products/Images/44/242411/hp-elitebook-x360-830-g8-i7-3g1a4pa-19-600x600.jpg', 'Hiệu năng được nâng cấp tối đa lên đến 40% so với các thế hệ tiền nhiệm nhờ bộ vi xử lý Intel Core i7 Tiger Lake 11800H sở hữu 8 nhân 16 luồng cùng xung nhịp tốc độ tối đa đến 4.6 GHz phát hu', '13.3\", Full HD', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 512 GB', '3-cell, 53Wh', 9, 0, 1, 100, 0, '2021-11-27 16:13:15', '2021-11-27 16:13:15', 0),
(73, 'MacBook Pro M1 2020', 44990000, 'https://cdn.tgdd.vn/Products/Images/44/231255/macbook-pro-m1-2020-gray-600x600.jpg', 'Hiệu năng được nâng cấp tối đa lên đến 40% so với các thế hệ tiền nhiệm nhờ bộ vi xử lý Intel Core i7 Tiger Lake 11800H sở hữu 8 nhân 16 luồng cùng xung nhịp tốc độ tối đa đến 4.6 GHz phát hu', '13.3\", Retina', 'Apple M1', 'RAM 16 GB', '8 nhân GPU', 'SSD 512 GB', 'Khoảng 10 tiếng', 9, 0, 1, 100, 0, '2021-11-27 16:13:15', '2021-11-27 16:13:15', 0),
(74, 'Asus ZenBook UX371EA i7 1165G7 (HL725WS)', 41990000, 'https://cdn.tgdd.vn/Products/Images/44/262059/asus-zenbook-ux371ea-i7-1165g7-16gb-1tb-ssd-600x600.jpg', 'Hiệu năng được nâng cấp tối đa lên đến 40% so với các thế hệ tiền nhiệm nhờ bộ vi xử lý Intel Core i7 Tiger Lake 11800H sở hữu 8 nhân 16 luồng cùng xung nhịp tốc độ tối đa đến 4.6 GHz phát hu', '13.3\", 4K', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 1 TB', '4-cell, 67Wh', 9, 0, 1, 100, 0, '2021-11-27 16:13:15', '2021-11-27 16:13:15', 0),
(76, 'MSI Summit E13 Flip i7 1185G7 (211VN)', 39990000, 'https://cdn.tgdd.vn/Products/Images/44/246951/msi-summit-e13-flip-i7-211vn-19-600x600.jpg', 'Hiệu năng được nâng cấp tối đa lên đến 40% so với các thế hệ tiền nhiệm nhờ bộ vi xử lý Intel Core i7 Tiger Lake 11800H sở hữu 8 nhân 16 luồng cùng xung nhịp tốc độ tối đa đến 4.6 GHz phát hu', '13.4\", Full HD', 'i7, 1185G7, 3GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 1 TB', '4-cell, 70Wh', 9, 0, 1, 100, 0, '2021-11-27 16:13:15', '2021-11-27 16:13:15', 0),
(77, 'Asus ZenBook Duo UX482EA i7 1165G7 (KA111T)', 39990000, 'https://cdn.tgdd.vn/Products/Images/44/251417/asus-zenbook-ux482ea-i7-1165g7-16gb-1tb-600x600.jpg', 'Hiệu năng được nâng cấp tối đa lên đến 40% so với các thế hệ tiền nhiệm nhờ bộ vi xử lý Intel Core i7 Tiger Lake 11800H sở hữu 8 nhân 16 luồng cùng xung nhịp tốc độ tối đa đến 4.6 GHz phát hu', '14\", Full HD', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 1 TB', '4-cell, 70Wh', 9, 0, 1, 100, 0, '2021-11-27 16:13:15', '2021-11-27 16:13:15', 0),
(78, 'MSI Gaming Pulse GL66 11UDK i7 11800H (816VN)', 33990000, 'https://cdn.tgdd.vn/Products/Images/44/256566/msi-gaming-pulse-gl66-11udk-i7-816vn-051121-023122-600x600.jpg', 'RAM 8 GB chuẩn DDR4 2 khe (1 khe 8 GB + 1 khe rời) đáp ứng tốt công việc xử lý hình ảnh chuyên nghiệp số lượng lớn và chạy đa nhiệm mượt mà với tốc độ truyền tải 3200 MHz. Bên cạnh đó còn hỗ ', '15.6\", Full HD, 144Hz', 'i7, 11800H, 2.30 GHz', 'RAM 16 GB', 'RTX 3050Ti 4GB', 'SSD 512 GB', '3-cell, 53.5Wh', 4, 0, 21, 100, 0, '2021-11-28 03:49:34', '2021-11-28 03:49:34', 0),
(79, 'Acer Aspire 7 Gaming A715 42G R6ZR R5 5500U (NH.QAYSV.003)', 22490000, 'https://cdn.tgdd.vn/Products/Images/44/250518/acer-aspire-7-gaming-a715-42g-r6zr-r5-5500u-8gb-600x600.jpg', 'RAM 8 GB chuẩn DDR4 2 khe (1 khe 8 GB + 1 khe rời) đáp ứng tốt công việc xử lý hình ảnh chuyên nghiệp số lượng lớn và chạy đa nhiệm mượt mà với tốc độ truyền tải 3200 MHz. Bên cạnh đó còn hỗ ', '15.6\", Full HD, 144Hz', 'Ryzen 5, 5500U, 2.1GHz', 'RAM 8 GB', 'GTX 1650 4GB', 'SSD 512 GB', '48Wh', 4, 0, 30, 99, 1, '2021-11-28 03:49:34', '2021-11-28 03:49:34', 0),
(80, 'MSI Gaming Stealth 15M A11UEK i7 11375H (254VN)', 41990000, 'https://cdn.tgdd.vn/Products/Images/44/256265/msi-gaming-stealth-15m-a11uek-i7-254vn-600x600.jpg', 'RAM 8 GB chuẩn DDR4 2 khe (1 khe 8 GB + 1 khe rời) đáp ứng tốt công việc xử lý hình ảnh chuyên nghiệp số lượng lớn và chạy đa nhiệm mượt mà với tốc độ truyền tải 3200 MHz. Bên cạnh đó còn hỗ ', '15.6\", Full HD, 144Hz', 'i7, 11375H, 3.3GHz', 'RAM 16 GB', 'RTX 3060 Max-Q 6GB', 'SSD 512 GB', '3-cell, 52 Wh', 4, 0, 29, 99, 1, '2021-11-28 03:49:34', '2021-11-28 03:49:34', 0),
(81, 'Dell Gaming G15 5515 R5 5600H (P105F004CGR)', 24990000, 'https://cdn.tgdd.vn/Products/Images/44/260170/dell-gaming-g15-5515-r5-p105f004cgr-thumb-600x600.jpg', 'RAM 8 GB chuẩn DDR4 2 khe (1 khe 8 GB + 1 khe rời) đáp ứng tốt công việc xử lý hình ảnh chuyên nghiệp số lượng lớn và chạy đa nhiệm mượt mà với tốc độ truyền tải 3200 MHz. Bên cạnh đó còn hỗ ', '15.6\", Full HD, 120Hz', 'Ryzen 5, 5600H, 3.3GHz', 'RAM 8 GB', 'RTX 3050 4GB', 'SSD 256 GB', '3-cell, 56Wh', 4, 0, 37, 100, 0, '2021-11-28 03:49:34', '2021-11-28 03:49:34', 0),
(82, 'Dell Gaming G15 5515 R5 5600H (P105F004DGR)', 27990000, 'https://cdn.tgdd.vn/Products/Images/44/260171/dell-gaming-g15-5515-r5-p105f004dgr-thumb-600x600.jpg', 'RAM 8 GB chuẩn DDR4 2 khe (1 khe 8 GB + 1 khe rời) đáp ứng tốt công việc xử lý hình ảnh chuyên nghiệp số lượng lớn và chạy đa nhiệm mượt mà với tốc độ truyền tải 3200 MHz. Bên cạnh đó còn hỗ ', '15.6\", Full HD, 120Hz', 'Ryzen 5, 5600H, 3.3GHz', 'RAM 16 GB', 'RTX 3050 4GB', 'SSD 512 GB', '3-cell, 56Wh', 4, 0, 20, 100, 0, '2021-11-28 03:49:34', '2021-11-28 03:49:34', 0),
(83, 'MacBook Pro 16 M1 Max 2021/32 core-GPU', 90990000, 'https://cdn.tgdd.vn/Products/Images/44/253582/apple-macbook-pro-16-m1-max-2021-600x600.jpg', 'RAM 8 GB chuẩn DDR4 2 khe (1 khe 8 GB + 1 khe rời) đáp ứng tốt công việc xử lý hình ảnh chuyên nghiệp số lượng lớn và chạy đa nhiệm mượt mà với tốc độ truyền tải 3200 MHz. Bên cạnh đó còn hỗ ', '16.2 inch, HD,  120Hz', 'Apple M1 Max, 400GB/s memory bandwidth', 'RAM 32 GB', '32 core-GPU', 'SSD 1 TB', 'Khoảng 10 tiếng', 4, 0, 36, 100, 0, '2021-11-28 03:49:34', '2021-11-28 03:49:34', 0),
(84, 'MacBook Pro 16 inch M1 Pro 2021', 69990000, 'https://cdn.tgdd.vn/Products/Images/44/253706/apple-macbook-pro-16-m1-pro-2021-10-core-cpu-600x600.jpg', 'RAM 8 GB chuẩn DDR4 2 khe (1 khe 8 GB + 1 khe rời) đáp ứng tốt công việc xử lý hình ảnh chuyên nghiệp số lượng lớn và chạy đa nhiệm mượt mà với tốc độ truyền tải 3200 MHz. Bên cạnh đó còn hỗ ', '16.2 inch, 120Hz', 'Apple M1 Pro, 200GB/s memory bandwidth', 'RAM 16 GB', '16 core-GPU', 'SSD 1 TB', 'Khoảng 10 tiếng', 4, 0, 33, 100, 0, '2021-11-28 03:49:34', '2021-11-28 03:49:34', 0),
(85, 'MacBook Pro 16 M1 Pro 2021/16 core-GPU', 64990000, 'https://cdn.tgdd.vn/Products/Images/44/253636/apple-macbook-pro-16-m1-pro-2021-10-core-cpu-600x600.jpg', 'RAM 8 GB chuẩn DDR4 2 khe (1 khe 8 GB + 1 khe rời) đáp ứng tốt công việc xử lý hình ảnh chuyên nghiệp số lượng lớn và chạy đa nhiệm mượt mà với tốc độ truyền tải 3200 MHz. Bên cạnh đó còn hỗ ', '16.2 inch, 120Hz', 'Apple M1 Pro, 200GB/s memory bandwidth', 'RAM 16 GB', '16 core-GPU', 'SSD 512 GB', 'Khoảng 10 tiếng', 4, 0, 23, 100, 0, '2021-11-28 03:49:34', '2021-11-28 03:49:34', 0),
(86, 'MacBook Pro 14 M1 Pro 2021/16-core GPU', 64990000, 'https://cdn.tgdd.vn/Products/Images/44/253703/apple-macbook-pro-14-m1-pro-2021-10-core-cpu-1-1-600x600.jpg', 'RAM 8 GB chuẩn DDR4 2 khe (1 khe 8 GB + 1 khe rời) đáp ứng tốt công việc xử lý hình ảnh chuyên nghiệp số lượng lớn và chạy đa nhiệm mượt mà với tốc độ truyền tải 3200 MHz. Bên cạnh đó còn hỗ ', '14.2 inch, 120Hz', 'Apple M1 Pro, 200GB/s memory bandwidth', 'RAM 16 GB', '16 core-GPU', 'SSD 1 TB', 'Khoảng 10 tiếng', 4, 0, 20, 100, 0, '2021-11-28 03:49:34', '2021-11-28 03:49:34', 0),
(87, 'MacBook Pro 14 M1 Pro 2021/14 core-GPU', 52990000, 'https://cdn.tgdd.vn/Products/Images/44/253581/apple-macbook-pro-14-m1-pro-2021-600x600.jpg', 'RAM 8 GB chuẩn DDR4 2 khe (1 khe 8 GB + 1 khe rời) đáp ứng tốt công việc xử lý hình ảnh chuyên nghiệp số lượng lớn và chạy đa nhiệm mượt mà với tốc độ truyền tải 3200 MHz. Bên cạnh đó còn hỗ ', '14.2 inch', 'Apple M1 Pro, 200GB/s memory bandwidth', 'RAM 16 GB', '14 core-GPU', 'SSD 512 GB', 'Khoảng 10 tiếng', 4, 0, 34, 100, 0, '2021-11-28 03:49:34', '2021-11-28 03:49:34', 0),
(88, 'MSI Gaming Leopard GP76 11UG i7 11800H (823VN)', 52990000, 'https://cdn.tgdd.vn/Products/Images/44/261962/msi-gaming-leopard-gp76-11ug-i7-823vn-251121-041008-600x600.jpg', 'RAM 8 GB chuẩn DDR4 2 khe (1 khe 8 GB + 1 khe rời) đáp ứng tốt công việc xử lý hình ảnh chuyên nghiệp số lượng lớn và chạy đa nhiệm mượt mà với tốc độ truyền tải 3200 MHz. Bên cạnh đó còn hỗ ', '17.3\", Full HD, 300Hz', 'i7, 11800H, 2.30 GHz', 'RAM 16 GB', 'RTX 3070 8GB', 'SSD 1 TB', '4-cell, 65Wh', 4, 0, 36, 91, 9, '2021-11-28 03:49:34', '2021-11-28 03:49:34', 0),
(90, 'MSI Summit E16 Flip A11UCT i7 1195G7 (082VN)', 46990000, 'https://cdn.tgdd.vn/Products/Images/44/246950/msi-summit-e16-flip-i7-082vn-600x600.jpg', 'RAM 8 GB chuẩn DDR4 2 khe (1 khe 8 GB + 1 khe rời) đáp ứng tốt công việc xử lý hình ảnh chuyên nghiệp số lượng lớn và chạy đa nhiệm mượt mà với tốc độ truyền tải 3200 MHz. Bên cạnh đó còn hỗ ', '16\", 2K, 120Hz', 'i7, 1195G7, 2.9GHz', 'RAM 16 GB', 'RTX 3050 4GB', 'SSD 1 TB', '4-cell, 82Wh', 4, 0, 37, 100, 0, '2021-11-28 03:49:34', '2021-11-28 03:49:34', 0),
(91, 'Asus ROG Zephyrus G14 Alan Walker R9 5900HS (K2064T)', 49990000, 'https://cdn.tgdd.vn/Products/Images/44/251418/asus-rog-zephyrus-gaming-g14-ga401qec-r9-k2064t-17-600x600.jpg', 'RAM 8 GB chuẩn DDR4 2 khe (1 khe 8 GB + 1 khe rời) đáp ứng tốt công việc xử lý hình ảnh chuyên nghiệp số lượng lớn và chạy đa nhiệm mượt mà với tốc độ truyền tải 3200 MHz. Bên cạnh đó còn hỗ ', '14\", 2K, 120Hz', 'Ryzen 9, 5900HS, 3GHz', 'RAM 16 GB', 'RTX 3050Ti 4GB', 'SSD 1 TB', '4-cell, 76Wh', 4, 0, 29, 100, 0, '2021-11-28 03:49:34', '2021-11-28 03:49:34', 0),
(92, 'HP ZBook Firefly 14 G8 i7 1165G7 (275W0AV)', 41890000, 'https://cdn.tgdd.vn/Products/Images/44/259865/hp-zbook-firefly-14-g8-i7-275w0av-251121-045610-600x600.jpg', 'RAM 8 GB chuẩn DDR4 2 khe (1 khe 8 GB + 1 khe rời) đáp ứng tốt công việc xử lý hình ảnh chuyên nghiệp số lượng lớn và chạy đa nhiệm mượt mà với tốc độ truyền tải 3200 MHz. Bên cạnh đó còn hỗ ', '14\", Full HD', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'NVIDIA QuadroT500, 4GB', 'SSD 1 TB', '3-cell, 53Wh', 4, 0, 32, 100, 0, '2021-11-28 03:49:34', '2021-11-28 03:49:34', 0),
(94, 'Asus ZenBook Duo UX482EA i7 1165G7 (KA111T)', 39990000, 'https://cdn.tgdd.vn/Products/Images/44/251417/asus-zenbook-ux482ea-i7-1165g7-16gb-1tb-600x600.jpg', 'RAM 8 GB chuẩn DDR4 2 khe (1 khe 8 GB + 1 khe rời) đáp ứng tốt công việc xử lý hình ảnh chuyên nghiệp số lượng lớn và chạy đa nhiệm mượt mà với tốc độ truyền tải 3200 MHz. Bên cạnh đó còn hỗ ', '14\", Full HD', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 1 TB', '4-cell, 70Wh', 4, 0, 23, 100, 0, '2021-11-28 03:49:34', '2021-11-28 03:49:34', 0),
(95, 'Asus ZenBook Duo UX482EA i7 1165G7 (KA268T)', 39990000, 'https://cdn.tgdd.vn/Products/Images/44/256509/asus-zenbook-duo-ux482ea-i7-ka268t-031121-104926-600x600.jpg', 'RAM 8 GB chuẩn DDR4 2 khe (1 khe 8 GB + 1 khe rời) đáp ứng tốt công việc xử lý hình ảnh chuyên nghiệp số lượng lớn và chạy đa nhiệm mượt mà với tốc độ truyền tải 3200 MHz. Bên cạnh đó còn hỗ ', '14\", Full HD', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 1 TB', '4-cell, 70Wh', 4, 0, 28, 100, 0, '2021-11-28 03:49:34', '2021-11-28 03:49:34', 0),
(96, 'MacBook Pro M1 2020', 39990000, 'https://cdn.tgdd.vn/Products/Images/44/239560/macbook-pro-m1-2020-silver-600x600.jpg', 'RAM 8 GB chuẩn DDR4 2 khe (1 khe 8 GB + 1 khe rời) đáp ứng tốt công việc xử lý hình ảnh chuyên nghiệp số lượng lớn và chạy đa nhiệm mượt mà với tốc độ truyền tải 3200 MHz. Bên cạnh đó còn hỗ ', '13.3\", Retina', 'Apple M1', 'RAM 16 GB', '8 nhân GPU', 'SSD 256 GB', 'Khoảng 10 tiếng', 4, 0, 29, 100, 0, '2021-11-28 03:49:34', '2021-11-28 03:49:34', 0),
(97, 'MacBook Pro M1 2020', 39990000, 'https://cdn.tgdd.vn/Products/Images/44/231254/macbook-pro-m1-2020-gray-1-600x600.jpg', 'RAM 8 GB chuẩn DDR4 2 khe (1 khe 8 GB + 1 khe rời) đáp ứng tốt công việc xử lý hình ảnh chuyên nghiệp số lượng lớn và chạy đa nhiệm mượt mà với tốc độ truyền tải 3200 MHz. Bên cạnh đó còn hỗ ', '13.3\", Retina', 'Apple M1', 'RAM 8 GB', '8 nhân GPU', 'SSD 512 GB', 'Khoảng 10 tiếng', 4, 0, 28, 100, 0, '2021-11-28 03:49:34', '2021-11-28 03:49:34', 0),
(98, 'MSI Katana Gaming GF66 11UC i7 11800H (224VN)', 29990000, 'https://cdn.tgdd.vn/Products/Images/44/242201/msi-gf66-11uc-i7-224vn-600x600.jpg', '', '15.6\", Full HD, 144Hz', 'i7, 11800H, 2.30 GHz', 'RAM 8 GB', 'RTX 3050 4GB', 'SSD 512 GB', '3-cell, 53Wh', 1, 0, 31, 100, 0, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(99, 'MSI Gaming Pulse GL66 11UDK i7 11800H (816VN)', 33990000, 'https://cdn.tgdd.vn/Products/Images/44/256566/msi-gaming-pulse-gl66-11udk-i7-816vn-051121-023122-600x600.jpg', '', '15.6\", Full HD, 144Hz', 'i7, 11800H, 2.30 GHz', 'RAM 16 GB', 'RTX 3050Ti 4GB', 'SSD 512 GB', '3-cell, 53.5Wh', 1, 0, 35, 98, 2, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(100, 'Acer Nitro 5 Gaming AN515 57 727J i7 11800H (NH.QD9SV.005.)', 29990000, 'https://cdn.tgdd.vn/Products/Images/44/247243/acer-nitro-gaming-an515-57-727j-i7-nhqd9sv005-10-600x600.jpg', '', '15.6\", Full HD, 144Hz', 'i7, 11800H, 2.30 GHz', 'RAM 8 GB', 'RTX 3050Ti 4GB', 'SSD 512 GB', '4-cell, 57Wh', 1, 0, 27, 99, 1, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(101, 'Acer Nitro 5 Gaming AN515 57 5831 i5 11400H (NH.QDGSV.003)', 32990000, 'https://cdn.tgdd.vn/Products/Images/44/247312/acer-nitro-5-gaming-an515-57-5831-i5-nhqdgsv003-600x600.jpg', '', '15.6\", Full HD, 144Hz', 'i5, 11400H, 2.7GHz', 'RAM 8 GB', 'RTX 3060 6GB', 'SSD 512 GB', '4-cell, 57.5Wh', 1, 0, 28, 100, 0, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(102, 'Acer Aspire 7 Gaming A715 42G R6ZR R5 5500U (NH.QAYSV.003)', 22490000, 'https://cdn.tgdd.vn/Products/Images/44/250518/acer-aspire-7-gaming-a715-42g-r6zr-r5-5500u-8gb-600x600.jpg', '', '15.6\", Full HD, 144Hz', 'Ryzen 5, 5500U, 2.1GHz', 'RAM 8 GB', 'GTX 1650 4GB', 'SSD 512 GB', '48Wh', 1, 0, 20, 100, 0, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(103, 'Acer Nitro 5 Gaming AN515 57 720A i7 11800H (NH.QEQSV.004)', 30490000, 'https://cdn.tgdd.vn/Products/Images/44/260058/acer-nitro-5-gaming-an515-57-720a-i7-nhqeqsv004-171121-024959-600x600.jpg', '', '15.6\", Full HD, 144Hz', 'i7, 11800H, 2.30 GHz', 'RAM 8 GB', 'RTX 3050Ti 4GB', 'SSD 512 GB', '4-cell, 57.5Wh', 1, 0, 25, 100, 0, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(104, 'Gigabyte Gaming G5 i5 10500H (KC-5S11130SB)', 29990000, 'https://cdn.tgdd.vn/Products/Images/44/260156/gigabyte-gaming-g5-i5-10500h-16gb-512gb-6gb-171121-034937-600x600.jpg', '', '15.6\", Full HD, 144Hz', 'i5, 10500H, 2.5GHz', 'RAM 16 GB', 'RTX 3060 6GB', 'SSD 512 GB', '4-cell, 41Wh', 1, 0, 28, 100, 0, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(105, 'Acer Nitro 5 Gaming AN515 57 71VV i7 11800H (NH.QENSV.005)', 28990000, 'https://cdn.tgdd.vn/Products/Images/44/260054/acer-nitro-5-gaming-an515-57-71vv-i7-nhqensv005-171121-025028-600x600.jpg', '', '15.6\", Full HD, 144Hz', 'i7, 11800H, 2.30 GHz', 'RAM 8 GB', 'RTX 3050 4GB', 'SSD 512 GB', '4-cell, 57Wh', 1, 0, 38, 100, 0, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(106, 'MSI Katana GF76 11UC i7 11800H (441VN)', 29990000, 'https://cdn.tgdd.vn/Products/Images/44/255289/msi-katana-gf76-11uc-i7-441vn-600x600.jpg', '', '17.3\", Full HD, 144Hz', 'i7, 11800H, 2.30 GHz', 'RAM 8 GB', 'RTX 3050 4GB', 'SSD 512 GB', '3-cell, 53Wh', 1, 0, 31, 100, 0, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(107, 'MSI Gaming Stealth 15M A11UEK i7 11375H (254VN)', 41990000, 'https://cdn.tgdd.vn/Products/Images/44/256265/msi-gaming-stealth-15m-a11uek-i7-254vn-600x600.jpg', '', '15.6\", Full HD, 144Hz', 'i7, 11375H, 3.3GHz', 'RAM 16 GB', 'RTX 3060 Max-Q 6GB', 'SSD 512 GB', '3-cell, 52 Wh', 1, 0, 24, 100, 0, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(108, 'GIGABYTE Gaming G5 i5 11400H (51S1123SH)', 29990000, 'https://cdn.tgdd.vn/Products/Images/44/250443/gigabyte-gaming-g5-i5-md51s1123sh-191021-102635-600x600.jpg', '', '15.6\", Full HD, 144Hz', 'i5, 11400H, 2.7GHz', 'RAM 16 GB', 'RTX 3050Ti 4GB', 'SSD 512 GB', '4-cell, 41Wh', 1, 0, 20, 100, 0, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(109, 'Asus TUF Gaming FX506HCB i5 11400H (HN1138W)', 25990000, 'https://cdn.tgdd.vn/Products/Images/44/260045/asus-tuf-gaming-fx506hcb-i5-hn1138w-171121-030743-600x600.jpg', '', '15.6\", Full HD, 144Hz', 'i5, 11400H, 2.7GHz', 'RAM 8 GB', 'RTX 3050 4GB', 'SSD 512 GB', '3-cell, 48Wh', 1, 0, 32, 100, 0, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(110, 'Asus TUF Gaming FX516PM i7 11370H (HN002T)', 32990000, 'https://cdn.tgdd.vn/Products/Images/44/251247/asus-tuf-gaming-fx516pm-i7-hn002t-600x600.jpg', '', '15.6\", Full HD, 144Hz', 'i7, 11370H, 3.3GHz', 'RAM 8 GB', 'RTX 3060 6GB', 'SSD 512 GB', '4-cell, 76Wh', 1, 0, 36, 100, 0, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(111, 'Dell Gaming G15 5515 R5 5600H (P105F004CGR)', 24990000, 'https://cdn.tgdd.vn/Products/Images/44/260170/dell-gaming-g15-5515-r5-p105f004cgr-thumb-600x600.jpg', '', '15.6\", Full HD, 120Hz', 'Ryzen 5, 5600H, 3.3GHz', 'RAM 8 GB', 'RTX 3050 4GB', 'SSD 256 GB', '3-cell, 56Wh', 1, 0, 20, 100, 0, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(112, 'Dell Gaming G3 15 i7 10750H (P89F002BWH)', 31990000, 'https://cdn.tgdd.vn/Products/Images/44/244385/dell-g3-15-i7-p89f002bwh-16-600x600.jpg', '', '15.6\", Full HD, 120Hz', 'i7, 10750H, 2.6GHz', 'RAM 16 GB', 'GTX 1660Ti 6GB', 'SSD 512 GB', '4-cell, 68Wh', 1, 0, 34, 100, 0, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(113, 'Asus TUF Gaming FX516PE i7 11370H (HN005T)', 29990000, 'https://cdn.tgdd.vn/Products/Images/44/239463/asus-tuf-gaming-fx516pe-i7-hn005t-600x600.jpg', '', '15.6\", Full HD, 144Hz', 'i7, 11370H, 3.3GHz', 'RAM 8 GB', 'RTX 3050Ti 4GB', 'SSD 512 GB', '4-cell, 76Wh', 1, 0, 30, 101, 0, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(114, 'Dell Gaming G15 5515 R5 5600H (P105F004DGR)', 27990000, 'https://cdn.tgdd.vn/Products/Images/44/260171/dell-gaming-g15-5515-r5-p105f004dgr-thumb-600x600.jpg', '', '15.6\", Full HD, 120Hz', 'Ryzen 5, 5600H, 3.3GHz', 'RAM 16 GB', 'RTX 3050 4GB', 'SSD 512 GB', '3-cell, 56Wh', 1, 0, 22, 101, 4, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(115, 'MSI Gaming GE66 Raider 11UH i7 11800H (259VN)', 77990000, 'https://cdn.tgdd.vn/Products/Images/44/249151/msi-gaming-ge66-raider-11uh-i7-259vn-600x600.jpg', '', '15.6\", 2K, 240Hz', 'i7, 11800H, 2.30 GHz', 'RAM 32 GB', 'RTX 3080 16GB', 'SSD 2 TB', '4-cell, 99.9Wh', 1, 0, 23, 101, 1, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(116, 'Acer Predator Triton 300 PT315 53 71DJ i7 11800H (NH.QDSSV.001)', 50990000, 'https://cdn.tgdd.vn/Products/Images/44/250976/acer-predator-triton-300-pt315-53-71dj-i7-600x600.jpg', '', '15.6\", 2K, 165Hz', 'i7, 11800H, 2.30 GHz', 'RAM 16 GB', 'RTX 3070 8GB', 'SSD 512 GB', '4-cell, 59Wh', 1, 0, 24, 100, 0, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(117, 'MSI Gaming GS66 Stealth 11UG i7 11800H (219VN)', 64990000, 'https://cdn.tgdd.vn/Products/Images/44/249147/msi-gaming-gs66-stealth-11ug-i7-219vn-600x600.jpg', '', '15.6\", Full HD, 360Hz', 'i7, 11800H, 2.30 GHz', 'RAM 32 GB', 'RTX 3070 Max-Q 8GB', 'SSD 2 TB', '4-cell, 99.9Wh', 1, 0, 20, 100, 0, '2021-11-28 03:56:52', '2021-11-28 03:56:52', 0),
(118, 'MacBook Pro 16 M1 Max 2021/32 core-GPU', 90990000, 'https://cdn.tgdd.vn/Products/Images/44/253582/apple-macbook-pro-16-m1-max-2021-600x600.jpg', 'Bộ vi xử lý Apple M1 8-core cho hiệu năng mạnh mẽ, mượt mà. Màn hình Retina 13 inch hiển thị hình ảnh sắc nét chân thực. Thời lượng pin vượt trội, lướt web liên tục 15 giờ, xem video 18 giờ. ', '16.2 inch, 120Hz', 'Apple M1 Max, 400GB/s memory bandwidth', 'RAM 32 GB', '32 core-GPU', 'SSD 1 TB', 'Khoảng 10 tiếng', 2, 0, 21, 101, 1, '2021-11-28 04:09:14', '2021-11-28 04:09:14', 0),
(119, 'MacBook Pro 16 inch M1 Pro 2021', 69990000, 'https://cdn.tgdd.vn/Products/Images/44/253706/apple-macbook-pro-16-m1-pro-2021-10-core-cpu-600x600.jpg', 'Bộ vi xử lý Apple M1 8-core cho hiệu năng mạnh mẽ, mượt mà. Màn hình Retina 13 inch hiển thị hình ảnh sắc nét chân thực. Thời lượng pin vượt trội, lướt web liên tục 15 giờ, xem video 18 giờ. ', '16.2 inch, 120Hz', 'Apple M1 Pro, 200GB/s memory bandwidth', 'RAM 16 GB', '16 core-GPU', 'SSD 1 TB', 'Khoảng 10 tiếng', 2, 0, 24, 100, 0, '2021-11-28 04:09:14', '2021-11-28 04:09:14', 0),
(120, 'MacBook Pro 16 M1 Pro 2021/16 core-GPU', 64990000, 'https://cdn.tgdd.vn/Products/Images/44/253636/apple-macbook-pro-16-m1-pro-2021-10-core-cpu-600x600.jpg', 'Bộ vi xử lý Apple M1 8-core cho hiệu năng mạnh mẽ, mượt mà. Màn hình Retina 13 inch hiển thị hình ảnh sắc nét chân thực. Thời lượng pin vượt trội, lướt web liên tục 15 giờ, xem video 18 giờ. ', '16.2 inch, 120Hz', 'Apple M1 Pro, 200GB/s memory bandwidth', 'RAM 16 GB', '16 core-GPU', 'SSD 512 GB', 'Khoảng 10 tiếng', 2, 0, 37, 100, 0, '2021-11-28 04:09:14', '2021-11-28 04:09:14', 0),
(121, 'MacBook Pro 14 M1 Pro 2021/16-core GPU', 64990000, 'https://cdn.tgdd.vn/Products/Images/44/253703/apple-macbook-pro-14-m1-pro-2021-10-core-cpu-1-1-600x600.jpg', 'Bộ vi xử lý Apple M1 8-core cho hiệu năng mạnh mẽ, mượt mà. Màn hình Retina 13 inch hiển thị hình ảnh sắc nét chân thực. Thời lượng pin vượt trội, lướt web liên tục 15 giờ, xem video 18 giờ. ', '14.2 inch, 120Hz', 'Apple M1 Pro, 200GB/s memory bandwidth', 'RAM 16 GB', '16 core-GPU', 'SSD 1 TB', 'Khoảng 10 tiếng', 2, 0, 32, 100, 0, '2021-11-28 04:09:14', '2021-11-28 04:09:14', 0),
(122, 'MacBook Pro 14 M1 Pro 2021/14 core-GPU', 52990000, 'https://cdn.tgdd.vn/Products/Images/44/253581/apple-macbook-pro-14-m1-pro-2021-600x600.jpg', 'Bộ vi xử lý Apple M1 8-core cho hiệu năng mạnh mẽ, mượt mà. Màn hình Retina 13 inch hiển thị hình ảnh sắc nét chân thực. Thời lượng pin vượt trội, lướt web liên tục 15 giờ, xem video 18 giờ. ', '14.2 inch', 'Apple M1 Pro, 200GB/s memory bandwidth', 'RAM 16 GB', '14 core-GPU', 'SSD 512 GB', 'Khoảng 10 tiếng', 2, 0, 29, 100, 0, '2021-11-28 04:09:14', '2021-11-28 04:09:14', 0),
(125, 'MacBook Pro M1 2020', 39990000, 'https://cdn.tgdd.vn/Products/Images/44/239560/macbook-pro-m1-2020-silver-600x600.jpg', 'Bộ vi xử lý Apple M1 8-core cho hiệu năng mạnh mẽ, mượt mà. Màn hình Retina 13 inch hiển thị hình ảnh sắc nét chân thực. Thời lượng pin vượt trội, lướt web liên tục 15 giờ, xem video 18 giờ. ', '13.3\", Retina', 'Apple M1', 'RAM 16 GB', '8 nhân GPU', 'SSD 256 GB', 'Khoảng 10 tiếng', 2, 0, 22, 100, 0, '2021-11-28 04:09:14', '2021-11-28 04:09:14', 0),
(126, 'MacBook Pro M1 2020', 39990000, 'https://cdn.tgdd.vn/Products/Images/44/231254/macbook-pro-m1-2020-gray-1-600x600.jpg', 'Bộ vi xử lý Apple M1 8-core cho hiệu năng mạnh mẽ, mượt mà. Màn hình Retina 13 inch hiển thị hình ảnh sắc nét chân thực. Thời lượng pin vượt trội, lướt web liên tục 15 giờ, xem video 18 giờ. ', '13.3\", Retina', 'Apple M1', 'RAM 8 GB', '8 nhân GPU', 'SSD 512 GB', 'Khoảng 10 tiếng', 2, 0, 31, 100, 0, '2021-11-28 04:09:14', '2021-11-28 04:09:14', 0),
(127, 'MacBook Air M1 2020 7-core GPU', 39490000, 'https://cdn.tgdd.vn/Products/Images/44/243952/apple-macbook-air-m1-2020-z12a00050-600x600.jpg', 'Bộ vi xử lý Apple M1 8-core cho hiệu năng mạnh mẽ, mượt mà. Màn hình Retina 13 inch hiển thị hình ảnh sắc nét chân thực. Thời lượng pin vượt trội, lướt web liên tục 15 giờ, xem video 18 giờ. ', '13.3\", Retina', 'Apple M1', 'RAM 16 GB', '7 nhân GPU', 'SSD 512 GB', 'Khoảng 10 tiếng', 2, 0, 34, 100, 0, '2021-11-28 04:09:14', '2021-11-28 04:09:14', 0),
(128, 'MacBook Air M1 2020 7-core GPU', 33990000, 'https://cdn.tgdd.vn/Products/Images/44/239552/macbook-air-m1-2020-gray-600x600.jpg', 'Bộ vi xử lý Apple M1 8-core cho hiệu năng mạnh mẽ, mượt mà. Màn hình Retina 13 inch hiển thị hình ảnh sắc nét chân thực. Thời lượng pin vượt trội, lướt web liên tục 15 giờ, xem video 18 giờ. ', '13.3\", Retina', 'Apple M1', 'RAM 16 GB', '7 nhân GPU', 'SSD 256 GB', 'Khoảng 10 tiếng', 2, 0, 29, 100, 0, '2021-11-28 04:09:14', '2021-11-28 04:09:14', 0),
(140, 'LG Gram 16 2021 i7 1165G7 (16Z90P-G.AH75A5)', 50890000, 'https://cdn.tgdd.vn/Products/Images/44/238133/lg-gram-16-i7-16z90pgah75a5-600x600.jpg', 'Siêu phẩm laptop Lenovo cực mỏng nhẹ và bền bỉ với trọng lượng chưa đến 1 kg. Hiệu năng mạnh mẽ cùng màn hình QHD siêu nét và hệ thống bảo mật tân tiến là những ưu điểm khiến chiếc laptop này', '16\", 2K', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 512 GB', '2-cell, 80Wh', 5, 0, 25, 100, 0, '2021-11-28 04:29:24', '2021-11-28 04:29:24', 0),
(141, 'LG Gram 16 2021 i7 1165G7 (16Z90P-G.AH73A5)', 48890000, 'https://cdn.tgdd.vn/Products/Images/44/238132/lg-gram-16-i7-16z90pgah73a5-600x600.jpg', 'Siêu phẩm laptop Lenovo cực mỏng nhẹ và bền bỉ với trọng lượng chưa đến 1 kg. Hiệu năng mạnh mẽ cùng màn hình QHD siêu nét và hệ thống bảo mật tân tiến là những ưu điểm khiến chiếc laptop này', '16\", 2K', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 256 GB', '2-cell, 80Wh', 5, 0, 32, 98, 2, '2021-11-28 04:29:24', '2021-11-28 04:29:24', 0),
(142, 'LG Gram 14 2021 i7 1165G7 (14Z90P-G.AH75A5)', 47890000, 'https://cdn.tgdd.vn/Products/Images/44/238131/lg-gram-14-i7-14z90pgah75a5-0-600x600.jpg', 'Siêu phẩm laptop Lenovo cực mỏng nhẹ và bền bỉ với trọng lượng chưa đến 1 kg. Hiệu năng mạnh mẽ cùng màn hình QHD siêu nét và hệ thống bảo mật tân tiến là những ưu điểm khiến chiếc laptop này', '14\", Full HD', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 512 GB', '4-cell, 72Wh', 5, 0, 32, 99, 1, '2021-11-28 04:29:24', '2021-11-28 04:29:24', 0),
(143, 'Asus ZenBook UX371EA i7 1165G7 (HL725WS)', 41990000, 'https://cdn.tgdd.vn/Products/Images/44/262059/asus-zenbook-ux371ea-i7-1165g7-16gb-1tb-ssd-600x600.jpg', 'Siêu phẩm laptop Lenovo cực mỏng nhẹ và bền bỉ với trọng lượng chưa đến 1 kg. Hiệu năng mạnh mẽ cùng màn hình QHD siêu nét và hệ thống bảo mật tân tiến là những ưu điểm khiến chiếc laptop này', '13.3\", 4K', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 1 TB', '4-cell, 67Wh', 5, 0, 36, 100, 0, '2021-11-28 04:29:24', '2021-11-28 04:29:24', 0),
(144, 'Asus ZenBook UX371EA i7 1165G7 (HL494TS)', 41990000, 'https://cdn.tgdd.vn/Products/Images/44/252697/asus-zenbook-ux371ea-i7-1165g7-16gb-1tb-ssd-touch-600x600.jpg', 'Siêu phẩm laptop Lenovo cực mỏng nhẹ và bền bỉ với trọng lượng chưa đến 1 kg. Hiệu năng mạnh mẽ cùng màn hình QHD siêu nét và hệ thống bảo mật tân tiến là những ưu điểm khiến chiếc laptop này', '13.3\", 4K', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 1 TB', '4-cell, 67Wh', 5, 0, 26, 98, 2, '2021-11-28 04:29:24', '2021-11-28 04:29:24', 0),
(145, 'MacBook Air M1 2020 7-core GPU', 39490000, 'https://cdn.tgdd.vn/Products/Images/44/243952/apple-macbook-air-m1-2020-z12a00050-600x600.jpg', 'Siêu phẩm laptop Lenovo cực mỏng nhẹ và bền bỉ với trọng lượng chưa đến 1 kg. Hiệu năng mạnh mẽ cùng màn hình QHD siêu nét và hệ thống bảo mật tân tiến là những ưu điểm khiến chiếc laptop này', '13.3\", Retina', 'Apple M1', 'RAM 16 GB', '7 nhân GPU', 'SSD 512 GB', 'Khoảng 10 tiếng', 5, 0, 23, 100, 0, '2021-11-28 04:29:24', '2021-11-28 04:29:24', 0),
(146, 'HP Envy 13 ba1031TU i7 1165G7 (2K0B7PA)', 33990000, 'https://cdn.tgdd.vn/Products/Images/44/230241/hp-envy-13-ba1031tu-i7-2k0b7pa-103120-093102-600x600.jpg', 'Siêu phẩm laptop Lenovo cực mỏng nhẹ và bền bỉ với trọng lượng chưa đến 1 kg. Hiệu năng mạnh mẽ cùng màn hình QHD siêu nét và hệ thống bảo mật tân tiến là những ưu điểm khiến chiếc laptop này', '13.3\", Full HD', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 1 TB', '3-cell, 51Wh', 5, 0, 23, 100, 0, '2021-11-28 04:29:24', '2021-11-28 04:29:24', 0),
(147, 'Lenovo YOGA Slim 7 Carbon 13ITL5 i7 1165G7 (82EV0017VN)', 34990000, 'https://cdn.tgdd.vn/Products/Images/44/234364/lenovo-yoga-slim-7-carbon-13itl5-i7-82ev0017vn-600x600.jpg', 'Siêu phẩm laptop Lenovo cực mỏng nhẹ và bền bỉ với trọng lượng chưa đến 1 kg. Hiệu năng mạnh mẽ cùng màn hình QHD siêu nét và hệ thống bảo mật tân tiến là những ưu điểm khiến chiếc laptop này', '13.3\", 2K', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 1 TB', '50Wh', 5, 0, 22, 100, 0, '2021-11-28 04:29:24', '2021-11-28 04:29:24', 0),
(148, 'Asus ZenBook Flip UX363EA i7 1165G7 (HP163T)', 33990000, 'https://cdn.tgdd.vn/Products/Images/44/249286/asus-zenbook-flip-ux363ea-i7-hp163t-600x600.jpg', 'Siêu phẩm laptop Lenovo cực mỏng nhẹ và bền bỉ với trọng lượng chưa đến 1 kg. Hiệu năng mạnh mẽ cùng màn hình QHD siêu nét và hệ thống bảo mật tân tiến là những ưu điểm khiến chiếc laptop này', '13.3\", Full HD', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'Intel Iris Xe', 'SSD 512 GB', '4-cell, 67Wh', 5, 0, 24, 100, 0, '2021-11-28 04:29:24', '2021-11-28 04:29:24', 0),
(150, 'HP ZBook Firefly 14 G8 i7 1165G7 (275W0AV)', 41890000, 'https://cdn.tgdd.vn/Products/Images/44/259865/hp-zbook-firefly-14-g8-i7-275w0av-251121-045610-600x600.jpg', 'Đây là mẫu laptop học tập văn phòng thuộc phân khúc giá thấp. Máy trang bị vi xử lý thế hệ mới của Intel, cho hiệu năng đủ dùng đối với các nhu cầu cơ bản, phù hợp với học sinh và sinh viên.', '14\", Full HD', 'i7, 1165G7, 2.8GHz', 'RAM 16 GB', 'NVIDIA QuadroT500, 4GB', 'SSD 1 TB', '3-cell, 53Wh', 3, 0, 23, 98, 2, '2021-11-28 04:35:52', '2021-11-28 04:35:52', 0),
(151, 'MacBook Air M1 2020 7-core GPU', 39490000, 'https://cdn.tgdd.vn/Products/Images/44/243952/apple-macbook-air-m1-2020-z12a00050-600x600.jpg', 'Đây là mẫu laptop học tập văn phòng thuộc phân khúc giá thấp. Máy trang bị vi xử lý thế hệ mới của Intel, cho hiệu năng đủ dùng đối với các nhu cầu cơ bản, phù hợp với học sinh và sinh viên.', '13.3\", Retina', 'Apple M1', 'RAM 16 GB', '7 nhân GPU', 'SSD 512 GB', 'Khoảng 10 tiếng', 3, 0, 35, 99, 1, '2021-11-28 04:35:52', '2021-11-28 04:35:52', 0),
(152, 'MacBook Air M1 2020 7-core GPU', 33990000, 'https://cdn.tgdd.vn/Products/Images/44/239552/macbook-air-m1-2020-gray-600x600.jpg', 'Đây là mẫu laptop học tập văn phòng thuộc phân khúc giá thấp. Máy trang bị vi xử lý thế hệ mới của Intel, cho hiệu năng đủ dùng đối với các nhu cầu cơ bản, phù hợp với học sinh và sinh viên.', '13.3\", Retina', 'Apple M1', 'RAM 16 GB', '7 nhân GPU', 'SSD 256 GB', 'Khoảng 10 tiếng', 3, 0, 20, 99, 1, '2021-11-28 04:35:52', '2021-11-28 04:35:52', 0),
(153, 'Asus VivoBook Pro 15 OLED K3500PC i7 11370H (L1046T)', 31990000, 'https://cdn.tgdd.vn/Products/Images/44/255615/asus-vivobook-pro-15-oled-k3500pc-i7-l1046t-021121-035044-600x600.jpg', 'Đây là mẫu laptop học tập văn phòng thuộc phân khúc giá thấp. Máy trang bị vi xử lý thế hệ mới của Intel, cho hiệu năng đủ dùng đối với các nhu cầu cơ bản, phù hợp với học sinh và sinh viên.', '15.6\", Full HD', 'i7, 11370H, 3.3GHz', 'RAM 16 GB', 'RTX 3050 4GB', 'SSD 512 GB', '3-cell Li-ion, 63 Wh', 3, 0, 29, 100, 0, '2021-11-28 04:35:52', '2021-11-28 04:35:52', 0),
(154, 'Dell Latitude 3520 i7 1165G7 (70261780)', 30990000, 'https://cdn.tgdd.vn/Products/Images/44/252808/dell-latitude-3520-i7-1165g7-8gb-512gb-win10-600x600.jpg', 'Đây là mẫu laptop học tập văn phòng thuộc phân khúc giá thấp. Máy trang bị vi xử lý thế hệ mới của Intel, cho hiệu năng đủ dùng đối với các nhu cầu cơ bản, phù hợp với học sinh và sinh viên.', '15.6\", Full HD', 'i7, 1165G7, 2.8GHz', 'RAM 8 GB', 'Intel Iris Xe', 'SSD 512 GB', '3-cell, 41Wh', 3, 0, 31, 100, 0, '2021-11-28 04:35:52', '2021-11-28 04:35:52', 0),
(155, 'Dell Inspiron 7400 i5 1135G7 (N4I5134W)', 30490000, 'https://cdn.tgdd.vn/Products/Images/44/249743/dell-inspiron-7400-i5-1135g7-16gb-512gb-600x600.jpg', 'Đây là mẫu laptop học tập văn phòng thuộc phân khúc giá thấp. Máy trang bị vi xử lý thế hệ mới của Intel, cho hiệu năng đủ dùng đối với các nhu cầu cơ bản, phù hợp với học sinh và sinh viên.', '14\", 2K', 'i5, 1135G7, 2.4GHz', 'RAM 16 GB', 'MX350 2GB', 'SSD 512 GB', '4-cell, 52Wh', 3, 0, 28, 100, 0, '2021-11-28 04:35:52', '2021-11-28 04:35:52', 0),
(156, 'Lenovo Yoga 7 14ITL5 i7 1165G7 (82BH00CKVN)', 28990000, 'https://cdn.tgdd.vn/Products/Images/44/245495/lenovo-yoga-7-14itl5-i7-82bh00ckvn-600x600.jpg', 'Đây là mẫu laptop học tập văn phòng thuộc phân khúc giá thấp. Máy trang bị vi xử lý thế hệ mới của Intel, cho hiệu năng đủ dùng đối với các nhu cầu cơ bản, phù hợp với học sinh và sinh viên.', '14\", Full HD', 'i7, 1165G7, 2.8GHz', 'RAM 8 GB', 'Intel Iris Xe', 'SSD 512 GB', '71Wh', 3, 0, 32, 100, 0, '2021-11-28 04:35:52', '2021-11-28 04:35:52', 0),
(157, 'Asus VivoBook Pro 15 OLED K3500PC i5 11300H (L1045T)', 28590000, 'https://cdn.tgdd.vn/Products/Images/44/255614/asus-vivobook-pro-15-oled-k3500pc-i5-l1045t-021121-035148-600x600.jpg', 'Đây là mẫu laptop học tập văn phòng thuộc phân khúc giá thấp. Máy trang bị vi xử lý thế hệ mới của Intel, cho hiệu năng đủ dùng đối với các nhu cầu cơ bản, phù hợp với học sinh và sinh viên.', '15.6\", Full HD', 'i5, 11300H, 3.1GHz', 'RAM 16 GB', 'RTX 3050 4GB', 'SSD 512 GB', '3-cell Li-ion, 63 Wh', 3, 0, 35, 100, 0, '2021-11-28 04:35:52', '2021-11-28 04:35:52', 0),
(171, 'edit san pham 170', 5555555, 'http://logo@gmail.com', 'sanr phẩm có nguồn gốc viet nam ', '15.6', 'intel 2022', '16 GB DDR3', 'intel GPU 8458', '512 SSD samsung', '16h Battery 5133', 9, 0, 21, 58, 11, '2022-10-07 08:22:02', '2022-10-07 08:22:02', 1),
(172, 'iphone 18 max', 15000000, 'https://isource.com/wp-content/uploads/2013/09/apple-iphone-5c.jpg', 'Kiem tra gian hang', '13.3 inch, 4K, 165Hz', 'AMD', 'RAM 32 GB', 'GeForce RTX', 'SSD 512 GB', '122', 2, 1, 22, 12, 0, '2022-11-25 18:58:30', '2022-11-25 18:58:30', -2);

-- --------------------------------------------------------

--
-- Table structure for table `theloai`
--

CREATE TABLE `theloai` (
  `id` int(10) UNSIGNED NOT NULL,
  `ten_tl` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `ngay_tao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngay_sua` timestamp NULL DEFAULT current_timestamp(),
  `trangthai` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `theloai`
--

INSERT INTO `theloai` (`id`, `ten_tl`, `ngay_tao`, `ngay_sua`, `trangthai`) VALUES
(1, 'Gamming', '2021-04-15 10:23:25', '2021-04-15 10:23:25', 0),
(2, 'MacBook', '2021-04-15 10:24:24', '2021-04-15 10:24:24', 0),
(3, 'Học tập-văn phòng', '2021-04-15 10:24:56', '2021-04-15 10:24:56', 0),
(4, 'Đồ họa kỹ thuật', '2021-04-15 10:25:25', '2021-04-15 10:25:25', 0),
(5, 'Mỏng nhẹ', '2021-04-15 10:25:50', '2021-04-15 10:25:50', 0),
(9, 'Cao cấp-sang trọng', '2021-11-27 16:05:02', '2021-11-27 16:05:02', 0);

-- --------------------------------------------------------

--
-- Table structure for table `thuonghieu`
--

CREATE TABLE `thuonghieu` (
  `id` int(11) NOT NULL,
  `ten_th` varchar(100) NOT NULL,
  `trangthai` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `thuonghieu`
--

INSERT INTO `thuonghieu` (`id`, `ten_th`, `trangthai`) VALUES
(1, 'iphone', 0),
(2, 'coolpad', 0);

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `id` int(11) NOT NULL,
  `username` varchar(191) NOT NULL,
  `refreshToken` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `token`
--

INSERT INTO `token` (`id`, `username`, `refreshToken`) VALUES
(1, 'cuongphanACCD', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsInVzZXJuYW1lIjoiY3VvbmdwaGFuQUNDRCIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjY0NTE4MjQsImV4cCI6MTY2OTA0MzgyNH0.KqrU0Og02ipoY5OqejIzyjFmOKvMP2Tr5-k3f5DoMFw'),
(2, 'cuongphanACCD', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsInVzZXJuYW1lIjoiY3VvbmdwaGFuQUNDRCIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjY0NTE4OTgsImV4cCI6MTY2OTA0Mzg5OH0.HbnYpcjFH7PotGkxpAdL-hPHyQLg0i6Fays0FoA_fUk'),
(3, 'buiA', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksInVzZXJuYW1lIjoiYnVpQSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjY0NTIwMTQsImV4cCI6MTY2OTA0NDAxNH0.Xyu7KMzQjqZEl3fd_6bvjm2ahy-zGw7dEW9jmaOvfQ8'),
(4, 'buiA', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksInVzZXJuYW1lIjoiYnVpQSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjY0NTIwNDgsImV4cCI6MTY2OTA0NDA0OH0.Fnv-8o3AaZsO5TXtcttNxUHx7j3Z46PNCJznm369S8w'),
(5, 'buiA', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksInVzZXJuYW1lIjoiYnVpQSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjY0NTIwOTUsImV4cCI6MTY2OTA0NDA5NX0.rdIq4INhjvD5PmmaRaA5TiQVm5yw7U4Ty43mu7APSbQ'),
(6, 'bau', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoiYmF1IiwidXNlcl9wZXJtaXNzaW9uIjp0cnVlLCJ1c2VyX3R5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY2NjYwMDQ1NCwiZXhwIjoxNjY5MTkyNDU0fQ.NFcOyIpzbXKrGw_TzSCu1wHULP-rXg31QqhtIFTbv6Y'),
(7, 'FLY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6bnVsbCwidXNlcm5hbWUiOiJGTFkiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY2NzgxMTg0LCJleHAiOjE2NjkzNzMxODR9.bjaC74jnU4bCU89x_x1YnfTzcacTEPy8DSbWG9_GJjA'),
(8, 'Tam', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsInVzZXJuYW1lIjoiVGFtIiwidXNlcl9wZXJtaXNzaW9uIjp0cnVlLCJ1c2VyX3R5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY2NzEzNDEyMSwiZXhwIjoxNjY5NzI2MTIxfQ._ct2ysVLPL1S8LKkKZGATXzCyvlMFrzai6qeUDfDXVs'),
(9, 'user11212', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6bnVsbCwidXNlcm5hbWUiOiJ1c2VyMTEyMTIiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY3NjIxODMyLCJleHAiOjE2NzAyMTM4MzJ9.TLBgdpXPA4ocC0McllLmaNAPmNqYErwqPYNUouT9Rio'),
(10, 'user1s', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6bnVsbCwidXNlcm5hbWUiOiJ1c2VyMXMiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY3NjIyMjc3LCJleHAiOjE2NzAyMTQyNzd9.7X4auYaM-doAsNx1u4x_joH8gec4qK-JDV1aCzBxWDE'),
(11, 'user1ss', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsInVzZXJuYW1lIjoidXNlcjFzcyIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2Njc2MjI1MzUsImV4cCI6MTY3MDIxNDUzNX0.5mqRYTngpGsXn0l3ktawRtTQx68p7HCXIXqXQwZ_wJM'),
(12, 'cung', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcsInVzZXJuYW1lIjoiY3VuZyIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2Njc2MjI2MDgsImV4cCI6MTY3MDIxNDYwOH0.gHdhLud_BDT6cywxrBeM9RDp4kZNSap2RWk6Pi4TvBo'),
(13, 'cung', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcsInVzZXJuYW1lIjoiY3VuZyIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2Njc2Njg3MjIsImV4cCI6MTY3MDI2MDcyMn0.Iyi3Y6g1yGX7X3KWaYQJ9Y4qlKcwOT7oINHHVShPApU'),
(14, 'user123', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyMTIzIiwidXNlcl9wZXJtaXNzaW9uIjp0cnVlLCJ1c2VyX3R5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY2ODUxMDU1MiwiZXhwIjoxNjcxMTAyNTUyfQ.7ovrCa6-kRyU6X2ctLF6y7wjwo1QEO_NTGITVkGZHlU'),
(15, 'user123', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyMTIzIiwidXNlcl9wZXJtaXNzaW9uIjp0cnVlLCJ1c2VyX3R5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY2ODU0NjA4OCwiZXhwIjoxNjcxMTM4MDg4fQ.QnaH-AOivwKwzM_gABKyfMntueJjdk_GsuYUjKE1fwY'),
(16, 'user123', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyMTIzIiwidXNlcl9wZXJtaXNzaW9uIjp0cnVlLCJ1c2VyX3R5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY2ODU4NjA4NiwiZXhwIjoxNjcxMTc4MDg2fQ.HLidyJqyd-groL15pNYJQj6Zuh3L1SDrw5JTFSddl-I'),
(17, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM2NTU4LCJleHAiOjE2NzE2Mjg1NTh9.14RaM2yVZvQn17gJWdtfsg47OLIxh3Din1Bk96yC76E'),
(18, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM2NjM2LCJleHAiOjE2NzE2Mjg2MzZ9.VOUPAkGkvGuy_dK4ik1IHqgNAzXLTJOaCN1RUiGDdO4'),
(19, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM2NzY5LCJleHAiOjE2NzE2Mjg3Njl9.vFdzN6gSDrv78Dy8Vsx7lGd7N0BFIz8RRtCZeNT2n7I'),
(20, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM2Nzc1LCJleHAiOjE2NzE2Mjg3NzV9.i1nEciYnhUr-1A-Uv7V7ENXcf-wDQONywQODulPQ8z8'),
(21, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM2ODA3LCJleHAiOjE2NzE2Mjg4MDd9.6U9dl6pfxUD60d8gZFQ7AQvX6LukQxVDCASQs6uYjrc'),
(22, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM3ODg2LCJleHAiOjE2NzE2Mjk4ODZ9.5_CJD_YqEQ3taPCI6nWQjoOwXZTRWD2w5sp3bSl92dI'),
(23, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM3OTE1LCJleHAiOjE2NzE2Mjk5MTV9.5sfUyOIfhLWlZ7yCs9B5zpXk-9VqQTpL4PEwyFGXdyg'),
(24, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM3OTMwLCJleHAiOjE2NzE2Mjk5MzB9.9QUPrawin7adNHBslNHWSqO71XWvYvsK4y_2gsiRdag'),
(25, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4MDk0LCJleHAiOjE2NzE2MzAwOTR9.da-efQ1btnTtK6PgPHhbYkN2G84xaIWwT_U3Iau78W4'),
(26, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4MjMyLCJleHAiOjE2NzE2MzAyMzJ9.5DHIMhGlM6ItqrGTBIJ06igTEzmorKvBed9cbptyIpM'),
(27, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4MjQzLCJleHAiOjE2NzE2MzAyNDN9.whZeIMDhw2T6e-sySOUOpVhToUlxu-MGRMPRdvu4hGU'),
(28, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4MjQ2LCJleHAiOjE2NzE2MzAyNDZ9.CssiyrNszjys1Vift_uZgpbjiZCRQcgwbVK09hojBpk'),
(29, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4Mjg3LCJleHAiOjE2NzE2MzAyODd9.Cd4m2OcYCtgW-eDDcmSsJjgnhX8Eq-K1F6Tbe35tgCY'),
(30, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4MzIzLCJleHAiOjE2NzE2MzAzMjN9.3gj8oGvgZe-OqX79sbEFGcCd9dg4ZvpYV_J3E3Bs0Oc'),
(31, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4MzM3LCJleHAiOjE2NzE2MzAzMzd9.tIzyrHRNtgIK2mVEA4P_9V30NN4qHRHGrXI356kD9bw'),
(32, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4MzU5LCJleHAiOjE2NzE2MzAzNTl9.qQS1hLk5CwMRrAOMPec947_8sIxpiMKmL-MiyAac6jo'),
(33, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NDI0LCJleHAiOjE2NzE2MzA0MjR9.rbWN6DXhvyGh1TFG_p2BpFZXUEzqAPsZvow9hr3PWzE'),
(34, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NDg4LCJleHAiOjE2NzE2MzA0ODh9.0ck7d1Q5BX6a5l2t3s2VHJNHIeo-spoBvfGStlGciR0'),
(35, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NDkwLCJleHAiOjE2NzE2MzA0OTB9.pwnm5YY_vKzNIFQc5JCPN5bsxSyOFrpugLsYEU4L2Tc'),
(36, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NDk1LCJleHAiOjE2NzE2MzA0OTV9.ZeVpwlWbGLqm3-FXaIMq7ZtbUUESiIFKk85Ges98UZg'),
(37, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NTI5LCJleHAiOjE2NzE2MzA1Mjl9.rNV3r6Wd1oOEjsSTcbhPgiksql4Vf-1qnGqjSYn_DnQ'),
(38, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NTMyLCJleHAiOjE2NzE2MzA1MzJ9.-T96PYUep2As49H9nhIKXEuwxMp989Chod0J7GehKJM'),
(39, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NTQ5LCJleHAiOjE2NzE2MzA1NDl9.23sZ6csoWJGRFVY9uD9C16RyilQCDlh3PQZmZ8j6TQ4'),
(40, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NTgxLCJleHAiOjE2NzE2MzA1ODF9.rW2R8WbnXtNxUCK7oCDDgFN8g9ZGoYA7LPG7-UDE2_k'),
(41, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NTg5LCJleHAiOjE2NzE2MzA1ODl9.C6AvzqNUDjE24Gf7mEpbvGQzgcZ1dymhyXDp3RT8XjA'),
(42, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NTkwLCJleHAiOjE2NzE2MzA1OTB9.wB0FKrnBleW7OauxRF_YFKfAwqG5n09OcsgA-HjKBFk'),
(43, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NTkxLCJleHAiOjE2NzE2MzA1OTF9.zA3ojmO0e7KfLGdKhuOIM1bvkv-6zNGEwSaAifwV-_E'),
(44, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NTkyLCJleHAiOjE2NzE2MzA1OTJ9.314OViitL_H7YaJOkgxgGUsFMB9wqTddPzsjn1esLG4'),
(45, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NTkzLCJleHAiOjE2NzE2MzA1OTN9.Nda435tPlt9v-5Co6eAy4mTovKPzgFz8pXECZV_TV20'),
(46, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NTk0LCJleHAiOjE2NzE2MzA1OTR9.M-hMdFsc40cSH1QC524_VkY0eMCVsyoRzA3a7T5LIwc'),
(47, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NTk5LCJleHAiOjE2NzE2MzA1OTl9.VlqZSKtSaq-PWzySM0UZQ8Io4Ihg9juGXRZ1FclvlsA'),
(48, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NjEzLCJleHAiOjE2NzE2MzA2MTN9.6wTVXO9Rf4Wo68G0pc8KIt7PdbodH1MbIHxuUl690Lc'),
(49, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NjE1LCJleHAiOjE2NzE2MzA2MTV9.to0D6tP9BNDckuG12K_QrP5n0YxaLwGmwGVRurEpt3E'),
(50, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4Njc1LCJleHAiOjE2NzE2MzA2NzV9.WaC9Hwfbgtq7gmsed7Wgc3vGQFnwMvRe-CsdLZb6eJk'),
(51, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4Njc3LCJleHAiOjE2NzE2MzA2Nzd9.3taFHKnrBUnwxnbdvy5le3jnLmuc8lmkNE0lILfUMHI'),
(52, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NzMxLCJleHAiOjE2NzE2MzA3MzF9.YbUaWZ-UU-s89TbOMLmMVnPz3kuW4ibM2j3SpB2ObYQ'),
(53, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4NzMzLCJleHAiOjE2NzE2MzA3MzN9.jeE3Uczmm9HzWO9AhHj-M-PjskYJCSnUhelVH9JU3X0'),
(54, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1NzUwLCJleHAiOjE2NzE2Mjc3NTB9.24WVIsN1qhnEEXh_c56XnaW8m5Hy91y9ccdoCG_-slw'),
(55, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1NzU1LCJleHAiOjE2NzE2Mjc3NTV9.S963QDSyiQPa4HyAfh14s8H5R7bRbgpqPhEmWngjhkI'),
(56, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1NzY2LCJleHAiOjE2NzE2Mjc3NjZ9.lwKrnc6qNkbNAOI5SwoVXArR732AeFEciJK2VOPfbVc'),
(57, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1NzY5LCJleHAiOjE2NzE2Mjc3Njl9.rcb34KG2AQjfYW2wrnxzwZ7EgcldvMC_2ONU-BvLhiE'),
(58, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1NzczLCJleHAiOjE2NzE2Mjc3NzN9.iNMJeWptOPRA1mhnIe-ZuoNEuJ9AGgz0WxA8u2A8Pus'),
(59, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1Nzg3LCJleHAiOjE2NzE2Mjc3ODd9.QgANIkUKqdNDdQWRIeiBXka4YLFHYQs-RYJ6UH9P6mU'),
(60, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1NzkxLCJleHAiOjE2NzE2Mjc3OTF9.iPkArnQEH6pi2tcOsVj3E6iR2Ao0Sa1lMH3Y3ut0urA'),
(61, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1NzkzLCJleHAiOjE2NzE2Mjc3OTN9.Q9v2CR8PVDUljbfB65TpdZLlat_HQrQBUE9XYFe6ikA'),
(62, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1Nzk0LCJleHAiOjE2NzE2Mjc3OTR9.Da945Z3BdUJJ4bAmPEuFlEncSbcA7tQ_E_C-H0U-L1o'),
(63, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1Nzk2LCJleHAiOjE2NzE2Mjc3OTZ9._wHXo_9zauBkpXB7GRGEWlPlUh0fUvZZB-adVBEIDbI'),
(64, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1Nzk3LCJleHAiOjE2NzE2Mjc3OTd9.E-j7DRerjVfJXfLEOcW5TZh6q3pP3r80qe_XSio8tJI'),
(65, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1ODA3LCJleHAiOjE2NzE2Mjc4MDd9.YogzMVZFHiaZZeGcm4wl1qsqlzNQYAG_5DDFkDv1Vyk'),
(66, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1ODEzLCJleHAiOjE2NzE2Mjc4MTN9.OAn4YG1niBavNqGyxzfflCpnytBXDPgdXX4kH1_jQRY'),
(67, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1ODI2LCJleHAiOjE2NzE2Mjc4MjZ9.GTGVOzkevMvZ3z7I0rULEVaOzftKoqwhCGDcXxcozQc'),
(68, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1ODQwLCJleHAiOjE2NzE2Mjc4NDB9.AgQviNEj6FXQhNba0WJNBtM33Jv8TxyDuk3mnIurHVU'),
(69, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1ODQzLCJleHAiOjE2NzE2Mjc4NDN9.hAV7Wbdhm7IJtTTMPaS_wD3Mwaegr87bft2mQQN5OOE'),
(70, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1ODQ1LCJleHAiOjE2NzE2Mjc4NDV9.X3-dkb0PYTyXL-Ue9otFPYGXFOb8iMbZ1qrkQwKVybs'),
(71, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1ODQ2LCJleHAiOjE2NzE2Mjc4NDZ9.Sx9cZFC2KETzvcYqjuSYjvE6f2w0K1O5Qkz5SBUyHkM'),
(72, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM1ODQ3LCJleHAiOjE2NzE2Mjc4NDd9.Wk7jwB82gv6frnzBJSnnWdJzlWntJybuBAWRl7cXDMg'),
(73, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM2MDQzLCJleHAiOjE2NzE2MjgwNDN9.rmfTIlgcVWJYDRgs1x9I-hPkx08EY5mY6Bo-wHI25ko'),
(74, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM2MDYxLCJleHAiOjE2NzE2MjgwNjF9.YgV1bO7HSxa_BlR8tE4hoFaK9Yyqe2-5xSkVip_pGZE'),
(75, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM2MDY0LCJleHAiOjE2NzE2MjgwNjR9.KTXimF591Pk5zczksgCEtUftJsVkGqfM1-lcvaPU7qA'),
(76, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM2MDczLCJleHAiOjE2NzE2MjgwNzN9.m9eIkFMoLhXew3vOQYA2fcdVJ4cGYBLLbZpSQGfZkbY'),
(77, 'abcdef', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhYmNkZWYiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM2MDc5LCJleHAiOjE2NzE2MjgwNzl9.h8iYHzNIt1MN_E7ZFrUazh1f4lqmmaA2oHxXRmK7qh0'),
(78, 'nguyen123', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJuZ3V5ZW4xMjMiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4MTkxLCJleHAiOjE2NzE2MzAxOTF9.cBG5d-NM1JPClOlmvKdRJqGSHu5VCQMD9VL3wjTUEXI'),
(79, 'nguyen123', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJuZ3V5ZW4xMjMiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4MjA0LCJleHAiOjE2NzE2MzAyMDR9.ZfWjUwyFgwcKZ4yzeq_UmFgAzV-tieObtJqSN79jL9U'),
(80, 'nguyen123', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJuZ3V5ZW4xMjMiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4MjI2LCJleHAiOjE2NzE2MzAyMjZ9.S2AuJGygRTD65o5xESxR9eDog8SznnmjpGbFo2E4F2A'),
(81, 'nguyen123', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJuZ3V5ZW4xMjMiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4MzA3LCJleHAiOjE2NzE2MzAzMDd9.Q2jlIVIKZDIC_zuxhX6GGiQ4GCrwWkEHTeJLf2Op8lw'),
(82, 'nguyen123', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJuZ3V5ZW4xMjMiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4MzE2LCJleHAiOjE2NzE2MzAzMTZ9.uVjruAVgVmxOV-dEAmjQNQGOPuR-OOuWU1mQT5w0fjU'),
(83, 'nguyen123', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJuZ3V5ZW4xMjMiLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5MDM4MzE5LCJleHAiOjE2NzE2MzAzMTl9.lfrGqIHdYBjjBWs07HmQ2FM6RihkurYe_B6uJBP9GAE'),
(84, 'phanhuucuong05012001@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExNDM3NTE0MDU5MjQ5ODQ5MTE1MyIsInVzZXJuYW1lIjoicGhhbmh1dWN1b25nMDUwMTIwMDFAZ21haWwuY29tIiwidXNlcl9wZXJtaXNzaW9uIjp0cnVlLCJ1c2VyX3R5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY2OTI2MDU3MiwiZXhwIjoxNjcxODUyNTcyfQ.X-a0VMirycX8i49GK6dNNX1Xdks9FG0_hnIW5LVxDrI'),
(85, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyNjA2ODAsImV4cCI6MTY3MTg1MjY4MH0.EsnfFaq6uuWB06nzRAVETTAFY7xTqz4YCQlj_6LALqY'),
(86, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyNjA2ODcsImV4cCI6MTY3MTg1MjY4N30.Obs-2O_aAYzRTP38UHAwqp4nKPNEfvVvvxbzPG9QtHw'),
(87, 'phanhuucuong05012001@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExNDM3NTE0MDU5MjQ5ODQ5MTE1MyIsInVzZXJuYW1lIjoicGhhbmh1dWN1b25nMDUwMTIwMDFAZ21haWwuY29tIiwidXNlcl9wZXJtaXNzaW9uIjp0cnVlLCJ1c2VyX3R5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY2OTI2MDc3OCwiZXhwIjoxNjcxODUyNzc4fQ.BgpTrafoGpxhfjLeLEww3fPtLZiodpmrVuhq6AtfiMU'),
(88, 'phanhuucuong05012001@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExNDM3NTE0MDU5MjQ5ODQ5MTE1MyIsInVzZXJuYW1lIjoicGhhbmh1dWN1b25nMDUwMTIwMDFAZ21haWwuY29tIiwidXNlcl9wZXJtaXNzaW9uIjp0cnVlLCJ1c2VyX3R5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY2OTI2MDc4MywiZXhwIjoxNjcxODUyNzgzfQ.tccvHk3FJJU3-18tfV6-0TxFj1LfpKHUmTgLCqlsvOo'),
(89, 'phanhuucuong05012001@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExNDM3NTE0MDU5MjQ5ODQ5MTE1MyIsInVzZXJuYW1lIjoicGhhbmh1dWN1b25nMDUwMTIwMDFAZ21haWwuY29tIiwidXNlcl9wZXJtaXNzaW9uIjp0cnVlLCJ1c2VyX3R5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY2OTI2MzIzNCwiZXhwIjoxNjcxODU1MjM0fQ.4OxBERlRwE3vuCsqpWSiTmmD44AhugK8Z9jxoK1ZeS4'),
(90, 'phanhuucuong05012001@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExNDM3NTE0MDU5MjQ5ODQ5MTE1MyIsInVzZXJuYW1lIjoicGhhbmh1dWN1b25nMDUwMTIwMDFAZ21haWwuY29tIiwidXNlcl9wZXJtaXNzaW9uIjp0cnVlLCJ1c2VyX3R5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY2OTI2MzI0MCwiZXhwIjoxNjcxODU1MjQwfQ.dCK58MPB-zGEJ8Q-eM4_heNY9yefqhdQnXkDWNWBIAk'),
(91, 'phanhuucuong05012001@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExNDM3NTE0MDU5MjQ5ODQ5MTE1MyIsInVzZXJuYW1lIjoicGhhbmh1dWN1b25nMDUwMTIwMDFAZ21haWwuY29tIiwidXNlcl9wZXJtaXNzaW9uIjp0cnVlLCJ1c2VyX3R5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY2OTI2NDE1NSwiZXhwIjoxNjcxODU2MTU1fQ.OHZsSGMKJ54nWN-Djp0otI1NjQsiM9z_2cUftjFPM3Y'),
(92, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyNzcwODMsImV4cCI6MTY3MTg2OTA4M30.JIGUFymr0g3zNnpYxA1GQtkrb9OEYNZfROKQbOIwQI4'),
(93, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyNzcxMjAsImV4cCI6MTY3MTg2OTEyMH0.5txbringKHYLHOKkqauf8glOpbP-YLIwo7UMRW8d3D8'),
(94, 'phanhuucuong05012001@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExNDM3NTE0MDU5MjQ5ODQ5MTE1MyIsInVzZXJuYW1lIjoicGhhbmh1dWN1b25nMDUwMTIwMDFAZ21haWwuY29tIiwidXNlcl9wZXJtaXNzaW9uIjp0cnVlLCJ1c2VyX3R5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY2OTI3NzM3OCwiZXhwIjoxNjcxODY5Mzc4fQ.sKR-0zEbadehby47mx1TUDNGGWyD4duuQvJw5KZwCBQ'),
(95, 'phanhuucuong05012001@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExNDM3NTE0MDU5MjQ5ODQ5MTE1MyIsInVzZXJuYW1lIjoicGhhbmh1dWN1b25nMDUwMTIwMDFAZ21haWwuY29tIiwidXNlcl9wZXJtaXNzaW9uIjp0cnVlLCJ1c2VyX3R5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY2OTI3NzYzNSwiZXhwIjoxNjcxODY5NjM1fQ.3fD_I-LZVH00-Vg8X1aeuuDlRQXuQq7BlwAvKtqIzm8'),
(96, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyNzc4NjcsImV4cCI6MTY3MTg2OTg2N30.kaVsApA5Nmwb8FO98RQ2E-XM9_7v3M4WDd5hegbNYeI'),
(97, 'hoangkimhung1200@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExNjgzNzExMzUxNzAzODU2NzkyNSIsInVzZXJuYW1lIjoiaG9hbmdraW1odW5nMTIwMEBnbWFpbC5jb20iLCJ1c2VyX3Blcm1pc3Npb24iOnRydWUsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5Mjc4NzA1LCJleHAiOjE2NzE4NzA3MDV9.-7bg8b9q7DOIH2wXvo8JCAzUB8rIHRcO8WPWqPLuWtE'),
(98, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyNzg3MzYsImV4cCI6MTY3MTg3MDczNn0.UOVllcDpmCBHxIMQ-fiXGFVlEt4nKDXKIgUWxAgVTOo'),
(99, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyNzg3OTMsImV4cCI6MTY3MTg3MDc5M30.wvy3S_Sknx9zLg1kGp7F2IEnvXP9iCeVgK4GONoqLDE'),
(100, 'phanhuucuong05012001@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExNDM3NTE0MDU5MjQ5ODQ5MTE1MyIsInVzZXJuYW1lIjoicGhhbmh1dWN1b25nMDUwMTIwMDFAZ21haWwuY29tIiwidXNlcl9wZXJtaXNzaW9uIjp0cnVlLCJ1c2VyX3R5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY2OTI3ODgyMSwiZXhwIjoxNjcxODcwODIxfQ.8dZV7pfIQhGlo-xyi-i544lCNpjFEY3SBN9uC8pL7TE'),
(101, 'phanhuucuong05012001@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExNDM3NTE0MDU5MjQ5ODQ5MTE1MyIsInVzZXJuYW1lIjoicGhhbmh1dWN1b25nMDUwMTIwMDFAZ21haWwuY29tIiwidXNlcl9wZXJtaXNzaW9uIjp0cnVlLCJ1c2VyX3R5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY2OTI3ODg0MSwiZXhwIjoxNjcxODcwODQxfQ.7ghFBhnlncfNMs6xJsybgZ7SUqfbYy04icaavV3yMqE'),
(102, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyNzg5MjUsImV4cCI6MTY3MTg3MDkyNX0.o_r4A0CNYjCqByA2VuNorB_-wGJdzKXym3p--CeraHE'),
(103, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyNzkwMDksImV4cCI6MTY3MTg3MTAwOX0.9MNf0XYcbGNnZ7RHucWxQe06VwbhZTM2Os4LaB4vlXo'),
(104, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyNzkwOTIsImV4cCI6MTY3MTg3MTA5Mn0.ADHNJIyC2-DTpDDTAzag8iX4THqVT3IkJ6bmEHhjh1I'),
(105, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyNzkyMDksImV4cCI6MTY3MTg3MTIwOX0.BDlqPSC79Xj0pAUWCLNA8Q-wL29g7w9dtmxDKvh1PYU'),
(106, 'phanhuucuong05012001@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExNDM3NTE0MDU5MjQ5ODQ5MTE1MyIsInVzZXJuYW1lIjoicGhhbmh1dWN1b25nMDUwMTIwMDFAZ21haWwuY29tIiwidXNlcl9wZXJtaXNzaW9uIjp0cnVlLCJ1c2VyX3R5cGUiOiJDVVNUT01FUiIsImlhdCI6MTY2OTI3OTI3OSwiZXhwIjoxNjcxODcxMjc5fQ.yoRDwwJZqJ24AJZHU889KK6R32qNoWz0PKLkAgIgiWM'),
(107, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyNzk3MzEsImV4cCI6MTY3MTg3MTczMX0.2S4HMhua7J5_kM1SKQfudfibm67qXk9T-Z60yNsO9kw'),
(108, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODAwMTYsImV4cCI6MTY3MTg3MjAxNn0.lL0BlCrFp-Tzprjgkt2CGQyqogDqtfP6ePwwd8995X0'),
(109, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODAwMzAsImV4cCI6MTY3MTg3MjAzMH0.dj3DTL32uU00YjD6mDAyEf4o3ZYl5aiT_2c04nN3nek'),
(110, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODAxMjAsImV4cCI6MTY3MTg3MjEyMH0.6mzY9mhdqTi5ODWKa3OuDR6Lxxlmrb10mps5L5brK2U'),
(111, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODA5NDQsImV4cCI6MTY3MTg3Mjk0NH0.HgbYnojppFdahlt6EpP1MI2F30mYRYqE7x2G0DnbyH0'),
(112, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODEwODgsImV4cCI6MTY3MTg3MzA4OH0.-vzgsXCdWw9-ebdK8s86ccvkii_TVLS7lFNFCbKZtCA'),
(113, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODI1NjIsImV4cCI6MTY3MTg3NDU2Mn0.4vvu07d-cd2T-WY1Mtol5P_IAV7vOpcyPkhsGvhyhyo'),
(114, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODI3MTgsImV4cCI6MTY3MTg3NDcxOH0.tQ_3JhuzzAAvZBEEuyXtQ3IKhjOhTbYq6L0M87nDPqw'),
(115, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODI3MjMsImV4cCI6MTY3MTg3NDcyM30.2wWkZbL0iqeUTvYnJDFIzbWjQPb-8VDwZWfA8T3eZVs'),
(116, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODI3NDEsImV4cCI6MTY3MTg3NDc0MX0.MgrhpbnUVUYr8ilFMw-92gLV85Iwi4f5mvqJmWF7H9Y'),
(117, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODI3OTgsImV4cCI6MTY3MTg3NDc5OH0.e8HZxMJ4hPRkqacT_LiWVJv588fa9KH8NdiYq8FwnoU'),
(118, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODI5OTMsImV4cCI6MTY3MTg3NDk5M30.brXEoN62PCoenLxIKNYn7ZYKYCwe9zVjXCu5hbenIDM'),
(119, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODMwMDIsImV4cCI6MTY3MTg3NTAwMn0.AZSmUCa7xjphKVWBucdyQY9LfeNMOB4NPLmWYdPJ6GE'),
(120, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODMwMjcsImV4cCI6MTY3MTg3NTAyN30.kHIBUGMKIFDmGdge4xKk3W7nCR6Pd4lGhRWBeSwzRn8'),
(121, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODMwMzQsImV4cCI6MTY3MTg3NTAzNH0.iCHuREZMn85L-NopJpcE8WL_bz2CWjOoIcQwHrWjK4Q'),
(122, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODMwOTMsImV4cCI6MTY3MTg3NTA5M30.__Bo6OqUmPCKhJ9RYv3htzsoAlZxt7vx3hL4RMaysDE'),
(123, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODMxNDksImV4cCI6MTY3MTg3NTE0OX0.OVDvTzby4wwO56sIFYs3hstlx4_f2LuVZuENWBK6tTY'),
(124, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODMxODksImV4cCI6MTY3MTg3NTE4OX0.ZHw3cXW1L4EoysCKngQe_AGyeY5ZWrJwaHUyctMh60Y'),
(125, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODMzMDAsImV4cCI6MTY3MTg3NTMwMH0.2dEdZFkxBGkfy_w0_FR-sGPvORsh6i98AVokaW8wWgQ'),
(126, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODM0NzEsImV4cCI6MTY3MTg3NTQ3MX0.PioKtG8PnQqEArSbflsxWxmhjHsjyOCE4PqzOrXlmW8'),
(127, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODM1OTMsImV4cCI6MTY3MTg3NTU5M30.yQRwWfqk8UrH17CJty8aqvfGRvHOpGKYl4gN9r5rLpo'),
(128, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODM5ODIsImV4cCI6MTY3MTg3NTk4Mn0.ogt-SI6wteYadX_zNnxkinsPyAdUZL4IBBwzmkj7Fmo'),
(129, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODQwMjYsImV4cCI6MTY3MTg3NjAyNn0.fhCJU9sQTdE77oVH0YCcwgErPSp3S9hKbetWVRF6JJ0'),
(130, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODQyNzksImV4cCI6MTY3MTg3NjI3OX0.WCtas0U-mYnB4OC-m-iCqZ36bOvyno06DMBVCHPhs7Y'),
(131, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODQyOTUsImV4cCI6MTY3MTg3NjI5NX0.EhFZdKwXBrV0LVLxeYXUHj5T5X00F8qr60cxWzxmJ0E'),
(132, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODQzNzksImV4cCI6MTY3MTg3NjM3OX0.6X1avZgoseDsRlpgZerjwflJVF-F0wyEgLLHXMMlt6k'),
(133, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODQ0NDgsImV4cCI6MTY3MTg3NjQ0OH0.UI3JwNCF31ZcTqJkIEMr05t29OBvPo_tJ_dqckfsScI'),
(134, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NjkyODQ0NzIsImV4cCI6MTY3MTg3NjQ3Mn0.RgN0dUeK7qtpxMIwOPCSpcN1cylk39XFN08EsaCRTds'),
(135, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6ZmFsc2UsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5NDUwNDgxLCJleHAiOjE2NzIwNDI0ODF9.laPfDHR09hKrvG1rlgcYH_YKF9Lu1Zi7BIEFL7xy2po'),
(136, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6ZmFsc2UsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5NDgzODg1LCJleHAiOjE2NzIwNzU4ODV9.4ATuHPGs3oUADnRo5qQlYuIiSGjwjXMi35rdXRlSUlY'),
(137, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6ZmFsc2UsInVzZXJfdHlwZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjY5NDgzOTA4LCJleHAiOjE2NzIwNzU5MDh9.6NG1Fa08r5nNBwi-qkmUsnbs0L7GwwcQllNTkMHfcWM'),
(138, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2Njk1Njk5NzksImV4cCI6MTY3MjE2MTk3OX0.7pUJnlvYddwi6JYaCZmcHki0SNNPCWSMbfNONcrtSws'),
(139, 'airua0987@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzY0NTQ4NjcyNjE3MjIyOTU2NSIsInVzZXJuYW1lIjoiYWlydWEwOTg3QGdtYWlsLmNvbSIsInVzZXJfcGVybWlzc2lvbiI6dHJ1ZSwidXNlcl90eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2Njk1NzAwMzYsImV4cCI6MTY3MjE2MjAzNn0.wsh6cXjMQ1ZS-I3ZtISxweQL1sH4TrRZ851t-Xk7D1s');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authmail`
--
ALTER TABLE `authmail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `authphone`
--
ALTER TABLE `authphone`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cthoadon`
--
ALTER TABLE `cthoadon`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_sanpham` (`id_sanpham`),
  ADD KEY `id_hoadon` (`id_hoadon`);

--
-- Indexes for table `ctphieunhap`
--
ALTER TABLE `ctphieunhap`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_sp` (`id_sp`),
  ADD KEY `id_phieunhap` (`id_phieunhap`);

--
-- Indexes for table `danhmuc`
--
ALTER TABLE `danhmuc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_khachhang` (`id_khachhang`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nhacungcap`
--
ALTER TABLE `nhacungcap`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_quyen` (`id_quyen`);

--
-- Indexes for table `phanhoi_danhgia`
--
ALTER TABLE `phanhoi_danhgia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_khach` (`id_khach`),
  ADD KEY `id_sanpham` (`id_sanpham`);

--
-- Indexes for table `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_nv` (`id_nv`),
  ADD KEY `phieunhap_ibfk_2` (`id_ncc`);

--
-- Indexes for table `quyen`
--
ALTER TABLE `quyen`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quyendahmuc`
--
ALTER TABLE `quyendahmuc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_danhmuc` (`id_danhmuc`),
  ADD KEY `id_quyen` (`id_quyen`);

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_nha_cc` (`id_nha_cc`),
  ADD KEY `id_the_loai` (`id_the_loai`),
  ADD KEY `id_thuong_hieu` (`id_thuong_hieu`);

--
-- Indexes for table `theloai`
--
ALTER TABLE `theloai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `thuonghieu`
--
ALTER TABLE `thuonghieu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authmail`
--
ALTER TABLE `authmail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `authphone`
--
ALTER TABLE `authphone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cthoadon`
--
ALTER TABLE `cthoadon`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=417;

--
-- AUTO_INCREMENT for table `ctphieunhap`
--
ALTER TABLE `ctphieunhap`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `danhmuc`
--
ALTER TABLE `danhmuc`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `nhacungcap`
--
ALTER TABLE `nhacungcap`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `nhanvien`
--
ALTER TABLE `nhanvien`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `phanhoi_danhgia`
--
ALTER TABLE `phanhoi_danhgia`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quyen`
--
ALTER TABLE `quyen`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `quyendahmuc`
--
ALTER TABLE `quyendahmuc`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- AUTO_INCREMENT for table `theloai`
--
ALTER TABLE `theloai`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `thuonghieu`
--
ALTER TABLE `thuonghieu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cthoadon`
--
ALTER TABLE `cthoadon`
  ADD CONSTRAINT `cthoadon_ibfk_2` FOREIGN KEY (`id_sanpham`) REFERENCES `sanpham` (`id`),
  ADD CONSTRAINT `cthoadon_ibfk_3` FOREIGN KEY (`id_hoadon`) REFERENCES `hoadon` (`id`);

--
-- Constraints for table `ctphieunhap`
--
ALTER TABLE `ctphieunhap`
  ADD CONSTRAINT `ctphieunhap_ibfk_2` FOREIGN KEY (`id_sp`) REFERENCES `sanpham` (`id`),
  ADD CONSTRAINT `ctphieunhap_ibfk_3` FOREIGN KEY (`id_phieunhap`) REFERENCES `phieunhap` (`id`);

--
-- Constraints for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`id_khachhang`) REFERENCES `khachhang` (`id`);

--
-- Constraints for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD CONSTRAINT `nhanvien_ibfk_1` FOREIGN KEY (`id_quyen`) REFERENCES `quyen` (`id`);

--
-- Constraints for table `phanhoi_danhgia`
--
ALTER TABLE `phanhoi_danhgia`
  ADD CONSTRAINT `phanhoi_danhgia_ibfk_2` FOREIGN KEY (`id_sanpham`) REFERENCES `sanpham` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD CONSTRAINT `phieunhap_ibfk_1` FOREIGN KEY (`id_nv`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `phieunhap_ibfk_2` FOREIGN KEY (`id_ncc`) REFERENCES `nhacungcap` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quyendahmuc`
--
ALTER TABLE `quyendahmuc`
  ADD CONSTRAINT `quyendahmuc_ibfk_1` FOREIGN KEY (`id_quyen`) REFERENCES `quyen` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quyendahmuc_ibfk_2` FOREIGN KEY (`id_danhmuc`) REFERENCES `danhmuc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`id_the_loai`) REFERENCES `theloai` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
